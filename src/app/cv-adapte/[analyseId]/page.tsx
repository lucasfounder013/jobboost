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
};

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

  // Polling si score_apres pas encore calculé
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

  const motsClesAjoutes = (motsClesApresPresents ?? []).filter(
    (m) => !(data.mots_cles_presents ?? []).includes(m)
  );
  const motsClesRetires = (data.mots_cles_manquants ?? []).filter(
    (m) => !(motsClesApresManquants ?? []).includes(m)
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-gray-800 truncate max-w-xs">{data.nom_offre}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exporterCV("pdf")}
              disabled={exportEnCours !== null || !data.cv_data}
              className="flex items-center gap-1.5 text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportEnCours === "pdf" ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              )}
              Télécharger PDF
            </button>
            <button
              onClick={() => exporterCV("docx")}
              disabled={exportEnCours !== null || !data.cv_data}
              className="flex items-center gap-1.5 text-sm font-semibold bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportEnCours === "docx" ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              )}
              Télécharger Word
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* Score ATS */}
        <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Score ATS</p>
          <div className="flex items-center gap-8 flex-wrap">
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
          </div>
        </div>

        {/* Mots-clés */}
        {(motsClesAjoutes.length > 0 || motsClesRetires.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {motsClesAjoutes.length > 0 && (
              <div className="bg-white rounded-2xl ring-1 ring-emerald-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Mots-clés ajoutés <span className="text-emerald-600 font-bold">({motsClesAjoutes.length})</span></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {motsClesAjoutes.map((m) => (
                    <span key={m} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold">{m}</span>
                  ))}
                </div>
              </div>
            )}
            {motsClesApresManquants && motsClesApresManquants.length > 0 && (
              <div className="bg-white rounded-2xl ring-1 ring-amber-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Encore manquants <span className="text-amber-600 font-bold">({motsClesApresManquants.length})</span></p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {motsClesApresManquants.map((m) => (
                    <span key={m} className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full text-xs font-semibold">{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CV Preview */}
        {data.cv_data ? (
          <div className="bg-white rounded-2xl ring-1 ring-indigo-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-100 bg-indigo-50/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CV adapté pour les ATS</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exporterCV("pdf")}
                  disabled={exportEnCours !== null}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  PDF
                </button>
                <button
                  onClick={() => exporterCV("docx")}
                  disabled={exportEnCours !== null}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Word
                </button>
              </div>
            </div>
            <div className="p-4">
              <CVPreview cv={data.cv_data} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-8 text-center text-gray-400 text-sm">
            CV adapté non disponible.
          </div>
        )}

        {/* Bouton retour dashboard */}
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
    </div>
  );
}
