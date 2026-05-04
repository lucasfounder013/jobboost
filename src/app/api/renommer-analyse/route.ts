import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { id, nom_offre } = await req.json();
  if (!id || !nom_offre?.trim()) return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });

  const { rowCount } = await pool.query(
    `UPDATE analyses SET nom_offre = $1 WHERE id = $2 AND user_id = $3`,
    [nom_offre.trim(), id, session.user.id]
  );

  if (rowCount === 0) return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
