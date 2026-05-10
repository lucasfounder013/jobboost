import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";

export const metadata = {
  title: "C'est quoi un ATS ? Définition et fonctionnement | JobBoost",
  description:
    "Un ATS filtre les CV avant qu'un recruteur les lise. Découvrez comment ça fonctionne vraiment, et pourquoi votre CV est peut-être rejeté automatiquement.",
};

const TOC = [
  { id: "quest-ce-qu-un-ats", titre: "Qu'est-ce qu'un ATS ?", niveau: 2 },
  { id: "pourquoi", titre: "Pourquoi les entreprises utilisent-elles un ATS ?", niveau: 2 },
  { id: "comment-analyse", titre: "Comment un ATS analyse votre CV ?", niveau: 2 },
  { id: "parse", titre: "Il lit et découpe votre CV", niveau: 3 },
  { id: "compare", titre: "Il compare votre CV à l'offre", niveau: 3 },
  { id: "score", titre: "Il attribue un score", niveau: 3 },
  { id: "limites", titre: "Ce qu'un ATS ne sait pas faire", niveau: 2 },
  { id: "recruteur", titre: "ATS et recruteur : qui décide vraiment ?", niveau: 2 },
  { id: "outils", titre: "Comment savoir si votre CV passe les filtres ?", niveau: 2 },
  { id: "retenir", titre: "Ce qu'il faut retenir", niveau: 2 },
];

