import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Préparer son CV pour les ATS : le guide pratique | JobBoost",
  description:
    "Comment préparer son CV pour les ATS en 2026 ? Format, structure, mots-clés, rubriques : le guide pratique pour qu'il soit bien parsé et bien trouvé.",
  ...ogMeta(
    "Préparer son CV pour les ATS : le guide pratique | JobBoost",
    "Comment préparer son CV pour les ATS en 2026 ? Format, structure, mots-clés, rubriques : le guide pratique pour qu'il soit bien parsé et bien trouvé.",
    "/ressources/cv-ats/preparer-son-cv-pour-les-ats"
  ),
};

const TOC = [
  { id: "format",       titre: "Étape 1, choisir le bon format",          niveau: 2 },
  { id: "mise-en-page", titre: "Étape 2, simplifier la mise en page",     niveau: 2 },
  { id: "rubriques",    titre: "Étape 3, nommer les rubriques",           niveau: 2 },
  { id: "coordonnees",  titre: "Étape 4, placer ses coordonnées",         niveau: 2 },
  { id: "mots-cles",    titre: "Étape 5, adapter les mots-clés",          niveau: 2 },
  { id: "competences",  titre: "Étape 6, lister les compétences",         niveau: 2 },
  { id: "tester",       titre: "Étape 7, tester son CV",                  niveau: 2 },
  { id: "retenir",      titre: "Ce qu'il faut retenir",                   niveau: 2 },
];

