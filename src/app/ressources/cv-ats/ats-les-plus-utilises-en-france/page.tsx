import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "../quest-ce-qu-un-ats/ShareButtons";

export const metadata = {
  title: "Les ATS les plus utilisés en France, et ce que ça change pour vous | JobBoost",
  description:
    "Workday, Taleo, SAP, Greenhouse, Welcome to the Jungle... Quels ATS les entreprises françaises utilisent vraiment, et est-ce que ça change quelque chose pour votre CV ?",
};

const TOC = [
  { id: "savoir-quel-ats",      titre: "Comment savoir quel ATS utilise une entreprise",    niveau: 2 },
  { id: "workday",              titre: "Workday, le plus répandu dans les grandes entreprises", niveau: 2 },
  { id: "taleo",                titre: "Taleo, le vétéran du recrutement",                   niveau: 2 },
  { id: "sap",                  titre: "SAP SuccessFactors, le choix des ETI françaises",    niveau: 2 },
  { id: "greenhouse",           titre: "Greenhouse, le favori des startups et scaleups",     niveau: 2 },
  { id: "welcome",              titre: "Welcome to the Jungle, le cas particulier",           niveau: 2 },
  { id: "ca-change-vraiment",   titre: "Est-ce que ça change vraiment quelque chose ?",      niveau: 2 },
  { id: "ce-que-fait-jobboost", titre: "Ce que fait JobBoost",                               niveau: 2 },
  { id: "retenir",              titre: "Ce qu'il faut retenir",                              niveau: 2 },
];

