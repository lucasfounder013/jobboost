"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";
import CVPreview from "@/components/CVPreview";
import { CVStructure } from "@/types/cv";
import { OffreFT, OffreSauvegardee } from "@/types/offres";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormeItem = { verdict: "✅" | "❌"; constat: string };

type ResultatAnalyse = {
  score: number;
  nomPoste?: string;
  resume: string;
  forme: FormeItem[];
  motsClesManquants: string[];
  motsClesPresents: string[];
};

type AnalyseSauvegardee = {
  id: string;
  nom_offre: string;
  score?: number | null;
  score_apres?: number | null;
  created_at: string;
  resume?: string;
  mots_cles_manquants?: string[];
  mots_cles_presents?: string[];
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

type ResultatEntretien = {
  entretienId: string;
  nomPoste: string;
  pitchComplet: string;
  questionsProbables: { question: string; conseil: string }[];
  questionsAPoseur: string[];
};

type EntretienSauvegarde = {
  id: string;
  nom_offre: string;
  pitch: string;
  questions_probables: { question: string; conseil: string }[];
  questions_a_poser: string[];
  created_at: string;
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

function couleurScore(score: number | null | undefined): string {
  if (score == null) return "text-gray-500 bg-gray-100";
  if (score <= 20) return "text-rose-700 bg-rose-100";
  if (score <= 40) return "text-orange-700 bg-orange-100";
  if (score <= 60) return "text-amber-700 bg-amber-100";
  if (score <= 75) return "text-blue-700 bg-blue-100";
  if (score <= 89) return "text-emerald-700 bg-emerald-100";
  return "text-violet-700 bg-violet-100";
}
function ringScore(score: number | null | undefined): string {
  if (score == null) return "ring-gray-200 text-gray-500";
  if (score <= 20) return "ring-rose-300 text-rose-700";
  if (score <= 40) return "ring-orange-300 text-orange-700";
  if (score <= 60) return "ring-amber-300 text-amber-700";
  if (score <= 75) return "ring-blue-300 text-blue-700";
  if (score <= 89) return "ring-emerald-300 text-emerald-700";
  return "ring-violet-300 text-violet-700";
}
const formaterDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

const DEPARTEMENTS = [
  ["01","Ain"],["02","Aisne"],["03","Allier"],["04","Alpes-de-Haute-Provence"],["05","Hautes-Alpes"],
  ["06","Alpes-Maritimes"],["07","Ardèche"],["08","Ardennes"],["09","Ariège"],["10","Aube"],
  ["11","Aude"],["12","Aveyron"],["13","Bouches-du-Rhône"],["14","Calvados"],["15","Cantal"],
  ["16","Charente"],["17","Charente-Maritime"],["18","Cher"],["19","Corrèze"],["2A","Corse-du-Sud"],
  ["2B","Haute-Corse"],["21","Côte-d'Or"],["22","Côtes-d'Armor"],["23","Creuse"],["24","Dordogne"],
  ["25","Doubs"],["26","Drôme"],["27","Eure"],["28","Eure-et-Loir"],["29","Finistère"],
  ["30","Gard"],["31","Haute-Garonne"],["32","Gers"],["33","Gironde"],["34","Hérault"],
  ["35","Ille-et-Vilaine"],["36","Indre"],["37","Indre-et-Loire"],["38","Isère"],["39","Jura"],
  ["40","Landes"],["41","Loir-et-Cher"],["42","Loire"],["43","Haute-Loire"],["44","Loire-Atlantique"],
  ["45","Loiret"],["46","Lot"],["47","Lot-et-Garonne"],["48","Lozère"],["49","Maine-et-Loire"],
  ["50","Manche"],["51","Marne"],["52","Haute-Marne"],["53","Mayenne"],["54","Meurthe-et-Moselle"],
  ["55","Meuse"],["56","Morbihan"],["57","Moselle"],["58","Nièvre"],["59","Nord"],
  ["60","Oise"],["61","Orne"],["62","Pas-de-Calais"],["63","Puy-de-Dôme"],["64","Pyrénées-Atlantiques"],
  ["65","Hautes-Pyrénées"],["66","Pyrénées-Orientales"],["67","Bas-Rhin"],["68","Haut-Rhin"],["69","Rhône"],
  ["70","Haute-Saône"],["71","Saône-et-Loire"],["72","Sarthe"],["73","Savoie"],["74","Haute-Savoie"],
  ["75","Paris"],["76","Seine-Maritime"],["77","Seine-et-Marne"],["78","Yvelines"],["79","Deux-Sèvres"],
  ["80","Somme"],["81","Tarn"],["82","Tarn-et-Garonne"],["83","Var"],["84","Vaucluse"],
  ["85","Vendée"],["86","Vienne"],["87","Haute-Vienne"],["88","Vosges"],["89","Yonne"],
  ["90","Territoire de Belfort"],["91","Essonne"],["92","Hauts-de-Seine"],["93","Seine-Saint-Denis"],
  ["94","Val-de-Marne"],["95","Val-d'Oise"],["971","Guadeloupe"],["972","Martinique"],
  ["973","Guyane"],["974","La Réunion"],["976","Mayotte"],
] as const;

// ─── Composant ────────────────────────────────────────────────────────────────

function DashboardInner() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Vue active — initialisée depuis ?vue= si présent
  const vuesValides = ["historique", "nouvelle-analyse", "preparer-entretien", "trouver-offres", "trouver-rh"] as const;
  type Vue = typeof vuesValides[number];
  const vueParam = searchParams.get("vue") as Vue | null;
  const [vue, setVue] = useState<Vue>(vuesValides.includes(vueParam as Vue) ? (vueParam as Vue) : "historique");

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
  const [planType, setPlanType] = useState<"starter" | "pro" | null>(null);
  const [exportEnCoursAnalyse, setExportEnCoursAnalyse] = useState<"pdf" | "docx" | null>(null);
  const [analyseId, setAnalyseId] = useState<string | null>(null);
  const [nomPosteEnregistre, setNomPosteEnregistre] = useState("");
  const [autoAnalyse, setAutoAnalyse] = useState(false);
  const [etapeAdaptation, setEtapeAdaptation] = useState<"idle" | "generation">("idle");
  const [modaleUpgrade, setModaleUpgrade] = useState<"scans" | "credits" | "lm" | null>(null);
  const [suppressionEnCours, setSuppressionEnCours] = useState<string | null>(null);
  const [editionPoste, setEditionPoste] = useState<{ id: string; valeur: string } | null>(null);
  const [ongletAnalyse, setOngletAnalyse] = useState<"resultats" | "apres" | "lettre" | "offre" | "cv">("resultats");
  const [lmCreditsRestants, setLmCreditsRestants] = useState<number | null>(null);
  const [generationLmEnCours, setGenerationLmEnCours] = useState<string | null>(null);
  const [exportLmEnCours, setExportLmEnCours] = useState<"pdf" | "docx" | null>(null);
  const [rhCreditsRestants, setRhCreditsRestants] = useState<number | null>(null);

  // ── Trouver un RH
  type ContactRH = { prenom: string; nom: string; poste: string; linkedin?: string; email?: string };
  const [inputEntrepriseRH, setInputEntrepriseRH] = useState("");
  const [inputDomaineRH, setInputDomaineRH] = useState("");

  const [resultatsRH, setResultatsRH] = useState<ContactRH[]>([]);
  const [domaineTrouveRH, setDomaineTrouveRH] = useState("");
  const [filtreRHActif, setFiltreRHActif] = useState(false);
  const [chargementRH, setChargementRH] = useState(false);
  const [erreurRH, setErreurRH] = useState("");
  const [emailCopie, setEmailCopie] = useState<string | null>(null);
  const [emailsReveles, setEmailsReveles] = useState<Record<number, { email: string; certitude: number }>>({});
  const [emailChargement, setEmailChargement] = useState<Record<number, boolean>>({});
  const [emailsEchec, setEmailsEchec] = useState<Record<number, boolean>>({});
  type ContactSauvegarde = { id: string; prenom: string; nom: string; poste: string; linkedin: string; email: string; domaine: string };
  const [contactsSauvegardes, setContactsSauvegardes] = useState<ContactSauvegarde[]>([]);
  const [sauvegardeIds, setSauvegardeIds] = useState<Record<string, string>>({});
  const [vueRH, setVueRH] = useState<"recherche" | "sauvegardes">("recherche");
  const [emailsSauvegardesChargement, setEmailsSauvegardesChargement] = useState<Record<string, boolean>>({});
  const [emailsSauvegardesEchec, setEmailsSauvegardesEchec] = useState<Record<string, boolean>>({});
  const [pageProspects, setPageProspects] = useState(0);
  const PROSPECTS_PAR_PAGE = 20;
  const [sousModRH, setSousModRH] = useState<"entreprise" | "personne">("entreprise");
  const [inputPrenomDirect, setInputPrenomDirect] = useState("");
  const [inputNomDirect, setInputNomDirect] = useState("");
  const [inputEntrepriseDirect, setInputEntrepriseDirect] = useState("");
  const [resultatDirect, setResultatDirect] = useState<{ email: string; certitude: number } | null>(null);
  const [chargementDirect, setChargementDirect] = useState(false);
  const [erreurDirect, setErreurDirect] = useState("");
  const [contactDirectSauvegardeId, setContactDirectSauvegardeId] = useState<string | null>(null);
  const [chargementSauvegardeDirect, setChargementSauvegardeDirect] = useState(false);
  type SuggestionEntreprise = { name: string; domain: string; logo: string };
  const [suggestionsRH, setSuggestionsRH] = useState<SuggestionEntreprise[]>([]);
  const [showSuggestionsRH, setShowSuggestionsRH] = useState(false);
  const [domainResoluRH, setDomainResoluRH] = useState("");
  const suggestionRefRH = useRef<HTMLDivElement>(null);

  // ── Trouver des offres
  const [rechercheMetier, setRechercheMetier] = useState("");
  const [termesAlternatifs, setTermesAlternatifs] = useState<string[]>([]);
  const [rechercheVille, setRechercheVille] = useState("");
  const [offresResultats, setOffresResultats] = useState<OffreFT[]>([]);
  const [offresSauvegardees, setOffresSauvegardees] = useState<OffreSauvegardee[]>([]);
  const [chargementOffres, setChargementOffres] = useState(false);
  const [erreurOffres, setErreurOffres] = useState("");
  const [ongletOffres, setOngletOffres] = useState<"recherche" | "sauvegardees">("recherche");
  const [offresSauvegardeesIds, setOffresSauvegardeesIds] = useState<Set<string>>(new Set());

  // ── Upload CV pour recherche d'offres
  const [modeRechercheOffres, setModeRechercheOffres] = useState<"manuelle" | "cv">("manuelle");
  const [cvPourOffres, setCvPourOffres] = useState("");
  const [nomFichierOffres, setNomFichierOffres] = useState("");
  const [extractionOffresEnCours, setExtractionOffresEnCours] = useState(false);
  const [suggestionEnCours, setSuggestionEnCours] = useState(false);
  const [dragActifOffres, setDragActifOffres] = useState(false);
  const [erreurUploadOffres, setErreurUploadOffres] = useState("");

  // ── Entretien
  const [cvEntretien, setCvEntretien] = useState("");
  const [offreEntretien, setOffreEntretien] = useState("");
  const [urlEntreprise, setUrlEntreprise] = useState("");
  const [nomFichierEntretien, setNomFichierEntretien] = useState("");
  const [extractionEntretienEnCours, setExtractionEntretienEnCours] = useState(false);
  const [dragActifEntretien, setDragActifEntretien] = useState(false);
  const [generationEntretienEnCours, setGenerationEntretienEnCours] = useState(false);
  const [resultatEntretien, setResultatEntretien] = useState<ResultatEntretien | null>(null);
  const [erreurEntretien, setErreurEntretien] = useState("");
  const [entretiens, setEntretiens] = useState<EntretienSauvegarde[]>([]);

  // ── Auth redirect
  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  // ── Identification PostHog
  useEffect(() => {
    if (session?.user) {
      posthog?.identify(session.user.id, { email: session.user.email });
    }
  }, [session, posthog]);

  // ── Réinitialiser l'onglet du drawer à chaque ouverture
  useEffect(() => {
    if (analyseOuverte) setOngletAnalyse("resultats");
  }, [analyseOuverte]);

  // ── Autocomplete Clearbit pour le champ entreprise RH
  useEffect(() => {
    if (inputEntrepriseRH.length < 2) { setSuggestionsRH([]); setShowSuggestionsRH(false); return; }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(inputEntrepriseRH)}`);
        const data = await res.json();
        setSuggestionsRH(data.slice(0, 6));
        setShowSuggestionsRH(true);
      } catch { /* silencieux */ }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputEntrepriseRH]);

  // ── Fermer le dropdown suggestions au clic extérieur
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionRefRH.current && !suggestionRefRH.current.contains(e.target as Node)) {
        setShowSuggestionsRH(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Chargement historique
  const chargerHistorique = () => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setAnalyses(data.analyses ?? []);
        setCvsAdaptes(data.cvsAdaptes ?? []);
        setEntretiens(data.entretiens ?? []);
        const pt = data.planType as "starter" | "pro" | null ?? null;
        setPlanType(pt);
        setRhCreditsRestants(data.rhCredits ?? 0);
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
    fetch("/api/contacts-sauvegardes")
      .then(r => r.json())
      .then(data => {
        const contacts: ContactSauvegarde[] = data.contacts ?? [];
        setContactsSauvegardes(contacts);
        const ids: Record<string, string> = {};
        contacts.forEach(c => { ids[`${c.prenom}|${c.nom}|${c.domaine}`] = c.id; });
        setSauvegardeIds(ids);
      });
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
      posthog?.capture("analyse_completee", { score: data.score, nb_mots_manquants: data.motsClesManquants?.length ?? 0 });
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
    setEtapeAdaptation("generation");
    try {
      const reponse = await fetch("/api/adapter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, offre, motsClesManquants: resultat.motsClesManquants, reponses: [] }),
      });
      const data = await reponse.json();
      if (reponse.status === 403) { setModaleUpgrade("credits"); setEtapeAdaptation("idle"); return; }
      if (!reponse.ok) throw new Error(data.error);
      setCreditsRestants(data.creditsRestants);
      posthog?.capture("cv_adapte", { credits_restants: data.creditsRestants });
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
      setEtapeAdaptation("idle");
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
        scoreApres: dataScore.score,
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
        score: data.score,
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
    await fetch("/api/sauvegarder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        analyseId
          ? { analyseId, nomOffre, cvAdapte: cvData, questionsReponses: [] }
          : { nomOffre, score: resultat?.score, resume: resultat?.resume ?? "", motsClesManquants: resultat?.motsClesManquants ?? [], motsClesPresents: resultat?.motsClesPresents ?? [], cvAdapte: cvData, questionsReponses: [] }
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
      posthog?.capture("cv_exporte", { format });
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

  async function traiterFichierEntretien(fichier: File) {
    const ext = fichier.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx") {
      setErreurEntretien("Format non supporté. Utilisez un fichier PDF ou Word (.docx).");
      return;
    }
    setErreurEntretien("");
    setExtractionEntretienEnCours(true);
    const formData = new FormData();
    formData.append("fichier", fichier);
    try {
      const reponse = await fetch("/api/extraire-cv", { method: "POST", body: formData });
      const data = await reponse.json();
      if (!reponse.ok) throw new Error(data.error);
      setCvEntretien(data.texte);
      setNomFichierEntretien(fichier.name);
    } catch (e) {
      setErreurEntretien(e instanceof Error ? e.message : "Impossible d'extraire le texte du fichier.");
    } finally {
      setExtractionEntretienEnCours(false);
    }
  }

  async function preparerEntretien() {
    if (!cvEntretien.trim() || !offreEntretien.trim()) {
      setErreurEntretien("Veuillez uploader votre CV et coller l'offre d'emploi.");
      return;
    }
    setErreurEntretien("");
    setGenerationEntretienEnCours(true);
    setResultatEntretien(null);
    try {
      const res = await fetch("/api/preparer-entretien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv: cvEntretien, offre: offreEntretien, urlEntreprise }),
      });
      const data = await res.json();
      if (!res.ok) { setErreurEntretien(data.error ?? "Une erreur est survenue."); return; }
      setResultatEntretien(data);
      chargerHistorique();
    } catch {
      setErreurEntretien("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setGenerationEntretienEnCours(false);
    }
  }

  function ouvrirEntretien(e: EntretienSauvegarde) {
    setResultatEntretien({
      entretienId: e.id,
      nomPoste: e.nom_offre,
      pitchComplet: e.pitch,
      questionsProbables: e.questions_probables,
      questionsAPoseur: e.questions_a_poser,
    });
  }

  function resetEntretien() {
    setResultatEntretien(null);
    setCvEntretien("");
    setOffreEntretien("");
    setUrlEntreprise("");
    setNomFichierEntretien("");
    setErreurEntretien("");
  }

  // ── Offres d'emploi
  async function rechercherOffres() {
    if (!rechercheMetier.trim()) {
      setErreurOffres("Veuillez indiquer un métier visé.");
      return;
    }
    setErreurOffres("");
    setChargementOffres(true);
    setOffresResultats([]);
    try {
      const reponse = await fetch("/api/offres/rechercher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motsCles: rechercheMetier, localisation: rechercheVille, termesAlternatifs }),
      });
      const data = await reponse.json();
      if (!reponse.ok) throw new Error(data.error);
      setOffresResultats(data.offres ?? []);
      setOngletOffres("recherche");
    } catch (e) {
      setErreurOffres(e instanceof Error ? e.message : "Erreur lors de la recherche.");
    } finally {
      setChargementOffres(false);
    }
  }

  async function chargerOffresSauvegardees() {
    try {
      const reponse = await fetch("/api/offres/sauvegardees");
      const data = await reponse.json();
      const offres: OffreSauvegardee[] = data.offres ?? [];
      setOffresSauvegardees(offres);
      setOffresSauvegardeesIds(new Set(offres.map((o) => o.id)));
    } catch {}
  }

  async function sauvegarderOffre(offre: OffreFT) {
    await fetch("/api/offres/sauvegarder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offre),
    });
    setOffresSauvegardeesIds((prev) => new Set([...prev, offre.id]));
  }

  async function supprimerOffreSauvegardee(dbId: string, offreId: string) {
    await fetch("/api/offres/sauvegarder", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dbId }),
    });
    setOffresSauvegardees((prev) => prev.filter((o) => o.dbId !== dbId));
    setOffresSauvegardeesIds((prev) => {
      const next = new Set(prev);
      next.delete(offreId);
      return next;
    });
  }

  async function sauvegarderContact(contact: { prenom: string; nom: string; poste: string; linkedin?: string }, emailRevele?: { email: string; certitude: number }) {
    const key = `${contact.prenom}|${contact.nom}|${domaineTrouveRH}`;
    const res = await fetch("/api/contacts-sauvegardes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom: contact.prenom, nom: contact.nom, poste: contact.poste, linkedin: contact.linkedin ?? "", email: emailRevele?.email ?? "", domaine: domaineTrouveRH }),
    });
    const data = await res.json();
    if (data.id) {
      setSauvegardeIds(prev => ({ ...prev, [key]: data.id }));
      const newContact = { id: data.id, prenom: contact.prenom, nom: contact.nom, poste: contact.poste, linkedin: contact.linkedin ?? "", email: emailRevele?.email ?? "", domaine: domaineTrouveRH };
      setContactsSauvegardes(prev => [newContact, ...prev]);
    }
  }

  async function supprimerContactSauvegarde(key: string, id: string) {
    await fetch("/api/contacts-sauvegardes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSauvegardeIds(prev => { const next = { ...prev }; delete next[key]; return next; });
    setContactsSauvegardes(prev => prev.filter(c => c.id !== id));
  }

  async function suggererMetier(cvTexte: string) {
    setSuggestionEnCours(true);
    try {
      const reponse = await fetch("/api/offres/suggerer-metier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv: cvTexte }),
      });
      const data = await reponse.json();
      if (reponse.ok && data.metierSuggere) {
        setRechercheMetier(data.metierSuggere);
        setTermesAlternatifs(data.termesAlternatifs ?? []);
      }
    } catch {}
    finally {
      setSuggestionEnCours(false);
    }
  }

  async function traiterFichierOffres(fichier: File) {
    const ext = fichier.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx") {
      setErreurUploadOffres("Format non supporté. Utilisez un fichier PDF ou Word (.docx).");
      return;
    }
    setErreurUploadOffres("");
    setExtractionOffresEnCours(true);
    const formData = new FormData();
    formData.append("fichier", fichier);
    try {
      const reponse = await fetch("/api/extraire-cv", { method: "POST", body: formData });
      const data = await reponse.json();
      if (!reponse.ok) throw new Error(data.error);
      setCvPourOffres(data.texte);
      setNomFichierOffres(fichier.name);
      await suggererMetier(data.texte);
    } catch (e) {
      setErreurUploadOffres(e instanceof Error ? e.message : "Impossible d'extraire le texte du fichier.");
    } finally {
      setExtractionOffresEnCours(false);
    }
  }

  function utiliserOffrePourAnalyse(offre: OffreFT) {
    setOffre(offre.offreTexteComplet || offre.descriptionCourte);
    setCv("");
    setNomFichier("");
    setModeCV("upload");
    setResultat(null);
    setCvAdapte(null);
    setErreur("");
    setAnalyseId(null);
    setVue("nouvelle-analyse");
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
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <span className="text-indigo-300">Candidature spontanée</span>
                  <span className={`font-bold ${(rhCreditsRestants ?? 0) === 0 ? "text-rose-400" : "text-white"}`}>{(rhCreditsRestants ?? 0) > 0 ? `${rhCreditsRestants} email${(rhCreditsRestants ?? 0) > 1 ? "s" : ""}` : "0 email"}</span>
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

          <button
            onClick={() => { setVue("preparer-entretien"); resetEntretien(); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm w-full text-left transition-colors ${vue === "preparer-entretien" ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-800/60 hover:text-white"}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Préparer mon entretien
          </button>

          <button
            onClick={() => { setVue("trouver-offres"); setOngletOffres("recherche"); chargerOffresSauvegardees(); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm w-full text-left transition-colors ${vue === "trouver-offres" ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-800/60 hover:text-white"}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Trouver des offres
          </button>

          <button
            onClick={() => { setVue("trouver-rh"); setResultatsRH([]); setErreurRH(""); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm w-full text-left transition-colors ${vue === "trouver-rh" ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-800/60 hover:text-white"}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Candidature spontanée
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

                      {/* Colonne 2 : Score ATS avant/après */}
                      <div className="flex items-center">
                        {analyse.score_apres != null ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold">
                            <span className={`px-2.5 py-1.5 rounded-full ${couleurScore(analyse.score)}`}>{analyse.score ?? "—"}</span>
                            <span className="text-gray-300 mx-0.5">→</span>
                            <span className={`px-2.5 py-1.5 rounded-full font-bold ${couleurScore(analyse.score_apres)}`}>{analyse.score_apres}</span>
                          </span>
                        ) : (
                          <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full ${couleurScore(analyse.score)}`}>
                            {analyse.score != null ? `${analyse.score} / 100` : "—"}
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

                  {/* Score ATS */}
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Score ATS</p>
                    <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(resultat.score)}`}>
                      <span className="text-3xl font-black">{resultat.score}</span>
                      <span className="text-xs font-semibold text-gray-400">/ 100</span>
                    </div>
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
                      ) : (
                        <>
                          <button onClick={adapterCV} disabled={adaptationEnCours} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            Adapter mon CV pour les ATS →
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

        {/* ── Vue : Préparer mon entretien ─────────────────────────────────── */}
        {vue === "preparer-entretien" && (
          <div className="max-w-3xl mx-auto px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Préparer mon entretien</h1>
              <p className="text-gray-400 text-sm mt-1">Générez une roadmap personnalisée pour décrocher le poste.</p>
            </div>

            {planType !== "pro" ? (
              /* CTA upgrade Pro */
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-10 flex flex-col items-center text-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Fonctionnalité réservée au plan Pro</p>
                  <p className="text-gray-500 text-sm mt-2 max-w-sm">
                    La préparation d&apos;entretien est incluse dans le plan Pro. Pitch, questions probables, questions à poser et message de relance générés par l&apos;IA.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 transition-all"
                >
                  Voir les abonnements →
                </Link>
              </div>
            ) : resultatEntretien ? (
              /* Résultat */
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Préparation pour <span className="font-semibold text-gray-800">{resultatEntretien.nomPoste}</span></p>
                  <button
                    onClick={resetEntretien}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                  >
                    ← Nouvelle préparation
                  </button>
                </div>

                {/* Pitch */}
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">1</span>
                    <p className="font-bold text-gray-900">Pitch d&apos;introduction</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <button onClick={() => navigator.clipboard.writeText(resultatEntretien.pitchComplet)} className="text-xs text-gray-400 hover:text-indigo-600 font-medium transition-colors">Copier</button>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{resultatEntretien.pitchComplet}</p>
                  </div>
                </div>

                {/* Questions probables */}
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">2</span>
                    <p className="font-bold text-gray-900">Questions probables</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {resultatEntretien.questionsProbables.map((q, i) => (
                      <div key={i} className="border-l-2 border-indigo-200 pl-4">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{q.question}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{q.conseil}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions à poser */}
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">3</span>
                    <p className="font-bold text-gray-900">Questions à poser au recruteur</p>
                  </div>
                  <ol className="flex flex-col gap-2 list-decimal list-inside">
                    {resultatEntretien.questionsAPoseur.map((q, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-relaxed">{q}</li>
                    ))}
                  </ol>
                </div>

                {/* Autres préparations */}
                {entretiens.length > 1 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Autres préparations</p>
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm overflow-hidden">
                      {entretiens.filter((e) => e.id !== resultatEntretien.entretienId).map((e, i, arr) => (
                        <button
                          key={e.id}
                          onClick={() => ouvrirEntretien(e)}
                          className={`w-full flex items-center justify-between px-5 py-3.5 text-sm hover:bg-indigo-50 transition-colors text-left ${i !== arr.length - 1 ? "border-b border-gray-100" : ""}`}
                        >
                          <span className="font-medium text-gray-800 truncate">{e.nom_offre}</span>
                          <span className="text-gray-400 text-xs shrink-0 ml-4">{formaterDate(e.created_at)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* Formulaire */
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* CV — upload */}
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-indigo-200 transition-all duration-200 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Votre CV</span>
                    </div>
                    <div className="p-5">
                      <label
                        className={`flex flex-col items-center justify-center min-h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${dragActifEntretien ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/40"}`}
                        onDragOver={(e) => { e.preventDefault(); setDragActifEntretien(true); }}
                        onDragLeave={() => setDragActifEntretien(false)}
                        onDrop={(e) => { e.preventDefault(); setDragActifEntretien(false); const f = e.dataTransfer.files[0]; if (f) traiterFichierEntretien(f); }}
                      >
                        <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) traiterFichierEntretien(f); }} />
                        {extractionEntretienEnCours ? (
                          <div className="flex flex-col items-center gap-2 text-indigo-500">
                            <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                            <span className="text-sm font-medium">Extraction en cours...</span>
                          </div>
                        ) : nomFichierEntretien ? (
                          <div className="flex flex-col items-center gap-2 text-emerald-600">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-sm font-semibold">{nomFichierEntretien}</span>
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
                    </div>
                  </div>

                  {/* Offre */}
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-violet-200 transition-all duration-200 overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                      <div className="w-2 h-2 rounded-full bg-violet-400" />
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Offre d&apos;emploi</span>
                    </div>
                    <textarea
                      value={offreEntretien}
                      onChange={(e) => setOffreEntretien(e.target.value)}
                      placeholder="Collez ici le texte de l'offre d'emploi..."
                      className="w-full min-h-48 p-5 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none bg-transparent leading-relaxed"
                    />
                  </div>
                </div>

                {/* Champ optionnel — URL entreprise */}
                <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Optionnel — enrichit la préparation</p>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Site web de l&apos;entreprise</label>
                  <input
                    type="url"
                    value={urlEntreprise}
                    onChange={(e) => setUrlEntreprise(e.target.value)}
                    placeholder="https://www.entreprise.fr"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <p className="text-xs text-gray-400 mt-1">JobBoost lit automatiquement le contenu de cette page pour personnaliser la préparation.</p>
                </div>

                {erreurEntretien && (
                  <p className="text-rose-500 text-sm font-medium">{erreurEntretien}</p>
                )}

                <button
                  onClick={preparerEntretien}
                  disabled={generationEntretienEnCours}
                  className="self-start flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {generationEntretienEnCours ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Génération en cours...
                    </>
                  ) : (
                    "Préparer mon entretien →"
                  )}
                </button>

                {entretiens.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Préparations précédentes</p>
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm overflow-hidden">
                      {entretiens.map((e, i) => (
                        <button
                          key={e.id}
                          onClick={() => ouvrirEntretien(e)}
                          className={`w-full flex items-center justify-between px-5 py-3.5 text-sm hover:bg-indigo-50 transition-colors text-left ${i !== entretiens.length - 1 ? "border-b border-gray-100" : ""}`}
                        >
                          <span className="font-medium text-gray-800 truncate">{e.nom_offre}</span>
                          <span className="text-gray-400 text-xs shrink-0 ml-4">{formaterDate(e.created_at)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) }
          </div>
        )}

        {/* ── Vue : Trouver des offres ──────────────────────────────────────── */}
        {vue === "trouver-offres" && (
          <div className="max-w-4xl mx-auto px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Trouver des offres</h1>
              <p className="text-gray-400 text-sm mt-1">Recherchez des offres cadres et analysez votre CV en un clic.</p>
            </div>

            {!estAbonne ? (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-10 flex flex-col items-center text-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Fonctionnalité réservée aux abonnés</p>
                  <p className="text-gray-500 text-sm mt-2 max-w-sm">
                    Cherchez des offres cadres directement depuis JobBoost et lancez une analyse CV en un clic.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 transition-all"
                >
                  Voir les abonnements →
                </Link>
              </div>
            ) : (
              <>
                {/* Toggle mode de recherche */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => { setModeRechercheOffres("manuelle"); setCvPourOffres(""); setNomFichierOffres(""); setErreurUploadOffres(""); setOffresResultats([]); setRechercheMetier(""); setTermesAlternatifs([]); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${modeRechercheOffres === "manuelle" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Recherche manuelle
                  </button>
                  <button
                    onClick={() => { setModeRechercheOffres("cv"); setRechercheMetier(""); setTermesAlternatifs([]); setOffresResultats([]); setErreurOffres(""); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${modeRechercheOffres === "cv" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Rechercher par mon CV
                  </button>
                </div>

                {/* Mode manuelle */}
                {modeRechercheOffres === "manuelle" && (
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Métier visé (ex : chef de projet, contrôleur de gestion...)"
                        value={rechercheMetier}
                        onChange={(e) => setRechercheMetier(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") rechercherOffres(); }}
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <select
                        value={rechercheVille}
                        onChange={(e) => setRechercheVille(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                      >
                        <option value="">Tous les départements</option>
                        {DEPARTEMENTS.map(([code, nom]) => (
                          <option key={code} value={code}>{code} — {nom}</option>
                        ))}
                      </select>
                      <button
                        onClick={rechercherOffres}
                        disabled={chargementOffres}
                        className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-200/50 disabled:opacity-60 whitespace-nowrap flex items-center gap-2"
                      >
                        {chargementOffres ? (
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        )}
                        Rechercher
                      </button>
                    </div>
                    {erreurOffres && <p className="text-rose-500 text-sm mt-3">{erreurOffres}</p>}
                  </div>
                )}

                {/* Mode CV */}
                {modeRechercheOffres === "cv" && (
                  <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 mb-6 flex flex-col gap-4">
                    {/* Zone upload */}
                    {cvPourOffres ? (
                      <div className="flex items-center justify-between gap-3 bg-emerald-50 ring-1 ring-emerald-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-sm text-emerald-700 font-medium truncate">{nomFichierOffres}</span>
                          {suggestionEnCours && <span className="text-xs text-emerald-600 shrink-0 animate-pulse">Analyse du profil...</span>}
                          {!suggestionEnCours && rechercheMetier && (
                            <span className="text-xs text-emerald-600 shrink-0">· Poste détecté : <span className="font-semibold">{rechercheMetier}</span></span>
                          )}
                        </div>
                        <button
                          onClick={() => { setCvPourOffres(""); setNomFichierOffres(""); setErreurUploadOffres(""); setRechercheMetier(""); setTermesAlternatifs([]); }}
                          className="text-emerald-400 hover:text-emerald-700 transition-colors shrink-0"
                          title="Retirer le CV"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ) : (
                      <label
                        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer transition-colors ${dragActifOffres ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"}`}
                        onDragOver={(e) => { e.preventDefault(); setDragActifOffres(true); }}
                        onDragLeave={() => setDragActifOffres(false)}
                        onDrop={(e) => { e.preventDefault(); setDragActifOffres(false); const f = e.dataTransfer.files[0]; if (f) traiterFichierOffres(f); }}
                      >
                        <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) traiterFichierOffres(f); }} />
                        {extractionOffresEnCours ? (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="animate-spin w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                            Lecture du CV...
                          </div>
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="text-sm text-gray-600 font-medium">Glissez votre CV ici ou <span className="text-indigo-600">parcourir</span></p>
                            <p className="text-xs text-gray-400">PDF ou Word — JobBoost détecte votre métier automatiquement</p>
                          </>
                        )}
                      </label>
                    )}
                    {erreurUploadOffres && <p className="text-rose-500 text-xs">{erreurUploadOffres}</p>}

                    {/* Département + bouton chercher */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={rechercheVille}
                        onChange={(e) => setRechercheVille(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                      >
                        <option value="">Tous les départements</option>
                        {DEPARTEMENTS.map(([code, nom]) => (
                          <option key={code} value={code}>{code} — {nom}</option>
                        ))}
                      </select>
                      <button
                        onClick={rechercherOffres}
                        disabled={chargementOffres || !cvPourOffres || suggestionEnCours}
                        className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-200/50 disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                      >
                        {chargementOffres ? (
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        )}
                        {suggestionEnCours ? "Analyse en cours..." : "Chercher des offres"}
                      </button>
                    </div>
                    {erreurOffres && <p className="text-rose-500 text-sm">{erreurOffres}</p>}
                  </div>
                )}

                {/* Onglets */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setOngletOffres("recherche")}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${ongletOffres === "recherche" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      Résultats {offresResultats.length > 0 ? `(${offresResultats.length})` : ""}
                    </button>
                    <button
                      onClick={() => { setOngletOffres("sauvegardees"); chargerOffresSauvegardees(); }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${ongletOffres === "sauvegardees" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      Mes offres sauvegardées {offresSauvegardees.length > 0 ? `(${offresSauvegardees.length})` : ""}
                    </button>
                  </div>
                  {offresResultats.length > 0 && ongletOffres === "recherche" && (
                    <button
                      onClick={() => { setOffresResultats([]); setRechercheMetier(""); setTermesAlternatifs([]); setCvPourOffres(""); setNomFichierOffres(""); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Nouvelle recherche
                    </button>
                  )}
                </div>

                {/* Onglet Résultats */}
                {ongletOffres === "recherche" && (
                  <>
                    {offresResultats.length === 0 && !chargementOffres && (
                      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl">🔍</div>
                        <p className="text-gray-500 text-sm">Lancez une recherche pour découvrir des offres.</p>
                      </div>
                    )}
                    {offresResultats.length > 0 && (
                      <div className="flex flex-col gap-4">
                        {offresResultats.map((offre) => {
                          const dejaSauvegardee = offresSauvegardeesIds.has(offre.id);
                          return (
                            <div key={offre.id} className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-base font-bold text-gray-900 leading-tight">{offre.titre}</p>
                                  <p className="text-sm text-gray-500 mt-0.5">{offre.entreprise}</p>
                                </div>
                                <a
                                  href={offre.urlOffre}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-indigo-500 hover:text-indigo-700 font-medium shrink-0"
                                >
                                  Voir l&apos;offre →
                                </a>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                {offre.localisation && (
                                  <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {offre.localisation}
                                  </span>
                                )}
                                {offre.datePublication && (
                                  <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {formaterDate(offre.datePublication)}
                                  </span>
                                )}
                              </div>
                              {offre.descriptionCourte && (
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{offre.descriptionCourte}</p>
                              )}
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => utiliserOffrePourAnalyse(offre)}
                                  className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white text-sm font-bold py-2 px-4 rounded-xl transition-all shadow-sm"
                                >
                                  Analyser mon CV pour ce poste
                                </button>
                                <button
                                  onClick={() => { if (!dejaSauvegardee) sauvegarderOffre(offre); }}
                                  disabled={dejaSauvegardee}
                                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${dejaSauvegardee ? "border-emerald-200 text-emerald-500 bg-emerald-50 cursor-default" : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"}`}
                                >
                                  {dejaSauvegardee ? "✓ Sauvegardée" : "Sauvegarder"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* Onglet Offres sauvegardées */}
                {ongletOffres === "sauvegardees" && (
                  <>
                    {offresSauvegardees.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl">🔖</div>
                        <p className="text-gray-500 text-sm">Aucune offre sauvegardée pour l&apos;instant.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {offresSauvegardees.map((offre) => (
                          <div key={offre.dbId} className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-bold text-gray-900 leading-tight">{offre.titre}</p>
                                <p className="text-sm text-gray-500 mt-0.5">{offre.entreprise}</p>
                              </div>
                              {offre.urlOffre && (
                                <a
                                  href={offre.urlOffre}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-indigo-500 hover:text-indigo-700 font-medium shrink-0"
                                >
                                  Voir l&apos;offre →
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              {offre.localisation && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                  {offre.localisation}
                                </span>
                              )}
                              {offre.savedAt && (
                                <span>Sauvegardée le {formaterDate(offre.savedAt)}</span>
                              )}
                            </div>
                            {offre.descriptionCourte && (
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{offre.descriptionCourte}</p>
                            )}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => utiliserOffrePourAnalyse(offre)}
                                className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white text-sm font-bold py-2 px-4 rounded-xl transition-all shadow-sm"
                              >
                                Analyser mon CV pour ce poste
                              </button>
                              <button
                                onClick={() => supprimerOffreSauvegardee(offre.dbId, offre.id)}
                                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-400 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Vue : Trouver un RH ──────────────────────────────────────────── */}
        {vue === "trouver-rh" && (
          <div className="max-w-3xl mx-auto px-8 py-10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Candidature spontanée</h1>
                {rhCreditsRestants !== null && (
                  <p className={`text-sm mt-1 font-medium ${rhCreditsRestants === 0 ? "text-rose-500" : "text-indigo-600"}`}>
                    {rhCreditsRestants === 0
                      ? "Plus de crédits ce mois-ci"
                      : `${rhCreditsRestants} crédit${rhCreditsRestants > 1 ? "s" : ""} restant${rhCreditsRestants > 1 ? "s" : ""}`}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setVueRH("recherche")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${vueRH === "recherche" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >Recherche</button>
                <button
                  onClick={() => setVueRH("sauvegardes")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${vueRH === "sauvegardes" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Sauvegardés
                  {contactsSauvegardes.length > 0 && (
                    <span className="text-xs font-bold bg-indigo-100 text-indigo-600 rounded-full px-1.5 py-0.5">{contactsSauvegardes.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Vue contacts sauvegardés */}
            {vueRH === "sauvegardes" && (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm overflow-hidden">
                {contactsSauvegardes.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-400 text-sm">
                    <svg className="w-8 h-8 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z"/></svg>
                    Aucun contact sauvegardé pour l&apos;instant.
                  </div>
                ) : contactsSauvegardes.map((contact, idx) => {
                  const key = `${contact.prenom}|${contact.nom}|${contact.domaine}`;
                  return (
                    <div key={contact.id} className={`px-5 py-4 flex items-center gap-4 ${idx !== contactsSauvegardes.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                        {contact.prenom?.[0]?.toUpperCase() ?? "?"}{contact.nom?.[0]?.toUpperCase() ?? ""}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{contact.prenom} {contact.nom}</p>
                        {contact.poste && <p className="text-xs text-gray-500 mt-0.5">{contact.poste}</p>}
                        {contact.domaine && <p className="text-xs text-gray-400 mt-0.5">{contact.domaine}</p>}
                        {contact.email && (
                          <p className="text-xs text-indigo-600 font-medium mt-1 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {contact.email}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {contact.linkedin && (
                          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold bg-[#0A66C2] hover:bg-[#004182] text-white px-3 py-1.5 rounded-lg transition-colors">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            LinkedIn
                          </a>
                        )}
                        {contact.email ? (
                          <button
                            onClick={() => { navigator.clipboard.writeText(contact.email); setEmailCopie(contact.email); setTimeout(() => setEmailCopie(null), 2000); }}
                            className="flex items-center gap-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {emailCopie === contact.email ? (
                              <><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Copié</>
                            ) : (
                              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copier</>
                            )}
                          </button>
                        ) : emailsSauvegardesEchec[contact.id] ? (
                          <span className="text-xs font-medium px-2 py-1.5 rounded-lg bg-gray-100 text-gray-400">Non disponible</span>
                        ) : (
                          <button
                            disabled={emailsSauvegardesChargement[contact.id] || (rhCreditsRestants ?? 0) === 0}
                            onClick={async () => {
                              setEmailsSauvegardesChargement(prev => ({ ...prev, [contact.id]: true }));
                              try {
                                const res = await fetch("/api/trouver-rh", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ mode: "email", prenom: contact.prenom, nom: contact.nom, domaine: contact.domaine }),
                                });
                                const data = await res.json();
                                if (!res.ok || !data.email) { setEmailsSauvegardesEchec(prev => ({ ...prev, [contact.id]: true })); return; }
                                setContactsSauvegardes(prev => prev.map(c => c.id === contact.id ? { ...c, email: data.email } : c));
                                if (data.rhCreditsRestants !== undefined && data.rhCreditsRestants !== null) setRhCreditsRestants(data.rhCreditsRestants);
                                await fetch("/api/contacts-sauvegardes", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: contact.id, email: data.email }) });
                              } catch { setEmailsSauvegardesEchec(prev => ({ ...prev, [contact.id]: true })); }
                              finally { setEmailsSauvegardesChargement(prev => ({ ...prev, [contact.id]: false })); }
                            }}
                            className="flex items-center gap-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {emailsSauvegardesChargement[contact.id] ? (
                              <><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Jusqu&apos;à 2 min...</>
                            ) : (
                              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Révéler l&apos;email</>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => supprimerContactSauvegarde(key, contact.id)}
                          title="Retirer des contacts sauvegardés"
                          className="p-1.5 rounded-lg text-indigo-500 bg-indigo-50 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z"/></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Contenu principal : recherche */}
            {vueRH === "recherche" && (<div>

            {/* Onglets Par entreprise / Par personne */}
            <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setSousModRH("entreprise")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${sousModRH === "entreprise" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Par entreprise
              </button>
              <button
                onClick={() => { setSousModRH("personne"); setResultatDirect(null); setErreurDirect(""); }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${sousModRH === "personne" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Par personne
              </button>
            </div>

            {/* Compteur crédits */}
            {rhCreditsRestants !== null && (
              <div className={`mb-5 flex items-center gap-3 px-5 py-3.5 rounded-2xl ${(rhCreditsRestants ?? 0) === 0 ? "bg-rose-50 ring-1 ring-rose-200" : "bg-gradient-to-r from-indigo-50 to-violet-50 ring-1 ring-indigo-100"}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${(rhCreditsRestants ?? 0) === 0 ? "bg-rose-100" : "bg-indigo-100"}`}>
                  <svg className={`w-4.5 h-4.5 ${(rhCreditsRestants ?? 0) === 0 ? "text-rose-500" : "text-indigo-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${(rhCreditsRestants ?? 0) === 0 ? "text-rose-400" : "text-indigo-400"}`}>Crédits email</p>
                  <p className={`text-base font-bold ${(rhCreditsRestants ?? 0) === 0 ? "text-rose-600" : "text-indigo-700"}`}>
                    {(rhCreditsRestants ?? 0) === 0
                      ? "Plus de crédits ce mois-ci"
                      : `${rhCreditsRestants} révélation${(rhCreditsRestants ?? 0) > 1 ? "s" : ""} restante${(rhCreditsRestants ?? 0) > 1 ? "s" : ""} ce mois`}
                  </p>
                </div>
                {(rhCreditsRestants ?? 0) === 0 && !estAbonne && (
                  <Link href="/pricing" className="shrink-0 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl transition-colors">Upgrader →</Link>
                )}
              </div>
            )}

            {/* Formulaire mode "Par entreprise" */}
            {sousModRH === "entreprise" && (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-4">Trouvez les contacts d&apos;une entreprise</p>
                <div className="flex flex-col gap-3">
                  <div ref={suggestionRefRH} className="relative">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Nom de l&apos;entreprise</label>
                    <input
                      type="text"
                      value={inputEntrepriseRH}
                      onChange={e => { setInputEntrepriseRH(e.target.value); setInputDomaineRH(""); setDomainResoluRH(""); }}
                      onFocus={() => { if (suggestionsRH.length > 0) setShowSuggestionsRH(true); }}
                      placeholder="Ex : L'Oréal, BNP Paribas, Capgemini..."
                      className="w-full px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    />
                    {showSuggestionsRH && suggestionsRH.length > 0 && (
                      <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl ring-1 ring-gray-200 overflow-hidden">
                        {suggestionsRH.map((s) => (
                          <button
                            key={s.domain}
                            type="button"
                            onMouseDown={e => { e.preventDefault(); setInputEntrepriseRH(s.name); setDomainResoluRH(s.domain); setInputDomaineRH(s.domain); setShowSuggestionsRH(false); }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-indigo-50 transition-colors text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                              <span className="text-xs text-gray-400 ml-2">{s.domain}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span>ou domaine direct</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Domaine (si connu)</label>
                    <input
                      type="text"
                      value={inputDomaineRH}
                      onChange={e => { setInputDomaineRH(e.target.value); setInputEntrepriseRH(""); setDomainResoluRH(""); }}
                      placeholder="Ex : loreal.com, bnpparibas.com..."
                      className="w-full px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    />
                  </div>
                  <button
                    onClick={async () => {
                      if (!inputEntrepriseRH && !inputDomaineRH) return;
                      setChargementRH(true); setErreurRH(""); setResultatsRH([]); setDomaineTrouveRH(""); setEmailsReveles({}); setEmailChargement({}); setEmailsEchec({}); setPageProspects(0);
                      try {
                        const res = await fetch("/api/trouver-rh", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ mode: "domaine", entreprise: domainResoluRH ? undefined : (inputEntrepriseRH || undefined), domaine: domainResoluRH || inputDomaineRH || undefined }),
                        });
                        const data = await res.json();
                        if (!res.ok) { setErreurRH(data.error ?? "Erreur lors de la recherche."); return; }
                        const contacts: ContactRH[] = data.contacts ?? [];
                        setResultatsRH(contacts);
                        setDomaineTrouveRH(data.domaineTrouve ?? "");
                        if (data.rhCreditsRestants !== undefined && data.rhCreditsRestants !== null) setRhCreditsRestants(data.rhCreditsRestants);
                        // Pré-populer les emails déjà connus (domain emails sans profil)
                        const preReveles: Record<number, { email: string; certitude: number }> = {};
                        contacts.forEach((c, idx) => { if (c.email) preReveles[idx] = { email: c.email, certitude: 0 }; });
                        if (Object.keys(preReveles).length > 0) setEmailsReveles(preReveles);
                      } catch { setErreurRH("Erreur réseau. Veuillez réessayer."); }
                      finally { setChargementRH(false); }
                    }}
                    disabled={chargementRH || (!inputEntrepriseRH && !inputDomaineRH)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {chargementRH ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Recherche en cours...
                      </>
                    ) : "Rechercher"}
                  </button>
                </div>
              </div>
            )}


            {/* Formulaire mode "Par personne" */}
            {sousModRH === "personne" && (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-4">Trouver l&apos;adresse email d&apos;une personne</p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Prénom</label>
                      <input
                        type="text"
                        value={inputPrenomDirect}
                        onChange={e => setInputPrenomDirect(e.target.value)}
                        placeholder="Ex : Marie"
                        className="w-full px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Nom</label>
                      <input
                        type="text"
                        value={inputNomDirect}
                        onChange={e => setInputNomDirect(e.target.value)}
                        placeholder="Ex : Dupont"
                        className="w-full px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">URL du site de l&apos;entreprise</label>
                    <input
                      type="text"
                      value={inputEntrepriseDirect}
                      onChange={e => setInputEntrepriseDirect(e.target.value)}
                      placeholder="Ex : https://www.jobboost.fr"
                      className="w-full px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    />
                  </div>
                  <button
                    onClick={async () => {
                      if (!inputPrenomDirect || !inputNomDirect || !inputEntrepriseDirect) return;
                      setChargementDirect(true); setErreurDirect(""); setResultatDirect(null); setContactDirectSauvegardeId(null);
                      try {
                        const res = await fetch("/api/trouver-rh", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ mode: "personne", prenom: inputPrenomDirect, nom: inputNomDirect, entreprise: inputEntrepriseDirect }),
                        });
                        const data = await res.json();
                        if (!res.ok) { setErreurDirect(data.error ?? "Aucun email trouvé."); return; }
                        setResultatDirect({ email: data.email, certitude: data.certitude ?? 0 });
                        if (data.rhCreditsRestants !== undefined && data.rhCreditsRestants !== null) setRhCreditsRestants(data.rhCreditsRestants);
                      } catch { setErreurDirect("Erreur réseau. Veuillez réessayer."); }
                      finally { setChargementDirect(false); }
                    }}
                    disabled={chargementDirect || !inputPrenomDirect || !inputNomDirect || !inputEntrepriseDirect || (rhCreditsRestants !== null && rhCreditsRestants === 0)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {chargementDirect ? (
                      <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Recherche en cours — peut prendre jusqu&apos;à 2 min...</>
                    ) : "Trouver l'adresse email"}
                  </button>
                </div>
                {erreurDirect && (
                  <div className="mt-4 flex items-start gap-3 bg-rose-50 text-rose-700 rounded-xl px-4 py-3 text-sm ring-1 ring-rose-200">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {erreurDirect}
                  </div>
                )}
                {resultatDirect && (
                  <div className="mt-4 flex items-center gap-3 bg-emerald-50 rounded-xl px-4 py-3 ring-1 ring-emerald-100">
                    <svg className="w-4 h-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="text-sm font-semibold text-gray-900 flex-1">{resultatDirect.email}</span>
                    {resultatDirect.certitude >= 70 && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">{resultatDirect.certitude}%</span>
                    )}
                    <button
                      onClick={() => { navigator.clipboard.writeText(resultatDirect!.email); setEmailCopie(resultatDirect!.email); setTimeout(() => setEmailCopie(null), 2000); }}
                      className="flex items-center gap-1 text-xs font-semibold bg-white hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg ring-1 ring-gray-200 transition-colors"
                    >
                      {emailCopie === resultatDirect.email ? (
                        <><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Copié</>
                      ) : (
                        <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copier</>
                      )}
                    </button>
                    <button
                      disabled={!!contactDirectSauvegardeId || chargementSauvegardeDirect}
                      onClick={async () => {
                        setChargementSauvegardeDirect(true);
                        const domaine = inputEntrepriseDirect.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "").trim().toLowerCase();
                        const res = await fetch("/api/contacts-sauvegardes", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ prenom: inputPrenomDirect, nom: inputNomDirect, poste: "", linkedin: "", email: resultatDirect!.email, domaine }),
                        });
                        const data = await res.json();
                        if (data.id) {
                          setContactDirectSauvegardeId(data.id);
                          const newContact = { id: data.id, prenom: inputPrenomDirect, nom: inputNomDirect, poste: "", linkedin: "", email: resultatDirect!.email, domaine };
                          setContactsSauvegardes(prev => [newContact, ...prev]);
                        }
                        setChargementSauvegardeDirect(false);
                      }}
                      className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg ring-1 transition-colors disabled:cursor-not-allowed bg-white hover:bg-indigo-50 text-indigo-600 ring-indigo-200 disabled:opacity-50"
                    >
                      {contactDirectSauvegardeId ? (
                        <><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Sauvegardé</>
                      ) : (
                        <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z"/></svg>Sauvegarder</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Message d'erreur (mode entreprise) */}
            {sousModRH === "entreprise" && erreurRH && (
              <div className="mb-5 flex items-start gap-3 bg-rose-50 text-rose-700 rounded-xl px-4 py-3 text-sm ring-1 ring-rose-200">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {erreurRH}
              </div>
            )}

            {/* Résultats (mode entreprise) */}
            {sousModRH === "entreprise" && resultatsRH.length > 0 && (() => {
              const nbEchecs = Object.values(emailsEchec).filter(Boolean).length;
              const emailsIndisponibles = nbEchecs >= 5;
              return (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm overflow-hidden">
                {domaineTrouveRH && (
                  <div className="px-5 py-3 bg-indigo-50/60 border-b border-indigo-100 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    <span className="text-xs text-indigo-600 font-medium">{domaineTrouveRH}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {resultatsRH.length} prospect{resultatsRH.length > 1 ? "s" : ""} trouvé{resultatsRH.length > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                {emailsIndisponibles && (
                  <div className="px-5 py-3 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                    <span className="text-xs text-amber-700 font-medium">JobBoost n&apos;a pas trouvé d&apos;email pour ce contact. Les autres contacts de ce domaine pourraient également être indisponibles.</span>
                  </div>
                )}
                {resultatsRH.slice(pageProspects * PROSPECTS_PAR_PAGE, (pageProspects + 1) * PROSPECTS_PAR_PAGE).map((contact, j) => {
                  const i = pageProspects * PROSPECTS_PAR_PAGE + j;
                  const emailRevele = emailsReveles[i];
                  const enChargement = emailChargement[i] ?? false;
                  const emailEchec = emailsEchec[i] ?? false;
                  return (
                    <div key={i} className={`px-5 py-4 flex items-center gap-4 ${j !== Math.min(PROSPECTS_PAR_PAGE, resultatsRH.length - pageProspects * PROSPECTS_PAR_PAGE) - 1 ? "border-b border-gray-100" : ""}`}>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                        {contact.prenom?.[0]?.toUpperCase() ?? "?"}{contact.nom?.[0]?.toUpperCase() ?? ""}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{contact.prenom} {contact.nom}</p>
                        {contact.poste && <p className="text-xs text-gray-500 mt-0.5">{contact.poste}</p>}
                        {emailRevele && (
                          <p className="text-xs text-indigo-600 font-medium mt-1 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {emailRevele.email}
                            {emailRevele.certitude >= 70 && (
                              <span className="ml-1 text-xs font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">{emailRevele.certitude}%</span>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {contact.linkedin && (
                          <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold bg-[#0A66C2] hover:bg-[#004182] text-white px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            LinkedIn
                          </a>
                        )}
                        {emailRevele ? (
                          <button
                            onClick={() => { navigator.clipboard.writeText(emailRevele.email); setEmailCopie(emailRevele.email); setTimeout(() => setEmailCopie(null), 2000); }}
                            className="flex items-center gap-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {emailCopie === emailRevele.email ? (
                              <><svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Copié</>
                            ) : (
                              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copier</>
                            )}
                          </button>
                        ) : emailEchec ? (
                          <span className="text-xs font-medium px-2 py-1.5 rounded-lg bg-gray-100 text-gray-400">Non disponible</span>
                        ) : (
                          <button
                            onClick={async () => {
                              if (!domaineTrouveRH) return;
                              setEmailChargement(prev => ({ ...prev, [i]: true }));
                              setErreurRH("");
                              try {
                                const res = await fetch("/api/trouver-rh", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ mode: "email", prenom: contact.prenom, nom: contact.nom, domaine: domaineTrouveRH }),
                                });
                                const data = await res.json();
                                if (!res.ok) { setEmailsEchec(prev => ({ ...prev, [i]: true })); return; }
                                setEmailsReveles(prev => ({ ...prev, [i]: { email: data.email, certitude: data.certitude ?? 0 } }));
                                if (data.rhCreditsRestants !== undefined && data.rhCreditsRestants !== null) setRhCreditsRestants(data.rhCreditsRestants);
                              } catch { setEmailsEchec(prev => ({ ...prev, [i]: true })); }
                              finally { setEmailChargement(prev => ({ ...prev, [i]: false })); }
                            }}
                            disabled={enChargement || (rhCreditsRestants ?? 0) === 0}
                            className="flex items-center gap-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {enChargement ? (
                              <><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Jusqu&apos;à 2 min...</>
                            ) : (
                              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Révéler l&apos;email</>
                            )}
                          </button>
                        )}
                        {/* Bouton sauvegarder */}
                        {(() => {
                          const key = `${contact.prenom}|${contact.nom}|${domaineTrouveRH}`;
                          const savedId = sauvegardeIds[key];
                          return savedId ? (
                            <button
                              onClick={() => supprimerContactSauvegarde(key, savedId)}
                              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z"/></svg>
                              Sauvegardé
                            </button>
                          ) : (
                            <button
                              onClick={() => sauvegarderContact(contact, emailsReveles[i])}
                              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z"/></svg>
                              Sauvegarder
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
                {resultatsRH.length > PROSPECTS_PAR_PAGE && (
                  <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {pageProspects * PROSPECTS_PAR_PAGE + 1}–{Math.min((pageProspects + 1) * PROSPECTS_PAR_PAGE, resultatsRH.length)} sur {resultatsRH.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPageProspects(p => p - 1)}
                        disabled={pageProspects === 0}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >← Précédent</button>
                      <button
                        onClick={() => setPageProspects(p => p + 1)}
                        disabled={(pageProspects + 1) * PROSPECTS_PAR_PAGE >= resultatsRH.length}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >Suivant →</button>
                    </div>
                  </div>
                )}
              </div>
              );
            })()}

            {/* Résultat vide */}
            {sousModRH === "entreprise" && !chargementRH && resultatsRH.length === 0 && !erreurRH && domaineTrouveRH && (
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-10 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xl">🔍</div>
                <p className="text-gray-700 font-semibold">Aucun contact trouvé</p>
                <p className="text-gray-400 text-sm">JobBoost n&apos;a pas trouvé de profils pour ce domaine. Cela peut arriver pour les petites entreprises peu présentes sur LinkedIn. Essayez avec le nom de l&apos;entreprise ou un autre domaine.</p>
              </div>
            )}

            {/* Info bas de page */}
            </div>)}
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
                ...(analyseOuverte.score_apres != null ? [{ key: "apres", label: "Après adaptation" }] : []),
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
                  {/* Comparatif avant/après si score_apres disponible */}
                  {analyseOuverte.score_apres != null && (
                    <div className="flex items-center gap-3 bg-emerald-50 ring-1 ring-emerald-100 rounded-xl px-4 py-3">
                      <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${couleurScore(analyseOuverte.score)}`}>{analyseOuverte.score ?? "—"}</span>
                      <span className="text-gray-300 text-lg">→</span>
                      <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${couleurScore(analyseOuverte.score_apres)}`}>{analyseOuverte.score_apres}</span>
                      <span className="text-sm text-emerald-700 font-semibold ml-1">après adaptation</span>
                    </div>
                  )}
                  {/* Score */}
                  <div className="flex items-center gap-5">
                    <span className={`text-base font-extrabold px-4 py-2 rounded-full ${couleurScore(analyseOuverte.score)}`}>{analyseOuverte.score != null ? `${analyseOuverte.score} / 100` : "—"}</span>
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
                    {/* Score comparatif */}
                    <div className="flex items-center gap-3 bg-emerald-50 ring-1 ring-emerald-100 rounded-xl px-5 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${couleurScore(analyseOuverte.score)}`}>{analyseOuverte.score != null ? `${analyseOuverte.score} / 100` : "—"}</span>
                        <span className="text-xs text-gray-400">Avant</span>
                      </div>
                      <span className="text-gray-300 text-xl mx-1">→</span>
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${couleurScore(analyseOuverte.score_apres)}`}>{analyseOuverte.score_apres != null ? `${analyseOuverte.score_apres} / 100` : "—"}</span>
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

export default function Dashboard() {
  return (
    <Suspense fallback={null}>
      <DashboardInner />
    </Suspense>
  );
}
