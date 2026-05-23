import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { OffreSauvegardee } from "@/types/offres";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { rows } = await pool.query(
    `SELECT id, offre_id, titre, entreprise, localisation, date_publication,
            description_courte, url_offre, offre_texte_complet, created_at
     FROM offres_sauvegardees
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.user.id]
  );

  const offres: OffreSauvegardee[] = rows.map((r) => ({
    dbId: r.id,
    id: r.offre_id,
    titre: r.titre,
    entreprise: r.entreprise ?? "",
    localisation: r.localisation ?? "",
    datePublication: r.date_publication ?? "",
    descriptionCourte: r.description_courte ?? "",
    urlOffre: r.url_offre ?? "",
    offreTexteComplet: r.offre_texte_complet ?? "",
    savedAt: r.created_at,
  }));

  return NextResponse.json({ offres });
}
