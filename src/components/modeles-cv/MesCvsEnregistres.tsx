"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { TemplateSlug, getTemplate } from "@/lib/cv-templates";

type CvEnregistre = {
  id: string;
  nom: string;
  titre: string;
  templateSlug: TemplateSlug;
  updatedAt: string;
};

export default function MesCvsEnregistres() {
  const { data: session, isPending } = useSession();
  const [cvs, setCvs] = useState<CvEnregistre[] | null>(null);
  const [chargement, setChargement] = useState(false);
  const [idEnSuppression, setIdEnSuppression] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !session) return;
    let annule = false;
    setChargement(true);
    fetch("/api/cv-modele")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Chargement impossible."))))
      .then((data: { cvs: CvEnregistre[] }) => {
        if (!annule) setCvs(data.cvs);
      })
      .catch(() => {
        if (!annule) setCvs([]);
      })
      .finally(() => {
        if (!annule) setChargement(false);
      });
    return () => {
      annule = true;
    };
  }, [isPending, session]);

  async function supprimer(id: string) {
    if (!confirm("Supprimer ce CV enregistré ?")) return;
    setIdEnSuppression(id);
    try {
      const r = await fetch(`/api/cv-modele/${id}`, { method: "DELETE" });
      if (r.ok) {
        setCvs((prev) => (prev ? prev.filter((c) => c.id !== id) : prev));
      }
    } finally {
      setIdEnSuppression(null);
    }
  }

  // Ne rien afficher tant qu'on ne connaît pas la session ou si l'utilisateur n'est pas connecté
  if (isPending || !session) return null;
  if (chargement && cvs === null) {
    return (
      <section className="max-w-5xl mx-auto w-full px-6 pb-8">
        <p className="text-sm text-gray-500">Chargement de vos CV enregistrés…</p>
      </section>
    );
  }
  if (!cvs || cvs.length === 0) return null;

  return (
    <section id="mes-cvs-enregistres" className="max-w-5xl mx-auto w-full px-6 pb-10 scroll-mt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Mes CV enregistrés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cvs.map((cv) => {
          const template = getTemplate(cv.templateSlug);
          return (
            <div
              key={cv.id}
              className="relative bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
            >
              <Link
                href={`/modeles-cv/${cv.templateSlug}?cvId=${cv.id}`}
                className="flex flex-col flex-1 group"
              >
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 flex items-center justify-center min-h-[140px]">
                  <div className="text-center px-4">
                    <p className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors duration-150">
                      {cv.titre?.trim() || "Poste non renseigné"}
                    </p>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mt-2">
                      Modèle {template?.nom ?? cv.templateSlug}
                    </p>
                  </div>
                </div>
                <div className="flex-1 px-5 pt-4 pb-3">
                  <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 group-hover:text-indigo-600 transition-colors duration-150 truncate">
                    {cv.nom || "Mon CV"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Modifié le {new Date(cv.updatedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="px-5 pb-5">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                    Reprendre l&apos;édition
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => supprimer(cv.id)}
                disabled={idEnSuppression === cv.id}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur ring-1 ring-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:ring-red-200 transition-colors disabled:opacity-50"
                aria-label="Supprimer ce CV"
                title="Supprimer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
