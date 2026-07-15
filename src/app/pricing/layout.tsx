import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs | Rivjob",
  description: "Découvrez les offres Rivjob : 3 analyses CV gratuites, puis passez Pro pour adapter votre CV à chaque offre et multiplier vos entretiens.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
