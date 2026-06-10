"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const articles = [
  {
    id: 16,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Développeur Web : liste complète 2026 pour passer les ATS",
    extrait:
      "Les 30+ mots-clés indispensables pour un CV Développeur Web qui passe les filtres ATS en 2026. Langages, frameworks, DevOps et soft skills par catégorie.",
    slug: "/ressources/cv-ats/mots-cles-cv-developpeur-web",
    date: "10 juin 2026",
  },
  {
    id: 15,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Ingénieur : liste complète 2026 pour passer les ATS",
    extrait:
      "Les 30+ mots-clés techniques, outils et certifications indispensables pour qu'un CV Ingénieur soit trouvé dans les ATS. Liste par catégorie avec exemples.",
    slug: "/ressources/cv-ats/mots-cles-cv-ingenieur",
    date: "9 juin 2026",
  },
  {
    id: 14,
    categorie: "Candidature spontanée",
    titre: "Comment trouver l'email d'un recruteur en 2026 : 8 méthodes efficaces",
    extrait:
      "Envoyer votre CV à contact@entreprise.fr, c'est l'envoyer à la corbeille. Voici 8 méthodes pour trouver directement l'email du recruteur ou du DRH.",
    slug: "/ressources/candidature-spontanee/trouver-email-recruteur",
    date: "9 juin 2026",
  },
  {
    id: 13,
    categorie: "Lettre de motivation",
    titre: "Comment écrire une lettre de motivation en 2026 : méthode, exemples et erreurs",
    extrait:
      "La méthode en 4 étapes pour écrire une lettre de motivation efficace. Exemples concrets, erreurs à éviter et conseils pour décrocher un entretien.",
    slug: "/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation",
    date: "8 juin 2026",
  },
  {
    id: 12,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Marketing Manager : liste complète 2026 pour passer les ATS",
    extrait:
      "30+ mots-clés indispensables pour un CV Marketing Manager qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    slug: "/ressources/cv-ats/mots-cles-cv-marketing-manager",
    date: "8 juin 2026",
  },
  {
    id: 11,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Comptable : liste complète 2026 pour passer les ATS",
    extrait:
      "30+ mots-clés indispensables pour un CV Comptable qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    slug: "/ressources/cv-ats/mots-cles-cv-comptable",
    date: "7 juin 2026",
  },
  {
    id: 10,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Chargé RH : liste complète 2026 pour passer les ATS",
    extrait:
      "30+ mots-clés indispensables pour un CV Chargé RH : recrutement, formation, droit social, SIRH. Liste complète par catégorie + exemples concrets.",
    slug: "/ressources/cv-ats/mots-cles-cv-charge-rh",
    date: "6 juin 2026",
  },
  {
    id: 9,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Commercial : liste complète 2026 pour passer les ATS",
    extrait:
      "30+ mots-clés indispensables pour un CV Commercial : compétences, CRM, certifications. Avec exemples concrets pour passer les filtres ATS.",
    slug: "/ressources/cv-ats/mots-cles-cv-commercial",
    date: "5 juin 2026",
  },
  {
    id: 8,
    categorie: "CV & ATS",
    titre: "Mots-clés CV Chef de Projet : liste complète 2026 pour passer les ATS",
    extrait:
      "30+ mots-clés indispensables organisés par catégorie, avec des exemples concrets pour les intégrer naturellement dans votre CV.",
    slug: "/ressources/cv-ats/mots-cles-cv-chef-de-projet",
    date: "3 juin 2026",
  },
  {
    id: 7,
    categorie: "CV & ATS",
    titre: "Les rubriques indispensables d'un CV en 2026",
    extrait:
      "Certaines rubriques sont attendues par tous les recruteurs. D'autres sont inutiles ou contre-productives. Voici ce qui doit vraiment figurer sur votre CV.",
    slug: "/ressources/cv-ats/rubriques-indispensables-cv-2026",
    date: "31 mai 2026",
  },
  {
    id: 6,
    categorie: "CV & ATS",
    titre: "Ce qui se passe vraiment après que vous avez postulé",
    extrait:
      "Entre le clic sur « Envoyer » et le premier appel du recruteur, il se passe beaucoup de choses que vous ne voyez pas.",
    slug: "/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule",
    date: "30 mai 2026",
  },
  {
    id: 5,
    categorie: "CV & ATS",
    titre: "Comment savoir si une entreprise utilise un ATS avant de postuler",
    extrait:
      "Avant d'envoyer votre CV, vous pouvez souvent deviner si un ATS va le recevoir. Voici comment.",
    slug: "/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats",
    date: "23 mai 2026",
  },
  {
    id: 4,
    categorie: "CV & ATS",
    titre: "Les ATS les plus utilisés en France, et ce que ça change pour vous",
    extrait:
      "Workday, Taleo, Greenhouse... Ces logiciels gèrent vos candidatures sans que vous le sachiez. Voici ce qu'il faut savoir sur chacun.",
    slug: "/ressources/cv-ats/ats-les-plus-utilises-en-france",
    date: "20 mai 2026",
  },
  {
    id: 3,
    categorie: "CV & ATS",
    titre: "Ce que voit vraiment le recruteur dans son ATS quand il reçoit votre CV",
    extrait:
      "Vous imaginez un robot qui analyse votre CV. La réalité est bien différente. Voici ce que voit vraiment un recruteur de l'autre côté.",
    slug: "/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats",
    date: "16 mai 2026",
  },
  {
    id: 1,
    categorie: "CV & ATS",
    titre: "C'est quoi un ATS ? Tout ce qu'il faut savoir",
    extrait:
      "Non, un ATS ne rejette pas automatiquement votre CV. Voici ce qu'un ATS fait vraiment, et pourquoi vous optimisez peut-être pour rien.",
    slug: "/ressources/cv-ats/quest-ce-qu-un-ats",
    date: "9 mai 2026",
  },
  {
    id: 2,
    categorie: "CV & ATS",
    titre: "PDF ou Word : quel format de CV passe vraiment mieux les ATS ?",
    extrait:
      "Tout le monde dit PDF. Mais est-ce vraiment le bon choix quand votre CV passe par un ATS ?",
    slug: "/ressources/cv-ats/cv-pdf-ou-word-ats",
    date: "14 mai 2026",
  },
];

const CATEGORIES = ["Toutes", "CV & ATS", "Lettre de motivation", "Candidature spontanée", "Trouver des offres"];

const COULEURS_CATEGORIE: Record<string, string> = {
  "CV & ATS": "bg-violet-50 text-violet-700",
  "Lettre de motivation": "bg-violet-50 text-violet-700",
  "Candidature spontanée": "bg-violet-50 text-violet-700",
  "Trouver des offres": "bg-violet-50 text-violet-700",
};

export default function RessourcesPage() {
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
