import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { cv, offre } = await req.json();

  if (!cv || !offre || typeof cv !== "string" || typeof offre !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
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
  "niveauQualitatif": "<l'un des niveaux suivants exactement : Très mauvais | Mauvais | Moyen | Bon | Très bon | Excellent>",
  "motsClesManquants": [<mots-clés importants de l'offre absents du CV>],
  "motsClesPresents": [<mots-clés importants de l'offre présents dans le CV>]
}

Règles pour niveauQualitatif :
- Excellent : le CV est quasi parfaitement aligné avec l'offre
- Très bon : très bonne correspondance, quelques points à affiner
- Bon : bonne base mais lacunes notables
- Moyen : correspondance partielle, travail significatif à faire
- Mauvais : faible correspondance, CV peu adapté à l'offre
- Très mauvais : très peu de correspondance, CV inadapté`,
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
    return NextResponse.json({ error: "Impossible de parser la réponse de l'IA." }, { status: 500 });
  }

  return NextResponse.json({
    niveauQualitatif: resultat.niveauQualitatif,
    motsClesManquants: resultat.motsClesManquants ?? [],
    motsClesPresents: resultat.motsClesPresents ?? [],
  });
}
