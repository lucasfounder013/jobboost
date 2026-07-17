import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos de Rivjob — Lucas Le Donne, créateur",
  description:
    "Découvrez l'histoire de Rivjob, l'alternative française à Jobscan. Pourquoi j'ai créé cet outil d'analyse CV/offre, et ma vision de la recherche d'emploi.",
  alternates: { canonical: "https://www.rivjob.ai/a-propos" },
  openGraph: {
    title: "À propos de Rivjob — Lucas Le Donne, créateur",
    description:
      "L'histoire derrière Rivjob : pourquoi j'ai créé un outil pour aider les candidats à passer les ATS et à se faire lire par les recruteurs.",
    url: "https://www.rivjob.ai/a-propos",
    type: "profile",
  },
};

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  return children;
}
