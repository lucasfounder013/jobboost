import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });


export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { cv, offre, motsClesManquants } = await req.json();

  if (!cv || !offre) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en optimisation de CV ATS. Un candidat veut adapter son CV pour une offre d'emploi.

CV :
${cv}

OFFRE D'EMPLOI :
${offre}

Mots-clés importants à intégrer : ${(motsClesManquants as string[] ?? []).join(", ")}

Génère exactement 5 à 7 questions courtes, personnalisées, ancrées dans le CV ET l'offre, qui permettront d'ajouter des données chiffrées concrètes pour renforcer le CV.

Règles STRICTES :
- Chaque question doit chercher un chiffre, une durée, un volume, un pourcentage ou un résultat mesurable — jamais une appréciation subjective
- Chaque question doit faire référence à un élément précis du CV (un poste nommé, un projet nommé, une mission nommée) OU à une exigence chiffrée de l'offre
- Questions courtes, directes, une seule phrase
- Ajoute un "placeholder" : un exemple de réponse courte (ex: "15 personnes", "35 %", "6 mois") pour guider l'utilisateur
- Exemples CORRECTS : "Combien de personnes avez-vous managées chez [entreprise] ?", "De quel pourcentage avez-vous réduit les délais sur [projet] ?"
- Exemples INTERDITS : questions sur les motivations, les valeurs, les points forts, les apprentissages — tout ce qui est subjectif

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) :
{ "questions": [{ "question": "...", "placeholder": "ex: ..." }, ...] }`,
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
