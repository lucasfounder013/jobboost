import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Reconversion professionnelle à 50 ans : adapter son CV et ses candidatures 2026 | JobBoost",
  description:
    "Vous envisagez une reconversion professionnelle à 50 ans ? Découvrez comment adapter votre CV, rédiger votre lettre de motivation et convaincre les recruteurs en 2026.",
  ...ogMeta(
    "Reconversion professionnelle à 50 ans : adapter son CV et ses candidatures 2026 | JobBoost",
    "Vous envisagez une reconversion professionnelle à 50 ans ? Découvrez comment adapter votre CV, rédiger votre lettre de motivation et convaincre les recruteurs en 2026.",
    "/ressources/lettre-de-motivation/reconversion-professionnelle-50-ans"
  ),
};

const TOC = [
  { id: "introduction",           titre: "Reconversion à 50 ans en 2026 : ce qui a vraiment changé",         niveau: 2 },
  { id: "freins-et-solutions",    titre: "Les freins spécifiques à 50 ans et comment les surmonter",          niveau: 2 },
  { id: "frein-age",              titre: "Le frein de l'âge perçu par les recruteurs",                        niveau: 3 },
  { id: "frein-salaire",          titre: "Le frein du niveau de salaire attendu",                             niveau: 3 },
  { id: "frein-numerique",        titre: "Le frein des compétences numériques",                               niveau: 3 },
  { id: "adapter-cv",             titre: "Comment adapter son CV pour une reconversion à 50 ans",             niveau: 2 },
  { id: "competences-transferables", titre: "Mettre en avant les compétences transférables",                  niveau: 3 },
  { id: "ne-pas-mettre-date",     titre: "Ne pas indiquer sa date de naissance",                              niveau: 3 },
  { id: "format-ats",             titre: "Format ATS : ce que les 50 ans doivent savoir",                     niveau: 3 },
  { id: "lettre-motivation",      titre: "Rédiger sa lettre de motivation à 50 ans",                          niveau: 2 },
  { id: "secteurs-qui-recrutent", titre: "Les secteurs qui recrutent les profils seniors en reconversion",    niveau: 2 },
  { id: "faq",                    titre: "FAQ",                                                               niveau: 2 },
  { id: "jobboost",               titre: "Ce que fait JobBoost pour votre reconversion",                      niveau: 2 },
];

