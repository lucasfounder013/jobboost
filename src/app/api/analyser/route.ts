import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { cv, offre } = await req.json();

  if (!cv || !offre || typeof cv !== "string" || typeof offre !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  if (cv.length > 20000 || offre.length > 10000) {
    return NextResponse.json({ error: "Texte trop long." }, { status: 400 });
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
  "score": <nombre entier de 0 à 100>,
  "resume": "<2-3 phrases d'analyse globale en français>",
  "categories": {
    "recherchabilite": {
      "score": <0-100>,
      "problemes": [{ "statut": "ok" | "avertissement" | "erreur", "message": "<explication courte>" }]
    },
    "competencesTechniques": {
      "score": <0-100>,
      "problemes": [{ "statut": "ok" | "avertissement" | "erreur", "message": "<explication courte>" }]
    },
    "competencesSoft": {
      "score": <0-100>,
      "problemes": [{ "statut": "ok" | "avertissement" | "erreur", "message": "<explication courte>" }]
    },
    "conseilsRecruteur": {
      "score": <0-100>,
      "problemes": [{ "statut": "ok" | "avertissement" | "erreur", "message": "<explication courte>" }]
    }
  },
  "motsClesManquants": [<mots-clés importants de l'offre absents du CV>],
  "motsClesPresents": [<mots-clés importants de l'offre présents dans le CV>]
}

Critères par catégorie :
- recherchabilite : titre de poste présent, mots-clés ATS, formatage lisible, absence de tableaux/colonnes complexes
- competencesTechniques : compétences techniques demandées, outils, langages, certifications
- competencesSoft : compétences comportementales, leadership, communication, travail en équipe
- conseilsRecruteur : réalisations chiffrées, verbes d'action, longueur appropriée, clarté des expériences

Génère 3 à 5 points par catégorie.`,
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

  return NextResponse.json(resultat);
}
