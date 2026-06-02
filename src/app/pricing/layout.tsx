import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs | JobBoost",
  description: "Découvrez les offres JobBoost : 5 analyses CV gratuites, puis passez Pro pour adapter votre CV à chaque offre et multiplier vos entretiens.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
