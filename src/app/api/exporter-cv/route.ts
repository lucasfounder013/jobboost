import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import {
  Document,
  Paragraph,
  TextRun,
  Packer,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  AlignmentType,
} from "docx";
import React from "react";
import { CVStructure } from "@/types/cv";
import { CVPDFDocument } from "@/lib/cv-pdf";
import { CVPDFModerneDocument } from "@/lib/cv-pdf-moderne";
import { CVPDFElegantDocument } from "@/lib/cv-pdf-elegant";
import { TemplateSlug } from "@/lib/cv-templates";
import { SectionId, ORDRE_DEFAUT, normaliserOrdre } from "@/lib/cv-sections";

// --- Helpers DOCX communs ---

const ACCENT_MODERNE = "4F46E5";

function titreSectionClassique(texte: string) {
  return new Paragraph({
    children: [new TextRun({ text: texte, bold: true, size: 17, color: "222222", allCaps: true })],
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" } },
  });
}

function titreSectionModerne(texte: string) {
  return new Paragraph({
    children: [new TextRun({ text: texte, bold: true, size: 18, color: ACCENT_MODERNE, allCaps: true, font: "Calibri" })],
    spacing: { before: 220, after: 100 },
  });
}

function titreSectionElegantMain(texte: string) {
  return new Paragraph({
    children: [new TextRun({ text: texte, bold: true, size: 17, color: "222222", allCaps: true })],
    spacing: { before: 160, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" } },
  });
}

function titreSectionElegantCol(texte: string) {
  return new Paragraph({
    children: [new TextRun({ text: texte, bold: true, size: 16, color: "222222", allCaps: true })],
    spacing: { before: 120, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888" } },
  });
}

// --- Sections DOCX Classique (fonctions par section) ---

function paragraphesExperiencesClassique(cv: CVStructure): Paragraph[] {
  if (!cv.experiences?.length) return [];
  const out: Paragraph[] = [titreSectionClassique("EXPÉRIENCE PROFESSIONNELLE")];
  for (const exp of cv.experiences) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: exp.poste, bold: true, size: 20 }),
        new TextRun({ text: `   ${exp.dates}`, size: 17, color: "777777" }),
      ],
      spacing: { after: 20 },
    }));
    out.push(new Paragraph({
      children: [new TextRun({ text: `${exp.entreprise}${exp.lieu ? ` — ${exp.lieu}` : ""}`, italics: true, size: 18, color: "555555" })],
      spacing: { after: 40 },
    }));
    for (const m of exp.missions) {
      out.push(new Paragraph({
        children: [new TextRun({ text: m, size: 19 })],
        bullet: { level: 0 },
        spacing: { after: 20 },
      }));
    }
    out.push(new Paragraph({ spacing: { after: 80 } }));
  }
  return out;
}

function paragraphesFormationClassique(cv: CVStructure): Paragraph[] {
  if (!cv.formation?.length) return [];
  const out: Paragraph[] = [titreSectionClassique("FORMATION")];
  for (const f of cv.formation) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: f.diplome, bold: true, size: 20 }),
        new TextRun({ text: `   ${f.dates}`, size: 17, color: "777777" }),
      ],
      spacing: { after: 20 },
    }));
    out.push(new Paragraph({
      children: [new TextRun({ text: f.etablissement, italics: true, size: 18, color: "555555" })],
      spacing: { after: f.details ? 20 : 80 },
    }));
    if (f.details) {
      out.push(new Paragraph({
        children: [new TextRun({ text: f.details, size: 18 })],
        spacing: { after: 80 },
      }));
    }
  }
  return out;
}

function paragraphesCompetencesClassique(cv: CVStructure): Paragraph[] {
  const comps = cv.competences;
  if (!comps || !(comps.techniques?.length || comps.langues?.length || comps.autres?.length)) return [];
  const out: Paragraph[] = [titreSectionClassique("COMPÉTENCES")];
  if (comps.techniques?.length) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "Techniques : ", bold: true, size: 19 }),
        new TextRun({ text: comps.techniques.join(", "), size: 19 }),
      ],
      spacing: { after: 40 },
    }));
  }
  if (comps.langues?.length) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "Langues : ", bold: true, size: 19 }),
        new TextRun({ text: comps.langues.join(", "), size: 19 }),
      ],
      spacing: { after: 40 },
    }));
  }
  if (comps.autres?.length) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "Autres : ", bold: true, size: 19 }),
        new TextRun({ text: comps.autres.join(", "), size: 19 }),
      ],
      spacing: { after: 40 },
    }));
  }
  return out;
}

