"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
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

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-indigo-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">

            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              JobBoost
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/ressources"
              className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150"
            >
              Ressources
            </Link>
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

        {/* Comment ça marche */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-12">
              Comment ça marche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  ),
                  titre: "Importez votre CV",
                  desc: "PDF, DOCX ou copier-coller — en quelques secondes.",
                },
                {
                  num: "2",
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  ),
                  titre: "Analysez la correspondance",
                  desc: "Niveau qualitatif + mots-clés manquants vs l'offre.",
                },
                {
                  num: "3",
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  titre: "Adaptez et exportez",
                  desc: "CV réécrit par IA, téléchargeable en PDF ou Word.",
                },
              ].map(({ num, icon, titre, desc }) => (
                <div key={num} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-7 flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">{num}</span>
                    {icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{titre}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                  r: "Oui. L'analyse CV vs offre (score + mots-clés manquants) est gratuite pour les 5 premières analyses. L'adaptation du CV par l'IA inclut 1 essai gratuit. Au-delà, un abonnement hebdomadaire (4,99 €) ou mensuel (9,99 €) débloque les analyses et adaptations illimitées.",
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
