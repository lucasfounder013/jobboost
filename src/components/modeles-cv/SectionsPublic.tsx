"use client";

import { ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

// Affiche ses enfants uniquement pour les visiteurs anonymes.
// Sert à masquer "Pourquoi nos modèles", FAQ, CTA bas de page
// quand l'utilisateur est déjà connecté (vient du dashboard).
export default function SectionsPublic({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  if (isPending) return null;
  if (session) return null;
  return <>{children}</>;
}
