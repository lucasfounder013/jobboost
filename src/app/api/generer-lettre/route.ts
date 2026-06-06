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
      content: `Tu es un recruteur senior qui rédige des lettres de motivation sobres et efficaces.
Rédige une lettre de motivation courte et directe basée sur le CV et l'offre d'emploi suivants.

RÈGLES STRICTES :
- Détecte la langue de l'offre d'emploi et rédige dans cette MÊME langue
- Ton sobre et professionnel — pas d'enthousiasme excessif, pas de superlatifs, pas de "passionné", "ravi", "enchanté"
- 3 paragraphes courts (4-5 lignes max chacun), sans redite entre eux
- Chaque paragraphe a un seul angle : (1) pourquoi ce poste maintenant, (2) ce que le candidat apporte concrètement, (3) conclusion avec disponibilité
- Pas de répétition du titre du poste ou du nom de l'entreprise plus d'une fois
- Éviter les formules creuses : "je suis convaincu que", "ma candidature saura", "n'hésitez pas à"
- S'appuyer sur des faits concrets du CV, pas sur des qualificatifs génériques

CV :
${cv_texte}

OFFRE D'EMPLOI (poste : ${nom_offre}) :
${offre_texte}

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown ni backticks :
{
  "salutation": "string (ex: Madame, Monsieur,)",
  "paragraphes": [
    "string (pourquoi ce poste — contexte et motivation factuelle, pas d'effusion)",
    "string (ce que le candidat apporte — expériences et compétences concrètes du CV)",
    "string (conclusion courte — disponibilité et demande d'entretien, 2 phrases max)"
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

  // Log de l'événement pour la personnalisation des emails
  if (nom_offre) {
    pool.query(
      `INSERT INTO user_events (user_id, action, metadata) VALUES ($1, 'lettre', $2)`,
      [session.user.id, JSON.stringify({ nomPoste: nom_offre })]
    ).catch(e => console.error("[generer-lettre] Erreur log event:", e.message));
  }

  return NextResponse.json({ lettre, lmCreditsRestants });
}
