import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";



export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { rows: analyses } = await pool.query(
    `SELECT a.id, a.nom_offre, a.score, a.score_apres, a.created_at,
            a.resume, a.mots_cles_manquants, a.mots_cles_presents,
            a.mots_cles_apres_manquants, a.mots_cles_apres_presents,
            a.cv_texte, a.offre_texte,
            cv.id AS cv_adapte_id,
            f.fichier_nom AS cv_fichier_nom,
            f.fichier_type AS cv_fichier_type,
            lm.id AS lettre_id,
            lm.lettre_texte AS lettre_texte
     FROM analyses a
     LEFT JOIN cv_adapte cv ON cv.analyse_id = a.id
     LEFT JOIN cv_fichier_original f ON f.analyse_id = a.id::text
     LEFT JOIN lettres_motivation lm ON lm.analyse_id = a.id::text AND lm.user_id = $1
     WHERE a.user_id = $1
     ORDER BY a.created_at DESC`,
    [session.user.id]
  );

  const { rows: cvsAdaptes } = await pool.query(
    `SELECT id, nom_offre, created_at, cv_data, questions_reponses
     FROM cv_adapte
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.user.id]
  );

  const { rows: entretiens } = await pool.query(
    `SELECT id, nom_offre, pitch, questions_probables, questions_a_poser, created_at
     FROM entretiens WHERE user_id = $1 ORDER BY created_at DESC`,
    [session.user.id]
  );

  const { rows: userRows } = await pool.query(
    'SELECT scans, credits, lm_credits, rh_credits, is_subscribed, plan_type FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const utilisateur = userRows[0] ?? { scans: 0, credits: 0, lm_credits: 0, rh_credits: 3, is_subscribed: false, plan_type: null };

  return NextResponse.json({
    analyses,
    cvsAdaptes: cvsAdaptes.map((c) => ({
      ...c,
      cv_data: typeof c.cv_data === "string" ? JSON.parse(c.cv_data) : c.cv_data,
      questions_reponses: typeof c.questions_reponses === "string" ? JSON.parse(c.questions_reponses) : c.questions_reponses,
    })),
    entretiens,
    scans: utilisateur.scans,
    credits: utilisateur.credits,
    lmCredits: utilisateur.lm_credits,
    rhCredits: utilisateur.rh_credits,
    estAbonne: utilisateur.is_subscribed,
    planType: utilisateur.plan_type ?? null,
  });
}
