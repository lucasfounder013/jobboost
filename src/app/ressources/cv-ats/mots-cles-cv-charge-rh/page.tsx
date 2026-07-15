import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Mots-clés CV Chargé RH : liste complète 2026 | Rivjob",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Chargé RH qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
  ...ogMeta(
    "Mots-clés CV Chargé RH : liste complète 2026 | Rivjob",
    "Découvrez les 30+ mots-clés indispensables pour un CV Chargé RH qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    "/ressources/cv-ats/mots-cles-cv-charge-rh"
  ),
};

const TOC = [
  { id: "pourquoi-mots-cles-charge-rh",   titre: "Pourquoi les mots-clés sont critiques",              niveau: 2 },
  { id: "mots-cles-incontournables",        titre: "Les 30 mots-clés incontournables par catégorie",      niveau: 2 },
  { id: "recrutement",                      titre: "Recrutement et acquisition de talents",               niveau: 3 },
  { id: "formation-developpement",          titre: "Formation et développement des compétences",          niveau: 3 },
  { id: "droit-social-paie",               titre: "Droit social et paie",                                niveau: 3 },
  { id: "outils-sirh",                     titre: "Outils SIRH et logiciels RH",                         niveau: 3 },
  { id: "soft-skills",                     titre: "Soft skills",                                         niveau: 3 },
  { id: "comment-integrer",               titre: "Comment les intégrer naturellement",                   niveau: 2 },
  { id: "erreurs-a-eviter",               titre: "Les erreurs à éviter",                                 niveau: 2 },
  { id: "faq",                            titre: "FAQ : ATS et CV Chargé RH",                            niveau: 2 },
  { id: "ce-que-fait-rivjob",           titre: "Ce que fait Rivjob",                                 niveau: 2 },
];

