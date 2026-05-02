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
    if (!isPending && !session) router.push("/login");
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

  const ringScore = (score: number) => {
    if (score >= 75) return "ring-emerald-300 text-emerald-600";
    if (score >= 50) return "ring-amber-300 text-amber-500";
    return "ring-rose-300 text-rose-500";
  };

  const labelScore = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Moyen";
    return "Faible";
  };

  const formaterDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  const prenom = session?.user.name?.split(" ")[0] ?? "vous";

  if (isPending || !session) return null;

  const derniereAnalyse = analyses[0] ?? null;
  const analysesRecentes = analyses.slice(1, 5);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-indigo-950 flex flex-col z-40 shrink-0">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-indigo-900">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">⚡</span>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              JobBoost
            </span>
          </Link>
        </div>

        {/* CTA Nouvelle analyse */}
        <div className="px-4 pt-5">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle analyse
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pt-6 flex flex-col gap-1">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Menu</p>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-800 text-white font-semibold text-sm"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>

          <button
            onClick={() => document.getElementById("historique")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-indigo-200 hover:bg-indigo-800/60 hover:text-white font-medium text-sm transition-colors text-left"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mon historique
          </button>

          <button
            onClick={() => document.getElementById("mes-cv")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-indigo-200 hover:bg-indigo-800/60 hover:text-white font-medium text-sm transition-colors text-left"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Mes CV
          </button>

          <Link
            href="/abonnement"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-indigo-200 hover:bg-indigo-800/60 hover:text-white font-medium text-sm transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Mon abonnement
          </Link>
        </nav>

        {/* Bas de sidebar */}
        <div className="px-4 pb-5 border-t border-indigo-900 pt-4">
          <p className="text-indigo-400 text-xs truncate mb-3">{session.user.email}</p>
          <button
            onClick={() => signOut().then(() => router.push("/"))}
            className="flex items-center gap-2 text-indigo-300 hover:text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Zone principale */}
      <main className="ml-64 flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">

          {/* Titre */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Bonjour, {prenom} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">Voici un aperçu de vos analyses et CV adaptés.</p>
          </div>

          {chargement ? (
            <div className="flex items-center justify-center py-32 text-gray-400 text-sm gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Chargement...
            </div>
          ) : analyses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl">⚡</div>
              <div>
                <p className="text-gray-800 font-semibold text-lg">Aucune analyse sauvegardée</p>
                <p className="text-gray-400 text-sm mt-1">Faites votre première analyse et cliquez sur Sauvegarder.</p>
              </div>
              <Link
                href="/"
                className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
              >
                Faire ma première analyse →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-10">

              {/* Dernière analyse */}
              {derniereAnalyse && (
                <section>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Dernière analyse</h2>
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-full ring-4 shrink-0 flex flex-col items-center justify-center ${ringScore(derniereAnalyse.score)}`}>
                      <span className={`text-2xl font-extrabold tabular-nums leading-none ${couleurScore(derniereAnalyse.score)}`}>
                        {derniereAnalyse.score}
                      </span>
                      <span className={`text-xs font-bold ${couleurScore(derniereAnalyse.score)}`}>%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold text-gray-900 truncate">{derniereAnalyse.nom_offre}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{formaterDate(derniereAnalyse.created_at)}</p>
                      <span className={`inline-flex mt-2 text-xs font-bold px-2.5 py-1 rounded-full ring-1 ${bgScore(derniereAnalyse.score)}`}>
                        {labelScore(derniereAnalyse.score)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link
                        href="/"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors text-center"
                      >
                        Nouvelle analyse →
                      </Link>
                      {derniereAnalyse.cv_adapte_id && (
                        <button
                          onClick={() => {
                            const cv = cvsAdaptes.find((c) => c.id === derniereAnalyse.cv_adapte_id);
                            if (cv) setCvOuvert(cv);
                          }}
                          className="text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
                        >
                          Voir le CV adapté
                        </button>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Analyses récentes */}
              {analysesRecentes.length > 0 && (
                <section id="historique">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                    Analyses récentes
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {analysesRecentes.map((a) => (
                      <div
                        key={a.id}
                        className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-2xl font-extrabold tabular-nums ${couleurScore(a.score)}`}>
                            {a.score}%
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ring-1 ${bgScore(a.score)}`}>
                            {labelScore(a.score)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm truncate">{a.nom_offre}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{formaterDate(a.created_at)}</p>
                        </div>
                        {a.cv_adapte_id && (
                          <button
                            onClick={() => {
                              const cv = cvsAdaptes.find((c) => c.id === a.cv_adapte_id);
                              if (cv) setCvOuvert(cv);
                            }}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 mt-auto transition-colors text-left"
                          >
                            Voir le CV adapté →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CV adaptés */}
              {cvsAdaptes.length > 0 && (
                <section id="mes-cv">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                    Mes CV adaptés ({cvsAdaptes.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cvsAdaptes.map((cv) => (
                      <div
                        key={cv.id}
                        className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-4"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 text-sm truncate">{cv.nom_offre}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{formaterDate(cv.created_at)}</p>
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={() => setCvOuvert(cv)}
                            className="flex-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg transition-colors"
                          >
                            Aperçu
                          </button>
                          <button
                            onClick={() => exporterCV(cv.cv_data, "pdf")}
                            disabled={exportEnCours !== null}
                            className="flex-1 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 py-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {exportEnCours === "pdf" ? "..." : "PDF"}
                          </button>
                          <button
                            onClick={() => exporterCV(cv.cv_data, "docx")}
                            disabled={exportEnCours !== null}
                            className="flex-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {exportEnCours === "docx" ? "..." : "Word"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
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
    </div>
  );
}
