import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CVStructure } from "@/types/cv";
import { TemplateSlug } from "@/lib/cv-templates";
import { SectionId, normaliserOrdre } from "@/lib/cv-sections";

function estTemplateValide(t: unknown): t is TemplateSlug {
  return t === "classique-ats" || t === "moderne" || t === "elegant";
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const body = await req.json() as {
    id?: string;
    cv?: CVStructure;
    templateSlug?: string;
    ordreSections?: unknown;
  };

  if (!body.cv || !estTemplateValide(body.templateSlug)) {
    return NextResponse.json({ error: "Paramètres manquants ou invalides." }, { status: 400 });
  }

  const cv = body.cv;
  const templateSlug: TemplateSlug = body.templateSlug;
  const ordreSections: SectionId[] = normaliserOrdre(body.ordreSections);
  const nom = (cv.nom || "Mon CV").slice(0, 200);

  // Mise à jour d'un CV existant
  if (body.id) {
    const { rows } = await pool.query(
      `UPDATE cv_modele
       SET nom = $1, template_slug = $2, cv_data = $3, ordre_sections = $4, updated_at = now()
       WHERE id = $5 AND user_id = $6
       RETURNING id, updated_at`,
      [
        nom,
        templateSlug,
        JSON.stringify(cv),
        JSON.stringify(ordreSections),
        body.id,
        session.user.id,
      ]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: "CV introuvable." }, { status: 404 });
    }
    return NextResponse.json({ id: rows[0].id, updatedAt: rows[0].updated_at });
  }

  // Création d'un nouveau CV
  const { rows } = await pool.query(
    `INSERT INTO cv_modele (user_id, nom, template_slug, cv_data, ordre_sections)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, created_at`,
    [
      session.user.id,
      nom,
      templateSlug,
      JSON.stringify(cv),
      JSON.stringify(ordreSections),
    ]
  );

  return NextResponse.json({ id: rows[0].id, createdAt: rows[0].created_at });
}
