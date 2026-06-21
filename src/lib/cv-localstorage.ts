import { CVStructure } from "@/types/cv";
import { TemplateSlug } from "@/lib/cv-templates";
import { SectionId } from "@/lib/cv-sections";

export const CLE_CV_BROUILLON = "jobboost:modeles-cv:cv";
export const CLE_TEMPLATE = "jobboost:modeles-cv:template";
export const CLE_ORDRE_SECTIONS = "jobboost:modeles-cv:ordre";
export const CLE_CV_FUNNEL = "jobboost:funnel:cv-prefill";
export const CLE_SAUVEGARDE_PENDING = "jobboost:modeles-cv:sauvegarde-pending";

export type SauvegardePending = {
  cv: CVStructure;
  templateSlug: TemplateSlug;
  ordreSections: SectionId[];
};

function disponible(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function chargerCvBrouillon(): CVStructure | null {
  if (!disponible()) return null;
  try {
    const brut = window.localStorage.getItem(CLE_CV_BROUILLON);
    if (!brut) return null;
    return JSON.parse(brut) as CVStructure;
  } catch {
    return null;
  }
}

export function sauvegarderCvBrouillon(cv: CVStructure): void {
  if (!disponible()) return;
  try {
    window.localStorage.setItem(CLE_CV_BROUILLON, JSON.stringify(cv));
  } catch {
    // Quota dépassé ou stockage désactivé — silencieux
  }
}

export function chargerTemplateActif(): TemplateSlug | null {
  if (!disponible()) return null;
  const valeur = window.localStorage.getItem(CLE_TEMPLATE);
  if (valeur === "classique-ats" || valeur === "moderne" || valeur === "elegant") {
    return valeur;
  }
  return null;
}

export function sauvegarderTemplateActif(slug: TemplateSlug): void {
  if (!disponible()) return;
  window.localStorage.setItem(CLE_TEMPLATE, slug);
}

export function chargerOrdreSections(): SectionId[] | null {
  if (!disponible()) return null;
  try {
    const brut = window.localStorage.getItem(CLE_ORDRE_SECTIONS);
    if (!brut) return null;
    const parsé = JSON.parse(brut);
    if (!Array.isArray(parsé)) return null;
    return parsé as SectionId[];
  } catch {
    return null;
  }
}

export function sauvegarderOrdreSections(ordre: SectionId[]): void {
  if (!disponible()) return;
  try {
    window.localStorage.setItem(CLE_ORDRE_SECTIONS, JSON.stringify(ordre));
  } catch {
    // silencieux
  }
}

export function sauvegarderCvPourFunnel(cv: CVStructure): void {
  if (!disponible()) return;
  try {
    window.localStorage.setItem(CLE_CV_FUNNEL, JSON.stringify(cv));
  } catch {
    // silencieux
  }
}

export function deposerSauvegardePending(donnees: SauvegardePending): void {
  if (!disponible()) return;
  try {
    window.localStorage.setItem(CLE_SAUVEGARDE_PENDING, JSON.stringify(donnees));
  } catch {
    // silencieux
  }
}

export function recupererSauvegardePending(): SauvegardePending | null {
  if (!disponible()) return null;
  try {
    const brut = window.localStorage.getItem(CLE_SAUVEGARDE_PENDING);
    if (!brut) return null;
    return JSON.parse(brut) as SauvegardePending;
  } catch {
    return null;
  }
}

export function effacerSauvegardePending(): void {
  if (!disponible()) return;
  window.localStorage.removeItem(CLE_SAUVEGARDE_PENDING);
}
