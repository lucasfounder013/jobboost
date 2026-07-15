import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Exemple lettre de motivation : 5 modèles prêts à utiliser | Rivjob",
  description:
    "Vous cherchez un exemple de lettre de motivation efficace ? Voici 5 modèles concrets et adaptables, pour un CDI, un stage, une reconversion ou une candidature spontanée.",
  ...ogMeta(
    "Exemple lettre de motivation : 5 modèles prêts à utiliser | Rivjob",
    "Vous cherchez un exemple de lettre de motivation efficace ? Voici 5 modèles concrets et adaptables, pour un CDI, un stage, une reconversion ou une candidature spontanée.",
    "/ressources/lettre-de-motivation/exemple-lettre-de-motivation"
  ),
};

const TOC = [
  { id: "anatomie",            titre: "Anatomie d'une lettre qui fonctionne",            niveau: 2 },
  { id: "exemple-cdi",         titre: "Exemple 1 : lettre pour un CDI",                  niveau: 2 },
  { id: "exemple-stage",       titre: "Exemple 2 : lettre pour un stage",                niveau: 2 },
  { id: "exemple-alternance",  titre: "Exemple 3 : lettre pour une alternance",          niveau: 2 },
  { id: "exemple-spontanee",   titre: "Exemple 4 : candidature spontanée",               niveau: 2 },
  { id: "exemple-reconversion",titre: "Exemple 5 : reconversion professionnelle",        niveau: 2 },
  { id: "erreurs",             titre: "Les 5 erreurs qui éliminent une lettre",          niveau: 2 },
  { id: "format",              titre: "Format, longueur et envoi",                       niveau: 2 },
  { id: "faq",                 titre: "FAQ",                                              niveau: 2 },
];

