"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import Footer from "@/components/Footer";

const articles = [
  {
    id: 1,
    categorie: "CV & ATS",
    titre: "C'est quoi un ATS ? Tout ce qu'il faut savoir",
    extrait:
      "Non, un ATS ne rejette pas automatiquement votre CV. Voici ce qu'un ATS fait vraiment, et pourquoi vous optimisez peut-être pour rien.",
    slug: "/ressources/cv-ats/quest-ce-qu-un-ats",
    date: "9 mai 2026",
  },
];

const CATEGORIES = ["Toutes", "CV & ATS", "Lettre de motivation", "Trouver des offres"];

const COULEURS_CATEGORIE: Record<string, string> = {
  "CV & ATS": "bg-violet-50 text-violet-700",
  "Lettre de motivation": "bg-violet-50 text-violet-700",
  "Trouver des offres": "bg-violet-50 text-violet-700",
};

export default function RessourcesPage() {
  const { data: session } = useSession();
  const [categorie, setCategorie] = useState("Toutes");
  const [recherche, setRecherche] = useState("");

  const articlesFiltres = articles.filter(
    (a) =>
      (categorie === "Toutes" || a.categorie === categorie) &&
      (a.titre.toLowerCase().includes(recherche.toLowerCase()) ||
        a.extrait.toLowerCase().includes(recherche.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Header — identique à la home */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-indigo-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">

            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              JobBoost
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/ressources"
              className="px-4 py-2 rounded-lg text-gray-900 font-semibold transition-all duration-150"
            >
              Ressources
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150"
            >
              Tarifs
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 hidden sm:block"
                >
                  Dashboard
                </Link>
                <span className="text-gray-300 mx-1 hidden sm:block">·</span>
                <span className="text-gray-400 text-sm font-medium hidden sm:block">{session.user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="ml-2 px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-150"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  S&apos;inscrire gratuitement
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-20 pb-14 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
            La recherche d&apos;emploi a ses{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              règles du jeu.
            </span>
          </h1>
          <p className="text-gray-500 text-lg">
            On vous explique lesquelles, et comment les utiliser.
          </p>
        </div>
      </section>

      {/* Bibliothèque */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-20">

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative sm:w-52">
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 pr-8 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer shadow-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "Toutes" ? "Toutes les catégories" : c}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher un article..."
              className="w-full bg-white border border-gray-200 text-gray-700 placeholder-gray-400 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
            />
          </div>
        </div>

        {/* Compteur */}
        <p className="text-sm text-gray-400 font-medium mb-6">
          {articlesFiltres.length} article{articlesFiltres.length !== 1 ? "s" : ""} trouvé{articlesFiltres.length !== 1 ? "s" : ""}
        </p>

        {/* Grille */}
        {articlesFiltres.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-base font-medium">Aucun article ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articlesFiltres.map((article) => (
              <Link
                key={article.id}
                href={article.slug}
                className="group bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
              >
                <div className="px-5 pt-5 pb-0">
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${COULEURS_CATEGORIE[article.categorie] ?? "bg-gray-100 text-gray-600"}`}>
                    {article.categorie}
                  </span>
                </div>

                <div className="flex-1 px-5 pt-3 pb-5">
                  <h2 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors duration-150">
                    {article.titre}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{article.extrait}</p>
                </div>

                <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-extrabold">JB</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">JobBoost</span>
                  </div>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
