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
        router.replace("/dashboard");
      }
      return;
    }

    if (rawParams) {
      // Mode chargement : faire l'appel API depuis cette page
      let params: AperuParams;
      try {
        params = JSON.parse(rawParams);
      } catch {
        router.replace("/dashboard");
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
    router.replace("/dashboard");
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
          <Link href="/dashboard" className="text-indigo-600 font-semibold hover:underline">← Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  const gainScore =
    data.scoreAfter !== null && data.scoreBefore !== null
      ? data.scoreAfter - data.scoreBefore
      : null;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-gray-800">Aperçu CV adapté</span>
          </div>
          <Link
            href="/pricing"
            className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Débloquer le CV complet
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* CV côte à côte */}
        <div className={data.cvOriginal ? "grid grid-cols-2 gap-4 items-start" : "flex flex-col gap-6"}>

          {/* CV original */}
          {data.cvOriginal && (
            <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">CV original</p>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full ring-2 bg-white ${ringScore(data.scoreBefore)}`}>
                  <span className="text-base font-black">{data.scoreBefore ?? "—"}</span>
                  <span className="text-[10px] font-semibold opacity-50">/ 100</span>
                </div>
              </div>
              <div>
                <CVPreview cv={data.cvOriginal} fluid />
              </div>
            </div>
          )}

          {/* CV adapté avec blur */}
          <div className="bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-indigo-100 bg-indigo-50/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté ATS</p>
              </div>
              <div className="flex items-center gap-3">
                {data.scoreAfter !== null && (
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ring-2 bg-white ${ringScore(data.scoreAfter)}`}>
                    <span className="text-base font-black">{data.scoreAfter}</span>
                    <span className="text-[10px] font-semibold opacity-50">/ 100</span>
                  </div>
                )}
                {gainScore !== null && gainScore > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 rounded-full">+{gainScore} pts</span>
                )}
                <Link href="/pricing" className="flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-2.5 py-1 rounded-lg hover:opacity-90 transition-opacity">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Débloquer
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <CVPreview cv={data.cvAdapte} fluid={!!data.cvOriginal} showHighlights />
              <div className="absolute inset-x-0 top-[28%] h-28 bg-gradient-to-b from-transparent to-white/80 pointer-events-none" />
              <div className="absolute inset-x-0 top-[33%] bottom-0 backdrop-blur-sm bg-white/50 pointer-events-none" />
              <div className="absolute inset-x-0 top-[33%] bottom-0 flex flex-col items-center justify-center gap-4 p-6 z-10">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800 mb-1">Votre CV adapté est prêt ✨</p>
                  <p className="text-sm text-gray-500">Téléchargez-le en PDF ou Word pour maximiser vos chances</p>
                </div>
                <Link href="/pricing" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg hover:opacity-90 transition-opacity">
                  Débloquer mon CV complet →
                </Link>
              </div>
            </div>
          </div>

          {/* Score isolé (fallback sans cvOriginal) */}
          {!data.cvOriginal && (
            <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Score ATS</p>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-gray-400">Avant</p>
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(data.scoreBefore)}`}>
                    <span className="text-2xl font-black">{data.scoreBefore ?? "—"}</span>
                    <span className="text-[10px] font-semibold text-gray-400">/ 100</span>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-gray-400">Après adaptation</p>
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(data.scoreAfter)}`}>
                    <span className="text-2xl font-black">{data.scoreAfter ?? "—"}</span>
                    <span className="text-[10px] font-semibold text-gray-400">/ 100</span>
                  </div>
                </div>
                {gainScore !== null && gainScore > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 ring-1 ring-emerald-200 rounded-xl">
                    <span className="text-emerald-600 font-black text-xl">+{gainScore}</span>
                    <span className="text-emerald-700 text-sm font-semibold">points gagnés</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
