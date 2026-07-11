export const STATUTS = ["souhaitee", "postulee", "entretien", "offre", "refusee"] as const;
export type StatutCandidature = typeof STATUTS[number];

export type Candidature = {
  id: string;
  poste: string;
  entreprise: string;
  statut: StatutCandidature;
  lienOffre: string | null;
  dateCandidature: string | null;
  dateRappel: string | null;
  notes: string | null;
  analyseId: string | null;
  cvAdapteId: string | null;
  ordre: number;
  createdAt: string;
  updatedAt: string;
  analyseNom?: string | null;
  analyseScore?: number | null;
  analyseScoreApres?: number | null;
};

export type MetaColonne = {
  statut: StatutCandidature;
  titre: string;
  couleurBadge: string; // Tailwind classes bg-* text-*
  couleurAccent: string; // Tailwind pour la barre supérieure
  icone: string; // SVG path d
};

export const COLONNES: MetaColonne[] = [
  {
    statut: "souhaitee",
    titre: "Souhaitée",
    couleurBadge: "bg-indigo-50 text-indigo-700",
    couleurAccent: "bg-indigo-400",
    icone: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  },
  {
    statut: "postulee",
    titre: "Postulée",
    couleurBadge: "bg-violet-50 text-violet-700",
    couleurAccent: "bg-violet-400",
    icone: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    statut: "entretien",
    titre: "Entretien",
    couleurBadge: "bg-amber-50 text-amber-700",
    couleurAccent: "bg-amber-400",
    icone: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    statut: "offre",
    titre: "Offre",
    couleurBadge: "bg-emerald-50 text-emerald-700",
    couleurAccent: "bg-emerald-400",
    icone: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    statut: "refusee",
    titre: "Refusée",
    couleurBadge: "bg-rose-50 text-rose-700",
    couleurAccent: "bg-rose-400",
    icone: "M6 18L18 6M6 6l12 12",
  },
];

export function metaStatut(statut: StatutCandidature): MetaColonne {
  return COLONNES.find((c) => c.statut === statut) ?? COLONNES[0];
}
