import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { cv } = await req.json();
  if (!cv?.trim()) return NextResponse.json({ error: "CV manquant" }, { status: 400 });

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en recrutement. Analyse ce CV et génère des termes de recherche d'emploi adaptés pour France Travail.

Réponds UNIQUEMENT avec un objet JSON :
{
  "metierSuggere": "intitulé principal (2-4 mots, le plus précis)",
  "termesAlternatifs": ["terme plus large 1", "terme connexe 2", "terme générique 3"]
}

Règles :
- "metierSuggere" : intitulé le plus précis correspondant au profil
- "termesAlternatifs" : 3 variantes en ordre décroissant de précision (plus larges ou connexes)
- Tous en français, simples et recherchables (pas d'acronymes)
- Max 4 mots par terme

CV :
${cv.slice(0, 3000)}`,
      },
    ],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse invalide" }, { status: 500 });
  }

  const texte = contenu.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const { metierSuggere, termesAlternatifs } = JSON.parse(texte);

  return NextResponse.json({ metierSuggere, termesAlternatifs: termesAlternatifs ?? [] });
}
