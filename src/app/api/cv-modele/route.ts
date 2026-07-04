import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  // Sélection légère : on n'extrait que le titre (poste visé) du JSONB, pas tout le CV.
  const { rows } = await pool.query(
    `SELECT id, nom, template_slug, cv_data->>'titre' AS titre, created_at, updated_at
     FROM cv_modele
     WHERE user_id = $1
     ORDER BY updated_at DESC
     LIMIT 50`,
    [session.user.id]
  );

  return NextResponse.json({
    cvs: rows.map((r) => ({
      id: r.id,
      nom: r.nom,
      titre: r.titre ?? "",
      templateSlug: r.template_slug,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
  });
}
