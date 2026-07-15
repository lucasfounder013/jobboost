"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import AppSidebar, { QuotasSidebar } from "@/components/AppSidebar";
import KanbanBoard from "@/components/candidatures/KanbanBoard";
import ListeCandidatures from "@/components/candidatures/ListeCandidatures";
import ModaleCandidature, {
  EtatCandidatureModifiable,
} from "@/components/candidatures/ModaleCandidature";
import ModaleImportOffre from "@/components/candidatures/ModaleImportOffre";
import { Candidature, StatutCandidature } from "@/components/candidatures/types";

type Vue = "kanban" | "liste";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [vue, setVue] = useState<Vue>("kanban");
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [chargement, setChargement] = useState(true);
  const [quotas, setQuotas] = useState<QuotasSidebar | null>(null);
  const [sidebarOuverte, setSidebarOuverte] = useState(false);

  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [candidatureEnEdition, setCandidatureEnEdition] = useState<Candidature | null>(null);
  const [statutInitialModale, setStatutInitialModale] = useState<StatutCandidature | undefined>(undefined);
  const [preRempliModale, setPreRempliModale] = useState<Partial<EtatCandidatureModifiable> | undefined>(undefined);
  const [modaleImportOuverte, setModaleImportOuverte] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!isPending && !session) router.push("/login?redirect=%2Fdashboard");
  }, [userId, isPending, router, session]);

  useEffect(() => {
    if (!userId) return;
    let annule = false;

    fetch("/api/candidatures")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { candidatures: Candidature[] }) => {
        if (!annule) setCandidatures(data.candidatures ?? []);
      })
      .catch(() => {
        if (!annule) setCandidatures([]);
      })
      .finally(() => {
        if (!annule) setChargement(false);
      });

    fetch("/api/user-quotas")
      .then((r) => r.json())
      .then((data) => {
        if (annule) return;
        setQuotas({
          scans: data.scans ?? 0,
          credits: data.credits ?? 0,
          lmCredits: data.lmCredits ?? 0,
          rhCredits: data.rhCredits ?? 0,
          planType: data.planType ?? null,
          estAbonne: !!data.estAbonne,
        });
      })
      .catch(() => {});

    return () => {
      annule = true;
    };
  }, [userId]);

  const stats = useMemo(() => {
    const parStatut = {
      souhaitee: 0,
      postulee: 0,
      entretien: 0,
      offre: 0,
      refusee: 0,
    } as Record<StatutCandidature, number>;
    for (const c of candidatures) parStatut[c.statut]++;
    const total = candidatures.length;
    const engages = parStatut.postulee + parStatut.entretien + parStatut.offre + parStatut.refusee;
    const tauxReponse = engages > 0 ? Math.round(((parStatut.entretien + parStatut.offre) / engages) * 100) : null;
    return { parStatut, total, tauxReponse };
  }, [candidatures]);

  function ouvrirCreation(statut?: StatutCandidature) {
    setCandidatureEnEdition(null);
    setStatutInitialModale(statut);
    setPreRempliModale(undefined);
    setModaleOuverte(true);
  }

  function ouvrirEdition(c: Candidature) {
    setCandidatureEnEdition(c);
    setStatutInitialModale(undefined);
    setPreRempliModale(undefined);
    setModaleOuverte(true);
  }

  async function enregistrer(data: EtatCandidatureModifiable, idExistant: string | null) {
    if (idExistant) {
      const res = await fetch(`/api/candidatures/${idExistant}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Impossible d'enregistrer.");
      setCandidatures((prev) =>
        prev.map((c) =>
          c.id === idExistant
            ? {
                ...c,
                poste: data.poste,
                entreprise: data.entreprise,
                statut: data.statut,
                lienOffre: data.lienOffre || null,
                dateCandidature: data.dateCandidature || null,
                dateRappel: data.dateRappel || null,
                notes: data.notes || null,
              }
            : c
        )
      );
    } else {
      const res = await fetch("/api/candidatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Impossible de créer.");
      const json = await res.json();
      setCandidatures((prev) => [
        ...prev,
        {
          id: json.id,
          poste: data.poste,
          entreprise: data.entreprise,
          statut: data.statut,
          lienOffre: data.lienOffre || null,
          dateCandidature: data.dateCandidature || null,
          dateRappel: data.dateRappel || null,
          notes: data.notes || null,
          analyseId: null,
          cvAdapteId: null,
          ordre: 9999,
          createdAt: json.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
  }

  async function supprimer(id: string) {
    const res = await fetch(`/api/candidatures/${id}`, { method: "DELETE" });
    if (res.ok) setCandidatures((prev) => prev.filter((c) => c.id !== id));
  }

  async function deplacer(id: string, statut: StatutCandidature) {
    // Optimistic update
    setCandidatures((prev) => prev.map((c) => (c.id === id ? { ...c, statut } : c)));
    const res = await fetch(`/api/candidatures/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    if (!res.ok) {
      // Rollback si erreur
      const rechargement = await fetch("/api/candidatures");
      if (rechargement.ok) {
        const data = await rechargement.json();
        setCandidatures(data.candidatures ?? []);
      }
    }
  }

  if (isPending || !session) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AppSidebar
        active="dashboard"
        ouverte={sidebarOuverte}
        onFermer={() => setSidebarOuverte(false)}
        quotas={quotas}
      />

      <main className="md:ml-64 flex-1 overflow-y-auto">
        <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOuverte(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-gray-900 text-base">Rivjob</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mon Board</h1>
              <p className="text-gray-500 text-sm mt-1">Suis toutes tes candidatures en cours.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex bg-white ring-1 ring-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => setVue("kanban")}
                  className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    vue === "kanban" ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="Vue Kanban"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h4a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V6z" />
                  </svg>
                </button>
                <button
                  onClick={() => setVue("liste")}
                  className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    vue === "liste" ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="Vue Liste"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => ouvrirCreation()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white ring-1 ring-gray-200 text-sm font-semibold text-gray-700 hover:ring-indigo-300 hover:text-indigo-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter
              </button>
              <button
                onClick={() => setModaleImportOuverte(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Importer une offre
              </button>
            </div>
          </div>

          {/* Bande de stats */}
          {!chargement && stats.total > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <StatCarte label="Total" valeur={stats.total} />
              <StatCarte label="Postulées" valeur={stats.parStatut.postulee} accent="text-violet-700" />
              <StatCarte label="Entretiens" valeur={stats.parStatut.entretien} accent="text-amber-700" />
              <StatCarte label="Offres" valeur={stats.parStatut.offre} accent="text-emerald-700" />
              <StatCarte
                label="Taux de réponse"
                valeur={stats.tauxReponse != null ? `${stats.tauxReponse}%` : "—"}
                accent="text-indigo-700"
              />
            </div>
          )}

          {/* Vue principale */}
          {chargement ? (
            <div className="flex items-center justify-center py-20 text-gray-400 text-sm gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Chargement…
            </div>
          ) : candidatures.length === 0 ? (
            <div className="rounded-2xl bg-white ring-1 ring-gray-200 px-6 py-16 text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Aucune candidature pour l&apos;instant</h2>
              <p className="text-sm text-gray-500 mb-5">Commence par ajouter une candidature manuellement ou importe une offre.</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => ouvrirCreation()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white ring-1 ring-gray-200 text-sm font-semibold text-gray-700 hover:ring-indigo-300 hover:text-indigo-700"
                >
                  + Ajouter
                </button>
                <button
                  onClick={() => setModaleImportOuverte(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-bold text-white"
                >
                  Importer une offre
                </button>
              </div>
            </div>
          ) : vue === "kanban" ? (
            <KanbanBoard
              candidatures={candidatures}
              onOuvrirCarte={ouvrirEdition}
              onAjouterDansColonne={ouvrirCreation}
              onDeplacer={deplacer}
            />
          ) : (
            <ListeCandidatures candidatures={candidatures} onOuvrirCarte={ouvrirEdition} />
          )}
        </div>
      </main>

      <ModaleCandidature
        ouverte={modaleOuverte}
        candidature={candidatureEnEdition}
        preRempli={preRempliModale}
        statutInitial={statutInitialModale}
        onFermer={() => setModaleOuverte(false)}
        onEnregistrer={enregistrer}
        onSupprimer={supprimer}
      />

      <ModaleImportOffre
        ouverte={modaleImportOuverte}
        onFermer={() => setModaleImportOuverte(false)}
        onImporte={(data) => {
          setCandidatureEnEdition(null);
          setStatutInitialModale("souhaitee");
          setPreRempliModale({
            poste: data.poste,
            entreprise: data.entreprise,
            lienOffre: data.lienOffre,
          });
          setModaleOuverte(true);
        }}
      />
    </div>
  );
}

function StatCarte({ label, valeur, accent }: { label: string; valeur: number | string; accent?: string }) {
  return (
    <div className="bg-white rounded-xl ring-1 ring-gray-200 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${accent ?? "text-gray-900"}`}>{valeur}</p>
    </div>
  );
}
