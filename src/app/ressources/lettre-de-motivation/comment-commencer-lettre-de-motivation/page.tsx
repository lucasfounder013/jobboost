import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Comment commencer une lettre de motivation : exemples et erreurs | JobBoost",
  description:
    "Comment commencer une lettre de motivation sans dire \"je me permets de vous contacter\" ? Voici les formules qui fonctionnent, avec des exemples concrets adaptables.",
  ...ogMeta(
    "Comment commencer une lettre de motivation : exemples et erreurs | JobBoost",
    "Comment commencer une lettre de motivation sans dire \"je me permets de vous contacter\" ? Voici les formules qui fonctionnent, avec des exemples concrets adaptables.",
    "/ressources/lettre-de-motivation/comment-commencer-lettre-de-motivation"
  ),
};

const TOC = [
  { id: "pourquoi-premiere-phrase", titre: "Pourquoi le début pèse autant",          niveau: 2 },
  { id: "angles",                   titre: "Les 4 angles d'attaque",                  niveau: 2 },
  { id: "selon-situation",          titre: "Comment commencer selon votre situation", niveau: 2 },
  { id: "situation-etudiant",       titre: "Étudiant ou premier emploi",              niveau: 3 },
  { id: "situation-stage",          titre: "Stage et alternance",                     niveau: 3 },
  { id: "situation-spontanee",      titre: "Candidature spontanée",                   niveau: 3 },
  { id: "situation-cdi",            titre: "CDI ou changement de poste",              niveau: 3 },
  { id: "situation-reconversion",   titre: "Reconversion professionnelle",            niveau: 3 },
  { id: "accroches-a-eviter",       titre: "Les 7 débuts à éviter",                   niveau: 2 },
  { id: "formule-politesse",        titre: "Madame, Monsieur, ou autre chose ?",      niveau: 2 },
  { id: "tester-accroche",          titre: "Tester si votre accroche fonctionne",     niveau: 2 },
  { id: "faq",                      titre: "FAQ",                                      niveau: 2 },
];

