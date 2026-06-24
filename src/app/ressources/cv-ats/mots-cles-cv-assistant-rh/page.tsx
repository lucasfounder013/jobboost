import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Mots-clés CV Assistant RH : liste complète 2026 | JobBoost",
  description:
    "Découvrez les 30+ mots-clés indispensables pour un CV Assistant RH qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
  ...ogMeta(
    "Mots-clés CV Assistant RH : liste complète 2026 | JobBoost",
    "Découvrez les 30+ mots-clés indispensables pour un CV Assistant RH qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples.",
    "/ressources/cv-ats/mots-cles-cv-assistant-rh"
  ),
};

const TOC = [
  { id: "pourquoi-mots-cles",     titre: "Pourquoi les mots-clés sont critiques pour un Assistant RH", niveau: 2 },
  { id: "30-mots-cles",           titre: "Les 30 mots-clés incontournables par catégorie",              niveau: 2 },
  { id: "recrutement-sourcing",   titre: "Recrutement et sourcing",                                      niveau: 3 },
  { id: "administration-rh",      titre: "Administration RH",                                            niveau: 3 },
  { id: "outils-sirh",            titre: "Outils SIRH",                                                  niveau: 3 },
  { id: "droit-social",           titre: "Droit social et paie",                                         niveau: 3 },
  { id: "soft-skills",            titre: "Soft skills recherchés",                                       niveau: 3 },
  { id: "integrer-naturellement", titre: "Comment intégrer ces mots-clés naturellement",                 niveau: 2 },
  { id: "erreurs-a-eviter",       titre: "Les erreurs à éviter",                                         niveau: 2 },
  { id: "faq",                    titre: "FAQ : ATS et CV Assistant RH",                                 niveau: 2 },
];

