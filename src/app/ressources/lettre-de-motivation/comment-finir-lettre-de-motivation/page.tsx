import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Comment finir une lettre de motivation : exemples et formules | Rivjob",
  description:
    "Comment finir une lettre de motivation efficacement ? Formules de politesse, phrases de conclusion, erreurs à éviter : voici ce qui fonctionne vraiment.",
  ...ogMeta(
    "Comment finir une lettre de motivation : exemples et formules | Rivjob",
    "Comment finir une lettre de motivation efficacement ? Formules de politesse, phrases de conclusion, erreurs à éviter : voici ce qui fonctionne vraiment.",
    "/ressources/lettre-de-motivation/comment-finir-lettre-de-motivation"
  ),
};

const TOC = [
  { id: "pourquoi-la-fin",      titre: "Pourquoi la fin pèse autant",              niveau: 2 },
  { id: "anatomie-fin",         titre: "L'anatomie d'une bonne conclusion",        niveau: 2 },
  { id: "angles-cta",           titre: "Les 5 angles pour un appel à l'action",    niveau: 2 },
  { id: "selon-situation",      titre: "Comment finir selon votre situation",      niveau: 2 },
  { id: "fin-etudiant",         titre: "Étudiant ou premier emploi",               niveau: 3 },
  { id: "fin-stage",            titre: "Stage et alternance",                       niveau: 3 },
  { id: "fin-spontanee",        titre: "Candidature spontanée",                     niveau: 3 },
  { id: "fin-cdi",              titre: "CDI ou changement de poste",                niveau: 3 },
  { id: "fin-reconversion",     titre: "Reconversion professionnelle",              niveau: 3 },
  { id: "formules-politesse",   titre: "Quelle formule de politesse choisir ?",    niveau: 2 },
  { id: "email-vs-lettre",      titre: "Email vs lettre formelle",                  niveau: 2 },
  { id: "erreurs",              titre: "Les 6 erreurs à éviter",                    niveau: 2 },
  { id: "faq",                  titre: "FAQ",                                        niveau: 2 },
];

