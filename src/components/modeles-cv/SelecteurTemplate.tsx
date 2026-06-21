"use client";

import { useRouter } from "next/navigation";
import { TEMPLATES, TemplateSlug } from "@/lib/cv-templates";
import ApercuMini from "./ApercuMini";

type Props = {
  slugActif: TemplateSlug;
};

export default function SelecteurTemplate({ slugActif }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl ring-1 ring-gray-200 p-4">
      <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Changer de modèle</p>
      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map((t) => {
          const actif = t.slug === slugActif;
          return (
            <button
              key={t.slug}
              type="button"
              onClick={() => router.push(`/modeles-cv/${t.slug}`)}
              className={`rounded-lg p-1.5 transition-all ${
                actif
                  ? "ring-2 ring-indigo-500 bg-indigo-50"
                  : "ring-1 ring-gray-200 hover:ring-indigo-300 bg-white"
              }`}
            >
              <ApercuMini slug={t.slug} />
              <p className={`text-xs font-semibold text-center mt-2 ${actif ? "text-indigo-700" : "text-gray-700"}`}>
                {t.nom}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
