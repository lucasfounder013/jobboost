import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Mots-clés CV Ingénieur : liste complète 2026 | Rivjob",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Ingénieur qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
  ...ogMeta(
    "Mots-clés CV Ingénieur : liste complète 2026 | Rivjob",
    "Découvrez les 30+ mots-clés indispensables pour un CV Ingénieur qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    "/ressources/cv-ats/mots-cles-cv-ingenieur"
  ),
};

const TOC = [
  { id: "pourquoi-mots-cles",     titre: "Pourquoi les mots-clés sont critiques",          niveau: 2 },
  { id: "liste-mots-cles",        titre: "Les 30 mots-clés incontournables par catégorie",  niveau: 2 },
  { id: "competences-techniques", titre: "Compétences techniques",                           niveau: 3 },
  { id: "outils-logiciels",       titre: "Outils et logiciels",                              niveau: 3 },
  { id: "certifications",         titre: "Certifications et diplômes",                       niveau: 3 },
  { id: "soft-skills",            titre: "Soft skills",                                      niveau: 3 },
  { id: "integrer-mots-cles",     titre: "Comment les intégrer naturellement",               niveau: 2 },
  { id: "erreurs-a-eviter",       titre: "Les erreurs à éviter",                             niveau: 2 },
  { id: "faq",                    titre: "FAQ : ATS et CV Ingénieur",                        niveau: 2 },
  { id: "ce-que-fait-rivjob",   titre: "Ce que fait Rivjob",                             niveau: 2 },
];