export default function ArticleCommentFinirLDM() {
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
          <span className="text-gray-600">Comment finir une lettre de motivation</span>
        </div>

        <ArticleJsonLd
          titre="Comment finir une lettre de motivation : exemples et formules | Rivjob"
          description="Comment finir une lettre de motivation efficacement ? Formules de politesse, phrases de conclusion, erreurs à éviter : voici ce qui fonctionne vraiment."
          slug="/ressources/lettre-de-motivation/comment-finir-lettre-de-motivation"
          datePublication="2026-06-19"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Lettre de motivation", url: "/ressources" },
            { nom: "Comment finir une lettre de motivation", url: "/ressources/lettre-de-motivation/comment-finir-lettre-de-motivation" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Comment finir une lettre de motivation : exemples et formules
        </h1>

        {/* Grille article + TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16 lg:items-start">

          {/* Colonne article */}
          <article>

            {/* Méta-ligne */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-10 pb-10 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-extrabold">LL</span>
              </div>
              <span className="font-medium text-gray-700">Lucas L.</span>
              <a
                href="https://www.linkedin.com/in/lucas-le-donn%C3%A9-71a8682a7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Lucas le Donné"
                className="text-gray-400 hover:text-[#0a66c2] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <span className="text-gray-300">|</span>
              <span>19 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>12 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La fin d&apos;une lettre de motivation est ce que le recruteur lit en dernier. C&apos;est aussi ce qu&apos;il retient. Une bonne conclusion ne se contente pas d&apos;une formule de politesse correcte : elle déclenche le rappel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pourtant, neuf lettres sur dix se terminent par la même phrase : &ldquo;Veuillez agréer, Madame, Monsieur, l&apos;expression de mes sentiments distingués.&rdquo; Cette formule n&apos;est pas fausse. Elle est invisible. Elle ne donne aucune raison de rappeler.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cet article explique comment finir une lettre de motivation autrement. Vous y trouverez l&apos;anatomie d&apos;une conclusion efficace, 5 angles pour un appel à l&apos;action concret, des exemples adaptables selon votre situation, et la liste des fins de lettre qui éteignent une candidature pourtant prometteuse.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-la-fin" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi la fin d&apos;une lettre de motivation décide souvent du rappel
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En psychologie de la lecture, on appelle ça l&apos;effet de récence : les derniers mots lus sont les plus présents quand le recruteur ferme le document. La conclusion lettre de motivation est donc la dernière trace que vous laissez avant la décision &ldquo;je rappelle&rdquo; ou &ldquo;je passe au suivant&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Concrètement, la fin doit faire deux choses. Donner envie d&apos;agir : un appel, un rendez-vous, une question. Et signaler que vous êtes professionnel : une formule de politesse adaptée, propre, sans faute. Les deux blocs sont indissociables, mais ils ne servent pas la même fonction.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une lettre qui se termine par une attente passive (&ldquo;dans l&apos;attente d&apos;une réponse de votre part&rdquo;) renvoie le contrôle au recruteur, qui n&apos;a aucune raison d&apos;agir vite. Une lettre qui termine par une proposition concrète (&ldquo;je peux organiser un appel mardi en fin de journée&rdquo;) lui mâche le travail.
            </p>

            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Une conclusion qui dit &ldquo;dans l&apos;attente de votre réponse&rdquo; laisse le recruteur seul face à sa décision. Une conclusion qui dit &ldquo;je suis disponible mardi 14h&rdquo; lui propose un point précis à valider ou à déplacer. La deuxième a 10 fois plus de chances d&apos;obtenir une réponse.
              </p>
            </blockquote>

            {/* Section 2 : Anatomie */}
            <h2 id="anatomie-fin" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              L&apos;anatomie d&apos;une bonne conclusion : 2 blocs, pas un
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La plupart des conseils en ligne mélangent deux choses qu&apos;il faut séparer : l&apos;appel à l&apos;action et la formule de politesse. Ce sont deux blocs distincts, avec deux fonctions différentes. Les distinguer simplifie l&apos;écriture et permet d&apos;adapter chaque morceau séparément au contexte.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Bloc 1 : l&apos;appel à l&apos;action
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est la phrase qui propose la suite. Elle dit ce que vous attendez (un échange, un appel, un entretien), quand vous êtes disponible, et éventuellement comment faciliter la prochaine étape. C&apos;est ici que se joue le rappel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une bonne formule d&apos;appel à l&apos;action tient en 1 à 2 phrases, 20 à 35 mots. Elle est active, datée si possible, et orientée vers la prochaine étape concrète.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Bloc 2 : la formule de politesse
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est la signature de la lettre. Elle n&apos;ajoute aucune information : elle confirme votre niveau de formalité et marque la fin du document. Sa fonction est défensive : une mauvaise formule peut éliminer une candidature, une bonne formule passe inaperçue.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est précisément pour cette raison qu&apos;il faut séparer les deux. L&apos;appel à l&apos;action est ce qui distingue votre lettre. La formule de politesse lettre de motivation est ce qui la rend recevable. Travailler les deux séparément évite d&apos;en sacrifier un au profit de l&apos;autre.
            </p>

            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour mieux comprendre comment cette fin s&apos;articule avec le reste, consultez notre guide sur{" "}
              <Link href="/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                la méthode complète en 4 étapes
              </Link>
              .
            </p>

            {/* Section 3 : 5 angles CTA */}
            <h2 id="angles-cta" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 5 angles pour un appel à l&apos;action qui fait répondre
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici cinq façons d&apos;ouvrir explicitement la prochaine étape. Aucune n&apos;est meilleure dans l&apos;absolu : elles dépendent de votre profil, de votre situation, et de la culture de l&apos;entreprise.
            </p>

            <h3 id="angle-proposition" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 1 : la proposition d&apos;échange concrète
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous proposez explicitement un format d&apos;échange court. Le format réduit la friction : un appel de 20 minutes engage moins qu&apos;un entretien d&apos;une heure.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Je serais ravi de discuter de ce poste lors d&apos;un échange de 20 minutes. Je suis disponible mardi et jeudi en fin de journée, ou sur le créneau qui vous convient.</p>
              <p className="text-gray-800 text-lg leading-8">Je vous propose un appel cette semaine ou la suivante pour échanger sur la façon dont mon expérience peut contribuer à vos objectifs 2026.</p>
              <p className="text-gray-800 text-lg leading-8">Je peux passer dans vos bureaux la semaine prochaine, ou nous voir en visio sur un format plus court à votre convenance.</p>
            </div>

            <h3 id="angle-disponibilite" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 2 : la disponibilité datée
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous donnez des dates précises. Cela évite le ping-pong &ldquo;quand êtes-vous disponible ?&rdquo; et signale que vous êtes prêt à démarrer.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Disponible immédiatement, je peux démarrer dès le 1er septembre 2026. Je reste à votre disposition pour un entretien dans les prochaines semaines.</p>
              <p className="text-gray-800 text-lg leading-8">Je termine mon contrat actuel le 15 juin et serais opérationnel sur le poste à partir du 1er juillet. Entre temps, je peux échanger à toute heure.</p>
              <p className="text-gray-800 text-lg leading-8">Mes vacances universitaires me laissent une totale disponibilité jusqu&apos;au 25 août pour un entretien, en présentiel à Paris ou en visio.</p>
            </div>

            <h3 id="angle-prochaine-etape" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 3 : la prochaine étape proposée
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous facilitez la suite en proposant un document complémentaire, une démo, un portfolio. Le recruteur n&apos;a plus à demander : il a tout sous la main.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Je peux vous transmettre sur demande un dossier détaillé de mes 5 dernières missions, qui illustre concrètement les sujets évoqués ci-dessus.</p>
              <p className="text-gray-800 text-lg leading-8">Une démo de l&apos;outil que j&apos;ai construit chez [ENTREPRISE ACTUELLE] est en ligne ici : [LIEN]. Je serais heureux d&apos;en discuter avec vous.</p>
              <p className="text-gray-800 text-lg leading-8">Mon portfolio (lien en haut de la lettre) regroupe les 3 projets décrits. Nous pouvons en parler en détail lors d&apos;un entretien.</p>
            </div>

            <h3 id="angle-valeur" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 4 : la valeur additionnelle proposée
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous glissez une compétence ou une perspective non évoquée dans le corps, qui peut intéresser le recruteur au-delà du poste. C&apos;est une façon élégante d&apos;ouvrir la conversation.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">En complément de ce poste, je peux apporter un regard structuré sur la formation interne de l&apos;équipe, un sujet sur lequel j&apos;ai construit deux dispositifs en 2024 et 2025.</p>
              <p className="text-gray-800 text-lg leading-8">Je connais bien votre principal concurrent [ENTREPRISE X] : j&apos;y ai travaillé deux ans avant de rejoindre [ENTREPRISE ACTUELLE]. Cette double perspective peut vous être utile dès les premiers échanges.</p>
              <p className="text-gray-800 text-lg leading-8">Mon réseau au sein du secteur me permet de mobiliser rapidement quelques contacts utiles pour vos premiers grands comptes cibles.</p>
            </div>

            <h3 id="angle-question" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Angle 5 : la question ouverte
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous posez une question stratégique sur le poste, qui invite naturellement à un échange. Cet angle marche bien sur les postes de management et les contextes peu cadrés.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 exemples</p>
              <p className="text-gray-800 text-lg leading-8">Avez-vous prévu de structurer la fonction Marketing en interne ou de continuer avec un mix freelance ? C&apos;est un point qui orienterait beaucoup la discussion lors d&apos;un entretien.</p>
              <p className="text-gray-800 text-lg leading-8">Je serais curieux de comprendre la trajectoire que vous donnez à l&apos;équipe Data sur les 18 prochains mois. Pouvons-nous en parler lors d&apos;un échange ?</p>
              <p className="text-gray-800 text-lg leading-8">À quoi ressemble un mois type pour ce poste de Head of Customer Success ? Je peux organiser ma réponse à cette question en début d&apos;entretien.</p>
            </div>

            {/* Section 4 : Situations */}
            <h2 id="selon-situation" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment finir selon votre situation
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici cinq déclinaisons concrètes, formule de politesse comprise. Chaque exemple est adaptable en remplaçant les champs entre crochets.
            </p>

            <h3 id="fin-etudiant" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Étudiant ou premier emploi
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En première candidature, la disponibilité concrète est votre meilleur atout. Les recruteurs savent que vous démarrez : montrez que vous êtes mobilisable rapidement.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 conclusions adaptables</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je serais ravi de vous présenter mes projets de classe en entretien. Je suis disponible tous les soirs à partir de 18h et le mercredi après-midi.

Cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Mes vacances scolaires m'ouvrent une disponibilité totale du 25 juin au 30 août. Je serais heureux d'échanger avec vous sur ce poste à votre convenance.

Bien cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Diplômée en juin 2026, je suis disponible immédiatement pour un entretien et pour un démarrage en juillet. Je reste à votre écoute pour la suite.

Cordialement,
[Prénom NOM]`}</p>
            </div>

            <h3 id="fin-stage" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Stage et alternance
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour un stage ou une alternance, le recruteur a souvent une contrainte de calendrier scolaire à comprendre. Soyez explicite sur les dates, le rythme, et la convention.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 conclusions adaptables</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je peux me déplacer à Lyon en semaine pour un entretien, ou échanger en visio si cela vous convient mieux. Disponible dès cette semaine.

Cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Mon école valide les conventions de stage sous 5 jours ouvrés. Je peux donc démarrer aussi vite que vous le souhaitez.

Bien cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Mon rythme d'alternance débute le 15 septembre 2026, à raison de 3 jours en entreprise et 2 à l'école. Je suis libre pour un entretien dès cette semaine.

Cordialement,
[Prénom NOM]`}</p>
            </div>

            <h3 id="fin-spontanee" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Candidature spontanée
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Sans poste ouvert, la fin doit baisser la barrière. Un appel court, une fenêtre d&apos;attente, ou un suivi proposé fonctionnent mieux qu&apos;une demande d&apos;entretien formel.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 conclusions adaptables</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Aucun poste n'est ouvert publiquement aujourd'hui, et c'est précisément pour cela que je vous écris. Si ce profil peut vous intéresser, un appel de 15 minutes peut être utile à vous comme à moi.

Bien cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je sais que ce type de candidature arrive en dehors de votre calendrier de recrutement. Je peux attendre votre fenêtre si ce profil vous parle.

Bien cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Si vous ne recrutez pas ce profil aujourd'hui mais l'envisagez à moyen terme, je serais heureux de garder le contact. À votre convenance, je peux vous recontacter dans 3 mois.

Cordialement,
[Prénom NOM]`}</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour identifier le bon destinataire d&apos;une candidature spontanée, consultez aussi notre guide pour{" "}
              <Link href="/ressources/candidature-spontanee/trouver-email-recruteur" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                trouver l&apos;email d&apos;un recruteur
              </Link>
              .
            </p>

            <h3 id="fin-cdi" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              CDI ou changement de poste
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En poste, la contrainte est l&apos;agenda et le préavis. Soyez clair sur les deux dès la conclusion : cela évite des allers-retours plus tard.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 conclusions adaptables</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je suis en poste, donc disponible pour un entretien en visio sur l'heure du déjeuner ou en fin de journée. Mon préavis est de 3 mois.

Bien cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je peux vous proposer un appel de 20 minutes cette semaine pour échanger sur le contexte du poste avant un éventuel entretien formel.

Cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je suis disponible immédiatement, et mon précédent employeur peut servir de référence sur l'ensemble des points évoqués ici.

Bien cordialement,
[Prénom NOM]`}</p>
            </div>

            <h3 id="fin-reconversion" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Reconversion professionnelle
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En reconversion, la conclusion doit prouver que vous avez un dossier solide derrière la lettre. Portfolio, références doublées, projets en autonomie : tout ce qui rassure sur la crédibilité technique.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">3 conclusions adaptables</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Mon portfolio des 4 projets réalisés en formation est accessible ici : [LIEN]. Je serais heureux de vous présenter le code et les décisions techniques prises sur chacun.

Bien cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je peux mobiliser deux références : mon ancien manager qui valide la qualité de mon travail opérationnel, et le directeur de ma formation qui atteste de mes compétences techniques acquises.

Cordialement,
[Prénom NOM]`}</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Mon passage du salariat à la formation a été planifié et financé sur mes fonds propres, signe que ce changement n'est pas opportuniste. Je serais ravi d'en discuter en entretien.

Bien cordialement,
[Prénom NOM]`}</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin, consultez le guide{" "}
              <Link href="/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                lettre de motivation reconversion professionnelle
              </Link>
              .
            </p>

            {/* Section 5 : Formules politesse */}
            <h2 id="formules-politesse" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Madame Monsieur, Cordialement ou Bien à vous : quelle formule de politesse choisir ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La formule de politesse lettre de motivation se choisit selon trois critères : le niveau de formalité de l&apos;entreprise, le canal d&apos;envoi (mail ou PDF), et si vous connaissez le nom du destinataire.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Niveau formel
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Banque, cabinet d&apos;avocats, fonction publique, grands groupes traditionnels, secteur académique : on attend une formule complète.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-3">
              <p className="text-gray-800 text-lg leading-8">&ldquo;Je vous prie d&apos;agréer, Madame, Monsieur, mes salutations distinguées.&rdquo;</p>
              <p className="text-gray-800 text-lg leading-8">&ldquo;Veuillez recevoir, Madame, Monsieur, mes sincères salutations.&rdquo;</p>
              <p className="text-gray-800 text-lg leading-8">&ldquo;Je vous prie de recevoir, Madame, Monsieur, l&apos;expression de mes salutations respectueuses.&rdquo;</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Niveau standard
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La plupart des entreprises moyennes, PME, ETI, contextes professionnels classiques. C&apos;est le niveau par défaut quand vous hésitez.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-3">
              <p className="text-gray-800 text-lg leading-8">&ldquo;Cordialement,&rdquo;</p>
              <p className="text-gray-800 text-lg leading-8">&ldquo;Bien cordialement,&rdquo;</p>
              <p className="text-gray-800 text-lg leading-8">&ldquo;Sincères salutations,&rdquo;</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Niveau direct
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tech, startup, scale-up, agence, secteur créatif. Surtout par email, quand le destinataire est nommé.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-3">
              <p className="text-gray-800 text-lg leading-8">&ldquo;Bien à vous,&rdquo;</p>
              <p className="text-gray-800 text-lg leading-8">&ldquo;Bien cordialement,&rdquo;</p>
              <p className="text-gray-800 text-lg leading-8">&ldquo;Belle journée,&rdquo; (acceptable en mail uniquement)</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les formules à éviter
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>&ldquo;Mes respectueux hommages&rdquo;</strong> : désuet, parfois mal interprété (à réserver à des courriers personnels d&apos;un autre temps).</li>
              <li><strong>&ldquo;L&apos;expression de mes sentiments les meilleurs&rdquo;</strong> : ambigu, trop intime pour un contexte professionnel.</li>
              <li><strong>&ldquo;Bisous&rdquo;, &ldquo;À bientôt&rdquo;, &ldquo;Take care&rdquo;</strong> : trop familier, élimine immédiatement.</li>
              <li><strong>&ldquo;Regards&rdquo;, &ldquo;Sincerely&rdquo;</strong> : à réserver aux lettres rédigées en anglais.</li>
              <li><strong>L&apos;oubli de la virgule</strong> après la formule : faute de typographie qui se voit.</li>
              <li><strong>&ldquo;À Mes sincères salutations&rdquo;</strong> avec un &ldquo;À&rdquo; au début : incorrect, à proscrire.</li>
            </ul>

            {/* Section 6 : Email vs Lettre */}
            <h2 id="email-vs-lettre" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Finir un email de candidature vs une lettre formelle
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le canal change la fin. Une lettre formelle (PDF en pièce jointe) suit les conventions classiques. Un email de candidature suit les codes du mail professionnel : plus court, plus direct, avec une signature qui contient vos coordonnées.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Fin d&apos;une lettre formelle (PDF)
            </h3>
            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-3">Exemple</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je serais ravi d'échanger avec vous sur la façon dont mon expérience peut servir vos objectifs 2026. Je reste disponible pour un appel à votre convenance.

