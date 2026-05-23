import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { OffreFT } from "@/types/offres";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

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

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { rows } = await pool.query('SELECT is_subscribed FROM "user" WHERE id = $1', [session.user.id]);
  if (!rows[0]?.is_subscribed) {
    return NextResponse.json({ error: "Fonctionnalité réservée aux abonnés" }, { status: 403 });
  }

  const { motsCles, localisation } = await req.json();
  if (!motsCles?.trim()) {
    return NextResponse.json({ error: "Le métier visé est requis" }, { status: 400 });
  }

  const token = await obtenirTokenFT();

  const params = new URLSearchParams({
    motsCles: motsCles.trim(),
    nombreResultats: "20",
    sort: "1",
  });

  // Localisation : code département (2-3 chiffres, ou 2A/2B pour la Corse)
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
    const erreur = await reponseFT.text();
    console.error("Erreur France Travail:", erreur);
    return NextResponse.json({ error: "Erreur lors de la recherche d'offres" }, { status: 502 });
  }

  const data = await reponseFT.json();
  const resultats: OffreFT[] = (data.resultats ?? []).map((o: Record<string, unknown>) => {
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

  return NextResponse.json({ offres: resultats });
}
