"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";

const TEMOIGNAGE = {
  citation: "L'adaptation automatique est bluffante. Mon CV correspond maintenant exactement au vocabulaire de l'offre. J'ai eu 3 entretiens en deux semaines.",
  prenom: "Thomas M.",
  poste: "Développeur fullstack",
  initiales: "TM",
};

function FormulaireInscription() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectApres = searchParams.get("redirect");
  const posthog = usePostHog();

  async function soumettreFormulaire(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    if (motDePasse.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      setChargement(false);
      return;
    }

    try {
      const { error } = await signUp.email({
        name: `${prenom} ${nom}`.trim(),
        email,
        password: motDePasse,
        firstName: prenom,
        lastName: nom,
      } as Parameters<typeof signUp.email>[0]);

      if (error) {
        const emailPris =
          error.code === "USER_ALREADY_EXISTS" ||
          error.code === "EMAIL_ALREADY_IN_USE" ||
          error.message?.toLowerCase().includes("already") ||
          error.message?.toLowerCase().includes("exist");
        setErreur(
          emailPris
            ? "Un compte avec cet email existe déjà. Connectez-vous ou utilisez un autre email."
            : "Une erreur est survenue. Veuillez réessayer."
        );
      } else {
        posthog?.identify(email, { email, name: `${prenom} ${nom}`.trim() });
        posthog?.capture("user_registered", { redirect: redirectApres ?? "/dashboard" });
        router.push(redirectApres ?? "/dashboard");
      }
    } catch {
      setErreur("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Colonne gauche — formulaire */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-8 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="text-2xl font-bold text-indigo-600 mb-8 block">
            JobBoost
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
          <p className="text-sm text-gray-500 mb-8">1 adaptation de CV gratuite offerte.</p>

          <form onSubmit={soumettreFormulaire} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                  autoComplete="given-name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  autoComplete="family-name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-gray-400 font-normal">(min. 8 caractères)</span>
              </label>
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>

            {erreur && <p className="text-red-600 text-sm">{erreur}</p>}

            <button
              type="submit"
              disabled={chargement}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-200/60 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {chargement ? "Création du compte..." : "Créer mon compte gratuitement"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Colonne droite — preuve sociale */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 flex-col items-center justify-center px-12 py-12">
        <div className="max-w-md">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <blockquote className="text-white text-xl font-medium leading-relaxed mb-8">
            &ldquo;{TEMOIGNAGE.citation}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-sm flex items-center justify-center shrink-0">
              {TEMOIGNAGE.initiales}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{TEMOIGNAGE.prenom}</p>
              <p className="text-indigo-200 text-xs">{TEMOIGNAGE.poste}</p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-10">
            {[
              { chiffre: "+2 400", label: "CVs analysés" },
              { chiffre: "92 %", label: "trouvent des mots-clés manquants" },
              { chiffre: "3×", label: "plus rapide qu'une réécriture manuelle" },
            ].map(({ chiffre, label }) => (
              <div key={label} className="text-center">
                <p className="text-white text-2xl font-extrabold">{chiffre}</p>
                <p className="text-indigo-200 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default function PageInscription() {
  return (
    <Suspense fallback={null}>
      <FormulaireInscription />
    </Suspense>
  );
}
