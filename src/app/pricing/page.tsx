"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";

const FEATURES_GRATUIT = [
  "Dashboard complet",
  "3 analyses de CV",
  "Préparation aux entretiens",
  "Recherche d'offres selon le CV",
];

const FEATURES_MENSUEL = [
  "Dashboard complet",
  "30 analyses de CV / mois",
  "15 adaptations de CV / mois",
  "15 lettres de motivation / mois",
  "3 révélations d'email / mois",
  "Export PDF ATS + Word",
  "Préparation aux entretiens",
];

const FEATURES_LIFETIME = [
  "Dashboard complet",
  "Analyses de CV illimitées",
  "Adaptations de CV illimitées",
  "Lettres de motivation illimitées",
  "Révélations d'email illimitées",
  "Export PDF ATS + Word",
  "Préparation aux entretiens",
  "Toutes les futures fonctionnalités",
];

function Check({ dim = false, highlight = false }: { dim?: boolean; highlight?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${dim ? "text-gray-300" : highlight ? "text-white" : "text-emerald-500"}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlanPayant({ plan, label, prix, suffixe, features, recommande, sousTitre }: {
  plan: "monthly" | "lifetime";
  label: string;
  prix: string;
  suffixe: string;
  features: string[];
  recommande?: boolean;
  sousTitre?: string;
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

  const cta = plan === "lifetime" ? "Accéder à vie" : "S'abonner";

  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col gap-6 ${
        recommande
          ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-200 ring-2 ring-indigo-500 sm:scale-105"
          : "bg-white ring-1 ring-gray-200 shadow-sm"
      }`}
    >
      {recommande && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
          Meilleure valeur
        </span>
      )}
      <div>
        <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${recommande ? "text-indigo-100" : "text-gray-400"}`}>
          {label}
        </p>
        <div className="flex items-end gap-1">
          <span className={`text-4xl font-extrabold ${recommande ? "text-white" : "text-gray-900"}`}>{prix}</span>
          <span className={`text-sm mb-1 ${recommande ? "text-indigo-100" : "text-gray-400"}`}>{suffixe}</span>
        </div>
        {sousTitre && (
          <p className={`text-xs mt-2 ${recommande ? "text-indigo-50" : "text-gray-500"}`}>{sousTitre}</p>
        )}
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-center gap-2 text-sm ${recommande ? "text-white" : "text-gray-700"}`}
          >
            <Check highlight={recommande} />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={souscrire}
        disabled={chargement}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
          recommande
            ? "bg-white text-indigo-700 hover:bg-gray-100 shadow-md"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {chargement ? "Redirection..." : cta}
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
            Un seul paiement. Un accès à vie.
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-12">
            Commencez gratuitement, ou débloquez tout Rivjob pour toujours au prix de 2 mois d&apos;abonnement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">

            {/* Plan Gratuit */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-8 flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Gratuit</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">0€</span>
                </div>
                <p className="text-xs mt-2 text-gray-500">Pour découvrir l&apos;outil.</p>
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

            <PlanPayant
              plan="lifetime"
              label="Accès à vie"
              prix="29,99€"
              suffixe="une fois, pour toujours"
              features={FEATURES_LIFETIME}
              recommande
              sousTitre="Rentabilisé dès le 2e mois vs mensuel"
            />

            <PlanPayant
              plan="monthly"
              label="Mensuel"
              prix="17,99€"
              suffixe="/mois"
              features={FEATURES_MENSUEL}
              sousTitre="Résiliable à tout moment"
            />
          </div>

          <p className="mt-8 text-xs text-gray-400">
            Paiement sécurisé par Stripe · TVA incluse
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-20">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">Questions fréquentes</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                q: "Que veut dire \"à vie\" concrètement ?",
                r: "Vous payez 29,99€ une seule fois et accédez à toutes les fonctionnalités de Rivjob sans limite de temps ni de quantité. Aucun renouvellement, aucune surprise. Vous pouvez arrêter de chercher un emploi puis revenir dans 2 ans : votre accès est toujours actif."
              },
              {
                q: "Pourquoi le mensuel est-il plus cher que le lifetime ?",
                r: "Ce n'est pas plus cher : c'est un autre modèle. Le mensuel à 17,99€ existe pour les personnes qui ne veulent pas s'engager d'un coup — dès le 2e mois, l'accès à vie devient économiquement plus intéressant."
              },
              {
                q: "Les 3 analyses gratuites sont-elles renouvelées ?",
                r: "Non, les analyses gratuites sont données une seule fois à l'inscription. Elles permettent de tester l'outil sur des offres réelles avant de décider."
              },
              {
                q: "Puis-je annuler l'abonnement mensuel ?",
                r: "Oui, en 1 clic depuis votre espace Stripe. L'accès reste actif jusqu'à la fin de la période payée."
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                r: "Oui. Le contenu de votre CV n'est jamais stocké en base de données — il transite uniquement en mémoire pendant l'analyse."
              },
            ].map(({ q, r }) => (
              <div key={q} className="bg-white rounded-xl ring-1 ring-gray-200 p-5 text-left">
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
