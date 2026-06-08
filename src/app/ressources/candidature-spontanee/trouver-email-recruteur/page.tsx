import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";

export const metadata = {
  title: "Comment trouver l'email d'un recruteur en 2026 : 8 méthodes efficaces | JobBoost",
  description:
    "8 méthodes pour trouver l'adresse email d'un recruteur ou DRH pour votre candidature spontanée. Hunter.io, LinkedIn, patterns email, RGPD : guide complet.",
};

const TOC = [
  { id: "pourquoi-email-direct",  titre: "Pourquoi cibler directement le recruteur ?",      niveau: 2 },
  { id: "site-entreprise",        titre: "1. Le site web de l'entreprise",                   niveau: 2 },
  { id: "linkedin",               titre: "2. LinkedIn : profil et messagerie",                niveau: 2 },
  { id: "outils-specialises",     titre: "3. Les outils spécialisés (JobBoost, Hunter.io…)", niveau: 2 },
  { id: "pattern-email",          titre: "4. Déduire le format email",                       niveau: 2 },
  { id: "google-dorking",         titre: "5. Google dorking",                                niveau: 2 },
  { id: "autres-methodes",        titre: "6. La Bonne Boîte, Societe.com, mentions légales", niveau: 2 },
  { id: "rgpd",                   titre: "RGPD : ce qui est légal",                          niveau: 2 },
  { id: "apres-email",            titre: "Une fois l'email trouvé : ce qui compte ensuite",  niveau: 2 },
  { id: "faq",                    titre: "FAQ",                                               niveau: 2 },
];

