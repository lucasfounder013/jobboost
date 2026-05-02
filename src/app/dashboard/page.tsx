"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import CVPreview from "@/components/CVPreview";
import { CVStructure } from "@/types/cv";

// ─── Types ────────────────────────────────────────────────────────────────────

type Probleme = { statut: "ok" | "avertissement" | "erreur"; message: string };
type Categorie = { score: number; problemes: Probleme[] };

type ResultatAnalyse = {
  score: number;
  nomPoste?: string;
  resume: string;
  categories: {
    recherchabilite: Categorie;
    competencesTechniques: Categorie;
    competencesSoft: Categorie;
    conseilsRecruteur: Categorie;
  };
  motsClesManquants: string[];
  motsClesPresents: string[];
};

type AnalyseSauvegardee = {
  id: string;
  nom_offre: string;
  score: number;
  created_at: string;
  resume?: string;
  mots_cles_manquants?: string[];
  mots_cles_presents?: string[];
  cv_adapte_id: string | null;
};

type CvAdapteSauvegarde = {
  id: string;
  nom_offre: string;
  created_at: string;
  cv_data: CVStructure;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const couleurScore = (s: number) => s >= 75 ? "text-emerald-600" : s >= 50 ? "text-amber-500" : "text-rose-500";
const bgScore = (s: number) => s >= 75 ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : s >= 50 ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-rose-50 text-rose-700 ring-rose-200";
const ringScore = (s: number) => s >= 75 ? "ring-emerald-300 text-emerald-600" : s >= 50 ? "ring-amber-300 text-amber-500" : "ring-rose-300 text-rose-500";
const labelScore = (s: number) => s >= 75 ? "Excellent" : s >= 50 ? "Moyen" : "Faible";
const formaterDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

// ─── Composant ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Vue active
  const [vue, setVue] = useState<"historique" | "nouvelle-analyse">("historique");

  // ── Données historique
  const [analyses, setAnalyses] = useState<AnalyseSauvegardee[]>([]);
  const [cvsAdaptes, setCvsAdaptes] = useState<CvAdapteSauvegarde[]>([]);
  const [chargementHistorique, setChargementHistorique] = useState(true);
  const [cvOuvert, setCvOuvert] = useState<CvAdapteSauvegarde | null>(null);
  const [analyseOuverte, setAnalyseOuverte] = useState<AnalyseSauvegardee | null>(null);
  const [exportEnCoursDrawer, setExportEnCoursDrawer] = useState<"pdf" | "docx" | null>(null);

  // ── État formulaire analyse
  const [cv, setCv] = useState("");
  const [offre, setOffre] = useState("");
  const [nomFichier, setNomFichier] = useState("");
  const [modeCV, setModeCV] = useState<"upload" | "texte">("upload");
  const [extractionEnCours, setExtractionEnCours] = useState(false);
  const [dragActif, setDragActif] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [resultat, setResultat] = useState<ResultatAnalyse | null>(null);
  const [cvAdapte, setCvAdapte] = useState<CVStructure | null>(null);
  const [adaptationEnCours, setAdaptationEnCours] = useState(false);
  const [erreurAdaptation, setErreurAdaptation] = useState("");
  const [creditsRestants, setCreditsRestants] = useState<number | null>(null);
  const [scansRestants, setScansRestants] = useState<number | null>(null);
  const [estAbonne, setEstAbonne] = useState(false);
  const [exportEnCoursAnalyse, setExportEnCoursAnalyse] = useState<"pdf" | "docx" | null>(null);
  const [analyseId, setAnalyseId] = useState<string | null>(null);
  const [nomPosteEnregistre, setNomPosteEnregistre] = useState("");
  const [autoAnalyse, setAutoAnalyse] = useState(false);

  // ── Auth redirect
  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  // ── Chargement historique
  const chargerHistorique = () => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setAnalyses(data.analyses ?? []);
        setCvsAdaptes(data.cvsAdaptes ?? []);
      })
      .finally(() => setChargementHistorique(false));
  };

  useEffect(() => {
    if (!session) return;
    chargerHistorique();
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Récupère pendingAnalysis depuis la page d'accueil (après inscription)
  useEffect(() => {
    if (!session) return;
    const raw = localStorage.getItem("pendingAnalysis");
    if (!raw) return;
    localStorage.removeItem("pendingAnalysis");
    try {
      const { cv: c, offre: o, nomFichier: n } = JSON.parse(raw);
      if (c) setCv(c);
      if (o) setOffre(o);
      if (n) { setNomFichier(n); setModeCV("upload"); }
      setVue("nouvelle-analyse");
      setAutoAnalyse(true);
    } catch {}
  }, [session]);

  // ── Lance l'analyse automatiquement si pendingAnalysis restauré
  useEffect(() => {
    if (autoAnalyse && session) {
      setAutoAnalyse(false);
      analyser(); // eslint-disable-line react-hooks/exhaustive-deps
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAnalyse, session]);

  // ── Retour à l'historique + refresh
  function revenirHistorique() {
    setVue("historique");
    setChargementHistorique(true);
    chargerHistorique();
    // Reset form
    setCv(""); setOffre(""); setNomFichier(""); setModeCV("upload");
    setResultat(null); setCvAdapte(null); setErreur(""); setErreurAdaptation("");
    setAnalyseId(null); setNomPosteEnregistre("");
    setScansRestants(null); setCreditsRestants(null);
  }

  // ── Upload CV
  async function traiterFichier(fichier: File) {
    const ext = fichier.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx") {
      setErreur("Format non supporté. Utilisez un fichier PDF ou Word (.docx).");
      return;
    }
    setErreur("");
    setExtractionEnCours(true);
    const formData = new FormData();
    formData.append("fichier", fichier);
    try {
      const reponse = await fetch("/api/extraire-cv", { method: "POST", body: formData });
      const data = await reponse.json();
      if (!reponse.ok) throw new Error(data.error);
      setCv(data.texte);
      setNomFichier(fichier.name);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Impossible d'extraire le texte du fichier.");
    } finally {
      setExtractionEnCours(false);
    }
  }

  // ── Analyse
  async function analyser() {
    if (!cv.trim() || !offre.trim()) {
      setErreur("Veuillez remplir les deux champs.");
      return;
    }
    setErreur("");
    setChargement(true);
    setResultat(null);
    setAnalyseId(null);

    try {
      const reponse = await fetch("/api/analyser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, offre }),
      });
      const data = await reponse.json();
      if (reponse.status === 403) { setErreur(data.error); return; }
      if (!reponse.ok) throw new Error("Erreur lors de l'analyse.");
      setResultat(data);
      setScansRestants(data.scansRestants ?? null);
      if (data.scansRestants === null) setEstAbonne(true);
      sauvegarderAnalyse(data).catch(() => {});
    } catch {
      setErreur("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setChargement(false);
    }
  }

  // ── Adaptation CV
  async function adapterCV() {
    if (!resultat) return;
    setErreurAdaptation("");
    setCvAdapte(null);
    setAdaptationEnCours(true);
    try {
      const reponse = await fetch("/api/adapter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, offre, motsClesManquants: resultat.motsClesManquants }),
      });
      const data = await reponse.json();
      if (!reponse.ok) throw new Error(data.error);
      setCvAdapte(data.cvAdapte);
      setCreditsRestants(data.creditsRestants);
      sauvegarderCvAdapte(data.cvAdapte).catch(() => {});
    } catch (e) {
      setErreurAdaptation(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setAdaptationEnCours(false);
    }
  }

  // ── Auto-save analyse
  async function sauvegarderAnalyse(data: ResultatAnalyse) {
    const nomOffre = data.nomPoste || nomFichier || "Analyse sans titre";
    setNomPosteEnregistre(nomOffre);
    const reponse = await fetch("/api/sauvegarder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomOffre,
        score: data.score,
        resume: data.resume,
        motsClesManquants: data.motsClesManquants,
        motsClesPresents: data.motsClesPresents,
      }),
    });
    if (reponse.ok) {
      const json = await reponse.json();
      setAnalyseId(json.analyseId);
    }
  }

  // ── Auto-save CV adapté
  async function sauvegarderCvAdapte(cvData: CVStructure) {
    const nomOffre = nomPosteEnregistre || nomFichier || "Analyse sans titre";
    await fetch("/api/sauvegarder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        analyseId
          ? { analyseId, nomOffre, cvAdapte: cvData }
          : { nomOffre, score: resultat?.score ?? 0, resume: resultat?.resume ?? "", motsClesManquants: resultat?.motsClesManquants ?? [], motsClesPresents: resultat?.motsClesPresents ?? [], cvAdapte: cvData }
      ),
    });
  }

  // ── Export PDF/DOCX
  async function exporterCV(cvData: CVStructure, format: "pdf" | "docx", contexte: "analyse" | "drawer") {
    const setter = contexte === "analyse" ? setExportEnCoursAnalyse : setExportEnCoursDrawer;
    setter(format);
    try {
      const reponse = await fetch("/api/exporter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv: cvData, format }),
      });
      if (!reponse.ok) throw new Error();
      const blob = await reponse.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nom = (cvData.nom || "cv").toLowerCase().replace(/\s+/g, "_");
      a.href = url;
      a.download = `${nom}_cv.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setter(null);
    }
  }

  const prenom = session?.user.name?.split(" ")[0] ?? "vous";

  if (isPending || !session) return null;

  const derniereAnalyse = analyses[0] ?? null;
  const analysesRecentes = analyses.slice(1, 5);

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-indigo-950 flex flex-col z-40 shrink-0">
        <div className="px-5 py-5 border-b border-indigo-900">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">⚡</span>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">JobBoost</span>
          </Link>
        </div>

        <div className="px-4 pt-5">
          <button
            onClick={() => { setVue("nouvelle-analyse"); setResultat(null); setCvAdapte(null); setErreur(""); setCv(""); setOffre(""); setNomFichier(""); setModeCV("upload"); setAnalyseId(null); }}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle analyse
          </button>
        </div>

        <nav className="flex-1 px-3 pt-6 flex flex-col gap-1">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Menu</p>

          <button
            onClick={() => setVue("historique")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm w-full text-left transition-colors ${vue === "historique" ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-800/60 hover:text-white"}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </button>

          <button
            onClick={() => { setVue("historique"); setTimeout(() => document.getElementById("historique")?.scrollIntoView({ behavior: "smooth" }), 100); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-indigo-200 hover:bg-indigo-800/60 hover:text-white font-medium text-sm transition-colors text-left"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mon historique
          </button>

          <button
            onClick={() => { setVue("historique"); setTimeout(() => document.getElementById("mes-cv")?.scrollIntoView({ behavior: "smooth" }), 100); }}
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

        {/* ── Vue : Historique ─────────────────────────────────────────────── */}
        {vue === "historique" && (
          <div className="max-w-5xl mx-auto px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Bonjour, {prenom} 👋</h1>
              <p className="text-gray-400 text-sm mt-1">Voici un aperçu de vos analyses et CV adaptés.</p>
            </div>

            {chargementHistorique ? (
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
                  <p className="text-gray-400 text-sm mt-1">Lancez votre première analyse depuis le bouton ci-dessus.</p>
                </div>
                <button
                  onClick={() => setVue("nouvelle-analyse")}
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
                >
                  Faire ma première analyse →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-10">

                {/* Dernière analyse */}
                {derniereAnalyse && (
                  <section>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Dernière analyse</h2>
                    <button
                      onClick={() => setAnalyseOuverte(derniereAnalyse)}
                      className="w-full bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 flex items-center gap-6 hover:ring-indigo-300 hover:shadow-md transition-all duration-200 text-left cursor-pointer"
                    >
                      <div className={`w-20 h-20 rounded-full ring-4 shrink-0 flex flex-col items-center justify-center ${ringScore(derniereAnalyse.score)}`}>
                        <span className={`text-2xl font-extrabold tabular-nums leading-none ${couleurScore(derniereAnalyse.score)}`}>{derniereAnalyse.score}</span>
                        <span className={`text-xs font-bold ${couleurScore(derniereAnalyse.score)}`}>%</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-900 truncate">{derniereAnalyse.nom_offre}</p>
                        <p className="text-sm text-gray-400 mt-0.5">{formaterDate(derniereAnalyse.created_at)}</p>
                        <span className={`inline-flex mt-2 text-xs font-bold px-2.5 py-1 rounded-full ring-1 ${bgScore(derniereAnalyse.score)}`}>{labelScore(derniereAnalyse.score)}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => setVue("nouvelle-analyse")}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
                      >
                        + Nouvelle analyse
                      </button>
                      {derniereAnalyse.cv_adapte_id && (
                        <button
                          onClick={() => { const cv = cvsAdaptes.find((c) => c.id === derniereAnalyse.cv_adapte_id); if (cv) setCvOuvert(cv); }}
                          className="text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
                        >
                          Voir le CV adapté
                        </button>
                      )}
                    </div>
                  </section>
                )}

                {/* Analyses récentes */}
                {analysesRecentes.length > 0 && (
                  <section id="historique">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Analyses récentes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {analysesRecentes.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setAnalyseOuverte(a)}
                          className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-3 hover:ring-indigo-300 hover:shadow-md transition-all duration-200 text-left cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-2xl font-extrabold tabular-nums ${couleurScore(a.score)}`}>{a.score}%</span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ring-1 ${bgScore(a.score)}`}>{labelScore(a.score)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm truncate">{a.nom_offre}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{formaterDate(a.created_at)}</p>
                          </div>
                          <span className="text-xs font-semibold text-indigo-600 mt-auto">Consulter →</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* CV adaptés */}
                {cvsAdaptes.length > 0 && (
                  <section id="mes-cv">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Mes CV adaptés ({cvsAdaptes.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cvsAdaptes.map((cv) => (
                        <div key={cv.id} className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-4">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm truncate">{cv.nom_offre}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{formaterDate(cv.created_at)}</p>
                          </div>
                          <div className="flex gap-2 mt-auto">
                            <button onClick={() => setCvOuvert(cv)} className="flex-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg transition-colors">Aperçu</button>
                            <button onClick={() => exporterCV(cv.cv_data, "pdf", "drawer")} disabled={exportEnCoursDrawer !== null} className="flex-1 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 py-2 rounded-lg transition-colors disabled:opacity-50">{exportEnCoursDrawer === "pdf" ? "..." : "PDF"}</button>
                            <button onClick={() => exporterCV(cv.cv_data, "docx", "drawer")} disabled={exportEnCoursDrawer !== null} className="flex-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg transition-colors disabled:opacity-50">{exportEnCoursDrawer === "docx" ? "..." : "Word"}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Vue : Nouvelle analyse ───────────────────────────────────────── */}
        {vue === "nouvelle-analyse" && (
          <div className="max-w-6xl mx-auto px-6 py-10">

            {/* En-tête */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Nouvelle analyse</h1>
              {analyseId && (
                <button
                  onClick={revenirHistorique}
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Revenir à l&apos;historique
                </button>
              )}
            </div>

            {/* Formulaire CV + Offre */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

              {/* CV */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-indigo-200 transition-all duration-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Votre CV</span>
                  </div>
                  {modeCV === "texte" && (
                    <button onClick={() => setModeCV("upload")} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors">← Upload de fichier</button>
                  )}
                </div>
                {modeCV === "upload" ? (
                  <div className="p-5 flex flex-col gap-4">
                    <label
                      className={`flex flex-col items-center justify-center min-h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${dragActif ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/40"}`}
                      onDragOver={(e) => { e.preventDefault(); setDragActif(true); }}
                      onDragLeave={() => setDragActif(false)}
                      onDrop={(e) => { e.preventDefault(); setDragActif(false); const f = e.dataTransfer.files[0]; if (f) traiterFichier(f); }}
                    >
                      <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) traiterFichier(f); }} />
                      {extractionEnCours ? (
                        <div className="flex flex-col items-center gap-2 text-indigo-500">
                          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                          <span className="text-sm font-medium">Extraction en cours...</span>
                        </div>
                      ) : nomFichier ? (
                        <div className="flex flex-col items-center gap-2 text-emerald-600">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span className="text-sm font-semibold">{nomFichier}</span>
                          <span className="text-xs text-gray-400">Cliquez pour changer de fichier</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400 px-4 text-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          <span className="text-sm font-semibold text-gray-600">Glissez votre CV ici</span>
                          <span className="text-xs">ou cliquez pour choisir</span>
                          <span className="text-xs text-gray-300">Formats acceptés : PDF, Word (.docx)</span>
                        </div>
                      )}
                    </label>
                    <button onClick={() => setModeCV("texte")} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium text-center transition-colors">Ou coller le texte →</button>
                  </div>
                ) : (
                  <textarea value={cv} onChange={(e) => setCv(e.target.value)} placeholder="Collez ici le contenu de votre CV..." className="w-full min-h-56 p-5 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none bg-transparent leading-relaxed" />
                )}
              </div>

              {/* Offre */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-violet-200 transition-all duration-200 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Offre d&apos;emploi</span>
                </div>
                <textarea value={offre} onChange={(e) => setOffre(e.target.value)} placeholder="Collez ici le texte de l'offre d'emploi..." className="w-full min-h-56 p-5 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none bg-transparent leading-relaxed" />
              </div>
            </div>

            {/* Bouton analyser + erreur */}
            <div className="flex flex-col items-center gap-3 mb-10">
              {erreur && <p className="text-rose-500 text-sm font-medium">{erreur}</p>}
              <button
                onClick={analyser}
                disabled={chargement}
                className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {chargement ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Analyse en cours...</>
                  ) : (
                    <>⚡ {estAbonne ? "Analyser" : "Analyser gratuitement"}</>
                  )}
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
              </button>
              {scansRestants !== null && scansRestants > 0 && (
                <p className="text-gray-400 text-xs text-center">{scansRestants} analyse{scansRestants !== 1 ? "s" : ""} gratuite{scansRestants !== 1 ? "s" : ""} restante{scansRestants !== 1 ? "s" : ""}</p>
              )}
            </div>

            {/* Résultats */}
            {resultat && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                  {/* Score */}
                  <div className={`bg-white rounded-2xl ring-2 shadow-sm p-8 flex flex-col items-center justify-center text-center ${
                    resultat.score >= 75 ? "ring-emerald-200 bg-emerald-50" : resultat.score >= 50 ? "ring-amber-200 bg-amber-50" : "ring-rose-200 bg-rose-50"
                  }`}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Score de correspondance</p>
                    <p className={`text-7xl font-extrabold tabular-nums ${couleurScore(resultat.score)}`}>{resultat.score}<span className="text-3xl">%</span></p>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${bgScore(resultat.score)}`}>{labelScore(resultat.score)}</span>
                  </div>

                  {/* Analyse + CTA */}
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 lg:col-span-2 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Analyse</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{resultat.resume}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                      {creditsRestants === 0 ? (
                        <div className="flex flex-col gap-2">
                          <Link href="/pricing" className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm text-center hover:opacity-90 transition-opacity shadow-md shadow-indigo-100">S&apos;abonner pour des adaptations illimitées →</Link>
                          <p className="text-gray-400 text-xs text-center">Votre crédit gratuit a été utilisé</p>
                        </div>
                      ) : (
                        <>
                          <button onClick={adapterCV} disabled={adaptationEnCours} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {adaptationEnCours ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Adaptation en cours...</>) : ("Adapter mon CV automatiquement →")}
                          </button>
                          {erreurAdaptation && <p className="text-rose-500 text-xs font-medium text-center">{erreurAdaptation}</p>}
                          {creditsRestants !== null && creditsRestants > 0 ? (
                            <p className="text-gray-400 text-xs text-center">{creditsRestants} crédit{creditsRestants !== 1 ? "s" : ""} restant{creditsRestants !== 1 ? "s" : ""}</p>
                          ) : creditsRestants === null && cvAdapte ? (
                            <p className="text-emerald-600 text-xs text-center font-medium">Adaptations illimitées ✓</p>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Catégories */}
                  {resultat.categories && (() => {
                    const cats: { cle: keyof typeof resultat.categories; label: string }[] = [
                      { cle: "recherchabilite", label: "Recherchabilité" },
                      { cle: "competencesTechniques", label: "Compétences techniques" },
                      { cle: "competencesSoft", label: "Compétences comportementales" },
                      { cle: "conseilsRecruteur", label: "Conseils recruteur" },
                    ];
                    return cats.map(({ cle, label }) => {
                      const cat = resultat.categories[cle];
                      return (
                        <div key={cle} className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${bgScore(cat.score)}`}>{cat.score}%</span>
                          </div>
                          <ul className="flex flex-col gap-2">
                            {cat.problemes.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="mt-0.5 shrink-0">{p.statut === "ok" ? "✅" : p.statut === "avertissement" ? "⚠️" : "❌"}</span>
                                <span className={p.statut === "ok" ? "text-emerald-700" : p.statut === "avertissement" ? "text-amber-700" : "text-rose-600"}>{p.message}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    });
                  })()}

                  {/* Mots-clés manquants */}
                  {resultat.motsClesManquants.length > 0 && (
                    <div className="bg-white rounded-2xl ring-1 ring-rose-100 shadow-sm p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-rose-400" />
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Manquants <span className="text-rose-500 font-bold">({resultat.motsClesManquants.length})</span></p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {resultat.motsClesManquants.map((mot) => (
                          <span key={mot} className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full text-xs font-semibold">{mot}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mots-clés présents */}
                  {resultat.motsClesPresents.length > 0 && (
                    <div className="bg-white rounded-2xl ring-1 ring-emerald-100 shadow-sm p-6 lg:col-span-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Présents <span className="text-emerald-600 font-bold">({resultat.motsClesPresents.length})</span></p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {resultat.motsClesPresents.map((mot) => (
                          <span key={mot} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold">{mot}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bouton Revenir à l'historique (visible après auto-save) */}
                {analyseId && (
                  <div className="flex justify-end">
                    <button
                      onClick={revenirHistorique}
                      className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Revenir à l&apos;historique
                    </button>
                  </div>
                )}

                {/* CV adapté */}
                {cvAdapte && (
                  <div className="bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-100 bg-indigo-50/40">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté ATS</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => exporterCV(cvAdapte, "pdf", "analyse")} disabled={exportEnCoursAnalyse !== null} className="flex items-center gap-1.5 text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                          {exportEnCoursAnalyse === "pdf" ? <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                          PDF
                        </button>
                        <button onClick={() => exporterCV(cvAdapte, "docx", "analyse")} disabled={exportEnCoursAnalyse !== null} className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                          {exportEnCoursAnalyse === "docx" ? <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                          Word
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <CVPreview cv={cvAdapte} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Drawer détail analyse */}
      {analyseOuverte && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setAnalyseOuverte(null)} />
          <div className="w-full max-w-xl bg-white shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Analyse</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5 truncate max-w-xs">{analyseOuverte.nom_offre}</p>
              </div>
              <div className="flex items-center gap-2">
                {analyseOuverte.cv_adapte_id && (
                  <button
                    onClick={() => { const cv = cvsAdaptes.find((c) => c.id === analyseOuverte.cv_adapte_id); if (cv) { setCvOuvert(cv); setAnalyseOuverte(null); } }}
                    className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Voir CV adapté
                  </button>
                )}
                <button onClick={() => setAnalyseOuverte(null)} className="text-gray-400 hover:text-gray-700 transition-colors ml-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Score */}
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-full ring-4 shrink-0 flex flex-col items-center justify-center ${ringScore(analyseOuverte.score)}`}>
                  <span className={`text-2xl font-extrabold tabular-nums leading-none ${couleurScore(analyseOuverte.score)}`}>{analyseOuverte.score}</span>
                  <span className={`text-xs font-bold ${couleurScore(analyseOuverte.score)}`}>%</span>
                </div>
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ring-1 ${bgScore(analyseOuverte.score)}`}>{labelScore(analyseOuverte.score)}</span>
                  <p className="text-xs text-gray-400 mt-2">{formaterDate(analyseOuverte.created_at)}</p>
                </div>
              </div>

              {/* Résumé */}
              {analyseOuverte.resume && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Analyse</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{analyseOuverte.resume}</p>
                </div>
              )}

              {/* Mots-clés manquants */}
              {analyseOuverte.mots_cles_manquants && analyseOuverte.mots_cles_manquants.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Mots-clés manquants <span className="text-rose-500">({analyseOuverte.mots_cles_manquants.length})</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analyseOuverte.mots_cles_manquants.map((mot) => (
                      <span key={mot} className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full text-xs font-semibold">{mot}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mots-clés présents */}
              {analyseOuverte.mots_cles_presents && analyseOuverte.mots_cles_presents.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Mots-clés présents <span className="text-emerald-600">({analyseOuverte.mots_cles_presents.length})</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analyseOuverte.mots_cles_presents.map((mot) => (
                      <span key={mot} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold">{mot}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Drawer CV adapté (historique) */}
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
                <button onClick={() => exporterCV(cvOuvert.cv_data, "pdf", "drawer")} disabled={exportEnCoursDrawer !== null} className="text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">{exportEnCoursDrawer === "pdf" ? "..." : "PDF"}</button>
                <button onClick={() => exporterCV(cvOuvert.cv_data, "docx", "drawer")} disabled={exportEnCoursDrawer !== null} className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">{exportEnCoursDrawer === "docx" ? "..." : "Word"}</button>
                <button onClick={() => setCvOuvert(null)} className="text-gray-400 hover:text-gray-700 transition-colors ml-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
