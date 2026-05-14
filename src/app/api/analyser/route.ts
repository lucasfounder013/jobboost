import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  // Authentification obligatoire
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { cv, offre } = await req.json();

  if (!cv || !offre || typeof cv !== "string" || typeof offre !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  if (cv.length > 20000 || offre.length > 10000) {
    return NextResponse.json({ error: "Texte trop long." }, { status: 400 });
  }

  // Vérification et décompte des scans (source de vérité : DB)
  const { rows } = await pool.query(
    'SELECT scans, is_subscribed FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const utilisateur = rows[0];
  const estAbonne: boolean = utilisateur?.is_subscribed ?? false;
  let scansRestants: number | null = null;

  if (!estAbonne) {
    // Décrémenter atomiquement — échoue si scans = 0
    const { rowCount, rows: rowsMaj } = await pool.query(
      'UPDATE "user" SET scans = scans - 1 WHERE id = $1 AND scans > 0 RETURNING scans',
      [session.user.id]
    );
    if (rowCount === 0) {
      return NextResponse.json(
        { error: "Vous avez utilisé vos 5 analyses gratuites. Passez à un abonnement pour continuer." },
        { status: 403 }
      );
    }
    scansRestants = rowsMaj[0].scans;
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en recrutement et optimisation de CV. Analyse la correspondance entre ce CV et cette offre d'emploi.

CV :
${cv}

OFFRE D'EMPLOI :
${offre}

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) avec cette structure exacte :
{
  "score": <entier entre 0 et 100 représentant le pourcentage de correspondance ATS>,
  "nomPoste": "<titre du poste extrait de l'offre d'emploi, ex: 'Développeur React Senior'>",
  "resume": "<2-3 phrases d'analyse globale en français>",
  "forme": [
    { "verdict": "✅" | "❌", "constat": "<constat factuel court, jamais une question>" },
    ...
  ],
  "motsClesManquants": [<mots-clés importants de l'offre absents du CV>],
  "motsClesPresents": [<mots-clés importants de l'offre présents dans le CV>]
}

Règles pour le score ATS (0-100) :
- 90-100 : CV quasi parfaitement aligné avec l'offre
- 75-89 : très bonne correspondance, quelques points à affiner
- 60-74 : bonne base mais lacunes notables
- 40-59 : correspondance partielle, travail significatif à faire
- 20-39 : faible correspondance, CV peu adapté à l'offre
- 0-19 : très peu de correspondance, CV inadapté
Le score doit refléter précisément le ratio mots-clés présents / total mots-clés importants, ajusté par la pertinence de l'expérience.

Règles pour forme (section factuelle sur la qualité du CV) :
- Génère 4 à 6 constats factuels sur la forme du CV (pas sur les mots-clés)
- Chaque constat est une observation factuelle courte (jamais une question, jamais un conseil)
- Exemples de bons constats : "Aucune expérience ne contient de chiffres ou de résultats mesurables", "Les titres de poste sont clairs et alignés avec l'offre", "Les bullet points sont absents dans la section expériences"
- verdict ✅ si le point est positif, ❌ si c'est un problème`,
      },
    ],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue de l'IA." }, { status: 500 });
  }

  let resultat;
  try {
    const texte = contenu.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    resultat = JSON.parse(texte);
  } catch {
    console.error("Réponse brute de Claude :", contenu.text);
    return NextResponse.json({ error: "Impossible de parser la réponse de l'IA." }, { status: 500 });
  }

  return NextResponse.json({ ...resultat, scansRestants });
}
