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

  const { analyseId } = await req.json();
  if (!analyseId || typeof analyseId !== "string") {
    return NextResponse.json({ error: "analyseId manquant." }, { status: 400 });
  }

  // Récupérer le CV et l'offre depuis la DB
  const { rows: rowsAnalyse } = await pool.query(
    `SELECT cv_texte, offre_texte, nom_offre FROM analyses WHERE id = $1 AND user_id = $2`,
    [analyseId, session.user.id]
  );
  if (rowsAnalyse.length === 0) {
    return NextResponse.json({ error: "Analyse introuvable." }, { status: 404 });
  }
  const { cv_texte, offre_texte, nom_offre } = rowsAnalyse[0];
  if (!cv_texte || !offre_texte) {
    return NextResponse.json({ error: "CV ou offre manquants pour cette analyse." }, { status: 400 });
  }

  // Vérification crédits LM
  const { rows: rowsUser } = await pool.query(
    'SELECT is_subscribed FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const estAbonne: boolean = rowsUser[0]?.is_subscribed ?? false;
  let lmCreditsRestants: number | null = null;

  if (!estAbonne) {
    const { rowCount, rows } = await pool.query(
      'UPDATE "user" SET lm_credits = lm_credits - 1 WHERE id = $1 AND lm_credits > 0 RETURNING lm_credits',
      [session.user.id]
    );
    if (rowCount === 0) {
      return NextResponse.json(
        { error: "Vous n'avez plus de crédits pour générer une lettre de motivation. Passez à un abonnement." },
        { status: 403 }
      );
    }
    lmCreditsRestants = rows[0].lm_credits;
  }

  // Appel Claude
  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{
      role: "user",
      content: `Tu es un expert en rédaction de lettres de motivation professionnelles.
Rédige une lettre de motivation percutante et personnalisée basée sur le CV et l'offre d'emploi suivants.

RÈGLES IMPORTANTES :
- Détecte la langue de l'offre d'emploi et rédige la lettre dans cette MÊME langue
- Adapte le ton au type d'entreprise (startup = dynamique et direct ; grand groupe = formel et structuré)
- La lettre doit être PERSONNALISÉE : cite l'entreprise, le poste, des éléments concrets du CV
- Ne jamais être générique — chaque phrase doit être spécifique à ce candidat et ce poste
- 4 paragraphes : accroche, expériences pertinentes, motivation/valeurs, conclusion avec disponibilité

CV :
${cv_texte}

OFFRE D'EMPLOI (poste : ${nom_offre}) :
${offre_texte}

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown ni backticks :
{
  "salutation": "string (ex: Cher Responsable du recrutement,)",
  "paragraphes": [
    "string (accroche : pourquoi ce poste/cette entreprise spécifiquement)",
    "string (expériences pertinentes : ce que le candidat apporte concrètement)",
    "string (motivation : adéquation valeurs, projet professionnel)",
    "string (conclusion : disponibilité, demande d'entretien)"
  ],
  "formule_politesse": "string (ex: Cordialement,)"
}`,
    }],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue de l'IA." }, { status: 500 });
  }

  let lettre;
  try {
    const texte = contenu.text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    lettre = JSON.parse(texte);
  } catch {
    return NextResponse.json({ error: "Impossible de parser la réponse de l'IA." }, { status: 500 });
  }

  // Supprimer la lettre précédente pour cette analyse, puis insérer
  await pool.query(`DELETE FROM lettres_motivation WHERE analyse_id = $1 AND user_id = $2`, [analyseId, session.user.id]);
  await pool.query(
    `INSERT INTO lettres_motivation (user_id, analyse_id, nom_offre, lettre_texte)
     VALUES ($1, $2, $3, $4)`,
    [session.user.id, analyseId, nom_offre, JSON.stringify(lettre)]
  );

  return NextResponse.json({ lettre, lmCreditsRestants });
}
