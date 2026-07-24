"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const FEATURES_GRATUIT = [
  "Dashboard complet",
  "3 analyses de CV",
  "Préparation aux entretiens",
  "Recherche d'offres selon le CV",
];

const FEATURES_MENSUEL = [
  "30 analyses de CV / mois",
  "15 adaptations de CV / mois",
  "15 lettres de motivation / mois",
  "3 révélations d'email / mois",
  "Export PDF & Word (.docx)",
  "Préparation aux entretiens",
];

const FEATURES_LIFETIME = [
  "Analyses de CV illimitées",
  "Adaptations de CV illimitées",
  "Lettres de motivation illimitées",
  "Révélations d'email illimitées",
  "Export PDF & Word (.docx)",
  "Toutes les futures fonctionnalités",
];

type PlanType = "monthly" | "lifetime" | null;

function Check({ color = "emerald" }: { color?: "emerald" | "gray" | "white" }) {
  const cls = color === "emerald" ? "text-emerald-500" : color === "white" ? "text-white" : "text-gray-300";
  return (
    <svg className={`w-4 h-4 shrink-0 ${cls}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PageAbonnement() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [chargementPlan, setChargementPlan] = useState<"monthly" | "lifetime" | null>(null);
  const [chargementPortail, setChargementPortail] = useState(false);
  const [erreur, setErreur] = useState("");

  const [planType, setPlanType] = useState<PlanType>(null);
  const [statutCharge, setStatutCharge] = useState(false);
  const estAbonne = planType === "monthly";
  const estLifetime = planType === "lifetime";
  const chargementStatut = !!session && !statutCharge;

  useEffect(() => {
    if (isPending || !session) return;
    fetch("/api/user-quotas")
      .then((r) => r.json())
      .then((data) => {
        setPlanType((data.planType as PlanType) ?? null);
      })
      .catch(() => setPlanType(null))
      .finally(() => setStatutCharge(true));
  }, [session, isPending]);

  async function souscrire(plan: "monthly" | "lifetime") {
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

        {estLifetime && (
          <div className="mb-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-100 mb-1">Accès à vie actif</p>
            <p className="font-bold text-lg">Vous avez accès à toutes les fonctionnalités, sans limite, pour toujours.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Plan Gratuit */}
          <div className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 ${
            planType === null ? "ring-2 ring-emerald-400" : "ring-1 ring-gray-200"
          }`}>
            {planType === null && (
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
              planType === null ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
            }`}>
              {planType === null ? "Actif" : "Plan de base"}
            </div>
          </div>

          {/* Plan Lifetime (mis en avant) */}
          <div className={`relative rounded-2xl p-6 flex flex-col gap-4 ${
            estLifetime
              ? "bg-white ring-2 ring-emerald-400"
              : "bg-gradient-to-br from-indigo-600 to-violet-600 text-white ring-2 ring-indigo-500 shadow-lg shadow-indigo-100"
          }`}>
            {estLifetime ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Plan actuel
              </span>
            ) : (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-0.5 rounded-full">
                Meilleure valeur
              </span>
            )}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${estLifetime ? "text-gray-400" : "text-indigo-100"}`}>Accès à vie</p>
              <div className="flex items-end gap-1">
                <span className={`text-3xl font-extrabold ${estLifetime ? "text-gray-900" : "text-white"}`}>29,99€</span>
                <span className={`text-xs mb-1 ${estLifetime ? "text-gray-400" : "text-indigo-100"}`}>une fois</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {FEATURES_LIFETIME.map((f) => (
                <li key={f} className={`flex items-center gap-2 text-xs ${estLifetime ? "text-gray-600" : "text-white"}`}>
                  <Check color={estLifetime ? "emerald" : "white"} />
                  {f}
                </li>
              ))}
            </ul>
            {estLifetime ? (
              <div className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-emerald-50 text-emerald-600">
                Actif à vie
              </div>
            ) : (
              <button
                onClick={() => souscrire("lifetime")}
                disabled={chargementPlan !== null}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-white text-indigo-700 hover:bg-gray-100 transition-colors disabled:opacity-60"
              >
                {chargementPlan === "lifetime" ? "Redirection…" : "Acheter à vie"}
              </button>
            )}
          </div>

          {/* Plan Mensuel */}
          <div className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 ${
            estAbonne ? "ring-2 ring-emerald-400" : "ring-1 ring-gray-200"
          }`}>
            {estAbonne && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Plan actuel
              </span>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Mensuel</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-gray-900">17,99€</span>
                <span className="text-gray-400 text-xs mb-1">/mois</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {FEATURES_MENSUEL.map((f) => (
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
            ) : estLifetime ? (
              <div className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-gray-100 text-gray-400">
                Non requis
              </div>
            ) : (
              <button
                onClick={() => souscrire("monthly")}
                disabled={chargementPlan !== null}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                {chargementPlan === "monthly" ? "Redirection…" : "S'abonner"}
              </button>
            )}
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Paiement sécurisé par Stripe · Résiliation du mensuel en 1 clic
        </p>
      </main>
    </div>
  );
}
