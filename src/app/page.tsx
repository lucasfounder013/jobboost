"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";
import Footer from "@/components/Footer";

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
  const [ongletCV, setOngletCV] = useState<"avant" | "apres">("avant");
  const refSectionDemo = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = refSectionDemo.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalRef.current = setInterval(() => {
            setOngletCV(prev => prev === "avant" ? "apres" : "avant");
          }, 15000);
        } else {
          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (intervalRef.current) clearInterval(intervalRef.current); };
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
    } finally {
      setExtractionEnCours(false);
    }
  }

  async function analyser() {
    if (!cv.trim() || !offre.trim()) {
      setErreur("Veuillez remplir les deux champs.");
      return;
    }
    // Connecté ou non : on sauvegarde et on redirige vers le dashboard (ou login)
    posthog?.capture("analyse_lancee", { connecte: !!session });
    localStorage.setItem("pendingAnalysis", JSON.stringify({ cv, offre, nomFichier }));
    router.push(session ? "/dashboard" : "/login");
  }

  return (
    <div className="min-h-screen flex flex-col">


      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-6 pt-20 pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Votre prochain entretien{" "}
              <span
                className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent animate-shimmer"
                style={{ backgroundSize: "200% auto" }}
              >
                commence ici
              </span>
            </h1>

            <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
              Votre CV analysé, optimisé pour les ATS et adapté à chaque offre. En quelques secondes.
            </p>

            <button
              onClick={() => document.getElementById("zones-texte")?.scrollIntoView({ behavior: "smooth" })}
              className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">Analyser mon CV gratuitement →</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
            </button>
          </div>
        </section>

        {/* Démo avant / après CV */}
        <section ref={refSectionDemo} className="bg-white border-t border-gray-100 px-6 pt-16 pb-16">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-8">
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                Démonstration
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
                La différence JobBoost en un coup d&apos;œil
              </h2>
              <div className="inline-flex rounded-xl bg-gray-100 p-1 gap-1 mb-5">
                <button
                  onClick={() => setOngletCV("avant")}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${ongletCV === "avant" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  CV générique
                </button>
                <button
                  onClick={() => setOngletCV("apres")}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${ongletCV === "apres" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  CV optimisé par JobBoost
                </button>
              </div>
              <p className="text-gray-500 text-base max-w-xl mx-auto">
                {ongletCV === "avant"
                  ? "Les descriptions vagues sont ignorées par les ATS et les recruteurs en moins de 3 secondes."
                  : "Chaque ligne est optimisée pour les ATS et immédiatement lisible par un recruteur humain."}
              </p>
            </div>

            <div className="flex items-stretch gap-6 xl:gap-10">

              {/* Annotations gauche */}
              <div className="w-48 xl:w-56 shrink-0 hidden lg:block relative">
                {ongletCV === "avant" ? (
                  <>
                    {/* → badge "Chef de projet" */}
                    <div className="absolute top-[185px] right-0 w-full text-right">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Titre vague, aucun mot-clé ATS. Le poste exact n&apos;apparaît pas.</p>
                      </span>
                    </div>
                    {/* → texte résumé "Motivée", "passionnée"... */}
                    <div className="absolute top-[295px] right-0 w-full text-right">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ &ldquo;Motivée&rdquo; est un buzzword. Aucune preuve chiffrée.</p>
                      </span>
                    </div>
                    {/* → section Compétences clés */}
                    <div className="absolute top-[400px] right-0 w-full text-right">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Compétences génériques non indexées par les ATS.</p>
                      </span>
                    </div>
                    {/* → premier bullet Acme */}
                    <div className="absolute top-[492px] right-0 w-full text-right">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Tâche basique que tout candidat peut écrire. Aucun résultat.</p>
                      </span>
                    </div>
                    {/* → dernier bullet Acme */}
                    <div className="absolute top-[580px] right-0 w-full text-right">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Aucun outil cité (JIRA ? Trello ?). Impossible à évaluer.</p>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* → titre "Chef de projet digital — Transformation..." */}
                    <div className="absolute top-[95px] right-0 w-full text-right">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Titre aligné mot pour mot avec l&apos;offre d&apos;emploi visée.</p>
                      </span>
                    </div>
                    {/* → profil chiffré "6 ans, 250K€, 94%" */}
                    <div className="absolute top-[188px] right-0 w-full text-right">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Résumé chiffré. La valeur ajoutée est visible en 3 secondes.</p>
                      </span>
                    </div>
                    {/* → bullet Acme "3 projets, budget 250K€, 94% dans les délais" */}
                    <div className="absolute top-[295px] right-0 w-full text-right">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Budget + taux de livraison = preuve de résultat concret.</p>
                      </span>
                    </div>
                    {/* → bullet Acme "sprints Agile, 8 équipes, JIRA" + bullet KPI */}
                    <div className="absolute top-[400px] right-0 w-full text-right">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Outils nommés + méthode = scope de responsabilité immédiat.</p>
                      </span>
                    </div>
                    {/* → section Compétences (Agile/Scrum, JIRA, KPI...) */}
                    <div className="absolute top-[495px] right-0 w-full text-right">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Compétences techniques recherchées par les ATS du secteur.</p>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* CV document */}
              <div className={`flex-1 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${ongletCV === "avant" ? "ring-2 ring-red-100" : "ring-2 ring-emerald-100"}`}>
                {/* Bandeau score */}
                <div className={`px-6 py-3 flex items-center justify-between ${ongletCV === "avant" ? "bg-red-50 border-b border-red-100" : "bg-emerald-50 border-b border-emerald-100"}`}>
                  <span className={`text-xs font-bold ${ongletCV === "avant" ? "text-red-600" : "text-emerald-700"}`}>
                    {ongletCV === "avant" ? "Avant JobBoost" : "Après JobBoost"}
                  </span>
                  <span className={`text-sm font-extrabold px-3 py-1 rounded-full ${ongletCV === "avant" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                    Score ATS : {ongletCV === "avant" ? "34" : "91"} / 100
                  </span>
                </div>

                {/* Corps du CV */}
                <div className="bg-white p-8 font-serif text-gray-900">
                  {ongletCV === "avant" ? (
                    /* ── CV AVANT (style générique centré) ── */
                    <div className="font-sans text-[13px] text-gray-900 leading-snug">

                      {/* En-tête centré avec avatar */}
                      <div className="text-center mb-5 pb-4 border-b border-gray-300">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3 text-gray-400 text-xl font-bold">SM</div>
                        <p className="text-[22px] font-bold uppercase tracking-wide">SOPHIE MARTIN</p>
                        <span className="inline-block bg-red-100 text-red-400 text-xs font-semibold px-3 py-0.5 rounded-sm mt-1">Chef de projet</span>
                        <p className="text-xs text-gray-500 mt-2">Paris, France · sophie.martin@gmail.com · linkedin.com/in/sophiemartin</p>
                      </div>

                      {/* Résumé */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Résumé professionnel</p>
                        <p className="text-gray-700 leading-relaxed">
                          <span className="text-red-400 font-semibold">Motivée</span> et dynamique, je suis une professionnelle <span className="text-red-400 font-semibold">passionnée</span> par les projets et le travail en équipe. <span className="text-red-400 font-semibold">Team player</span> reconnue pour ma polyvalence, je cherche à rejoindre une entreprise <span className="text-red-400 font-semibold">dynamique</span> pour relever de nouveaux défis et contribuer à son succès dans un environnement stimulant.
                        </p>
                      </div>

                      {/* Compétences — pills */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Compétences clés</p>
                        <div className="flex flex-wrap gap-1.5">
                          {["Microsoft Office", "Travail en équipe", "Communication", "Leadership", "Polyvalence", "Sens de l'organisation"].map(c => (
                            <span key={c} className="border border-gray-300 text-gray-600 text-xs px-2.5 py-0.5 rounded-full">{c}</span>
                          ))}
                        </div>
                      </div>

                      {/* Expérience */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-3">Expérience professionnelle</p>

                        <div className="mb-3">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold">Acme Solutions</p>
                            <p className="text-xs text-gray-500 shrink-0">Jan 2021 – Présent</p>
                          </div>
                          <p className="italic text-gray-500 text-xs mb-1.5">Chef de projet</p>
                          <ul className="space-y-1 text-gray-700">
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Responsable de la gestion de projets en lien avec les équipes.</span></li>
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span><span className="text-red-400 font-semibold">Aidé</span> à l&apos;amélioration des processus internes de l&apos;entreprise.</span></li>
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Travaillé avec les équipes pour livrer les projets dans les délais.</span></li>
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Participé aux réunions de suivi avec les parties prenantes.</span></li>
                          </ul>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold">StartupXYZ</p>
                            <p className="text-xs text-gray-500 shrink-0">Sep 2018 – Déc 2020</p>
                          </div>
                          <p className="italic text-gray-500 text-xs mb-1.5">Coordinatrice de projet</p>
                          <ul className="space-y-1 text-gray-700">
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span><span className="text-red-400 font-semibold">Utilisé</span> des stratégies <span className="text-red-400 font-semibold">synergiques</span> pour aligner les équipes sur les objectifs trimestriels.</span></li>
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Créé des tableaux de bord et rapports pour les présentations de direction.</span></li>
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span><span className="text-red-400 font-semibold">Aidé</span> à l&apos;organisation des plannings et des livrables de l&apos;équipe.</span></li>
                          </ul>
                        </div>

                        <div>
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold">Conseil Régional Île-de-France</p>
                            <p className="text-xs text-gray-500 shrink-0">Juin 2016 – Août 2018</p>
                          </div>
                          <p className="italic text-gray-500 text-xs mb-1.5">Assistante chef de projet</p>
                          <ul className="space-y-1 text-gray-700">
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Suivi administratif de projets de développement numérique.</span></li>
                            <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Rédaction de comptes-rendus et supports de présentation.</span></li>
                          </ul>
                        </div>
                      </div>

                      {/* Formation */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Formation</p>
                        <div className="mb-1.5">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold">Université Paris-Dauphine</p>
                            <p className="text-xs text-gray-500 shrink-0">2014 – 2016</p>
                          </div>
                          <p className="italic text-gray-500 text-xs">Master Management de projets</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold">Université Paris 1 Panthéon-Sorbonne</p>
                            <p className="text-xs text-gray-500 shrink-0">2011 – 2014</p>
                          </div>
                          <p className="italic text-gray-500 text-xs">Licence Administration des entreprises</p>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Certifications &amp; Récompenses</p>
                        <ul className="space-y-1 text-gray-700">
                          <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Formation gestion de projet (en ligne)</span></li>
                          <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Employée du mois — Acme Solutions (2022)</span></li>
                        </ul>
                      </div>

                      {/* Langues */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Langues</p>
                        <p className="text-gray-700">Français (natif) · Anglais (intermédiaire)</p>
                      </div>

                      {/* Centres d'intérêt */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-2">Centres d&apos;intérêt</p>
                        <ul className="space-y-1 text-gray-700">
                          <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Voyages</span></li>
                          <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Photographie</span></li>
                          <li className="flex gap-2 items-start"><span className="shrink-0 mt-[6px] w-1 h-1 rounded-full bg-gray-400 inline-block" /><span>Lecture</span></li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    /* ── CV APRÈS (format JobBoost) ── */
                    <div className="font-serif text-[13px] text-gray-900 leading-snug">
                      {/* En-tête */}
                      <div className="mb-4">
                        <p className="text-[22px] font-bold font-sans">Sophie Martin</p>
                        <p className="text-sm font-sans text-gray-700 mt-0.5">Chef de projet digital — Transformation &amp; Pilotage agile</p>
                        <p className="text-xs font-sans text-gray-500 mt-1">sophie.martin@gmail.com · +33 6 12 34 56 78 · Paris, France · linkedin.com/in/sophiemartin</p>
                      </div>

                      {/* Profil */}
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider font-sans border-b border-gray-400 pb-0.5 mb-1.5">Profil</p>
                        <p className="leading-relaxed text-gray-700">
                          Chef de projet digital avec{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">6 ans</span>{" "}d&apos;expérience en{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">transformation numérique</span>{" "}et pilotage de projets complexes (budgets jusqu&apos;à{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">250 K€</span>). Certifiée{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">PMP</span>{" "}et{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">PSM I</span>. Taux de livraison dans les délais :{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">94 %</span>. Reconnue pour son leadership cross-fonctionnel et sa capacité à conduire le changement à grande échelle.
                        </p>
                      </div>

                      {/* Expérience */}
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider font-sans border-b border-gray-400 pb-0.5 mb-2">Expérience professionnelle</p>

                        <div className="mb-2.5">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold font-sans">Chef de projet digital</p>
                            <p className="text-xs font-sans text-gray-500 shrink-0">Jan 2021 – Présent</p>
                          </div>
                          <p className="italic text-gray-600 mb-1">Acme Solutions</p>
                          <ul className="space-y-0.5 text-gray-700">
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Piloté{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">3 projets</span>{" "}de refonte digitale (budget{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">250 K€</span>{" "}chacun), livrés à{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">94 %</span>{" "}dans les délais.</span></li>
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Animé des{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">sprints Agile</span>{" "}bi-hebdomadaires avec{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">8 équipes</span>{" "}cross-fonctionnelles via{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">JIRA</span>.</span></li>
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Mis en place des{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">tableaux de bord KPI</span>{" "}réduisant les retards de{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">40 %</span>.</span></li>
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Conduit le{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">change management</span>{" "}pour{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">120 collaborateurs</span>{" "}lors d&apos;une migration ERP.</span></li>
                          </ul>
                        </div>

                        <div className="mb-2.5">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold font-sans">Coordinatrice de projet digital</p>
                            <p className="text-xs font-sans text-gray-500 shrink-0">Sep 2018 – Déc 2020</p>
                          </div>
                          <p className="italic text-gray-600 mb-1">StartupXYZ</p>
                          <ul className="space-y-0.5 text-gray-700">
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Coordonné la{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">roadmap</span>{" "}produit sur{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">12 sprints</span>, réduisant les délais de{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">25 %</span>.</span></li>
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Suivi des{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">KPIs</span>{" "}de performance — reporting hebdomadaire à{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">15 managers</span>.</span></li>
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Négocié avec{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">4 prestataires</span>{" "}externes, économisant{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">18 K€</span>{" "}sur le budget annuel.</span></li>
                          </ul>
                        </div>

                        <div>
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold font-sans">Assistante chef de projet digital</p>
                            <p className="text-xs font-sans text-gray-500 shrink-0">Juin 2016 – Août 2018</p>
                          </div>
                          <p className="italic text-gray-600 mb-1">Conseil Régional Île-de-France</p>
                          <ul className="space-y-0.5 text-gray-700">
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Contribué au déploiement d&apos;un portail numérique citoyen (<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">50 000 utilisateurs</span>{" "}à l&apos;ouverture).</span></li>
                            <li className="flex gap-1.5"><span className="shrink-0">•</span><span>Rédigé les{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">cahiers des charges</span>{" "}et rapports de suivi pour{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">3 directions métier</span>.</span></li>
                          </ul>
                        </div>
                      </div>

                      {/* Formation */}
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider font-sans border-b border-gray-400 pb-0.5 mb-2">Formation</p>
                        <div className="mb-1.5">
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold font-sans">Master Management de projets digitaux</p>
                            <p className="text-xs font-sans text-gray-500 shrink-0">2014 – 2016</p>
                          </div>
                          <p className="italic text-gray-600">Université Paris-Dauphine</p>
                          <p className="text-gray-600 ml-3"><span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Major de promotion</span></p>
                        </div>
                        <div>
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold font-sans">Licence Administration des entreprises</p>
                            <p className="text-xs font-sans text-gray-500 shrink-0">2011 – 2014</p>
                          </div>
                          <p className="italic text-gray-600">Université Paris 1 Panthéon-Sorbonne</p>
                        </div>
                      </div>

                      {/* Compétences */}
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider font-sans border-b border-gray-400 pb-0.5 mb-1.5">Compétences</p>
                        <p className="text-gray-700"><span className="font-bold font-sans">Techniques :</span>{" "}<span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Gestion de projet</span>, <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Agile / Scrum</span>, <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">JIRA</span>, <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Roadmap</span>, <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">KPI</span>, <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Tableau de bord</span>, <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Change management</span></p>
                        <p className="text-gray-700 mt-0.5"><span className="font-bold font-sans">Langues :</span>{" "}Français (natif), <span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-sans font-semibold">Anglais professionnel (C1)</span>, Espagnol (B1)</p>
                        <p className="text-gray-700 mt-0.5"><span className="font-bold font-sans">Autres :</span>{" "}Relation client, Communication orale et écrite, Travail en équipe multidisciplinaire, Rigueur</p>
                      </div>

                      {/* Certifications */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider font-sans border-b border-gray-400 pb-0.5 mb-2">Certifications</p>
                        <div className="flex justify-between items-baseline">
                          <p className="font-bold font-sans"><span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-semibold">PMP</span> — Project Management Institute</p>
                          <p className="text-xs font-sans text-gray-500 shrink-0">2023</p>
                        </div>
                        <div className="flex justify-between items-baseline mt-0.5">
                          <p className="font-bold font-sans"><span className="bg-emerald-100 text-emerald-800 px-0.5 rounded font-semibold">PSM I</span> — Scrum.org</p>
                          <p className="text-xs font-sans text-gray-500 shrink-0">2022</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Annotations droite */}
              <div className="w-48 xl:w-56 shrink-0 hidden lg:block relative">
                {ongletCV === "avant" ? (
                  <>
                    {/* → corps du résumé professionnel */}
                    <div className="absolute top-[290px] left-0 w-full">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Résumé sans chiffre. Les recruteurs ignorent ce type de profil en 3 s.</p>
                      </span>
                    </div>
                    {/* → section Compétences clés (pills génériques) */}
                    <div className="absolute top-[390px] left-0 w-full">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Aucun outil cité (JIRA ? Asana ?). Niveau de compétence non évaluable.</p>
                      </span>
                    </div>
                    {/* → bullets Acme (tâches vagues) */}
                    <div className="absolute top-[480px] left-0 w-full">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Tâche vague. Aucune méthodologie ni scope de responsabilité.</p>
                      </span>
                    </div>
                    {/* → bullet StartupXYZ "synergiques" */}
                    <div className="absolute top-[560px] left-0 w-full">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ &ldquo;Synergique&rdquo;, &ldquo;team player&rdquo; : mots vides non indexés par les ATS.</p>
                      </span>
                    </div>
                    {/* → bullets StartupXYZ / Conseil Régional (aucun chiffre) */}
                    <div className="absolute top-[640px] left-0 w-full">
                      <span className="inline-block bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-red-600">✕ Aucun résultat chiffré. Impossible de mesurer la valeur ajoutée.</p>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* → profil "6 ans, 250K€, 94%, PMP, PSM I" */}
                    <div className="absolute top-[185px] left-0 w-full">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Chiffres + certification = crédibilité immédiate pour les recruteurs.</p>
                      </span>
                    </div>
                    {/* → bullet Acme "sprints Agile, 8 équipes, JIRA" */}
                    <div className="absolute top-[295px] left-0 w-full">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Outils nommés + impact = preuve de valeur immédiatement visible.</p>
                      </span>
                    </div>
                    {/* → bullet Acme "tableaux de bord KPI, -40%" */}
                    <div className="absolute top-[390px] left-0 w-full">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ KPIs + chiffre d&apos;impact = preuve de contribution mesurable.</p>
                      </span>
                    </div>
                    {/* → bullet StartupXYZ "roadmap, 12 sprints, -25%" */}
                    <div className="absolute top-[480px] left-0 w-full">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Méthode Agile + taille d&apos;équipe = scope de responsabilité clair.</p>
                      </span>
                    </div>
                    {/* → section Compétences (Agile/Scrum, JIRA, KPI...) */}
                    <div className="absolute top-[565px] left-0 w-full">
                      <span className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        <p className="text-[11px] font-semibold leading-snug text-emerald-700">✓ Mots-clés sectoriels détectés et indexés par tous les ATS.</p>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-12">
              Comment ça marche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-indigo-100 border border-indigo-100 rounded-2xl overflow-hidden shadow-sm shadow-indigo-50">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  titre: "Analyser",
                  desc: "Voyez exactement comment votre CV correspond à l'offre. Score ATS, mots-clés manquants et lacunes. En 30 secondes.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  ),
                  titre: "Adapter",
                  desc: "L'IA réécrit automatiquement votre CV pour ce poste : mots-clés intégrés, formulations optimisées. En un clic.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  ),
                  titre: "Exporter",
                  desc: "Téléchargez en PDF ou Word, avec une mise en forme ATS-compatible. Prêt à envoyer.",
                },
              ].map(({ icon, titre, desc }) => (
                <div key={titre} className="bg-white hover:bg-indigo-50/30 transition-colors duration-200 p-8 flex flex-col gap-5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base mb-2">{titre}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

      </main>

        {/* Social proof */}
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 px-6 py-16 border-t border-indigo-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
              Ils ont boosté leur CV
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { chiffre: "+2 400", label: "CVs analysés" },
                { chiffre: "92 %", label: "trouvent des mots-clés manquants" },
                { chiffre: "3×", label: "plus rapide qu'une réécriture manuelle" },
              ].map(({ chiffre, label }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm ring-1 ring-indigo-100 p-6 text-center">
                  <p className="text-3xl font-extrabold text-indigo-600 mb-1">{chiffre}</p>
                  <p className="text-gray-500 text-sm">{label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  initiales: "SC",
                  prenom: "Sophie C.",
                  poste: "Chef de projet digital",
                  citation: "J'ai découvert 8 mots-clés que j'avais complètement oubliés. J'ai décroché un entretien la semaine suivante.",
                },
                {
                  initiales: "TM",
                  prenom: "Thomas M.",
                  poste: "Développeur fullstack",
                  citation: "L'adaptation automatique est bluffante. Mon CV correspond maintenant exactement au vocabulaire de l'offre.",
                },
                {
                  initiales: "LB",
                  prenom: "Laura B.",
                  poste: "Responsable RH",
                  citation: "Je recommande JobBoost à tous mes candidats. L'outil est simple, rapide et les résultats sont concrets.",
                },
              ].map(({ initiales, prenom, poste, citation }) => (
                <div key={prenom} className="bg-white rounded-2xl shadow-sm ring-1 ring-indigo-100 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {initiales}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{prenom}</p>
                      <p className="text-gray-400 text-xs">{poste}</p>
                    </div>
                    <div className="ml-auto text-amber-400 text-sm tracking-tight">★★★★★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{citation}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">Questions fréquentes</h2>
            <div className="flex flex-col divide-y divide-gray-100">
              {[
                {
                  q: "JobBoost est-il vraiment gratuit ?",
                  r: "Oui. L'analyse CV vs offre (score + mots-clés manquants) est gratuite pour les 5 premières analyses. L'adaptation du CV par l'IA inclut 1 essai gratuit. Au-delà, un abonnement Starter (9,99 €/mois) ou Pro (14,99 €/mois) débloque les analyses et adaptations illimitées.",
                },
                {
                  q: "Qu'est-ce qu'un ATS et pourquoi est-ce important ?",
                  r: "Un ATS (Applicant Tracking System) est un logiciel utilisé par les recruteurs pour extraire et structurer les informations clés de votre CV, afin de faciliter leur travail. Un CV bien optimisé avec les bons mots-clés sera mieux mis en valeur auprès du recruteur.",
                },
                {
                  q: "Quels formats de CV sont acceptés ?",
                  r: "JobBoost accepte les fichiers PDF et DOCX jusqu'à 5 Mo, ainsi que le copier-coller de texte brut. Les PDF scannés (images sans couche texte) ne sont pas supportés.",
                },
                {
                  q: "Puis-je annuler mon abonnement à tout moment ?",
                  r: "Oui, sans engagement. Vous pouvez annuler depuis la page Mon abonnement. L'accès reste actif jusqu'à la fin de la période payée.",
                },
              ].map(({ q, r }, i) => (
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

      <Footer />

    </div>
  );
}
