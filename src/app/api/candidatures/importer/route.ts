import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Nettoie le HTML pour extraire du texte brut : retire scripts, styles, balises HTML.
function extraireTexte(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL manquante." }, { status: 400 });
  }

  let urlValide: URL;
  try {
    urlValide = new URL(url);
    if (!["http:", "https:"].includes(urlValide.protocol)) {
      throw new Error("Protocole non supporté");
    }
  } catch {
    return NextResponse.json({ error: "URL invalide." }, { status: 400 });
  }

  // Fetch l'HTML (attention : LinkedIn/Indeed peuvent bloquer)
  let html: string;
  try {
    const reponse = await fetch(urlValide.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!reponse.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer l'offre. Remplissez manuellement." },
        { status: 400 }
      );
    }
    html = await reponse.text();
  } catch {
    return NextResponse.json(
      { error: "Impossible de récupérer l'offre. Remplissez manuellement." },
      { status: 400 }
    );
  }

  const texte = extraireTexte(html).slice(0, 10000);
  if (texte.length < 100) {
    return NextResponse.json(
      { error: "Contenu trop court. Remplissez manuellement." },
      { status: 400 }
    );
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Voici le texte d'une page d'offre d'emploi. Extrais le poste et l'entreprise.

TEXTE :
${texte}

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) :
{
  "poste": "<intitulé du poste, ex: 'Développeur React Senior'>",
  "entreprise": "<nom de l'entreprise, ex: 'Ubisoft'>"
}

Si tu ne peux pas identifier l'un des champs, mets une chaîne vide.`,
      },
    ],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue de l'IA." }, { status: 500 });
  }

  let resultat: { poste?: string; entreprise?: string };
  try {
    const nettoye = contenu.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    resultat = JSON.parse(nettoye);
  } catch {
    return NextResponse.json({ error: "Impossible d'analyser la réponse de l'IA." }, { status: 500 });
  }

  return NextResponse.json({
    poste: resultat.poste ?? "",
    entreprise: resultat.entreprise ?? "",
    lienOffre: urlValide.toString(),
  });
}
