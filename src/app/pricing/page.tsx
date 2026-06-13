"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";

const FEATURES_GRATUIT = [
  "3 analyses CV offertes",
  "3 lettres de motivation",
  "Préparation aux entretiens",
  "Recherche d'offres selon le CV",
];

const FEATURES_STANDARD = [
  "50 analyses CV / mois",
  "50 adaptations CV / mois",
  "50 lettres de motivation / mois",
  "Export PDF ATS",
  "Export Word (.docx)",
  "Recherche d'offres selon le CV",
  "20 révélations d'email / mois",
];

const FEATURES_PREMIUM = [
  "Analyses CV illimitées",
  "Adaptations CV illimitées",
  "Lettres de motivation illimitées",
  "Export PDF ATS",
  "Export Word (.docx)",
  "Préparation aux entretiens",
  "Recherche d'offres selon le CV",
  "80 révélations d'email / mois",
];

function Check({ dim = false }: { dim?: boolean }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${dim ? "text-gray-300" : "text-emerald-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlanPayant({ plan, label, prix, features, recommande }: {
  plan: "starter" | "pro";
  label: string;
  prix: string;
  features: string[];
  recommande?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [chargement, setChargement] = useState(false);
  const posthog = usePostHog();

  async function souscrire() {
    if (!session) { router.push("/register"); return; }
    setChargement(true);
    posthog?.capture("checkout_started", { plan });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setChargement(false);
    }
  }

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-6 ${recommande ? "ring-2 ring-indigo-500" : "ring-1 ring-gray-200"}`}>
      {recommande && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
          Recommandé
        </span>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-extrabold text-gray-900">{prix}</span>
          <span className="text-gray-400 text-sm mb-1">/mois</span>
        </div>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
            <Check />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={souscrire}
        disabled={chargement}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed ${recommande ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 shadow-md shadow-indigo-100" : "bg-gray-900 text-white hover:bg-gray-700"}`}
      >
        {chargement ? "Redirection..." : "Commencer"}
      </button>
    </div>
  );
}

function LienRetourDashboard() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="max-w-5xl mx-auto px-6 pt-6">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour au dashboard
      </Link>
    </div>
  );
}

export default function PagePricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <LienRetourDashboard />
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">Tarifs</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Passez à la vitesse supérieure
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto mb-12">
            Commencez gratuitement, passez à l&apos;illimité quand vous voulez.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Plan Gratuit */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-8 flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Gratuit</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">0€</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {FEATURES_GRATUIT.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                    <Check dim />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="w-full py-3 rounded-xl font-bold text-sm text-center bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                Commencer gratuitement
              </Link>
            </div>

            <PlanPayant plan="starter" label="Starter" prix="9,99€" features={FEATURES_STANDARD} recommande />
            <PlanPayant plan="pro" label="Pro" prix="14,99€" features={FEATURES_PREMIUM} />
          </div>

          <p className="mt-8 text-xs text-gray-400">
            Paiement sécurisé par Stripe · Sans engagement · Résiliation en 1 clic
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-20">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">Questions fréquentes</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "Puis-je annuler à tout moment ?", r: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace Stripe. L'accès reste actif jusqu'à la fin de la période en cours." },
              { q: "Les 3 analyses gratuites sont-elles renouvelées ?", r: "Non, les analyses gratuites sont données une seule fois à l'inscription. Un abonnement donne accès à des analyses illimitées." },
              { q: "Mes données sont-elles sécurisées ?", r: "Oui. Le contenu de votre CV n'est jamais stocké en base de données — il transite uniquement en mémoire pendant l'analyse." },
              { q: "Quelle est la différence entre Starter et Pro ?", r: "Le plan Pro inclut la préparation aux entretiens (pitch, questions probables, questions à poser) et 80 révélations d'email par mois au lieu de 20." },
            ].map(({ q, r }) => (
              <div key={q} className="bg-white rounded-xl ring-1 ring-gray-200 p-5">
                <p className="font-semibold text-gray-900 text-sm mb-1">{q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
