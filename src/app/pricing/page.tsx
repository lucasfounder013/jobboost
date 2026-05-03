"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useSession, signOut } from "@/lib/auth-client";

const FEATURES_GRATUIT = [
  "5 analyses CV offertes",
  "1 adaptation CV offerte",
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

function Check({ dim = false }: { dim?: boolean }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${dim ? "text-gray-300" : "text-emerald-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlanPayant({ plan, label, prix, periode, recommande }: {
  plan: "hebdo" | "mensuel";
  label: string;
  prix: string;
  periode: string;
  recommande?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [chargement, setChargement] = useState(false);

  async function souscrire() {
    if (!session) { router.push("/register"); return; }
    setChargement(true);
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
          <span className="text-gray-400 text-sm mb-1">/{periode}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {FEATURES_PREMIUM.map((f) => (
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

export default function PagePricing() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-lg">⚡</span>
            <span className="text-base font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">JobBoost</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 font-medium transition-colors hidden sm:block">Dashboard</Link>
                <button onClick={() => signOut()} className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/login" className="border border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600 px-4 py-1.5 rounded-lg font-semibold transition-colors text-sm">Connexion</Link>
                <Link href="/register" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-4 py-1.5 rounded-lg font-semibold transition-all text-sm shadow-md shadow-indigo-100">S&apos;inscrire</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
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

            <PlanPayant plan="hebdo" label="Hebdomadaire" prix="4,99€" periode="semaine" />
            <PlanPayant plan="mensuel" label="Mensuel" prix="9,99€" periode="mois" recommande />
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
              { q: "Les 5 analyses gratuites sont-elles renouvelées ?", r: "Non, les analyses gratuites sont données une seule fois à l'inscription. Un abonnement donne accès à des analyses illimitées." },
              { q: "Mes données sont-elles sécurisées ?", r: "Oui. Le contenu de votre CV n'est jamais stocké en base de données — il transite uniquement en mémoire pendant l'analyse." },
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
