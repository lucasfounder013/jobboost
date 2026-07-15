import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Comment tester son CV ATS gratuitement | Rivjob",
  description:
    "Vous voulez savoir si votre CV passe bien les ATS avant de postuler ? Voici comment le tester gratuitement, et ce qu'il faut vraiment vérifier.",
  ...ogMeta(
    "Comment tester son CV ATS gratuitement | Rivjob",
    "Vous voulez savoir si votre CV passe bien les ATS avant de postuler ? Voici comment le tester gratuitement, et ce qu'il faut vraiment vérifier.",
    "/ressources/cv-ats/tester-son-cv-ats-gratuitement"
  ),
};

const TOC = [
  { id: "ce-que-tester-veut-dire",  titre: "Ce que \"tester son CV ATS\" veut vraiment dire", niveau: 2 },
  { id: "test-1-lisibilite",        titre: "Test 1 : vérifier la lisibilité de votre CV",     niveau: 2 },
  { id: "test-2-correspondance",    titre: "Test 2 : vérifier la correspondance avec l'offre", niveau: 2 },
  { id: "test-3-outil",             titre: "Test 3 : utiliser un outil d'analyse automatique", niveau: 2 },
  { id: "apres-le-test",            titre: "Ce qu'il faut vérifier après le test",             niveau: 2 },
  { id: "retenir",                  titre: "Ce qu'il faut retenir",                            niveau: 2 },
];

export default function ArticleTestCV() {
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
          <span className="text-gray-600">Tester son CV ATS gratuitement</span>
        </div>

        <ArticleJsonLd
          titre="Comment tester son CV ATS gratuitement | Rivjob"
          description="Vous voulez savoir si votre CV passe bien les ATS avant de postuler ? Voici comment le tester gratuitement, et ce qu'il faut vraiment vérifier."
          slug="/ressources/cv-ats/tester-son-cv-ats-gratuitement"
          datePublication="2026-06-12"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "Tester son CV ATS gratuitement", url: "/ressources/cv-ats/tester-son-cv-ats-gratuitement" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Comment tester son CV ATS gratuitement
        </h1>

        {/* Grille article + TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16 lg:items-start">

          {/* Colonne article */}
          <article>

            {/* Méta-ligne */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-10 pb-10 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-extrabold">RJ</span>
              </div>
              <span className="font-medium text-gray-700">Rivjob</span>
              <span className="text-gray-300">|</span>
              <span>12 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>4 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous avez retravaillé votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous pensez qu&apos;il est bon.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais est-ce qu&apos;il sera bien lu par un ATS quand vous postulez ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne nouvelle : vous pouvez le vérifier avant d&apos;envoyer votre première candidature, gratuitement, en quelques minutes.
            </p>

            {/* Section 1 */}
            <h2 id="ce-que-tester-veut-dire" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que &ldquo;tester son CV ATS&rdquo; veut vraiment dire
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant de chercher un outil, il faut comprendre ce qu&apos;on teste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tester son CV pour les ATS, ce n&apos;est pas vérifier si un robot va l&apos;accepter ou le rejeter. Comme on l&apos;a vu dans notre article sur <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qu&apos;est vraiment un ATS</Link>, les logiciels ne rejettent pas automatiquement les CV : ils les parsent et les stockent.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qu&apos;on teste réellement, c&apos;est deux choses.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              D&apos;abord <strong>la lisibilité</strong> : est-ce que l&apos;ATS peut extraire correctement le texte de votre CV ? Vos expériences, vos compétences, vos coordonnées sont-elles bien lues ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ensuite <strong>la correspondance</strong> : est-ce que votre CV contient les mots-clés que le recruteur va taper dans son ATS pour trouver votre profil ?
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV bien testé, c&apos;est un CV dont vous savez qu&apos;il sera trouvé quand le recruteur cherche votre profil.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="test-1-lisibilite" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Test 1 : vérifier la lisibilité de votre CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le test le plus simple et le plus rapide ne nécessite aucun outil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ouvrez votre CV dans votre logiciel de traitement de texte ou votre lecteur PDF. Sélectionnez tout le texte avec <strong>Ctrl+A</strong> (ou <strong>Cmd+A</strong> sur Mac), puis copiez-collez-le dans un document vierge ou un bloc-notes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce que vous voyez est exactement ce qu&apos;un ATS peut extraire de votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si le texte est bien organisé, lisible et dans le bon ordre : votre CV est bien parsable.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si le texte est mélangé, dans le mauvais ordre, ou si des informations manquent : votre mise en page pose problème.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les signes qui indiquent un problème : des colonnes dont le contenu se mélange, des coordonnées absentes, des compétences qui n&apos;apparaissent nulle part. Pour comprendre quelles mises en page posent problème, lisez notre article sur <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">le format de CV le mieux parsé par les ATS</Link>.
            </p>

            {/* Section 3 */}
            <h2 id="test-2-correspondance" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Test 2 : vérifier la correspondance avec l&apos;offre
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le test le plus important, et celui que la plupart des candidats ne font jamais.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Prenez l&apos;offre d&apos;emploi à laquelle vous voulez postuler. Listez les mots-clés principaux : le titre du poste, les compétences demandées, les outils mentionnés, les missions décrites.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cherchez chacun de ces mots dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              S&apos;ils n&apos;y sont pas, le recruteur ne vous trouvera pas quand il filtrera sa base de données ATS avec ces termes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est un travail manuel mais révélateur. Il montre exactement où votre CV ne correspond pas à l&apos;offre.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce test prend dix minutes. Il vous évite de postuler avec un CV que le recruteur ne trouvera jamais.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="test-3-outil" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Test 3 : utiliser un outil d&apos;analyse automatique
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin et gagner du temps, il existe des outils qui font cette analyse automatiquement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous uploadez votre CV, vous collez le texte de l&apos;offre d&apos;emploi, et l&apos;outil identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est exactement ce que fait Rivjob.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il analyse la correspondance entre votre CV et une offre précise, vous montre les mots-clés manquants, et vous indique quoi modifier pour améliorer votre visibilité dans l&apos;ATS du recruteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;analyse de base est gratuite et prend moins de deux minutes.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Tester mon CV gratuitement →
              </Link>
            </div>

            {/* Section 5 */}
            <h2 id="apres-le-test" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut vérifier après le test
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une fois votre test effectué, voici les points à corriger en priorité.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>Vos coordonnées sont dans le corps du document, pas uniquement dans l&apos;en-tête</li>
              <li>Votre titre de poste correspond exactement au poste que vous visez</li>
              <li>Vos compétences sont listées en texte brut, pas sous forme de graphiques ou d&apos;étoiles</li>
              <li>Les mots-clés de l&apos;offre apparaissent naturellement dans vos expériences et votre section compétences</li>
              <li>Votre CV est en une seule colonne si vous postulez via un formulaire en ligne</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin sur la structure du CV elle-même, notre article sur les <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">rubriques indispensables d&apos;un CV en 2026</Link> détaille ce que les recruteurs regardent en premier.
            </p>

            {/* Section 6 */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tester son CV pour les ATS, c&apos;est vérifier deux choses : que le texte est bien extractible, et que les bons mots-clés sont présents.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le test le plus simple est gratuit et prend deux minutes : copiez-collez votre CV dans un bloc-notes et regardez ce qui en ressort.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin, un outil comme Rivjob analyse automatiquement la correspondance entre votre CV et une offre précise, gratuitement.
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