export default function ArticlePreparerCvAts() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Fil d'Ariane */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <span>CV &amp; ATS</span>
          <span>›</span>
          <span className="text-gray-600">Préparer son CV pour les ATS</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Préparer son CV pour les ATS : le guide pratique
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
              <span>18 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>5 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La plupart des candidats envoient le même CV à toutes les offres.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ils s&apos;étonnent ensuite de ne pas recevoir de réponses.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Préparer son CV pour les ATS ne signifie pas le transformer en liste de mots-clés robotique. Cela signifie s&apos;assurer qu&apos;il sera bien lu par le logiciel, et bien trouvé par le recruteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici comment faire, étape par étape.
            </p>

            {/* Étape 1 */}
            <h2 id="format" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 1, choisir le bon format de fichier
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le format de votre CV est la première chose qui conditionne la qualité du parsing.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La règle générale : le Word (.docx) est mieux parsé que le PDF par la majorité des ATS, notamment les plus anciens comme Taleo. Pour aller plus loin, lisez notre comparatif sur <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">le format de CV qui passe vraiment mieux les ATS</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le PDF fonctionne bien quand il est de type texte, c&apos;est-à-dire que le texte est sélectionnable et copiable. Un PDF image, scanné ou exporté sans couche texte, est illisible pour un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;offre précise un format, respectez-le sans exception.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous avez le choix, optez pour le Word pour les candidatures en ligne, et le PDF pour les envois directs par email à un recruteur.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Le meilleur CV du monde ne sert à rien si l&apos;ATS ne peut pas en extraire le texte.
              </p>
            </blockquote>

            {/* Étape 2 */}
            <h2 id="mise-en-page" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 2, simplifier la mise en page
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est l&apos;étape que la plupart des candidats résistent à faire.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un CV visuellement impressionnant, avec des colonnes, des icônes, des barres de progression et des graphiques, est souvent un cauchemar pour un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les éléments à éviter absolument :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>les mises en page en deux colonnes qui perturbent l&apos;ordre de lecture,</li>
              <li>les tableaux dont le contenu se mélange au parsing,</li>
              <li>les zones de texte que certains ATS ignorent complètement,</li>
              <li>les images et icônes qui sont invisibles pour un ATS,</li>
              <li>les en-têtes et pieds de page pour les informations importantes.</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qu&apos;il faut privilégier :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>une seule colonne,</li>
              <li>des rubriques clairement nommées,</li>
              <li>des polices standards comme Arial, Calibri ou Georgia,</li>
              <li>du texte brut sans fioritures.</li>
            </ul>

            {/* Étape 3 */}
            <h2 id="rubriques" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 3, nommer les rubriques de façon conventionnelle
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS reconnaissent les rubriques par leurs titres.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous appelez votre section expériences &ldquo;Mon parcours&rdquo; ou &ldquo;Ce que j&apos;ai fait&rdquo;, certains ATS ne sauront pas comment classer ces informations.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les titres de rubriques qui fonctionnent partout : Expérience professionnelle, Formation, Compétences, Langues, Informations personnelles. Pour aller plus loin, consultez notre article sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Restez simple et conventionnel. Ce n&apos;est pas dans les titres de rubriques que vous vous démarquez, c&apos;est dans le contenu.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Les ATS s&apos;attendent à des rubriques qu&apos;ils connaissent. Surprenez le recruteur avec votre contenu, pas avec vos titres de sections.
              </p>
            </blockquote>

            {/* Étape 4 */}
            <h2 id="coordonnees" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 4, placer vos coordonnées dans le bon endroit
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est une erreur très courante.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Beaucoup de candidats placent leurs coordonnées dans l&apos;en-tête du document, dans une zone décorative en haut de page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certains ATS ne lisent pas ces zones et créent une fiche candidat sans nom, sans email, sans téléphone.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La solution : placez vos coordonnées dans le corps du document, comme n&apos;importe quel autre texte.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Nom, prénom, email, téléphone, ville, tous ces éléments doivent être dans le flux principal du document.
            </p>

            {/* Étape 5 */}
            <h2 id="mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 5, adapter les mots-clés à chaque offre
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est l&apos;étape la plus importante, et celle qui demande le plus de travail.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un ATS stocke votre CV dans une base de données. Le recruteur filtre ensuite cette base avec des mots-clés, les termes exacts qu&apos;il tape dans sa barre de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si ces mots ne sont pas dans votre CV, vous n&apos;apparaissez pas dans les résultats.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Comment identifier les bons mots-clés : lisez attentivement l&apos;offre d&apos;emploi, notez le titre du poste exact, les compétences demandées, les outils mentionnés, les missions décrites. Si vous cherchez des inspirations par métier, parcourez par exemple notre liste de <Link href="/ressources/cv-ats/mots-cles-cv-chef-de-projet" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Chef de Projet</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Puis vérifiez que ces mots apparaissent naturellement dans votre CV, dans vos expériences, dans votre section compétences, dans votre titre de poste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pas besoin de les répéter dix fois. Une ou deux occurrences naturelles suffisent.
            </p>

            {/* Étape 6 */}
            <h2 id="competences" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 6, lister les compétences en texte brut
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les barres de progression, les étoiles, les graphiques de compétences sont invisibles pour un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Seul le texte est lu.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Listez vos compétences sous forme de texte simple : une compétence, une ligne, ou une liste séparée par des virgules.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Distinguez les compétences techniques, logiciels, langages, outils, des compétences transversales, gestion de projet, management, communication.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et utilisez les mots exacts de l&apos;offre. Si l&apos;offre dit &ldquo;Google Analytics&rdquo;, écrivez &ldquo;Google Analytics&rdquo;, pas &ldquo;outils d&apos;analyse web&rdquo;.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Vos compétences en étoiles n&apos;existent pas pour un ATS. Écrivez-les en texte, simplement.
              </p>
            </blockquote>

            {/* Étape 7 */}
            <h2 id="tester" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 7, tester son CV avant d&apos;envoyer
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une fois votre CV préparé, testez-le avant de postuler.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le test le plus simple : copiez-collez tout le texte de votre CV dans un bloc-notes. Ce que vous voyez est ce que l&apos;ATS extrait. Si c&apos;est lisible et ordonné, c&apos;est bon. Si c&apos;est mélangé, retravaillez la mise en page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin, utilisez un outil comme JobBoost qui analyse automatiquement la correspondance entre votre CV et une offre d&apos;emploi précise. Notre article sur <Link href="/ressources/cv-ats/tester-son-cv-ats-gratuitement" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment tester son CV ATS gratuitement</Link> détaille les trois méthodes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il identifie les mots-clés manquants et vous indique exactement quoi ajuster.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Tester mon CV gratuitement →
              </Link>
            </div>

            {/* Retenir */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Préparer son CV pour les ATS se fait en sept étapes : choisir le bon format, simplifier la mise en page, nommer les rubriques de façon conventionnelle, placer les coordonnées dans le corps du document, adapter les mots-clés à chaque offre, lister les compétences en texte brut, et tester avant d&apos;envoyer.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas une question de tricher avec un algorithme. C&apos;est une question de s&apos;assurer que votre CV sera lu correctement et trouvé par le bon recruteur.
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
          <aside className="hidden lg:block sticky top-20 self-start">

            {/* Table des matières */}
            <div className="bg-gray-50 rounded-2xl p-5 ring-1 ring-gray-100 mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sommaire</p>
              <nav className="space-y-2">
                {TOC.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block text-sm leading-snug text-gray-600 hover:text-violet-600 transition-colors ${
                      section.niveau === 3 ? "pl-3 text-xs" : "font-medium"
                    }`}
                  >
                    {section.titre}
                  </a>
                ))}
              </nav>
            </div>

            {/* Partager */}
            <div className="bg-gray-50 rounded-2xl p-5 ring-1 ring-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Partager</p>
              <ShareButtons />
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
