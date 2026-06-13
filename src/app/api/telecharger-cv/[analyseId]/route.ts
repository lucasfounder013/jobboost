import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";



const MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ analyseId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { analyseId } = await params;
  const preview = new URL(req.url).searchParams.get("preview") === "1";

  const { rows } = await pool.query(
    `SELECT fichier_data, fichier_type, fichier_nom
     FROM cv_fichier_original
     WHERE analyse_id = $1 AND user_id = $2
     LIMIT 1`,
    [analyseId, session.user.id]
  );

  if (rows.length === 0) return NextResponse.json({ error: "Fichier introuvable." }, { status: 404 });

  const { fichier_data, fichier_type, fichier_nom } = rows[0];
  const mimeType = MIME_TYPES[fichier_type] ?? "application/octet-stream";
  const disposition = preview
    ? `inline; filename="${encodeURIComponent(fichier_nom)}"`
    : `attachment; filename="${encodeURIComponent(fichier_nom)}"`;

  return new NextResponse(fichier_data, {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": disposition,
    },
  });
}
