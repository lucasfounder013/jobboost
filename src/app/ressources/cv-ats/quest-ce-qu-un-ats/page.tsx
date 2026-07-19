import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "C'est quoi un ATS ? Tout ce qu'il faut savoir | Rivjob",
  description:
    "Non, un ATS ne rejette pas automatiquement votre CV. Voici ce qu'un ATS fait vraiment, et pourquoi vous optimisez peut-être pour rien.",
  ...ogMeta(
    "C'est quoi un ATS ? Tout ce qu'il faut savoir | Rivjob",
    "Non, un ATS ne rejette pas automatiquement votre CV. Voici ce qu'un ATS fait vraiment, et pourquoi vous optimisez peut-être pour rien.",
    "/ressources/cv-ats/quest-ce-qu-un-ats"
  ),
};

const TOC = [
  { id: "ce-qu-un-ats-fait",    titre: "Ce qu'un ATS fait vraiment",                  niveau: 2 },
  { id: "qui-filtre",           titre: "Qui filtre vraiment les candidatures ?",        niveau: 2 },
  { id: "score-ats",            titre: "Et le fameux \"score ATS\" ?",                 niveau: 2 },
  { id: "pourquoi-pas-lu",      titre: "Alors pourquoi votre CV n'est pas lu ?",       niveau: 2 },
  { id: "ce-que-ca-change",     titre: "Ce que ça change concrètement pour vous",      niveau: 2 },
  { id: "ce-que-fait-rivjob", titre: "Ce que fait Rivjob",                         niveau: 2 },
  { id: "retenir",              titre: "Ce qu'il faut retenir",                        niveau: 2 },
];

export default function ArticleATS() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <span className="text-gray-600">Ce qu&apos;on vous a dit sur les ATS</span>
        </div>

        <ArticleJsonLd
          titre="C'est quoi un ATS ? Tout ce qu'il faut savoir | Rivjob"
          description="Non, un ATS ne rejette pas automatiquement votre CV. Voici ce qu'un ATS fait vraiment, et pourquoi vous optimisez peut-être pour rien."
          slug="/ressources/cv-ats/quest-ce-qu-un-ats"
          datePublication="2026-05-09"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Ce qu'on vous a dit sur les ATS", url: "/ressources/cv-ats/quest-ce-qu-un-ats" },
          ]}
        />

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
                <span className="text-white text-[10px] font-extrabold">LL</span>
              </div>
              <span className="font-medium text-gray-700">Lucas L.</span>
              <a
                href="https://www.linkedin.com/in/lucas-le-donn%C3%A9-71a8682a7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Lucas le Donné"
                className="text-gray-400 hover:text-[#0a66c2] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
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
              Quand vous postulez en ligne, votre CV est reçu, lu et découpé par le logiciel. Il en extrait les informations clés : nom, coordonnées, expériences, formations, compétences. C&apos;est ce qu&apos;on appelle le &ldquo;parsing&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces informations sont ensuite stockées dans une fiche candidat, dans une base de données consultable par le recruteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre exactement ce que voit le recruteur dans cette fiche, consultez notre article sur <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que voit vraiment le recruteur dans son ATS</Link>.
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
              Certains outils, dont des concurrents directs de Rivjob, vous donnent un score &ldquo;compatibilité ATS&rdquo; de 67%, 82%, 94%... en vous laissant croire que l&apos;ATS de l&apos;entreprise calcule ce même score et élimine votre CV s&apos;il est trop bas.
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
              Il ne s&apos;agit pas de &ldquo;battre un algorithme&rdquo;. Il s&apos;agit de parler le même langage que le recruteur qui cherche votre profil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Concrètement :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Utilisez les mots exacts de l&apos;offre d&apos;emploi</li>
              <li>Privilégiez un format simple et lisible (le parsing rate les tableaux et les colonnes)</li>
              <li>Adaptez votre CV à chaque offre, pas de façon robotique, mais naturelle</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Sur la question du format, PDF ou Word, <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif sur le format de CV le mieux parsé par les ATS</Link> vous donnera une réponse claire.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV lisible par une machine ET convaincant pour un humain. C&apos;est le seul objectif qui compte.
              </p>
            </blockquote>

            {/* Section 6 */}
            <h2 id="ce-que-fait-rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique.
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
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre toutes les étapes entre votre candidature et le premier appel du recruteur, lisez <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe vraiment après avoir postulé</Link>.
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
