import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { cv, offre, motsClesManquants } = await req.json();

  if (!cv || !offre) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en optimisation de CV. Un candidat veut adapter son CV pour une offre d'emploi.

CV :
${cv}

OFFRE D'EMPLOI :
${offre}

Mots-clés manquants dans le CV : ${(motsClesManquants as string[] ?? []).join(", ")}

Génère 3 à 5 questions courtes, ancrées dans le CV et l'offre, qui permettront d'ajouter des chiffres concrets au CV adapté.

Règles STRICTES :
- Chaque question doit chercher un chiffre, une durée, un volume, un pourcentage ou un résultat mesurable — jamais une appréciation subjective
- Chaque question doit faire référence à un élément précis du CV (un poste, un projet, une expérience nommée)
- Questions courtes, directes, une seule phrase
- Exemples CORRECTS : "Combien de personnes avez-vous managées chez [entreprise] ?", "Quel était le chiffre d'affaires géré sur [projet] ?", "En combien de temps avez-vous livré [projet mentionné] ?", "Quelle était la taille de l'équipe sur [mission] ?"
- Exemples INTERDITS : questions sur les motivations, les valeurs, les points forts, les apprentissages — tout ce qui est subjectif

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) :
{ "questions": ["question 1", "question 2", ...] }`,
      },
    ],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue." }, { status: 500 });
  }

  try {
    const texte = contenu.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const data = JSON.parse(texte);
    pool.query(
      `INSERT INTO user_events (user_id, action, metadata) VALUES ($1, 'questions_cv', $2)`,
      [session.user.id, JSON.stringify({ nb_questions: data.questions?.length ?? 0 })]
    ).catch(e => console.error("[generer-questions] Erreur log event:", e.message));

    return NextResponse.json({ questions: data.questions ?? [] });
  } catch {
    return NextResponse.json({ error: "Impossible de parser la réponse." }, { status: 500 });
  }
}
