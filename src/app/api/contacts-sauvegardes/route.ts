import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";



export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { rows } = await pool.query(
    "SELECT * FROM saved_contacts WHERE user_id = $1 ORDER BY created_at DESC",
    [session.user.id]
  );
  return NextResponse.json({ contacts: rows });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { prenom, nom, poste, linkedin, email, domaine } = await req.json();

  const { rows } = await pool.query(
    `INSERT INTO saved_contacts (user_id, prenom, nom, poste, linkedin, email, domaine)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [session.user.id, prenom ?? "", nom ?? "", poste ?? "", linkedin ?? "", email ?? "", domaine ?? ""]
  );
  return NextResponse.json({ id: rows[0].id });
}

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { id, email } = await req.json();
  await pool.query("UPDATE saved_contacts SET email = $1 WHERE id = $2 AND user_id = $3", [email, id, session.user.id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { id } = await req.json();
  await pool.query("DELETE FROM saved_contacts WHERE id = $1 AND user_id = $2", [id, session.user.id]);
  return NextResponse.json({ ok: true });
}
