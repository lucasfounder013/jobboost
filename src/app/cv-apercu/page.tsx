"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CVPreview from "@/components/CVPreview";
import { CVStructure } from "@/types/cv";

type AperuData = {
  cvAdapte: CVStructure;
  cvOriginal: CVStructure | null;
  scoreBefore: number | null;
  scoreAfter: number | null;
};

type AperuParams = {
  cv: string;
  offre: string;
  motsClesManquants: string[];
  scoreBefore: number | null;
};

function ringScore(score: number | null | undefined): string {
  if (score == null) return "ring-gray-200 text-gray-500";
  if (score <= 20) return "ring-rose-300 text-rose-700";
  if (score <= 40) return "ring-orange-300 text-orange-700";
  if (score <= 60) return "ring-amber-300 text-amber-700";
  if (score <= 75) return "ring-blue-300 text-blue-700";
  if (score <= 89) return "ring-emerald-300 text-emerald-700";
  return "ring-violet-300 text-violet-700";
}

const MESSAGES_ATTENTE = [
  "Analyse de votre profil en cours...",
  "Intégration des mots-clés ATS...",
  "Reformulation des expériences...",
  "Optimisation pour les recruteurs...",
  "Finalisation de votre CV...",
];

export default function CvApercuPage() {
  const router = useRouter();
  const [data, setData] = useState<AperuData | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const rawResult = sessionStorage.getItem("cvApercu");
    const rawParams = sessionStorage.getItem("cvApercuParams");

    if (rawResult) {
      // Résultat déjà disponible
      try {
        setData(JSON.parse(rawResult));
        setChargement(false);
      } catch {
        router.replace("/analyses");
      }
      return;
    }

    if (rawParams) {
      // Mode chargement : faire l'appel API depuis cette page
      let params: AperuParams;
      try {
        params = JSON.parse(rawParams);
      } catch {
        router.replace("/analyses");
        return;
      }

      sessionStorage.removeItem("cvApercuParams");

      // Rotation des messages d'attente
      intervalRef.current = setInterval(() => {
        setMessageIndex((i) => (i + 1) % MESSAGES_ATTENTE.length);
      }, 2200);

      (async () => {
        try {
          // Génération du CV
          const reponse = await fetch("/api/adapter-cv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cv: params.cv,
              offre: params.offre,
              motsClesManquants: params.motsClesManquants,
              reponses: [],
            }),
          });
          const result = await reponse.json();
          if (!reponse.ok) throw new Error(result.error);

          // Calcul du score après adaptation
          let scoreApres: number | null = null;
          try {
            const cvTexteApres = Object.values(result.cvAdapte as Record<string, unknown>)
              .flat()
              .filter((v) => typeof v === "string")
              .join(" ");
            const resScore = await fetch("/api/analyser-interne", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cv: cvTexteApres, offre: params.offre }),
            });
            if (resScore.ok) {
              const ds = await resScore.json();
              scoreApres = ds.score ?? null;
            }
          } catch {}

          const aperuData: AperuData = {
            cvAdapte: result.cvAdapte,
            cvOriginal: result.cvOriginal ?? null,
            scoreBefore: params.scoreBefore,
            scoreAfter: scoreApres,
          };
          sessionStorage.setItem("cvApercu", JSON.stringify(aperuData));
          setData(aperuData);
        } catch (e) {
          setErreur(e instanceof Error ? e.message : "Une erreur est survenue.");
        } finally {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setChargement(false);
        }
      })();

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    // Ni params ni result → retour dashboard
    router.replace("/analyses");
  }, [router]);

  if (chargement) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-8 px-6">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          {/* Spinner animé */}
          <div className="relative w-20 h-20">
            <svg className="animate-spin w-20 h-20 text-indigo-200" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="animate-spin w-20 h-20 text-indigo-500 absolute inset-0" fill="none" viewBox="0 0 24 24" style={{ animationDuration: "1s" }}>
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-2">Adaptation de votre CV en cours</p>
            <p className="text-sm text-indigo-500 font-medium transition-all duration-500">
              {MESSAGES_ATTENTE[messageIndex]}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Cette opération prend généralement 15 à 30 secondes.<br />
            Ne fermez pas cette page.
          </p>
        </div>
      </div>
    );
  }

  if (erreur || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{erreur || "Données introuvables."}</p>
          <Link href="/analyses" className="text-indigo-600 font-semibold hover:underline">← Retour aux analyses</Link>
        </div>
      </div>
    );
  }

  const gainScore =
    data.scoreAfter !== null && data.scoreBefore !== null
      ? data.scoreAfter - data.scoreBefore
      : null;

  function extraireMod(texte: string): string[] {
    return [...texte.matchAll(/\[MOD\](.*?)\[\/MOD\]/g)].map((m) => m[1]);
  }

  function nettoyerMod(texte: string): string {
    return texte.replace(/\[MOD\](.*?)\[\/MOD\]/g, "$1").trim();
  }

  // Reformulations = champs entiers réécrits (titre, postes)
  type Reformulation = { champ: string; avant: string; apres: string };
  const reformulations: Reformulation[] = [];

  if (data.cvAdapte.titre && /\[MOD\]/.test(data.cvAdapte.titre)) {
    const apres = nettoyerMod(data.cvAdapte.titre);
    const avant = nettoyerMod(data.cvOriginal?.titre || "—");
    if (apres !== avant) reformulations.push({ champ: "Titre", avant, apres });
  }

  (data.cvAdapte.experiences || []).forEach((exp, i) => {
    if (/\[MOD\]/.test(exp.poste)) {
      const apres = nettoyerMod(exp.poste);
      const avant = nettoyerMod(data.cvOriginal?.experiences?.[i]?.poste || "—");
      if (apres !== avant) reformulations.push({ champ: "Expérience", avant, apres });
    }
  });

  // Ajouts = nouveaux contenus intégrés (profil, missions, compétences)
  const ajoutsProfil = extraireMod(data.cvAdapte.resume || "");
  const ajoutsMissions = (data.cvAdapte.experiences || []).flatMap((e) =>
    e.missions.flatMap((m) => extraireMod(m))
  );
  const ajoutsCompetences = [
    ...(data.cvAdapte.competences?.techniques || []),
    ...(data.cvAdapte.competences?.autres || []),
  ].flatMap((c) => extraireMod(c));
  const ajouts = [...ajoutsProfil, ...ajoutsMissions, ...ajoutsCompetences];

  const totalMods = reformulations.length + ajouts.length;



  const insightsStr = [
    reformulations.length > 0 && `${reformulations.length} intitulé${reformulations.length > 1 ? "s reformulés" : " reformulé"} pour mieux correspondre au poste`,
    ajoutsMissions.length > 0 && `${ajoutsMissions.length} mission${ajoutsMissions.length > 1 ? "s enrichies" : " enrichie"} avec des mots-clés spécifiques à l'offre`,
    ajoutsCompetences.length > 0 && `${ajoutsCompetences.length} compétence${ajoutsCompetences.length > 1 ? "s optimisées" : " optimisée"}`,
    ajoutsProfil.length > 0 && `le profil retravaillé avec des formulations ciblées`,
  ].filter(Boolean).join(", ");

  const analyseTexte = totalMods > 0
    ? `Votre CV a reçu ${totalMods} modification${totalMods > 1 ? "s" : ""} ciblées, faisant passer le score de correspondance de ${data.scoreBefore ?? "—"} à ${data.scoreAfter ?? "—"}${gainScore && gainScore > 0 ? ` (+${gainScore} points)` : ""}. ${insightsStr ? `Concrètement : ${insightsStr}.` : ""}`
    : `Votre CV a été analysé et optimisé pour correspondre au mieux à l'offre d'emploi.`;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/analyses"
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Analyses
            </Link>
            <span className="text-gray-300 hidden sm:block">/</span>
            <span className="text-sm font-semibold text-gray-800 hidden sm:block">Aperçu CV adapté</span>
          </div>
          <Link
            href="/pricing"
            className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm shrink-0"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="hidden xs:inline sm:inline">Débloquer le CV complet</span>
            <span className="sm:hidden">Débloquer</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">

          {/* Colonne gauche — Analyse IA */}
          <div className="flex flex-col gap-4">

            {/* Score avant / après */}
            <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Score de correspondance</p>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-gray-400">Avant</p>
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(data.scoreBefore)}`}>
                    <span className="text-2xl font-black">{data.scoreBefore ?? "—"}</span>
                    <span className="text-[10px] font-semibold text-gray-400">/ 100</span>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-gray-400">Après</p>
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(data.scoreAfter)}`}>
                    <span className="text-2xl font-black">{data.scoreAfter ?? "—"}</span>
                    <span className="text-[10px] font-semibold text-gray-400">/ 100</span>
                  </div>
                </div>
                {gainScore !== null && gainScore > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 ring-1 ring-emerald-200 rounded-xl">
                    <span className="text-emerald-600 font-black text-xl">+{gainScore}</span>
                    <span className="text-emerald-700 text-sm font-semibold">pts gagnés</span>
                  </div>
                )}
              </div>
            </div>

            {/* Améliorations */}
            <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Améliorations</p>
                {totalMods > 0 && (
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 ring-1 ring-indigo-200 px-2.5 py-1 rounded-full">{totalMods} modification{totalMods > 1 ? "s" : ""}</span>
                )}
              </div>

              {/* Analyse globale */}
              <p className="text-sm text-gray-600 leading-relaxed">{analyseTexte}</p>

              {/* Reformulations */}
              {reformulations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">Reformulations</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {reformulations.map((ref, i) => (
                      <div key={i} className="flex flex-col gap-1 p-3 bg-violet-50/60 rounded-xl border border-violet-100">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-0.5">{ref.champ}</p>
                        <p className="text-xs text-gray-400 line-through leading-snug">{ref.avant}</p>
                        <p className="text-sm text-gray-800 font-medium leading-snug">{ref.apres}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ajouts */}
              {ajouts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Ajouts</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {ajouts.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <p className="text-sm text-gray-700 leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA débloquer */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <p className="text-white font-bold text-lg mb-1">Votre CV adapté est prêt ✨</p>
                <p className="text-indigo-200 text-sm">Téléchargez-le en PDF ou Word pour maximiser vos chances d&apos;entretien.</p>
              </div>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-5 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Débloquer mon CV complet →
              </Link>
            </div>

          </div>

          {/* Colonne droite — CV adapté réduit avec blur */}
          <div className="bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm overflow-hidden lg:sticky lg:top-20">
            <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100 bg-indigo-50/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté</p>
              </div>
              <div className="flex items-center gap-2">
                {data.scoreAfter !== null && (
                  <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ring-2 bg-white ${ringScore(data.scoreAfter)}`}>
                    <span className="text-sm font-black">{data.scoreAfter}</span>
                    <span className="text-[10px] font-semibold opacity-50">/ 100</span>
                  </div>
                )}
                <Link href="/pricing" className="flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-2 py-1 rounded-lg hover:opacity-90 transition-opacity">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Débloquer
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "118%", marginBottom: "-15%" }}>
              <CVPreview cv={data.cvAdapte} showHighlights />
              <div className="absolute inset-x-0 top-[38%] h-28 bg-gradient-to-b from-transparent to-white/80 pointer-events-none" />
              <div className="absolute inset-x-0 top-[43%] bottom-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
