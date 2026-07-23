"use client";

import { useState } from "react";

/** Bloc de prompt copiable en un clic — pensé pour le trafic mobile (Instagram) */
export default function BlocPrompt({ texte }: { texte: string }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible (vieux navigateur) — on ignore silencieusement
    }
  }

  return (
    <div className="relative my-8">
      <div className="flex items-center justify-between bg-gray-800 rounded-t-2xl px-5 py-2.5">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prompt</span>
        <button
          onClick={copier}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
            copie
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
          aria-label="Copier le prompt"
        >
          {copie ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copié !
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copier
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 rounded-b-2xl p-6 text-sm leading-7 whitespace-pre-wrap overflow-x-auto font-mono">
        {texte}
      </pre>
    </div>
  );
}
