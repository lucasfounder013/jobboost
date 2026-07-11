import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const STATUTS_VALIDES = ["souhaitee", "postulee", "entretien", "offre", "refusee"] as const;
type Statut = typeof STATUTS_VALIDES[number];

function estStatutValide(v: unknown): v is Statut {
  return typeof v === "string" && (STATUTS_VALIDES as readonly string[]).includes(v);
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { rows } = await pool.query(
    `SELECT c.id, c.poste, c.entreprise, c.statut, c.lien_offre, c.date_candidature,
            c.date_rappel, c.notes, c.analyse_id, c.cv_adapte_id, c.ordre,
            c.created_at, c.updated_at,
            a.nom_offre AS analyse_nom, a.score AS analyse_score, a.score_apres AS analyse_score_apres
     FROM candidatures c
     LEFT JOIN analyses a ON a.id = c.analyse_id AND a.user_id = c.user_id
     WHERE c.user_id = $1
     ORDER BY c.statut, c.ordre, c.created_at DESC
     LIMIT 500`,
    [session.user.id]
  );

  return NextResponse.json({
    candidatures: rows.map((r) => ({
      id: r.id,
      poste: r.poste,
      entreprise: r.entreprise,
      statut: r.statut,
      lienOffre: r.lien_offre,
      dateCandidature: r.date_candidature,
      dateRappel: r.date_rappel,
      notes: r.notes,
      analyseId: r.analyse_id,
      cvAdapteId: r.cv_adapte_id,
      ordre: r.ordre,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      analyseNom: r.analyse_nom,
      analyseScore: r.analyse_score,
      analyseScoreApres: r.analyse_score_apres,
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const body = await req.json();
  const poste = typeof body.poste === "string" ? body.poste.trim() : "";
  const entreprise = typeof body.entreprise === "string" ? body.entreprise.trim() : "";

  if (!poste) {
    return NextResponse.json({ error: "Le poste est requis." }, { status: 400 });
  }

  const statut: Statut = estStatutValide(body.statut) ? body.statut : "souhaitee";
  const lienOffre = typeof body.lienOffre === "string" ? body.lienOffre.trim() || null : null;
  const dateCandidature = typeof body.dateCandidature === "string" && body.dateCandidature ? body.dateCandidature : null;
  const dateRappel = typeof body.dateRappel === "string" && body.dateRappel ? body.dateRappel : null;
  const notes = typeof body.notes === "string" ? body.notes : null;
  const analyseId = typeof body.analyseId === "string" ? body.analyseId : null;

  // Position en fin de colonne
  const { rows: maxRows } = await pool.query(
    `SELECT COALESCE(MAX(ordre), -1) + 1 AS prochain_ordre FROM candidatures WHERE user_id = $1 AND statut = $2`,
    [session.user.id, statut]
  );
  const ordre = maxRows[0].prochain_ordre;

  const { rows } = await pool.query(
    `INSERT INTO candidatures (user_id, poste, entreprise, statut, lien_offre, date_candidature, date_rappel, notes, analyse_id, ordre)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id, created_at`,
    [session.user.id, poste, entreprise, statut, lienOffre, dateCandidature, dateRappel, notes, analyseId, ordre]
  );

  return NextResponse.json({ id: rows[0].id, createdAt: rows[0].created_at });
}
