import type { Metadata } from "next";
import { ogMeta } from "@/lib/seo";

const TITRE = "Ressources CV, ATS et recherche d'emploi | Rivjob";
const DESCRIPTION = "Guides pratiques et gratuits sur le CV, les ATS, la lettre de motivation et la recherche d'emploi. 24+ articles écrits par Lucas le Donné, fondateur de Rivjob.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  ...ogMeta(TITRE, DESCRIPTION, "/ressources"),
};

export default function RessourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
