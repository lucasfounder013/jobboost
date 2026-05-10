import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ analyseId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { analyseId } = await params;
  const { niveauQualitatifApres, motsClesApresManquants, motsClesApresPresents } = await req.json();

  await pool.query(
    `UPDATE analyses
     SET niveau_qualitatif_apres = $1,
         mots_cles_apres_manquants = $2,
         mots_cles_apres_presents = $3
     WHERE id = $4 AND user_id = $5`,
    [niveauQualitatifApres ?? null, motsClesApresManquants ?? null, motsClesApresPresents ?? null, analyseId, session.user.id]
  );

  return NextResponse.json({ ok: true });
}
