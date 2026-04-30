import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { Document, Paragraph, TextRun, Packer, BorderStyle } from "docx";
import React from "react";
import { CVStructure } from "@/types/cv";
import { CVPDFDocument } from "@/lib/cv-pdf";

// --- DOCX ---

function titreSection(texte: string) {
  return new Paragraph({
    children: [new TextRun({ text: texte, bold: true, size: 17, color: "222222", allCaps: true })],
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" } },
  });
}

function construireDocx(cv: CVStructure): Document {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean).join("  ·  ");

  const paragraphes: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: cv.nom, bold: true, size: 44 })],
      spacing: { after: 40 },
    }),
    ...(cv.titre ? [new Paragraph({
      children: [new TextRun({ text: cv.titre, size: 22, color: "444444" })],
      spacing: { after: 40 },
    })] : []),
    ...(contactItems ? [new Paragraph({
      children: [new TextRun({ text: contactItems, size: 17, color: "666666" })],
      spacing: { after: 200 },
    })] : []),
  ];

  if (cv.resume) {
    paragraphes.push(titreSection("PROFIL"));
    paragraphes.push(new Paragraph({
      children: [new TextRun({ text: cv.resume, size: 19, color: "444444" })],
      spacing: { after: 120 },
    }));
  }

  if (cv.experiences?.length) {
    paragraphes.push(titreSection("EXPÉRIENCE PROFESSIONNELLE"));
    for (const exp of cv.experiences) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: exp.poste, bold: true, size: 20 }),
          new TextRun({ text: `   ${exp.dates}`, size: 17, color: "777777" }),
        ],
        spacing: { after: 20 },
      }));
      paragraphes.push(new Paragraph({
        children: [new TextRun({ text: `${exp.entreprise}${exp.lieu ? ` — ${exp.lieu}` : ""}`, italics: true, size: 18, color: "555555" })],
        spacing: { after: 40 },
      }));
      for (const m of exp.missions) {
        paragraphes.push(new Paragraph({
          children: [new TextRun({ text: m, size: 19 })],
          bullet: { level: 0 },
          spacing: { after: 20 },
        }));
      }
      paragraphes.push(new Paragraph({ spacing: { after: 80 } }));
    }
  }

  if (cv.formation?.length) {
    paragraphes.push(titreSection("FORMATION"));
    for (const f of cv.formation) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: f.diplome, bold: true, size: 20 }),
          new TextRun({ text: `   ${f.dates}`, size: 17, color: "777777" }),
        ],
        spacing: { after: 20 },
      }));
      paragraphes.push(new Paragraph({
        children: [new TextRun({ text: f.etablissement, italics: true, size: 18, color: "555555" })],
        spacing: { after: f.details ? 20 : 80 },
      }));
      if (f.details) {
        paragraphes.push(new Paragraph({
          children: [new TextRun({ text: f.details, size: 18 })],
          spacing: { after: 80 },
        }));
      }
    }
  }

  const comps = cv.competences;
  if (comps && (comps.techniques?.length || comps.langues?.length || comps.autres?.length)) {
    paragraphes.push(titreSection("COMPÉTENCES"));
    if (comps.techniques?.length) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: "Techniques : ", bold: true, size: 19 }),
          new TextRun({ text: comps.techniques.join(", "), size: 19 }),
        ],
        spacing: { after: 40 },
      }));
    }
    if (comps.langues?.length) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: "Langues : ", bold: true, size: 19 }),
          new TextRun({ text: comps.langues.join(", "), size: 19 }),
        ],
        spacing: { after: 40 },
      }));
    }
    if (comps.autres?.length) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: "Autres : ", bold: true, size: 19 }),
          new TextRun({ text: comps.autres.join(", "), size: 19 }),
        ],
        spacing: { after: 40 },
      }));
    }
  }

  if (cv.projets?.length) {
    paragraphes.push(titreSection("PROJETS"));
    for (const p of cv.projets) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: p.nom, bold: true, size: 20 }),
          ...(p.technologies ? [new TextRun({ text: `  — ${p.technologies}`, size: 17, color: "666666" })] : []),
        ],
        spacing: { after: 20 },
      }));
      paragraphes.push(new Paragraph({
        children: [new TextRun({ text: p.description, size: 19 })],
        spacing: { after: 80 },
      }));
    }
  }

  if (cv.certifications?.length) {
    paragraphes.push(titreSection("CERTIFICATIONS"));
    for (const c of cv.certifications) {
      paragraphes.push(new Paragraph({
        children: [
          new TextRun({ text: c.nom, bold: true, size: 20 }),
          ...(c.date ? [new TextRun({ text: `   ${c.date}`, size: 17, color: "777777" })] : []),
        ],
        spacing: { after: 20 },
      }));
      if (c.organisme) {
        paragraphes.push(new Paragraph({
          children: [new TextRun({ text: c.organisme, italics: true, size: 18, color: "555555" })],
          spacing: { after: 60 },
        }));
      }
    }
  }

  return new Document({
    sections: [{ children: paragraphes }],
  });
}

// --- Route handler ---

export async function POST(req: NextRequest) {
  const { cv, format } = await req.json() as { cv: CVStructure; format: "pdf" | "docx" };

  if (!cv || !format) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const nom = (cv.nom || "cv").toLowerCase().replace(/\s+/g, "_");

  if (format === "pdf") {
    const element = React.createElement(CVPDFDocument, { cv }) as React.ReactElement<DocumentProps>;
    const buffer = await renderToBuffer(element);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${nom}_cv.pdf"`,
      },
    });
  }

  if (format === "docx") {
    const doc = construireDocx(cv);
    const buffer = await Packer.toBuffer(doc);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${nom}_cv.docx"`,
      },
    });
  }

  return NextResponse.json({ error: "Format non supporté." }, { status: 400 });
}
