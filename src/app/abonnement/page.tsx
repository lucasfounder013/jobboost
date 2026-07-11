"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const FEATURES_GRATUIT = [
  "3 analyses CV gratuites",
  "3 lettres de motivation",
  "Préparation aux entretiens",
  "Recherche d'offres selon le CV",
];

const FEATURES_STANDARD = [
  "15 analyses CV / mois",
  "10 adaptations CV / mois",
  "10 lettres de motivation / mois",
  "Export PDF & Word (.docx)",
  "Recherche d'offres selon le CV",
  "2 révélations d'email / mois",
];

const FEATURES_PREMIUM = [
  "50 analyses CV / mois",
  "50 adaptations CV / mois",
  "50 lettres de motivation / mois",
  "Export PDF & Word (.docx)",
  "Préparation aux entretiens",
  "Recherche d'offres selon le CV",
  "10 révélations d'email / mois",
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
  const [chargementPlan, setChargementPlan] = useState<"starter" | "pro" | null>(null);
  const [chargementPortail, setChargementPortail] = useState(false);
  const [erreur, setErreur] = useState("");

  // Source de vérité DB : useSession() n'expose pas de façon fiable les additionalFields
  // (planType/isSubscribed) — on fetch /api/analyses qui lit directement la DB.
  const [planType, setPlanType] = useState<"starter" | "pro" | null>(null);
  const [statutCharge, setStatutCharge] = useState(false);
  const estAbonne = planType !== null;
  const chargementStatut = !!session && !statutCharge;

  useEffect(() => {
    if (isPending || !session) return;
    fetch("/api/analyses")
      .then((r) => r.json())
      .then((data) => {
        setPlanType((data.planType as "starter" | "pro" | null) ?? null);
      })
      .catch(() => setPlanType(null))
      .finally(() => setStatutCharge(true));
  }, [session, isPending]);

  async function souscrire(plan: "starter" | "pro") {
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

  if (isPending || chargementStatut) {
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

      {/* Barre mobile */}
      <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <Link href="/analyses" className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="font-bold text-gray-900 text-base">Mon abonnement</span>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <div className="mb-6 hidden md:block">
          <Link href="/analyses" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux analyses
          </Link>
        </div>
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

          {/* Plan Standard */}
          <div className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 ${
            planType === "starter" ? "ring-2 ring-emerald-400" : "ring-1 ring-gray-200"
          }`}>
            {planType === "starter" && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Plan actuel
              </span>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Starter</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-gray-900">4,99€</span>
                <span className="text-gray-400 text-xs mb-1">/mois</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {FEATURES_STANDARD.map((f) => (
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
                onClick={() => souscrire("starter")}
                disabled={chargementPlan !== null}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                {chargementPlan === "starter" ? "Redirection…" : "Choisir ce plan"}
              </button>
            )}
          </div>

          {/* Plan Premium */}
          <div className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 ${
            planType === "pro" ? "ring-2 ring-emerald-400" : "ring-2 ring-indigo-500"
          }`}>
            {planType === "pro" ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Plan actuel
              </span>
            ) : (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Recommandé
              </span>
            )}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${planType === "pro" ? "text-gray-400" : "text-indigo-400"}`}>Pro</p>
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
                onClick={() => souscrire("pro")}
                disabled={chargementPlan !== null}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60"
              >
                {chargementPlan === "pro" ? "Redirection…" : "Choisir ce plan"}
              </button>
            )}
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Paiement sécurisé par Stripe · Sans engagement · Résiliation en 1 clic
        </p>
      </main>
    </div>
  );
}
