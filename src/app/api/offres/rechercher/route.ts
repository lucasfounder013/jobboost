import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { OffreFT } from "@/types/offres";



// Cache du token France Travail en mémoire (valide 1h)
let tokenCache: { token: string; expiresAt: number } | null = null;

async function obtenirTokenFT(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const reponse = await fetch(
    "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.FRANCE_TRAVAIL_CLIENT_ID ?? "",
        client_secret: process.env.FRANCE_TRAVAIL_CLIENT_SECRET ?? "",
        scope: "api_offresdemploiv2 o2dsoffre",
      }),
    }
  );

  if (!reponse.ok) {
    throw new Error("Impossible d'obtenir le token France Travail");
  }

  const data = await reponse.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return tokenCache.token;
}

function parseOffres(resultats: Record<string, unknown>[]): OffreFT[] {
  return resultats.map((o) => {
    const entreprise = o.entreprise as Record<string, string> | undefined;
    const lieuTravail = o.lieuTravail as Record<string, string> | undefined;
    const origineOffre = o.origineOffre as Record<string, string> | undefined;
    const description = (o.description as string | undefined) ?? "";

    return {
      id: o.id as string,
      titre: (o.intitule as string | undefined) ?? "",
      entreprise: entreprise?.nom ?? "Entreprise non précisée",
      localisation: lieuTravail?.libelle ?? "",
      datePublication: (o.dateCreation as string | undefined) ?? "",
      descriptionCourte: description.slice(0, 300),
      urlOffre: origineOffre?.urlOrigine ?? `https://www.francetravail.fr/offre-emploi/${o.id}`,
      offreTexteComplet: description,
    };
  });
}

async function rechercherParTerme(
  token: string,
  motsCles: string,
  localisation: string,
  nombreResultats = 20
): Promise<OffreFT[]> {
  const params = new URLSearchParams({
    motsCles: motsCles.trim(),
    nombreResultats: String(nombreResultats),
    sort: "1",
  });

  if (localisation?.trim()) {
    const loc = localisation.trim();
    if (/^\d{5}$/.test(loc)) {
      params.set("commune", loc);
    } else if (/^(\d{2,3}|2[AB])$/i.test(loc)) {
      params.set("departement", loc.toUpperCase());
    }
  }

  const reponseFT = await fetch(
    `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!reponseFT.ok) {
    const erreurTexte = await reponseFT.text();
    console.error(`Erreur France Travail (${motsCles}):`, erreurTexte);
    return [];
  }

  const data = await reponseFT.json();
  if (!Array.isArray(data.resultats)) return [];

  return parseOffres(data.resultats as Record<string, unknown>[]);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { motsCles, localisation, termesAlternatifs } = await req.json();
  if (!motsCles?.trim()) {
    return NextResponse.json({ error: "Le métier visé est requis" }, { status: 400 });
  }

  try {
    const token = await obtenirTokenFT();

    // Recherche principale
    let resultats = await rechercherParTerme(token, motsCles, localisation ?? "");
    const idsVus = new Set(resultats.map((o) => o.id));

    // Si moins de 5 résultats et qu'on a des termes alternatifs, on complète
    const alternatives: string[] = Array.isArray(termesAlternatifs) ? termesAlternatifs : [];
    if (resultats.length < 5 && alternatives.length > 0) {
      for (const terme of alternatives) {
        if (!terme?.trim()) continue;
        const complement = await rechercherParTerme(token, terme, localisation ?? "", 20);
        for (const offre of complement) {
          if (!idsVus.has(offre.id)) {
            idsVus.add(offre.id);
            resultats.push(offre);
          }
        }
        if (resultats.length >= 10) break;
      }
    }

    return NextResponse.json({ offres: resultats });
  } catch (e) {
    console.error("Erreur recherche offres:", e);
    return NextResponse.json({ error: "Erreur lors de la recherche d'offres" }, { status: 502 });
  }
}