export default function ArticleCommentCommencerLDM() {
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
          <span className="text-gray-600">Comment commencer une lettre de motivation</span>
        </div>

        <ArticleJsonLd
          titre="Comment commencer une lettre de motivation : exemples et erreurs | JobBoost"
          description={'Comment commencer une lettre de motivation sans dire "je me permets de vous contacter" ? Voici les formules qui fonctionnent, avec des exemples concrets adaptables.'}
          slug="/ressources/lettre-de-motivation/comment-commencer-lettre-de-motivation"
          datePublication="2026-06-19"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Lettre de motivation", url: "/ressources" },
            { nom: "Comment commencer une lettre de motivation", url: "/ressources/lettre-de-motivation/comment-commencer-lettre-de-motivation" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Comment commencer une lettre de motivation : exemples et erreurs à éviter
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
              <span>19 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>12 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La première phrase d&apos;une lettre de motivation est lue. Le reste est parcouru. C&apos;est elle qui décide si le recruteur lit la suite ou passe à la candidature suivante.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pourtant, la moitié des lettres reçues en France commencent par la même phrase : &ldquo;Je me permets de vous contacter suite à votre annonce...&rdquo;. Cette phrase confirme ce que le recruteur sait déjà. Elle ne donne aucune raison de continuer.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cet article explique comment commencer une lettre de motivation autrement. Vous y trouverez les 4 angles d&apos;attaque qui fonctionnent, des exemples adaptables selon votre situation, et la liste des débuts de lettre qui éliminent une candidature en 10 secondes.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-premiere-phrase" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi le début d&apos;une lettre de motivation pèse autant
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur passe en moyenne 15 à 30 secondes sur une lettre de motivation. C&apos;est le temps de lire 2 paragraphes, parfois moins. Si la première phrase ne donne aucun signal, le reste n&apos;est pas lu.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La première phrase joue trois rôles en même temps. Elle indique qui vous êtes, ce que vous apportez, et pourquoi vous écrivez à cette entreprise précisément. Trois informations en une à deux phrases. C&apos;est court, et c&apos;est ce qui rend l&apos;exercice difficile.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le bon début lettre de motivation ne décrit pas votre démarche, il pose votre valeur. Pas &ldquo;je postule&rdquo;, mais &ldquo;voici ce que j&apos;apporte&rdquo;. La différence semble fine. À la lecture, elle est immédiate.
            </p>

            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Une première phrase de lettre de motivation a une seule mission : donner envie de lire la deuxième. Si elle dit ce que le recruteur sait déjà, elle a raté.
              </p>
            </blockquote>

            {/* Section 2 : Angles */}
            <h2 id="angles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 4 angles d&apos;attaque pour une première phrase qui marche
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il existe quatre façons de commencer une lettre de motivation qui captent l&apos;attention en moins de 10 secondes. Aucune n&apos;est meilleure que les autres : elles dépendent de votre profil et du poste visé. Vous pouvez d&apos;ailleurs en combiner deux dans une même accroche.
            </p>

            <h3 id="angle-resultat" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 1 : le résultat chiffré
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous ouvrez avec un fait, un chiffre, un résultat. Le recruteur n&apos;a pas besoin de savoir d&apos;où vous venez : il voit ce que vous savez faire. Cet angle marche très bien pour les profils expérimentés qui visent un poste équivalent ou supérieur.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">En 24 mois chez Privateaser, j&apos;ai multiplié par 3 le volume mensuel de demandes traitées sans grossir l&apos;équipe Customer Success. Votre poste de Lead CS s&apos;inscrit exactement dans cette logique.</p>
              <p className="text-gray-800 text-lg leading-8">Sur les 18 derniers mois, j&apos;ai conçu et lancé 4 funnels d&apos;acquisition qui ont représenté 42 % du nouveau chiffre d&apos;affaires de l&apos;agence. C&apos;est ce type d&apos;impact que votre annonce de Growth Manager appelle.</p>
              <p className="text-gray-800 text-lg leading-8">3 ans, 26 commerciaux recrutés et formés, 84 % toujours en poste. C&apos;est le résultat sur lequel je voudrais m&apos;appuyer pour rejoindre votre équipe en tant que Sales Manager.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Quand l&apos;utiliser</strong> : si vous avez 2 ans d&apos;expérience ou plus, et un résultat précis à mettre en avant. À éviter si vous n&apos;avez aucun chiffre fiable, parce que l&apos;effet inverse est immédiat.
            </p>

            <h3 id="angle-entreprise" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 2 : l&apos;observation sur l&apos;entreprise
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous ouvrez en montrant que vous avez compris où en est l&apos;entreprise. Une décision récente, un lancement produit, un recrutement clé, une levée de fonds. Cette accroche prouve dès la première phrase que vous n&apos;envoyez pas la même lettre à 50 entreprises.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Votre passage au modèle freemium en janvier dernier indique un repositionnement vers l&apos;acquisition organique. C&apos;est précisément ce que j&apos;ai piloté chez Spendesk entre 2023 et 2025.</p>
              <p className="text-gray-800 text-lg leading-8">L&apos;arrivée de Camille Roy comme Head of Product et le lancement de votre API publique en mars laissent deviner une bascule vers le mid-market. C&apos;est ce moment précis que je cherche dans mon prochain poste.</p>
              <p className="text-gray-800 text-lg leading-8">Votre ouverture du bureau de Madrid en avril et la nomination de Lucia Fernández signalent un investissement sérieux sur l&apos;Espagne. Je suis bilingue espagnol et j&apos;ai construit l&apos;équipe support ibérique chez Qonto entre 2022 et 2024.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Quand l&apos;utiliser</strong> : à peu près tout le temps, surtout pour les candidatures spontanées et les postes stratégiques. L&apos;observation doit être réelle. Une généralité (&ldquo;votre entreprise est leader sur son marché&rdquo;) tue cette accroche.
            </p>

            <h3 id="angle-miroir" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 3 : la mise en miroir besoin/profil
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous reformulez le besoin du poste tel qu&apos;il transparaît dans l&apos;annonce, puis vous montrez en une ligne pourquoi vous correspondez. Cet angle est très efficace quand l&apos;offre est bien écrite et qu&apos;on peut en extraire un défi clair.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Votre annonce pour un Chef de Projet appelle quelqu&apos;un capable de tenir 5 chantiers en parallèle sans glissement de planning. C&apos;est ma quotidienne depuis 3 ans chez Doctolib.</p>
              <p className="text-gray-800 text-lg leading-8">Vous cherchez un Marketing Manager capable de structurer une équipe de 4 personnes tout en gardant la main sur la stratégie d&apos;acquisition. C&apos;est exactement la configuration dans laquelle j&apos;évolue chez Payfit depuis 2024.</p>
              <p className="text-gray-800 text-lg leading-8">Votre offre cite la mise en place d&apos;un parcours d&apos;onboarding client de bout en bout comme priorité du poste. C&apos;est le projet sur lequel j&apos;ai passé les 14 derniers mois chez Aircall.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Quand l&apos;utiliser</strong> : pour répondre à une offre claire. À éviter quand l&apos;annonce est vague, ou pour une candidature spontanée (puisqu&apos;il n&apos;y a pas de besoin formulé à reformuler).
            </p>

            <h3 id="angle-personnel" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 4 : l&apos;angle personnel assumé
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous prenez de front une particularité de votre parcours : un titre inhabituel, une transition, un trou apparent, un parcours non-linéaire. Vous transformez ce qui pourrait être un frein en preuve de cohérence.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Je n&apos;ai jamais eu de poste appelé &ldquo;Chief of Staff&rdquo;. Pourtant, c&apos;est exactement ce que j&apos;ai fait pendant 2 ans en tant que coordinatrice projet chez Backmarket, auprès du COO.</p>
              <p className="text-gray-800 text-lg leading-8">Ce que vous appelez &ldquo;Data Analyst&rdquo; dans votre annonce s&apos;appelait &ldquo;analyste métier&rdquo; dans mon ancienne entreprise. Le contenu était le même : SQL, Looker, dashboards opérationnels, restitution mensuelle au CODIR.</p>
              <p className="text-gray-800 text-lg leading-8">À 38 ans, j&apos;ai quitté un poste de manager retail pour suivre une formation OpenClassrooms en data analyse. Je vous écris pour intégrer votre équipe Data en tant que junior, avec 12 ans d&apos;expérience opérationnelle en arrière-plan.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              <strong>Quand l&apos;utiliser</strong> : reconversion, parcours atypique, candidature pour un titre que vous n&apos;avez jamais porté officiellement. Cet angle exige une suite solide, parce que la première phrase pose une question à laquelle il faut répondre.
            </p>

            {/* Section 3 : Selon situation */}
            <h2 id="selon-situation" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment commencer selon votre situation
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici comment décliner les 4 angles précédents selon votre situation. Pour chaque cas, trois accroches adaptables, à reprendre en remplaçant les champs entre crochets.
            </p>

            <h3 id="situation-etudiant" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Étudiant ou premier emploi
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Sans expérience professionnelle longue, les leviers à utiliser sont les projets scolaires, l&apos;associatif, les jobs étudiants, et le diplôme préparé. Le piège : commencer par &ldquo;Étudiant en...&rdquo; suivi du parcours détaillé. C&apos;est ce que tout le monde fait.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples adaptables</p>
              <p className="text-gray-800 text-lg leading-8">En tant que rédactrice en chef du journal de l&apos;[ÉCOLE] pendant un an, j&apos;ai coordonné 12 contributeurs et publié 24 articles longs. C&apos;est ce type d&apos;organisation que votre poste de Content Manager Junior demande.</p>
              <p className="text-gray-800 text-lg leading-8">Pendant ma licence d&apos;économie à [UNIVERSITÉ], j&apos;ai animé un atelier hebdomadaire d&apos;éducation financière pour 60 lycéens. Je viens chercher la même mission, à plus grande échelle, chez [ENTREPRISE].</p>
              <p className="text-gray-800 text-lg leading-8">Diplômée d&apos;un Master Finance en juin 2026, je vise un premier poste en banque d&apos;investissement. Votre équipe M&amp;A Mid-Cap est celle qui m&apos;a fait choisir cette voie pendant un cas pratique en 2024.</p>
            </div>

            <h3 id="situation-stage" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Stage et alternance
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un stage ou une alternance, le recruteur veut savoir trois choses très vite : le diplôme préparé, le rythme, et ce que vous savez déjà faire. Une bonne accroche en couvre au moins deux.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples adaptables</p>
              <p className="text-gray-800 text-lg leading-8">Je viens d&apos;achever un projet de classe sur l&apos;optimisation du tunnel de conversion d&apos;un site e-commerce, qui m&apos;a appris à structurer un A/B test propre. J&apos;aimerais le mettre en pratique pendant 6 mois chez [ENTREPRISE].</p>
              <p className="text-gray-800 text-lg leading-8">Étudiant en deuxième année d&apos;école d&apos;ingénieur à [ÉCOLE], je cherche un stage de 6 mois en R&amp;D microélectronique. Votre équipe sur les capteurs MEMS, primée au CES 2026, est la première à laquelle j&apos;ai pensé.</p>
              <p className="text-gray-800 text-lg leading-8">En première année de BUT MMI à [VILLE], je code en JavaScript et React tous les soirs depuis 18 mois. Je viens chercher une alternance qui transforme ce travail personnel en pratique professionnelle.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous trouverez d&apos;ailleurs un{" "}
              <Link href="/ressources/lettre-de-motivation/exemple-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                modèle de lettre de motivation complet pour un stage
              </Link>
              {" "}avec la suite des paragraphes.
            </p>

            <h3 id="situation-spontanee" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Candidature spontanée
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour une candidature spontanée, l&apos;accroche doit faire un travail supplémentaire : justifier pourquoi vous écrivez sans qu&apos;une offre soit publiée. L&apos;angle entreprise est presque toujours le bon choix.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples adaptables</p>
              <p className="text-gray-800 text-lg leading-8">Vous venez de recruter 4 développeurs back-end en deux mois sans annoncer de poste de Tech Lead. Je vous écris parce que c&apos;est exactement la mission que je cherche, après 7 ans chez Doctolib.</p>
              <p className="text-gray-800 text-lg leading-8">L&apos;ouverture de votre bureau à Madrid et la nomination de Lucia Fernández comme Country Manager indiquent un investissement sérieux sur l&apos;Espagne. Je suis bilingue espagnol et j&apos;ai construit l&apos;équipe support ibérique chez Qonto entre 2022 et 2024.</p>
              <p className="text-gray-800 text-lg leading-8">Bonjour [Prénom], votre prise de parole sur LinkedIn en mai dernier sur la place du Customer Education dans le SaaS résume précisément ma conviction. Je vous écris parce que je pense pouvoir construire cette fonction chez [ENTREPRISE].</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour ce type de candidature, l&apos;accroche est presque inutile si l&apos;email n&apos;arrive pas au bon recruteur. Notre guide pour{" "}
              <Link href="/ressources/candidature-spontanee/trouver-email-recruteur" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                trouver l&apos;email d&apos;un recruteur
              </Link>
              {" "}évite la corbeille des adresses contact@.
            </p>

            <h3 id="situation-cdi" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              CDI ou changement de poste
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En changement de poste, l&apos;enjeu de l&apos;accroche est de signaler immédiatement votre niveau d&apos;expérience pertinent. L&apos;angle du résultat chiffré et l&apos;angle miroir besoin/profil fonctionnent particulièrement bien ici.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples adaptables</p>
              <p className="text-gray-800 text-lg leading-8">Votre poste de Sales Manager appelle un profil capable d&apos;encadrer une équipe de 5 SDR tout en gardant un quota individuel. C&apos;est la configuration dans laquelle j&apos;évolue depuis 2 ans, et je m&apos;y sens à ma place.</p>
              <p className="text-gray-800 text-lg leading-8">Sur les 18 derniers mois chez Pennylane, j&apos;ai recruté, formé et fait monter en compétence 3 Customer Success Managers qui gèrent aujourd&apos;hui un portefeuille de 800 clients. C&apos;est ce type de mission que j&apos;aimerais reproduire chez [ENTREPRISE].</p>
              <p className="text-gray-800 text-lg leading-8">Votre récente levée de série C et l&apos;arrivée d&apos;Adrien Charpentier au poste de Chief Revenue Officer signalent une phase de structuration de l&apos;équipe sales. C&apos;est précisément à ce moment de l&apos;histoire d&apos;une entreprise que je sais le mieux contribuer.</p>
            </div>

            <h3 id="situation-reconversion" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Reconversion professionnelle
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En reconversion, la première phrase doit faire l&apos;inverse de ce qu&apos;on croit : ne pas justifier la reconversion, mais prouver qu&apos;elle est déjà en cours, voire avancée. L&apos;angle personnel assumé est presque obligatoire.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples adaptables</p>
              <p className="text-gray-800 text-lg leading-8">Après 9 ans en gestion de projet dans le bâtiment, j&apos;ai repris une formation de UX Designer en 2025. Six mois plus tard, j&apos;ai conçu et testé 4 prototypes en autonomie. Je vous écris pour intégrer votre équipe produit en junior.</p>
              <p className="text-gray-800 text-lg leading-8">Je n&apos;ai pas la trajectoire classique d&apos;un futur Product Manager : j&apos;ai 11 ans de conseil en stratégie chez Bain. C&apos;est précisément pour cette raison que j&apos;aimerais discuter du poste avec vous.</p>
              <p className="text-gray-800 text-lg leading-8">À 42 ans, j&apos;ai quitté un poste de directrice marketing pour suivre une formation OpenClassrooms en data analyse. Je peux désormais traiter, modéliser et présenter des données en autonomie. Votre poste de Data Analyst Junior est ma cible n°1.</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin, consultez le guide{" "}
              <Link href="/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                lettre de motivation reconversion professionnelle
              </Link>
              {" "}qui détaille la suite des paragraphes.
            </p>

            {/* Section 4 : Erreurs */}
            <h2 id="accroches-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 7 débuts de lettre qui éliminent une candidature
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces 7 ouvertures sont les plus fréquentes, et toutes envoient le même signal au recruteur : lettre standardisée, pas d&apos;effort, pas de personnalisation. Pour chacune, voici une reformulation directe à reprendre.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">1. La formule administrative</p>
              <p className="text-gray-500 line-through text-lg">Je me permets de vous contacter suite à votre annonce publiée sur Indeed pour le poste de Chargé de Communication.</p>
              <p className="text-gray-800 font-medium text-lg">Votre annonce pour le poste de Chargé de Communication appelle quelqu&apos;un capable de produire des contenus à un rythme hebdomadaire sans pré-validation lourde. C&apos;est mon quotidien chez [ENTREPRISE] depuis 18 mois.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">2. Le statut passif</p>
              <p className="text-gray-500 line-through text-lg">Actuellement à la recherche d&apos;un emploi dans le secteur du marketing, je vous adresse ma candidature.</p>
              <p className="text-gray-800 font-medium text-lg">Sur les 12 derniers mois, j&apos;ai piloté 3 lancements produits qui ont généré 1,1 M€ de chiffre d&apos;affaires additionnel. C&apos;est ce type d&apos;impact que votre annonce de Product Marketing Manager appelle.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">3. La passion non prouvée</p>
              <p className="text-gray-500 line-through text-lg">Passionné depuis toujours par le marketing digital, je souhaite mettre mes compétences au service de votre entreprise.</p>
              <p className="text-gray-800 font-medium text-lg">Sur le segment SaaS B2B, j&apos;ai construit deux fois en 4 ans une équipe d&apos;acquisition de zéro. C&apos;est le travail que je voudrais refaire chez vous.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">4. Le CV en prose</p>
              <p className="text-gray-500 line-through text-lg">Diplômé d&apos;une licence en marketing, j&apos;ai ensuite occupé un poste d&apos;assistant marketing pendant 2 ans avant de devenir chef de produit junior.</p>
              <p className="text-gray-800 font-medium text-lg">Mon expérience en gestion de catalogue produit chez [ENTREPRISE ACTUELLE] m&apos;a appris à arbitrer entre marge et rotation, un sujet central dans votre annonce.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">5. La flatterie générale</p>
              <p className="text-gray-500 line-through text-lg">Votre entreprise est un leader reconnu dans son secteur, et ses valeurs correspondent parfaitement à mes aspirations professionnelles.</p>
              <p className="text-gray-800 font-medium text-lg">Votre lancement de l&apos;offre Pro en avril, suivi de l&apos;arrivée de [NOM] comme Head of Product, indique une bascule vers le mid-market. C&apos;est précisément le mouvement sur lequel j&apos;aimerais contribuer.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">6. La phrase vide</p>
              <p className="text-gray-500 line-through text-lg">C&apos;est avec un grand intérêt que je vous adresse ma candidature au poste de Responsable Logistique au sein de votre entreprise.</p>
              <p className="text-gray-800 font-medium text-lg">Votre poste de Responsable Logistique appelle quelqu&apos;un capable de tenir 3 entrepôts simultanément en pleine restructuration. C&apos;est exactement ce que j&apos;ai fait chez Cdiscount en 2024.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">7. Le redondant</p>
              <p className="text-gray-500 line-through text-lg">Bonjour, je vous écris aujourd&apos;hui pour vous proposer ma candidature au poste de Développeur Front-end.</p>
              <p className="text-gray-800 font-medium text-lg">Votre stack Next.js, Tailwind et TypeScript correspond exactement aux outils que j&apos;utilise au quotidien depuis 2 ans. Votre poste de Développeur Front-end est le premier que je vois affiché avec cette stack précise.</p>
            </div>

            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Si votre première phrase fonctionne pour 10 entreprises différentes, elle ne fonctionne pour aucune. Un recruteur reconnaît une formule générique dès les 5 premiers mots.
              </p>
            </blockquote>

            {/* Section 5 : Politesse */}
            <h2 id="formule-politesse" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Madame, Monsieur, ou autre chose ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La formule de politesse précède l&apos;accroche, mais elle envoie aussi un signal. Voici comment choisir.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>&ldquo;Madame, Monsieur,&rdquo;</strong> : par défaut quand le recruteur n&apos;est pas identifié, ou pour les grands groupes et la fonction publique. C&apos;est neutre et correct.</li>
              <li><strong>&ldquo;Madame Dupont,&rdquo;</strong> ou <strong>&ldquo;Monsieur Dupont,&rdquo;</strong> : dès que vous avez identifié le recruteur, en contexte formel (cabinet d&apos;avocats, banque, conseil).</li>
              <li><strong>&ldquo;Bonjour Camille,&rdquo;</strong> : en tech, startup, scale-up, agence, quand le recruteur est identifié. Le ton est plus humain et c&apos;est attendu dans ces environnements.</li>
              <li><strong>À éviter</strong> : &ldquo;Mesdames, Messieurs,&rdquo; (vieilli), &ldquo;Cher Monsieur,&rdquo; (intrusif), &ldquo;À qui de droit,&rdquo; (signale qu&apos;on n&apos;a pas fait l&apos;effort de chercher).</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans le doute, &ldquo;Madame, Monsieur&rdquo; passe partout. Le pire n&apos;est pas la formule choisie, c&apos;est de se tromper de nom : commencer par &ldquo;Madame Dupont&rdquo; alors que le recruteur s&apos;appelle Monsieur Dupond élimine la candidature en deux secondes.
            </p>

            {/* Section 6 : Tester */}
            <h2 id="tester-accroche" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment tester si votre première phrase fonctionne
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant d&apos;envoyer, trois tests rapides pour vérifier que votre accroche tient debout.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Test 1 : le test du tweet
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre première phrase tient-elle seule, comprise sans le reste de la lettre, en moins de 280 caractères ? Si oui, elle marche. Si elle a besoin du paragraphe suivant pour avoir un sens, elle est trop vague ou trop longue.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Test 2 : le test du concurrent
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Remplacez mentalement le nom de l&apos;entreprise par celui d&apos;un concurrent direct. Si la phrase fonctionne toujours sans changement, elle est générique. Une bonne accroche est rendue impossible par le simple changement de nom d&apos;entreprise.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Test 3 : le test du recruteur fatigué
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Imaginez un recruteur à 17h, qui a lu 30 lettres dans la journée. Est-ce que la vôtre se distingue dans les 2 premières secondes ? Lisez votre accroche à voix haute, à un proche, sans contexte. Sa première réaction vous dit tout.
            </p>

            {/* Section 7 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Quelle est la longueur idéale pour une première phrase de lettre de motivation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Entre 15 et 30 mots. C&apos;est ce que l&apos;œil capte en une fixation. Au-delà, l&apos;effet d&apos;accroche se dilue. En dessous, vous manquez de matière pour poser à la fois votre valeur et votre cible.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on commencer par une citation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Risqué. Si la citation est célèbre, elle vous fait passer pour quelqu&apos;un qui se réfugie derrière les autres. Si elle est obscure, le recruteur perd 5 secondes à la comprendre, qu&apos;il n&apos;a pas. À éviter dans 95 % des cas. La seule exception : poste créatif, agence, secteur culturel, et une citation directement reliée au sujet du poste.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on commencer par une question ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, à condition qu&apos;elle vise un point précis. &ldquo;Comment former 200 commerciaux sans budget formation ?&rdquo; marche si l&apos;entreprise vient de le faire et que vous avez la réponse. &ldquo;Pourquoi votre entreprise m&apos;attire-t-elle ?&rdquo; ne marche pas, parce que c&apos;est une question rhétorique vide. Si la question pourrait être posée à n&apos;importe quel candidat, elle ne marche pas.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il vraiment adapter la première phrase à chaque candidature ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, systématiquement. C&apos;est la phrase la plus visible de votre lettre. Un recruteur qui voit la même accroche que celle reçue d&apos;un autre candidat la semaine précédente classe immédiatement la lettre dans la pile &ldquo;copie collée&rdquo;. Comptez 5 minutes pour réécrire l&apos;accroche à chaque candidature sérieuse.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment commencer un email de candidature plutôt qu&apos;une lettre formelle ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;email remplace de plus en plus la lettre formelle, surtout en tech et en startup. La structure d&apos;ouverture change : &ldquo;Bonjour [Prénom],&rdquo;, suivi d&apos;une phrase d&apos;accroche identique à celle qu&apos;on mettrait dans une lettre. La différence : l&apos;email est plus court, 3 ou 4 paragraphes au total, avec un lien direct vers le CV et éventuellement la lettre complète en pièce jointe.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on utiliser ChatGPT pour rédiger la première phrase ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour brainstormer des angles, oui. Pour livrer la phrase finale, non. Les premières phrases générées par IA sont reconnaissables : elles sonnent propre, neutre, vide. Un recruteur en lit suffisamment pour les détecter. Utilisez l&apos;IA pour explorer 5 angles différents, puis réécrivez à la main la version qui parle de vous.
            </p>

            {/* Section 8 : CTA */}
            <h2 id="cta" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Une bonne accroche s&apos;appuie sur une candidature cohérente
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les premières phrases qui marchent ont toutes un point commun : elles reprennent le vocabulaire exact de l&apos;offre d&apos;emploi. C&apos;est ce qui crée l&apos;effet de précision et de connexion.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse gratuitement la correspondance entre votre CV et une offre, et identifie les mots-clés à reprendre. Ces termes sont la matière première de votre accroche. Vous trouverez aussi nos{" "}
              <Link href="/ressources/lettre-de-motivation/exemple-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                5 modèles de lettre de motivation
              </Link>
              {" "}et la{" "}
              <Link href="/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                méthode complète en 4 étapes
              </Link>
              {" "}pour construire la suite.
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
