import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const STATUTS_VALIDES = ["souhaitee", "postulee", "entretien", "offre", "refusee"] as const;
type Statut = typeof STATUTS_VALIDES[number];

function estStatutValide(v: unknown): v is Statut {
  return typeof v === "string" && (STATUTS_VALIDES as readonly string[]).includes(v);
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { id } = await params;
  const { rows } = await pool.query(
    `SELECT id, poste, entreprise, statut, lien_offre, date_candidature, date_rappel,
            notes, analyse_id, cv_adapte_id, ordre, created_at, updated_at
     FROM candidatures WHERE id = $1 AND user_id = $2`,
    [id, session.user.id]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
  }

  const r = rows[0];
  return NextResponse.json({
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
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const champs: string[] = [];
  const valeurs: unknown[] = [];
  let index = 1;

  if (typeof body.poste === "string") {
    const v = body.poste.trim();
    if (!v) return NextResponse.json({ error: "Le poste ne peut pas être vide." }, { status: 400 });
    champs.push(`poste = $${index++}`);
    valeurs.push(v);
  }
  if (typeof body.entreprise === "string") {
    champs.push(`entreprise = $${index++}`);
    valeurs.push(body.entreprise.trim());
  }
  if (body.statut !== undefined) {
    if (!estStatutValide(body.statut)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    champs.push(`statut = $${index++}`);
    valeurs.push(body.statut);
  }
  if (body.lienOffre !== undefined) {
    champs.push(`lien_offre = $${index++}`);
    valeurs.push(typeof body.lienOffre === "string" ? body.lienOffre.trim() || null : null);
  }
  if (body.dateCandidature !== undefined) {
    champs.push(`date_candidature = $${index++}`);
    valeurs.push(body.dateCandidature || null);
  }
  if (body.dateRappel !== undefined) {
    champs.push(`date_rappel = $${index++}`);
    valeurs.push(body.dateRappel || null);
  }
  if (body.notes !== undefined) {
    champs.push(`notes = $${index++}`);
    valeurs.push(typeof body.notes === "string" ? body.notes : null);
  }
  if (typeof body.ordre === "number") {
    champs.push(`ordre = $${index++}`);
    valeurs.push(body.ordre);
  }

  if (champs.length === 0) {
    return NextResponse.json({ error: "Aucun champ à mettre à jour." }, { status: 400 });
  }

  champs.push(`updated_at = now()`);
  valeurs.push(id, session.user.id);

  const { rowCount } = await pool.query(
    `UPDATE candidatures SET ${champs.join(", ")} WHERE id = $${index++} AND user_id = $${index}`,
    valeurs
  );

  if (!rowCount) {
    return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { id } = await params;
  const { rowCount } = await pool.query(
    `DELETE FROM candidatures WHERE id = $1 AND user_id = $2`,
    [id, session.user.id]
  );

  if (!rowCount) {
    return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
