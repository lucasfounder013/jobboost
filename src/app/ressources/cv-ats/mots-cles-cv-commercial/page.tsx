import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Mots-clés CV Commercial : liste complète 2026 | JobBoost",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Commercial qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
  ...ogMeta(
    "Mots-clés CV Commercial : liste complète 2026 | JobBoost",
    "Découvrez les 30+ mots-clés indispensables pour un CV Commercial qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    "/ressources/cv-ats/mots-cles-cv-commercial"
  ),
};

const TOC = [
  { id: "pourquoi-mots-cles",        titre: "Pourquoi les mots-clés sont critiques",              niveau: 2 },
  { id: "liste-mots-cles",           titre: "Les 30 mots-clés incontournables par catégorie",      niveau: 2 },
  { id: "competences-commerciales",  titre: "Compétences commerciales",                            niveau: 3 },
  { id: "soft-skills",               titre: "Soft skills",                                         niveau: 3 },
  { id: "outils-crm",                titre: "Outils CRM et logiciels",                             niveau: 3 },
  { id: "certifications",            titre: "Certifications reconnues",                            niveau: 3 },
  { id: "integrer-mots-cles",        titre: "Comment les intégrer naturellement",                  niveau: 2 },
  { id: "erreurs-a-eviter",          titre: "Les erreurs à éviter",                                niveau: 2 },
  { id: "faq",                       titre: "FAQ : ATS et CV Commercial",                          niveau: 2 },
  { id: "ce-que-fait-jobboost",      titre: "Ce que fait JobBoost",                                niveau: 2 },
];

