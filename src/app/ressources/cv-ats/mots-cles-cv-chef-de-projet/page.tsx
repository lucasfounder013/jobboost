import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";

export const metadata = {
  title: "Mots-clés CV Chef de Projet : liste complète 2026 | JobBoost",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Chef de Projet qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
};

const TOC = [
  { id: "pourquoi-mots-cles",     titre: "Pourquoi les mots-clés sont critiques",           niveau: 2 },
  { id: "liste-mots-cles",        titre: "Les 30 mots-clés incontournables par catégorie",   niveau: 2 },
  { id: "competences-techniques", titre: "Compétences techniques",                            niveau: 3 },
  { id: "soft-skills",            titre: "Soft skills",                                       niveau: 3 },
  { id: "outils-logiciels",       titre: "Outils et logiciels",                               niveau: 3 },
  { id: "certifications",         titre: "Certifications reconnues",                          niveau: 3 },
  { id: "integrer-mots-cles",     titre: "Comment les intégrer naturellement",                niveau: 2 },
  { id: "erreurs-a-eviter",       titre: "Les erreurs à éviter",                              niveau: 2 },
  { id: "faq",                    titre: "FAQ : ATS et CV Chef de Projet",                    niveau: 2 },
  { id: "ce-que-fait-jobboost",   titre: "Ce que fait JobBoost",                              niveau: 2 },
];

