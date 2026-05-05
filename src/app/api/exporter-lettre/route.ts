import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { Document, Paragraph, TextRun, Packer, AlignmentType } from "docx";
import { Pool } from "pg";
import React from "react";
import { auth } from "@/lib/auth";
import { LettrePDFDocument } from "@/lib/lettre-pdf";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

type LettreData = {
  salutation: string;
  paragraphes: string[];
  formule_politesse: string;
};

type CvInfo = {
  nom: string;
  titre?: string;
  contact?: { email?: string; telephone?: string; localisation?: string };
};

function construireLettrDocx(lettre: LettreData, cvInfo: CvInfo, nomFichier: string): Document {
  const contactItems = [
    cvInfo.contact?.telephone,
    cvInfo.contact?.email,
    cvInfo.contact?.localisation,
  ].filter(Boolean).join("  ·  ");

  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const paragraphes: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: cvInfo.nom, bold: true, size: 30 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
    ...(cvInfo.titre ? [new Paragraph({
      children: [new TextRun({ text: cvInfo.titre, size: 20, color: "555555" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    })] : []),
    ...(contactItems ? [new Paragraph({
      children: [new TextRun({ text: contactItems, size: 18, color: "666666" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    })] : [new Paragraph({ spacing: { after: 300 } })]),
    new Paragraph({
      children: [new TextRun({ text: `Le ${date}`, size: 19 })],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 240 },
    }),
    new Paragraph({
      children: [new TextRun({ text: lettre.salutation, size: 20 })],
      spacing: { after: 200 },
    }),
    ...lettre.paragraphes.map((p) => new Paragraph({
      children: [new TextRun({ text: p, size: 20 })],
      spacing: { after: 160 },
    })),
    new Paragraph({
      children: [new TextRun({ text: lettre.formule_politesse, size: 20 })],
      spacing: { before: 240, after: 320 },
    }),
    new Paragraph({
      children: [new TextRun({ text: cvInfo.nom, bold: true, size: 20 })],
    }),
  ];

  return new Document({ sections: [{ children: paragraphes }] });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { analyseId, format } = await req.json() as { analyseId: string; format: "pdf" | "docx" };
  if (!analyseId || !format) return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });

  // Récupérer la lettre
  const { rows } = await pool.query(
    `SELECT lettre_texte, nom_offre FROM lettres_motivation WHERE analyse_id = $1 AND user_id = $2 LIMIT 1`,
    [analyseId, session.user.id]
  );
  if (rows.length === 0) return NextResponse.json({ error: "Lettre introuvable." }, { status: 404 });
  const { lettre_texte, nom_offre } = rows[0];

  // Récupérer le CV adapté pour les infos du candidat (cast uuid→text pour compatibilité)
  const { rows: rowsCv } = await pool.query(
    `SELECT cv_data FROM cv_adapte WHERE analyse_id::text = $1 LIMIT 1`,
    [analyseId]
  );
  const cv_data = rowsCv[0]?.cv_data ?? null;

  let lettre: LettreData;
  try {
    lettre = JSON.parse(lettre_texte);
  } catch {
    return NextResponse.json({ error: "Données de lettre corrompues." }, { status: 500 });
  }

  // Extraire les infos du candidat depuis le CV adapté (ou fallback minimal)
  let cvInfo: CvInfo = { nom: "Candidat" };
  if (cv_data) {
    try {
      const cv = typeof cv_data === "string" ? JSON.parse(cv_data) : cv_data;
      cvInfo = {
        nom: cv.nom ?? "Candidat",
        titre: cv.titre,
        contact: cv.contact,
      };
    } catch {}
  }

  const nomFichier = nom_offre.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

  if (format === "pdf") {
    const element = React.createElement(LettrePDFDocument, {
      nom: cvInfo.nom,
      titre: cvInfo.titre,
      contact: cvInfo.contact,
      salutation: lettre.salutation,
      paragraphes: lettre.paragraphes,
      formule_politesse: lettre.formule_politesse,
    }) as React.ReactElement<DocumentProps>;
    const buffer = await renderToBuffer(element);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${nomFichier}_lettre.pdf"`,
      },
    });
  }

  if (format === "docx") {
    const doc = construireLettrDocx(lettre, cvInfo, nomFichier);
    const buffer = await Packer.toBuffer(doc);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${nomFichier}_lettre.docx"`,
      },
    });
  }

  return NextResponse.json({ error: "Format non supporté." }, { status: 400 });
}
