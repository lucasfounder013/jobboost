"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";

export default function PageInscription() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const router = useRouter();

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
        name: nom,
        email,
        password: motDePasse,
      });

      if (error) {
        setErreur(
          error.code === "USER_ALREADY_EXISTS"
            ? "Un compte avec cet email existe déjà."
            : "Une erreur est survenue. Veuillez réessayer."
        );
      } else {
        const hasPending = Boolean(localStorage.getItem("pendingAnalysis"));
        router.push(hasPending ? "/dashboard" : "/");
      }
    } catch {
      setErreur("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Link href="/" className="text-2xl font-bold text-blue-600 mb-8">
        JobBoost
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1 text-center">Créer un compte</h1>
        <p className="text-center text-sm text-gray-500 mb-6">1 adaptation de CV gratuite</p>

        <form onSubmit={soumettreFormulaire} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              autoComplete="given-name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {erreur && <p className="text-red-600 text-sm">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {chargement ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
