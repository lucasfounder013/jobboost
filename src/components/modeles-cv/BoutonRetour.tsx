"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

// Bouton retour affiché en haut de /modeles-cv.
// - Utilisateur connecté → retour vers /dashboard
// - Visiteur anonyme → retour vers la homepage
export default function BoutonRetour() {
  const { data: session, isPending } = useSession();
  const href = session ? "/dashboard" : "/";
  const label = session ? "Retour au dashboard" : "Retour à l'accueil";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors ${isPending ? "invisible" : ""}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}
