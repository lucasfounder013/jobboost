import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";
import { CVStructure } from "@/types/cv";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const body = await req.json() as {
    analyseId?: string;
    nomOffre: string;
    score?: number;
    resume?: string;
    motsClesManquants?: string[];
    motsClesPresents?: string[];
    cvAdapte?: CVStructure;
  };

  const { analyseId, nomOffre, score, resume, motsClesManquants, motsClesPresents, cvAdapte } = body;

  if (!nomOffre) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  // Cas B : ajouter un CV adapté à une analyse existante
  if (analyseId && typeof score === "undefined") {
    if (!cvAdapte) {
      return NextResponse.json({ error: "CV adapté manquant." }, { status: 400 });
    }
    await pool.query(
      `INSERT INTO cv_adapte (user_id, analyse_id, nom_offre, cv_data)
       VALUES ($1, $2, $3, $4)`,
      [session.user.id, analyseId, nomOffre, JSON.stringify(cvAdapte)]
    );
    return NextResponse.json({ analyseId });
  }

  // Cas A : créer une nouvelle analyse (+ optionnellement un CV adapté)
  if (typeof score !== "number") {
    return NextResponse.json({ error: "Score manquant." }, { status: 400 });
  }

  const { rows } = await pool.query(
    `INSERT INTO analyses (user_id, nom_offre, score, resume, mots_cles_manquants, mots_cles_presents)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [session.user.id, nomOffre, score, resume ?? "", JSON.stringify(motsClesManquants ?? []), JSON.stringify(motsClesPresents ?? [])]
  );
  const nouvelAnalyseId: string = rows[0].id;

  if (cvAdapte) {
    await pool.query(
      `INSERT INTO cv_adapte (user_id, analyse_id, nom_offre, cv_data)
       VALUES ($1, $2, $3, $4)`,
      [session.user.id, nouvelAnalyseId, nomOffre, JSON.stringify(cvAdapte)]
    );
  }

  return NextResponse.json({ analyseId: nouvelAnalyseId });
}
