// Sections réorganisables du CV. L'ordre par défaut est le même
// que celui historique du repo (cf. cv-pdf.tsx, CVPreview.tsx).

export type SectionId =
  | "experiences"
  | "formation"
  | "competences"
  | "projets"
  | "certifications";

export const ORDRE_DEFAUT: SectionId[] = [
  "experiences",
  "formation",
  "competences",
  "projets",
  "certifications",
];

const IDS_VALIDES: ReadonlySet<string> = new Set<string>(ORDRE_DEFAUT);

export type SectionMeta = {
  id: SectionId;
  libelle: string;        // libellé carte sidebar
  titreSection: string;   // titre rendu dans le CV (majuscules)
  iconePath: string;      // path SVG (Heroicons solid, viewBox 24)
};

// Path SVG des icônes Heroicons solid (taille 24, fill="currentColor")
const ICONE_BRIEFCASE =
  "M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z";
const ICONE_ACADEMIC_CAP =
  "M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.61 54.61 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z";
const ICONE_WRENCH =
  "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25";
const ICONE_FOLDER =
  "M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z";
const ICONE_BADGE_CHECK =
  "M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z";

// Icônes des sections fixes (utilisées par la sidebar pour cohérence visuelle)
export const ICONE_USER =
  "M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z";
export const ICONE_HEADLINE =
  "M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z";
export const ICONE_DOCUMENT =
  "M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z";

export const SECTIONS_META: Record<SectionId, SectionMeta> = {
  experiences: {
    id: "experiences",
    libelle: "Expériences professionnelles",
    titreSection: "EXPÉRIENCE PROFESSIONNELLE",
    iconePath: ICONE_BRIEFCASE,
  },
  formation: {
    id: "formation",
    libelle: "Formation",
    titreSection: "FORMATION",
    iconePath: ICONE_ACADEMIC_CAP,
  },
  competences: {
    id: "competences",
    libelle: "Compétences",
    titreSection: "COMPÉTENCES",
    iconePath: ICONE_WRENCH,
  },
  projets: {
    id: "projets",
    libelle: "Projets",
    titreSection: "PROJETS",
    iconePath: ICONE_FOLDER,
  },
  certifications: {
    id: "certifications",
    libelle: "Certifications",
    titreSection: "CERTIFICATIONS",
    iconePath: ICONE_BADGE_CHECK,
  },
};

// Normalise un input quelconque en un ordre valide :
// - filtre les IDs inconnus
// - dédoublonne
// - complète avec les sections manquantes (dans l'ordre par défaut)
export function normaliserOrdre(input: unknown): SectionId[] {
  const liste = Array.isArray(input) ? input : [];
  const vus = new Set<SectionId>();
  const out: SectionId[] = [];
  for (const x of liste) {
    if (typeof x === "string" && IDS_VALIDES.has(x) && !vus.has(x as SectionId)) {
      vus.add(x as SectionId);
      out.push(x as SectionId);
    }
  }
  for (const id of ORDRE_DEFAUT) {
    if (!vus.has(id)) out.push(id);
  }
  return out;
}
