"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import CVPreview from "@/components/CVPreview";
import { CVStructure } from "@/types/cv";

// ─── Types ────────────────────────────────────────────────────────────────────

type NiveauQualitatif = "Très mauvais" | "Mauvais" | "Moyen" | "Bon" | "Très bon" | "Excellent";
type FormeItem = { verdict: "✅" | "❌"; constat: string };

type ResultatAnalyse = {
  niveauQualitatif: NiveauQualitatif;
  nomPoste?: string;
  resume: string;
  forme: FormeItem[];
  motsClesManquants: string[];
  motsClesPresents: string[];
};

type AnalyseSauvegardee = {
  id: string;
  nom_offre: string;
  niveau_qualitatif?: string | null;
  niveau_qualitatif_apres?: string | null;
  created_at: string;
  resume?: string;
  mots_cles_manquants?: string[];
  mots_cles_presents?: string[];
  score?: number | null;
  score_apres?: number | null;
  mots_cles_apres_manquants?: string[] | null;
  mots_cles_apres_presents?: string[] | null;
  cv_adapte_id: string | null;
  cv_texte?: string | null;
  offre_texte?: string | null;
  cv_fichier_nom?: string | null;
  cv_fichier_type?: string | null;
  lettre_id?: string | null;
  lettre_texte?: string | null;
};

