import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";



export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id manquant." }, { status: 400 });

  // Supprimer le CV adapté lié d'abord (contrainte FK), puis l'analyse
  await pool.query(`DELETE FROM cv_adapte WHERE analyse_id = $1 AND user_id = $2`, [id, session.user.id]);
  const { rowCount } = await pool.query(`DELETE FROM analyses WHERE id = $1 AND user_id = $2`, [id, session.user.id]);

  if (rowCount === 0) return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