export default function ArticleATSLesPlusUtilises() {
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
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">CV &amp; ATS</Link>
          <span>›</span>
          <span className="text-gray-600">Les ATS les plus utilisés en France</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Les ATS les plus utilisés en France, et ce que ça change pour vous
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
              <span>20 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>5 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Derrière chaque formulaire de candidature en ligne, il y a un logiciel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce logiciel reçoit votre CV, en extrait les informations, et les stocke dans une base de données.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais tous les ATS ne fonctionnent pas exactement de la même façon. Et savoir lequel utilise l&apos;entreprise où vous postulez peut vous donner une longueur d&apos;avance.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas encore lu notre article sur <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qu&apos;est vraiment un ATS</Link>, commencez par là pour comprendre les bases.
            </p>

            {/* Section 1 */}
            <h2 id="savoir-quel-ats" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment savoir quel ATS utilise une entreprise
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant de rentrer dans le détail de chaque outil, une bonne nouvelle : vous pouvez souvent deviner quel ATS utilise une entreprise avant même de postuler.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;URL de la page de candidature est votre meilleur indice.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Si l&apos;URL contient &laquo;&nbsp;greenhouse.io&nbsp;&raquo;, l&apos;entreprise utilise Greenhouse.</li>
              <li>Si elle contient &laquo;&nbsp;workday.com&nbsp;&raquo;, c&apos;est Workday.</li>
              <li>Si elle contient &laquo;&nbsp;jobs.lever.co&nbsp;&raquo;, c&apos;est Lever.</li>
              <li>Si elle redirige vers &laquo;&nbsp;welcomekit.co&nbsp;&raquo;, c&apos;est Welcome to the Jungle.</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour les grandes entreprises françaises, l&apos;URL de la page carrière suffit souvent à identifier le logiciel utilisé.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin sur cette méthode de détection, nous avons consacré un guide complet à <Link href="/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment savoir si une entreprise utilise un ATS avant de postuler</Link>.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Regardez l&apos;URL avant de postuler. Elle vous dit souvent quel ATS vous allez affronter.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="workday" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Workday, le plus répandu dans les grandes entreprises
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Workday est l&apos;ATS le plus utilisé par les grandes entreprises et les multinationales présentes en France.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;Oréal, Airbus, BNP Paribas, Société Générale, Total, Capgemini, parmi d&apos;autres, utilisent Workday pour gérer leurs recrutements.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Ce que ça change pour vous :</strong> Workday est connu pour un parsing assez robuste des fichiers Word et PDF texte. Mais il est aussi connu pour ses longs formulaires de candidature qui vous demandent de ressaisir manuellement les informations déjà présentes dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Conseil pratique :</strong> préparez un CV en texte brut, bien structuré, avec des rubriques clairement nommées. Workday les reconnaît bien.
            </p>

            {/* Section 3 */}
            <h2 id="taleo" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Taleo, le vétéran du recrutement
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Taleo, racheté par Oracle, est l&apos;un des plus anciens ATS du marché. Il reste très utilisé par les grandes entreprises françaises, notamment dans les secteurs public, bancaire et industriel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Ce que ça change pour vous :</strong> Taleo est réputé pour un parsing plus capricieux que ses concurrents modernes. Les mises en page complexes, les colonnes multiples et les tableaux posent souvent problème.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Conseil pratique :</strong> avec Taleo, optez systématiquement pour un CV en une seule colonne, format Word, structure la plus simple possible.
            </p>

            {/* Section 4 */}
            <h2 id="sap" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              SAP SuccessFactors, le choix des ETI françaises
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              SAP SuccessFactors est très présent dans les entreprises de taille intermédiaire en France, notamment dans l&apos;industrie, la logistique et les services.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Ce que ça change pour vous :</strong> SuccessFactors gère bien les fichiers Word et PDF texte. Son interface recruteur met en avant le titre de poste et les compétences en premier.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Conseil pratique :</strong> soignez particulièrement votre titre de poste et la section compétences, ce sont les premiers éléments que le recruteur verra dans sa fiche candidat.
            </p>

            {/* Section 5 */}
            <h2 id="greenhouse" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Greenhouse, le favori des startups et scaleups
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Greenhouse est très populaire parmi les startups et scaleups françaises, notamment dans la tech. Alan, Doctolib, Contentsquare, Swile utilisent ou ont utilisé Greenhouse.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Ce que ça change pour vous :</strong> Greenhouse est l&apos;un des ATS les plus modernes et les mieux conçus pour le parsing. Il gère bien la plupart des formats de CV courants.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Son interface recruteur est aussi très visuelle, avec un pipeline clair qui montre l&apos;avancement de chaque candidature. Les recruteurs qui l&apos;utilisent ont tendance à être plus réactifs.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Conseil pratique :</strong> avec Greenhouse, le fond prime sur la forme. Un CV bien rédigé avec les bons mots-clés sera plus efficace qu&apos;un CV visuellement impressionnant.
            </p>

            {/* Section 6 */}
            <h2 id="welcome" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Welcome to the Jungle, le cas particulier
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Welcome to the Jungle est à la fois une plateforme de diffusion d&apos;offres et un ATS intégré, très utilisé par les entreprises françaises de toutes tailles.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Ce que ça change pour vous :</strong> Welcome to the Jungle affiche souvent le CV original directement au recruteur, sans passer uniquement par une fiche parsée. La mise en page de votre CV compte donc davantage ici que sur d&apos;autres ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Conseil pratique :</strong> si vous postulez via Welcome to the Jungle, soignez autant la lisibilité machine que la lisibilité humaine de votre CV.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Welcome to the Jungle est l&apos;exception qui confirme la règle : ici, votre mise en page sera vue par un humain.
              </p>
            </blockquote>

            {/* Section 7 */}
            <h2 id="ca-change-vraiment" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Est-ce que ça change vraiment quelque chose ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Honnêtement, dans la grande majorité des cas, non.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les règles de base fonctionnent avec tous les ATS : une colonne, des rubriques claires, du texte brut, les bons mots-clés.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Connaître l&apos;ATS utilisé vous donne surtout un avantage psychologique : vous savez à quoi vous attendre, vous adaptez légèrement votre format, vous évitez les pièges spécifiques.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais le vrai travail reste le même partout : un CV dont le contenu correspond à ce que le recruteur cherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour une liste complète de ces rubriques et comment les optimiser quel que soit l&apos;ATS, consultez notre guide sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>

            {/* Section 8 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Peu importe l&apos;ATS que l&apos;entreprise utilise, JobBoost analyse la correspondance entre votre CV et l&apos;offre d&apos;emploi.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV, ceux que le recruteur tapera dans sa barre de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif est toujours le même : que vous soyez trouvé.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

            {/* Section 9 */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS les plus utilisés en France sont Workday dans les grandes entreprises, Taleo dans les secteurs traditionnels, SAP SuccessFactors dans les ETI, Greenhouse dans les startups tech, et Welcome to the Jungle pour beaucoup d&apos;entreprises françaises de toutes tailles.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Chacun a ses particularités, mais les règles de base restent les mêmes : CV simple, bien structuré, avec les bons mots-clés.
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