export default function ArticleMotsClesChargeRH() {
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
          <span className="text-gray-600">Mots-clés CV Chargé RH</span>
        </div>

        <ArticleJsonLd
          titre="Mots-clés CV Chargé RH : liste complète 2026 | Rivjob"
          description="Découvrez les 30+ mots-clés indispensables pour un CV Chargé RH qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples."
          slug="/ressources/cv-ats/mots-cles-cv-charge-rh"
          datePublication="2026-06-06"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "Mots-clés CV Chargé RH", url: "/ressources/cv-ats/mots-cles-cv-charge-rh" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Chargé RH : liste complète 2026 pour passer les ATS
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
              <span>6 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Chargé RH, Chargé de ressources humaines, Généraliste RH, Chargé de développement RH.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La fonction RH recouvre des réalités très différentes selon la taille de l&apos;entreprise et son organisation. Mais les recruteurs qui cherchent dans leur ATS utilisent souvent les mêmes mots-clés, que le poste soit orienté recrutement, formation ou administration du personnel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur ne tape pas &ldquo;polyvalent&rdquo; dans sa barre de recherche. Il tape &ldquo;GPEC&rdquo;, &ldquo;plan de formation&rdquo; ou &ldquo;SuccessFactors&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les 30 mots-clés que vous devez absolument avoir dans votre CV pour être trouvé parmi les candidats RH disponibles sur le marché. Pour comprendre en amont <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment fonctionnent les ATS</Link> et pourquoi ils filtrent avant toute lecture humaine, consultez notre article de référence.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles-charge-rh" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Chargé RH
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le secteur RH recrute en flux tendu. Les postes de Chargé RH attirent de nombreux profils issus de licences pro RH, de masters RH, mais aussi de reconversions. Une offre reçoit régulièrement plusieurs centaines de candidatures.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Face à ce volume, le recruteur n&apos;ouvre pas les CV un par un. Il filtre sa base avec des mots-clés précis. Les profils qui remontent sont ceux dont le CV contient les termes exacts tapés dans la barre de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La particularité de la fonction RH : elle utilise un vocabulaire très codifié, souvent abrégé (GPEC, SIRH, ADP, onboarding). Un candidat qui écrit &ldquo;gestion des talents&rdquo; sans préciser les outils et les processus concrets sera moins bien indexé qu&apos;un candidat qui détaille &ldquo;pilotage des entretiens professionnels sous SuccessFactors&rdquo;.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre sens du service qui vous élimine. C&apos;est l&apos;absence du bon mot RH dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour les Chargés RH, le risque est double : utiliser des formulations trop vagues comme &ldquo;gestion du personnel&rdquo; d&apos;un côté, ou des termes trop administratifs sans les compétences terrain de l&apos;autre. La liste ci-dessous couvre le vocabulaire structuré attendu par les ATS pour cette fonction.
            </p>

            {/* Section 2 */}
            <h2 id="mots-cles-incontournables" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 30 mots-clés incontournables pour un CV Chargé RH
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont organisés par catégorie pour vous aider à les répartir dans les bonnes rubriques de votre CV. Chaque catégorie correspond à un périmètre de la fonction RH que les recruteurs filtrent indépendamment.
            </p>

            {/* H3 : Recrutement */}
            <h3 id="recrutement" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Recrutement et acquisition de talents
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le périmètre le plus cherché dans les offres de Chargé RH. Ces mots-clés décrivent les étapes du processus de recrutement que vous maîtrisez.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Recrutement</strong> : pilotage complet du processus de sélection, de la définition du besoin à l&apos;intégration</li>
              <li><strong>Sourcing</strong> : identification de candidats via les jobboards, LinkedIn et les CVthèques internes</li>
              <li><strong>Intégration (onboarding)</strong> : mise en place du parcours d&apos;accueil pour les nouveaux collaborateurs</li>
              <li><strong>Entretien structuré</strong> : conduite d&apos;entretiens avec grille d&apos;évaluation standardisée</li>
              <li><strong>Fiche de poste</strong> : rédaction des descriptions de poste en lien avec les managers</li>
              <li><strong>Gestion des candidatures</strong> : suivi du pipeline de recrutement dans l&apos;ATS</li>
              <li><strong>Marque employeur</strong> : contribution aux actions de communication RH externe et à l&apos;attractivité</li>
              <li><strong>Expérience candidat</strong> : amélioration du parcours de candidature et des retours aux candidats</li>
            </ul>

            {/* H3 : Formation */}
            <h3 id="formation-developpement" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Formation et développement des compétences
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés couvrent le volet développement RH. Ils sont filtrés par les entreprises qui cherchent un profil capable d&apos;accompagner la montée en compétences des équipes.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Plan de formation</strong> : élaboration et suivi du plan de développement des compétences</li>
              <li><strong>Gestion des compétences</strong> : cartographie et évaluation des compétences individuelles et collectives</li>
              <li><strong>GPEC</strong> (Gestion Prévisionnelle des Emplois et des Compétences) : anticipation des besoins RH à moyen terme</li>
              <li><strong>Entretien annuel</strong> : organisation et pilotage des campagnes d&apos;évaluation annuelle</li>
              <li><strong>Entretien professionnel</strong> : conduite des entretiens obligatoires tous les 2 ans conformément à la loi</li>
              <li><strong>Bilan de compétences</strong> : accompagnement des salariés dans leur démarche de bilan et d&apos;orientation</li>
              <li><strong>E-learning</strong> : déploiement et suivi des formations à distance via les plateformes LMS</li>
            </ul>

            {/* H3 : Droit social */}
            <h3 id="droit-social-paie" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Droit social et paie
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont filtrés dans les offres de Chargé RH généraliste ou administratif. Ils signalent votre capacité à gérer les aspects juridiques et administratifs de la relation de travail.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Droit du travail</strong> : connaissance des règles applicables aux contrats, durée du travail et licenciements</li>
              <li><strong>Contrat de travail</strong> : rédaction et gestion des CDI, CDD, alternances et conventions de stage</li>
              <li><strong>Rupture conventionnelle</strong> : instruction des dossiers et accompagnement de la procédure</li>
              <li><strong>Gestion des absences</strong> : suivi des congés, arrêts maladie et temps partiels</li>
              <li><strong>Veille sociale</strong> : suivi des évolutions législatives et conventionnelles applicables à l&apos;entreprise</li>
              <li><strong>Paie</strong> : préparation des éléments variables, contrôle des bulletins de salaire</li>
              <li><strong>Déclarations sociales</strong> : DSN, URSSAF, prévoyance ; maîtrise des obligations déclaratives</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Le terme &ldquo;GPEC&rdquo; et son équivalent long &ldquo;Gestion Prévisionnelle des Emplois et des Compétences&rdquo; doivent tous les deux apparaître dans votre CV. Les ATS ne font pas toujours le lien entre l&apos;abréviation et l&apos;intitulé complet.
              </p>
            </blockquote>

            {/* H3 : Outils SIRH */}
            <h3 id="outils-sirh" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Outils SIRH et logiciels RH
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les noms d&apos;outils sont des mots-clés à part entière dans les ATS. Les recruteurs filtrent souvent sur le nom exact du logiciel utilisé dans leur organisation.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Workday</strong> : SIRH de référence dans les grandes entreprises internationales</li>
              <li><strong>SAP SuccessFactors</strong> : suite RH très présente dans les grands groupes industriels et du CAC 40</li>
              <li><strong>ADP</strong> : solution paie et gestion des temps utilisée dans les ETI et grandes entreprises</li>
              <li><strong>Lucca</strong> : SIRH moderne très répandu dans les startups et scaleups françaises</li>
              <li><strong>Talentsoft</strong> : logiciel RH français orienté recrutement et formation, courant dans les ETI</li>
              <li><strong>LinkedIn Recruiter</strong> : outil de sourcing incontournable pour les profils en tension</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas utilisé ces outils spécifiques, mentionnez votre capacité à prendre en main un SIRH rapidement et listez les outils que vous maîtrisez réellement. La véracité prime sur l&apos;exhaustivité : vous serez questionné en entretien.
            </p>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales sont particulièrement scrutées dans les métiers RH, qui nécessitent un contact constant avec des interlocuteurs variés. L&apos;enjeu est de les formuler précisément, pas de façon générique.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Écoute active</strong> : capacité à comprendre les besoins des collaborateurs et des managers avant de proposer une solution</li>
              <li><strong>Confidentialité</strong> : gestion des informations sensibles (salaires, situations personnelles, conflits) avec discrétion</li>
              <li><strong>Gestion de la relation</strong> : animation du dialogue social et accompagnement des managers au quotidien</li>
              <li><strong>Sens de l&apos;organisation</strong> : pilotage simultané de plusieurs processus RH (recrutements, entretiens, formations)</li>
              <li><strong>Pédagogie</strong> : vulgarisation des règles RH et légales pour les salariés et les managers non spécialistes</li>
            </ul>

            {/* Section 3 */}
            <h2 id="comment-integrer" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
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
              Voici des exemples concrets de reformulation pour un CV Chargé RH :
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 1 : Recrutement</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Participation aux recrutements</p>
                <p className="text-gray-800 font-medium text-lg">Pilotage de 40 recrutements annuels (CDI, CDD, alternances) via Talentsoft : sourcing LinkedIn Recruiter, entretiens structurés et intégration des nouveaux collaborateurs</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2 : Formation</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion des formations</p>
                <p className="text-gray-800 font-medium text-lg">Élaboration et suivi du plan de formation (250 collaborateurs), organisation des entretiens professionnels et déploiement d&apos;un module e-learning sur la sécurité</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3 : Administration RH</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion administrative du personnel</p>
                <p className="text-gray-800 font-medium text-lg">Rédaction des contrats de travail, instruction des ruptures conventionnelles et gestion des absences sous ADP ; veille sociale mensuelle transmise aux managers</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV Chargé RH bien rédigé contient naturellement 15 à 20 mots-clés métier. Le vocabulaire du quotidien RH suffit : il faut juste l&apos;écrire clairement et en toutes lettres.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Certaines pratiques très répandues dans les CV RH nuisent directement à leur lisibilité par les ATS.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Lister les mots-clés sans contexte.</strong>{" "}
                Une rubrique &ldquo;Compétences : recrutement, formation, GPEC, paie&rdquo; est pauvre en signal pour un ATS. Chaque compétence doit être illustrée dans une description d&apos;expérience avec un volume, une action et un résultat concret.
              </li>
              <li>
                <strong>Oublier les abréviations courantes.</strong>{" "}
                &ldquo;GPEC&rdquo; et &ldquo;Gestion Prévisionnelle des Emplois et des Compétences&rdquo; doivent tous deux apparaître. &ldquo;DSN&rdquo; et &ldquo;Déclaration Sociale Nominative&rdquo; idem. Les ATS ne font pas toujours la correspondance automatiquement.
              </li>
              <li>
                <strong>Utiliser uniquement le titre &ldquo;Ressources Humaines&rdquo; sans détail.</strong>{" "}
                Ce titre est trop générique. Les recruteurs filtrent sur les sous-domaines : recrutement, formation, paie, droit social. Précisez votre périmètre réel. Pour comprendre <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que voit le recruteur dans son ATS</Link> lorsqu&apos;il analyse votre profil, notre article dédié vous donnera les clés.
              </li>
              <li>
                <strong>Ignorer les mots-clés outils SIRH.</strong>{" "}
                Le nom du logiciel RH que vous avez utilisé est un critère de filtre explicite dans de nombreuses offres. Un CV qui mentionne &ldquo;Workday&rdquo; ou &ldquo;Lucca&rdquo; dans les expériences sera mieux indexé qu&apos;un CV qui se contente de &ldquo;maîtrise d&apos;outils informatiques&rdquo;.
              </li>
              <li>
                <strong>Copier-coller la fiche de poste mot pour mot.</strong>{" "}
                Les ATS détectent le contenu dupliqué. Reformulez les exigences de l&apos;offre avec votre propre expérience. Le format du fichier peut aussi impacter la lecture par l&apos;ATS : consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif format PDF ou Word pour les ATS</Link>.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Chargé RH
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les ATS lisent-ils les CV Chargé RH différemment des autres métiers ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Non sur le plan technique : un ATS parse tous les CV de la même façon. La différence vient du fait que la fonction RH utilise un vocabulaire très codifié, avec des abréviations métier spécifiques (GPEC, SIRH, DSN, onboarding) qui sont exactement les termes cherchés dans les filtres.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un CV RH qui traduit ces abréviations en langage courant peut passer à côté des filtres, même si le profil est parfaitement adapté au poste.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il mettre le nom exact des logiciels SIRH dans son CV ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, et c&apos;est particulièrement important pour les postes RH. Les DRH et directeurs administratifs qui paramètrent les filtres ATS cherchent souvent le nom précis de leur propre outil : Workday, SuccessFactors, ADP, Lucca ou Talentsoft.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mentionnez uniquement les outils que vous avez réellement utilisés. La question &ldquo;vous avez utilisé Lucca comment exactement ?&rdquo; arrive systématiquement en entretien.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de mots-clés mettre dans un CV Chargé RH ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a pas de seuil exact. L&apos;objectif est que les mots-clés apparaissent naturellement dans vos descriptions d&apos;expériences, pas dans une liste isolée. Un CV de 2 pages couvrant 3 à 4 expériences RH contiendra naturellement 15 à 25 mots-clés métier pertinents.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La règle pratique : ne répétez pas le même terme plus de 3 fois. Variez les formulations pour couvrir plus de recherches possibles.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Quelle différence entre Chargé RH et Responsable RH côté ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les recruteurs cherchent rarement ces deux intitulés ensemble. Un filtre sur &ldquo;Responsable RH&rdquo; peut exclure les profils qui n&apos;ont que &ldquo;Chargé RH&rdquo;. Pensez à inclure les deux variantes dans votre profil si votre niveau d&apos;expérience le justifie.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Plus généralement, l&apos;enjeu des variantes d&apos;intitulés de poste est le même pour tous les métiers. C&apos;est ce que montre aussi notre analyse des <Link href="/ressources/cv-ats/mots-cles-cv-chef-de-projet" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Chef de Projet</Link> ou des <Link href="/ressources/cv-ats/mots-cles-cv-commercial" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">mots-clés CV Commercial</Link>.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment savoir quels mots-clés utiliser pour une offre précise ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La méthode la plus efficace est d&apos;analyser l&apos;offre d&apos;emploi elle-même. Les mots qui reviennent plusieurs fois dans la description du poste sont ceux que le recruteur a paramétrés dans son ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Identifiez les 5 à 10 mots-clés les plus présents dans l&apos;offre et vérifiez qu&apos;ils apparaissent dans votre CV. Pour savoir <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe après avoir postulé</Link> et comment votre CV est traité, notre article dédié détaille le processus étape par étape.
            </p>

            {/* Section 6 */}
            <h2 id="ce-que-fait-rivjob" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait Rivjob pour votre CV Chargé RH
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette liste vous donne les mots-clés universels de la fonction RH. Mais chaque offre d&apos;emploi a ses propres priorités selon la taille de l&apos;entreprise, son SIRH, et les missions recherchées.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Rivjob analyse la correspondance entre votre CV et une offre d&apos;emploi spécifique. Il identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV, ceux que le recruteur tapera dans son ATS pour trouver le bon profil RH.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre CV apparaisse quand le recruteur cherche un Chargé RH avec exactement votre périmètre.
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