export default function ArticleATS() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm shadow-indigo-50">
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
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <span className="text-gray-600">C&apos;est quoi un ATS ?</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          C&apos;est quoi un ATS ?<br />Comment ça fonctionne vraiment
        </h1>

        {/* Grille article + TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16 lg:items-start">

          {/* Colonne article */}
          <article>

            {/* Méta-ligne */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-10 pb-10 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-extrabold">JB</span>
              </div>
              <span className="font-medium text-gray-700">JobBoost</span>
              <span className="text-gray-300">|</span>
              <span>9 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>3 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous avez postulé à des dizaines d&apos;offres.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pas de réponse. Même pas un refus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans la plupart des cas, ce n&apos;est pas un recruteur qui a ignoré votre candidature.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est un logiciel qui ne l&apos;a jamais transmise.
            </p>

            {/* Section 1 */}
            <h2 id="quest-ce-qu-un-ats" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Qu&apos;est-ce qu&apos;un ATS ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              ATS signifie <strong>Applicant Tracking System</strong>, en français, "système de suivi des candidatures".
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le logiciel qu&apos;utilisent les entreprises pour gérer les candidatures qu&apos;elles reçoivent.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Concrètement : quand vous cliquez sur "Envoyer ma candidature", votre CV n&apos;arrive pas dans la boîte mail d&apos;un recruteur humain. Il entre dans une base de données gérée par l&apos;ATS, qui va l&apos;analyser, le classer, et décider s&apos;il mérite d&apos;être vu par un humain.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                En France, la grande majorité des entreprises de plus de 50 salariés utilisent un ATS. Les plus répandus : Workday, Taleo, SAP SuccessFactors, Greenhouse.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="pourquoi" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les entreprises utilisent-elles un ATS ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La raison est simple : le volume.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une offre publiée sur LinkedIn peut recevoir plusieurs centaines de candidatures en quelques jours. Aucun recruteur ne peut toutes les lire.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS automatise le premier tri. Il permet de :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Centraliser toutes les candidatures</li>
              <li>Rechercher des profils par mots-clés</li>
              <li>Suivre l&apos;avancement de chaque dossier</li>
              <li>Collaborer entre membres de l&apos;équipe RH</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour l&apos;entreprise, c&apos;est un gain de temps énorme.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour vous, c&apos;est un filtre invisible à franchir avant qu&apos;un humain pose les yeux sur votre dossier.
            </p>

            {/* Section 3 */}
            <h2 id="comment-analyse" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment un ATS analyse votre CV ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est là que beaucoup de candidats perdent la partie sans le savoir.
            </p>

            <h3 id="parse" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              1. Il lit et découpe votre CV
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS commence par "parser" votre CV, c&apos;est-à-dire en extraire les informations : nom, coordonnées, expériences, formations, compétences.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le problème : il lit du texte, pas des mises en page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tableaux, colonnes, zones de texte, graphiques, tout ça peut le perturber. Des informations mal lues, mal classées, ou simplement ignorées.
            </p>

            <h3 id="compare" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              2. Il compare votre CV à l&apos;offre
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS cherche des correspondances entre votre CV et les mots-clés de l&apos;offre.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;offre dit "gestion de projet" et que vous écrivez "pilotage de projets", certains ATS ne feront pas le lien.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est pourquoi adapter le vocabulaire de votre CV à chaque offre n&apos;est pas optionnel.
            </p>

            <h3 id="score" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              3. Il attribue un score à votre candidature
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Sur cette base, l&apos;ATS attribue un score de correspondance.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les scores les plus élevés remontent en tête de liste. Les autres ne sont souvent jamais consultés.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas le meilleur candidat qui passe. C&apos;est le candidat dont le CV correspond le mieux aux mots-clés de l&apos;offre.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="limites" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;un ATS ne sait pas faire
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un ATS est puissant. Mais il a des angles morts importants.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Il ne comprend pas le contexte.</strong> Des responsabilités équivalentes à un chef de projet, sans le titre, il ne le verra pas.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Il ne lit pas les images.</strong> Vos compétences en étoiles ou en barres de progression sont invisibles pour lui.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Il ne perçoit pas votre potentiel.</strong> Votre motivation, votre adaptabilité, ça n&apos;existe pas pour un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Optimiser son CV pour les ATS ne signifie pas le rendre robotique. Cela signifie le rendre lisible par une machine, sans perdre ce qui le rend humain.
            </p>

            {/* Section 5 */}
            <h2 id="recruteur" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              ATS et recruteur : qui décide vraiment ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS ne décide pas seul.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Son rôle : faire un premier filtre et présenter une liste restreinte au recruteur humain, qui lit ensuite les CV sélectionnés.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui veut dire deux choses :
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si votre CV ne passe pas l&apos;ATS → aucun humain ne le verra jamais.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si votre CV passe l&apos;ATS → il doit ensuite convaincre un humain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les deux étapes comptent.
            </p>

            {/* Section 6 */}
            <h2 id="outils" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment savoir si votre CV passe les filtres ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il existe des outils qui analysent automatiquement la correspondance entre votre CV et une offre, et vous donnent un score avec des recommandations concrètes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost est l&apos;une des rares alternatives françaises à ces outils. Il analyse votre CV face à une offre précise, identifie les mots-clés manquants, et vous dit exactement quoi modifier.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

            {/* Section 7 */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un ATS lit votre CV, en extrait les infos clés, et le compare aux mots-clés de l&apos;offre.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si la correspondance est faible, votre candidature ne sera jamais lue.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas une question de mérite. C&apos;est une question de lisibilité.
            </p>

            <div className="mt-16 pt-10 border-t border-gray-100">
              <Link
                href="/ressources"
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-sm"
              >
                ← Retour aux ressources
              </Link>
            </div>
          </article>

          {/* TOC sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">

              {/* Table des matières */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-6 mb-6">
                <p className="text-base font-bold text-gray-900 mb-5">
                  Table des matières
                </p>
                <nav className="space-y-1">
                  {TOC.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block text-sm text-gray-500 hover:text-violet-600 transition-colors py-1 leading-snug ${
                        section.niveau === 3 ? "ml-4 text-xs text-gray-400 hover:text-violet-500" : ""
                      }`}
                    >
                      {section.titre}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Partager */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-6">
                <p className="text-base font-bold text-gray-900 mb-4">
                  Partager cet article
                </p>
                <ShareButtons />
              </div>

            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
