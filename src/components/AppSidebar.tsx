"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export type QuotasSidebar = {
  scans: number;
  credits: number;
  lmCredits: number;
  rhCredits: number;
  planType: "starter" | "pro" | null;
  estAbonne: boolean;
};

export type AppSidebarActive =
  | "dashboard"
  | "analyses"
  | "entretien"
  | "mail-pro"
  | "cv"
  | "abonnement";

type Props = {
  active: AppSidebarActive;
  quotas: QuotasSidebar | null;
  ouverte: boolean;
  onFermer: () => void;
};

export default function AppSidebar({ active, quotas, ouverte, onFermer }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const itemActifClasses = "bg-indigo-800 text-white";
  const itemInactifClasses = "text-indigo-200 hover:bg-indigo-800/60 hover:text-white";

  return (
    <>
      {ouverte && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onFermer}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-indigo-950 flex flex-col z-40 shrink-0 transition-transform duration-300 md:translate-x-0 ${
          ouverte ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-5 border-b border-indigo-900">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              Rivjob
            </span>
          </Link>
        </div>

        <div className="px-4 pt-5 flex flex-col gap-2">
          <Link
            href="/analyses?vue=nouvelle-analyse"
            onClick={onFermer}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle analyse
          </Link>

          {quotas && (() => {
            const { planType, scans, credits, lmCredits, rhCredits, estAbonne } = quotas;
            const limiteScans = planType === "pro" ? 50 : planType === "starter" ? 15 : 3;
            const limiteCredits = planType === "pro" ? 50 : planType === "starter" ? 10 : 0;
            const limiteLm = planType === "pro" ? 50 : planType === "starter" ? 10 : 0;
            const limiteRh = planType === "pro" ? 10 : planType === "starter" ? 2 : 3;
            return (
              <div className="bg-indigo-900/50 rounded-xl px-3 py-2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-300">Analyses</span>
                  <span className="font-bold text-white">{scans}/{limiteScans}</span>
                </div>
                <div className="w-full bg-indigo-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all bg-indigo-400"
                    style={{ width: `${Math.max(0, Math.min(100, (scans / limiteScans) * 100))}%` }}
                  />
                </div>
                {limiteCredits > 0 && (
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-indigo-300">Adaptation CV</span>
                    <span className="font-bold text-white">{credits}/{limiteCredits}</span>
                  </div>
                )}
                {limiteCredits === 0 && credits > 0 && (
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-indigo-300">Adaptation CV</span>
                    <span className="font-bold text-white">{credits} crédit</span>
                  </div>
                )}
                {limiteLm > 0 && (
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-indigo-300">Lettre de motivation</span>
                    <span className="font-bold text-white">{lmCredits}/{limiteLm}</span>
                  </div>
                )}
                {limiteLm === 0 && lmCredits > 0 && (
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-indigo-300">Lettre de motivation</span>
                    <span className="font-bold text-white">{lmCredits} crédit</span>
                  </div>
                )}
                {rhCredits > 0 && (
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-indigo-300">Trouver un mail pro</span>
                    <span className="font-bold text-white">{rhCredits}/{limiteRh}</span>
                  </div>
                )}
                {!estAbonne && scans <= 2 && (
                  <Link
                    href="/pricing"
                    className="mt-1 text-center text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-800/60 hover:bg-indigo-700/60 rounded-lg py-1.5 transition-colors"
                  >
                    Passer à l&apos;abonnement →
                  </Link>
                )}
              </div>
            );
          })()}
        </div>

        <nav className="flex-1 px-3 pt-6 flex flex-col gap-1">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest px-2 mb-2">
            Menu
          </p>

          <Link
            href="/dashboard"
            onClick={onFermer}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm w-full text-left transition-colors ${
              active === "dashboard" ? itemActifClasses : itemInactifClasses
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z" />
            </svg>
            Dashboard
          </Link>

          <Link
            href="/analyses"
            onClick={onFermer}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm w-full text-left transition-colors ${
              active === "analyses" ? itemActifClasses : itemInactifClasses
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analyses
          </Link>

          <Link
            href="/analyses?vue=preparer-entretien"
            onClick={onFermer}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm w-full text-left transition-colors ${
              active === "entretien" ? itemActifClasses : itemInactifClasses
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Préparer mon entretien
          </Link>

          <Link
            href="/analyses?vue=trouver-rh"
            onClick={onFermer}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm w-full text-left transition-colors ${
              active === "mail-pro" ? itemActifClasses : itemInactifClasses
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Trouver un mail pro
          </Link>

          <Link
            href="/modeles-cv"
            onClick={onFermer}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              active === "cv" ? itemActifClasses : itemInactifClasses
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Créer un CV
          </Link>

          <Link
            href="/abonnement"
            onClick={onFermer}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              active === "abonnement" ? itemActifClasses : itemInactifClasses
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Mon abonnement
          </Link>
        </nav>

        <div className="px-4 pb-5 border-t border-indigo-900 pt-4">
          {session?.user?.email && (
            <p className="text-indigo-400 text-xs truncate mb-3">{session.user.email}</p>
          )}
          <a
            href="mailto:contact@rivjob.ai"
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-200 text-xs font-medium transition-colors mb-3"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
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
    </>
  );
}
