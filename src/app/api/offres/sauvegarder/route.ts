import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { OffreFT } from "@/types/offres";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const offre: OffreFT = await req.json();

  await pool.query(
    `INSERT INTO offres_sauvegardees
       (user_id, offre_id, titre, entreprise, localisation, date_publication,
        description_courte, url_offre, offre_texte_complet)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (user_id, offre_id) DO NOTHING`,
    [
      session.user.id,
      offre.id,
      offre.titre,
      offre.entreprise,
      offre.localisation,
      offre.datePublication,
      offre.descriptionCourte,
      offre.urlOffre,
      offre.offreTexteComplet,
    ]
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { dbId } = await req.json();

  await pool.query(
    `DELETE FROM offres_sauvegardees WHERE id = $1 AND user_id = $2`,
    [dbId, session.user.id]
  );

  return NextResponse.json({ ok: true });
}
