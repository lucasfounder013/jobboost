import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function GET(_req: NextRequest, { params }: { params: Promise<{ analyseId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { analyseId } = await params;

  const { rows } = await pool.query(
    `SELECT a.nom_offre, a.niveau_qualitatif, a.niveau_qualitatif_apres,
            a.mots_cles_manquants, a.mots_cles_presents,
            a.mots_cles_apres_manquants, a.mots_cles_apres_presents,
            cv.cv_data
     FROM analyses a
     LEFT JOIN cv_adapte cv ON cv.analyse_id = a.id
     WHERE a.id = $1 AND a.user_id = $2
     LIMIT 1`,
    [analyseId, session.user.id]
  );

  if (rows.length === 0) return NextResponse.json({ error: "Introuvable." }, { status: 404 });

  return NextResponse.json(rows[0]);
}
