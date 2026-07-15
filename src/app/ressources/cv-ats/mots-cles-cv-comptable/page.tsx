import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Mots-clés CV Comptable : liste complète 2026 | Rivjob",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Comptable qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
  ...ogMeta(
    "Mots-clés CV Comptable : liste complète 2026 | Rivjob",
    "Découvrez les 30+ mots-clés indispensables pour un CV Comptable qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    "/ressources/cv-ats/mots-cles-cv-comptable"
  ),
};

const TOC = [
  { id: "pourquoi-mots-cles",      titre: "Pourquoi les mots-clés sont critiques",      niveau: 2 },
  { id: "liste-mots-cles",         titre: "Les 30+ mots-clés incontournables",           niveau: 2 },
  { id: "competences-techniques",  titre: "Compétences techniques",                       niveau: 3 },
  { id: "logiciels-comptables",    titre: "Logiciels comptables",                         niveau: 3 },
  { id: "normes-reglementations",  titre: "Normes et réglementations",                    niveau: 3 },
  { id: "soft-skills",             titre: "Soft skills",                                  niveau: 3 },
  { id: "integrer-mots-cles",      titre: "Comment les intégrer naturellement",           niveau: 2 },
  { id: "erreurs-a-eviter",        titre: "Les erreurs à éviter",                         niveau: 2 },
  { id: "faq",                     titre: "FAQ : ATS et CV Comptable",                    niveau: 2 },
  { id: "ce-que-fait-rivjob",    titre: "Ce que fait Rivjob",                         niveau: 2 },
];

