import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";

export const metadata = {
  title: "Mots-clés CV Développeur Web : liste complète 2026 | JobBoost",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Développeur Web qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
};

const TOC = [
  { id: "pourquoi-mots-cles",     titre: "Pourquoi les mots-clés sont critiques",          niveau: 2 },
  { id: "liste-mots-cles",        titre: "Les 30 mots-clés incontournables par catégorie",  niveau: 2 },
  { id: "langages-programmation", titre: "Langages de programmation",                        niveau: 3 },
  { id: "frameworks-librairies",  titre: "Frameworks et librairies",                         niveau: 3 },
  { id: "outils-devops",          titre: "Outils et DevOps",                                 niveau: 3 },
  { id: "soft-skills",            titre: "Soft skills",                                      niveau: 3 },
  { id: "integrer-mots-cles",     titre: "Comment les intégrer naturellement",               niveau: 2 },
  { id: "erreurs-a-eviter",       titre: "Les erreurs à éviter",                             niveau: 2 },
  { id: "faq",                    titre: "FAQ : ATS et CV Développeur Web",                  niveau: 2 },
  { id: "ce-que-fait-jobboost",   titre: "Ce que fait JobBoost",                             niveau: 2 },
];

export default function ArticleMotsClesDeveloppeurWeb() {
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
          <span className="text-gray-600">Mots-clés CV Développeur Web</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Développeur Web : liste complète 2026 pour passer les ATS
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
              <span>10 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Développeur front-end, développeur back-end, développeur full-stack. Le même secteur recouvre des dizaines de réalités selon les entreprises, les stacks et les secteurs.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et pourtant, les recruteurs qui filtrent dans leur ATS utilisent les mêmes termes techniques, quelle que soit la spécialité visée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur ne tape pas &ldquo;bon développeur&rdquo; dans sa barre de recherche. Il tape &ldquo;React&rdquo;, &ldquo;Node.js&rdquo;, &ldquo;Docker&rdquo; ou &ldquo;TypeScript&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un profil sans ces termes reste invisible, même si son GitHub est excellent. Voici les 30 mots-clés à intégrer pour être trouvé.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Développeur Web
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le poste de développeur web est parmi les profils les plus sourcés via ATS dans les ESN, les startups et les grandes entreprises tech. La demande est forte, mais la concurrence aussi.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs tech ne filtrent pas sur &ldquo;développeur&rdquo; seul. Ils filtrent sur la stack. Un recruteur qui cherche un profil React ne tapera pas &ldquo;JavaScript&rdquo; dans son ATS. Il tapera &ldquo;React&rdquo; ou &ldquo;React.js&rdquo; directement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre concrètement <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment un recruteur navigue dans son ATS et ce qu&apos;il voit en premier</Link>, notre article dédié vous donnera une vision précise du processus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les profils qui remontent dans les résultats sont ceux dont le CV contient les mots exacts tapés par le recruteur. Les autres restent invisibles, même si leur expérience est solide et leurs projets personnels impressionnants.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre portfolio qui vous élimine. C&apos;est l&apos;absence du bon framework dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un développeur web, le risque est d&apos;utiliser des formulations trop génériques comme &ldquo;développement web&rdquo; ou &ldquo;langages front-end&rdquo; au lieu des termes précis recherchés par les recruteurs : &ldquo;React&rdquo;, &ldquo;Vue.js&rdquo;, &ldquo;REST API&rdquo;. La liste ci-dessous couvre le vocabulaire essentiel pour tous les profils développeur web.
            </p>

            {/* Section 2 */}
            <h2 id="liste-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 30 mots-clés incontournables par catégorie
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont organisés par catégorie pour vous aider à les répartir dans les bonnes rubriques de votre CV.
            </p>

            {/* H3 : Langages de programmation */}
            <h3 id="langages-programmation" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Langages de programmation
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les langages sont les premiers termes filtrés par les ATS dans les offres de développeur. Mentionnez-les avec précision, en indiquant la version ou le niveau quand c&apos;est pertinent.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>HTML5 / CSS3</strong> : bases incontournables du front-end, à mentionner explicitement même si elles semblent évidentes pour un développeur web</li>
              <li><strong>JavaScript</strong> : langage pivot du web, à préciser ES6+ pour montrer la maîtrise des versions modernes et des fonctionnalités récentes</li>
              <li><strong>TypeScript</strong> : variante typée de JavaScript, très demandée dans les projets React et Angular en production au sein des équipes structurées</li>
              <li><strong>Python</strong> : de plus en plus présent dans le web via Django, Flask et les scripts d&apos;automatisation, à inclure si vous l&apos;utilisez réellement</li>
              <li><strong>PHP</strong> : encore très répandu dans les CMS et les agences web, indispensable pour les développeurs qui travaillent avec Symfony ou Laravel</li>
              <li><strong>SQL</strong> : requêtes et manipulation de bases de données relationnelles, à préciser le SGBD utilisé (MySQL, PostgreSQL, SQLite)</li>
              <li><strong>Java</strong> : présent dans les ESN et grandes entreprises pour les applications web back-end, souvent associé à Spring Boot</li>
              <li><strong>C#</strong> : utilisé dans les environnements Microsoft et .NET, à mentionner pour les développeurs full-stack en entreprise ou en ESN</li>
            </ul>

            {/* H3 : Frameworks et librairies */}
            <h3 id="frameworks-librairies" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Frameworks et librairies
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les frameworks sont les termes les plus recherchés dans les offres de développeur web. Un ATS cherche souvent &ldquo;React&rdquo; ou &ldquo;Vue&rdquo; avant même le mot &ldquo;développeur&rdquo; dans ses filtres.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>React / React.js</strong> : framework front-end dominant sur le marché français, présent dans la majorité des offres de développeur JavaScript</li>
              <li><strong>Vue.js</strong> : alternative à React très utilisée en France dans les PME et les startups, souvent apprécié pour sa courbe d&apos;apprentissage douce</li>
              <li><strong>Angular</strong> : framework Google présent dans les grandes entreprises et les ESN, souvent associé à TypeScript dans les projets d&apos;envergure</li>
              <li><strong>Node.js</strong> : runtime JavaScript côté serveur, indispensable pour les profils full-stack et les développeurs back-end JavaScript</li>
              <li><strong>Next.js</strong> : framework React avec rendu côté serveur et génération statique, de plus en plus demandé pour les projets web modernes</li>
              <li><strong>Laravel</strong> : framework PHP de référence, incontournable pour les développeurs PHP en agence web ou en startup</li>
              <li><strong>Django / Flask</strong> : frameworks Python pour le web, à mentionner si vous développez des API ou des applications back-end en Python</li>
              <li><strong>REST API / API RESTful</strong> : conception et consommation d&apos;API, terme générique recherché par tous les recruteurs tech sans exception</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un recruteur qui cherche un développeur React ne tapera jamais &ldquo;JavaScript&rdquo; seul dans son ATS. Il tape &ldquo;React&rdquo; et filtre directement sur le framework.
              </p>
            </blockquote>

            {/* H3 : Outils et DevOps */}
            <h3 id="outils-devops" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Outils et DevOps
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les outils de versioning et de déploiement sont systématiquement vérifiés dans les ATS des entreprises tech et des ESN. Ils sont devenus des prérequis, pas des différenciateurs.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Git / GitHub / GitLab</strong> : versioning incontournable, à préciser la plateforme utilisée en contexte professionnel et la pratique des code reviews</li>
              <li><strong>Docker</strong> : conteneurisation des applications, très recherché dans les postes full-stack et DevOps, à mentionner avec Docker Compose si utilisé</li>
              <li><strong>CI/CD</strong> : intégration et déploiement continus, terme générique à accompagner des outils réellement maîtrisés (GitHub Actions, Jenkins, GitLab CI)</li>
              <li><strong>AWS / Azure / GCP</strong> : plateformes cloud, à préciser la ou les plateformes réellement maîtrisées avec les services utilisés (S3, EC2, Lambda)</li>
              <li><strong>Linux</strong> : environnement serveur de référence, la maîtrise des commandes de base est souvent exigée pour les postes back-end et full-stack</li>
              <li><strong>Agile / Scrum</strong> : méthodologie de travail en équipe, quasi-systématique dans les équipes tech, à mentionner avec les rituels pratiqués (sprint, stand-up)</li>
              <li><strong>Webpack / Vite</strong> : outils de build front-end, à mentionner si vous configurez l&apos;outillage du projet et pas uniquement si vous en bénéficiez</li>
              <li><strong>Figma</strong> : outil de design collaboratif, utile pour les développeurs front-end qui intègrent directement les maquettes des designers</li>
            </ul>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales complètent le profil technique dans les filtres ATS, notamment pour les postes senior, les postes de lead développeur ou les équipes en forte croissance.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Veille technologique</strong> : capacité à suivre l&apos;évolution rapide des frameworks, des outils et des bonnes pratiques du secteur</li>
              <li><strong>Résolution de problèmes</strong> : débogage, optimisation des performances, gestion des incidents en production sous contrainte de temps</li>
              <li><strong>Travail en équipe</strong> : collaboration avec les équipes produit, design, QA et infrastructure dans un environnement pluridisciplinaire</li>
              <li><strong>Autonomie</strong> : capacité à avancer sur des tâches et à prendre des décisions techniques sans supervision constante, très valorisée en startup</li>
              <li><strong>Communication technique</strong> : capacité à vulgariser et à expliquer des choix techniques à des interlocuteurs non développeurs (product owner, client)</li>
              <li><strong>Adaptabilité</strong> : montée en compétence rapide sur de nouvelles technologies ou de nouveaux projets, essentielle dans un secteur en évolution permanente</li>
            </ul>

            {/* Section 3 */}
            <h2 id="integrer-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment intégrer ces mots-clés naturellement dans son CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La tentation est forte de créer une rubrique &ldquo;Compétences&rdquo; avec une liste de 30 technologies séparées par des virgules. C&apos;est une erreur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS modernes valorisent les mots-clés qui apparaissent dans leur contexte. Un mot-clé mentionné dans une description d&apos;expérience a plus de poids qu&apos;un terme isolé dans une rubrique compétences sans aucun exemple d&apos;utilisation.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne méthode est de répartir ces mots-clés dans les rubriques existantes de votre CV. Pour savoir exactement où et comment structurer chaque section, consultez notre guide sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici des exemples concrets de reformulation pour un CV Développeur Web :
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 1</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Développement web front-end</p>
                <p className="text-gray-800 font-medium text-lg">Développement d&apos;une application front-end en React avec TypeScript, intégration des maquettes Figma, déploiement automatisé via GitHub Actions</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Utilisation de Git au quotidien</p>
                <p className="text-gray-800 font-medium text-lg">Gestion du versioning avec Git et GitHub, code review en pull request, mise en place d&apos;une intégration continue (CI/CD) avec GitHub Actions</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Travail en équipe dans un environnement Agile</p>
                <p className="text-gray-800 font-medium text-lg">Collaboration en méthode Agile / Scrum avec un product owner, un designer Figma et deux développeurs back-end en Node.js, livraison en sprint de deux semaines</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV de développeur bien rédigé contient naturellement 15 à 20 mots-clés techniques. Le vocabulaire du métier suffit, sans forcer.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certaines pratiques très répandues chez les développeurs nuisent directement à la lisibilité ATS de leur CV.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Lister uniquement les langages sans les frameworks.</strong>{" "}
                Un ATS cherche &ldquo;React&rdquo;, pas &ldquo;JavaScript&rdquo; seul. Précisez toujours le framework ou la librairie associés au langage que vous maîtrisez.
              </li>
              <li>
                <strong>Omettre les versions et les précisions techniques.</strong>{" "}
                &ldquo;JavaScript ES6+&rdquo;, &ldquo;Python 3&rdquo;, &ldquo;Docker Compose&rdquo; sont plus précis et plus crédibles que les termes seuls. Certains ATS filtrent sur des versions spécifiques.
              </li>
              <li>
                <strong>Négliger les outils de versioning et de CI/CD.</strong>{" "}
                Git, GitHub, GitLab et les pipelines d&apos;intégration continue sont devenus des prérequis vérifiés systématiquement. Pour comprendre aussi l&apos;impact du format de votre CV sur le parsing, lisez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre article sur le format PDF ou Word et le parsing ATS</Link>.
              </li>
              <li>
                <strong>Utiliser uniquement des sigles sans les développer.</strong>{" "}
                &ldquo;CI/CD&rdquo; seul peut ne pas être indexé si le recruteur cherche &ldquo;intégration continue&rdquo; ou &ldquo;déploiement continu&rdquo;. Développez toujours la première occurrence de chaque sigle.
              </li>
              <li>
                <strong>Ignorer les mots-clés de méthodologie.</strong>{" "}
                Agile, Scrum, Kanban, sprint sont cherchés aussi souvent que les noms de frameworks dans les offres de développeur. Ne les reléguez pas à une simple ligne dans votre profil.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Développeur Web
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Un recruteur cherche-t-il vraiment &ldquo;React&rdquo; dans son ATS plutôt que &ldquo;développeur web&rdquo; ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, et c&apos;est systématique dans les équipes tech et les ESN. Les recruteurs filtrent directement sur la stack. Un ATS bien paramétré croise plusieurs termes : &ldquo;React&rdquo; ET &ldquo;TypeScript&rdquo; ET &ldquo;Node.js&rdquo; pour trouver un profil full-stack JavaScript.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre en détail <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment fonctionne vraiment un ATS et pourquoi l&apos;indexation des mots-clés est si déterminante</Link>, notre article de référence vous donnera les bases essentielles.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il adapter les mots-clés selon le type de poste (front-end, back-end, full-stack) ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Absolument. Un poste front-end valorise React, Vue, CSS3, Figma et l&apos;accessibilité web. Un back-end cherche Node.js, Laravel, SQL, Docker et les REST API. Un full-stack doit couvrir les deux dimensions pour remonter dans les résultats des deux types de requêtes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous évoluez vers des postes de pilotage ou de management technique, les <Link href="/ressources/cv-ats/mots-cles-cv-chef-de-projet" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés d&apos;un CV Chef de Projet</Link> vous seront également utiles pour compléter votre vocabulaire.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Mon portfolio GitHub remplace-t-il les mots-clés dans mon CV ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non. Un ATS ne visite pas votre profil GitHub. Il analyse uniquement le texte du document que vous soumettez. Votre portfolio est un atout pour convaincre lors de l&apos;entretien, mais pour passer le filtre ATS, chaque technologie doit être écrite en toutes lettres dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mentionnez vos projets GitHub dans une rubrique dédiée avec la stack utilisée pour chacun : cela double l&apos;occurrence des mots-clés techniques et renforce l&apos;indexation ATS.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de langages et frameworks dois-je lister sur mon CV ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Listez uniquement ceux que vous maîtrisez réellement. Cinq à huit technologies bien choisies et contextualisées valent mieux qu&apos;une liste de vingt outils que vous connaissez superficiellement. Un entretien technique vérifiera rapidement votre niveau réel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre toutes les étapes entre la réception de votre candidature et le premier appel du recruteur, lisez notre article sur <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe vraiment après avoir postulé</Link>.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les mots-clés en anglais sont-ils bien indexés par les ATS français ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, et souvent mieux que leur traduction française. Les frameworks et outils ont des noms anglais universels (React, Docker, Git) et les ATS les indexent tels quels. En revanche, les compétences comportementales et les intitulés de poste peuvent être cherchés en français. Mélangez les deux dans votre CV pour couvrir toutes les variantes de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les autres articles de notre série mots-clés CV peuvent vous aider si vous postulez à plusieurs types de postes : <Link href="/ressources/cv-ats/mots-cles-cv-commercial" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">CV Commercial</Link>, <Link href="/ressources/cv-ats/mots-cles-cv-charge-rh" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">CV Chargé RH</Link>, <Link href="/ressources/cv-ats/mots-cles-cv-comptable" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">CV Comptable</Link>, <Link href="/ressources/cv-ats/mots-cles-cv-marketing-manager" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">CV Marketing Manager</Link> et <Link href="/ressources/cv-ats/mots-cles-cv-ingenieur" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">CV Ingénieur</Link>.
            </p>

            {/* Section 6 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette liste vous donne les mots-clés universels du poste de développeur web. Mais chaque offre d&apos;emploi a ses propres priorités et ses propres termes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique. Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV, ceux que le recruteur tapera dans son ATS pour trouver le bon profil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV apparaisse quand le recruteur cherche un développeur web avec exactement votre stack et votre niveau d&apos;expérience.
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
