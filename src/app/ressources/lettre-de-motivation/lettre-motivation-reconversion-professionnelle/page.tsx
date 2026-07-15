import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Lettre de motivation reconversion professionnelle : guide + exemple 2026 | Rivjob",
  description:
    "Comment rédiger une lettre de motivation convaincante pour une reconversion professionnelle en 2026. Guide complet avec exemple concret et conseils pratiques.",
  ...ogMeta(
    "Lettre de motivation reconversion professionnelle : guide + exemple 2026 | Rivjob",
    "Comment rédiger une lettre de motivation convaincante pour une reconversion professionnelle en 2026. Guide complet avec exemple concret et conseils pratiques.",
    "/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle"
  ),
};

const TOC = [
  { id: "introduction",              titre: "Pourquoi la lettre de motivation est décisive en reconversion",       niveau: 2 },
  { id: "erreurs-a-eviter",          titre: "Les erreurs à éviter dans une lettre de motivation reconversion",     niveau: 2 },
  { id: "structure-ideale",          titre: "La structure idéale en 4 parties",                                    niveau: 2 },
  { id: "accroche",                  titre: "Partie 1 : l'accroche qui contextualise la reconversion",             niveau: 3 },
  { id: "parcours-passe",            titre: "Partie 2 : valoriser son parcours passé sans le renier",              niveau: 3 },
  { id: "competences-transferables", titre: "Partie 3 : les compétences transférables (le cœur de la lettre)",    niveau: 3 },
  { id: "motivation-nouveau-metier", titre: "Partie 4 : la motivation pour le nouveau métier",                    niveau: 3 },
  { id: "exemple-complet",           titre: "Exemple complet de lettre de motivation reconversion",               niveau: 2 },
  { id: "adapter-selon-secteur",     titre: "Adapter sa lettre selon le secteur visé",                            niveau: 2 },
  { id: "faq",                       titre: "FAQ",                                                                 niveau: 2 },
  { id: "rivjob",                  titre: "Ce que fait Rivjob pour votre reconversion",                       niveau: 2 },
];