function paragraphesProjetsClassique(cv: CVStructure): Paragraph[] {
  if (!cv.projets?.length) return [];
  const out: Paragraph[] = [titreSectionClassique("PROJETS")];
  for (const p of cv.projets) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: p.nom, bold: true, size: 20 }),
        ...(p.technologies ? [new TextRun({ text: `  — ${p.technologies}`, size: 17, color: "666666" })] : []),
      ],
      spacing: { after: 20 },
    }));
    out.push(new Paragraph({
      children: [new TextRun({ text: p.description, size: 19 })],
      spacing: { after: 80 },
    }));
  }
  return out;
}

function paragraphesCertificationsClassique(cv: CVStructure): Paragraph[] {
  if (!cv.certifications?.length) return [];
  const out: Paragraph[] = [titreSectionClassique("CERTIFICATIONS")];
  for (const c of cv.certifications) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: c.nom, bold: true, size: 20 }),
        ...(c.date ? [new TextRun({ text: `   ${c.date}`, size: 17, color: "777777" })] : []),
      ],
      spacing: { after: 20 },
    }));
    if (c.organisme) {
      out.push(new Paragraph({
        children: [new TextRun({ text: c.organisme, italics: true, size: 18, color: "555555" })],
        spacing: { after: 60 },
      }));
    }
  }
  return out;
}

// --- Sections DOCX Moderne ---

function paragraphesExperiencesModerne(cv: CVStructure): Paragraph[] {
  if (!cv.experiences?.length) return [];
  const out: Paragraph[] = [titreSectionModerne("EXPÉRIENCE PROFESSIONNELLE")];
  for (const exp of cv.experiences) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: exp.poste, bold: true, size: 21, font: "Calibri" }),
        new TextRun({ text: `   ${exp.dates}`, size: 17, color: "777777", font: "Calibri" }),
      ],
      spacing: { after: 20 },
    }));
    out.push(new Paragraph({
      children: [new TextRun({ text: `${exp.entreprise}${exp.lieu ? ` — ${exp.lieu}` : ""}`, size: 18, color: "555555", font: "Calibri" })],
      spacing: { after: 40 },
    }));
    for (const m of exp.missions) {
      out.push(new Paragraph({
        children: [
          new TextRun({ text: "▸  ", bold: true, color: ACCENT_MODERNE, size: 19, font: "Calibri" }),
          new TextRun({ text: m, size: 19, font: "Calibri" }),
        ],
        spacing: { after: 30 },
      }));
    }
    out.push(new Paragraph({ spacing: { after: 80 } }));
  }
  return out;
}

function paragraphesFormationModerne(cv: CVStructure): Paragraph[] {
  if (!cv.formation?.length) return [];
  const out: Paragraph[] = [titreSectionModerne("FORMATION")];
  for (const f of cv.formation) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: f.diplome, bold: true, size: 21, font: "Calibri" }),
        new TextRun({ text: `   ${f.dates}`, size: 17, color: "777777", font: "Calibri" }),
      ],
      spacing: { after: 20 },
    }));
    out.push(new Paragraph({
      children: [new TextRun({ text: f.etablissement, size: 18, color: "555555", font: "Calibri" })],
      spacing: { after: f.details ? 20 : 80 },
    }));
    if (f.details) {
      out.push(new Paragraph({
        children: [new TextRun({ text: f.details, size: 18, font: "Calibri" })],
        spacing: { after: 80 },
      }));
    }
  }
  return out;
}

function paragraphesCompetencesModerne(cv: CVStructure): Paragraph[] {
  const comps = cv.competences;
  if (!comps || !(comps.techniques?.length || comps.langues?.length || comps.autres?.length)) return [];
  const out: Paragraph[] = [titreSectionModerne("COMPÉTENCES")];
  if (comps.techniques?.length) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "TECHNIQUES  ", bold: true, size: 18, color: ACCENT_MODERNE, font: "Calibri" }),
        new TextRun({ text: comps.techniques.join(" · "), size: 19, font: "Calibri" }),
      ],
      spacing: { after: 40 },
    }));
  }
  if (comps.langues?.length) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "LANGUES  ", bold: true, size: 18, color: ACCENT_MODERNE, font: "Calibri" }),
        new TextRun({ text: comps.langues.join(" · "), size: 19, font: "Calibri" }),
      ],
      spacing: { after: 40 },
    }));
  }
  if (comps.autres?.length) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: "AUTRES  ", bold: true, size: 18, color: ACCENT_MODERNE, font: "Calibri" }),
        new TextRun({ text: comps.autres.join(" · "), size: 19, font: "Calibri" }),
      ],
      spacing: { after: 40 },
    }));
  }
  return out;
}

