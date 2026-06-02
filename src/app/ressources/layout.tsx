import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides CV & ATS gratuits | JobBoost",
  description: "Guides pratiques et gratuits pour optimiser votre CV, comprendre les ATS et maximiser vos chances d'être retenu par les recruteurs.",
};

export default function RessourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
