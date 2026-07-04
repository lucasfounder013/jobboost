"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { CVStructure } from "@/types/cv";
import { TemplateSlug } from "@/lib/cv-templates";
import { SectionId } from "@/lib/cv-sections";
import { deposerSauvegardePending } from "@/lib/cv-localstorage";

type Props = {
  cv: CVStructure;
  templateSlug: TemplateSlug;
  ordreSections: SectionId[];
  cvId?: string | null;
  onSaved?: (id: string) => void;
};

type Etat = "idle" | "loading" | "saved" | "error";

export default function BoutonEnregistrer({ cv, templateSlug, ordreSections, cvId, onSaved }: Props) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [etat, setEtat] = useState<Etat>("idle");
  const [messageErreur, setMessageErreur] = useState<string | null>(null);

  async function enregistrer() {
    setMessageErreur(null);

    // Utilisateur non connecté → dépôt en localStorage + redirection /register
    if (!session) {
      deposerSauvegardePending({ cv, templateSlug, ordreSections });
      router.push("/register?source=modele-cv-save");
      return;
    }

    // Utilisateur connecté → POST API (INSERT ou UPDATE selon présence de cvId)
    setEtat("loading");
    try {
      const reponse = await fetch("/api/cv-modele/sauvegarder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cvId ?? undefined, cv, templateSlug, ordreSections }),
      });
      if (!reponse.ok) {
        const data = await reponse.json().catch(() => ({ error: "Erreur inconnue" }));
        throw new Error(data.error || "Erreur lors de l'enregistrement");
      }
      const data = (await reponse.json()) as { id?: string };
      if (data.id && onSaved) onSaved(data.id);
      setEtat("saved");
      // Retour à idle après 3 secondes pour permettre une nouvelle sauvegarde
      setTimeout(() => setEtat("idle"), 3000);
    } catch (e) {
      setEtat("error");
      setMessageErreur(e instanceof Error ? e.message : "Une erreur est survenue.");
    }
  }

  const desactive = etat === "loading" || isPending;

  return (
    <>
      <button
        type="button"
        onClick={enregistrer}
        disabled={desactive}
        className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
      >
        {etat === "saved" ? (
          <>
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Progression enregistrée
          </>
        ) : etat === "loading" ? (
          "Enregistrement…"
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Enregistrer mon CV
          </>
        )}
      </button>
      {messageErreur && (
        <p className="text-xs text-red-600 mt-1">{messageErreur}</p>
      )}
    </>
  );
}