type CvAdapteSauvegarde = {
  id: string;
  nom_offre: string;
  created_at: string;
  cv_data: CVStructure;
  questions_reponses?: { question: string; reponse: string }[] | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cvStructureVersTexte(cv: CVStructure): string {
  const lignes: string[] = [];
  lignes.push(cv.nom ?? "");
  lignes.push(cv.titre ?? "");
  if (cv.contact) {
    lignes.push(cv.contact.email ?? "");
    lignes.push(cv.contact.telephone ?? "");
    lignes.push(cv.contact.localisation ?? "");
  }
  if (cv.resume) lignes.push(cv.resume);
  for (const exp of cv.experiences ?? []) {
    lignes.push(`${exp.poste} - ${exp.entreprise} (${exp.dates})`);
    lignes.push(...exp.missions);
  }
  for (const form of cv.formation ?? []) {
    lignes.push(`${form.diplome} - ${form.etablissement} (${form.dates})`);
    if (form.details) lignes.push(form.details);
  }
  if (cv.competences) {
    if (cv.competences.techniques) lignes.push(cv.competences.techniques.join(", "));
    if (cv.competences.langues) lignes.push(cv.competences.langues.join(", "));
    if (cv.competences.autres) lignes.push(cv.competences.autres.join(", "));
  }
  for (const p of cv.projets ?? []) {
    lignes.push(`${p.nom}: ${p.description}`);
    if (p.technologies) lignes.push(p.technologies);
  }
  for (const c of cv.certifications ?? []) {
    lignes.push(`${c.nom}${c.organisme ? ` - ${c.organisme}` : ""}`);
  }
  return lignes.filter(Boolean).join("\n");
}

const BADGE_NIVEAU: Record<string, string> = {
  "Très mauvais": "bg-rose-100 text-rose-700",
  "Mauvais": "bg-orange-100 text-orange-700",
  "Moyen": "bg-amber-100 text-amber-700",
  "Bon": "bg-blue-100 text-blue-700",
  "Très bon": "bg-emerald-100 text-emerald-700",
  "Excellent": "bg-violet-100 text-violet-700",
};
const badgeNiveau = (niveau: string | null | undefined) => BADGE_NIVEAU[niveau ?? ""] ?? "bg-gray-100 text-gray-700";
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
  const [fichierOriginal, setFichierOriginal] = useState<File | null>(null);
  const fichierOriginalRef = useRef<File | null>(null);
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
  const [etapeAdaptation, setEtapeAdaptation] = useState<"idle" | "questions" | "generation">("idle");
  const [questionsAdaptation, setQuestionsAdaptation] = useState<string[]>([]);
  const [reponsesAdaptation, setReponsesAdaptation] = useState<Record<number, string>>({});
  const [chargementQuestions, setChargementQuestions] = useState(false);
  const [modaleUpgrade, setModaleUpgrade] = useState<"scans" | "credits" | "lm" | null>(null);
  const [suppressionEnCours, setSuppressionEnCours] = useState<string | null>(null);
  const [editionPoste, setEditionPoste] = useState<{ id: string; valeur: string } | null>(null);
  const [ongletAnalyse, setOngletAnalyse] = useState<"resultats" | "apres" | "lettre" | "offre" | "cv">("resultats");
  const [lmCreditsRestants, setLmCreditsRestants] = useState<number | null>(null);
  const [generationLmEnCours, setGenerationLmEnCours] = useState<string | null>(null);
  const [exportLmEnCours, setExportLmEnCours] = useState<"pdf" | "docx" | null>(null);

  // ── Auth redirect
  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  // ── Réinitialiser l'onglet du drawer à chaque ouverture
  useEffect(() => {
    if (analyseOuverte) setOngletAnalyse("resultats");
  }, [analyseOuverte]);

  // ── Chargement historique
  const chargerHistorique = () => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setAnalyses(data.analyses ?? []);
        setCvsAdaptes(data.cvsAdaptes ?? []);
        if (data.estAbonne) {
          setEstAbonne(true);
          setScansRestants(null);
          setCreditsRestants(null);
          setLmCreditsRestants(null);
        } else {
          setScansRestants(data.scans ?? 0);
          setCreditsRestants(data.credits ?? 0);
          setLmCreditsRestants(data.lmCredits ?? 0);
        }
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
      setFichierOriginal(fichier);
      fichierOriginalRef.current = fichier;
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
      if (reponse.status === 403) { setModaleUpgrade("scans"); return; }
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

  // ── Lancer étape questions avant adaptation
  async function lancerEtapeQuestions() {
    if (!resultat) return;
    setErreurAdaptation("");
    setChargementQuestions(true);
    setEtapeAdaptation("questions");
    setQuestionsAdaptation([]);
    setReponsesAdaptation({});
    try {
      const reponse = await fetch("/api/generer-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, offre, motsClesManquants: resultat.motsClesManquants }),
      });
      const data = await reponse.json();
      if (reponse.ok) setQuestionsAdaptation(data.questions ?? []);
    } catch {
      setEtapeAdaptation("idle");
    } finally {
      setChargementQuestions(false);
    }
  }

  // ── Adaptation CV
  async function adapterCV() {
    if (!resultat) return;
    setErreurAdaptation("");
    setCvAdapte(null);
    setAdaptationEnCours(true);
    setEtapeAdaptation("generation");
    try {
      const reponses = questionsAdaptation.map((q, i) => ({ question: q, reponse: reponsesAdaptation[i] ?? "" }));
      const reponse = await fetch("/api/adapter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, offre, motsClesManquants: resultat.motsClesManquants, reponses }),
      });
      const data = await reponse.json();
      if (reponse.status === 403) { setModaleUpgrade("credits"); setEtapeAdaptation("idle"); return; }
      if (!reponse.ok) throw new Error(data.error);
      setCreditsRestants(data.creditsRestants);
      setEtapeAdaptation("idle");
      await sauvegarderCvAdapte(data.cvAdapte);
      calculerScoreApresAdaptation(data.cvAdapte).catch(() => {});
      if (analyseId) {
        router.push(`/cv-adapte/${analyseId}`);
      } else {
        setCvAdapte(data.cvAdapte);
      }
    } catch (e) {
      setErreurAdaptation(e instanceof Error ? e.message : "Une erreur est survenue.");
      setEtapeAdaptation("questions");
    } finally {
      setAdaptationEnCours(false);
    }
  }

  // ── Score après adaptation (route interne, sans décompte scans)
  async function calculerScoreApresAdaptation(cvAdapteData: CVStructure) {
    const idAnalyse = analyseId;
    if (!idAnalyse || !offre) return;
    const cvTexteApres = cvStructureVersTexte(cvAdapteData);
    const resScore = await fetch("/api/analyser-interne", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv: cvTexteApres, offre }),
    });
    if (!resScore.ok) return;
    const dataScore = await resScore.json();
    await fetch(`/api/analyses/${idAnalyse}/score-apres`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        niveauQualitatifApres: dataScore.niveauQualitatif,
        motsClesApresManquants: dataScore.motsClesManquants,
        motsClesApresPresents: dataScore.motsClesPresents,
      }),
    });
    chargerHistorique();
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
        niveauQualitatif: data.niveauQualitatif,
        resume: data.resume,
        motsClesManquants: data.motsClesManquants,
        motsClesPresents: data.motsClesPresents,
        cvTexte: cv,
        offreTexte: offre,
      }),
    });
    if (reponse.ok) {
      const json = await reponse.json();
      setAnalyseId(json.analyseId);
      // Sauvegarder le fichier original si l'utilisateur avait uploadé un PDF/DOCX
      // Utilise une ref pour éviter le problème de stale closure
      const fichier = fichierOriginalRef.current;
      if (fichier) {
        try {
          const fd = new FormData();
          fd.append("fichier", fichier);
          fd.append("analyseId", json.analyseId);
          await fetch("/api/sauvegarder-fichier", { method: "POST", body: fd });
        } catch {
          // Erreur silencieuse — le texte extrait est toujours disponible en fallback
        }
      }
      chargerHistorique();
    }
  }

  // ── Auto-save CV adapté
  async function sauvegarderCvAdapte(cvData: CVStructure) {
    const nomOffre = nomPosteEnregistre || nomFichier || "Analyse sans titre";
    const qr = questionsAdaptation
      .map((q, i) => ({ question: q, reponse: reponsesAdaptation[i] ?? "" }))
      .filter(r => r.reponse.trim());
    await fetch("/api/sauvegarder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        analyseId
          ? { analyseId, nomOffre, cvAdapte: cvData, questionsReponses: qr }
          : { nomOffre, niveauQualitatif: resultat?.niveauQualitatif, resume: resultat?.resume ?? "", motsClesManquants: resultat?.motsClesManquants ?? [], motsClesPresents: resultat?.motsClesPresents ?? [], cvAdapte: cvData, questionsReponses: qr }
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

  async function supprimerAnalyse(id: string) {
    if (suppressionEnCours) return;
    if (!window.confirm("Supprimer cette candidature ? Cette action est irréversible.")) return;
    setSuppressionEnCours(id);
    const cvAdapteId = analyses.find((a) => a.id === id)?.cv_adapte_id ?? null;
    try {
      const reponse = await fetch(`/api/supprimer-analyse?id=${id}`, { method: "DELETE" });
      if (!reponse.ok) throw new Error();
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      if (cvAdapteId) setCvsAdaptes((prev) => prev.filter((c) => c.id !== cvAdapteId));
    } catch {
      // Erreur silencieuse
    } finally {
      setSuppressionEnCours(null);
    }
  }

  async function enregistrerNomPoste(id: string, nomOffre: string) {
    const nom = nomOffre.trim();
    if (!nom) { setEditionPoste(null); return; }
    setAnalyses((prev) => prev.map((a) => a.id === id ? { ...a, nom_offre: nom } : a));
    setEditionPoste(null);
    await fetch("/api/renommer-analyse", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nom_offre: nom }),
    });
  }

  async function genererLettreMotivation(analyseId: string) {
    setGenerationLmEnCours(analyseId);
    try {
      const res = await fetch("/api/generer-lettre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analyseId }),
      });
      const data = await res.json();
      if (res.status === 403) { setModaleUpgrade("lm"); return; }
      if (!res.ok) return;
      if (data.lmCreditsRestants !== undefined) setLmCreditsRestants(data.lmCreditsRestants);
      chargerHistorique();
    } finally {
      setGenerationLmEnCours(null);
    }
  }

  async function exporterLettre(analyseId: string, format: "pdf" | "docx") {
    setExportLmEnCours(format);
    try {
      const res = await fetch("/api/exporter-lettre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analyseId, format }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lettre_motivation.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExportLmEnCours(null);
    }
  }

  const prenom = session?.user.name?.split(" ")[0] ?? "vous";

  if (isPending || !session) return null;

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-indigo-950 flex flex-col z-40 shrink-0">
        <div className="px-5 py-5 border-b border-indigo-900">
          <Link href="/" className="flex items-center gap-2 group">
            
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">JobBoost</span>
          </Link>
        </div>

        <div className="px-4 pt-5 flex flex-col gap-2">
          <button
            onClick={() => { setVue("nouvelle-analyse"); setResultat(null); setCvAdapte(null); setErreur(""); setCv(""); setOffre(""); setNomFichier(""); setModeCV("upload"); setAnalyseId(null); }}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle analyse
          </button>
          {!chargementHistorique && (
            estAbonne ? (
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium py-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Analyses illimitées
              </div>
            ) : (
              <div className="bg-indigo-900/50 rounded-xl px-3 py-2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-300">Analyses</span>
                  <span className={`font-bold ${(scansRestants ?? 0) === 0 ? "text-rose-400" : "text-white"}`}>{scansRestants ?? 0}/5</span>
                </div>
                <div className="w-full bg-indigo-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${(scansRestants ?? 0) === 0 ? "bg-rose-400" : "bg-indigo-400"}`}
                    style={{ width: `${Math.max(0, Math.min(100, ((scansRestants ?? 0) / 5) * 100))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <span className="text-indigo-300">Adaptation CV</span>
                  <span className={`font-bold ${(creditsRestants ?? 0) === 0 ? "text-rose-400" : "text-white"}`}>{(creditsRestants ?? 0) > 0 ? `${creditsRestants} crédit` : "0 crédit"}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <span className="text-indigo-300">Lettre de motivation</span>
                  <span className={`font-bold ${(lmCreditsRestants ?? 0) === 0 ? "text-rose-400" : "text-white"}`}>{(lmCreditsRestants ?? 0) > 0 ? `${lmCreditsRestants} crédit` : "0 crédit"}</span>
                </div>
                {((scansRestants ?? 0) <= 2 || (creditsRestants ?? 0) === 0 || (lmCreditsRestants ?? 0) === 0) && (
                  <Link href="/pricing" className="mt-1 text-center text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-800/60 hover:bg-indigo-700/60 rounded-lg py-1.5 transition-colors">
                    Passer à l&apos;abonnement →
                  </Link>
                )}
              </div>
            )
          )}
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
            onClick={() => setVue("historique")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-indigo-200 hover:bg-indigo-800/60 hover:text-white font-medium text-sm transition-colors text-left"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Mes candidatures
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
          <a href="mailto:contact@jobboost.fr" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-200 text-xs font-medium transition-colors mb-3">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Nous contacter
          </a>
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
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl"></div>
                <div>
                  <p className="text-gray-800 font-semibold text-lg">Aucune candidature pour l&apos;instant</p>
                  <p className="text-gray-400 text-sm mt-1">Analysez votre CV face à une offre pour commencer à suivre vos candidatures.</p>
                </div>
                <button
                  onClick={() => setVue("nouvelle-analyse")}
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
                >
                  Commencez votre première analyse →
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm overflow-hidden">

                {/* En-tête tableau */}
                <div className="grid grid-cols-[1fr_auto_auto] lg:grid-cols-[2fr_1fr_1fr_1fr_auto] border-b border-gray-100 bg-gray-50/60 px-5 py-3 gap-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Poste visé</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Analyse</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 hidden lg:block">CV adapté</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 hidden lg:block">Lettre de motivation</span>
                  <span className="sr-only">Actions</span>
                </div>

                {/* Lignes */}
                {analyses.map((analyse, index) => {
                  const cvLie = cvsAdaptes.find((c) => c.id === analyse.cv_adapte_id) ?? null;
                  const enSuppression = suppressionEnCours === analyse.id;
                  const enGenerationLm = generationLmEnCours === analyse.id;
                  return (
                    <div
                      key={analyse.id}
                      onClick={() => setAnalyseOuverte(analyse)}
                      className={`grid grid-cols-[1fr_auto_auto] lg:grid-cols-[2fr_1fr_1fr_1fr_auto] items-center px-5 py-4 gap-4 transition-colors duration-150 cursor-pointer
                        ${index !== analyses.length - 1 ? "border-b border-gray-100" : ""}
                        ${enSuppression ? "opacity-40 pointer-events-none" : "hover:bg-indigo-50/40"}
                      `}
                    >
                      {/* Colonne 1 : Poste visé */}
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{analyse.nom_offre}</p>
                        <p className="text-xs text-gray-400">{formaterDate(analyse.created_at)}</p>
                      </div>

                      {/* Colonne 2 : Analyse CV — badge qualitatif avant/après */}
                      <div className="flex items-center">
                        {analyse.niveau_qualitatif_apres ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold">
                            <span className={`px-2.5 py-1.5 rounded-full ${badgeNiveau(analyse.niveau_qualitatif)}`}>{analyse.niveau_qualitatif ?? "—"}</span>
                            <span className="text-gray-300 mx-0.5">→</span>
                            <span className={`px-2.5 py-1.5 rounded-full font-bold ${badgeNiveau(analyse.niveau_qualitatif_apres)}`}>{analyse.niveau_qualitatif_apres}</span>
                          </span>
                        ) : (
                          <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full ${badgeNiveau(analyse.niveau_qualitatif)}`}>
                            {analyse.niveau_qualitatif ?? "—"}
                          </span>
                        )}
                      </div>

                      {/* Colonne 3 : CV adapté */}
                      <div className="hidden sm:flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {cvLie ? (
                          <>
                            <button
                              onClick={() => exporterCV(cvLie.cv_data, "pdf", "drawer")}
                              disabled={exportEnCoursDrawer !== null}
                              className="text-xs font-semibold text-white bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                            >
                              PDF
                            </button>
                            <button
                              onClick={() => exporterCV(cvLie.cv_data, "docx", "drawer")}
                              disabled={exportEnCoursDrawer !== null}
                              className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                            >
                              Word
                            </button>
                            <button
                              onClick={() => setCvOuvert(cvLie)}
                              className="text-xs font-medium text-gray-500 hover:text-gray-800 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              Aperçu
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setVue("nouvelle-analyse")}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Adapter pour les ATS →
                          </button>
                        )}
                      </div>

                      {/* Colonne 4 : Lettre de motivation */}
                      <div className="hidden lg:flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {analyse.lettre_id ? (
                          <>
                            <button
                              onClick={() => { setAnalyseOuverte(analyse); setOngletAnalyse("lettre"); }}
                              className="text-xs font-medium text-gray-500 hover:text-gray-800 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              Aperçu
                            </button>
                            <button
                              onClick={() => exporterLettre(analyse.id, "pdf")}
                              disabled={exportLmEnCours !== null}
                              className="text-xs font-semibold text-white bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                            >
                              PDF
                            </button>
                            <button
                              onClick={() => exporterLettre(analyse.id, "docx")}
                              disabled={exportLmEnCours !== null}
                              className="text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                            >
                              Word
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => genererLettreMotivation(analyse.id)}
                            disabled={generationLmEnCours !== null}
                            className="text-xs font-semibold text-violet-600 hover:text-violet-800 hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {enGenerationLm ? (
                              <span className="flex items-center gap-1.5">
                                <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                                Génération...
                              </span>
                            ) : "Générer →"}
                          </button>
                        )}
                      </div>

                      {/* Colonne 5 : Supprimer */}
                      <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => supprimerAnalyse(analyse.id)}
                          disabled={suppressionEnCours !== null}
                          className="text-gray-300 hover:text-rose-400 transition-colors disabled:opacity-30 p-1.5 rounded-lg hover:bg-rose-50"
                          title="Supprimer cette candidature"
                          aria-label="Supprimer"
                        >
                          {enSuppression ? (
                            <svg className="animate-spin w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                    <button onClick={() => { setModeCV("texte"); setFichierOriginal(null); fichierOriginalRef.current = null; }} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium text-center transition-colors">Ou coller le texte →</button>
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
                    <>{estAbonne ? "Analyser" : "Analyser gratuitement"}</>
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

                  {/* Badge qualitatif */}
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Niveau de correspondance</p>
                    <span className={`text-2xl font-extrabold px-5 py-2 rounded-full ${badgeNiveau(resultat.niveauQualitatif)}`}>
                      {resultat.niveauQualitatif}
                    </span>
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
                      ) : etapeAdaptation === "generation" ? (
                        <button disabled className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm opacity-70 cursor-not-allowed flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                          Génération du CV en cours...
                        </button>
                      ) : etapeAdaptation === "idle" ? (
                        <>
                          <button onClick={lancerEtapeQuestions} disabled={adaptationEnCours} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            Adapter mon CV pour les ATS →
                          </button>
                          {erreurAdaptation && <p className="text-rose-500 text-xs font-medium text-center">{erreurAdaptation}</p>}
                          {creditsRestants !== null && creditsRestants > 0 ? (
                            <p className="text-gray-400 text-xs text-center">{creditsRestants} crédit{creditsRestants !== 1 ? "s" : ""} restant{creditsRestants !== 1 ? "s" : ""}</p>
                          ) : creditsRestants === null && cvAdapte ? (
                            <p className="text-emerald-600 text-xs text-center font-medium">Adaptations illimitées ✓</p>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>

                  {/* Étape questions */}
                  {etapeAdaptation === "questions" && (
                    <div className="bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm p-6 lg:col-span-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Quelques précisions pour personnaliser votre CV</p>
                      <p className="text-sm text-gray-500 mb-5">Ces informations permettront à l&apos;IA de rédiger un CV plus précis. Répondez à celles qui vous semblent pertinentes.</p>
                      {chargementQuestions ? (
                        <div className="flex items-center gap-2 text-indigo-500">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                          <span className="text-sm font-medium">Génération des questions...</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col gap-4 mb-5">
                            {questionsAdaptation.map((q, i) => (
                              <div key={i}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{q}</label>
                                <input
                                  type="text"
                                  value={reponsesAdaptation[i] ?? ""}
                                  onChange={(e) => setReponsesAdaptation(prev => ({ ...prev, [i]: e.target.value }))}
                                  placeholder="Votre réponse (optionnel)"
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={adapterCV} disabled={adaptationEnCours} className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                              {adaptationEnCours ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Génération en cours...</>) : ("Générer mon CV adapté →")}
                            </button>
                            <button onClick={() => setEtapeAdaptation("idle")} className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">Annuler</button>
                          </div>
                          {erreurAdaptation && <p className="text-rose-500 text-xs font-medium mt-2">{erreurAdaptation}</p>}
                        </>
                      )}
                    </div>
                  )}

                  {/* Section Forme */}
                  {resultat.forme && resultat.forme.length > 0 && (
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 lg:col-span-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Forme du CV</p>
                      <ul className="flex flex-col gap-3">
                        {resultat.forme.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <span className="shrink-0 mt-0.5">{item.verdict}</span>
                            <span className="text-gray-700 leading-relaxed">{item.constat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

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
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Analyse</p>
                {editionPoste?.id === analyseOuverte.id ? (
                  <input
                    autoFocus
                    value={editionPoste.valeur}
                    onChange={(e) => setEditionPoste({ id: analyseOuverte.id, valeur: e.target.value })}
                    onBlur={() => {
                      enregistrerNomPoste(analyseOuverte.id, editionPoste.valeur);
                      setAnalyseOuverte({ ...analyseOuverte, nom_offre: editionPoste.valeur });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        enregistrerNomPoste(analyseOuverte.id, editionPoste.valeur);
                        setAnalyseOuverte({ ...analyseOuverte, nom_offre: editionPoste.valeur });
                      }
                      if (e.key === "Escape") setEditionPoste(null);
                    }}
                    className="text-sm font-bold text-gray-900 bg-white border border-indigo-300 rounded-md px-2 py-0.5 outline-none ring-2 ring-indigo-100 w-full"
                  />
                ) : (
                  <button
                    onClick={() => setEditionPoste({ id: analyseOuverte.id, valeur: analyseOuverte.nom_offre })}
                    className="text-sm font-bold text-gray-900 text-left hover:text-indigo-600 transition-colors group flex items-center gap-1.5 max-w-xs"
                    title="Cliquer pour renommer"
                  >
                    <span className="truncate">{analyseOuverte.nom_offre}</span>
                    <svg className="w-3 h-3 text-gray-300 group-hover:text-indigo-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                )}
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
            {/* Barre d'onglets */}
            <div className="flex border-b border-gray-100 px-4 shrink-0 overflow-x-auto">
              {([
                { key: "resultats", label: "Résultats" },
                ...(analyseOuverte.niveau_qualitatif_apres != null ? [{ key: "apres", label: "Après adaptation" }] : []),
                ...(analyseOuverte.lettre_id ? [{ key: "lettre", label: "Lettre de motivation" }] : []),
                { key: "offre", label: "Offre d'emploi" },
                { key: "cv", label: "CV original" },
              ] as { key: "resultats" | "apres" | "lettre" | "offre" | "cv"; label: string }[]).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setOngletAnalyse(key)}
                  className={`text-sm font-medium px-3 py-3 border-b-2 -mb-px transition-colors whitespace-nowrap ${
                    ongletAnalyse === key
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">

              {/* Onglet Résultats */}
              {ongletAnalyse === "resultats" && (
                <div className="p-6 flex flex-col gap-6">
                  {/* Comparatif avant/après si niveau_qualitatif_apres disponible */}
                  {analyseOuverte.niveau_qualitatif_apres != null && (
                    <div className="flex items-center gap-3 bg-emerald-50 ring-1 ring-emerald-100 rounded-xl px-4 py-3">
                      <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${badgeNiveau(analyseOuverte.niveau_qualitatif)}`}>{analyseOuverte.niveau_qualitatif ?? "—"}</span>
                      <span className="text-gray-300 text-lg">→</span>
                      <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${badgeNiveau(analyseOuverte.niveau_qualitatif_apres)}`}>{analyseOuverte.niveau_qualitatif_apres}</span>
                      <span className="text-sm text-emerald-700 font-semibold ml-1">après adaptation</span>
                    </div>
                  )}
                  {/* Badge niveau */}
                  <div className="flex items-center gap-5">
                    <span className={`text-base font-extrabold px-4 py-2 rounded-full ${badgeNiveau(analyseOuverte.niveau_qualitatif)}`}>{analyseOuverte.niveau_qualitatif ?? "—"}</span>
                    <p className="text-xs text-gray-400">{formaterDate(analyseOuverte.created_at)}</p>
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
              )}

              {/* Onglet Après adaptation */}
              {ongletAnalyse === "apres" && (() => {
                const cvLie = cvsAdaptes.find((c) => c.id === analyseOuverte.cv_adapte_id) ?? null;
                const qr = cvLie?.questions_reponses?.filter((r) => r.reponse?.trim()) ?? [];
                const avant = analyseOuverte.mots_cles_manquants ?? [];
                const apresManquants = analyseOuverte.mots_cles_apres_manquants ?? [];
                const apresPresents = analyseOuverte.mots_cles_apres_presents ?? [];
                // Mots-clés ajoutés = étaient manquants avant, présents après
                const ajoutes = avant.filter((m) => apresPresents.map((x) => x.toLowerCase()).includes(m.toLowerCase()));
                // Encore manquants après adaptation
                const encoreManquants = apresManquants;
                // Déjà présents avant et toujours présents
                const dejaPresentsetToujours = (analyseOuverte.mots_cles_presents ?? []).filter(
                  (m) => apresPresents.map((x) => x.toLowerCase()).includes(m.toLowerCase())
                );
                return (
                  <div className="p-6 flex flex-col gap-6">
                    {/* Niveau comparatif */}
                    <div className="flex items-center gap-3 bg-emerald-50 ring-1 ring-emerald-100 rounded-xl px-5 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${badgeNiveau(analyseOuverte.niveau_qualitatif)}`}>{analyseOuverte.niveau_qualitatif ?? "—"}</span>
                        <span className="text-xs text-gray-400">Avant</span>
                      </div>
                      <span className="text-gray-300 text-xl mx-1">→</span>
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${badgeNiveau(analyseOuverte.niveau_qualitatif_apres)}`}>{analyseOuverte.niveau_qualitatif_apres}</span>
                        <span className="text-xs text-emerald-600">Après</span>
                      </div>
                    </div>

                    {/* Mots-clés ajoutés */}
                    {ajoutes.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">✅</span>
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Mots-clés ajoutés <span className="text-emerald-600">({ajoutes.length})</span>
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">Ces mots-clés manquaient dans votre CV original et ont été intégrés dans la version adaptée.</p>
                        <div className="flex flex-wrap gap-2">
                          {ajoutes.map((mot) => (
                            <span key={mot} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <span className="text-emerald-500">+</span>{mot}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Encore manquants */}
                    {encoreManquants.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">⚠️</span>
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Encore manquants <span className="text-amber-500">({encoreManquants.length})</span>
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">Ces mots-clés sont toujours absents même après adaptation — souvent parce que les compétences sous-jacentes ne figurent pas dans votre profil.</p>
                        <div className="flex flex-wrap gap-2">
                          {encoreManquants.map((mot) => (
                            <span key={mot} className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">{mot}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Déjà présents et conservés */}
                    {dejaPresentsetToujours.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">✓</span>
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Déjà présents et conservés <span className="text-gray-400">({dejaPresentsetToujours.length})</span>
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {dejaPresentsetToujours.map((mot) => (
                            <span key={mot} className="bg-gray-50 text-gray-500 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{mot}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Informations ajoutées grâce aux questions */}
                    {qr.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">💬</span>
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                            Enrichissements apportés par vos réponses
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">Ces informations chiffrées ont été intégrées dans votre CV adapté.</p>
                        <div className="flex flex-col gap-3">
                          {qr.map((item, i) => (
                            <div key={i} className="bg-indigo-50 ring-1 ring-indigo-100 rounded-xl px-4 py-3">
                              <p className="text-xs text-indigo-400 font-medium mb-1">{item.question}</p>
                              <p className="text-sm text-indigo-800 font-semibold">{item.reponse}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Onglet Lettre de motivation */}
              {ongletAnalyse === "lettre" && (() => {
                let lettre: { salutation: string; paragraphes: string[]; formule_politesse: string } | null = null;
                try { if (analyseOuverte.lettre_texte) lettre = JSON.parse(analyseOuverte.lettre_texte); } catch {}
                return lettre ? (
                  <div className="p-6 flex flex-col gap-4">
                    {/* Boutons export */}
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => exporterLettre(analyseOuverte.id, "pdf")}
                        disabled={exportLmEnCours !== null}
                        className="flex items-center gap-1.5 text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        {exportLmEnCours === "pdf" ? <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> : null}
                        PDF
                      </button>
                      <button
                        onClick={() => exporterLettre(analyseOuverte.id, "docx")}
                        disabled={exportLmEnCours !== null}
                        className="flex items-center gap-1.5 text-xs font-semibold bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
                      >
                        {exportLmEnCours === "docx" ? <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> : null}
                        Word
                      </button>
                    </div>
                    {/* Aperçu lettre */}
                    <div className="bg-white ring-1 ring-gray-200 rounded-xl p-6 flex flex-col gap-4 text-sm text-gray-800 leading-relaxed font-serif">
                      <p className="text-gray-500 italic text-xs">{lettre.salutation}</p>
                      {lettre.paragraphes.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      <p className="mt-2">{lettre.formule_politesse}</p>
                    </div>
                    {/* Regénérer */}
                    <button
                      onClick={() => genererLettreMotivation(analyseOuverte.id)}
                      disabled={generationLmEnCours !== null}
                      className="text-xs text-gray-400 hover:text-violet-600 transition-colors text-center disabled:opacity-40"
                    >
                      {generationLmEnCours === analyseOuverte.id ? "Regénération en cours..." : "↺ Regénérer la lettre"}
                    </button>
                  </div>
                ) : (
                  <p className="p-6 text-sm text-gray-400 italic">Lettre introuvable.</p>
                );
              })()}

              {/* Onglet Offre d'emploi */}
              {ongletAnalyse === "offre" && (
                <div className="p-6">
                  {analyseOuverte.offre_texte ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
                      {analyseOuverte.offre_texte}
                    </pre>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Offre non disponible — analysée avant l&apos;activation de cette fonctionnalité.
                    </p>
                  )}
                </div>
              )}

              {/* Onglet CV original */}
              {ongletAnalyse === "cv" && (
                <div className="p-6 flex flex-col gap-4">
                  {analyseOuverte.cv_fichier_nom ? (
                    /* Fichier original disponible */
                    <>
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
                        <div className="w-10 h-10 rounded-lg bg-white ring-1 ring-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold uppercase text-gray-500">{analyseOuverte.cv_fichier_type}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{analyseOuverte.cv_fichier_nom}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Fichier original</p>
                        </div>
                        <a
                          href={`/api/telecharger-cv/${analyseOuverte.id}`}
                          download={analyseOuverte.cv_fichier_nom}
                          className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors shrink-0"
                        >
                          Télécharger
                        </a>
                      </div>

                      {/* Aperçu inline selon le type */}
                      {analyseOuverte.cv_fichier_type === "pdf" ? (
                        <iframe
                          src={`/api/telecharger-cv/${analyseOuverte.id}?preview=1`}
                          className="w-full rounded-xl ring-1 ring-gray-100"
                          style={{ height: "70vh" }}
                          title="Aperçu du CV"
                        />
                      ) : (
                        /* DOCX : aperçu texte extrait */
                        analyseOuverte.cv_texte && (
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
                            {analyseOuverte.cv_texte}
                          </pre>
                        )
                      )}
                    </>
                  ) : analyseOuverte.cv_texte ? (
                    /* Texte collé → afficher le texte brut */
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
                      {analyseOuverte.cv_texte}
                    </pre>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      CV non disponible — analysé avant l&apos;activation de cette fonctionnalité.
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Modale upgrade freemium */}
      {modaleUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModaleUpgrade(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center gap-5">
            <button onClick={() => setModaleUpgrade(null)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-3xl">
              {modaleUpgrade === "scans" ? "" : modaleUpgrade === "lm" ? "✉️" : "✨"}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                {modaleUpgrade === "scans" ? "Limite d'analyses atteinte" : modaleUpgrade === "lm" ? "Plus de crédits lettre de motivation" : "Plus de crédits disponibles"}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {modaleUpgrade === "scans"
                  ? "Vous avez utilisé vos 5 analyses gratuites. Passez à un abonnement pour analyser autant de CV que vous le souhaitez."
                  : modaleUpgrade === "lm"
                  ? "Votre crédit gratuit de lettre de motivation a été utilisé. Passez à un abonnement pour générer des lettres illimitées."
                  : "Votre crédit d'adaptation CV gratuit a été utilisé. Passez à un abonnement pour adapter votre CV en illimité."}
              </p>
            </div>
            <div className="w-full flex flex-col gap-2.5">
              <Link
                href="/pricing"
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100"
                onClick={() => setModaleUpgrade(null)}
              >
                Voir les abonnements →
              </Link>
              <button
                onClick={() => setModaleUpgrade(null)}
                className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2 transition-colors"
              >
                Fermer
              </button>
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