function paragraphesProjetsModerne(cv: CVStructure): Paragraph[] {
  if (!cv.projets?.length) return [];
  const out: Paragraph[] = [titreSectionModerne("PROJETS")];
  for (const p of cv.projets) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: p.nom, bold: true, size: 21, font: "Calibri" }),
        ...(p.technologies ? [new TextRun({ text: `  — ${p.technologies}`, size: 17, color: "666666", font: "Calibri" })] : []),
      ],
      spacing: { after: 20 },
    }));
    out.push(new Paragraph({
      children: [new TextRun({ text: p.description, size: 19, font: "Calibri" })],
      spacing: { after: 80 },
    }));
  }
  return out;
}

function paragraphesCertificationsModerne(cv: CVStructure): Paragraph[] {
  if (!cv.certifications?.length) return [];
  const out: Paragraph[] = [titreSectionModerne("CERTIFICATIONS")];
  for (const c of cv.certifications) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: c.nom, bold: true, size: 21, font: "Calibri" }),
        ...(c.date ? [new TextRun({ text: `   ${c.date}`, size: 17, color: "777777", font: "Calibri" })] : []),
      ],
      spacing: { after: 20 },
    }));
    if (c.organisme) {
      out.push(new Paragraph({
        children: [new TextRun({ text: c.organisme, size: 18, color: "555555", font: "Calibri" })],
        spacing: { after: 60 },
      }));
    }
  }
  return out;
}

// --- Sections DOCX Élégant (colonne droite uniquement) ---

function paragrapheTexte(texte: string, options: { taille?: number; gras?: boolean; couleur?: string; italique?: boolean; apres?: number } = {}) {
  return new Paragraph({
    children: [new TextRun({ text: texte, bold: options.gras, italics: options.italique, size: options.taille ?? 18, color: options.couleur ?? "333333" })],
    spacing: { after: options.apres ?? 40 },
  });
}

function paragraphesExperiencesElegant(cv: CVStructure): Paragraph[] {
  if (!cv.experiences?.length) return [];
  const out: Paragraph[] = [titreSectionElegantMain("EXPÉRIENCE PROFESSIONNELLE")];
  for (const exp of cv.experiences) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: exp.poste, bold: true, size: 20 }),
        new TextRun({ text: `   ${exp.dates}`, size: 17, color: "777777" }),
      ],
      spacing: { after: 20 },
    }));
    out.push(paragrapheTexte(`${exp.entreprise}${exp.lieu ? ` — ${exp.lieu}` : ""}`, { taille: 18, couleur: "555555", italique: true, apres: 40 }));
    for (const m of exp.missions) {
      out.push(new Paragraph({
        children: [new TextRun({ text: m, size: 19 })],
        bullet: { level: 0 },
        spacing: { after: 20 },
      }));
    }
    out.push(new Paragraph({ spacing: { after: 80 } }));
  }
  return out;
}

function paragraphesFormationElegant(cv: CVStructure): Paragraph[] {
  if (!cv.formation?.length) return [];
  const out: Paragraph[] = [titreSectionElegantMain("FORMATION")];
  for (const f of cv.formation) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: f.diplome, bold: true, size: 20 }),
        new TextRun({ text: `   ${f.dates}`, size: 17, color: "777777" }),
      ],
      spacing: { after: 20 },
    }));
    out.push(paragrapheTexte(f.etablissement, { taille: 18, couleur: "555555", italique: true, apres: f.details ? 20 : 80 }));
    if (f.details) {
      out.push(paragrapheTexte(f.details, { taille: 18, apres: 80 }));
    }
  }
  return out;
}

function paragraphesProjetsElegant(cv: CVStructure): Paragraph[] {
  if (!cv.projets?.length) return [];
  const out: Paragraph[] = [titreSectionElegantMain("PROJETS")];
  for (const p of cv.projets) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: p.nom, bold: true, size: 20 }),
        ...(p.technologies ? [new TextRun({ text: `  — ${p.technologies}`, size: 17, color: "666666" })] : []),
      ],
      spacing: { after: 20 },
    }));
    out.push(paragrapheTexte(p.description, { taille: 19, apres: 80 }));
  }
  return out;
}

function paragraphesCertificationsElegant(cv: CVStructure): Paragraph[] {
  if (!cv.certifications?.length) return [];
  const out: Paragraph[] = [titreSectionElegantMain("CERTIFICATIONS")];
  for (const c of cv.certifications) {
    out.push(new Paragraph({
      children: [
        new TextRun({ text: c.nom, bold: true, size: 20 }),
        ...(c.date ? [new TextRun({ text: `   ${c.date}`, size: 17, color: "777777" })] : []),
      ],
      spacing: { after: 20 },
    }));
    if (c.organisme) {
      out.push(paragrapheTexte(c.organisme, { taille: 18, couleur: "555555", italique: true, apres: 60 }));
    }
  }
  return out;
}