export default function ArticleMotsClesAssistantRH() {
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
          <span className="text-gray-600">Mots-clés CV Assistant RH</span>
        </div>

        <ArticleJsonLd
          titre="Mots-clés CV Assistant RH : liste complète 2026 | JobBoost"
          description="Découvrez les 30+ mots-clés indispensables pour un CV Assistant RH qui passe les filtres ATS en 2026. Liste complète par catégorie + exemples."
          slug="/ressources/cv-ats/mots-cles-cv-assistant-rh"
          datePublication="2026-06-11"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "CV & ATS", url: "/ressources" },
            { nom: "Mots-clés CV Assistant RH", url: "/ressources/cv-ats/mots-cles-cv-assistant-rh" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Mots-clés CV Assistant RH : liste complète 2026 pour passer les ATS
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
              <span>8 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Assistant RH, Assistant ressources humaines, Assistant administration du personnel, Assistant recrutement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le poste d&apos;Assistant RH est souvent la porte d&apos;entrée dans la fonction. C&apos;est aussi l&apos;un des intitulés les plus recherchés dans les ATS, que ce soit dans une PME sans DRH structuré ou dans un grand groupe avec un service RH complet.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un recruteur qui cherche un Assistant RH ne tape pas &ldquo;motivé&rdquo; ou &ldquo;rigoureux&rdquo; dans son ATS. Il tape &ldquo;DPAE&rdquo;, &ldquo;SIRH&rdquo; ou &ldquo;onboarding&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre en amont{" "}
              <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                comment fonctionnent les ATS
              </Link>{" "}
              et pourquoi ils filtrent avant toute lecture humaine, consultez notre article de référence. Vous trouverez ci-dessous les 30 mots-clés à intégrer dans votre CV pour être trouvé parmi les candidats disponibles sur le marché.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi les mots-clés sont critiques pour un CV Assistant RH
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le recrutement d&apos;un Assistant RH génère rarement moins de 100 candidatures. La plupart des candidats ont une licence pro RH, un BTS Support à l&apos;action managériale ou un master 1 RH. Les profils se ressemblent sur le papier.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Face à ce volume, le recruteur filtre sa base avant de lire quoi que ce soit. Il tape des mots-clés précis dans son ATS et ne remonte que les CV qui les contiennent. Les candidats dont le profil correspond parfaitement, mais dont le CV est mal rédigé, ne sont jamais vus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui distingue la fonction RH des autres métiers : elle utilise un vocabulaire très codifié, souvent technique, avec des abréviations propres au secteur (DPAE, SIRH, DSN, DADS). Un candidat qui écrit &ldquo;gestion administrative&rdquo; sans préciser les actes concrets sera moins bien indexé qu&apos;un candidat qui détaille &ldquo;rédaction des contrats de travail et saisie des DPAE dans PayFit&rdquo;.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce n&apos;est pas votre sens du service qui vous filtre. C&apos;est l&apos;absence du bon terme RH dans votre CV.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;enjeu est double : les postes d&apos;Assistant RH recouvrent des périmètres très différents selon les entreprises. Certains recruteurs cherchent un profil orienté recrutement, d&apos;autres veulent quelqu&apos;un pour la gestion administrative. La liste ci-dessous couvre les deux périmètres, organisés par catégorie. Retrouvez une analyse complémentaire dans notre article sur les{" "}
              <Link href="/ressources/cv-ats/mots-cles-cv-charge-rh" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                mots-clés CV Chargé RH
              </Link>
              , le poste senior directement au-dessus dans la hiérarchie.
            </p>

            {/* Section 2 */}
            <h2 id="30-mots-cles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 30 mots-clés incontournables pour un CV Assistant RH
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont organisés par catégorie pour vous aider à les répartir dans les bonnes rubriques de votre CV. Chaque catégorie correspond à un périmètre que les recruteurs filtrent de façon indépendante selon leur besoin.
            </p>

            {/* H3 : Recrutement */}
            <h3 id="recrutement-sourcing" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Recrutement et sourcing
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces mots-clés sont recherchés dans les offres d&apos;Assistant RH orientées acquisition de talents. Ils décrivent les étapes du processus de recrutement que vous avez touchées, même en support d&apos;un recruteur senior.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Sourcing</strong> : identification de profils via les jobboards, CVthèques et réseaux professionnels</li>
              <li><strong>LinkedIn Recruiter</strong> : outil de sourcing actif sur la plateforme professionnelle de référence</li>
              <li><strong>Jobboards</strong> : publication et gestion des annonces sur Indeed, APEC, Pôle Emploi, Welcome to the Jungle</li>
              <li><strong>Entretien de recrutement</strong> : participation aux entretiens de présélection téléphonique ou en présentiel</li>
              <li><strong>Onboarding</strong> : coordination du parcours d&apos;intégration des nouveaux collaborateurs</li>
              <li><strong>Intégration des collaborateurs</strong> : préparation des dossiers d&apos;accueil, planning d&apos;intégration et suivi de la période d&apos;essai</li>
              <li><strong>Marque employeur</strong> : contribution aux actions de communication RH sur les réseaux et lors des forums</li>
              <li><strong>ATS</strong> (Applicant Tracking System) : gestion des candidatures dans le logiciel de suivi de recrutement</li>
            </ul>

            {/* H3 : Administration RH */}
            <h3 id="administration-rh" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Administration RH
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le cœur opérationnel du poste d&apos;Assistant RH dans beaucoup d&apos;entreprises. Ces mots-clés signalent votre capacité à gérer les actes administratifs du quotidien sans supervision constante.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Gestion administrative</strong> : traitement des formalités administratives liées à la vie du contrat de travail</li>
              <li><strong>Contrat de travail</strong> : rédaction et suivi des CDI, CDD, contrats d&apos;alternance et conventions de stage</li>
              <li><strong>DPAE</strong> (Déclaration Préalable à l&apos;Embauche) : transmission obligatoire à l&apos;URSSAF avant toute prise de poste</li>
              <li><strong>Mutuelle</strong> : affiliation des nouveaux salariés, gestion des adhésions et des sorties</li>
              <li><strong>Prévoyance</strong> : suivi des dossiers de prévoyance en lien avec l&apos;organisme assureur</li>
              <li><strong>Période d&apos;essai</strong> : suivi des dates, relances managers et formalisation des bilans de période d&apos;essai</li>
              <li><strong>Dossiers du personnel</strong> : constitution, mise à jour et archivage des dossiers individuels</li>
            </ul>

            {/* H3 : Outils SIRH */}
            <h3 id="outils-sirh" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Outils SIRH
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les noms de logiciels RH sont des mots-clés à part entière dans les ATS. Un recruteur qui utilise PayFit cherchera souvent &ldquo;PayFit&rdquo; explicitement dans les CV des candidats.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>SIRH</strong> (Système d&apos;Information des Ressources Humaines) : maîtrise d&apos;un outil de gestion RH intégré</li>
              <li><strong>Workday</strong> : SIRH de référence dans les grandes entreprises internationales</li>
              <li><strong>SAP HR</strong> : module RH de la suite SAP, très présent dans les grands groupes industriels</li>
              <li><strong>Lucca</strong> : SIRH moderne très répandu dans les startups et scaleups françaises</li>
              <li><strong>PayFit</strong> : solution paie et RH populaire dans les TPE et PME françaises</li>
              <li><strong>Excel RH</strong> : maîtrise avancée des tableaux de bord RH, suivi des effectifs et reporting</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous n&apos;avez pas utilisé ces outils spécifiques, mentionnez votre capacité à prendre en main un SIRH rapidement et listez les outils réellement maîtrisés. Vous serez interrogé en entretien sur leur usage concret.
            </p>

            {/* H3 : Droit social */}
            <h3 id="droit-social" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Droit social et paie
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Même à un niveau assistant, la connaissance de base du droit du travail et des obligations déclaratives est un critère de filtre dans de nombreuses offres.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Droit du travail</strong> : connaissance des règles applicables aux contrats, congés et ruptures</li>
              <li><strong>Convention collective</strong> : application des dispositions propres à la branche professionnelle de l&apos;entreprise</li>
              <li><strong>Bulletin de paie</strong> : préparation des éléments variables, vérification et transmission au service paie</li>
              <li><strong>Gestion des absences</strong> : suivi des congés payés, RTT, arrêts maladie et temps partiels</li>
              <li><strong>DSN</strong> (Déclaration Sociale Nominative) : connaissance du processus déclaratif mensuel obligatoire</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Écrivez toujours l&apos;abréviation ET son équivalent long : &ldquo;DSN (Déclaration Sociale Nominative)&rdquo;. Les ATS ne font pas toujours le lien entre les deux formes automatiquement.
              </p>
            </blockquote>

            {/* H3 : Soft skills */}
            <h3 id="soft-skills" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Soft skills recherchés
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences comportementales pour un Assistant RH doivent être formulées précisément, pas de façon générique. L&apos;accès à des données sensibles (salaires, situations personnelles) impose des exigences particulières.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Confidentialité</strong> : gestion discrète des informations personnelles et salariales des collaborateurs</li>
              <li><strong>Rigueur</strong> : fiabilité dans le traitement des actes administratifs à fort impact légal (contrats, DPAE)</li>
              <li><strong>Polyvalence</strong> : capacité à gérer simultanément recrutement, administration et support aux managers</li>
              <li><strong>Sens du relationnel</strong> : aisance dans les échanges avec des interlocuteurs variés (candidats, managers, organismes sociaux)</li>
              <li><strong>Organisation</strong> : priorisation des tâches dans un environnement multi-dossiers et multi-deadlines</li>
              <li><strong>Discrétion</strong> : respect absolu de la confidentialité dans la gestion des situations RH sensibles</li>
            </ul>

            {/* Section 3 */}
            <h2 id="integrer-naturellement" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Comment intégrer ces mots-clés naturellement dans son CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La tentation est forte de créer une rubrique &ldquo;Compétences&rdquo; avec une liste de 30 termes. C&apos;est une erreur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ATS modernes valorisent les mots-clés qui apparaissent dans leur contexte. Un mot-clé mentionné dans une description d&apos;expérience a plus de poids qu&apos;un mot-clé isolé dans une liste. La bonne méthode est de les répartir dans les rubriques existantes de votre CV. Pour structurer ces rubriques efficacement, consultez notre guide sur{" "}
              <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                les rubriques indispensables de votre CV 2026
              </Link>
              .
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici des exemples concrets de reformulation pour un CV Assistant RH :
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 1 : Administration RH</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion administrative du personnel</p>
                <p className="text-gray-800 font-medium text-lg">Gestion administrative des contrats (CDI, CDD, alternance) et saisie des DPAE dans le SIRH Lucca ; suivi des dossiers du personnel de l&apos;embauche à la sortie</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 2 : Recrutement</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Aide au recrutement</p>
                <p className="text-gray-800 font-medium text-lg">Sourcing candidats via LinkedIn Recruiter et jobboards (Indeed, Welcome to the Jungle), planification des entretiens et coordination de l&apos;onboarding des nouvelles recrues</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemple 3 : Paie et absences</p>
                <p className="text-gray-500 line-through mb-1 text-lg">Gestion des congés</p>
                <p className="text-gray-800 font-medium text-lg">Suivi des absences (congés payés, RTT, arrêts maladie) sous PayFit et préparation des éléments variables de paie transmis au cabinet comptable</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Un CV Assistant RH bien rédigé contient naturellement 15 à 20 mots-clés métier. Le vocabulaire du quotidien administratif RH suffit : il faut juste l&apos;écrire clairement, en toutes lettres, avec les actes concrets réalisés.
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
                <strong>Mettre les mots-clés en blanc sur fond blanc.</strong>{" "}
                Cette technique, parfois conseillée sur les forums, est détectée et pénalisée par les ATS modernes. Ne l&apos;utilisez jamais.
              </li>
              <li>
                <strong>Utiliser uniquement des abréviations sans les développer.</strong>{" "}
                Écrire &ldquo;RH&rdquo; sans jamais écrire &ldquo;Ressources Humaines&rdquo;, ou &ldquo;DPAE&rdquo; sans &ldquo;Déclaration Préalable à l&apos;Embauche&rdquo;, réduit votre couverture de recherche. Utilisez les deux formes au moins une fois.
              </li>
              <li>
                <strong>Oublier les outils SIRH.</strong>{" "}
                Le nom du logiciel RH est un critère de filtre explicite dans de nombreuses offres. Mentionnez toujours les outils réellement utilisés dans vos expériences.
              </li>
              <li>
                <strong>Copier-coller tous les mots-clés sans cohérence.</strong>{" "}
                Un ATS peut valoriser un terme, mais le recruteur qui lira le CV ensuite cherchera à le retrouver dans vos expériences concrètes. N&apos;intégrez que les mots-clés que vous pouvez justifier en entretien. Le format du fichier peut aussi impacter la lecture :{" "}
                <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                  consultez notre comparatif CV en PDF ou en Word
                </Link>{" "}
                pour faire le bon choix.
              </li>
            </ul>

            {/* Section 5 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ : ATS et CV Assistant RH
            </h2>

            <h3 id="faq-1" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Les ATS lisent-ils vraiment mon CV Assistant RH ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui. Un ATS parse votre CV dès que vous le déposez via une interface de candidature. Il en extrait le texte, l&apos;indexe et le compare aux critères paramétrés par le recruteur. Les CV qui ne correspondent pas aux filtres ne remontent pas dans la recherche, même si le profil est pertinent.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est particulièrement vrai pour les postes RH, où la fonction utilise un vocabulaire très codifié que les recruteurs filtrèrent avec précision.
            </p>

            <h3 id="faq-2" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Dois-je mentionner le nom exact du SIRH que j&apos;ai utilisé ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, c&apos;est particulièrement important pour les postes RH. Les responsables qui paramètrent les filtres ATS cherchent souvent le nom précis de leur propre outil : PayFit, Lucca, Workday ou SAP HR selon leur organisation.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ne mentionnez que les outils réellement utilisés. La question &ldquo;vous avez utilisé PayFit comment exactement ?&rdquo; arrive systématiquement en entretien.
            </p>

            <h3 id="faq-3" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de mots-clés faut-il pour passer un ATS ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a pas de chiffre magique. L&apos;objectif est que les mots-clés apparaissent naturellement dans vos descriptions d&apos;expériences, pas dans une liste isolée. Un CV d&apos;Assistant RH qui détaille 2 à 3 expériences avec les actes concrets réalisés contient naturellement 15 à 20 termes métier pertinents.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La règle pratique : qualité avant quantité. Mieux vaut 15 mots-clés bien intégrés que 30 mots-clés dans une liste sans contexte.
            </p>

            <h3 id="faq-4" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Puis-je utiliser ces mots-clés si je suis débutant en RH ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, si vous pouvez les justifier. Un stage de 3 mois dans un service RH donne accès à des mots-clés réels : rédaction de contrats, saisie de DPAEs, suivi des absences. Une formation en ressources humaines couvre les notions de droit du travail, convention collective et gestion de la paie.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              N&apos;inventez pas d&apos;expériences, mais valorisez précisément ce que vous avez réellement fait ou étudié. Les recruteurs apprécient les profils juniors qui utilisent le bon vocabulaire métier dès le départ.
            </p>

            <h3 id="faq-5" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment savoir quels mots-clés cibler pour une offre précise ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Lisez attentivement l&apos;offre d&apos;emploi. Les mots qui reviennent plusieurs fois dans la description du poste sont exactement ceux que le recruteur a paramétrés dans son ATS. Identifiez les 5 à 10 termes les plus présents et vérifiez qu&apos;ils apparaissent dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour aller plus loin, JobBoost analyse automatiquement la correspondance entre votre CV et une offre d&apos;emploi spécifique, et identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV.
            </p>

            {/* CTA */}
            <p className="text-gray-700 leading-8 mb-6 text-lg mt-10">
              Vous avez intégré ces mots-clés dans votre CV ? Vérifiez maintenant s&apos;il correspond à votre offre cible.
            </p>
            <div className="mt-2 mb-6">
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
