import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "../quest-ce-qu-un-ats/ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "PDF ou Word : quel format de CV passe vraiment mieux les ATS ? | Rivjob",
  description:
    "PDF ou Word ? La réponse n'est pas celle que vous croyez. On démonte les idées reçues sur le format de CV idéal pour les ATS.",
  ...ogMeta(
    "PDF ou Word : quel format de CV passe vraiment mieux les ATS ? | Rivjob",
    "PDF ou Word ? La réponse n'est pas celle que vous croyez. On démonte les idées reçues sur le format de CV idéal pour les ATS.",
    "/ressources/cv-ats/cv-pdf-ou-word-ats"
  ),
};

const TOC = [
  { id: "ce-que-l-ats-fait",    titre: "Ce que l'ATS fait avec votre fichier",             niveau: 2 },
  { id: "probleme-pdf",         titre: "Le problème avec le PDF",                           niveau: 2 },
  { id: "probleme-word",        titre: "Le problème avec le Word",                          niveau: 2 },
  { id: "pdf-ou-word",          titre: "Alors PDF ou Word ?",                               niveau: 2 },
  { id: "ce-qui-compte",        titre: "Ce qui compte vraiment",                            niveau: 2 },
  { id: "regles-mise-en-page",  titre: "Les règles de mise en page qui font la différence", niveau: 2 },
  { id: "ce-que-fait-rivjob", titre: "Ce que fait Rivjob",                              niveau: 2 },
  { id: "retenir",              titre: "Ce qu'il faut retenir",                             niveau: 2 },
];

export default function ArticlePDFouWord() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">CV &amp; ATS</Link>
          <span>›</span>
          <span className="text-gray-600">PDF ou Word : quel format de CV ?</span>
        </div>

        <ArticleJsonLd
          titre="PDF ou Word : quel format de CV passe vraiment mieux les ATS ? | Rivjob"
          description="PDF ou Word ? La réponse n'est pas celle que vous croyez. On démonte les idées reçues sur le format de CV idéal pour les ATS."
          slug="/ressources/cv-ats/cv-pdf-ou-word-ats"
          datePublication="2026-05-14"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "PDF ou Word : quel format de CV ?", url: "/ressources/cv-ats/cv-pdf-ou-word-ats" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          PDF ou Word : quel format de CV passe vraiment mieux les ATS ?
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
              <span>14 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>4 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tout le monde dit PDF.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est plus propre. Plus professionnel. Ça ne se dérègle pas selon l&apos;ordinateur du recruteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Sauf que cette logique ignore complètement ce qui se passe côté ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et la réalité est un peu plus nuancée.
            </p>

            {/* Section 1 */}
            <h2 id="ce-que-l-ats-fait" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que l&apos;ATS fait avec votre fichier
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rappel rapide : un ATS ne &laquo;&nbsp;regarde&nbsp;&raquo; pas votre CV comme un humain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il le lit, en extrait le texte, et stocke les informations dans une base de données. Ce processus s&apos;appelle le parsing.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre ce que fait exactement un ATS avec ces informations et comment un recruteur les consulte ensuite, lisez notre article sur <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que voit vraiment le recruteur dans son ATS</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et c&apos;est là que le format de votre fichier devient crucial, pas pour des raisons esthétiques, mais pour des raisons techniques.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                L&apos;ATS ne voit pas votre mise en page. Il voit du texte. Ou il ne voit rien.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="probleme-pdf" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le problème avec le PDF
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le PDF préserve parfaitement votre mise en page. C&apos;est son point fort pour un humain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est aussi son point faible pour un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un PDF peut être de deux types :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>PDF texte</strong> : le texte est sélectionnable, copiable, lisible par une machine</li>
              <li><strong>PDF image</strong> : le CV est une image scannée ou exportée sans couche texte</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si votre PDF est de type image, l&apos;ATS ne peut extraire aucune information. Votre CV est techniquement illisible pour lui.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Même un PDF texte peut poser problème si votre mise en page est complexe : colonnes multiples, zones de texte, tableaux, icônes. Le parsing peut mélanger les informations ou en ignorer une partie.
            </p>

            {/* Section 3 */}
            <h2 id="probleme-word" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le problème avec le Word
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le Word (.docx) est généralement mieux parsé par les ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le texte est directement accessible, structuré, lisible. La plupart des ATS ont été conçus à l&apos;origine pour lire des fichiers Word.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais Word a ses propres pièges.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un fichier Word avec des en-têtes et pieds de page contenant des informations importantes (nom, coordonnées) peut les voir ignorées par certains ATS qui ne lisent pas ces zones.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les tableaux et les zones de texte posent les mêmes problèmes qu&apos;en PDF.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Le format compte moins que la structure. Un Word mal construit parsera moins bien qu&apos;un PDF bien construit.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="pdf-ou-word" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Alors PDF ou Word ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La réponse honnête : ça dépend.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;offre précise un format, respectez-le. C&apos;est le cas le plus simple.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous postulez via un formulaire en ligne avec upload de fichier, le Word est souvent plus sûr pour le parsing.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous envoyez votre CV par email directement à un recruteur, le PDF est préférable. Il sera lu par un humain, pas parsé par un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous ne savez pas, envoyez les deux. Certains recruteurs apprécient d&apos;avoir le choix.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous cherchez d&apos;abord à savoir si une entreprise utilise bien un ATS avant de postuler, notre guide sur <Link href="/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment détecter les ATS avant de postuler</Link> vous donnera des indices concrets.
            </p>

            {/* Section 5 */}
            <h2 id="ce-qui-compte" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qui compte vraiment
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le débat PDF vs Word est une distraction si votre CV est mal structuré.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un CV en colonnes multiples parsera mal, peu importe le format. Un CV avec des graphiques de compétences perdra ces informations, peu importe le format. Un CV avec des zones de texte verra ces zones ignorées, peu importe le format.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                La vraie question n&apos;est pas PDF ou Word. C&apos;est : est-ce que mon CV est lisible par une machine ?
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour savoir exactement quelles rubriques structurer et comment les nommer pour être bien parsé, consultez <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>

            {/* Section 6 */}
            <h2 id="regles-mise-en-page" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les règles de mise en page qui font vraiment la différence
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Une colonne unique</strong>,pas de layout en deux colonnes qui perturbe l&apos;ordre de lecture</li>
              <li><strong>Des titres de sections explicites</strong>,&ldquo;Expérience professionnelle&rdquo;, &ldquo;Formation&rdquo;, &ldquo;Compétences&rdquo;,pas de titres créatifs que l&apos;ATS ne reconnaît pas</li>
              <li><strong>Vos coordonnées dans le corps du document</strong>,pas dans l&apos;en-tête ou le pied de page</li>
              <li><strong>Pas de tableaux, ni de zones de texte, ni d&apos;images ou d&apos;icônes</strong></li>
              <li><strong>Une police standard</strong>,Arial, Calibri, Times New Roman, Georgia</li>
            </ul>

            {/* Section 7 */}
            <h2 id="ce-que-fait-rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse votre CV face à une offre d&apos;emploi spécifique et identifie ce qui pourrait poser problème, que ce soit le format, la structure ou les mots-clés.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV soit lu correctement, puis trouvé par le bon recruteur.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

            {/* Section 8 */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              PDF ou Word : les deux fonctionnent si votre CV est bien structuré.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le vrai enjeu c&apos;est la lisibilité : une colonne, des titres clairs, pas d&apos;éléments graphiques.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous ne savez pas quel format choisir, optez pour le Word pour les candidatures en ligne, le PDF pour les envois directs.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et dans tous les cas, testez votre CV avant de postuler.
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
