import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { id } = await params;

  const { rows } = await pool.query(
    `SELECT id, nom, template_slug, cv_data, ordre_sections, created_at, updated_at
     FROM cv_modele
     WHERE id = $1 AND user_id = $2`,
    [id, session.user.id]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "CV introuvable." }, { status: 404 });
  }

  const r = rows[0];
  return NextResponse.json({
    id: r.id,
    nom: r.nom,
    templateSlug: r.template_slug,
    cv: r.cv_data,
    ordreSections: r.ordre_sections,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { id } = await params;

  const { rowCount } = await pool.query(
    `DELETE FROM cv_modele WHERE id = $1 AND user_id = $2`,
    [id, session.user.id]
  );

  if (!rowCount) {
    return NextResponse.json({ error: "CV introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
