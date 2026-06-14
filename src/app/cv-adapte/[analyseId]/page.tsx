"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import CVPreview from "@/components/CVPreview";
import { CVStructure } from "@/types/cv";

type PageData = {
  nom_offre: string;
  score: number | null;
  score_apres: number | null;
  mots_cles_manquants: string[];
  mots_cles_presents: string[];
  mots_cles_apres_manquants: string[] | null;
  mots_cles_apres_presents: string[] | null;
  cv_data: CVStructure | null;
  cv_original: CVStructure | null;
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

function extraireMod(texte: string): string[] {
  return [...texte.matchAll(/\[MOD\](.*?)\[\/MOD\]/g)].map((m) => m[1]);
}

function nettoyerMod(texte: string): string {
  return texte.replace(/\[MOD\](.*?)\[\/MOD\]/g, "$1").trim();
}

export default function CvAdaptePage() {
  const router = useRouter();
  const params = useParams();
  const analyseId = params.analyseId as string;

  const [data, setData] = useState<PageData | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [exportEnCours, setExportEnCours] = useState<"pdf" | "docx" | null>(null);
  const [scoreApres, setScoreApres] = useState<number | null>(null);
  const [motsClesApresManquants, setMotsClesApresManquants] = useState<string[] | null>(null);
  const [motsClesApresPresents, setMotsClesApresPresents] = useState<string[] | null>(null);

  useEffect(() => {
    fetch(`/api/cv-adapte/${analyseId}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d: PageData) => {
        setData(d);
        setScoreApres(d.score_apres);
        setMotsClesApresManquants(d.mots_cles_apres_manquants);
        setMotsClesApresPresents(d.mots_cles_apres_presents);
      })
      .catch(() => setErreur("Impossible de charger le CV adapté."))
      .finally(() => setChargement(false));
  }, [analyseId]);

  useEffect(() => {
    if (!data || scoreApres !== null) return;
    const interval = setInterval(() => {
      fetch(`/api/cv-adapte/${analyseId}`)
        .then((r) => r.json())
        .then((d: PageData) => {
          if (d.score_apres !== null) {
            setScoreApres(d.score_apres);
            setMotsClesApresManquants(d.mots_cles_apres_manquants);
            setMotsClesApresPresents(d.mots_cles_apres_presents);
            clearInterval(interval);
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, [analyseId, data, scoreApres]);

  async function exporterCV(format: "pdf" | "docx") {
    if (!data?.cv_data) return;
    setExportEnCours(format);
    try {
      const res = await fetch("/api/exporter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv: data.cv_data, format }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nom = (data.cv_data.nom || "cv").toLowerCase().replace(/\s+/g, "_");
      a.href = url;
      a.download = `${nom}_cv.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExportEnCours(null);
    }
  }

  if (chargement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm font-medium">Chargement de votre CV adapté...</span>
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
    scoreApres !== null && data.score !== null ? scoreApres - data.score : null;

  // Analyse des modifications
  type Reformulation = { champ: string; avant: string; apres: string };
  const reformulations: Reformulation[] = [];

  if (data.cv_data) {
    if (data.cv_data.titre && /\[MOD\]/.test(data.cv_data.titre)) {
      const apres = nettoyerMod(data.cv_data.titre);
      const avant = nettoyerMod(data.cv_original?.titre || "—");
      if (apres !== avant) reformulations.push({ champ: "Titre", avant, apres });
    }

    (data.cv_data.experiences || []).forEach((exp, i) => {
      if (/\[MOD\]/.test(exp.poste)) {
        const apres = nettoyerMod(exp.poste);
        const avant = nettoyerMod(data.cv_original?.experiences?.[i]?.poste || "—");
        if (apres !== avant) reformulations.push({ champ: "Expérience", avant, apres });
      }
    });
  }

  const ajoutsProfil = extraireMod(data.cv_data?.resume || "");
  const ajoutsMissions = (data.cv_data?.experiences || []).flatMap((e) =>
    e.missions.flatMap((m) => extraireMod(m))
  );
  const ajoutsCompetences = [
    ...(data.cv_data?.competences?.techniques || []),
    ...(data.cv_data?.competences?.autres || []),
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
    ? `Votre CV a reçu ${totalMods} modification${totalMods > 1 ? "s" : ""} ciblées, faisant passer le score ATS de ${data.score ?? "—"} à ${scoreApres ?? "—"}${gainScore && gainScore > 0 ? ` (+${gainScore} points)` : ""}. ${insightsStr ? `Concrètement : ${insightsStr}.` : ""}`
    : `Votre CV a été optimisé pour correspondre aux critères ATS de cette offre.`;

  const motsClesAjoutes = (motsClesApresPresents ?? []).filter(
    (m) => !(data.mots_cles_presents ?? []).includes(m)
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <span className="text-gray-300 hidden sm:block">/</span>
            <span className="text-sm font-semibold text-gray-800 truncate hidden sm:block max-w-xs">{data.nom_offre}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => exporterCV("pdf")}
              disabled={exportEnCours !== null || !data.cv_data}
              className="flex items-center gap-1.5 text-sm font-semibold bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportEnCours === "pdf" ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              )}
              <span className="hidden sm:inline">Télécharger </span>PDF
            </button>
            <button
              onClick={() => exporterCV("docx")}
              disabled={exportEnCours !== null || !data.cv_data}
              className="flex items-center gap-1.5 text-sm font-semibold bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportEnCours === "docx" ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              )}
              <span className="hidden sm:inline">Télécharger </span>Word
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {data.cv_data ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">

            {/* Colonne gauche — Analyse */}
            <div className="flex flex-col gap-4">

              {/* Score ATS */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Score ATS</p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs text-gray-400">Avant</p>
                    <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(data.score)}`}>
                      <span className="text-2xl font-black">{data.score ?? "—"}</span>
                      <span className="text-[10px] font-semibold text-gray-400">/ 100</span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs text-gray-400">Après</p>
                    {scoreApres !== null ? (
                      <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ring-4 bg-white ${ringScore(scoreApres)}`}>
                        <span className="text-2xl font-black">{scoreApres}</span>
                        <span className="text-[10px] font-semibold text-gray-400">/ 100</span>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full ring-4 ring-gray-100 bg-white flex items-center justify-center">
                        <svg className="animate-spin w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                      </div>
                    )}
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

                {/* Mots-clés */}
                {(motsClesAjoutes.length > 0 || (motsClesApresManquants && motsClesApresManquants.length > 0)) && (
                  <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                    {motsClesAjoutes.length > 0 && (
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-2">Mots-clés ajoutés ({motsClesAjoutes.length})</p>
                        <div className="flex flex-wrap gap-1.5">
                          {motsClesAjoutes.map((m) => (
                            <span key={m} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {motsClesApresManquants && motsClesApresManquants.length > 0 && (
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-2">Encore manquants ({motsClesApresManquants.length})</p>
                        <div className="flex flex-wrap gap-1.5">
                          {motsClesApresManquants.map((m) => (
                            <span key={m} className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Retour dashboard */}
              <div className="flex justify-center pb-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-50 ring-1 ring-gray-200 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour au dashboard
                </Link>
              </div>
            </div>

            {/* Colonne droite — CV complet visible */}
            <div className="bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm overflow-hidden lg:sticky lg:top-20">
              <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100 bg-indigo-50/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => exporterCV("pdf")} disabled={exportEnCours !== null} className="flex items-center gap-1.5 text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">PDF</button>
                  <button onClick={() => exporterCV("docx")} disabled={exportEnCours !== null} className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">Word</button>
                </div>
              </div>
              <div className="p-4">
                <CVPreview cv={data.cv_data} showHighlights />
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-8 text-center text-gray-400 text-sm">
            CV adapté non disponible.
          </div>
        )}
      </div>
    </div>
  );
}
