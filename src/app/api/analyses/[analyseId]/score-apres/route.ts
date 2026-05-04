import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ analyseId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { analyseId } = await params;
  const { scoreApres } = await req.json();

  if (typeof scoreApres !== "number") {
    return NextResponse.json({ error: "Score invalide." }, { status: 400 });
  }

  await pool.query(
    `UPDATE analyses SET score_apres = $1 WHERE id = $2 AND user_id = $3`,
    [scoreApres, analyseId, session.user.id]
  );

  return NextResponse.json({ ok: true });
}
