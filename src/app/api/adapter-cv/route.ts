import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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

  // Décrémentation atomique : échoue si credits = 0
  const { rowCount, rows } = await pool.query(
    'UPDATE "user" SET credits = credits - 1 WHERE id = $1 AND credits > 0 RETURNING credits',
    [session.user.id]
  );

  if (rowCount === 0) {
    return NextResponse.json(
      { error: "Vous n'avez plus de crédits disponibles." },
      { status: 403 }
    );
  }

  const creditsRestants: number = rows[0].credits;

  const motsClesListe =
    Array.isArray(motsClesManquants) && motsClesManquants.length > 0
      ? `\n\nMots-clés importants à intégrer : ${motsClesManquants.join(", ")}`
      : "";

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en rédaction de CV. Réécris ce CV pour maximiser sa correspondance avec l'offre d'emploi fournie, en intégrant naturellement les mots-clés manquants dans les sections pertinentes. Conserve le style, le ton et la structure originale. Ne fabrique pas d'expériences — reformule et mets en valeur ce qui existe. Retourne UNIQUEMENT le texte du CV réécrit, sans commentaires ni explications.${motsClesListe}

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

  return NextResponse.json({ cvAdapte: contenu.text, creditsRestants });
}
