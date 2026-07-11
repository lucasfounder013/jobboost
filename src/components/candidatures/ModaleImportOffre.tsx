"use client";

import { useState } from "react";

type Props = {
  ouverte: boolean;
  onFermer: () => void;
  onImporte: (data: { poste: string; entreprise: string; lienOffre: string }) => void;
};

export default function ModaleImportOffre({ ouverte, onFermer, onImporte }: Props) {
  const [url, setUrl] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  if (!ouverte) return null;

  async function importer(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setErreur("Colle une URL d'offre d'emploi.");
      return;
    }
    setChargement(true);
    setErreur("");
    try {
      const res = await fetch("/api/candidatures/importer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.error ?? "Impossible d'importer l'offre.");
        return;
      }
      onImporte({
        poste: data.poste ?? "",
        entreprise: data.entreprise ?? "",
        lienOffre: data.lienOffre ?? url.trim(),
      });
      setUrl("");
      onFermer();
    } catch {
      setErreur("Erreur réseau.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onFermer}>
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Importer une offre</h3>
          <button onClick={onFermer} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={importer} className="px-6 py-4 flex flex-col gap-3">
          <p className="text-sm text-gray-600">
            Colle le lien d&apos;une offre (LinkedIn, Indeed, Welcome to the Jungle…). L&apos;IA
            extrait le poste et l&apos;entreprise pour toi.
          </p>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.linkedin.com/jobs/view/…"
            className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
          />
          {erreur && <p className="text-xs text-rose-600 font-medium">{erreur}</p>}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onFermer}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={chargement}
              className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 disabled:opacity-60 transition-colors"
            >
              {chargement ? "Analyse…" : "Importer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
