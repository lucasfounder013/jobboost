"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import CVPreview from "@/components/CVPreview";
import { CVStructure } from "@/types/cv";

type AnalyseSauvegardee = {
  id: string;
  nom_offre: string;
  score: number;
  created_at: string;
  cv_adapte_id: string | null;
};

type CvAdapteSauvegarde = {
  id: string;
  nom_offre: string;
  created_at: string;
  cv_data: CVStructure;
};

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<AnalyseSauvegardee[]>([]);
  const [cvsAdaptes, setCvsAdaptes] = useState<CvAdapteSauvegarde[]>([]);
  const [chargement, setChargement] = useState(true);
  const [cvOuvert, setCvOuvert] = useState<CvAdapteSauvegarde | null>(null);
  const [exportEnCours, setExportEnCours] = useState<"pdf" | "docx" | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setAnalyses(data.analyses ?? []);
        setCvsAdaptes(data.cvsAdaptes ?? []);
      })
      .finally(() => setChargement(false));
  }, [session]);

  async function exporterCV(cv: CVStructure, format: "pdf" | "docx") {
    setExportEnCours(format);
    try {
      const reponse = await fetch("/api/exporter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, format }),
      });
      if (!reponse.ok) throw new Error();
      const blob = await reponse.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nom = (cv.nom || "cv").toLowerCase().replace(/\s+/g, "_");
      a.href = url;
      a.download = `${nom}_cv.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExportEnCours(null);
    }
  }

  const couleurScore = (score: number) => {
    if (score >= 75) return "text-emerald-600";
    if (score >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  const bgScore = (score: number) => {
    if (score >= 75) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    if (score >= 50) return "bg-amber-50 text-amber-700 ring-amber-200";
    return "bg-rose-50 text-rose-700 ring-rose-200";
  };

  const formaterDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  if (isPending || !session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-lg">⚡</span>
            <span className="text-base font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              JobBoost
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
              Nouvelle analyse
            </Link>
            <Link href="/abonnement" className="text-gray-500 hover:text-gray-900 font-medium transition-colors hidden sm:block">
              Mon abonnement
            </Link>
            <span className="text-gray-400 font-medium hidden sm:block">{session.user.email}</span>
            <button
              onClick={() => signOut()}
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mon historique</h1>
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
          >
            + Nouvelle analyse
          </Link>
        </div>

        {chargement ? (
          <div className="flex items-center justify-center py-24 text-gray-400 text-sm gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Chargement...
          </div>
        ) : analyses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <p className="text-gray-400 text-lg font-medium">Aucune analyse sauvegardée pour l&apos;instant.</p>
            <Link
              href="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Faire ma première analyse →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10">

            {/* Section Analyses */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
                Analyses ({analyses.length})
              </h2>
              <div className="flex flex-col gap-3">
                {analyses.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm px-6 py-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`shrink-0 text-lg font-extrabold tabular-nums ${couleurScore(a.score)}`}>
                        {a.score}%
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{a.nom_offre}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formaterDate(a.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ring-1 ${bgScore(a.score)}`}>
                        {a.score >= 75 ? "Excellent" : a.score >= 50 ? "Moyen" : "Faible"}
                      </span>
                      {a.cv_adapte_id && (
                        <button
                          onClick={() => {
                            const cv = cvsAdaptes.find((c) => c.id === a.cv_adapte_id);
                            if (cv) setCvOuvert(cv);
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          Voir CV adapté →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section CV adaptés */}
            {cvsAdaptes.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
                  CV adaptés ({cvsAdaptes.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cvsAdaptes.map((cv) => (
                    <div
                      key={cv.id}
                      className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-3"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-sm truncate">{cv.nom_offre}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formaterDate(cv.created_at)}</p>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => setCvOuvert(cv)}
                          className="flex-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg transition-colors text-center"
                        >
                          Aperçu
                        </button>
                        <button
                          onClick={() => exporterCV(cv.cv_data, "pdf")}
                          disabled={exportEnCours !== null}
                          className="flex-1 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          PDF
                        </button>
                        <button
                          onClick={() => exporterCV(cv.cv_data, "docx")}
                          disabled={exportEnCours !== null}
                          className="flex-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          Word
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Drawer CV adapté */}
      {cvOuvert && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCvOuvert(null)} />
          <div className="w-full max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-indigo-50/40 shrink-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté ATS</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{cvOuvert.nom_offre}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exporterCV(cvOuvert.cv_data, "pdf")}
                  disabled={exportEnCours !== null}
                  className="text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  {exportEnCours === "pdf" ? "..." : "PDF"}
                </button>
                <button
                  onClick={() => exporterCV(cvOuvert.cv_data, "docx")}
                  disabled={exportEnCours !== null}
                  className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {exportEnCours === "docx" ? "..." : "Word"}
                </button>
                <button
                  onClick={() => setCvOuvert(null)}
                  className="text-gray-400 hover:text-gray-700 transition-colors ml-1"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CVPreview cv={cvOuvert.cv_data} />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-300 font-medium tracking-wide">
        © 2026 JobBoost — L&apos;alternative française à Jobscan
      </footer>
    </div>
  );
}
