export type TemplateSlug = "classique-ats" | "moderne" | "elegant";

export type Template = {
  slug: TemplateSlug;
  nom: string;
  tagline: string;
  descriptionLongue: string;
  accent: string;
};

export const TEMPLATES: Template[] = [
  {
    slug: "classique-ats",
    nom: "Classique",
    tagline: "Sobre et 100% lisible par les robots de recrutement",
    descriptionLongue:
      "Le modèle classique en Times New Roman, monocolonne et sans fioritures. Idéal pour les candidatures via plateformes (Workday, Taleo, Greenhouse) ou pour les secteurs traditionnels (finance, droit, fonction publique).",
    accent: "#1F2937",
  },
  {
    slug: "moderne",
    nom: "Moderne",
    tagline: "Design épuré avec accent couleur, pour les profils tech et créatifs",
    descriptionLongue:
      "Un modèle sans-serif aéré, avec un accent violet pour structurer les sections. Parfait pour les développeurs, designers, marketeurs et tout profil qui veut sortir du lot sans sacrifier la lisibilité ATS.",
    accent: "#4F46E5",
  },
  {
    slug: "elegant",
    nom: "Élégant",
    tagline: "Mise en page en 2 colonnes, serif raffinée",
    descriptionLongue:
      "Une mise en page en deux colonnes (compétences à gauche, expériences à droite), en police serif. Idéal pour les profils expérimentés qui veulent mettre leurs compétences en avant dès le premier coup d'œil.",
    accent: "#6B7280",
  },
];

export function getTemplate(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}
