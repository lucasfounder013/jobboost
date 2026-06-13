import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function scraperUrl(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; JobBoost/1.0)" },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 3000);
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { cv, offre, urlEntreprise, profilLinkedIn } = await req.json();
  if (!cv?.trim() || !offre?.trim()) {
    return NextResponse.json({ error: "CV et offre d'emploi requis." }, { status: 400 });
  }

  // Scraping URL entreprise (silencieux si échec)
  let contexteEntreprise = "";
  if (urlEntreprise?.trim()) {
    contexteEntreprise = await scraperUrl(urlEntreprise.trim());
  }

  // Construction du prompt
  const sections = [
    `CV DU CANDIDAT :\n${cv}`,
    `OFFRE D'EMPLOI :\n${offre}`,
    contexteEntreprise ? `CONTEXTE ENTREPRISE (extrait du site) :\n${contexteEntreprise}` : "",
  ].filter(Boolean).join("\n\n---\n\n");

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: `Tu es un coach carrière expert. Prépare une roadmap d'entretien personnalisée pour ce candidat.

${sections}

RÈGLES STRICTES :
- Détecte la langue de l'offre d'emploi et réponds dans cette MÊME langue
- Ton direct, naturel et concret. Pas de formules creuses, pas de superlatifs, pas de tirets doubles "--"
- Adapte tout le contenu au poste exact et au profil du candidat
- Les textes doivent sonner humain, pas généré par une IA

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown ni backticks :
{
  "nomPoste": "string (titre du poste détecté dans l'offre)",
  "pitchComplet": "string (réponse à 'Parlez-moi de vous', 3 à 4 phrases, sobre et factuelle, basée sur le parcours du CV)",
  "questionsProbables": [
    { "question": "string", "conseil": "string (comment aborder cette question, basé sur le CV et l'offre)" }
  ],
  "questionsAPoseur": ["string (question intelligente et personnalisée à poser au recruteur)"]
}

Pour questionsProbables : génère 5 à 7 questions. Pour questionsAPoseur : génère 3 à 5 questions.`,
    }],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue de l'IA." }, { status: 500 });
  }

  let resultat;
  try {
    const texte = contenu.text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    resultat = JSON.parse(texte);
  } catch {
    return NextResponse.json({ error: "Impossible de parser la réponse de l'IA." }, { status: 500 });
  }

  const { rows } = await pool.query(
    `INSERT INTO entretiens (user_id, nom_offre, pitch, questions_probables, questions_a_poser)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [
      session.user.id,
      resultat.nomPoste ?? "Entretien",
      resultat.pitchComplet,
      JSON.stringify(resultat.questionsProbables),
      JSON.stringify(resultat.questionsAPoseur),
    ]
  );

  pool.query(
    `INSERT INTO user_events (user_id, action, metadata) VALUES ($1, 'entretien', $2)`,
    [session.user.id, JSON.stringify({ nomPoste: resultat.nomPoste ?? null })]
  ).catch(e => console.error("[preparer-entretien] Erreur log event:", e.message));

  return NextResponse.json({
    entretienId: rows[0].id,
    nomPoste: resultat.nomPoste,
    pitchComplet: resultat.pitchComplet,
    questionsProbables: resultat.questionsProbables,
    questionsAPoseur: resultat.questionsAPoseur,
  });
}
