"use client";

import { Candidature, metaStatut } from "./types";

type Props = {
  candidatures: Candidature[];
  onOuvrirCarte: (c: Candidature) => void;
};

const formaterDate = (iso: string | null) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
};

export default function ListeCandidatures({ candidatures, onOuvrirCarte }: Props) {
  if (candidatures.length === 0) {
    return (
      <div className="rounded-2xl bg-white ring-1 ring-gray-200 px-6 py-16 text-center text-sm text-gray-500">
        Aucune candidature pour l&apos;instant.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-200 overflow-hidden">
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
        <span>Poste</span>
        <span>Entreprise</span>
        <span>Statut</span>
        <span>Postulée le</span>
        <span>Relance</span>
      </div>
      {candidatures.map((c) => {
        const meta = metaStatut(c.statut);
        return (
          <button
            key={c.id}
            onClick={() => onOuvrirCarte(c)}
            className="w-full grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] px-4 py-3 text-sm text-left items-center hover:bg-indigo-50/40 transition-colors border-b border-gray-50 last:border-b-0"
          >
            <span className="font-semibold text-gray-900 truncate pr-2">{c.poste || "Sans titre"}</span>
            <span className="text-gray-600 truncate pr-2">{c.entreprise || "—"}</span>
            <span>
              <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${meta.couleurBadge}`}>
                {meta.titre}
              </span>
            </span>
            <span className="text-gray-500">{formaterDate(c.dateCandidature)}</span>
            <span className="text-gray-500">{formaterDate(c.dateRappel)}</span>
          </button>
        );
      })}
    </div>
  );
}