export default function ArticleExempleLettreDeMotivation() {
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
          <span className="text-gray-600">Exemple lettre de motivation</span>
        </div>

        <ArticleJsonLd
          titre="Exemple lettre de motivation : 5 modèles prêts à utiliser | Rivjob"
          description="Vous cherchez un exemple de lettre de motivation efficace ? Voici 5 modèles concrets et adaptables, pour un CDI, un stage, une reconversion ou une candidature spontanée."
          slug="/ressources/lettre-de-motivation/exemple-lettre-de-motivation"
          datePublication="2026-06-19"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Lettre de motivation", url: "/ressources" },
            { nom: "Exemple lettre de motivation", url: "/ressources/lettre-de-motivation/exemple-lettre-de-motivation" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Exemple lettre de motivation : 5 modèles prêts à utiliser
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
              <span>19 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>12 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous avez ouvert un document vide, vous avez tapé &ldquo;Madame, Monsieur&rdquo;, et plus rien ne vient. C&apos;est le moment de la journée où la candidature s&apos;arrête souvent. Un bon exemple de lettre de motivation débloque la rédaction en 5 minutes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le problème, c&apos;est que la plupart des modèles trouvés en ligne sont creux. Ils alignent des formules toutes faites, recopiables, qui font qu&apos;une lettre sur deux commence par &ldquo;Je me permets de vous contacter&rdquo;. Les recruteurs les reconnaissent au premier coup d&apos;œil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cet article vous donne 5 exemples de lettre de motivation pour les situations les plus courantes : un CDI, un stage, une alternance, une candidature spontanée et une reconversion. Chaque modèle est annoté pour comprendre pourquoi il fonctionne, et chaque champ entre crochets est à remplacer par vos informations. Vous repartez avec une lettre adaptable en quelques minutes.
            </p>

            {/* Citation intro */}
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Une bonne lettre de motivation se reconnaît à une chose : un recruteur qui la lit peut résumer en une phrase ce que vous apportez, et pourquoi vous postulez ici précisément.
              </p>
            </blockquote>

            {/* Section 1 : Anatomie */}
            <h2 id="anatomie" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Anatomie d&apos;une lettre qui fonctionne
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant les exemples, posons la structure. Toutes les lettres qui suivent reposent sur les mêmes 4 blocs. C&apos;est ce qui permet de les adapter rapidement, sans repartir d&apos;une page blanche.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              1. L&apos;en-tête
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vos coordonnées en haut à gauche. Celles du recruteur en dessous, à droite. La date, la ville, et l&apos;objet : &ldquo;Candidature au poste de [INTITULÉ] [Référence]&rdquo;. Pas de mention &ldquo;CV en pièce jointe&rdquo;, c&apos;est implicite.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              2. L&apos;accroche
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              1 à 2 phrases qui posent qui vous êtes et pourquoi le recruteur devrait continuer à lire. Pas de formule de politesse en première phrase, pas d&apos;explication sur la façon dont vous avez trouvé l&apos;offre.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              3. Le corps
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              2 paragraphes. Le premier répond à la question &ldquo;Que pouvez-vous faire pour eux ?&rdquo; avec des preuves chiffrées. Le deuxième répond à &ldquo;Pourquoi cette entreprise précisément ?&rdquo; avec une observation concrète.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              4. La clôture
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              1 à 2 phrases qui proposent un échange. Pas de &ldquo;Veuillez agréer l&apos;expression de mes sentiments distingués&rdquo;. Une formule de politesse courte suffit : &ldquo;Bien cordialement&rdquo; ou &ldquo;Cordialement&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour la méthode complète et les fondations de cette structure, consultez notre guide{" "}
              <Link href="/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                comment écrire une lettre de motivation en 4 étapes
              </Link>.
            </p>

            {/* Exemple 1 : CDI */}
            <h2 id="exemple-cdi" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple 1 : lettre de motivation pour un CDI
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Situation : vous êtes en CDD, en intérim, ou vous venez de terminer un stage long. Vous visez un CDI sur un poste similaire dans une autre entreprise. L&apos;enjeu est de montrer que votre expérience récente est directement transposable, et que vous cherchez la stabilité pour aller plus loin.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 ring-1 ring-gray-100">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-4">Modèle lettre de motivation CDI</p>
              <div className="text-gray-800 text-base leading-7 font-serif whitespace-pre-line">
{`[Votre prénom NOM]
[Votre adresse]
[Code postal Ville]
[Email] · [Téléphone]

[Nom du recruteur ou Service Recrutement]
[Nom de l'entreprise]
[Adresse de l'entreprise]

À [Ville], le [date]

Objet : Candidature au poste de Gestionnaire ADV en CDI (réf. [RÉFÉRENCE])

Madame, Monsieur,

En 18 mois en CDD chez [ENTREPRISE ACTUELLE], j'ai géré un portefeuille de 220 comptes B2B, réduit le délai moyen de traitement des commandes de 4 à 2 jours et ramené le taux de litiges sous la barre des 1,5 %. Votre poste de Gestionnaire ADV appelle exactement ce type de profil opérationnel et fiable.

Votre annonce cite la coordination avec les équipes commerciales et logistiques comme priorité. C'est ce que j'ai mis en place chez [ENTREPRISE ACTUELLE] avec un point hebdomadaire structuré entre les trois équipes, qui a divisé par deux les ruptures de stock signalées en aval. L'outil que vous utilisez, SAP S/4HANA, fait partie de mon quotidien depuis 2023 : je peux être autonome dès la première semaine.

Votre récent agrandissement de l'entrepôt de Lyon et l'arrivée de nouveaux clients grands comptes indiquent une phase de structuration de l'ADV. C'est ce moment précis que je cherche dans mon prochain poste : un environnement où la fonction support n'est pas un centre de coût, mais un levier de croissance.

Je serais ravi d'échanger sur la façon dont mon expérience peut s'inscrire dans vos objectifs 2026. Je reste disponible pour un appel à votre convenance.

Bien cordialement,

[Votre prénom NOM]`}
              </div>
            </div>

            <div className="bg-violet-50/40 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-700 uppercase tracking-widest mb-3">Pourquoi cette lettre marche</p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-8">
                <li>L&apos;accroche pose un résultat chiffré dès la première phrase, pas une formule de politesse.</li>
                <li>Le corps reprend les termes de l&apos;annonce (coordination, SAP S/4HANA) sans recopier le CV.</li>
                <li>La connexion avec l&apos;entreprise est précise : entrepôt de Lyon, grands comptes, pas une généralité.</li>
                <li>La clôture propose un échange concret, sans formule pompeuse.</li>
              </ul>
            </div>

            {/* Exemple 2 : Stage */}
            <h2 id="exemple-stage" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple 2 : lettre de motivation pour un stage
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Situation : vous êtes étudiant, vous avez peu ou pas d&apos;expérience professionnelle, et vous postulez pour un stage de fin d&apos;études ou de césure. Le défi : montrer ce que vous avez fait avec ce que vous aviez. Les projets scolaires, associatifs, ou les jobs étudiants comptent. Cette lettre de motivation exemple est adaptable pour la plupart des stages en marketing, communication ou data.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 ring-1 ring-gray-100">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-4">Modèle lettre de motivation stage</p>
              <div className="text-gray-800 text-base leading-7 font-serif whitespace-pre-line">
{`[Votre prénom NOM]
[Votre adresse]
[Code postal Ville]
[Email] · [Téléphone]

[Nom du recruteur ou Service Recrutement]
[Nom de l'entreprise]
[Adresse de l'entreprise]

À [Ville], le [date]

Objet : Candidature au stage de Marketing Digital (6 mois, à partir de [MOIS])

Madame, Monsieur,

En charge de la communication digitale de l'association [NOM ASSOCIATION] cette année, j'ai porté l'audience Instagram de 800 à 4 200 abonnés en 6 mois grâce à un calendrier éditorial structuré. C'est ce type de mission concrète que je viens chercher en stage chez [NOM ENTREPRISE].

Étudiant en deuxième année de Master Marketing à [ÉCOLE], je me forme aux outils que vous utilisez : Google Analytics 4, Meta Business Suite et HubSpot. Mon projet de fin de semestre, une étude de l'acquisition organique d'une marque DNVB française, m'a familiarisé avec votre secteur. J'ai vu que vous venez de lancer une refonte de votre programme de fidélité : c'est précisément le type de sujet sur lequel j'aimerais contribuer.

Je serais disponible à partir de [DATE], pour une durée de 6 mois, et basé à [VILLE]. Je peux vous transmettre sur demande mes réalisations digitales pour l'association, ainsi que mon mémoire en cours.

Je reste disponible pour un échange à votre convenance et serais ravi de vous présenter mon parcours plus en détail.

Bien cordialement,

[Votre prénom NOM]`}
              </div>
            </div>

            <div className="bg-violet-50/40 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-700 uppercase tracking-widest mb-3">Pourquoi cette lettre marche</p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-8">
                <li>L&apos;expérience associative est traitée comme une vraie expérience : chiffres, durée, mission.</li>
                <li>Les outils cités correspondent à ce que demande typiquement une offre marketing digital.</li>
                <li>La connexion entreprise est concrète (refonte du programme de fidélité), pas une flatterie générale.</li>
                <li>Les informations pratiques (date, durée, ville) sont posées sans ambiguïté.</li>
              </ul>
            </div>

            {/* Exemple 3 : Alternance */}
            <h2 id="exemple-alternance" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple 3 : lettre de motivation pour une alternance
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Situation : vous cherchez une alternance, en contrat d&apos;apprentissage ou de professionnalisation. L&apos;entreprise doit comprendre votre rythme école/entreprise, le diplôme préparé, et ce que vous apportez dès maintenant. Cet exemple lettre de motivation est calibré pour un BTS, un BUT ou un Master en alternance.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 ring-1 ring-gray-100">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-4">Modèle lettre de motivation alternance</p>
              <div className="text-gray-800 text-base leading-7 font-serif whitespace-pre-line">
{`[Votre prénom NOM]
[Votre adresse]
[Code postal Ville]
[Email] · [Téléphone]

[Nom du recruteur ou Service Recrutement]
[Nom de l'entreprise]
[Adresse de l'entreprise]

À [Ville], le [date]

Objet : Candidature en alternance Assistant comptable, contrat d'apprentissage, septembre 2026

Madame, Monsieur,

Préparant un BTS Comptabilité et Gestion à [ÉCOLE], je cherche une alternance pour intégrer durablement un service comptable en croissance. Votre annonce pour un Assistant comptable correspond exactement à ce que je veux apprendre en deux ans : la comptabilité fournisseurs, les déclarations de TVA et la préparation des bilans.

Pendant un stage de 6 semaines chez [CABINET], j'ai saisi plus de 400 écritures sur Cegid, participé au lettrage de comptes clients et aidé à préparer la TVA mensuelle pour 12 dossiers. Je suis à l'aise avec Excel, et j'utilise Pennylane à titre personnel pour comprendre les outils modernes utilisés en entreprise.

Votre rythme d'alternance (3 jours en entreprise, 2 jours à l'école) est compatible avec mon calendrier scolaire, qui démarre le [DATE]. Votre équipe basée à [VILLE] m'attire particulièrement, parce qu'elle accompagne des clients de secteurs variés : c'est l'environnement le plus formateur sur deux ans.

Je serais ravi de vous rencontrer pour un entretien et de vous présenter mon parcours plus en détail. Je peux me déplacer en semaine après mes cours.

Bien cordialement,

[Votre prénom NOM]`}
              </div>
            </div>

            <div className="bg-violet-50/40 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-700 uppercase tracking-widest mb-3">Pourquoi cette lettre marche</p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-8">
                <li>Le diplôme préparé est posé en première phrase : le recruteur sait immédiatement qui il lit.</li>
                <li>Les compétences techniques (Cegid, lettrage, TVA) sont citées avec un volume concret (400 écritures).</li>
                <li>Le rythme d&apos;alternance est mentionné : c&apos;est une question logistique que le recruteur se pose toujours.</li>
                <li>La proposition de rencontre est active : disponibilité précisée, pas d&apos;attente passive.</li>
              </ul>
            </div>

            {/* Exemple 4 : Candidature spontanée */}
            <h2 id="exemple-spontanee" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple 4 : lettre de motivation pour une candidature spontanée
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Situation : aucune offre publiée. Vous écrivez parce que vous voyez un manque dans l&apos;entreprise, ou parce qu&apos;elle correspond exactement à ce que vous cherchez. Une candidature spontanée se traite différemment d&apos;une réponse à une offre : il faut créer le besoin avant de proposer la solution. Pensez aussi à{" "}
              <Link href="/ressources/candidature-spontanee/trouver-email-recruteur" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                trouver l&apos;email du bon recruteur
              </Link>
              {" "}pour éviter la corbeille de contact@.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 ring-1 ring-gray-100">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-4">Modèle lettre de motivation candidature spontanée</p>
              <div className="text-gray-800 text-base leading-7 font-serif whitespace-pre-line">
{`[Votre prénom NOM]
[Votre adresse]
[Code postal Ville]
[Email] · [Téléphone]

[Nom du recruteur identifié]
[Nom de l'entreprise]
[Adresse de l'entreprise]

À [Ville], le [date]

Objet : Candidature spontanée, profil Account Manager B2B

Bonjour [Prénom du recruteur],

Votre annonce du recrutement de 30 nouveaux clients grands comptes prévu sur 2026 m'a interpellé. C'est précisément ce que je viens de faire pour [ENTREPRISE ACTUELLE] : 14 contrats Enterprise signés en 18 mois, pour un ARR additionnel de 1,8 M€. Je vous écris parce que je pense que ce profil peut intéresser [NOM ENTREPRISE] dans cette phase.

Sur le segment SaaS B2B mid-market, j'ai construit un pipeline de prospection sortante combinant LinkedIn Sales Navigator, séquences froides et événements ciblés. Le taux de conversion moyen tournait à 11 % sur les premiers entretiens, contre 6 % avant ma prise de poste. J'ai aussi structuré le passage en équipe : recrutement et onboarding de deux SDR juniors qui sont aujourd'hui autonomes.

Vous venez d'ouvrir un bureau à Berlin et de recruter une nouvelle VP Sales. Cette double dynamique correspond exactement à ce que je cherche : une équipe en construction, un marché international, et un produit en traction. J'aimerais beaucoup en discuter avec vous, même si aucun poste n'est ouvert publiquement aujourd'hui.

Je peux vous envoyer un dossier détaillé de mes résultats sur demande, ou échanger lors d'un appel de 15 minutes la semaine prochaine.

Bien cordialement,

[Votre prénom NOM]`}
              </div>
            </div>

            <div className="bg-violet-50/40 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-700 uppercase tracking-widest mb-3">Pourquoi cette lettre marche</p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-8">
                <li>L&apos;accroche se rattache à une actualité publique de l&apos;entreprise (recrutement de 30 grands comptes).</li>
                <li>Les chiffres sont précis et reliés au besoin présumé, pas un CV en prose.</li>
                <li>La conclusion accepte qu&apos;il n&apos;y ait pas de poste ouvert et propose un appel court : la barrière à dire oui est basse.</li>
                <li>Le ton est direct, &ldquo;Bonjour [Prénom]&rdquo; remplace &ldquo;Madame, Monsieur&rdquo; quand le recruteur est identifié.</li>
              </ul>
            </div>

            {/* Exemple 5 : Reconversion */}
            <h2 id="exemple-reconversion" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple 5 : lettre de motivation pour une reconversion professionnelle
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Situation : vous changez de métier. Le recruteur va se poser deux questions immédiates. Pourquoi maintenant ? Et qu&apos;est-ce qui vous rend crédible pour ce poste alors que votre CV raconte une autre histoire ? La lettre doit répondre à ces deux questions sans détour. Pour aller plus loin, consultez notre guide complet{" "}
              <Link href="/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                lettre de motivation reconversion professionnelle
              </Link>.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 ring-1 ring-gray-100">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-4">Modèle lettre de motivation reconversion</p>
              <div className="text-gray-800 text-base leading-7 font-serif whitespace-pre-line">
{`[Votre prénom NOM]
[Votre adresse]
[Code postal Ville]
[Email] · [Téléphone]

[Nom du recruteur ou Service Recrutement]
[Nom de l'entreprise]
[Adresse de l'entreprise]

À [Ville], le [date]

Objet : Candidature au poste de Développeur Web Junior (réf. [RÉFÉRENCE])

Madame, Monsieur,

Après 8 ans dans le commerce B2B, j'ai repris une formation intensive de développeur web en 2025. Six mois plus tard, j'ai construit et déployé en production trois projets full stack en React et Node.js, dont une marketplace utilisée chaque jour par 200 personnes. C'est avec ce parcours que je postule au poste de Développeur Junior chez [NOM ENTREPRISE].

Cette reconversion n'est pas un changement d'avis. C'est l'aboutissement d'un intérêt construit depuis longtemps : je code sur mes soirées depuis 4 ans, j'ai contribué à deux projets open source en 2024, et j'ai cessé mon activité commerciale en juin 2025 pour me consacrer pleinement à la formation. Ce que j'apporte en plus d'un profil junior classique : une vraie compréhension du métier client, une capacité à reformuler les besoins, et l'habitude des cycles de vente longs.

Votre équipe produit travaille en TypeScript, Next.js et PostgreSQL : c'est exactement ma stack. Votre outil de gestion de carrière, utilisé par 12 000 entreprises, m'intéresse particulièrement parce qu'il croise mes deux compétences, le développement et l'expérience commerciale. Je vois précisément où je pourrais contribuer dès les premières semaines.

Je serais heureux de vous présenter mes projets en entretien, en partageant le code et les décisions techniques prises sur chacun. Je suis disponible immédiatement, en télétravail comme en présentiel à [VILLE].

Bien cordialement,

[Votre prénom NOM]`}
              </div>
            </div>

            <div className="bg-violet-50/40 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-700 uppercase tracking-widest mb-3">Pourquoi cette lettre marche</p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg leading-8">
                <li>Elle assume frontalement la reconversion dès la première phrase, pas en explication défensive.</li>
                <li>Elle prouve la crédibilité technique avec des réalisations concrètes (3 projets, 200 utilisateurs/jour).</li>
                <li>Elle transforme le passé commercial en atout, pas en handicap.</li>
                <li>Elle montre une vraie connaissance de la stack de l&apos;entreprise, indispensable en tech.</li>
              </ul>
            </div>

            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Les 5 exemples reposent sur la même structure, mais chaque accroche est différente. C&apos;est ce qui sépare un modèle utilisable d&apos;une formule générique : la structure est commune, la première phrase ne l&apos;est jamais.
              </p>
            </blockquote>

            {/* Section : Erreurs */}
            <h2 id="erreurs" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 5 erreurs qui éliminent une lettre en 10 secondes
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les pièges les plus fréquents repérés en lecture de lettres. Chacun éjecte une candidature avant même que le recruteur ait lu la moitié du texte.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur 1 : l&apos;ouverture cliché</p>
              <p className="text-gray-500 line-through text-lg">Je me permets de vous contacter suite à votre annonce publiée sur Indeed pour le poste de...</p>
              <p className="text-gray-800 font-medium text-lg">Votre annonce pour le poste de Chef de Projet appelle un profil capable de piloter 5 chantiers en parallèle sans glissement. C&apos;est ce que je fais chez [ENTREPRISE ACTUELLE] depuis 2 ans.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur 2 : recopier le CV en phrases</p>
              <p className="text-gray-500 line-through text-lg">Diplômé d&apos;une licence en marketing, j&apos;ai ensuite occupé un poste d&apos;assistant marketing pendant 2 ans avant de devenir chef de produit junior.</p>
              <p className="text-gray-800 font-medium text-lg">Mon expérience en gestion de catalogue produit chez [ENTREPRISE ACTUELLE] m&apos;a appris à arbitrer entre marge et rotation, un sujet central dans votre annonce.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur 3 : les superlatifs vides</p>
              <p className="text-gray-500 line-through text-lg">Très motivé, passionné, dynamique et rigoureux, je suis convaincu de pouvoir apporter une réelle valeur ajoutée à votre équipe.</p>
              <p className="text-gray-800 font-medium text-lg">J&apos;ai automatisé le reporting mensuel des ventes, ramenant le temps de préparation de 6 à 1,5 heures. C&apos;est ce niveau de pragmatisme que je cherche à mettre dans votre équipe.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur 4 : la flatterie générale</p>
              <p className="text-gray-500 line-through text-lg">Votre entreprise est un leader reconnu dans son secteur et ses valeurs correspondent parfaitement à mes aspirations.</p>
              <p className="text-gray-800 font-medium text-lg">Votre lancement de l&apos;offre Pro en avril, suivi de l&apos;arrivée de [NOM] comme Head of Product, indique une bascule vers le mid-market. C&apos;est précisément le mouvement sur lequel j&apos;aimerais contribuer.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur 5 : la clôture passive</p>
              <p className="text-gray-500 line-through text-lg">Dans l&apos;attente d&apos;une réponse favorable de votre part, je vous prie d&apos;agréer, Madame, Monsieur, l&apos;expression de mes salutations distinguées.</p>
              <p className="text-gray-800 font-medium text-lg">Je serais ravi d&apos;échanger avec vous lors d&apos;un appel de 20 minutes la semaine prochaine. Je suis disponible mardi et jeudi en fin de journée.</p>
            </div>

            {/* Section : Format */}
            <h2 id="format" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Format, longueur et envoi
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une fois le contenu calé, il reste les détails matériels. Voici ce qui compte vraiment, et ce qui n&apos;a aucune importance.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Longueur</strong> : 250 à 350 mots. Une seule page, jamais deux.</li>
              <li><strong>Police</strong> : la même que votre CV, taille 11, interligne 1,15.</li>
              <li><strong>Marges</strong> : 2 à 2,5 cm de chaque côté, alignement à gauche.</li>
              <li><strong>Format de fichier</strong> : PDF dans 95 % des cas. Word uniquement si l&apos;offre le demande explicitement, ou pour les candidatures spontanées dans certains grands groupes. Plus de détails dans notre comparatif{" "}
                <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">PDF ou Word pour les candidatures</Link>.
              </li>
              <li><strong>Nom du fichier</strong> : &ldquo;LM_PrenomNom_IntituléPoste.pdf&rdquo;, pas &ldquo;Document1.pdf&rdquo; ni &ldquo;Lettre_motivation_v3_final.pdf&rdquo;.</li>
              <li><strong>Manuscrite</strong> : uniquement si l&apos;offre le demande, ce qui devient très rare. Pour les rares cas qui le demandent encore (cabinets d&apos;avocats, fonction publique territoriale), une lettre tapée puis imprimée et signée fonctionne aussi.</li>
              <li><strong>Objet d&apos;email</strong> si envoi par mail : &ldquo;Candidature [Intitulé du poste], [Prénom Nom]&rdquo;. Clair, sans créativité inutile.</li>
            </ul>

            {/* FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de mots pour une lettre de motivation efficace ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Entre 250 et 350 mots. C&apos;est la fenêtre lue intégralement par un recruteur en 30 secondes. En dessous, vous donnez l&apos;impression d&apos;avoir bâclé. Au-dessus, vous n&apos;êtes plus lu jusqu&apos;au bout.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il personnaliser un modèle pour chaque candidature ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, mais pas entièrement. La structure reste la même, c&apos;est tout l&apos;intérêt d&apos;un exemple lettre de motivation réutilisable. Ce qui change, c&apos;est l&apos;accroche, le paragraphe de connexion avec l&apos;entreprise, et les chiffres mis en avant. Comptez 15 à 20 minutes par lettre une fois la matrice posée.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Quelle différence entre un modèle de lettre de motivation et un exemple ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un modèle est une structure à remplir : champs entre crochets, paragraphes prédéfinis, ton neutre. Un exemple, c&apos;est un cas concret rédigé pour une situation précise, qu&apos;on adapte à la sienne. Les 5 exemples ci-dessus sont un mélange des deux : ils sont entièrement rédigés, et les champs à modifier sont marqués entre crochets pour l&apos;adaptation.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on utiliser ChatGPT pour rédiger sa lettre ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui pour démarrer, non pour livrer. Une IA produit une structure correcte et des formulations propres. Elle ne connaît ni votre parcours précis, ni l&apos;actualité réelle de l&apos;entreprise visée, ni vos chiffres. Une lettre 100 % générée et non retravaillée a exactement le même défaut qu&apos;un modèle pris sur Google : elle est repérable au premier coup d&apos;œil. Utilisez l&apos;IA pour la coque, gardez la main sur les preuves et la connexion.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il joindre la lettre de motivation au CV ou l&apos;écrire dans le corps de l&apos;email ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les deux, idéalement. Le corps de l&apos;email reprend la version courte : 2 ou 3 paragraphes, environ 150 mots, avec un lien direct vers le CV et la lettre complète en pièce jointe. Cela évite que le destinataire ait à ouvrir un fichier avant de comprendre qui vous êtes.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment savoir si l&apos;offre passe par un ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La lettre de motivation est rarement analysée par l&apos;ATS, qui se concentre sur le CV. Mais l&apos;offre est presque toujours filtrée par un logiciel avant d&apos;arriver chez l&apos;humain. Pour identifier les signaux,{" "}
              <Link href="/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                notre article sur les ATS
              </Link>
              {" "}détaille comment le détecter avant de postuler.
            </p>

            {/* CTA Rivjob */}
            <h2 id="cta" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Adaptez votre candidature en quelques minutes
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une lettre de motivation efficace s&apos;appuie sur un CV cohérent avec l&apos;offre. Les mots-clés de l&apos;annonce doivent se retrouver des deux côtés : dans le CV pour passer l&apos;ATS, dans la lettre pour convaincre le recruteur humain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse gratuitement la correspondance entre votre CV et une offre d&apos;emploi, et identifie les mots-clés manquants. Ces termes sont exactement ceux à réintégrer dans votre lettre pour que toute la candidature parle d&apos;une seule voix.
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
