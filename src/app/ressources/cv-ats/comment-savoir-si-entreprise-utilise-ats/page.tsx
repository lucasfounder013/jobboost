import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "../quest-ce-qu-un-ats/ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Comment savoir si une entreprise utilise un ATS avant de postuler | Rivjob",
  description:
    "Il existe des indices simples pour détecter si une entreprise utilise un ATS avant même de postuler. Voici comment les repérer et ce que ça change pour votre candidature.",
  ...ogMeta(
    "Comment savoir si une entreprise utilise un ATS avant de postuler | Rivjob",
    "Il existe des indices simples pour détecter si une entreprise utilise un ATS avant même de postuler. Voici comment les repérer et ce que ça change pour votre candidature.",
    "/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats"
  ),
};

const TOC = [
  { id: "url-candidature",    titre: "L'URL de la page de candidature",       niveau: 2 },
  { id: "formulaire",         titre: "Le formulaire de candidature",           niveau: 2 },
  { id: "taille-entreprise",  titre: "La taille de l'entreprise",              niveau: 2 },
  { id: "plateforme",         titre: "La plateforme où est publiée l'offre",   niveau: 2 },
  { id: "changer-approche",   titre: "Est-ce que ça change votre approche ?",  niveau: 2 },
  { id: "rivjob",           titre: "Ce que fait Rivjob",                   niveau: 2 },
  { id: "conclusion",         titre: "Ce qu'il faut retenir",                  niveau: 2 },
];

