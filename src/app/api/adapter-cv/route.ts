import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { cv, offre, motsClesManquants } = await req.json();

  if (!cv || !offre || typeof cv !== "string" || typeof offre !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }
  if (cv.length > 20000 || offre.length > 10000) {
    return NextResponse.json({ error: "Texte trop long." }, { status: 400 });
  }

  // Vérifier si l'utilisateur est abonné (bypass total des crédits)
  const { rows: rowsUser } = await pool.query(
    'SELECT is_subscribed FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const estAbonne: boolean = rowsUser[0]?.is_subscribed ?? false;

  let creditsRestants: number | null = null;

  if (!estAbonne) {
    // Décrémentation atomique : échoue si credits = 0
    const { rowCount, rows } = await pool.query(
      'UPDATE "user" SET credits = credits - 1 WHERE id = $1 AND credits > 0 RETURNING credits',
      [session.user.id]
    );

    if (rowCount === 0) {
      return NextResponse.json(
        { error: "Vous n'avez plus de crédits disponibles. Passez à un abonnement pour des adaptations illimitées." },
        { status: 403 }
      );
    }
    creditsRestants = rows[0].credits;
  }

  const motsClesListe =
    Array.isArray(motsClesManquants) && motsClesManquants.length > 0
      ? `\n\nMots-clés importants à intégrer naturellement : ${motsClesManquants.join(", ")}`
      : "";

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en rédaction de CV ATS-friendly. Réécris ce CV pour maximiser sa correspondance avec l'offre d'emploi, en intégrant naturellement les mots-clés manquants. Ne fabrique pas d'expériences ni de diplômes — reformule et mets en valeur ce qui existe déjà. Les concours, compétitions et hackathons vont dans "projets", pas dans "certifications". Les certifications sont uniquement des diplômes ou titres officiels (ex : TOEIC, certifications professionnelles).${motsClesListe}

Retourne UNIQUEMENT un objet JSON valide, sans markdown ni backticks, respectant exactement ce schéma (n'inclure que les champs présents dans le CV original — ne pas inventer ni laisser de tableaux vides) :

{
  "nom": "string",
  "titre": "string (titre professionnel court)",
  "contact": {
    "email": "string?",
    "telephone": "string?",
    "localisation": "string?",
    "linkedin": "string?",
    "site": "string?"
  },
  "resume": "string? (accroche professionnelle, 2-4 phrases)",
  "experiences": [{
    "poste": "string",
    "entreprise": "string",
    "dates": "string",
    "lieu": "string?",
    "missions": ["string (maximum 3 bullet points par expérience, concis)"]
  }]?,
  "formation": [{
    "diplome": "string",
    "etablissement": "string",
    "dates": "string",
    "details": "string?"
  }]?,
  "competences": {
    "techniques": ["string"]?,
    "langues": ["string"]?,
    "autres": ["string"]?
  }?,
  "projets": [{
    "nom": "string",
    "description": "string (1 phrase max)",
    "technologies": "string?"
  }]? (maximum 2 projets),
  "certifications": [{
    "nom": "string",
    "organisme": "string?",
    "date": "string?"
  }]?
}

CV ORIGINAL :
${cv}

OFFRE D'EMPLOI :
${offre}`,
      },
    ],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue de l'IA." }, { status: 500 });
  }

  // Nettoyer les backticks markdown éventuels avant le parse
  const texteNettoye = contenu.text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();

  let cvAdapte;
  try {
    cvAdapte = JSON.parse(texteNettoye);
  } catch {
    return NextResponse.json({ error: "Format de réponse invalide. Veuillez réessayer." }, { status: 500 });
  }

  return NextResponse.json({ cvAdapte, creditsRestants });
}
