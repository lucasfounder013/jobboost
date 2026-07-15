import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un compte | Rivjob",
  description: "Créez votre compte Rivjob gratuitement et obtenez 3 analyses de CV offertes pour maximiser vos chances de décrocher un entretien.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