export default function ArticleReconversion50Ans() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Lettre de motivation</Link>
          <span>›</span>
          <span className="text-gray-600">Reconversion professionnelle à 50 ans</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Reconversion professionnelle à 50 ans : comment adapter son CV et ses candidatures en 2026
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
              <span>11 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>10 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En France, une reconversion professionnelle sur quatre concerne des personnes de plus de 45 ans. Ce chiffre progresse chaque année, porté par des parcours plus longs, des carrières moins linéaires et un marché du travail qui évolue plus vite que jamais.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La reconversion à 50 ans est tout à fait possible. Mais elle ne se gère pas comme à 30 ans. Les obstacles sont différents, et les leviers aussi. La bonne nouvelle : votre expérience est un actif réel que la plupart des candidats plus jeunes ne peuvent pas avoir.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce guide vous donne les clés concrètes pour adapter votre CV, rédiger une lettre de motivation adaptée à votre situation, et cibler les bons secteurs pour maximiser vos chances.
            </p>

            {/* Section 1 */}
            <h2 id="introduction" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Reconversion à 50 ans en 2026 : ce qui a vraiment changé
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La perception des profils seniors par les recruteurs a évolué. La pénurie de compétences dans de nombreux secteurs, combinée à la pyramide des âges, pousse des employeurs à chercher des profils matures là où ils auraient autrefois privilégié la jeunesse.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les PME et les ETI, qui représentent la grande majorité des emplois en France, sont souvent moins soumises aux processus RH standardisés des grands groupes. Elles recrutent sur le profil, pas sur l&apos;âge. Ce sont vos cibles prioritaires.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui n&apos;a pas changé : la candidature doit être construite avec soin. Un CV mal adapté ou une lettre de motivation générique reste éliminatoire à 50 ans comme à tout âge. Pour comprendre <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe après que vous avez postulé</Link>, le traitement de votre dossier suit les mêmes étapes que pour n&apos;importe quel candidat.
            </p>

            {/* Section 2 */}
            <h2 id="freins-et-solutions" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les freins spécifiques à 50 ans et comment les surmonter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Trois freins reviennent systématiquement dans les reconversions à 50 ans. Chacun a une réponse concrète.
            </p>

            <h3 id="frein-age" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Le frein de l&apos;âge perçu par les recruteurs
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La discrimination à l&apos;embauche liée à l&apos;âge existe. La nier ne sert à rien. La stratégie consiste à réduire la surface d&apos;exposition : ne pas mettre sa date de naissance sur le CV, ne pas dater ses expériences au-delà de 15 ans, et cibler les employeurs pour lesquels l&apos;expérience est perçue comme un avantage, pas comme un coût.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Approche à éviter vs approche efficace</p>
              <p className="text-gray-500 line-through text-lg">Postuler sur les grandes plateformes pour tous les postes disponibles dans le nouveau secteur, sans cibler.</p>
              <p className="text-gray-800 font-medium text-lg">Cibler les PME et ETI de 20 à 200 salariés dans les secteurs en tension, où la décision de recrutement est souvent prise directement par le dirigeant ou le manager, pas par un service RH.</p>
            </div>

            <h3 id="frein-salaire" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Le frein du niveau de salaire attendu
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs supposent souvent qu&apos;un profil senior coûte cher. Ce frein est réel même quand il est injustifié. Deux façons de le neutraliser : anticiper la question en montrant que votre projet de reconversion implique une réorientation salariale, et mettre en avant le retour sur investissement rapide que votre expérience permet (pas de formation longue, autonomie immédiate, gestion des situations complexes).
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ne jamais aborder le sujet du salaire spontanément dans la lettre ou lors d&apos;un premier entretien. Mais si la question vient, avoir une réponse claire et décomplexée est préférable à une esquive.
            </p>

            <h3 id="frein-numerique" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Le frein des compétences numériques
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;écart supposé de compétences numériques est souvent surestimé par les recruteurs. La réponse la plus efficace : citer des outils maîtrisés concrètement, et mentionner une formation récente si vous en avez suivi une. Même courte (3 à 6 mois), une formation sur les outils du secteur cible montre une démarche proactive et coupe court aux suppositions.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Formulation vague vs formulation concrète</p>
              <p className="text-gray-500 line-through text-lg">À l&apos;aise avec les outils informatiques courants.</p>
              <p className="text-gray-800 font-medium text-lg">Maîtrise de Salesforce CRM, formation Notion et Slack complétée en avril 2026, certifié Google Workspace.</p>
            </div>

            {/* Section 3 */}
            <h2 id="adapter-cv" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment adapter son CV pour une reconversion à 50 ans
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un CV de reconversion à 50 ans ne suit pas les mêmes règles qu&apos;un CV classique. L&apos;objectif est de montrer votre valeur pour le poste visé, pas de raconter l&apos;intégralité de votre parcours. Pour aller plus loin sur les bases, consultez <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>

            <h3 id="competences-transferables" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Mettre en avant les compétences transférables
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Après 25 ans de carrière, vous avez développé des compétences que peu de candidats possèdent : management, gestion de crise, relation client complexe, négociation, pilotage de projets multisites, coordination d&apos;équipes pluridisciplinaires. Ces compétences sont transférables à presque tous les secteurs.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La clé : reformuler ces compétences avec le vocabulaire du secteur cible. Lisez 5 offres d&apos;emploi dans ce secteur avant de rédiger votre CV. Notez les expressions qui reviennent. Utilisez-les pour décrire ce que vous avez déjà fait, pas ce que vous allez apprendre.
            </p>

            <h3 id="ne-pas-mettre-date" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Ne pas indiquer sa date de naissance
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La date de naissance est illégale sur un CV en France depuis 2006. Pourtant, beaucoup de candidats la mentionnent encore par habitude. C&apos;est une erreur à corriger immédiatement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              De même, ne remontez pas vos expériences au-delà de 15 ans. Si votre carrière a débuté en 1995, il n&apos;est pas utile de le signaler. La formulation &ldquo;Expériences antérieures à 2010 : disponibles sur demande&rdquo; permet d&apos;indiquer l&apos;existence d&apos;un parcours long sans exposer votre ancienneté dès la première lecture.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Le CV doit répondre à une question : êtes-vous compétent pour ce poste ? Pas : quel âge avez-vous ?
              </p>
            </blockquote>

            <h3 id="format-ats" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Format ATS : ce que les 50 ans doivent savoir
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La majorité des grandes entreprises et des ETI utilisent un logiciel ATS pour trier les CV avant qu&apos;un recruteur les lise. Un CV trop graphique, en double colonne, ou avec des tableaux sera mal lu par ces outils et risque d&apos;être éliminé automatiquement.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Une seule colonne</strong> : structure linéaire de haut en bas, pas de mise en page complexe</li>
              <li><strong>Police sans-serif</strong> : Arial, Calibri, ou similaire en taille 10-11</li>
              <li><strong>Pas de photo</strong> : illégale à exiger, mais source de biais, l&apos;omettre est toujours préférable</li>
              <li><strong>Pas de tableaux ni de graphiques</strong> : les ATS les ignorent ou les déforment</li>
              <li><strong>Format PDF</strong> : sauf si l&apos;annonce demande explicitement Word</li>
              <li><strong>Mots-clés de l&apos;offre</strong> : les intégrer naturellement dans les descriptions de poste</li>
            </ul>

            {/* Section 4 */}
            <h2 id="lettre-motivation" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Rédiger sa lettre de motivation à 50 ans
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La structure d&apos;une lettre de motivation à 50 ans en reconversion est identique à celle de tout candidat en reconversion : accroche sur votre valeur, reformulation de votre parcours passé, compétences transférables avec preuves, motivation pour le nouveau secteur. Pour une méthode complète, consultez <Link href="/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre guide sur la lettre de motivation pour une reconversion professionnelle</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui change à 50 ans, c&apos;est le positionnement. Vous avez une carte que les candidats plus jeunes n&apos;ont pas : votre projet est mûri. Vous ne changez pas de voie parce que vous ne savez pas quoi faire. Vous le faites parce que vous avez identifié précisément ce que vous voulez faire, et pourquoi vous pouvez le faire mieux que quelqu&apos;un qui sort de formation.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce positionnement doit transparaître dès l&apos;accroche. Ne commencez jamais par expliquer votre reconversion. Commencez par ce que vous apportez. L&apos;explication vient en second, brièvement, pour montrer la cohérence du projet.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Accroche à éviter vs accroche efficace à 50 ans</p>
              <p className="text-gray-500 line-through text-lg">Après 25 ans dans le secteur bancaire, j&apos;ai décidé de me reconvertir vers l&apos;accompagnement social pour donner plus de sens à ma carrière.</p>
              <p className="text-gray-800 font-medium text-lg">En 25 ans de gestion de portefeuilles clients en milieu bancaire, j&apos;ai accompagné des centaines de personnes dans des situations financières complexes. C&apos;est cette dimension d&apos;accompagnement humain que je veux exercer pleinement dans le secteur social, avec les outils de votre structure.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour les bases de rédaction d&apos;une lettre efficace, <Link href="/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment écrire une lettre de motivation efficace</Link> détaille la méthode en 4 étapes applicable à tous les profils.
            </p>

            {/* Section 5 */}
            <h2 id="secteurs-qui-recrutent" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les secteurs qui recrutent les profils seniors en reconversion
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tous les secteurs ne sont pas égaux face aux candidatures seniors. Certains valorisent l&apos;expérience et la maturité par nature. Ce sont vos cibles prioritaires.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Le secteur social et médico-social
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Forte pénurie de main-d&apos;œuvre, fort besoin de stabilité et d&apos;expérience de vie. Les structures recherchent des profils matures capables de gérer des situations humaines complexes. La reconversion vers l&apos;aide à domicile, l&apos;accompagnement en EHPAD, ou le travail social est accessible via des formations certifiantes courtes (6 à 12 mois).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              L&apos;artisanat et les métiers manuels
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Beaucoup de métiers artisanaux sont en tension faute de successeurs. Les CFA adultes permettent une formation à tout âge. Les employeurs recherchent des profils sérieux et stables, deux qualités que les recruteurs associent souvent aux candidats seniors. La menuiserie, la plomberie, l&apos;électricité, ou la boulangerie artisanale sont des secteurs qui recrutent activement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              L&apos;enseignement et la formation professionnelle
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Transmettre une expertise métier est une reconversion naturelle pour les 50 ans. La formation professionnelle (organismes privés, CFA, OPCO) recrute des formateurs sur leur expertise sectorielle, pas sur leur parcours pédagogique. L&apos;Éducation nationale propose également des concours accessibles jusqu&apos;à des âges avancés pour les détenteurs d&apos;un niveau Bac+3.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Le conseil et l&apos;accompagnement
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Consultant indépendant, coach, conseiller en gestion : ces activités capitalisent directement sur un parcours long. Une reconversion vers le conseil permet souvent de valoriser une expertise sectorielle sans la dévaluer. Le statut d&apos;auto-entrepreneur ou de portage salarial facilite les premiers mois sans avoir à convaincre un employeur.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les fonctions support en PME
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Direction administrative, responsable achats, chef de projet : les PME en croissance ont besoin de profils expérimentés capables d&apos;être opérationnels immédiatement. Ces postes sont moins exposés aux filtres RH standardisés et valorisent l&apos;autonomie et la polyvalence que les seniors apportent naturellement.
            </p>

            {/* Section 6 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              À quel âge est-il trop tard pour se reconvertir ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a pas d&apos;âge limite légal ou pratique à une reconversion professionnelle. Des personnes se reconvertissent avec succès à 55 ou 60 ans, en particulier vers des secteurs qui valorisent l&apos;expérience humaine ou l&apos;expertise technique. La question n&apos;est pas l&apos;âge mais la durée restante dans la vie active et la cohérence du projet avec les possibilités de financement (CPF, Transition Pro).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il mentionner son âge dans une lettre de motivation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non. Ni l&apos;âge, ni la date de naissance ne doivent apparaître dans une lettre de motivation ou un CV. Si le recruteur cherche cette information, c&apos;est qu&apos;il envisage de l&apos;utiliser comme critère de sélection, ce qui est illégal. Votre candidature doit être jugée sur vos compétences et votre adéquation au poste, pas sur votre année de naissance.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on bénéficier d&apos;une formation financée pour se reconvertir à 50 ans ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui. Le Compte Personnel de Formation (CPF) est utilisable à tout âge jusqu&apos;à la retraite. Le dispositif Transition Pro (ex-CIF) permet de financer une formation longue avec maintien partiel du salaire. Les demandeurs d&apos;emploi ont également accès aux formations Pôle Emploi. Un bilan de compétences (finançable via le CPF) est souvent une première étape utile pour clarifier le projet.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment expliquer une longue expérience dans un seul secteur quand on change de voie ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En reformulant l&apos;expérience avec les compétences transférables qu&apos;elle a produites, pas avec le titre de poste ou le secteur d&apos;origine. Un directeur commercial dans l&apos;industrie qui se reconvertit vers le conseil ne dit pas &ldquo;j&apos;ai vendu des machines&rdquo;. Il dit &ldquo;j&apos;ai piloté un cycle de vente long sur des décisions d&apos;investissement à 6 chiffres, avec des interlocuteurs DAF et DG&rdquo;. La compétence est identique, le prisme change tout.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les recruteurs lisent-ils vraiment les candidatures de profils seniors en reconversion ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, à condition que le CV passe les filtres ATS et que l&apos;accroche de la lettre donne envie de lire la suite. Un recruteur qui reçoit une candidature senior bien construite, avec des preuves chiffrées et un projet cohérent, la lit. Ce qu&apos;il rejette immédiatement, c&apos;est une candidature générique qui ne montre pas de lien entre le parcours passé et le poste visé.
            </p>

            {/* Section 7 : CTA */}
            <h2 id="jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost pour votre reconversion
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Adapter son CV à un nouveau secteur commence par comprendre ce que ce secteur attend. Quels mots-clés les recruteurs utilisent dans leurs annonces ? Quelles compétences sont systématiquement demandées ? Qu&apos;est-ce qui manque dans votre CV actuel par rapport à cette cible ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse la correspondance entre votre CV et une offre d&apos;emploi et identifie les termes présents dans l&apos;annonce qui manquent dans votre dossier. C&apos;est exactement ce travail de traduction sectorielle dont vous avez besoin pour construire un CV et une lettre de motivation cohérents avec le poste visé.
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

          {/* Sidebar TOC */}
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
