"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function PageConnexion() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function soumettreFormulaire(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    const { error } = await signIn.email({
      email,
      password: motDePasse,
      callbackURL: Boolean(localStorage.getItem("pendingAnalysis")) ? "/dashboard" : "/",
    });

    if (error) {
      setErreur(
        error.code === "EMAIL_NOT_VERIFIED"
          ? "Veuillez vérifier votre adresse email avant de vous connecter."
          : "Email ou mot de passe incorrect."
      );
      setChargement(false);
    } else {
      const hasPending = Boolean(localStorage.getItem("pendingAnalysis"));
      router.push(hasPending ? "/dashboard" : "/");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Link href="/" className="text-2xl font-bold text-blue-600 mb-8">
        JobBoost
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-6 text-center">Connexion</h1>

        <form onSubmit={soumettreFormulaire} className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {erreur && <p className="text-red-600 text-sm">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
