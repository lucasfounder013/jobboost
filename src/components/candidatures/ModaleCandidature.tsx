"use client";

import { useEffect, useState } from "react";
import { Candidature, COLONNES, StatutCandidature } from "./types";

export type EtatCandidatureModifiable = {
  poste: string;
  entreprise: string;
  statut: StatutCandidature;
  lienOffre: string;
  dateCandidature: string;
  dateRappel: string;
  notes: string;
};

type Props = {
  ouverte: boolean;
  candidature: Candidature | null; // null → création
  preRempli?: Partial<EtatCandidatureModifiable>;
  statutInitial?: StatutCandidature;
  onFermer: () => void;
  onEnregistrer: (data: EtatCandidatureModifiable, idExistant: string | null) => Promise<void>;
  onSupprimer?: (id: string) => Promise<void>;
};

const etatVide = (statut: StatutCandidature = "souhaitee"): EtatCandidatureModifiable => ({
  poste: "",
  entreprise: "",
  statut,
  lienOffre: "",
  dateCandidature: "",
  dateRappel: "",
  notes: "",
});

export default function ModaleCandidature({
  ouverte,
  candidature,
  preRempli,
  statutInitial,
  onFermer,
  onEnregistrer,
  onSupprimer,
}: Props) {
  const [etat, setEtat] = useState<EtatCandidatureModifiable>(etatVide(statutInitial));
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    if (!ouverte) return;
    setErreur("");
    if (candidature) {
      setEtat({
        poste: candidature.poste,
        entreprise: candidature.entreprise,
        statut: candidature.statut,
        lienOffre: candidature.lienOffre ?? "",
        dateCandidature: candidature.dateCandidature ?? "",
        dateRappel: candidature.dateRappel ?? "",
        notes: candidature.notes ?? "",
      });
    } else {
      setEtat({ ...etatVide(statutInitial), ...preRempli });
    }
  }, [ouverte, candidature, statutInitial, preRempli]);

  if (!ouverte) return null;

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (!etat.poste.trim()) {
      setErreur("Le poste est requis.");
      return;
    }
    setEnregistrement(true);
    setErreur("");
    try {
      await onEnregistrer(etat, candidature?.id ?? null);
      onFermer();
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Erreur lors de l'enregistrement.");
    } finally {
      setEnregistrement(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onFermer}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {candidature ? "Modifier la candidature" : "Nouvelle candidature"}
          </h3>
          <button onClick={onFermer} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={soumettre} className="px-6 py-4 flex flex-col gap-4">
          <Champ label="Poste *">
            <input
              type="text"
              required
              value={etat.poste}
              onChange={(e) => setEtat((s) => ({ ...s, poste: e.target.value }))}
              placeholder="Ex : Product Manager"
              className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
            />
          </Champ>

          <Champ label="Entreprise">
            <input
              type="text"
              value={etat.entreprise}
              onChange={(e) => setEtat((s) => ({ ...s, entreprise: e.target.value }))}
              placeholder="Ex : Ubisoft"
              className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
            />
          </Champ>

          <Champ label="Statut">
            <select
              value={etat.statut}
              onChange={(e) => setEtat((s) => ({ ...s, statut: e.target.value as StatutCandidature }))}
              className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm bg-white"
            >
              {COLONNES.map((c) => (
                <option key={c.statut} value={c.statut}>
                  {c.titre}
                </option>
              ))}
            </select>
          </Champ>

          <Champ label="Lien vers l'offre">
            <input
              type="url"
              value={etat.lienOffre}
              onChange={(e) => setEtat((s) => ({ ...s, lienOffre: e.target.value }))}
              placeholder="https://…"
              className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
            />
          </Champ>

          <div className="grid grid-cols-2 gap-3">
            <Champ label="Date de candidature">
              <input
                type="date"
                value={etat.dateCandidature}
                onChange={(e) => setEtat((s) => ({ ...s, dateCandidature: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
              />
            </Champ>
            <Champ label="Rappel prochaine étape">
              <input
                type="date"
                value={etat.dateRappel}
                onChange={(e) => setEtat((s) => ({ ...s, dateRappel: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
              />
            </Champ>
          </div>

          <Champ label="Notes">
            <textarea
              value={etat.notes}
              onChange={(e) => setEtat((s) => ({ ...s, notes: e.target.value }))}
              rows={4}
              placeholder="Contact, salaire discuté, retours d'entretien…"
              className="w-full px-3 py-2 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm resize-none"
            />
          </Champ>

          {erreur && <p className="text-xs text-rose-600 font-medium">{erreur}</p>}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {candidature && onSupprimer ? (
              <button
                type="button"
                onClick={async () => {
                  if (!confirm("Supprimer cette candidature ?")) return;
                  await onSupprimer(candidature.id);
                  onFermer();
                }}
                className="text-sm font-medium text-rose-600 hover:text-rose-700 hover:underline"
              >
                Supprimer
              </button>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onFermer}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={enregistrement}
                className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 disabled:opacity-60 transition-colors"
              >
                {enregistrement ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Champ({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
      {children}
    </label>
  );
}