export default function ArticleLettreMotivationReconversion() {
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
          <span className="text-gray-600">Lettre de motivation reconversion professionnelle</span>
        </div>

        <ArticleJsonLd
          titre="Lettre de motivation reconversion professionnelle : guide + exemple 2026 | Rivjob"
          description="Comment rédiger une lettre de motivation convaincante pour une reconversion professionnelle en 2026. Guide complet avec exemple concret et conseils pratiques."
          slug="/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle"
          datePublication="2026-06-11"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Lettre de motivation", url: "/ressources" },
            { nom: "Lettre de motivation reconversion professionnelle", url: "/ressources/lettre-de-motivation/lettre-motivation-reconversion-professionnelle" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Lettre de motivation reconversion professionnelle : guide complet + exemple 2026
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
              <span>11 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>10 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En France, plus de 500 000 personnes entament une reconversion professionnelle chaque année. Pourtant, la majorité se heurte au même obstacle dès la première candidature : comment convaincre un recruteur de miser sur un profil qui vient d&apos;un secteur différent ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le CV seul ne suffit pas. Il liste des expériences dans un domaine que vous êtes en train de quitter. La lettre de motivation, elle, est l&apos;unique endroit où vous pouvez construire le récit de cohérence qui relie votre passé à votre futur. Sans ce récit, le recruteur voit une trajectoire brisée. Avec lui, il voit une progression logique.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce guide vous donne la structure exacte pour rédiger cette lettre, les erreurs qui font échouer la plupart des candidats en reconversion, et un exemple complet annoté que vous pouvez adapter à votre situation.
            </p>

            {/* Section 1 */}
            <h2 id="introduction" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi la lettre de motivation est décisive en reconversion
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand un recruteur reçoit une candidature en reconversion, son premier réflexe est la méfiance, pas l&apos;enthousiasme. Il se pose deux questions : est-ce que cette personne sait vraiment ce qu&apos;elle veut ? Et est-ce qu&apos;elle peut réellement faire le travail sans expérience directe dans mon secteur ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre ce qui se passe réellement après que vous avez envoyé votre candidature, il est utile de savoir <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe après que vous avez postulé</Link> : votre CV passe d&apos;abord par un filtre automatique, puis un humain le lit. C&apos;est à ce moment que la lettre intervient.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La lettre de motivation en reconversion a donc un rôle spécifique : elle ne complète pas votre CV comme pour une candidature classique, elle le réinterprète. Elle transforme des expériences apparemment hors-sujet en preuves de compétences directement transférables au nouveau poste.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                En reconversion, votre lettre ne dit pas &ldquo;je change de voie&rdquo;. Elle dit &ldquo;j&apos;arrive avec des compétences que vos candidats habituels n&apos;ont pas&rdquo;.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter dans une lettre de motivation reconversion
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 1 : s&apos;excuser de son parcours
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La phrase la plus courante dans les lettres de motivation reconversion est aussi la plus destructrice : &ldquo;Bien que je n&apos;aie pas d&apos;expérience directe dans votre secteur...&rdquo;. Dès que vous écrivez ce type de phrase, vous signalez au recruteur que vous percevez vous-même votre candidature comme insuffisante.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur classique vs bonne approche</p>
              <p className="text-gray-500 line-through text-lg">Bien que je n&apos;aie pas d&apos;expérience directe dans le design UX, je suis convaincu que ma motivation et ma formation récente compensent ce manque.</p>
              <p className="text-gray-800 font-medium text-lg">En huit ans de gestion de projets IT, j&apos;ai conduit plus de 30 ateliers de recueil de besoins avec des utilisateurs finaux. C&apos;est précisément cette compréhension des usages qui est au cœur du travail de UX Designer que vous recherchez.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 2 : expliquer pourquoi on quitte l&apos;ancien métier
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le recruteur se fiche de savoir que vous êtes épuisé par votre ancien poste ou que vous cherchez plus de sens. Il veut savoir ce que vous apportez à son équipe. Consacrez chaque phrase à ce que vous pouvez faire pour lui, pas à ce qui vous a amené à changer.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 3 : lister les formations sans les relier à des compétences concrètes
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              &ldquo;J&apos;ai suivi une formation de 6 mois en UX Design&rdquo; ne convainc personne. Ce qui convainc, c&apos;est ce que cette formation vous a permis de faire : &ldquo;J&apos;ai conçu et testé 3 prototypes d&apos;application mobile avec 12 utilisateurs réels, réduisant le taux d&apos;abandon lors de l&apos;onboarding de 40 %&rdquo;.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 4 : ignorer le vocabulaire du secteur cible
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une lettre de motivation reconversion qui n&apos;utilise pas les termes du nouveau secteur signale que le candidat ne connaît pas encore les codes du métier. Avant de rédiger, lisez 5 offres d&apos;emploi dans votre secteur cible et notez les expressions récurrentes. Intégrez-les naturellement dans votre lettre.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 5 : envoyer une lettre générique non adaptée à la reconversion
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une lettre de motivation standard, même bien écrite, ne répond pas aux questions spécifiques que se pose un recruteur face à un profil en reconversion. Votre lettre doit être construite pour ce contexte particulier, pas adaptée à partir d&apos;un modèle classique.
            </p>

            {/* Section 3 */}
            <h2 id="structure-ideale" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              La structure idéale en 4 parties
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une lettre de motivation reconversion efficace tient en 4 paragraphes. Chacun répond à une question que se pose le recruteur dans un ordre précis.
            </p>

            <h3 id="accroche" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Partie 1 : l&apos;accroche qui contextualise la reconversion
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;accroche en reconversion doit faire deux choses simultanément : montrer votre valeur immédiatement et poser le contexte de votre changement sans que cela ressemble à une excuse. La meilleure façon d&apos;y parvenir est de partir d&apos;un résultat concret de votre expérience passée, puis de le relier directement au poste visé.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple d&apos;accroche en reconversion</p>
              <p className="text-gray-500 line-through text-lg">Après 8 ans dans la gestion de projets IT, j&apos;ai décidé de me reconvertir en UX Design et je souhaite rejoindre votre agence.</p>
              <p className="text-gray-800 font-medium text-lg">En 8 ans de gestion de projets IT, j&apos;ai passé la moitié de mon temps à comprendre pourquoi des outils bien conçus techniquement échouaient à l&apos;usage. Cette obsession pour l&apos;expérience utilisateur m&apos;a conduit vers le UX Design. Votre poste de UX Designer junior est exactement le contexte dans lequel je veux l&apos;exercer.</p>
            </div>

            <h3 id="parcours-passe" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Partie 2 : valoriser son parcours passé sans le renier
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le paragraphe que la plupart des candidats en reconversion rédigent mal, en s&apos;effaçant derrière leur ancienne expérience ou en la minimisant. L&apos;objectif est l&apos;inverse : montrer que votre parcours vous a donné une perspective que les candidats classiques n&apos;ont pas.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Reformulez vos anciennes responsabilités avec les mots du nouveau secteur. Un chef de projet qui devient UX Designer ne dit pas &ldquo;j&apos;ai géré des équipes&rdquo;, il dit &ldquo;j&apos;ai coordonné des équipes pluridisciplinaires et arbitré entre contraintes techniques et besoins utilisateurs&rdquo;. La réalité est la même, le prisme change tout.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour savoir quelles compétences mettre en avant, relisez <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link> : ce qui s&apos;applique au CV s&apos;applique aussi à ce paragraphe.
            </p>

            <h3 id="competences-transferables" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Partie 3 : les compétences transférables (le cœur de la lettre)
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le paragraphe le plus important de votre lettre. Identifiez 2 ou 3 compétences que vous avez développées dans votre ancien métier et qui répondent directement à des besoins du poste visé. Pour chaque compétence, apportez une preuve chiffrée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le principe est simple : ne dites jamais ce que vous êtes capable de faire, montrez ce que vous avez déjà fait. Un résultat concret vaut dix affirmations sur votre potentiel.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Compétences transférables avec preuves</p>
              <p className="text-gray-500 line-through text-lg">Mes compétences en communication et en gestion de projet me permettront de m&apos;adapter rapidement au métier de UX Designer.</p>
              <p className="text-gray-800 font-medium text-lg">J&apos;ai conduit 30 ateliers de recueil de besoins avec des utilisateurs finaux sur des projets en méthode agile, produisant des spécifications fonctionnelles utilisées par 4 équipes de développement. Sur mon dernier projet, le taux d&apos;adoption de l&apos;outil livré a atteint 87 % à 3 mois, un chiffre que le client attribue directement à la qualité du recueil initial.</p>
            </div>

            <h3 id="motivation-nouveau-metier" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Partie 4 : la motivation pour le nouveau métier
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le dernier paragraphe doit montrer que votre intérêt pour le nouveau secteur est réel et documenté, pas théorique. Évitez &ldquo;j&apos;ai toujours été passionné par...&rdquo; : cette formule est perçue comme un cliché. Citez quelque chose de précis : un projet que vous avez réalisé pendant votre formation, une veille sectorielle, une pratique personnelle.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Terminez par un appel à l&apos;action direct. Ne restez pas dans l&apos;attente passive. Une phrase comme &ldquo;Je serais ravi d&apos;échanger avec vous sur la façon dont mon parcours peut enrichir votre équipe&rdquo; est toujours plus efficace que &ldquo;Dans l&apos;attente d&apos;une réponse de votre part&rdquo;.
            </p>

            {/* Section 4 */}
            <h2 id="exemple-complet" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple complet de lettre de motivation reconversion
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici une lettre générée par Rivjob pour Sophie Martin, chef de projet IT depuis 8 ans, qui postule pour un poste de UX Designer junior dans une agence digitale.
            </p>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 my-8 font-serif text-gray-900">
              {/* En-tête centré */}
              <div className="text-center mb-8">
                <p className="text-xl font-bold tracking-wide">Sophie MARTIN</p>
                <p className="text-sm text-gray-600 mt-1">Chef de projet IT en reconversion UX Design</p>
                <p className="text-sm text-gray-500 mt-1">+33 6 XX XX XX XX &middot; sophie.martin@email.fr &middot; Paris, France</p>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-700 text-right mb-8">Le 11 juin 2026</p>

              {/* Salutation */}
              <p className="text-sm text-gray-800 mb-6">Madame, Monsieur,</p>

              {/* Corps */}
              <p className="text-sm text-gray-800 leading-7 mb-4 text-justify">
                En 8 ans de gestion de projets IT, j&apos;ai passé la moitié de mon temps à comprendre pourquoi des outils techniquement solides échouaient à l&apos;usage. Cette conviction que le design de l&apos;expérience est aussi critique que l&apos;architecture technique m&apos;a conduit à me former au UX Design. Votre poste de UX Designer junior est exactement le contexte dans lequel je veux l&apos;exercer.
              </p>
              <p className="text-sm text-gray-800 leading-7 mb-4 text-justify">
                Chez Sopra Steria, j&apos;ai piloté le déploiement de 4 outils métier pour des équipes de 50 à 200 personnes. Sur chaque projet, j&apos;étais l&apos;interface entre les développeurs et les utilisateurs finaux : c&apos;est moi qui conduisais les ateliers de recueil de besoins, produisais les maquettes fonctionnelles et arbitrais les compromis entre contraintes techniques et usages réels.
              </p>
              <p className="text-sm text-gray-800 leading-7 mb-4 text-justify">
                Votre annonce cite la conduite de tests utilisateurs et la maîtrise de Figma comme priorités. Sur les tests : j&apos;ai animé plus de 30 séances de recueil avec des utilisateurs finaux sur des projets agile, le dernier outil déployé a atteint 87 % d&apos;adoption à 3 mois. Sur Figma : ma formation chez Ironhack m&apos;a permis de concevoir et tester 3 prototypes d&apos;application mobile, dont un primé lors du Demo Day de la promotion.
              </p>
              <p className="text-sm text-gray-800 leading-7 mb-8 text-justify">
                Votre positionnement sur les interfaces B2B complexes correspond exactement aux contextes dans lesquels j&apos;ai travaillé. Je serais heureuse d&apos;échanger avec vous sur la façon dont mon parcours peut enrichir votre équipe. Je reste disponible pour un appel à votre convenance.
              </p>

              {/* Signature */}
              <p className="text-sm text-gray-800 mb-6">Cordialement,</p>
              <p className="text-sm font-bold text-gray-900">Sophie MARTIN</p>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Cette lettre fait 290 mots. Elle ne s&apos;excuse de rien. Elle construit un récit de cohérence entre un passé solide et un futur précis, avec des preuves chiffrées à chaque étape.
              </p>
            </blockquote>

            {/* Section 5 */}
            <h2 id="adapter-selon-secteur" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Adapter sa lettre selon le secteur visé
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La structure est la même dans tous les cas, mais le ton et les éléments à mettre en avant changent selon le secteur que vous ciblez.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Reconversion vers le secteur social ou associatif
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs du secteur social et associatif sont souvent méfiants vis-à-vis des profils issus du privé, qu&apos;ils perçoivent comme peu habitués aux contraintes budgétaires ou aux logiques de terrain. Mettez en avant vos engagements bénévoles, votre connaissance des publics concernés, et montrez que vous avez une compréhension réelle de l&apos;environnement (financement public, partenariats institutionnels, travail en réseau). Le ton doit être direct mais ancré dans les valeurs du secteur.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Reconversion vers le digital ou la tech
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs du digital valorisent les résultats mesurables et la capacité à apprendre vite. Mettez en avant les projets concrets réalisés pendant votre formation (portfolio, projets personnels, contributions open source si applicable), les outils maîtrisés, et votre compréhension des méthodologies agile. Le vocabulaire doit être précis : nommer les outils, les langages ou les frameworks exactement comme dans l&apos;offre.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Reconversion vers un métier artisanal ou manuel
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les employeurs dans les métiers manuels sont souvent pragmatiques et peu sensibles aux formulations abstraites. Allez droit au but : les compétences acquises en formation, les heures de pratique, les certifications obtenues. Mettez en avant votre sérieux, votre disponibilité et votre motivation à apprendre. Un ton simple et concret est plus efficace qu&apos;un style élaboré.
            </p>

            {/* Section 6 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il expliquer les raisons de sa reconversion dans la lettre ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Brièvement, et uniquement si cela renforce votre candidature. Une phrase qui montre la cohérence de votre démarche suffit. L&apos;objectif n&apos;est pas de vous justifier, mais de montrer que votre reconversion est réfléchie et ancrée dans une logique professionnelle, pas une fuite. Évitez toute mention des raisons personnelles ou émotionnelles.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment montrer sa motivation pour un secteur qu&apos;on intègre seulement ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Par des preuves concrètes, pas des déclarations. Citez les projets réalisés pendant votre formation, les lectures ou veilles sectorielles que vous suivez, les événements professionnels auxquels vous avez participé, les professionnels avec qui vous avez échangé. La motivation se démontre, elle ne s&apos;annonce pas.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Quelle longueur pour une lettre de motivation reconversion ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La même que pour n&apos;importe quelle lettre de motivation : 250 à 350 mots maximum, soit 4 paragraphes. La tentation en reconversion est d&apos;écrire plus pour tout expliquer. C&apos;est une erreur : une lettre longue dilue l&apos;impact. Si un paragraphe n&apos;apporte pas de preuve supplémentaire, supprimez-le. Pour les standards de rédaction en général, relisez <Link href="/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment écrire une lettre de motivation efficace</Link>.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Vaut-il mieux mentionner une formation en cours ou terminée ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans les deux cas, mentionnez-la, mais différemment. Si elle est terminée, citez un résultat concret qu&apos;elle vous a permis d&apos;atteindre. Si elle est en cours, précisez la date de fin et ce que vous avez déjà produit ou appris. Ne laissez pas le recruteur dans le flou sur votre niveau de compétence actuel.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment compenser l&apos;absence d&apos;expérience directe dans le nouveau secteur ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En substituant la quantité d&apos;expérience par la qualité de la preuve. Vous n&apos;avez pas 5 ans dans le secteur, mais vous avez des projets concrets, des résultats mesurables sur votre formation, et des compétences transférables que les candidats classiques n&apos;ont pas. Mettez en avant ce différentiel positif plutôt que de vous comparer à des profils en poste depuis longtemps.
            </p>

            {/* Section 7 : CTA Rivjob */}
            <h2 id="rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob pour votre reconversion
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rédiger une lettre de motivation reconversion convaincante commence par une analyse précise du poste visé : quels mots-clés reviennent dans les offres du secteur cible ? Quelles compétences sont systématiquement demandées ? Quels termes utilisent les recruteurs que vous ne maîtrisez pas encore ?
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est ce que fait Rivjob pour votre CV. En analysant la correspondance entre votre CV et une offre d&apos;emploi, il identifie les mots-clés présents dans l&apos;annonce qui manquent dans votre dossier. Ces termes sont exactement ceux que vous devez faire apparaître dans votre lettre de motivation pour que l&apos;ensemble de votre candidature soit cohérent et crédible pour le recruteur.
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