export default function ArticleTrouverEmailRecruteur() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Candidature spontanée</Link>
          <span>›</span>
          <span className="text-gray-600">Trouver l&apos;email d&apos;un recruteur</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Comment trouver l&apos;email d&apos;un recruteur en 2026 : 8 méthodes efficaces
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
              <span>9 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>9 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Près d&apos;un poste sur deux est pourvu sans jamais être publié sur un jobboard. Les entreprises recrutent via leur réseau, par candidatures spontanées ciblées, ou en anticipant des besoins futurs. Si vous attendez qu&apos;une offre apparaisse, vous arrivez souvent trop tard.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le problème, c&apos;est que la plupart des candidats envoient leur candidature spontanée à <code className="bg-gray-100 text-gray-700 text-sm px-1.5 py-0.5 rounded">contact@entreprise.fr</code> ou au formulaire générique du site. Ces messages finissent dans une boîte collective que personne ne surveille vraiment. Le taux de réponse est proche de zéro.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour qu&apos;une candidature spontanée soit lue, elle doit atterrir dans la boîte du bon interlocuteur : le DRH, le responsable du recrutement, ou directement le manager du service visé. Ce guide vous donne 8 méthodes concrètes pour trouver cet email, des outils gratuits à utiliser, et le cadre légal à respecter.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-email-direct" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi cibler directement le recruteur ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La boîte mail générale d&apos;une entreprise est souvent gérée par une assistante ou par un système de tickets. Votre CV passe entre plusieurs mains avant d&apos;arriver à quelqu&apos;un qui peut prendre une décision, si tant est qu&apos;il arrive jusqu&apos;à lui.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En ciblant directement le DRH, le responsable RH ou le manager du pôle qui vous intéresse, vous court-circuitez ce filtre. Votre message est immédiatement entre les mains de quelqu&apos;un qui peut répondre, transférer, ou retenir votre profil pour une prochaine ouverture.
            </p>
            <blockquote className="border-l-4 border-violet-300 bg-violet-50/40 rounded-r-xl px-6 py-5 my-8">
              <p className="text-gray-700 leading-8 italic text-lg">
                <span className="text-violet-400 font-serif text-4xl leading-none mr-1">&ldquo;</span>
                Un email envoyé au bon interlocuteur a dix fois plus de chances d&apos;obtenir une réponse qu&apos;un email envoyé à une adresse générique.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="site-entreprise" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              1. Le site web de l&apos;entreprise
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le point de départ le plus simple, et souvent le plus efficace pour les PME. Les pages à explorer en priorité :
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Page « Notre équipe »", desc: "Beaucoup de PME et de startups affichent les noms, les postes et parfois les emails directs de leurs collaborateurs." },
                { label: "Page « Nous rejoindre » ou « Carrières »", desc: "L'email de contact est parfois celui du RH en charge du recrutement, et non l'adresse générique." },
                { label: "Page « Contact »", desc: "Si plusieurs contacts sont listés par département, cherchez celui qui correspond aux RH ou aux ressources humaines." },
                { label: "Mentions légales", desc: "Obligatoires en France, elles incluent le nom du responsable légal et parfois une adresse email de direction." },
                { label: "Footer du site", desc: "Certaines startups y glissent un email direct de leur fondateur ou CEO, surtout en phase de croissance." },
              ].map((item) => (
                <li key={item.label} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-gray-700 leading-8 text-lg">
                    <span className="font-semibold text-gray-900">{item.label} :</span> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous ne trouvez pas d&apos;email nominatif directement, notez au moins le domaine de l&apos;entreprise (ex. <code className="bg-gray-100 text-gray-700 text-sm px-1.5 py-0.5 rounded">@societe.fr</code>). Vous en aurez besoin pour les méthodes suivantes.
            </p>

            {/* Section 3 */}
            <h2 id="linkedin" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              2. LinkedIn : profil et messagerie
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              LinkedIn est le carnet d&apos;adresses RH le plus complet qui existe. La démarche est simple : recherchez le nom de l&apos;entreprise dans la barre de recherche, accédez à la page de l&apos;entreprise, puis cliquez sur « Voir tous les employés ». Filtrez par poste avec des mots-clés comme <em>DRH</em>, <em>recruteur</em>, <em>responsable RH</em>, <em>talent acquisition</em>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une fois le bon profil identifié, plusieurs options :
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Informations de contact visibles", desc: "Sur certains profils publics, l'email pro est affiché directement dans la section « Coordonnées »." },
                { label: "Message InMail", desc: "Sans abonnement Premium, vous pouvez envoyer un message à un contact de 2e degré si vous avez une connexion en commun. C'est souvent suffisant pour les PME." },
                { label: "Connexion + message", desc: "Envoyez une demande de connexion avec une note personnalisée (300 caractères). Si acceptée, vous pouvez envoyer un message gratuit." },
                { label: "Extension Kaspr", desc: "Cette extension Chrome (gratuite jusqu'à 5 crédits/mois) extrait l'email pro et le numéro de téléphone directement depuis un profil LinkedIn." },
              ].map((item) => (
                <li key={item.label} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-gray-700 leading-8 text-lg">
                    <span className="font-semibold text-gray-900">{item.label} :</span> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              LinkedIn Premium (Sales Navigator) va plus loin en permettant de filtrer par niveau hiérarchique, taille d&apos;entreprise et secteur. C&apos;est utile si vous ciblez plusieurs dizaines d&apos;entreprises en parallèle.
            </p>

            {/* Section 4 */}
            <h2 id="outils-specialises" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              3. Les outils spécialisés (JobBoost, Hunter.io…)
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Des outils dédiés agrègent des données publiques pour retrouver ou vérifier des adresses email professionnelles en quelques secondes. Les plus utiles en 2026 :
            </p>
            <div className="space-y-5 mb-8">
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-5 ring-1 ring-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[9px] font-extrabold">JB</span>
                  </div>
                  <p className="font-semibold text-gray-900">JobBoost</p>
                  <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Recommandé</span>
                </div>
                <p className="text-gray-600 leading-7 text-sm mb-3">
                  JobBoost intègre un outil de recherche de contacts RH directement dans la plateforme. Entrez le nom d&apos;une entreprise et accédez aux emails professionnels vérifiés des responsables recrutement. Les crédits de révélation sont inclus dans votre abonnement.
                </p>
                <Link
                  href="/outils/recherche-email"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Trouver un contact RH sur JobBoost →
                </Link>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 ring-1 ring-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Hunter.io</p>
                <p className="text-gray-600 leading-7 text-sm">
                  Le plus connu. Entrez le domaine d&apos;une entreprise (ex. <code className="bg-white text-gray-700 text-xs px-1 rounded">decathlon.fr</code>) et Hunter vous liste tous les emails connus associés à ce domaine, ainsi que le format utilisé (<code className="bg-white text-gray-700 text-xs px-1 rounded">prenom.nom@</code>, <code className="bg-white text-gray-700 text-xs px-1 rounded">prenom@</code>…). L&apos;Email Finder génère une adresse probable pour un nom donné. <strong>50 recherches gratuites par mois.</strong>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 ring-1 ring-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Kaspr</p>
                <p className="text-gray-600 leading-7 text-sm">
                  Outil français, fonctionne comme extension Chrome sur les profils LinkedIn. Extrait l&apos;email pro et le téléphone en un clic. Plan gratuit limité à quelques crédits par mois, suffisant pour une recherche ciblée.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 ring-1 ring-gray-100">
                <p className="font-semibold text-gray-900 mb-1">RocketReach</p>
                <p className="text-gray-600 leading-7 text-sm">
                  Similaire à Hunter, avec des données enrichies sur les dirigeants. Plan gratuit disponible (5 lookups/mois). Utile pour des entreprises internationales moins bien couvertes par Hunter.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 ring-1 ring-gray-100">
                <p className="font-semibold text-gray-900 mb-1">Snov.io / Zeliq</p>
                <p className="text-gray-600 leading-7 text-sm">
                  Alternatives à Hunter avec des plans gratuits généreux. Snov.io inclut aussi un vérificateur d&apos;email intégré.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant d&apos;utiliser un email trouvé via ces outils, vérifiez-le avec la fonction de vérification intégrée (Hunter Verify, Snov.io Email Verifier) ou via un service comme <em>mail-tester.com</em>. Un email invalide nuit à votre réputation d&apos;expéditeur.
            </p>

            {/* Section 5 */}
            <h2 id="pattern-email" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              4. Déduire le format email
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans la plupart des entreprises, toutes les adresses email suivent le même format. Si vous connaissez l&apos;email d&apos;un seul employé, vous pouvez déduire celui de n&apos;importe quel autre collaborateur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les formats les plus courants en France :
            </p>
            <div className="bg-gray-50 rounded-xl p-5 ring-1 ring-gray-100 mb-8">
              <div className="space-y-2 font-mono text-sm text-gray-700">
                <p><span className="text-violet-600">prenom.nom</span>@entreprise.fr &nbsp;<span className="text-gray-400 font-sans text-xs">(le plus fréquent)</span></p>
                <p><span className="text-violet-600">prenom</span>@entreprise.fr &nbsp;<span className="text-gray-400 font-sans text-xs">(startups, petites structures)</span></p>
                <p><span className="text-violet-600">p.nom</span>@entreprise.fr &nbsp;<span className="text-gray-400 font-sans text-xs">(initiale + nom)</span></p>
                <p><span className="text-violet-600">nomprenom</span>@entreprise.fr &nbsp;<span className="text-gray-400 font-sans text-xs">(moins courant)</span></p>
                <p><span className="text-violet-600">prenom_nom</span>@entreprise.fr &nbsp;<span className="text-gray-400 font-sans text-xs">(avec underscore)</span></p>
              </div>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Comment obtenir ce premier email de référence ? Cherchez une offre d&apos;emploi publiée par l&apos;entreprise où figure un email de contact, consultez un communiqué de presse, ou trouvez l&apos;email d&apos;un commercial sur le site. Une fois le format identifié, construisez l&apos;adresse du recruteur et vérifiez-la.
            </p>

            {/* Section 6 */}
            <h2 id="google-dorking" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              5. Google dorking
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Google indexe une grande quantité de données publiques que les entreprises publient sans toujours s&apos;en rendre compte : PDFs, pages de contact, annuaires professionnels. Ces requêtes avancées permettent de trouver des emails directement dans les résultats :
            </p>
            <div className="bg-gray-50 rounded-xl p-5 ring-1 ring-gray-100 mb-8 space-y-3 font-mono text-sm text-gray-700">
              <p><span className="text-violet-600">site:entreprise.fr</span> &quot;recrutement&quot; OR &quot;RH&quot; OR &quot;ressources humaines&quot;</p>
              <p><span className="text-violet-600">&quot;@entreprise.fr&quot;</span> &quot;DRH&quot; OR &quot;responsable recrutement&quot;</p>
              <p><span className="text-violet-600">site:entreprise.fr</span> &quot;contact@&quot; OR &quot;rh@&quot; OR &quot;recrutement@&quot;</p>
              <p><span className="text-violet-600">&quot;entreprise.fr&quot;</span> filetype:pdf &quot;recrutement&quot;</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Remplacez <code className="bg-gray-100 text-gray-700 text-sm px-1.5 py-0.5 rounded">entreprise.fr</code> par le vrai domaine. Cette technique est particulièrement efficace pour les PME dont les employés signent leurs emails dans des documents ou des forums professionnels publics.
            </p>

            {/* Section 7 */}
            <h2 id="autres-methodes" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              6. La Bonne Boîte, Societe.com et mentions légales
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces ressources sont moins connues mais souvent très utiles :
            </p>
            <ul className="space-y-5 mb-8">
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">La Bonne Boîte (France Travail)</p>
                  <p className="text-gray-600 leading-7">Identifie les entreprises susceptibles de recruter dans votre secteur et région selon les données DPAE (déclarations préalables à l&apos;embauche). Une fois l&apos;entreprise repérée, vous avez souvent accès à ses coordonnées de base.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Societe.com / Infogreffe</p>
                  <p className="text-gray-600 leading-7">Ces annuaires légaux listent le nom du dirigeant et du responsable légal. Si vous ciblez une PME, le dirigeant est souvent aussi le décideur en matière de recrutement. Avec son nom et le domaine email de l&apos;entreprise, construire son adresse devient simple.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Mentions légales du site</p>
                  <p className="text-gray-600 leading-7">Toute entreprise française est légalement obligée d&apos;afficher le nom et les coordonnées du responsable de la publication. C&apos;est souvent le DG ou le DRH. Cette page est accessible depuis le footer de presque tous les sites.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Twitter/X et autres réseaux</p>
                  <p className="text-gray-600 leading-7">Certains recruteurs et DRH partagent leurs coordonnées en bio. Recherchez le prénom + nom + entreprise sur Twitter/X ou sur d&apos;autres plateformes comme Wellfound (ex-AngelList) pour les startups.</p>
                </div>
              </li>
            </ul>

            {/* Section 8 */}
            <h2 id="rgpd" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              RGPD : ce qui est légal
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une question revient souvent : est-ce légal de contacter directement un recruteur sur son email professionnel sans qu&apos;il vous l&apos;ait donné ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La réponse courte : <strong>oui, dans le cadre d&apos;une candidature spontanée professionnelle.</strong> Le RGPD encadre principalement le traitement de données à des fins commerciales ou de prospection. Une candidature spontanée relève d&apos;une finalité légitime et attendue dans le contexte professionnel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quelques bonnes pratiques pour rester dans les clous :
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Utilisez uniquement des adresses professionnelles publiques (pas d'adresses personnelles trouvées sur des réseaux sociaux privés).",
                "Soyez transparent dans votre email : identifiez-vous clairement, expliquez la raison de votre prise de contact.",
                "Respectez un refus ou une absence de réponse : ne relancez pas plus d'une fois.",
                "N'achetez pas de listes d'emails RH. C'est à la fois inefficace et contraire au RGPD.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-gray-700 leading-8 text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="border-l-4 border-violet-300 bg-violet-50/40 rounded-r-xl px-6 py-5 my-8">
              <p className="text-gray-700 leading-8 italic text-lg">
                <span className="text-violet-400 font-serif text-4xl leading-none mr-1">&ldquo;</span>
                Un email pro visible sur le site de l&apos;entreprise ou sur LinkedIn est une donnée publique. L&apos;utiliser dans le cadre d&apos;une candidature professionnelle est parfaitement légal selon la CNIL.
              </p>
            </blockquote>

            {/* Section 9 */}
            <h2 id="apres-email" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Une fois l&apos;email trouvé : ce qui compte ensuite
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Trouver l&apos;adresse du recruteur est une étape, mais ce qui fait la différence c&apos;est le contenu de votre message. En candidature spontanée, vous n&apos;avez pas de fiche de poste à laquelle répondre. Ce n&apos;est pas une raison d&apos;envoyer un CV générique.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Au contraire, une candidature spontanée efficace doit être encore plus ciblée qu&apos;une réponse à une offre. Le recruteur se demande immédiatement : « Pourquoi cette personne nous contacte-t-elle ? Qu&apos;est-ce qu&apos;elle peut apporter à notre équipe ? »
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour y répondre, votre CV doit utiliser les bons mots-clés liés au secteur, au poste et aux compétences attendues par l&apos;entreprise, même sans offre publiée. JobBoost analyse votre CV par rapport à une description de poste et vous indique exactement ce qui manque ou ce qui peut être amélioré.
            </p>

            {/* CTA JobBoost */}
            <div className="my-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 ring-1 ring-indigo-100 p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-extrabold">JB</span>
                </div>
                <p className="font-bold text-gray-900 text-lg">Optimisez votre CV avant d&apos;envoyer</p>
              </div>
              <p className="text-gray-600 leading-7 mb-5">
                JobBoost analyse votre CV par rapport à une description de poste et vous donne un score de correspondance, la liste des mots-clés manquants, et un CV adapté en un clic. Gratuit pour commencer.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

            {/* FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-8">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Peut-on trouver un email de recruteur sans LinkedIn Premium ?
            </h3>
            <p className="text-gray-700 leading-8 mb-8 text-lg">
              Oui. LinkedIn Premium n&apos;est pas nécessaire pour la plupart des recherches. Le profil gratuit permet de voir les coordonnées lorsqu&apos;elles sont rendues publiques par l&apos;utilisateur. JobBoost, Kaspr (extension gratuite), Hunter.io et la méthode du pattern email fonctionnent tous indépendamment de LinkedIn Premium.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Vaut-il mieux écrire à l&apos;adresse générale ou à un email nominatif ?
            </h3>
            <p className="text-gray-700 leading-8 mb-8 text-lg">
              Toujours privilégier un email nominatif. L&apos;adresse générale (<code className="bg-gray-100 text-gray-700 text-sm px-1.5 py-0.5 rounded">rh@entreprise.fr</code>, <code className="bg-gray-100 text-gray-700 text-sm px-1.5 py-0.5 rounded">contact@entreprise.fr</code>) atterrit dans une boîte collective, souvent peu surveillée. Un email envoyé à une personne identifiée suscite un sentiment de responsabilité et améliore nettement la probabilité de réponse.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Faut-il relancer si on n&apos;a pas de réponse ?
            </h3>
            <p className="text-gray-700 leading-8 mb-8 text-lg">
              Une relance unique, 7 à 10 jours après le premier email, est toujours acceptable et souvent appréciée. Elle montre votre motivation sans être insistante. Au-delà d&apos;une relance, abstenez-vous : vous risqueriez de créer une impression négative auprès du recruteur.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Hunter.io ou Kaspr : lequel choisir ?
            </h3>
            <p className="text-gray-700 leading-8 mb-8 text-lg">
              Ces deux outils sont complémentaires. <strong>Hunter.io</strong> est idéal pour trouver des emails à partir du domaine d&apos;une entreprise et identifier le pattern utilisé. <strong>Kaspr</strong> est plus efficace pour extraire un email depuis un profil LinkedIn identifié. Pour une recherche ciblée, commencez par Kaspr sur LinkedIn ; pour une prospection plus large par domaine, utilisez Hunter. Et pour accéder directement aux contacts RH vérifiés sans jongler entre plusieurs outils, utilisez <Link href="/outils/recherche-email" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">la recherche d&apos;email JobBoost</Link>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Que faire si l&apos;email trouvé est invalide ?
            </h3>
            <p className="text-gray-700 leading-8 mb-8 text-lg">
              Avant d&apos;envoyer, vérifiez toujours l&apos;email avec Hunter Verify ou Snov.io. Si l&apos;email est invalide, essayez un autre format (initiale + nom, prénom seul…) et revérifiez. En dernier recours, tentez de contacter la personne via LinkedIn ou via le formulaire de l&apos;entreprise en mentionnant que vous n&apos;avez pas trouvé ses coordonnées directes.
            </p>

            {/* Retour */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <Link href="/ressources" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
                ← Retour aux ressources
              </Link>
            </div>

          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block sticky top-8 self-start">

            {/* Méta-ligne */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span>Publié le 9 juin 2026</span>
            </div>

            {/* Table des matières */}
            <div className="bg-gray-50 rounded-2xl p-5 ring-1 ring-gray-100 mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sommaire</p>
              <nav className="space-y-2">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm leading-snug text-gray-600 hover:text-violet-600 transition-colors ${
                      item.niveau === 3 ? "pl-3 text-xs" : "font-medium"
                    }`}
                  >
                    {item.titre}
                  </a>
                ))}
              </nav>
            </div>

            {/* Share */}
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
