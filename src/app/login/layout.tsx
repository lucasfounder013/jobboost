import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Rivjob",
  description: "Connectez-vous à Rivjob pour accéder à vos analyses de CV et obtenir plus d'entretiens grâce à un CV optimisé pour chaque offre.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
