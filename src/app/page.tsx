"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";
import Footer from "@/components/Footer";

const NB_BRIQUES = 4;

const FAQ = [
  {
    q: "JobBoost est-il vraiment gratuit ?",
    r: "L'analyse de votre CV est gratuite : score de correspondance et aperçu des mots-clés manquants, sans carte bancaire. Il suffit de créer un compte gratuit en 30 secondes. L'adaptation complète du CV, les lettres et le suivi Kanban font partie des plans payants, à partir de 4,99 €/mois (Starter) ou 9,99 €/mois (Pro), sans engagement.",
  },
  {
    q: "Est-ce que l'IA va inventer des choses sur mon CV ?",
    r: "Non, et c'est un principe absolu chez nous. JobBoost reformule et réorganise ce qui existe déjà dans votre CV : il intègre les bons mots-clés, améliore les formulations, restructure. Il n'ajoute jamais une expérience, un chiffre ou un diplôme que vous n'avez pas.",
  },
  {
    q: "Qu'est-ce qu'un ATS, concrètement ?",
    r: "Un logiciel de tri utilisé par la majorité des recruteurs (Indeed, LinkedIn, Welcome to the Jungle et la plupart des grandes entreprises en utilisent). Il scanne votre CV, cherche les mots-clés de l'offre, et classe les candidatures. Un bon profil mal formulé peut être classé loin derrière, c'est exactement ce que JobBoost corrige.",
  },
  {
    q: "En quoi est-ce mieux que ChatGPT ?",
    r: "ChatGPT réécrit un texte. JobBoost pilote votre recherche : score objectif sur 100, mots-clés ATS structurés, CV adapté offre par offre, suivi Kanban, emails de recruteurs, relances. Et il est calibré pour le marché français, pas pour des CV américains.",
  },
  {
    q: "Quels formats de CV sont acceptés ?",
    r: "PDF et Word (.docx). Vous pouvez aussi coller directement le texte. Le CV optimisé s'exporte en PDF ou Word, prêt à envoyer.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    r: "Oui, en un clic depuis votre compte, sans justification. Vous gardez l'accès jusqu'à la fin de la période payée. La plupart de nos utilisateurs partent pour la meilleure raison du monde : ils ont trouvé.",
  },
  {
    q: "Combien de temps pour voir des résultats ?",
    r: "Le score et les mots-clés : 30 secondes. Le CV adapté : quelques secondes de plus. Pour les réponses des recruteurs, aucun outil honnête ne peut vous promettre un délai. Mais un CV bien lu par les ATS, c'est la condition pour que votre profil ait sa chance.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    r: "Oui. Vos CV et candidatures restent privés, ne sont jamais revendus, et vous pouvez tout supprimer à tout moment. Conforme RGPD.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function PagePrincipale() {
  const { data: session } = useSession();
  const router = useRouter();
  const posthog = usePostHog();
  const [cv, setCv] = useState("");
  const [offre, setOffre] = useState("");
  const [erreur, setErreur] = useState("");
  const [modeCV, setModeCV] = useState<"upload" | "texte">("upload");
  const [nomFichier, setNomFichier] = useState("");
  const [extractionEnCours, setExtractionEnCours] = useState(false);
  const [dragActif, setDragActif] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLu, setVideoLu] = useState(false);
  const [muet, setMuet] = useState(true);
  const briquesContainerRef = useRef<HTMLDivElement>(null);
  // Effet "stacked cards on scroll" (façon gojiberry.ai) : chaque carte se
  // réduit/s'estompe légèrement quand la suivante vient la recouvrir, piloté
  // par la progression de scroll du conteneur entier (framer-motion). Le
  // sticky/empilement lui-même reste en CSS pur ; desktop uniquement,
  // désactivé si prefers-reduced-motion (le layout repasse en flux normal
  // via les classes motion-reduce: côté CSS, et on coupe aussi le scale/opacity).
  const { scrollYProgress: progressionBriques } = useScroll({
    target: briquesContainerRef,
    offset: ["start start", "end end"],
  });
  const [effetBriquesActif, setEffetBriquesActif] = useState(false);
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const majEtat = () => setEffetBriquesActif(mqDesktop.matches && !mqReduced.matches);
    majEtat();
    mqDesktop.addEventListener("change", majEtat);
    mqReduced.addEventListener("change", majEtat);
    return () => {
      mqDesktop.removeEventListener("change", majEtat);
      mqReduced.removeEventListener("change", majEtat);
    };
  }, []);

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
      posthog?.capture("cv_fichier_charge", { format: ext });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Impossible d'extraire le texte du fichier.";
      posthog?.capture("cv_fichier_erreur", { erreur: msg });
      setErreur(msg);
      setNomFichier("");
      setCv("");
    } finally {
      setExtractionEnCours(false);
    }
  }

  async function analyser() {
    if (!cv.trim() || !offre.trim()) {
      setErreur("Veuillez remplir les deux champs.");
      return;
    }
    // Connecté ou non : on sauvegarde et on redirige vers /analyses (ou register)
    posthog?.capture("analyse_lancee", { connecte: !!session });
    localStorage.setItem("pendingAnalysis", JSON.stringify({ cv, offre, nomFichier }));
    router.push(session ? "/analyses" : "/register");
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">

        {/* ══════════════ HERO ══════════════ */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-14 text-center">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-7 tracking-wide uppercase">
              Analyse gratuite · Résultat en 30 secondes
            </span>

            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15] mb-6">
              Découvrez en 30 secondes pourquoi{" "}
              <span
                className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent animate-shimmer"
                style={{ backgroundSize: "200% auto" }}
              >
                votre CV reste sans réponse
              </span>
            </h1>

            <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed mb-9">
              Collez votre CV et l&apos;offre qui vous intéresse. JobBoost vous donne votre score de correspondance, les mots-clés attendus par les ATS, et réécrit votre CV pour qu&apos;il soit bien lu.
            </p>

            <button
              onClick={() => document.getElementById("zones-texte")?.scrollIntoView({ behavior: "smooth" })}
              className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">Analyser mon CV gratuitement</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
            </button>

            <p className="text-gray-400 text-xs mt-4">
              Gratuit · Sans carte bancaire · Compte en 30 secondes
            </p>
          </div>
        </section>

        {/* ══════════════ VIDÉO DÉMO ══════════════ */}
        <section id="demo" className="bg-white px-6 pt-4 pb-14">
          <Reveal className="max-w-5xl mx-auto">
            {/* Chrome de navigateur */}
            <div className="rounded-t-xl bg-gray-100 border border-b-0 border-gray-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="bg-white rounded-full px-4 py-1 text-xs text-gray-400 ring-1 ring-gray-200">
                  app.jobboost.fr
                </span>
              </div>
            </div>

            {/* Lecteur vidéo */}
            <div className="relative rounded-b-xl overflow-hidden border border-gray-200 aspect-video bg-gray-900">
              <video
                ref={videoRef}
                muted={muet}
                loop
                autoPlay
                playsInline
                onPlay={() => setVideoLu(true)}
                className="w-full h-full object-cover"
              >
                <source src="/videos/demo-jobboost.mp4" type="video/mp4" />
              </video>

              {!videoLu && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
                  <span className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                    <svg className="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium text-white/80">Démo vidéo à venir</p>
                </div>
              )}

              {/* Barre de contrôle */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur rounded-full px-4 py-2 text-white/80">
                <button
                  onClick={() => (videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause())}
                  aria-label="Lecture / Pause"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="w-24 h-1 rounded-full bg-white/30 sm:w-40" />
                <button
                  onClick={() => setMuet((v) => !v)}
                  aria-label="Son"
                >
                  {muet ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2 2m0-2l-2 2M9 9H5a1 1 0 00-1 1v4a1 1 0 001 1h4l5 4V5L9 9z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M9 9H5a1 1 0 00-1 1v4a1 1 0 001 1h4l5 4V5L9 9z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Barre de preuve */}
        <section className="bg-white border-t border-gray-100 px-6 pb-16">
          <div className="max-w-lg mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
            <span><span className="font-extrabold text-gray-900">+2 400</span> CV analysés</span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span><span className="font-extrabold text-gray-900">92 %</span> découvrent des mots-clés manquants</span>
          </div>
        </section>

        {/* ══════════════ PROBLÈME / AGITATION ══════════════ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-12">
              Vous envoyez des candidatures. Vous ne recevez que du silence.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left mb-12">
              {[
                {
                  titre: "Aucune réponse, aucune explication.",
                  desc: "Votre profil correspond, pourtant rien. Vous ne savez même pas si un humain a vu votre CV.",
                  icone: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  titre: "Réécrire son CV pour chaque offre prend des heures.",
                  desc: "Alors vous envoyez le même partout. Et les ATS le classent derrière ceux qui utilisent les bons mots-clés.",
                  icone: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  titre: "Votre recherche part dans tous les sens.",
                  desc: "Un tableur par-ci, des brouillons par-là. Impossible de savoir qui relancer, ni quand.",
                  icone: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
                },
              ].map(({ titre, desc, icone }) => (
                <div key={titre} className="bg-gray-50/60 rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 mb-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icone} />
                    </svg>
                  </span>
                  <p className="font-bold text-gray-900 text-base mb-2">{titre}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-700 font-semibold text-base sm:text-lg">
              Ce n&apos;est pas votre profil le problème. C&apos;est la façon dont votre candidature est lue et pilotée.
            </p>
          </Reveal>
        </section>

        {/* ══════════════ LE PARCOURS — 4 BRIQUES ══════════════ */}
        <section className="bg-gray-50/60 border-t border-gray-100 px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                De candidature invisible à candidature pilotée.
              </h2>
              <p className="text-gray-500 text-base">Quatre étapes. Un seul outil.</p>
            </div>

            <div
              ref={briquesContainerRef}
              className="relative md:motion-safe:h-[400vh] md:motion-reduce:h-auto"
            >

              {/* ── Brique 1/4 — L'analyse ── */}
              <StickyBrique
                index={1}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={88}
                numero="1/4"
                titre="Voyez enfin ce que les robots voient."
                corps="Votre score de correspondance sur 100, la liste exacte des mots-clés attendus par l'ATS, et les lacunes qui vous pénalisent. En 30 secondes, vous savez précisément pourquoi ça bloque et quoi corriger."
                visual={
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 sm:p-12 md:min-h-[480px] flex flex-col justify-center">
                    <p className="text-center text-xs font-bold text-indigo-400 uppercase tracking-widest mb-8">Rapport d&apos;analyse ATS</p>
                    <div className="flex items-center justify-center gap-8 mb-10">
                      <div className="text-center">
                        <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">Avant</p>
                        <p className="text-5xl font-extrabold text-red-400">34</p>
                      </div>
                      <svg className="w-9 h-9 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <div className="text-center">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">Après</p>
                        <p className="text-6xl font-extrabold text-emerald-600">91</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {["Agile", "KPI", "JIRA", "Roadmap", "Change management", "Tableau de bord"].map((kw) => (
                        <span key={kw} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-white ring-1 ring-emerald-200 rounded-full px-4 py-2">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {kw}
                        </span>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-8">6 mots-clés ATS ajoutés</p>
                  </div>
                }
              />

              {/* ── Brique 2/4 — L'adaptation ── */}
              <StickyBrique
                index={2}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={108}
                numero="2/4"
                titre="Un CV adapté à chaque offre. En un clic."
                corps="JobBoost reformule votre CV avec le vocabulaire de l'offre : mots-clés intégrés, formulations optimisées, mise en forme lisible par les ATS. Il réorganise et reformule ce que vous avez fait, il n'invente jamais rien."
                micro="Vos expériences, vos chiffres, vos diplômes. Juste mieux racontés."
                visual={
                  <div className="bg-gray-50/60 rounded-2xl p-6 sm:p-8 md:min-h-[480px] flex flex-col justify-center gap-4">
                    <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-5">
                      <p className="text-sm text-gray-400 line-through mb-2">Aidé à l&apos;amélioration des processus internes.</p>
                      <p className="text-base text-gray-900 font-medium">Piloté la refonte de 3 processus internes, -40 % de délais.</p>
                    </div>
                    <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-5">
                      <p className="text-sm text-gray-400 line-through mb-2">Utilisé des stratégies synergiques.</p>
                      <p className="text-base text-gray-900 font-medium">Animé 8 équipes cross-fonctionnelles via JIRA.</p>
                    </div>
                    <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-5">
                      <p className="text-sm text-gray-400 line-through mb-2">Aidé à l&apos;organisation des plannings.</p>
                      <p className="text-base text-gray-900 font-medium">Coordonné les livrables de 12 sprints Agile.</p>
                    </div>
                    <div className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-5">
                      <p className="text-sm text-gray-400 line-through mb-2">Responsable de la gestion de projets.</p>
                      <p className="text-base text-gray-900 font-medium">Piloté 3 projets de refonte digitale (250 K€ chacun).</p>
                    </div>
                  </div>
                }
              />

              {/* ── Brique 3/4 — Le pilotage (Kanban) ── */}
              <StickyBrique
                index={3}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={128}
                numero="3/4"
                titre="Toutes vos candidatures. Un seul tableau de bord."
                corps="Chaque offre devient une carte : à postuler, envoyée, à relancer, entretien. Depuis chaque carte, adaptez votre CV pour cette offre, générez la lettre, trouvez l'email du recruteur, préparez l'entretien. Fini le tableur, votre recherche d'emploi a enfin un cockpit."
                micro="Relance automatique suggérée après 7 jours sans réponse."
                visual={
                  <div className="bg-gray-50/60 rounded-2xl p-6 sm:p-8 md:min-h-[480px] flex flex-col justify-center">
                    {/* Maquette statique du Kanban */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {[
                        {
                          titre: "Souhaitée",
                          accent: "bg-gray-300",
                          badge: "bg-gray-100 text-gray-600",
                          icone: "M12 6v6l4 2",
                          cartes: [{ poste: "Chef de projet digital", entreprise: "Acme Solutions", relance: undefined as string | undefined }],
                        },
                        {
                          titre: "Postulée",
                          accent: "bg-indigo-400",
                          badge: "bg-indigo-100 text-indigo-600",
                          icone: "M9 5l7 7-7 7",
                          cartes: [
                            { poste: "Product Manager", entreprise: "Nova Tech", relance: undefined as string | undefined },
                            { poste: "Chargée de communication", entreprise: "Studio Lumen", relance: undefined as string | undefined },
                          ],
                        },
                        {
                          titre: "Entretien",
                          accent: "bg-violet-400",
                          badge: "bg-violet-100 text-violet-600",
                          icone: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.9 7.9 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                          cartes: [{ poste: "Coordinatrice projet digital", entreprise: "StartupXYZ", relance: "Relance 14 juil." as string | undefined }],
                        },
                        {
                          titre: "Offre",
                          accent: "bg-emerald-400",
                          badge: "bg-emerald-100 text-emerald-700",
                          icone: "M5 13l4 4L19 7",
                          cartes: [{ poste: "Chef de projet digital", entreprise: "Vertex Group", relance: undefined as string | undefined }],
                        },
                      ].map((col) => (
                        <div key={col.titre} className="shrink-0 w-56 flex flex-col">
                          <div className={`${col.accent} h-1.5 rounded-t-xl`} />
                          <div className="flex-1 rounded-b-xl bg-white ring-1 ring-gray-200">
                            <div className="px-3.5 py-3.5 flex items-center gap-2">
                              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${col.badge}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={col.icone} />
                                </svg>
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-800">{col.titre}</span>
                              <span className="text-xs text-gray-400 font-medium">{col.cartes.length}</span>
                            </div>
                            <div className="px-3 pb-3.5 flex flex-col gap-2">
                              {col.cartes.map((carte) => (
                                <div key={carte.poste} className="bg-white rounded-xl px-3 py-2.5 ring-1 ring-gray-200 shadow-sm">
                                  <p className="text-sm font-semibold text-gray-900 leading-tight">{carte.poste}</p>
                                  <div className="flex items-center gap-1.5 mt-1.5">
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-violet-100 text-violet-700 text-[10px] font-bold">
                                      {carte.entreprise.charAt(0)}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate">{carte.entreprise}</span>
                                  </div>
                                  {carte.relance && (
                                    <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {carte.relance}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Carte ouverte — aperçu des actions */}
                    <div className="mt-5 bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Carte ouverte</p>
                      <p className="text-base font-bold text-gray-900 mb-3">Coordinatrice projet digital · StartupXYZ</p>
                      <div className="flex flex-wrap gap-2">
                        {["Adapter le CV", "Générer la lettre", "Révéler l'email", "Préparer l'entretien"].map((action) => (
                          <span key={action} className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg px-2.5 py-1.5">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />

              {/* ── Brique 4/4 — Le suivi ── */}
              <StickyBrique
                index={4}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={148}
                numero="4/4"
                titre="Ne laissez plus une candidature sans suite."
                corps="JobBoost vous dit qui relancer et quand, génère votre lettre de motivation en cohérence avec le CV adapté, et vous prépare aux questions d'entretien du poste. Chaque candidature va au bout, pas seulement les trois premières."
                visual={
                  <div className="bg-gray-50/60 rounded-2xl p-6 sm:p-8 md:min-h-[480px] flex flex-col justify-center gap-4">
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 flex items-start gap-4">
                      <span className="shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-base font-semibold text-gray-900">Relance suggérée</p>
                        <p className="text-sm text-gray-500 mt-1">StartupXYZ · 7 jours sans réponse. Un mail de relance est prêt.</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 flex items-start gap-4">
                      <span className="shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.9 7.9 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-base font-semibold text-gray-900">Préparation d&apos;entretien</p>
                        <p className="text-sm text-gray-500 mt-1">Vertex Group · 5 questions probables générées pour ce poste.</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 flex items-start gap-4">
                      <span className="shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-base font-semibold text-gray-900">Lettre de motivation prête</p>
                        <p className="text-sm text-gray-500 mt-1">Générée automatiquement en cohérence avec le CV adapté.</p>
                      </div>
                    </div>
                  </div>
                }
              />

            </div>
          </div>
        </section>

        {/* ══════════════ DIFFÉRENCIATION — UN SEUL OUTIL ══════════════ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <Reveal className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                Un outil. Toute votre recherche d&apos;emploi.
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">
                Arrêtez de jongler entre ChatGPT, Word, un tableur et douze onglets. JobBoost fait le travail de bout en bout, avec un score objectif que ChatGPT ne vous donnera jamais.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200 shadow-sm">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 font-semibold text-gray-500"></th>
                    <th className="p-4 font-semibold text-gray-500 whitespace-nowrap">À la main</th>
                    <th className="p-4 font-semibold text-gray-500 whitespace-nowrap">ChatGPT</th>
                    <th className="p-4 font-bold text-indigo-700 bg-indigo-50 whitespace-nowrap">JobBoost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Score de correspondance objectif", "✕", "✕", "✅ /100"],
                    ["Mots-clés ATS structurés", "✕", "Approximatif", "✅ Liste exacte"],
                    ["CV adapté par offre", "Des heures", "Copier-coller à chaque fois", "✅ 1 clic"],
                    ["Suivi de toutes vos candidatures", "Tableur", "✕", "✅ Kanban intégré"],
                    ["Email du recruteur", "✕", "✕", "✅"],
                    ["Relances au bon moment", "De mémoire", "✕", "✅ Suggérées à J+7"],
                  ].map(([ligne, main, chatgpt, jobboost]) => (
                    <tr key={ligne}>
                      <td className="p-4 font-medium text-gray-900">{ligne}</td>
                      <td className="p-4 text-gray-400">{main}</td>
                      <td className="p-4 text-gray-400">{chatgpt}</td>
                      <td className="p-4 font-semibold text-gray-900 bg-indigo-50/50">{jobboost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              À partir de <span className="font-bold text-gray-900">4,99 €/mois</span>. Moins cher qu&apos;un café par semaine, pour la période la plus décisive de votre carrière.
            </p>
          </Reveal>
        </section>

        {/* Zones de texte */}
        <section id="zones-texte" className="max-w-6xl mx-auto px-6 pb-6 pt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Analysez votre CV maintenant
            </h2>
          </div>
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
                    onClick={() => { setModeCV("texte"); posthog?.capture("mode_cv_change", { mode: "texte" }); }}
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
            className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span className="relative z-10">Analyser gratuitement</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
          </button>
        </section>

        {/* ══════════════ PREUVE SOCIALE (chiffres) ══════════════ */}
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 px-6 py-16 border-t border-indigo-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
              JobBoost en chiffres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { chiffre: "+2 400", label: "CV analysés" },
                { chiffre: "92 %", label: "découvrent des mots-clés manquants dès la première analyse" },
                { chiffre: "3×", label: "plus rapide qu'une réécriture manuelle" },
              ].map(({ chiffre, label }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm ring-1 ring-indigo-100 p-6 text-center">
                  <p className="text-3xl font-extrabold text-indigo-600 mb-1">{chiffre}</p>
                  <p className="text-gray-500 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">Questions fréquentes</h2>
            <div className="flex flex-col divide-y divide-gray-100">
              {FAQ.map(({ q, r }, i) => (
                <details key={i} className="group py-5 cursor-pointer list-none">
                  <summary className="flex items-center justify-between gap-4 font-semibold text-gray-900 text-sm sm:text-base select-none list-none">
                    {q}
                    <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="mt-3 text-gray-500 text-sm leading-relaxed">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ CTA FINAL ══════════════ */}
        <section className="bg-gradient-to-b from-white to-indigo-50 border-t border-gray-100 px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Votre prochaine candidature peut être la bonne. Encore faut-il qu&apos;elle soit lue.
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Analysez votre CV maintenant. Gratuit, résultat en 30 secondes.
            </p>
            <button
              onClick={() => document.getElementById("zones-texte")?.scrollIntoView({ behavior: "smooth" })}
              className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">Analyser mon CV gratuitement</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
            </button>
            <p className="text-gray-400 text-xs mt-4">
              Sans carte bancaire · Sans engagement · +2 400 CV déjà analysés
            </p>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}

function BriqueHeader({ numero, titre, corps }: { numero: string; titre: string; corps: string }) {
  return (
    <div>
      <span className="inline-flex items-center justify-center text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1 mb-4">
        {numero}
      </span>
      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-3">{titre}</h3>
      <p className="text-gray-500 text-base sm:text-lg leading-relaxed">{corps}</p>
    </div>
  );
}

function StickyBrique({
  index,
  progress,
  actif,
  numero,
  titre,
  corps,
  micro,
  visual,
  topOffsetPx,
}: {
  index: number;
  progress: MotionValue<number>;
  actif: boolean;
  numero: string;
  titre: string;
  corps: string;
  micro?: string;
  visual: React.ReactNode;
  topOffsetPx: number;
}) {
  // i0 = position 0-based de la carte. Tant qu'elle est la carte "de devant",
  // une brique reste à scale/opacité pleins ; elle ne se réduit et ne
  // s'estompe qu'à partir du moment où la carte SUIVANTE arrive et
  // commence à la recouvrir (coverStart), jamais avant. Sans ce garde-fou,
  // la carte active elle-même devient légèrement transparente dès son
  // arrivée et laisse filtrer son texte à travers celle du dessus, créant
  // un effet "fantôme" illisible. L'opacité chute vite (fenêtre courte)
  // pour ne pas laisser de texte fantôme lisible ; le scale continue de
  // se réduire plus progressivement pour la profondeur. La dernière carte
  // n'est jamais recouverte, donc jamais transformée.
  const i0 = index - 1;
  const estDerniere = index === NB_BRIQUES;
  const coverStart = (i0 + 1) / NB_BRIQUES;
  const finFondu = coverStart + 0.5 / NB_BRIQUES;
  const cartesEmpileesDessus = NB_BRIQUES - 1 - i0;
  const targetScale = 1 - cartesEmpileesDessus * 0.05;
  const scale = useTransform(progress, [coverStart, 1], [1, targetScale]);
  const opacity = useTransform(progress, [coverStart, finFondu], [1, 0]);
  const appliquerEffet = actif && !estDerniere;

  return (
    <div
      className="mb-6 md:mb-0 md:motion-safe:sticky md:motion-reduce:static"
      style={{ top: topOffsetPx, zIndex: index }}
    >
      <motion.div
        className="bg-white rounded-3xl ring-1 ring-gray-200 shadow-xl shadow-gray-200/60 p-8 sm:p-14 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center will-change-transform"
        style={{
          minHeight: actif ? `calc(100vh - ${topOffsetPx}px)` : undefined,
          scale: appliquerEffet ? scale : 1,
          opacity: appliquerEffet ? opacity : 1,
        }}
      >
        <div>
          <BriqueHeader numero={numero} titre={titre} corps={corps} />
          {micro && <p className="text-gray-400 text-base mt-4">{micro}</p>}
        </div>
        <div className="w-full">{visual}</div>
      </motion.div>
    </div>
  );
}

function Reveal({ children, className = "", delayMs = 0 }: { children: React.ReactNode; className?: string; delayMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