export default function ArticleMotsClesComptable() {
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
          <span className="text-gray-600">Mots-clés CV Comptable</span>
        </div>

        <ArticleJsonLd
          titre="Mots-clés CV Comptable : liste complète 2026 | Rivjob"
          description="Découvrez les 30+ mots-clés indispensables pour un CV Comptable qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples."
          slug="/ressources/cv-ats/mots-cles-cv-comptable"
          datePublication="2026-06-07"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "Mots-clés CV Comptable", url: "/ressources/cv-ats/mots-cles-cv-comptable" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Comptable : liste complète 2026 pour passer les ATS
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
              <span>7 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Comptable, Comptable général, Assistant comptable, Collaborateur comptable.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La comptabilité est un secteur où les offres d&apos;emploi sont précises et les recruteurs exigeants. Chaque annonce liste des logiciels, des normes et des tâches très spécifiques. Et les ATS qui filtrent les candidatures sont paramétrés avec ces termes exacts.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur ne cherche pas &ldquo;gestion comptable&rdquo; dans sa base de candidats. Il tape &ldquo;clôture des comptes&rdquo;, &ldquo;Sage 100&rdquo; ou &ldquo;liasse fiscale&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les 30 mots-clés incontournables pour qu&apos;un CV Comptable soit trouvé dans les ATS en 2026. Pour comprendre en amont <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment fonctionnent les ATS</Link> et pourquoi ils filtrent avant toute lecture humaine, consultez notre article de référence.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Comptable
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La comptabilité recrute massivement, mais les profils sont nombreux. Un poste de Comptable général dans une PME ou un groupe reçoit facilement plusieurs centaines de candidatures. Les recruteurs n&apos;ont ni le temps ni les ressources pour les lire toutes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le filtre ATS intervient en premier. Il extrait les CV qui contiennent les termes tapés dans la barre de recherche : un logiciel comptable précis, un type de déclaration fiscale, un périmètre de clôture. Les candidats qui n&apos;ont pas utilisé ce vocabulaire dans leur CV sont simplement écartés, même si leur profil est excellent.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La particularité du secteur comptable : il utilise un vocabulaire très codifié, avec des termes techniques qui ne s&apos;inventent pas. Un comptable qui écrit &ldquo;gestion de la comptabilité&rdquo; sans détailler le type de comptabilité maîtrisé sera systématiquement moins bien indexé qu&apos;un candidat qui précise &ldquo;clôtures mensuelles et trimestrielles en normes IFRS sous Cegid&rdquo;.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre rigueur qui vous élimine. C&apos;est l&apos;absence du bon terme comptable dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour les comptables, le risque est double : utiliser des formulations trop vagues d&apos;un côté, ou omettre les logiciels et normes maîtrisés de l&apos;autre. La liste ci-dessous couvre le vocabulaire structuré attendu par les ATS pour cette fonction.
            </p>

            {/* Section 2 */}
            <h2 id="liste-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 30+ mots-clés incontournables pour un CV Comptable
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont organisés par catégorie pour vous aider à les répartir dans les bonnes rubriques de votre CV. Chaque catégorie correspond à un périmètre comptable que les recruteurs filtrent indépendamment.
            </p>

            {/* H3 : Compétences techniques */}
            <h3 id="competences-techniques" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Compétences techniques
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce sont les fondations du métier. Ces mots-clés décrivent les tâches comptables concrètes que vous maîtrisez, celles que tout recruteur recherche en priorité.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Comptabilité générale</strong> : enregistrement des opérations courantes, tenue des journaux et du grand livre</li>
              <li><strong>Comptabilité analytique</strong> : répartition des charges par centre de coût, suivi de rentabilité par activité ou projet</li>
              <li><strong>Clôture des comptes</strong> : opérations de fin de mois, de trimestre et d&apos;exercice ; lettrage, cut-off, provisions</li>
              <li><strong>Rapprochement bancaire</strong> : contrôle de cohérence entre les relevés bancaires et la comptabilité</li>
              <li><strong>Déclarations fiscales</strong> : TVA (CA3/CA12), IS, CFE, CVAE, DAS2 ; préparation et envoi dans les délais légaux</li>
              <li><strong>Liasse fiscale</strong> : établissement de la liasse de fin d&apos;exercice et des annexes légales</li>
              <li><strong>Révision comptable</strong> : contrôle des comptes, identification des anomalies, justification des soldes</li>
              <li><strong>Gestion de la trésorerie</strong> : prévisions de flux, suivi des encaissements et décaissements, placement des excédents</li>
              <li><strong>Budget prévisionnel</strong> : élaboration du budget annuel, suivi des écarts réel/budget</li>
              <li><strong>Immobilisations et amortissements</strong> : suivi du tableau des immobilisations, calcul des dotations aux amortissements</li>
              <li><strong>Facturation clients/fournisseurs</strong> : émission des factures, validation des factures fournisseurs, gestion des litiges</li>
              <li><strong>Recouvrement</strong> : relances clients, suivi des créances échues, dépréciation des créances douteuses</li>
            </ul>

            {/* H3 : Logiciels */}
            <h3 id="logiciels-comptables" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Logiciels comptables
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les noms de logiciels sont des mots-clés à part entière. Les recruteurs filtrent souvent sur le nom exact du logiciel utilisé dans leur organisation. C&apos;est l&apos;un des premiers critères de tri dans les ATS comptables.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Sage 100 / Sage Compta</strong> : solution de référence en PME et cabinets comptables français</li>
              <li><strong>Cegid</strong> : logiciel très répandu en cabinet d&apos;expertise comptable et dans les entreprises du CAC 40</li>
              <li><strong>SAP FI/CO</strong> : module finance des grands ERP, incontournable dans les groupes internationaux</li>
              <li><strong>QuadraCompta / Quadratus</strong> : solution courante en cabinet comptable, notamment pour les TPE et PME</li>
              <li><strong>EBP Compta</strong> : logiciel de comptabilité répandu dans les très petites entreprises</li>
              <li><strong>Divalto</strong> : ERP présent dans les ETI industrielles et de distribution</li>
              <li><strong>Excel avancé</strong> : tableaux croisés dynamiques, formules financières, modèles de reporting</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas utilisé ces outils spécifiques, mentionnez votre capacité à prendre en main un logiciel comptable rapidement et listez les outils que vous maîtrisez réellement. La véracité prime : vous serez questionné en entretien.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                &ldquo;Sage 100&rdquo; et &ldquo;Sage Compta&rdquo; sont deux intitulés différents dans un ATS. Mentionnez les deux variantes si vous avez utilisé l&apos;outil, pour couvrir tous les filtres possibles.
              </p>
            </blockquote>

            {/* H3 : Normes */}
            <h3 id="normes-reglementations" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Normes et réglementations
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont filtrés dans les offres qui requièrent une connaissance du cadre légal et des référentiels comptables applicables. Ils distinguent un comptable opérationnel d&apos;un comptable senior.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>PCG (Plan Comptable Général)</strong> : référentiel comptable français obligatoire pour toutes les entreprises</li>
              <li><strong>Normes IFRS</strong> : normes comptables internationales, exigées dans les groupes cotés et les filiales de multinationales</li>
              <li><strong>Normes françaises (GAAP)</strong> : normes comptables françaises applicables aux entités non cotées</li>
              <li><strong>Droit des sociétés</strong> : connaissance des obligations légales liées à la forme juridique de l&apos;entreprise</li>
              <li><strong>Consolidation</strong> : établissement des comptes consolidés d&apos;un groupe, élimination des opérations inter-compagnies</li>
            </ul>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales sont attendues dans tous les métiers. Pour un comptable, elles doivent être formulées précisément plutôt que de façon générique, car elles reflètent les contraintes réelles du poste.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Rigueur</strong> : exactitude dans le traitement des données et le respect des procédures comptables</li>
              <li><strong>Organisation</strong> : gestion simultanée de plusieurs clôtures, déclarations et échéances fiscales</li>
              <li><strong>Discrétion / Confidentialité</strong> : manipulation de données financières sensibles et de résultats non publiés</li>
              <li><strong>Sens du détail</strong> : détection des anomalies comptables et des erreurs de saisie</li>
              <li><strong>Résistance au stress</strong> : tenue des délais en période de clôture mensuelle, trimestrielle et annuelle</li>
            </ul>

            {/* Section 3 */}
            <h2 id="integrer-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment intégrer ces mots-clés naturellement dans son CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La tentation est forte de créer une rubrique &ldquo;Compétences&rdquo; avec une liste de 30 termes. C&apos;est une erreur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS modernes valorisent les mots-clés qui apparaissent dans leur contexte. Un mot-clé mentionné dans une description d&apos;expérience a plus de poids qu&apos;un mot-clé isolé dans une liste à plat.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne méthode est de répartir ces mots-clés dans les rubriques existantes de votre CV. Pour savoir exactement où et comment structurer chaque section, consultez notre guide sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques essentielles d&apos;un CV en 2026</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici des exemples concrets de reformulation pour un CV Comptable :
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 1 : Clôtures</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Participation aux clôtures</p>
                <p className="text-gray-800 font-medium text-lg">Pilotage des clôtures mensuelles et trimestrielles (CA 12 M€) sous Sage 100 : lettrage, cut-off, justification des comptes et reporting à la direction financière</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2 : Fiscalité</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion des déclarations fiscales</p>
                <p className="text-gray-800 font-medium text-lg">Préparation et télédéclaration des liasses fiscales et des déclarations TVA (CA3 mensuelle), IS et CVAE dans le respect des délais légaux</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3 : Fournisseurs</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion des fournisseurs</p>
                <p className="text-gray-800 font-medium text-lg">Traitement et validation de 500 factures fournisseurs mensuelles, rapprochement bancaire hebdomadaire et suivi du recouvrement clients (encours moyen 800 K€)</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV Comptable bien rédigé contient naturellement 15 à 20 mots-clés métier. Le vocabulaire du quotidien comptable suffit : il faut juste l&apos;écrire clairement, avec des volumes et des résultats chiffrés.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certaines pratiques très répandues dans les CV de comptables nuisent directement à leur lisibilité par les ATS.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Omettre les logiciels maîtrisés.</strong>{" "}
                C&apos;est l&apos;erreur la plus fréquente et la plus coûteuse. Le nom du logiciel comptable est l&apos;un des premiers filtres ATS paramétrés par les recruteurs. Un CV qui ne mentionne pas &ldquo;Sage&rdquo;, &ldquo;Cegid&rdquo; ou &ldquo;SAP FI&rdquo; sera simplement absent des résultats.
              </li>
              <li>
                <strong>Utiliser des abréviations sans les expliciter.</strong>{" "}
                &ldquo;RAN&rdquo; sans &ldquo;Report À Nouveau&rdquo;, &ldquo;OD&rdquo; sans &ldquo;Opération Diverse&rdquo; : les ATS ne font pas toujours la correspondance. Écrivez les deux formes dans votre CV.
              </li>
              <li>
                <strong>Noyer les mots-clés dans des paragraphes longs.</strong>{" "}
                Les ATS analysent les termes présents, pas la qualité rédactionnelle. Des descriptions courtes et denses en mots-clés métier sont plus efficaces que des paragraphes narratifs.
              </li>
              <li>
                <strong>Confondre comptabilité générale et comptabilité analytique.</strong>{" "}
                Ce sont deux compétences distinctes dans un ATS. Un recruteur qui cherche un profil analytique ne filtre pas sur &ldquo;comptabilité générale&rdquo;. Précisez les deux si vous maîtrisez les deux.
              </li>
              <li>
                <strong>Ignorer le format du fichier CV.</strong>{" "}
                Même un CV parfaitement optimisé en mots-clés peut être mal lu par un ATS si le format du fichier n&apos;est pas adapté. Consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif format PDF ou Word pour les ATS</Link> pour faire le bon choix.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Comptable
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Un ATS rejette-t-il mon CV si je n&apos;ai pas tous les mots-clés ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non, un ATS ne rejette pas automatiquement un CV. Pour comprendre <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que fait réellement un ATS</Link>, retenez ceci : il classe les candidats par pertinence selon les mots-clés paramétrés. Les profils qui ont les termes recherchés remontent en haut de la liste. Les autres sont simplement moins visibles, pas supprimés.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En pratique, l&apos;absence de 3 ou 4 mots-clés critiques (un logiciel, un type de déclaration) peut suffire à ne jamais apparaître dans les résultats d&apos;une recherche.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Dois-je adapter mon CV à chaque offre de comptable ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, et c&apos;est particulièrement vrai en comptabilité. Une offre de Comptable général dans une PME française mettra en avant Sage 100 et les normes PCG. Une offre dans une filiale de groupe international cherchera SAP FI et les normes IFRS. Les mots-clés prioritaires changent radicalement selon le contexte.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Identifiez les 5 à 8 termes qui reviennent plusieurs fois dans l&apos;offre et vérifiez qu&apos;ils apparaissent dans votre CV, idéalement dans vos descriptions d&apos;expériences.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Quelle différence entre Comptable et Assistant Comptable dans un ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs filtrent rarement ces deux intitulés ensemble. Un filtre sur &ldquo;Comptable général&rdquo; peut exclure les profils qui n&apos;affichent que &ldquo;Assistant comptable&rdquo;. Si votre expérience justifie les deux intitulés, incluez les deux variantes dans votre CV, de préférence dans les titres de poste et les descriptions d&apos;expériences.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La même logique s&apos;applique aux autres fonctions, comme le montrent nos analyses des <Link href="/ressources/cv-ats/mots-cles-cv-chef-de-projet" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Chef de Projet</Link> et des <Link href="/ressources/cv-ats/mots-cles-cv-charge-rh" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Chargé RH</Link>.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il indiquer sa maîtrise de Sage même si c&apos;est basique ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, à condition de nuancer. Mentionnez le logiciel avec le niveau réel de maîtrise : &ldquo;Sage 100 Comptabilité (saisie et rapprochement)&rdquo; est honnête et indexable. Évitez d&apos;écrire &ldquo;Sage 100 (maîtrise avancée)&rdquo; si vous n&apos;avez fait que de la saisie de factures : les questions en entretien vous rattraperont.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La règle vaut aussi pour les profils commerciaux : c&apos;est ce que montre notre guide sur les <Link href="/ressources/cv-ats/mots-cles-cv-commercial" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Commercial</Link>, où la mention des outils CRM obéit à la même logique de précision.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les certifications (DCG, DSCG, CCA) comptent-elles dans les filtres ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, et c&apos;est un avantage souvent sous-exploité. Certains recruteurs filtrent directement sur &ldquo;DCG&rdquo;, &ldquo;DSCG&rdquo; ou &ldquo;CCA&rdquo; pour trier les candidats selon leur niveau de qualification. Mentionnez ces diplômes avec leur intitulé complet ET leur abréviation : &ldquo;Diplôme de Comptabilité et de Gestion (DCG)&rdquo; couvre les deux variantes de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre exactement comment votre dossier de candidature est traité côté recruteur, consultez <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que voit le recruteur dans son ATS</Link>.
            </p>

            {/* Section 6 */}
            <h2 id="ce-que-fait-rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob pour votre CV Comptable
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette liste vous donne les mots-clés universels du métier de Comptable. Mais chaque offre d&apos;emploi a ses propres priorités selon la taille de l&apos;entreprise, son logiciel comptable, et le périmètre du poste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique. Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV — ceux que le recruteur tapera dans son ATS pour trouver le bon profil comptable.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV apparaisse quand le recruteur cherche un Comptable avec exactement votre périmètre et vos logiciels.
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

            <ShareButtons />
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