export default function ArticleMotsClesCommercial() {
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
          <span className="text-gray-600">Mots-clés CV Commercial</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Commercial : liste complète 2026 pour passer les ATS
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
              <span>5 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Commercial sédentaire, commercial terrain, ingénieur commercial, business developer.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le même intitulé de poste recouvre des réalités très différentes. Et pourtant, les recruteurs qui cherchent dans leur ATS utilisent souvent les mêmes mots-clés, quel que soit le secteur visé.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur ne tape pas &ldquo;bon relationnel&rdquo; dans sa barre de recherche. Il tape &ldquo;prospection B2B&rdquo;, &ldquo;Salesforce&rdquo; ou &ldquo;cycle de vente&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les 30 mots-clés que vous devez absolument avoir dans votre CV pour être trouvé parmi les milliers de profils commerciaux disponibles sur le marché.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Commercial
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le poste de commercial est l&apos;un des plus recrutés en France. C&apos;est aussi l&apos;un des plus concurrentiels. Une offre d&apos;emploi reçoit en moyenne plusieurs centaines de candidatures.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Face à ce volume, le recruteur n&apos;ouvre pas les CV un par un. Il ouvre son ATS et filtre la base avec des mots-clés précis, exactement comme on fait une recherche sur un moteur de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre concrètement <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment un recruteur navigue dans son ATS et ce qu&apos;il voit en premier</Link>, notre article dédié vous donnera une vision précise du processus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les profils qui remontent sont ceux dont le CV contient les mots exacts tapés par le recruteur. Les autres restent invisibles, même si leur bilan commercial est excellent.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre bilan commercial qui vous élimine. C&apos;est l&apos;absence du bon mot dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un Commercial, le risque est double : utiliser des formulations trop vagues comme &ldquo;relation client&rdquo; d&apos;un côté, ou des expressions trop informelles comme &ldquo;bonne humeur&rdquo; et &ldquo;sens du contact&rdquo; de l&apos;autre. La liste ci-dessous couvre le vocabulaire structuré attendu par les ATS.
            </p>

            {/* Section 2 */}
            <h2 id="liste-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 30 mots-clés incontournables par catégorie
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont organisés par catégorie pour vous aider à les répartir dans les bonnes rubriques de votre CV.
            </p>

            {/* H3 : Compétences commerciales */}
            <h3 id="competences-commerciales" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Compétences commerciales
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce sont les mots-clés les plus cherchés par les recruteurs. Ils décrivent ce que vous savez faire concrètement dans votre activité commerciale au quotidien.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Prospection commerciale</strong> : identification et qualification de nouveaux leads, entrante ou sortante</li>
              <li><strong>Développement de portefeuille client</strong> : extension du chiffre d&apos;affaires sur la base existante</li>
              <li><strong>Négociation commerciale</strong> : argumentation, gestion des objections, défense des marges</li>
              <li><strong>Cycle de vente</strong> : maîtrise des étapes de la qualification jusqu&apos;au closing</li>
              <li><strong>Closing</strong> : signature du contrat, finalisation de la vente, transformation du prospect en client</li>
              <li><strong>Gestion d&apos;un pipeline commercial</strong> : suivi structuré des opportunités à chaque étape du funnel</li>
              <li><strong>Account management</strong> : fidélisation et développement de comptes clients existants</li>
              <li><strong>Business development</strong> : ouverture de nouveaux marchés, partenariats stratégiques</li>
            </ul>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales sont souvent cherchées en complément dans les filtres ATS. L&apos;enjeu est de les formuler de façon précise, pas générique.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Aisance relationnelle</strong> : capacité à créer rapidement un lien de confiance avec des interlocuteurs variés</li>
              <li><strong>Écoute active</strong> : identification des besoins réels du client avant de proposer une solution</li>
              <li><strong>Persuasion</strong> : art de convaincre sans forcer, en s&apos;appuyant sur les bénéfices pour le client</li>
              <li><strong>Résilience</strong> : capacité à rebondir après un refus sans perdre en efficacité ni en motivation</li>
              <li><strong>Orientation résultats</strong> : focus sur les objectifs chiffrés, dépassement des quotas de vente</li>
              <li><strong>Autonomie</strong> : capacité à gérer son territoire commercial et son agenda sans micro-management</li>
              <li><strong>Ténacité</strong> : relances structurées, suivi long terme des prospects froids jusqu&apos;à la conversion</li>
            </ul>

            {/* H3 : Outils CRM */}
            <h3 id="outils-crm" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Outils CRM et logiciels
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs et les ATS cherchent souvent des noms d&apos;outils précis. Ces noms sont des mots-clés à part entière dans les bases de données de candidatures.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Salesforce</strong> : CRM de référence dans les grandes entreprises et les équipes commerciales structurées</li>
              <li><strong>HubSpot</strong> : CRM très répandu dans les startups, scaleups et PME en croissance</li>
              <li><strong>Microsoft Dynamics 365</strong> : solution Microsoft, fréquente dans les grands groupes industriels</li>
              <li><strong>Pipedrive</strong> : CRM orienté pipeline, populaire dans les équipes commerciales agiles</li>
              <li><strong>Zoho CRM</strong> : alternative économique utilisée dans les ETI françaises</li>
              <li><strong>LinkedIn Sales Navigator</strong> : outil de prospection B2B devenu incontournable</li>
              <li><strong>Excel avancé</strong> : tableaux de bord commerciaux, reporting des KPI, suivi d&apos;objectifs</li>
              <li><strong>Outreach / SalesLoft</strong> : plateformes de sales engagement en forte progression dans les équipes B2B</li>
              <li><strong>Notion / Monday.com</strong> : outils de suivi de prospection et gestion des tâches commerciales</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Mentionnez uniquement les CRM que vous avez vraiment utilisés. La question &ldquo;Salesforce, vous l&apos;avez utilisé comment ?&rdquo; arrive toujours en entretien.
              </p>
            </blockquote>

            {/* H3 : Certifications */}
            <h3 id="certifications" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Certifications reconnues
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces diplômes et certifications sont explicitement filtrés dans les ATS des grandes entreprises et des cabinets de recrutement spécialisés dans les fonctions commerciales.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>BTS NRC / BTS MCO</strong> : diplômes de référence filtrés par les ATS dans les offres grande distribution, télévente et B2C</li>
              <li><strong>DUT TC</strong> (Techniques de Commercialisation) : mention fréquente dans les offres B2B et industrie</li>
              <li><strong>Certification Salesforce</strong> : Salesforce Certified Sales Cloud Consultant, très valorisée dans les entreprises utilisatrices</li>
              <li><strong>HubSpot Sales Software Certification</strong> : certification gratuite, très visible sur LinkedIn et filtrée dans les offres PME/startup</li>
              <li><strong>SPIN Selling</strong> : méthode de vente structurée par questions, valorisée dans les offres grands comptes et vente complexe</li>
              <li><strong>Solution Selling</strong> : approche conseil de la vente, attendue dans les environnements B2B à cycle long</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas encore de certification formelle, mentionnez les méthodologies que vous pratiquez : SPIN Selling, inbound sales, social selling, vente consultative. Ces termes sont cherchés par les ATS indépendamment des certifications.
            </p>

            {/* Section 3 */}
            <h2 id="integrer-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment intégrer ces mots-clés naturellement dans son CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La tentation est forte de créer une rubrique &ldquo;Mots-clés&rdquo; avec une liste de 30 termes. C&apos;est une erreur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS modernes valorisent les mots-clés qui apparaissent dans leur contexte. Un mot-clé mentionné dans une description d&apos;expérience a plus de poids qu&apos;un mot-clé isolé dans une liste à plat.
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
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion d&apos;un portefeuille clients</p>
                <p className="text-gray-800 font-medium text-lg">Développement d&apos;un portefeuille de 80 comptes B2B avec prospection active via Salesforce et LinkedIn Sales Navigator</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Vente de produits</p>
                <p className="text-gray-800 font-medium text-lg">Closing de contrats SaaS sur un cycle de vente de 3 à 6 mois, gestion du pipeline sous HubSpot et atteinte de 115% des objectifs 2024</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Relation avec les clients</p>
                <p className="text-gray-800 font-medium text-lg">Account management de 12 comptes clés, négociation commerciale annuelle et fidélisation à 94%</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV Commercial bien rédigé contient naturellement 15 à 20 mots-clés métier. Le vocabulaire du quotidien suffit — il faut juste l&apos;écrire clairement.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certaines pratiques très répandues dans les CV commerciaux nuisent directement à leur lisibilité par les ATS.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Utiliser des chiffres sans contexte.</strong>{" "}
                &ldquo;CA : 2M€&rdquo; ne dit pas si c&apos;est une progression, un objectif atteint ou un territoire hérité. &ldquo;Développement du CA de 1,2M€ à 2M€ en 18 mois&rdquo; est à la fois plus indexable et plus crédible.
              </li>
              <li>
                <strong>Mettre des soft skills sans preuves.</strong>{" "}
                &ldquo;Dynamique&rdquo;, &ldquo;motivé&rdquo;, &ldquo;bon relationnel&rdquo; sont invisibles pour un ATS. Remplacez ces formulations par les mots-clés de la liste ci-dessus avec des exemples concrets d&apos;application.
              </li>
              <li>
                <strong>Ignorer les variantes anglaises.</strong>{" "}
                Si l&apos;offre dit &ldquo;Sales Representative&rdquo;, incluez cette variante en plus de &ldquo;Commercial&rdquo;. Pour comprendre <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment fonctionne vraiment un ATS et pourquoi les variantes comptent</Link>, notre article de référence vous donnera les bases.
              </li>
              <li>
                <strong>Mettre le nom du CRM seulement dans les compétences.</strong>{" "}
                Salesforce ou HubSpot doivent aussi apparaître dans vos descriptions d&apos;expériences, avec des actions concrètes associées. Un CRM listé sans contexte pèse moins lourd dans l&apos;indexation ATS.
              </li>
              <li>
                <strong>Ne pas mentionner les métriques de performance.</strong>{" "}
                &ldquo;120% des objectifs&rdquo; ou &ldquo;taux de conversion 18%&rdquo; sont des indicateurs cherchés par les recruteurs. Le format du fichier peut aussi affecter la façon dont ces données sont lues : consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif PDF ou Word pour les ATS</Link>.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Commercial
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Un recruteur cherche-t-il &ldquo;Commercial&rdquo; ou &ldquo;Sales&rdquo; dans son ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les deux, selon le profil visé et la culture de l&apos;entreprise. Les grands groupes internationaux utilisent souvent les deux langues dans leurs filtres ATS. Les PME françaises restent majoritairement francophones.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne pratique est d&apos;inclure les variantes françaises et anglaises dans votre titre de poste et vos descriptions d&apos;expériences. Pour comprendre <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment un ATS traite vraiment vos mots-clés</Link>, notre article de référence vous donnera les bases.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Est-ce que tous les postes commerciaux ont les mêmes mots-clés ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non. Un SDR (Sales Development Representative) sera cherché avec &ldquo;prospection&rdquo;, &ldquo;cold calling&rdquo;, &ldquo;lead qualification&rdquo;. Un Key Account Manager sera filtré sur &ldquo;grands comptes&rdquo;, &ldquo;account management&rdquo;, &ldquo;négociation&rdquo;. Un ingénieur commercial aura besoin de mots-clés techniques propres à son secteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La liste de cet article couvre le tronc commun universel de la fonction commerciale. Pour les mots-clés spécifiques à votre type de poste ou votre secteur, analysez les offres réelles que vous ciblez.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il mentionner le nom des entreprises clientes dans son CV ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Seulement si elles sont reconnues et si leur mention est stratégique. Un ATS n&apos;indexe pas les noms de clients comme des mots-clés cherchés. En revanche, &ldquo;gestion de comptes CAC 40&rdquo; ou &ldquo;développement PME secteur industrie&rdquo; sont des formulations qui peuvent apparaître dans des filtres recruteurs.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Comme pour d&apos;autres métiers transverses, les recruteurs cherchent des formulations universelles plutôt que des noms propres. C&apos;est ce que montre aussi notre analyse des <Link href="/ressources/cv-ats/mots-cles-cv-chef-de-projet" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Chef de Projet</Link>, un métier soumis aux mêmes enjeux d&apos;indexation.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les objectifs chiffrés sont-ils indexés par les ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui. Les chiffres comme &ldquo;115%&rdquo;, &ldquo;2M€&rdquo; ou &ldquo;50 nouveaux comptes&rdquo; sont parsés et cherchables. Certains recruteurs filtrent sur des fourchettes de chiffre d&apos;affaires ou de taille de portefeuille. Incluez toujours les métriques de vos résultats dans vos descriptions d&apos;expériences.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que fait le recruteur avec votre CV une fois reçu</Link> et comment vos données sont traitées dans l&apos;ATS, notre article dédié détaille le processus étape par étape.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Mon CV PDF est-il bien lu par les ATS pour un poste commercial ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cela dépend du logiciel utilisé par l&apos;entreprise. Les postes commerciaux dans les grandes entreprises et les groupes industriels utilisent souvent Workday ou Taleo, qui parsent mieux les fichiers Word.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un arbitrage complet sur ce sujet, consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif PDF ou Word pour les ATS</Link>. Et pour savoir quel ATS utilise l&apos;entreprise où vous postulez, notre guide sur <Link href="/ressources/cv-ats/ats-les-plus-utilises-en-france" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les ATS les plus utilisés en France</Link> vous donnera les informations nécessaires.
            </p>

            {/* Section 6 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette liste vous donne les mots-clés universels de la fonction commerciale. Mais chaque offre d&apos;emploi a ses propres priorités.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique. Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV — ceux que le recruteur tapera dans son ATS pour trouver le bon profil commercial.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV apparaisse quand le recruteur cherche un Commercial avec exactement votre profil.
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
