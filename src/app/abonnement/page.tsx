"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function PageAbonnement() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  async function ouvrirPortail() {
    setChargement(true);
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
      setChargement(false);
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

      <main className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mon abonnement</h1>
        <p className="text-gray-500 text-sm mb-10">{session.user.email}</p>

        <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Abonnement JobBoost</p>
              <p className="text-gray-400 text-xs">Analyses et adaptations CV illimitées</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Gérez votre abonnement directement depuis le portail sécurisé Stripe : changez de plan, mettez à jour votre moyen de paiement ou annulez à tout moment.
          </p>

          {erreur && (
            <p className="text-red-500 text-sm mb-4">{erreur}</p>
          )}

          <button
            onClick={ouvrirPortail}
            disabled={chargement}
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {chargement ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Chargement…
              </>
            ) : (
              "Gérer mon abonnement →"
            )}
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            Vous serez redirigé vers le portail sécurisé Stripe
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/pricing" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Voir les formules disponibles
          </Link>
        </div>
      </main>
    </div>
  );
}