// --- Mappings section → constructeur de paragraphes ---

type SectionBuilder = (cv: CVStructure) => Paragraph[];

const SECTIONS_CLASSIQUE: Record<SectionId, SectionBuilder> = {
  experiences: paragraphesExperiencesClassique,
  formation: paragraphesFormationClassique,
  competences: paragraphesCompetencesClassique,
  projets: paragraphesProjetsClassique,
  certifications: paragraphesCertificationsClassique,
};

const SECTIONS_MODERNE: Record<SectionId, SectionBuilder> = {
  experiences: paragraphesExperiencesModerne,
  formation: paragraphesFormationModerne,
  competences: paragraphesCompetencesModerne,
  projets: paragraphesProjetsModerne,
  certifications: paragraphesCertificationsModerne,
};

const SECTIONS_ELEGANT_DROITE: Record<Exclude<SectionId, "competences">, SectionBuilder> = {
  experiences: paragraphesExperiencesElegant,
  formation: paragraphesFormationElegant,
  projets: paragraphesProjetsElegant,
  certifications: paragraphesCertificationsElegant,
};

// --- DOCX : Classique ATS ---

function construireDocxClassique(cv: CVStructure, ordre: SectionId[]): Document {
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
    paragraphes.push(titreSectionClassique("PROFIL"));
    paragraphes.push(new Paragraph({
      children: [new TextRun({ text: cv.resume, size: 19, color: "444444" })],
      spacing: { after: 120 },
    }));
  }

  for (const id of ordre) {
    paragraphes.push(...SECTIONS_CLASSIQUE[id](cv));
  }

  return new Document({ sections: [{ children: paragraphes }] });
}

// --- DOCX : Moderne ---

function construireDocxModerne(cv: CVStructure, ordre: SectionId[]): Document {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean).join("  ·  ");

  const paragraphes: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: cv.nom, bold: true, size: 44, color: ACCENT_MODERNE, font: "Calibri" })],
      spacing: { after: 40 },
    }),
    ...(cv.titre ? [new Paragraph({
      children: [new TextRun({ text: cv.titre, size: 22, color: "555555", font: "Calibri" })],
      spacing: { after: 40 },
    })] : []),
    ...(contactItems ? [new Paragraph({
      children: [new TextRun({ text: contactItems, size: 17, color: "666666", font: "Calibri" })],
      spacing: { after: 200 },
    })] : []),
  ];

  if (cv.resume) {
    paragraphes.push(titreSectionModerne("PROFIL"));
    paragraphes.push(new Paragraph({
      children: [new TextRun({ text: cv.resume, size: 19, color: "444444", font: "Calibri" })],
      spacing: { after: 120 },
    }));
  }

  for (const id of ordre) {
    paragraphes.push(...SECTIONS_MODERNE[id](cv));
  }

  return new Document({ sections: [{ children: paragraphes }] });
}

// --- DOCX : Élégant (2 colonnes via Table) ---

function bordureInvisible() {
  return {
    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  };
}