Veuillez recevoir, Madame, Monsieur, mes sincères salutations.

Prénom NOM
[Signature manuscrite scannée, si possible]`}</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La signature manuscrite scannée n&apos;est pas obligatoire en 2026, mais elle apporte une touche personnelle sur un PDF. Si vous l&apos;ajoutez, prenez-la sur fond blanc, en noir, et collez-la au-dessus de votre nom tapé. Sinon, tapez simplement votre prénom et nom : c&apos;est accepté partout.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Fin d&apos;un email de candidature
            </h3>
            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-3">Exemple</p>
              <p className="text-gray-800 text-lg leading-8 whitespace-pre-line">{`Je peux organiser un appel de 20 minutes cette semaine ou la suivante. Mon créneau le plus large est mardi 14h-18h et jeudi 9h-12h.

Bien cordialement,

Prénom NOM
+33 6 XX XX XX XX
linkedin.com/in/prenom-nom`}</p>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans un email, la signature porte les coordonnées : numéro de téléphone et lien LinkedIn. Pas besoin de répéter votre adresse mail (elle est déjà dans l&apos;expéditeur). La formule de politesse passe à un niveau standard ou direct, jamais aussi formelle que pour une lettre PDF.
            </p>

            {/* Section 7 : Erreurs */}
            <h2 id="erreurs" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 6 erreurs qui sabotent une fin de lettre
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les pièges les plus fréquents en fin de lettre de motivation. Chacun annule le travail fait dans le reste du document.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">1. La formule pompeuse désuète</p>
              <p className="text-gray-500 line-through text-lg">Je vous prie d&apos;agréer, Madame, Monsieur, l&apos;expression de mes sentiments les plus respectueux et de mes salutations distinguées.</p>
              <p className="text-gray-800 font-medium text-lg">Veuillez recevoir, Madame, Monsieur, mes sincères salutations.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">2. L&apos;attente passive</p>
              <p className="text-gray-500 line-through text-lg">Dans l&apos;attente d&apos;une réponse favorable de votre part, je vous prie d&apos;agréer mes sincères salutations.</p>
              <p className="text-gray-800 font-medium text-lg">Je peux vous proposer un appel de 20 minutes cette semaine. Mardi et jeudi en fin de journée me conviennent bien.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">3. La négation timide</p>
              <p className="text-gray-500 line-through text-lg">N&apos;hésitez pas à me contacter pour toute question concernant ma candidature.</p>
              <p className="text-gray-800 font-medium text-lg">Vous pouvez me joindre au [NUMÉRO] ou par retour de mail pour fixer un échange. Je suis disponible dès cette semaine.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">4. Le remerciement excessif</p>
              <p className="text-gray-500 line-through text-lg">Je vous remercie chaleureusement par avance de l&apos;attention bienveillante que vous porterez à ma candidature.</p>
              <p className="text-gray-800 font-medium text-lg">Je reste à votre écoute pour un échange et serais ravi de vous présenter mes réalisations en entretien.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">5. La signature recopiée d&apos;un modèle</p>
              <p className="text-gray-500 line-through text-lg">[Nom du candidat] (texte oublié dans la lettre, présent dans le modèle Internet).</p>
              <p className="text-gray-800 font-medium text-lg">Prénom NOM (votre vrai prénom et nom, sans crochets).</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">6. Le P.S. inutile</p>
              <p className="text-gray-500 line-through text-lg">P.S. : N&apos;hésitez pas à consulter mon profil LinkedIn pour plus d&apos;informations sur mon parcours.</p>
              <p className="text-gray-800 font-medium text-lg">(Information à intégrer dans le corps de la lettre ou la signature, pas en post-scriptum.)</p>
            </div>

            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Si la dernière phrase de votre lettre pourrait être copiée-collée sur 10 candidatures différentes, elle ne sert ni à vous distinguer ni à déclencher un rappel. Réécrivez-la jusqu&apos;à ce qu&apos;elle propose quelque chose de concret.
              </p>
            </blockquote>

            {/* Section 8 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment signer une lettre envoyée par PDF ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Trois options. Taper simplement vos prénom et nom : c&apos;est accepté partout, c&apos;est l&apos;option par défaut en 2026. Ajouter une signature manuscrite scannée au-dessus : plus personnel, recommandé pour les contextes formels (banque, cabinet, fonction publique). Insérer une signature numérique générée par un outil : utile uniquement si vous postulez à un poste où ce type de signature fait partie du quotidien.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il rappeler son numéro de téléphone à la fin ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans une lettre formelle : non, vos coordonnées sont déjà en haut. Dans un email : oui, sous la signature, c&apos;est ce qui facilite le rappel sans devoir rouvrir la pièce jointe. Le format propre est : prénom NOM, numéro avec indicatif international, lien LinkedIn, sur 3 lignes maximum.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on terminer par un P.S. ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans une lettre de motivation, non. Le P.S. donne l&apos;impression d&apos;avoir oublié quelque chose, ou pire, d&apos;avoir gardé un argument pour la fin de manière artificielle. Toute information importante doit figurer dans le corps. Le P.S. fonctionne en marketing direct, pas en candidature.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il remercier le recruteur d&apos;avoir lu ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non. Un remerciement préalable (&ldquo;Je vous remercie par avance de l&apos;attention que vous porterez...&rdquo;) est devenu un cliché que les recruteurs sautent. Si vous voulez exprimer une forme de courtoisie, intégrez-la dans la phrase d&apos;appel à l&apos;action (&ldquo;Je serais heureux d&apos;échanger...&rdquo;) plutôt qu&apos;en remerciement explicite.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de mots pour une bonne conclusion lettre de motivation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Entre 30 et 60 mots au total, formule de politesse comprise. L&apos;appel à l&apos;action tient en 1 à 2 phrases (20 à 35 mots), la formule de politesse en une phrase courte (6 à 12 mots). Au-delà, la fin s&apos;alourdit et perd son impact.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on terminer par une citation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pas en lettre de motivation. Une citation en fin laisse le recruteur sur un message qui n&apos;est pas le vôtre, alors que la dernière impression doit être votre proposition d&apos;échange. Gardez les citations pour les contenus longs ou les supports créatifs.
            </p>

            {/* Section 9 : CTA */}
            <h2 id="cta" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Une fin réussie s&apos;appuie sur une lettre cohérente
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La meilleure conclusion ne sauve pas une lettre dont le corps ne parle pas au recruteur. Une fin efficace fonctionne parce qu&apos;elle s&apos;appuie sur un CV aligné avec l&apos;offre, un début qui pose votre valeur, et un corps qui prouve la correspondance.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse gratuitement la correspondance entre votre CV et une offre d&apos;emploi, et identifie les mots-clés à reprendre dans la lettre. Vous trouverez aussi nos guides{" "}
              <Link href="/ressources/lettre-de-motivation/comment-commencer-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                comment commencer une lettre de motivation
              </Link>
              {" "}et{" "}
              <Link href="/ressources/lettre-de-motivation/exemple-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                5 modèles complets adaptables
              </Link>
              {" "}pour cadrer le reste.
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