export default function ArticleMotsClesIngenieur() {
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
          <span className="text-gray-600">Mots-clés CV Ingénieur</span>
        </div>

        <ArticleJsonLd
          titre="Mots-clés CV Ingénieur : liste complète 2026 | Rivjob"
          description="Découvrez les 30+ mots-clés indispensables pour un CV Ingénieur qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples."
          slug="/ressources/cv-ats/mots-cles-cv-ingenieur"
          datePublication="2026-06-09"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "Mots-clés CV Ingénieur", url: "/ressources/cv-ats/mots-cles-cv-ingenieur" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Ingénieur : liste complète 2026 pour passer les ATS
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
              <span>9 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ingénieur généraliste, ingénieur d&apos;études, ingénieur de production, ingénieur R&amp;D. Le même intitulé de poste recouvre des dizaines de réalités selon les secteurs et les entreprises.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et pourtant, les recruteurs qui cherchent dans leur ATS utilisent souvent les mêmes mots-clés techniques, quelle que soit la spécialité visée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur ne tape pas &ldquo;compétences techniques solides&rdquo; dans sa barre de recherche. Il tape &ldquo;bureau d&apos;études&rdquo;, &ldquo;SolidWorks&rdquo; ou &ldquo;ISO 9001&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les 30 mots-clés que vous devez absolument avoir dans votre CV pour être trouvé.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Ingénieur
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le poste d&apos;ingénieur est parmi les plus recherchés dans les secteurs de l&apos;industrie, du BTP, de l&apos;IT et de l&apos;énergie. C&apos;est aussi l&apos;un des profils les plus filtrés via des logiciels ATS avant tout contact humain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand une offre reçoit plusieurs centaines de candidatures, le recruteur ne lit pas les dossiers un par un. Il ouvre son ATS et filtre la base avec des mots-clés précis, exactement comme on fait une recherche dans une base de données.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre concrètement <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment un recruteur navigue dans son ATS et ce qu&apos;il voit en premier</Link>, notre article dédié vous donnera une vision précise du processus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les profils qui remontent dans les résultats sont ceux dont le CV contient les mots exacts tapés par le recruteur. Les autres restent invisibles, même si leur formation est solide et leur expérience pertinente.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre formation qui vous élimine. C&apos;est l&apos;absence du bon mot dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un ingénieur, le risque est double : utiliser des formulations trop génériques d&apos;un côté, ou trop spécifiques à une seule spécialité technique de l&apos;autre. La liste ci-dessous couvre le vocabulaire transversal commun à tous les profils ingénieurs.
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
              Ce sont les mots-clés les plus recherchés par les recruteurs. Ils décrivent ce que vous savez faire concrètement sur le plan technique.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Conception technique</strong> : définition et développement de solutions techniques pour répondre à un besoin fonctionnel</li>
              <li><strong>Bureau d&apos;études</strong> : terme générique incontournable dans l&apos;industrie et le BTP, souvent cherché seul dans les ATS</li>
              <li><strong>Cahier des charges</strong> : rédaction et analyse des exigences techniques et fonctionnelles d&apos;un projet</li>
              <li><strong>Spécifications techniques</strong> : définition précise des contraintes et exigences à respecter pour un produit ou système</li>
              <li><strong>Analyse de risques techniques</strong> : identification et évaluation des risques liés à la conception ou à la production</li>
              <li><strong>Ingénierie système</strong> : approche globale d&apos;intégration des composants techniques dans un ensemble cohérent</li>
              <li><strong>Essais et validation</strong> : protocoles de test pour vérifier la conformité d&apos;un produit ou d&apos;un système</li>
              <li><strong>Calcul de structure</strong> : dimensionnement mécanique, résistance des matériaux, simulation numérique</li>
            </ul>

            {/* H3 : Outils et logiciels */}
            <h3 id="outils-logiciels" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Outils et logiciels
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs et les ATS cherchent souvent des noms d&apos;outils précis. Listez uniquement ceux que vous maîtrisez vraiment, en précisant votre niveau si possible.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>AutoCAD</strong> : référence pour la conception et le dessin technique en 2D dans tous les secteurs</li>
              <li><strong>SolidWorks</strong> : outil de CAO 3D dominant dans l&apos;industrie mécanique et la conception de produits</li>
              <li><strong>CATIA</strong> : incontournable dans l&apos;aéronautique, l&apos;automobile et la défense</li>
              <li><strong>MATLAB</strong> : environnement de calcul scientifique très répandu dans l&apos;ingénierie et la recherche</li>
              <li><strong>Python</strong> : langage de programmation de plus en plus demandé dans tous les domaines de l&apos;ingénierie</li>
              <li><strong>SAP</strong> : ERP de référence dans les grandes entreprises industrielles pour la gestion de production</li>
              <li><strong>Revit</strong> : outil de modélisation BIM indispensable dans le BTP et la construction</li>
              <li><strong>Excel avancé</strong> : toujours demandé pour les calculs, les tableaux de bord et le reporting technique</li>
              <li><strong>ERP</strong> : terme générique à mentionner si vous avez travaillé avec un système de gestion intégré</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Listez uniquement les logiciels que vous maîtrisez vraiment. Un entretien technique le vérifiera rapidement.
              </p>
            </blockquote>

            {/* H3 : Certifications et diplômes */}
            <h3 id="certifications" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Certifications et diplômes
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces certifications et mentions sont explicitement recherchées dans les filtres ATS des grandes entreprises et des cabinets de recrutement spécialisés en ingénierie.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Diplôme d&apos;ingénieur (CTI)</strong> : mention obligatoire, préciser l&apos;école et la spécialité pour un meilleur parsing ATS</li>
              <li><strong>Master en ingénierie</strong> : variante universitaire équivalente, à mentionner avec l&apos;intitulé exact du diplôme</li>
              <li><strong>ISO 9001</strong> : norme de management de la qualité, très recherchée dans l&apos;industrie et les ESN</li>
              <li><strong>Six Sigma</strong> : méthode d&apos;amélioration de la qualité et de réduction des défauts, mentionner le niveau (Green Belt, Black Belt)</li>
              <li><strong>Lean Manufacturing</strong> : approche d&apos;optimisation des processus industriels, souvent associée à Six Sigma</li>
              <li><strong>PMP</strong> : certification Project Management Professional, utile pour les ingénieurs qui pilotent des projets</li>
              <li><strong>Habilitation électrique</strong> : certification réglementaire indispensable dans de nombreux postes industriels</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas encore de certification qualité, mentionnez au moins les normes et référentiels que vous connaissez : ISO 9001, ISO 14001, EN 9100, IATF 16949. Ces termes sont recherchés par les ATS indépendamment des certifications formelles.
            </p>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales sont souvent cherchées en complément des compétences techniques dans les filtres ATS, notamment pour les profils senior ou les postes à responsabilité.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Résolution de problèmes</strong> : capacité à analyser des défaillances techniques et à proposer des solutions concrètes</li>
              <li><strong>Rigueur</strong> : précision dans les calculs, les procédures et le respect des normes techniques</li>
              <li><strong>Esprit d&apos;analyse</strong> : décomposition de problèmes complexes en éléments maîtrisables</li>
              <li><strong>Travail en équipe pluridisciplinaire</strong> : collaboration avec des équipes mécanique, électronique, logiciel ou commerciale</li>
              <li><strong>Communication technique</strong> : capacité à vulgariser et à présenter des sujets techniques à des interlocuteurs non spécialistes</li>
              <li><strong>Gestion de projet</strong> : coordination des ressources, des délais et des livrables dans un contexte technique</li>
            </ul>

            {/* Section 3 */}
            <h2 id="integrer-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment intégrer ces mots-clés naturellement dans son CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La tentation est forte de créer une rubrique &ldquo;Mots-clés&rdquo; avec une liste de 30 termes. C&apos;est une erreur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS modernes valorisent les mots-clés qui apparaissent dans leur contexte, pas les listes à plat. Un mot-clé mentionné dans une description d&apos;expérience a plus de poids qu&apos;un mot-clé isolé dans une rubrique compétences.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne méthode est de répartir ces mots-clés dans les rubriques existantes de votre CV. Pour savoir exactement où et comment structurer chaque section, consultez notre guide sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici des exemples concrets de reformulation pour un CV Ingénieur :
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 1</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Participation à des études techniques</p>
                <p className="text-gray-800 font-medium text-lg">Conception technique et rédaction de cahiers des charges pour des projets industriels dans le secteur automobile</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Utilisation de logiciels de conception</p>
                <p className="text-gray-800 font-medium text-lg">Modélisation 3D sous SolidWorks et CATIA, simulation numérique sous MATLAB, reporting et suivi sous Excel avancé</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Travail en équipe</p>
                <p className="text-gray-800 font-medium text-lg">Coordination avec des équipes pluridisciplinaires (mécanique, électronique, logiciel) dans un environnement Agile, avec reporting hebdomadaire aux parties prenantes</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV d&apos;ingénieur bien rédigé contient naturellement 15 à 20 mots-clés techniques. Le vocabulaire du métier suffit, sans forcer.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certaines pratiques très répandues chez les ingénieurs nuisent directement à la lisibilité ATS de leur CV.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Utiliser des graphiques ou barres de progression pour les compétences.</strong>{" "}
                Ces éléments visuels sont invisibles pour un ATS. Seul le texte est indexé. Pour comprendre pourquoi la mise en page compte, lisez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre article sur le format PDF ou Word et le parsing ATS</Link>.
              </li>
              <li>
                <strong>Utiliser des acronymes techniques sans les développer.</strong>{" "}
                Écrire &ldquo;AMDEC&rdquo; seul ne suffit pas si le recruteur cherche &ldquo;Analyse des Modes de Défaillance&rdquo;. Toujours préciser la signification entre parenthèses lors de la première occurrence.
              </li>
              <li>
                <strong>Ignorer les variantes de l&apos;intitulé dans l&apos;offre ciblée.</strong>{" "}
                Si l&apos;offre dit &ldquo;ingénieur process&rdquo;, mettez ce terme dans votre CV. Si elle dit &ldquo;R&amp;D engineer&rdquo;, incluez la variante anglaise. L&apos;ATS cherche les mots exacts de l&apos;offre.
              </li>
              <li>
                <strong>Mentionner les logiciels uniquement dans la rubrique compétences.</strong>{" "}
                Les noms d&apos;outils comme SolidWorks, CATIA ou MATLAB doivent apparaître aussi dans vos descriptions d&apos;expériences, avec des exemples concrets d&apos;utilisation.
              </li>
              <li>
                <strong>Lister les certifications sans préciser l&apos;année et le niveau.</strong>{" "}
                &ldquo;Six Sigma Green Belt 2023&rdquo; est plus crédible et plus précis que &ldquo;Six Sigma&rdquo; seul. Certains ATS filtrent sur les certifications récentes.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Ingénieur
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Un recruteur tape-t-il vraiment &ldquo;Ingénieur&rdquo; dans son ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, mais pas seulement. Il peut aussi chercher &ldquo;ingénieur d&apos;études&rdquo;, &ldquo;R&amp;D engineer&rdquo;, &ldquo;ingénieur process&rdquo;, &ldquo;ingénieur de production&rdquo; ou &ldquo;ingénieur système&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour cette raison, il est conseillé d&apos;inclure plusieurs variantes dans votre titre de poste et vos descriptions d&apos;expériences. Pour comprendre en détail <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment fonctionne vraiment un ATS et pourquoi le titre de poste est si important</Link>, notre article de référence vous donnera les bases.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il adapter les mots-clés selon la spécialité (mécanique, IT, BTP) ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Absolument. Un ingénieur mécanique utilise SolidWorks, CATIA, calcul de structure, résistance des matériaux. Un ingénieur informatique parle de Python, architecture logicielle, DevOps, CI/CD. Un ingénieur BTP travaille avec Revit, AutoCAD, CCTP, métrés.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La liste de cet article couvre le vocabulaire transversal commun à tous les ingénieurs. Si vous évoluez vers des postes de management, les <Link href="/ressources/cv-ats/mots-cles-cv-chef-de-projet" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés d&apos;un CV Chef de Projet</Link> vous seront également utiles.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de mots-clés techniques mettre sur un CV d&apos;une page ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a pas de limite stricte, mais la densité doit rester naturelle. Un CV d&apos;ingénieur bien rédigé contient naturellement 15 à 20 mots-clés pertinents sur une page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La règle d&apos;or : si vous lisez votre CV à voix haute, est-ce que ça sonne naturel ? Si oui, la densité est correcte. Si la lecture semble forcée ou répétitive, allégez.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Mon diplôme d&apos;ingénieur CTI est-il bien détecté par les ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, à condition que l&apos;intitulé exact soit dans votre CV. Précisez l&apos;école, la spécialité et l&apos;année d&apos;obtention. Un ATS ne fait pas de déduction : si vous écrivez seulement le nom de votre école sans préciser &ldquo;diplôme d&apos;ingénieur&rdquo;, le terme ne sera pas indexé.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre toutes les étapes entre la réception de votre candidature et le premier appel, lisez notre article sur <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe vraiment après avoir postulé</Link>.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Mon CV Word est-il mieux parsé qu&apos;un PDF pour postuler à des postes ingénieur ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Généralement oui, surtout si vous postulez dans de grandes entreprises industrielles qui utilisent des ATS anciens comme Taleo ou SuccessFactors, très répandus dans les secteurs automobile, aéronautique et énergie.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un arbitrage complet sur ce sujet, consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif PDF ou Word pour les ATS</Link>. Et pour savoir quel ATS utilise l&apos;entreprise où vous postulez, notre guide sur <Link href="/ressources/cv-ats/ats-les-plus-utilises-en-france" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les ATS les plus utilisés en France</Link> vous donnera les informations nécessaires.
            </p>

            {/* Section 6 */}
            <h2 id="ce-que-fait-rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette liste vous donne les mots-clés universels du poste d&apos;ingénieur. Mais chaque offre d&apos;emploi a ses propres priorités et ses propres termes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique. Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV, ceux que le recruteur tapera dans son ATS pour trouver le bon profil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV apparaisse quand le recruteur cherche un ingénieur avec exactement votre profil et votre spécialité.
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