function construireDocxElegant(cv: CVStructure, ordre: SectionId[]): Document {
  // Colonne gauche (figée)
  const gauche: Paragraph[] = [];
  gauche.push(new Paragraph({
    children: [new TextRun({ text: cv.nom, bold: true, size: 32 })],
    spacing: { after: 60 },
  }));
  if (cv.titre) {
    gauche.push(new Paragraph({
      children: [new TextRun({ text: cv.titre, italics: true, size: 18, color: "555555" })],
      spacing: { after: 200 },
    }));
  }

  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean) as string[];

  if (contactItems.length > 0) {
    gauche.push(titreSectionElegantCol("CONTACT"));
    for (const c of contactItems) {
      gauche.push(paragrapheTexte(c, { taille: 17, couleur: "444444", apres: 30 }));
    }
  }

  if (cv.competences?.techniques?.length) {
    gauche.push(titreSectionElegantCol("COMPÉTENCES"));
    for (const c of cv.competences.techniques) {
      gauche.push(paragrapheTexte(`· ${c}`, { taille: 17, couleur: "444444", apres: 20 }));
    }
  }

  if (cv.competences?.langues?.length) {
    gauche.push(titreSectionElegantCol("LANGUES"));
    for (const l of cv.competences.langues) {
      gauche.push(paragrapheTexte(`· ${l}`, { taille: 17, couleur: "444444", apres: 20 }));
    }
  }

  if (cv.competences?.autres?.length) {
    gauche.push(titreSectionElegantCol("AUTRES"));
    for (const a of cv.competences.autres) {
      gauche.push(paragrapheTexte(`· ${a}`, { taille: 17, couleur: "444444", apres: 20 }));
    }
  }

  // Colonne droite (réorganisable, sans competences)
  const droite: Paragraph[] = [];
  if (cv.resume) {
    droite.push(titreSectionElegantMain("PROFIL"));
    droite.push(paragrapheTexte(cv.resume, { taille: 19, couleur: "444444", apres: 120 }));
  }

  for (const id of ordre) {
    if (id === "competences") continue;
    droite.push(...SECTIONS_ELEGANT_DROITE[id](cv));
  }

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, color: "auto", fill: "F3F4F6" },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            borders: bordureInvisible(),
            children: gauche.length > 0 ? gauche : [new Paragraph({ children: [new TextRun({ text: "", size: 1 })], alignment: AlignmentType.LEFT })],
          }),
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 250, right: 200 },
            borders: bordureInvisible(),
            children: droite.length > 0 ? droite : [new Paragraph({ children: [new TextRun({ text: "", size: 1 })], alignment: AlignmentType.LEFT })],
          }),
        ],
      }),
    ],
  });

  return new Document({ sections: [{ children: [table] }] });
}

// --- Dispatchers ---

const COMPOSANTS_PDF: Record<TemplateSlug, (props: { cv: CVStructure; ordreSections?: SectionId[] }) => React.ReactElement> = {
  "classique-ats": CVPDFDocument,
  moderne: CVPDFModerneDocument,
  elegant: CVPDFElegantDocument,
};

const CONSTRUCTEURS_DOCX: Record<TemplateSlug, (cv: CVStructure, ordre: SectionId[]) => Document> = {
  "classique-ats": construireDocxClassique,
  moderne: construireDocxModerne,
  elegant: construireDocxElegant,
};

function estTemplateValide(t: unknown): t is TemplateSlug {
  return t === "classique-ats" || t === "moderne" || t === "elegant";
}

// --- Nettoyage des balises de surlignage [MOD]...[/MOD] ---

function strip(text: string): string {
  return text.replace(/\[MOD\](.*?)\[\/MOD\]/g, "$1");
}

function stripMarkersFromCV(cv: CVStructure): CVStructure {
  return {
    ...cv,
    titre: cv.titre ? strip(cv.titre) : cv.titre,
    resume: cv.resume ? strip(cv.resume) : cv.resume,
    experiences: cv.experiences?.map((e) => ({
      ...e,
      poste: strip(e.poste),
      missions: e.missions.map(strip),
    })),
    formation: cv.formation?.map((f) => ({
      ...f,
      diplome: strip(f.diplome),
      details: f.details ? strip(f.details) : f.details,
    })),
    competences: cv.competences
      ? {
          techniques: cv.competences.techniques?.map(strip),
          langues: cv.competences.langues?.map(strip),
          autres: cv.competences.autres?.map(strip),
        }
      : cv.competences,
    projets: cv.projets?.map((p) => ({ ...p, nom: strip(p.nom), technologies: p.technologies ? strip(p.technologies) : p.technologies, description: strip(p.description) })),
    certifications: cv.certifications?.map((c) => ({ ...c, nom: strip(c.nom) })),
  };
}

// --- Route handler ---

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    cv: CVStructure;
    format: "pdf" | "docx";
    template?: string;
    ordreSections?: unknown;
  };
  const { cv: cvBrut, format } = body;
  const cv = stripMarkersFromCV(cvBrut);

  if (!cvBrut || !format) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const template: TemplateSlug = body.template && estTemplateValide(body.template) ? body.template : "classique-ats";
  const ordreSections: SectionId[] = body.ordreSections === undefined ? [...ORDRE_DEFAUT] : normaliserOrdre(body.ordreSections);

  const nom = (cv.nom || "cv").toLowerCase().replace(/\s+/g, "_");

  if (format === "pdf") {
    const Composant = COMPOSANTS_PDF[template];
    const element = React.createElement(Composant, { cv, ordreSections }) as React.ReactElement<DocumentProps>;
    const buffer = await renderToBuffer(element);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${nom}_cv.pdf"`,
      },
    });
  }

  if (format === "docx") {
    const constructeur = CONSTRUCTEURS_DOCX[template];
    const doc = constructeur(cv, ordreSections);
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
