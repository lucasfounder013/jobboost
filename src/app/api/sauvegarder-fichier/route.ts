import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const formData = await req.formData();
  const fichier = formData.get("fichier");
  const analyseId = formData.get("analyseId");

  if (!fichier || !(fichier instanceof File) || !analyseId || typeof analyseId !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const ext = fichier.name.split(".").pop()?.toLowerCase();
  if (ext !== "pdf" && ext !== "docx") {
    return NextResponse.json({ error: "Format non supporté." }, { status: 400 });
  }

  const buffer = Buffer.from(await fichier.arrayBuffer());

  // Supprimer l'éventuel fichier précédent pour cette analyse
  await pool.query(`DELETE FROM cv_fichier_original WHERE analyse_id = $1 AND user_id = $2`, [analyseId, session.user.id]);

  await pool.query(
    `INSERT INTO cv_fichier_original (analyse_id, user_id, fichier_data, fichier_type, fichier_nom)
     VALUES ($1, $2, $3, $4, $5)`,
    [analyseId, session.user.id, buffer, ext, fichier.name]
  );

  return NextResponse.json({ ok: true });
}