export default function ArticleSavoirSiATS() {
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
          <span className="text-gray-600">Comment savoir si une entreprise utilise un ATS</span>
        </div>

        <ArticleJsonLd
          titre="Comment savoir si une entreprise utilise un ATS avant de postuler | Rivjob"
          description="Il existe des indices simples pour détecter si une entreprise utilise un ATS avant même de postuler. Voici comment les repérer et ce que ça change pour votre candidature."
          slug="/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats"
          datePublication="2026-05-23"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "Comment savoir si une entreprise utilise un ATS", url: "/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Comment savoir si une entreprise utilise un ATS avant de postuler
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
              <span>23 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>4 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous passez du temps à préparer votre candidature.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous adaptez votre CV, vous relisez votre lettre, vous cliquez sur envoyer.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais savez-vous ce qui se passe de l&apos;autre côté ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant même de postuler, il est souvent possible de savoir si votre CV va atterrir dans un ATS ou directement dans la boîte mail d&apos;un recruteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et cette information change votre façon de préparer votre candidature.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;êtes pas encore familier avec le fonctionnement d&apos;un ATS, notre article sur <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qu&apos;est vraiment un ATS</Link> est un bon point de départ avant de lire celui-ci.
            </p>

            {/* Section 1 */}
            <h2 id="url-candidature" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le premier indice, l&apos;URL de la page de candidature
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le moyen le plus simple et le plus fiable.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand vous cliquez sur &laquo;&nbsp;Postuler&nbsp;&raquo; sur une offre, regardez l&apos;URL de la page qui s&apos;ouvre.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Elle contient souvent le nom de l&apos;ATS utilisé :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>greenhouse.io</strong> ou <strong>boards.greenhouse.io</strong> : Greenhouse</li>
              <li><strong>workday.com</strong> ou <strong>myworkdayjobs.com</strong> : Workday</li>
              <li><strong>jobs.lever.co</strong> : Lever</li>
              <li><strong>welcomekit.co</strong> : Welcome to the Jungle</li>
              <li><strong>taleo.net</strong> : Taleo</li>
              <li><strong>successfactors.com</strong> : SAP SuccessFactors</li>
              <li><strong>recruitee.com</strong> : Recruitee</li>
              <li><strong>teamtailor.com</strong> : Teamtailor</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;URL vous redirige vers un domaine que vous ne reconnaissez pas, cherchez le nom de domaine sur Google. La plupart du temps vous trouverez rapidement de quel ATS il s&apos;agit.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour en savoir plus sur les caractéristiques de chaque ATS et ce qu&apos;ils changent concrètement, consultez notre article sur <Link href="/ressources/cv-ats/ats-les-plus-utilises-en-france" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les ATS les plus utilisés en France</Link>.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                L&apos;URL de la page de candidature est votre meilleur indice. Elle ne ment pas.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="formulaire" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le deuxième indice, le formulaire de candidature
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Regardez attentivement le formulaire que vous devez remplir pour postuler.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si le formulaire vous demande de ressaisir manuellement vos informations après avoir uploadé votre CV, c&apos;est presque certainement un ATS. C&apos;est une caractéristique typique de ces logiciels, qui parsent votre CV et vous demandent de corriger ou compléter les informations extraites.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si le formulaire est minimaliste, juste un champ pour uploader votre CV et un champ message, c&apos;est peut-être une candidature directe par email déguisée en formulaire.
            </p>

            {/* Section 3 */}
            <h2 id="taille-entreprise" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le troisième indice, la taille de l&apos;entreprise
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas une règle absolue, mais c&apos;est un bon indicateur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les entreprises de plus de 50 salariés utilisent presque toutes un ATS. Le volume de candidatures qu&apos;elles reçoivent rend la gestion manuelle impossible.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les très petites structures, TPE, associations, indépendants, gèrent souvent leurs candidatures par email directement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les startups en phase de croissance sont dans une zone intermédiaire : certaines ont déjà un ATS, d&apos;autres gèrent encore tout manuellement.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Plus l&apos;entreprise est grande, plus la probabilité d&apos;un ATS est élevée. Au-delà de 50 salariés, comptez dessus.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="plateforme" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le quatrième indice, la plateforme où est publiée l&apos;offre
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;endroit où vous avez trouvé l&apos;offre donne aussi un indice.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;offre est publiée directement sur le site carrière de l&apos;entreprise et que vous postulez depuis ce site, c&apos;est presque certainement un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;offre est sur LinkedIn et que vous postulez via &laquo;&nbsp;Candidature simplifiée&nbsp;&raquo;, LinkedIn gère lui-même la candidature et la transmet ensuite à l&apos;entreprise, parfois via leur ATS, parfois par email.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;offre vous demande d&apos;envoyer votre CV par email à une adresse recrutement@entreprise.com, il n&apos;y a probablement pas d&apos;ATS dans la boucle, au moins à cette étape.
            </p>

            {/* Section 5 */}
            <h2 id="changer-approche" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Est-ce que ça change vraiment votre approche ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, sur deux points précis.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous savez qu&apos;il y a un ATS : privilégiez un CV simple, une colonne, texte brut, avec les mots-clés de l&apos;offre. La mise en page compte moins que le contenu.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous savez qu&apos;il n&apos;y a pas d&apos;ATS et que votre CV sera lu directement par un humain : vous pouvez vous permettre une mise en page plus soignée et personnalisée. L&apos;accroche visuelle compte davantage.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans les deux cas, adapter son CV aux mots-clés de l&apos;offre reste utile. Qu&apos;il soit lu par un ATS ou par un humain, un recruteur cherche les mêmes compétences.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                ATS ou pas, un CV adapté à l&apos;offre est toujours plus efficace qu&apos;un CV générique.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre précisément ce qui se passe entre votre candidature et le premier contact du recruteur, lisez notre article sur <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe vraiment après avoir postulé</Link>.
            </p>

            {/* Section 6 */}
            <h2 id="rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Que votre candidature passe par un ATS ou arrive directement chez un recruteur, Rivjob analyse la correspondance entre votre CV et l&apos;offre d&apos;emploi.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il identifie les mots-clés de l&apos;offre qui manquent dans votre CV et vous indique exactement quoi ajuster.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : un CV qui convainc, qu&apos;il soit lu par une machine ou par un humain.
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
            <h2 id="conclusion" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour savoir si une entreprise utilise un ATS, regardez l&apos;URL de la page de candidature, observez le formulaire, tenez compte de la taille de l&apos;entreprise et de la plateforme où est publiée l&apos;offre.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si l&apos;URL contient un nom d&apos;ATS connu, vous avez votre réponse.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans tous les cas, adaptez votre CV à l&apos;offre. C&apos;est la règle qui fonctionne partout, avec ou sans ATS.
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
