"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const FEATURES_GRATUIT = [
  "5 analyses CV gratuites",
  "1 adaptation CV gratuite",
  "Export PDF ATS",
  "Export Word (.docx)",
];

const FEATURES_PREMIUM = [
  "Analyses CV illimitées",
  "Adaptations CV illimitées",
  "Export PDF ATS",
  "Export Word (.docx)",
  "Score de correspondance détaillé",
];

function Check({ color = "emerald" }: { color?: "emerald" | "gray" }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${color === "emerald" ? "text-emerald-500" : "text-gray-300"}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PageAbonnement() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [chargementPlan, setChargementPlan] = useState<"hebdo" | "mensuel" | null>(null);
  const [chargementPortail, setChargementPortail] = useState(false);
  const [erreur, setErreur] = useState("");

  const estAbonne = (session?.user as { isSubscribed?: boolean } | undefined)?.isSubscribed ?? false;

  async function souscrire(plan: "hebdo" | "mensuel") {
    if (!session) {
      router.push("/register");
      return;
    }
    setChargementPlan(plan);
    setErreur("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.error ?? "Erreur lors de la création du paiement.");
        setChargementPlan(null);
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setErreur("Erreur lors de la connexion au serveur de paiement.");
      setChargementPlan(null);
    }
  }

  async function ouvrirPortail() {
    setChargementPortail(true);
    setErreur("");
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.error ?? "Une erreur est survenue.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setErreur("Impossible de contacter le serveur.");
    } finally {
      setChargementPortail(false);
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-lg">⚡</span>
            <span className="text-base font-bold tracking-tight text-gray-900">JobBoost</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
            ← Retour
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Mon abonnement</h1>
        <p className="text-gray-400 text-sm mb-10">{session.user.email}</p>

        {erreur && <p className="text-red-500 text-sm mb-6">{erreur}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Plan Gratuit */}
          <div className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 ${
            !estAbonne ? "ring-2 ring-emerald-400" : "ring-1 ring-gray-200"
          }`}>
            {!estAbonne && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Plan actuel
              </span>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Gratuit</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-gray-900">0€</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {FEATURES_GRATUIT.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                  <Check color="gray" />
                  {f}
                </li>
              ))}
            </ul>
            <div className={`w-full py-2.5 rounded-xl text-xs font-bold text-center ${
              !estAbonne
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-400"
            }`}>
              {!estAbonne ? "Actif" : "Plan de base"}
            </div>
          </div>

          {/* Plan Hebdomadaire */}
          <div className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 ${
            estAbonne ? "ring-1 ring-gray-200" : "ring-1 ring-gray-200"
          }`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Hebdomadaire</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-gray-900">4,99€</span>
                <span className="text-gray-400 text-xs mb-1">/sem</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {FEATURES_PREMIUM.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            {estAbonne ? (
              <button
                onClick={ouvrirPortail}
                disabled={chargementPortail}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                {chargementPortail ? "Chargement…" : "Gérer →"}
              </button>
            ) : (
              <button
                onClick={() => souscrire("hebdo")}
                disabled={chargementPlan !== null}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                {chargementPlan === "hebdo" ? "Redirection…" : "Choisir ce plan"}
              </button>
            )}
          </div>

          {/* Plan Mensuel */}
          <div className="relative bg-white rounded-2xl p-6 flex flex-col gap-4 ring-2 ring-indigo-500">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-0.5 rounded-full">
              Recommandé
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Mensuel</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-gray-900">9,99€</span>
                <span className="text-gray-400 text-xs mb-1">/mois</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {FEATURES_PREMIUM.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            {estAbonne ? (
              <button
                onClick={ouvrirPortail}
                disabled={chargementPortail}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60"
              >
                {chargementPortail ? "Chargement…" : "Gérer →"}
              </button>
            ) : (
              <button
                onClick={() => souscrire("mensuel")}
                disabled={chargementPlan !== null}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60"
              >
                {chargementPlan === "mensuel" ? "Redirection…" : "Choisir ce plan"}
              </button>
            )}
          </div>

        </div>

        {estAbonne && (
          <p className="text-center text-xs text-gray-400 mt-8">
            Paiement sécurisé par Stripe · Résiliation en 1 clic depuis le portail
          </p>
        )}

        {!estAbonne && (
          <p className="text-center text-xs text-gray-400 mt-8">
            Paiement sécurisé par Stripe · Sans engagement · Résiliation en 1 clic
          </p>
        )}
      </main>
    </div>
  );
}
