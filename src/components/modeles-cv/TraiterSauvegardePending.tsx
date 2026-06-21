"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  recupererSauvegardePending,
  effacerSauvegardePending,
} from "@/lib/cv-localstorage";

// Composant invisible monté sur le dashboard.
// Détecte une sauvegarde de CV en attente déposée avant l'inscription,
// la pousse vers l'API, puis affiche un toast de confirmation.
export default function TraiterSauvegardePending() {
  const { data: session } = useSession();
  const [toast, setToast] = useState<"saved" | "error" | null>(null);

  useEffect(() => {
    if (!session) return;
    const pending = recupererSauvegardePending();
    if (!pending) return;

    // On efface tout de suite la clé pour éviter une double sauvegarde en cas de re-render
    effacerSauvegardePending();

    (async () => {
      try {
        const reponse = await fetch("/api/cv-modele/sauvegarder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cv: pending.cv,
            templateSlug: pending.templateSlug,
            ordreSections: pending.ordreSections,
          }),
        });
        if (!reponse.ok) throw new Error("Erreur API");
        setToast("saved");
      } catch {
        setToast("error");
      }
      setTimeout(() => setToast(null), 5000);
    })();
  }, [session]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 px-5 py-3 flex items-center gap-3">
      {toast === "saved" ? (
        <>
          <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="font-semibold text-gray-900">Progression enregistrée dans votre compte</span>
        </>
      ) : (
        <>
          <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">!</span>
          <span className="font-semibold text-gray-900">Impossible d&apos;enregistrer le CV. Réessayez depuis l&apos;éditeur.</span>
        </>
      )}
    </div>
  );
}