export default function ArticleMotsClesChefDeProjet() {
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
          <span className="text-gray-600">Mots-clés CV Chef de Projet</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Chef de Projet : liste complète 2026 pour passer les ATS
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
              <span>3 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Chef de Projet IT, Chef de Projet digital, Chef de Projet construction, Chef de Projet marketing.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le même intitulé de poste recouvre des réalités très différentes selon les secteurs. Et pourtant, les recruteurs qui cherchent dans leur ATS utilisent souvent les mêmes mots-clés techniques, quelle que soit l&apos;industrie.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur ne tape pas &ldquo;compétences managériales&rdquo; dans sa barre de recherche. Il tape &ldquo;gestion des risques&rdquo;, &ldquo;Jira&rdquo; ou &ldquo;PMP&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les 30 mots-clés que vous devez absolument avoir dans votre CV pour être trouvé.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Chef de Projet
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le poste de Chef de Projet est l&apos;un des plus demandés sur le marché. C&apos;est aussi l&apos;un des plus concurrentiels.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand une offre reçoit plusieurs centaines de candidatures, le recruteur ne lit pas les CV un par un. Il ouvre son ATS et filtre la base avec des mots-clés précis, exactement comme on fait une recherche Google.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre concrètement <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment un recruteur navigue dans son ATS et ce qu&apos;il voit en premier</Link>, notre article dédié vous donnera une vision précise du processus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les profils qui remontent dans les résultats sont ceux dont le CV contient les mots exacts tapés par le recruteur. Les autres restent invisibles, même si leur expérience est solide.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre expérience qui vous élimine. C&apos;est l&apos;absence du bon mot dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un Chef de Projet, le risque est double : utiliser des formulations trop génériques d&apos;un côté, ou trop techniques et spécifiques à une seule industrie de l&apos;autre. La liste ci-dessous couvre le vocabulaire universel du métier.
            </p>

            {/* Section 2 */}
            <h2 id="liste-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 30 mots-clés incontournables par catégorie
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont organisés par catégorie pour vous aider à les répartir dans les bonnes rubriques de votre CV.
            </p>

            {/* H3 : Compétences techniques */}
            <h3 id="competences-techniques" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Compétences techniques
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce sont les mots-clés les plus recherchés par les recruteurs. Ils décrivent ce que vous savez faire concrètement.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Gestion de projet</strong> : le terme générique de base, indispensable dans toutes les rubriques</li>
              <li><strong>Planification de projet</strong> : création et suivi du planning, jalons, livrables</li>
              <li><strong>Gestion des risques</strong> : identification, évaluation et mitigation des risques projet</li>
              <li><strong>Gestion du budget</strong> : pilotage financier, contrôle des coûts, budgétisation</li>
              <li><strong>Pilotage de projet</strong> : variante souvent utilisée dans les offres françaises</li>
              <li><strong>Conduite du changement</strong> : accompagnement des équipes lors de transformations</li>
              <li><strong>Gestion des parties prenantes</strong> : coordination avec les sponsors, clients, équipes</li>
              <li><strong>Reporting de projet</strong> : tableaux de bord, indicateurs de performance, compte-rendu</li>
            </ul>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales sont souvent cherchées en complément des compétences techniques dans les filtres ATS.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Leadership</strong> : capacité à conduire une équipe vers un objectif commun</li>
              <li><strong>Communication transversale</strong> : échanges efficaces entre des équipes et niveaux hiérarchiques différents</li>
              <li><strong>Négociation</strong> : arbitrage des contraintes entre coût, délai et qualité</li>
              <li><strong>Résolution de problèmes</strong> : capacité à débloquer des situations complexes en cours de projet</li>
              <li><strong>Gestion des priorités</strong> : arbitrage entre les tâches urgentes et importantes</li>
              <li><strong>Animation d&apos;équipe</strong> : facilitation, motivation, coordination au quotidien</li>
              <li><strong>Adaptabilité</strong> : réactivité face aux changements de périmètre ou de contexte</li>
            </ul>

            {/* H3 : Outils */}
            <h3 id="outils-logiciels" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Outils et logiciels
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs et les ATS cherchent souvent des noms d&apos;outils précis. Listez uniquement ceux que vous maîtrisez vraiment.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Microsoft Project</strong> : référence pour la planification dans les grandes entreprises</li>
              <li><strong>Jira</strong> : incontournable dans les environnements Agile et tech</li>
              <li><strong>Confluence</strong> : documentation de projet, souvent associé à Jira</li>
              <li><strong>Trello</strong> : gestion visuelle des tâches, très utilisé dans les PME</li>
              <li><strong>Asana</strong> : outil de gestion de projet populaire dans les startups et scaleups</li>
              <li><strong>Monday.com</strong> : en forte progression dans les ETI françaises</li>
              <li><strong>Excel avancé</strong> : toujours demandé pour les tableaux de bord et le reporting</li>
              <li><strong>PowerPoint</strong> : présentation aux comités de pilotage et aux parties prenantes</li>
              <li><strong>Smartsheet</strong> : alternative à Microsoft Project, populaire dans les projets transverses</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Listez uniquement les outils que vous maîtrisez vraiment. Un recruteur technique vérifiera lors de l&apos;entretien.
              </p>
            </blockquote>

            {/* H3 : Certifications */}
            <h3 id="certifications" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Certifications reconnues
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces certifications sont explicitement recherchées dans les filtres ATS des grandes entreprises et cabinets de recrutement.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>PMP</strong> (Project Management Professional) : la certification la plus reconnue au niveau international</li>
              <li><strong>PRINCE2</strong> : très répandu en Europe, notamment dans le secteur public et les ESN</li>
              <li><strong>PMI</strong> / <strong>PMI-ACP</strong> : certification Agile du Project Management Institute</li>
              <li><strong>Agile</strong> : mentionnez les méthodologies Agile pratiquées, même sans certification formelle</li>
              <li><strong>Scrum</strong> / <strong>Scrum Master</strong> : cadre Agile le plus utilisé, certification PSM ou CSM souvent demandée</li>
              <li><strong>CAPM</strong> : Certified Associate in Project Management, pour les profils junior</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas encore de certification, mentionnez au moins les méthodologies que vous pratiquez : Agile, Scrum, Kanban, Waterfall, Lean. Ces termes sont cherchés par les ATS indépendamment des certifications.
            </p>

            {/* Section 3 */}
            <h2 id="integrer-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment intégrer ces mots-clés naturellement dans son CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La tentation est forte de créer une rubrique &ldquo;Mots-clés&rdquo; avec une liste de 30 termes. C&apos;est une erreur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS modernes valorisent les mots-clés qui apparaissent dans leur contexte, pas les listes à plat. Un mot-clé mentionné dans une description d&apos;expérience a plus de poids qu&apos;un mot-clé isolé.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne méthode est de répartir ces mots-clés dans les rubriques existantes de votre CV. Pour savoir exactement où et comment structurer chaque section, consultez notre guide sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici des exemples concrets de reformulation :
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 1</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Participation au suivi de projets</p>
                <p className="text-gray-800 font-medium text-lg">Pilotage de projets transverses avec gestion des risques et reporting hebdomadaire aux parties prenantes</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Utilisation d&apos;outils de gestion de projet</p>
                <p className="text-gray-800 font-medium text-lg">Gestion de projets sous Jira et Confluence, planification sous Microsoft Project, reporting Excel avancé</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Management d&apos;une équipe</p>
                <p className="text-gray-800 font-medium text-lg">Leadership d&apos;une équipe de 8 personnes en méthode Agile/Scrum, animation des cérémonies et conduite du changement</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV bien rédigé contient naturellement 15 à 20 mots-clés pertinents. Pas besoin de forcer, le vocabulaire du métier suffit.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certaines pratiques très répandues nuisent directement à la lisibilité ATS de votre CV.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Utiliser des graphiques ou barres de progression pour les compétences.</strong>{" "}
                Ces éléments visuels sont invisibles pour un ATS. Seul le texte est indexé. Pour comprendre pourquoi la mise en page compte, lisez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre article sur le format PDF ou Word et le parsing ATS</Link>.
              </li>
              <li>
                <strong>Mettre des mots-clés génériques sans contexte.</strong>{" "}
                &ldquo;Dynamique&rdquo;, &ldquo;rigoureux&rdquo;, &ldquo;autonome&rdquo; n&apos;apportent rien à un ATS. Un recruteur ne les cherche pas dans sa base de données.
              </li>
              <li>
                <strong>Ignorer le vocabulaire exact de l&apos;offre ciblée.</strong>{" "}
                Si l&apos;offre dit &ldquo;chef de projet MOA&rdquo;, mettez &ldquo;MOA&rdquo; dans votre CV. Si elle dit &ldquo;project manager&rdquo;, incluez cette variante anglaise.
              </li>
              <li>
                <strong>Mentionner les méthodologies seulement dans les compétences.</strong>{" "}
                Agile, Scrum ou Kanban doivent apparaître aussi dans vos descriptions d&apos;expériences, avec des exemples concrets de leur application.
              </li>
              <li>
                <strong>Lister des certifications sans préciser l&apos;année et le niveau.</strong>{" "}
                &ldquo;PMP certifié 2023&rdquo; est plus crédible et plus précis qu&apos;&ldquo;PMP&rdquo; seul. Certains ATS filtrent sur les certifications récentes.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Chef de Projet
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Un recruteur tape-t-il vraiment &ldquo;Chef de Projet&rdquo; dans son ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, mais pas seulement. Il peut aussi chercher &ldquo;Project Manager&rdquo;, &ldquo;CDP&rdquo;, &ldquo;responsable de projet&rdquo; ou &ldquo;chef de programme&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour cette raison, il est conseillé d&apos;inclure plusieurs variantes dans votre titre de poste et vos descriptions d&apos;expériences. Pour comprendre en détail <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment fonctionne vraiment un ATS et pourquoi le titre de poste est si important</Link>, notre article de référence vous donnera les bases.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Dois-je adapter ma liste de mots-clés selon le secteur ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Absolument. Un Chef de Projet IT utilise Jira, Agile, Sprint, User Story. Un Chef de Projet construction parle de CCTP, MOE, planning Gantt, DICT. Un Chef de Projet marketing travaille avec des briefs, des KPI, des outils CRM.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La liste de cet article couvre le vocabulaire transversal commun à tous les secteurs. Pour les mots-clés spécifiques à votre industrie, analysez les offres d&apos;emploi réelles du secteur visé.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de mots-clés mettre sur un CV d&apos;une page ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a pas de limite stricte, mais la densité doit rester naturelle. Un CV bien rédigé contient naturellement 15 à 20 mots-clés pertinents sur une page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La règle d&apos;or : si vous deviez lire votre CV à voix haute, est-ce que ça sonne naturel ? Si oui, la densité est correcte. Si la lecture semble forcée ou répétitive, allégez.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Est-ce qu&apos;un ATS vérifie si mes certifications sont vraies ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non. L&apos;ATS se contente d&apos;indexer le texte de votre CV et de le rendre cherchable par le recruteur. La vérification des certifications se fait lors des entretiens ou en arrière-plan après une embauche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre toutes les étapes entre la réception de votre candidature et le premier appel, lisez notre article sur <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe vraiment après avoir postulé</Link>.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Mon CV Word est-il mieux parsé qu&apos;un PDF pour un poste Chef de Projet ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Généralement oui, surtout si vous postulez via des ATS anciens comme Taleo, très présent dans les secteurs bancaire et industriel où les postes de Chef de Projet sont nombreux.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un arbitrage complet sur ce sujet, consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif PDF ou Word pour les ATS</Link>. Et pour savoir quel ATS utilise l&apos;entreprise où vous postulez, notre guide sur <Link href="/ressources/cv-ats/ats-les-plus-utilises-en-france" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les ATS les plus utilisés en France</Link> vous donnera les informations nécessaires.
            </p>

            {/* Section 6 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette liste vous donne les mots-clés universels du poste de Chef de Projet. Mais chaque offre d&apos;emploi a ses propres priorités.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique. Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV, ceux que le recruteur tapera dans son ATS pour trouver le bon profil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV apparaisse quand le recruteur cherche un Chef de Projet avec exactement votre profil.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

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
