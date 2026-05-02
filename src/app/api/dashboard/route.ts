import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { rows: analyses } = await pool.query(
    `SELECT a.id, a.nom_offre, a.score, a.created_at,
            a.resume, a.mots_cles_manquants, a.mots_cles_presents,
            cv.id AS cv_adapte_id
     FROM analyses a
     LEFT JOIN cv_adapte cv ON cv.analyse_id = a.id
     WHERE a.user_id = $1
     ORDER BY a.created_at DESC`,
    [session.user.id]
  );

  const { rows: cvsAdaptes } = await pool.query(
    `SELECT id, nom_offre, created_at, cv_data
     FROM cv_adapte
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.user.id]
  );

  return NextResponse.json({ analyses, cvsAdaptes });
}
