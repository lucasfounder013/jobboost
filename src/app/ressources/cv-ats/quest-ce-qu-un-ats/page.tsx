import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";

export const metadata = {
  title: "C'est quoi un ATS ? Tout ce qu'il faut savoir | JobBoost",
  description:
    "Non, un ATS ne rejette pas automatiquement votre CV. Voici ce qu'un ATS fait vraiment, et pourquoi vous optimisez peut-être pour rien.",
};

const TOC = [
  { id: "ce-qu-un-ats-fait",    titre: "Ce qu'un ATS fait vraiment",                  niveau: 2 },
  { id: "qui-filtre",           titre: "Qui filtre vraiment les candidatures ?",        niveau: 2 },
  { id: "score-ats",            titre: "Et le fameux \"score ATS\" ?",                 niveau: 2 },
  { id: "pourquoi-pas-lu",      titre: "Alors pourquoi votre CV n'est pas lu ?",       niveau: 2 },
  { id: "ce-que-ca-change",     titre: "Ce que ça change concrètement pour vous",      niveau: 2 },
  { id: "ce-que-fait-jobboost", titre: "Ce que fait JobBoost",                         niveau: 2 },
  { id: "retenir",              titre: "Ce qu'il faut retenir",                        niveau: 2 },
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
          <span className="text-gray-600">Ce qu&apos;on vous a dit sur les ATS</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          C&apos;est quoi un ATS ? Tout ce qu&apos;il faut savoir
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
              Votre CV serait rejeté automatiquement par un robot.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un score ATS déciderait de votre sort en quelques secondes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              75% des candidatures ne seraient jamais lues par un humain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces affirmations circulent partout. Sur LinkedIn, dans les guides RH, sur les sites de coaching.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Elles sont en grande partie fausses.
            </p>

            {/* Section 1 */}
            <h2 id="ce-qu-un-ats-fait" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;un ATS fait vraiment
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un ATS, Applicant Tracking System, est avant tout une base de données.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand vous postulez en ligne, votre CV est reçu, lu et découpé par le logiciel. Il en extrait les informations clés : nom, coordonnées, expériences, formations, compétences. C&apos;est ce qu&apos;on appelle le "parsing".
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces informations sont ensuite stockées dans une fiche candidat, dans une base de données consultable par le recruteur.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Pensez à l&apos;ATS comme à un outil d&apos;organisation puissant, pas comme à un robot autonome qui décide de votre sort.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est tout. À ce stade, aucune décision n&apos;a été prise sur votre candidature.
            </p>

            {/* Section 2 */}
            <h2 id="qui-filtre" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Qui filtre vraiment les candidatures ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le recruteur. Pas le logiciel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une fois les CV parsés et stockés, c&apos;est le recruteur humain qui ouvre l&apos;ATS et filtre lui-même les profils selon ses critères : un niveau d&apos;expérience, une compétence précise, une localisation.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS lui fournit des outils de recherche, exactement comme Google vous permet de filtrer des résultats. Mais c&apos;est lui qui tape les critères. C&apos;est lui qui décide.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre CV n&apos;est pas rejeté automatiquement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il est soit trouvé, soit non trouvé.
            </p>

            {/* Section 3 */}
            <h2 id="score-ats" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Et le fameux &ldquo;score ATS&rdquo; ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est là que la désinformation est la plus répandue.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certains outils, dont des concurrents directs de JobBoost, vous donnent un score "compatibilité ATS" de 67%, 82%, 94%... en vous laissant croire que l&apos;ATS de l&apos;entreprise calcule ce même score et élimine votre CV s&apos;il est trop bas.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ces scores sont souvent des métriques marketing inventées, sans lien réel avec ce que les recruteurs voient dans leur ATS.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La réalité : la majorité des recruteurs ne configurent aucun score automatique. Ils ouvrent leur ATS et cherchent des profils manuellement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certains ATS proposent bien une fonctionnalité de scoring, mais elle est rarement activée, rarement fiable, et toujours soumise à la validation humaine.
            </p>

            {/* Section 4 */}
            <h2 id="pourquoi-pas-lu" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Alors pourquoi votre CV n&apos;est pas lu ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas un robot qui l&apos;ignore.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est que le recruteur, en filtrant sa base de données, ne tombe pas sur vous. Parce que votre CV ne contient pas les mots exacts qu&apos;il a tapés dans sa barre de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La différence est importante.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas un score qui vous élimine.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est une absence de correspondance entre les mots de votre CV et les mots cherchés par le recruteur.
            </p>

            {/* Section 5 */}
            <h2 id="ce-que-ca-change" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que ça change concrètement pour vous
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;ennemi n&apos;est pas un robot mais une barre de recherche humaine, la stratégie change.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il ne s&apos;agit pas de "battre un algorithme". Il s&apos;agit de parler le même langage que le recruteur qui cherche votre profil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Concrètement :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Utilisez les mots exacts de l&apos;offre d&apos;emploi</li>
              <li>Privilégiez un format simple et lisible (le parsing rate les tableaux et les colonnes)</li>
              <li>Adaptez votre CV à chaque offre, pas de façon robotique, mais naturelle</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV lisible par une machine ET convaincant pour un humain. C&apos;est le seul objectif qui compte.
              </p>
            </blockquote>

            {/* Section 6 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pas pour vous donner un score magique.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais pour identifier les mots-clés que le recruteur cherchera probablement dans sa base de données, et vous aider à les intégrer naturellement dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que le recruteur tombe sur vous quand il cherche le bon profil.
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
              Un ATS est une base de données, pas un juge.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il parse votre CV et le stocke. Le recruteur filtre ensuite lui-même.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a pas de score automatique qui vous élimine en silence.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il y a un recruteur qui cherche des mots-clés, et votre CV doit contenir les bons.
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
