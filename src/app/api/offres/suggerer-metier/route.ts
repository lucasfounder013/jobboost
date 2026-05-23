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
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en recrutement de cadres. Analyse ce CV et identifie le métier cadre le plus pertinent à rechercher pour ce profil.

Règles :
- Réponds UNIQUEMENT avec un objet JSON : {"metierSuggere": "..."}
- L'intitulé doit faire 2 à 5 mots maximum
- Utilise un intitulé générique et recherchable (ex: "chef de projet digital", "directeur financier", "responsable ressources humaines")
- En français uniquement

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
  const { metierSuggere } = JSON.parse(texte);

  return NextResponse.json({ metierSuggere });
}
