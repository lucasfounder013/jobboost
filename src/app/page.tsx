"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import CVPreview from "@/components/CVPreview";
import Footer from "@/components/Footer";
import { CVStructure } from "@/types/cv";

type Probleme = { statut: "ok" | "avertissement" | "erreur"; message: string };
type Categorie = { score: number; problemes: Probleme[] };

type ResultatAnalyse = {
  score: number;
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

export default function PagePrincipale() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cv, setCv] = useState("");
  const [offre, setOffre] = useState("");
  const [resultat, setResultat] = useState<ResultatAnalyse | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [modeCV, setModeCV] = useState<"upload" | "texte">("upload");
  const [nomFichier, setNomFichier] = useState("");
  const [extractionEnCours, setExtractionEnCours] = useState(false);
  const [dragActif, setDragActif] = useState(false);
  const [cvAdapte, setCvAdapte] = useState<CVStructure | null>(null);
  const [adaptationEnCours, setAdaptationEnCours] = useState(false);
  const [erreurAdaptation, setErreurAdaptation] = useState("");
  const [creditsRestants, setCreditsRestants] = useState<number | null>(null);
  const [scansRestants, setScansRestants] = useState<number | null>(null);
  const [estAbonne, setEstAbonne] = useState(false);
  const [exportEnCours, setExportEnCours] = useState<"pdf" | "docx" | null>(null);
  const [autoAnalyse, setAutoAnalyse] = useState(false);
  const [analyseId, setAnalyseId] = useState<string | null>(null);
  const [nomPosteEnregistre, setNomPosteEnregistre] = useState("");

  // Restaure le CV et l'offre sauvegardés avant une redirection (login ou Stripe)
  useEffect(() => {
    const raw = localStorage.getItem("pendingAnalysis");
    if (!raw) return;
    localStorage.removeItem("pendingAnalysis");
    try {
      const { cv: c, offre: o, nomFichier: n } = JSON.parse(raw);
      if (c) setCv(c);
      if (o) setOffre(o);
      if (n) { setNomFichier(n); setModeCV("upload"); }
      setAutoAnalyse(true);
    } catch {}
  }, []);

  // Lance l'analyse automatiquement une fois la session disponible
  useEffect(() => {
    if (autoAnalyse && session) {
      setAutoAnalyse(false);
      analyser(); // eslint-disable-line react-hooks/exhaustive-deps
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAnalyse, session]);

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

  async function analyser() {
    if (!session) {
      localStorage.setItem("pendingAnalysis", JSON.stringify({ cv, offre, nomFichier }));
      router.push("/login");
      return;
    }
    if (!cv.trim() || !offre.trim()) {
      setErreur("Veuillez remplir les deux champs.");
      return;
    }
    setErreur("");
    setChargement(true);
    setResultat(null);

    try {
      const reponse = await fetch("/api/analyser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, offre }),
      });
      const data = await reponse.json();
      if (reponse.status === 403) {
        // Sauvegarder pour restaurer après abonnement (survit à la redirection Stripe)
        localStorage.setItem("pendingAnalysis", JSON.stringify({ cv, offre, nomFichier }));
        setErreur(data.error);
        return;
      }
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

  async function sauvegarderAnalyse(data: ResultatAnalyse & { nomPoste?: string }) {
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

  async function sauvegarderCvAdapte(cv: CVStructure) {
    const nomOffre = nomPosteEnregistre || nomFichier || "Analyse sans titre";
    await fetch("/api/sauvegarder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        analyseId
          ? { analyseId, nomOffre, cvAdapte: cv }
          : { nomOffre, score: resultat?.score ?? 0, resume: resultat?.resume ?? "", motsClesManquants: resultat?.motsClesManquants ?? [], motsClesPresents: resultat?.motsClesPresents ?? [], cvAdapte: cv }
      ),
    });
  }

  async function exporterCV(format: "pdf" | "docx") {
    if (!cvAdapte) return;
    setExportEnCours(format);
    try {
      const reponse = await fetch("/api/exporter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv: cvAdapte, format }),
      });
      if (!reponse.ok) throw new Error("Erreur lors de l'export.");
      const blob = await reponse.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nom = (cvAdapte.nom || "cv").toLowerCase().replace(/\s+/g, "_");
      a.href = url;
      a.download = `${nom}_cv.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silencieux — l'utilisateur voit que le bouton se débloque
    } finally {
      setExportEnCours(null);
    }
  }

  const couleurScore = (score: number) => {
    if (score >= 75) return "text-emerald-600";
    if (score >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  const ringScore = (score: number) => {
    if (score >= 75) return "ring-emerald-200 bg-emerald-50";
    if (score >= 50) return "ring-amber-200 bg-amber-50";
    return "ring-rose-200 bg-rose-50";
  };

  const scoreLabel = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Moyen";
    return "Faible";
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-indigo-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl leading-none">⚡</span>
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              JobBoost
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150"
            >
              Tarifs
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 hidden sm:block"
                >
                  Dashboard
                </Link>
                <Link
                  href="/abonnement"
                  className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 hidden sm:block"
                >
                  Mon abonnement
                </Link>
                <span className="text-gray-300 mx-1 hidden sm:block">·</span>
                <span className="text-gray-400 text-sm font-medium hidden sm:block">{session.user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="ml-2 px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-150"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  S&apos;inscrire gratuitement
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-6 pt-20 pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Optimisez votre CV pour
              <br />
              <span
                className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent animate-shimmer"
                style={{ backgroundSize: "200% auto" }}
              >
                décrocher plus d&apos;entretiens
              </span>
            </h1>

            <p className="text-gray-500 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed mb-10">
              JobBoost analyse la correspondance entre votre CV et une offre d&apos;emploi.
            </p>

            <button
              onClick={() => document.getElementById("zones-texte")?.scrollIntoView({ behavior: "smooth" })}
              className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">⚡ {estAbonne ? "Analyser mon CV" : "Analyser mon CV gratuitement"}</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
            </button>
          </div>
        </section>

        {/* Zones de texte */}
        <section id="zones-texte" className="max-w-6xl mx-auto px-6 pb-6 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* CV */}
            <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-indigo-200 transition-all duration-200 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Votre CV</span>
                </div>
                {modeCV === "texte" && (
                  <button
                    onClick={() => setModeCV("upload")}
                    className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
                  >
                    ← Upload de fichier
                  </button>
                )}
              </div>

              {modeCV === "upload" ? (
                <div className="p-5 flex flex-col gap-4">
                  <label
                    className={`flex flex-col items-center justify-center min-h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                      dragActif
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragActif(true); }}
                    onDragLeave={() => setDragActif(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActif(false);
                      const f = e.dataTransfer.files[0];
                      if (f) traiterFichier(f);
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) traiterFichier(f); }}
                    />
                    {extractionEnCours ? (
                      <div className="flex flex-col items-center gap-2 text-indigo-500">
                        <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span className="text-sm font-medium">Extraction en cours...</span>
                      </div>
                    ) : nomFichier ? (
                      <div className="flex flex-col items-center gap-2 text-emerald-600">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold">{nomFichier}</span>
                        <span className="text-xs text-gray-400">Cliquez pour changer de fichier</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400 px-4 text-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-600">Glissez votre CV ici</span>
                        <span className="text-xs">ou cliquez pour choisir</span>
                        <span className="text-xs text-gray-300">Formats acceptés : PDF, Word (.docx)</span>
                      </div>
                    )}
                  </label>

                  <button
                    onClick={() => setModeCV("texte")}
                    className="text-xs text-indigo-500 hover:text-indigo-700 font-medium text-center transition-colors"
                  >
                    Ou coller le texte →
                  </button>
                </div>
              ) : (
                <textarea
                  value={cv}
                  onChange={(e) => setCv(e.target.value)}
                  placeholder="Collez ici le contenu de votre CV..."
                  className="w-full min-h-56 p-5 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none bg-transparent leading-relaxed"
                />
              )}
            </div>

            {/* Offre */}
            <div className="group bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-violet-200 transition-all duration-200 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Offre d&apos;emploi</span>
              </div>
              <textarea
                value={offre}
                onChange={(e) => setOffre(e.target.value)}
                placeholder="Collez ici le texte de l'offre d'emploi..."
                className="w-full min-h-56 p-5 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none bg-transparent leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* Bouton + erreur */}
        <section className="max-w-6xl mx-auto px-6 pb-14 flex flex-col items-center gap-3">
          {erreur && (
            erreur.includes("analyses gratuites") ? (
              <p className="text-rose-500 text-sm font-medium text-center">
                {erreur}{" "}
                <Link href="/pricing" className="underline text-indigo-500 hover:text-indigo-700">
                  Voir les abonnements →
                </Link>
              </p>
            ) : (
              <p className="text-rose-500 text-sm font-medium">{erreur}</p>
            )
          )}
          <button
            onClick={analyser}
            disabled={chargement}
            className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              {chargement ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Analyse en cours...
                </>
              ) : (
                <>
                  ⚡ {estAbonne ? "Analyser" : "Analyser gratuitement"}
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
          </button>
          {session && scansRestants !== null && scansRestants > 0 && (
            <p className="text-gray-400 text-xs text-center">
              {scansRestants} analyse{scansRestants !== 1 ? "s" : ""} gratuite{scansRestants !== 1 ? "s" : ""} restante{scansRestants !== 1 ? "s" : ""}
            </p>
          )}
          {session && scansRestants === null && resultat && (
            <p className="text-emerald-600 text-xs text-center font-medium">Analyses illimitées ✓</p>
          )}
        </section>

        {/* Résultats */}
        {resultat && (
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Score */}
              <div className={`bg-white rounded-2xl ring-2 shadow-sm p-8 flex flex-col items-center justify-center text-center ${ringScore(resultat.score)}`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Score de correspondance</p>
                <p className={`text-7xl font-extrabold tabular-nums ${couleurScore(resultat.score)}`}>
                  {resultat.score}
                  <span className="text-3xl">%</span>
                </p>
                <span className={`mt-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  resultat.score >= 75 ? "bg-emerald-100 text-emerald-700" :
                  resultat.score >= 50 ? "bg-amber-100 text-amber-700" :
                  "bg-rose-100 text-rose-700"
                }`}>
                  {scoreLabel(resultat.score)}
                </span>
              </div>

              {/* Analyse */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 lg:col-span-2 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Analyse</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{resultat.resume}</p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                  {session ? (
                    <>
                      {creditsRestants === 0 ? (
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/pricing"
                            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm text-center hover:opacity-90 transition-opacity shadow-md shadow-indigo-100"
                          >
                            S&apos;abonner pour des adaptations illimitées →
                          </Link>
                          <p className="text-gray-400 text-xs text-center">Votre crédit gratuit a été utilisé</p>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={adapterCV}
                            disabled={adaptationEnCours}
                            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {adaptationEnCours ? (
                              <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Adaptation en cours...
                              </>
                            ) : (
                              "Adapter mon CV automatiquement →"
                            )}
                          </button>
                          {erreurAdaptation && (
                            <p className="text-rose-500 text-xs font-medium text-center">{erreurAdaptation}</p>
                          )}
                          {creditsRestants !== null && creditsRestants > 0 ? (
                            <p className="text-gray-400 text-xs text-center">{creditsRestants} crédit{creditsRestants !== 1 ? "s" : ""} restant{creditsRestants !== 1 ? "s" : ""}</p>
                          ) : creditsRestants === null && cvAdapte ? (
                            <p className="text-emerald-600 text-xs text-center font-medium">Adaptations illimitées ✓</p>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        href="/register"
                        className="w-full sm:w-auto flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 px-5 rounded-xl font-bold text-sm text-center hover:opacity-90 transition-opacity shadow-md shadow-indigo-100"
                      >
                        Adapter mon CV →
                      </Link>
                      <p className="text-gray-400 text-xs whitespace-nowrap">1 adaptation gratuite à l&apos;inscription</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Catégories détaillées */}
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
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          cat.score >= 75 ? "bg-emerald-100 text-emerald-700" :
                          cat.score >= 50 ? "bg-amber-100 text-amber-700" :
                          "bg-rose-100 text-rose-700"
                        }`}>{cat.score}%</span>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {cat.problemes.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="mt-0.5 shrink-0">
                              {p.statut === "ok" ? "✅" : p.statut === "avertissement" ? "⚠️" : "❌"}
                            </span>
                            <span className={
                              p.statut === "ok" ? "text-emerald-700" :
                              p.statut === "avertissement" ? "text-amber-700" :
                              "text-rose-600"
                            }>{p.message}</span>
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
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Manquants <span className="text-rose-500 font-bold">({resultat.motsClesManquants.length})</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resultat.motsClesManquants.map((mot) => (
                      <span
                        key={mot}
                        className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {mot}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mots-clés présents */}
              {resultat.motsClesPresents.length > 0 && (
                <div className="bg-white rounded-2xl ring-1 ring-emerald-100 shadow-sm p-6 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Présents <span className="text-emerald-600 font-bold">({resultat.motsClesPresents.length})</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resultat.motsClesPresents.map((mot) => (
                      <span
                        key={mot}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {mot}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Lien vers le dashboard */}
            {session && analyseId && (
              <div className="mt-5 flex justify-end">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Revenir au dashboard →
                </Link>
              </div>
            )}

            {/* CV adapté */}
            {cvAdapte && (
              <div className="mt-5 bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-100 bg-indigo-50/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté ATS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exporterCV("pdf")}
                      disabled={exportEnCours !== null}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {exportEnCours === "pdf" ? (
                        <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      )}
                      PDF
                    </button>
                    <button
                      onClick={() => exporterCV("docx")}
                      disabled={exportEnCours !== null}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {exportEnCours === "docx" ? (
                        <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      )}
                      Word
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <CVPreview cv={cvAdapte} />
                </div>
              </div>
            )}

          </section>
        )}
      </main>

      <Footer />

    </div>
  );
}
