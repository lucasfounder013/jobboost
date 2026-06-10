import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title: "Comment écrire une lettre de motivation en 2026 : méthode, exemples et erreurs | JobBoost",
  description:
    "La méthode en 4 étapes pour écrire une lettre de motivation efficace en 2026. Exemples concrets, erreurs à éviter, et conseils pour décrocher un entretien.",
  ...ogMeta(
    "Comment écrire une lettre de motivation en 2026 : méthode, exemples et erreurs | JobBoost",
    "La méthode en 4 étapes pour écrire une lettre de motivation efficace en 2026. Exemples concrets, erreurs à éviter, et conseils pour décrocher un entretien.",
    "/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation"
  ),
};

const TOC = [
  { id: "pourquoi-ldm",        titre: "La lettre de motivation en 2026 : encore utile ?",  niveau: 2 },
  { id: "deux-erreurs",        titre: "Les 2 erreurs que font 90 % des candidats",          niveau: 2 },
  { id: "methode-4-etapes",    titre: "La méthode en 4 étapes",                             niveau: 2 },
  { id: "etape-1-accroche",    titre: "Étape 1 : l'accroche",                               niveau: 3 },
  { id: "etape-2-valeur",      titre: "Étape 2 : votre valeur ajoutée",                     niveau: 3 },
  { id: "etape-3-entreprise",  titre: "Étape 3 : la connexion avec l'entreprise",           niveau: 3 },
  { id: "etape-4-cta",         titre: "Étape 4 : la conclusion et l'appel à l'action",      niveau: 3 },
  { id: "exemple-complet",     titre: "Exemple complet annoté",                             niveau: 2 },
  { id: "format-longueur",     titre: "Format et longueur",                                 niveau: 2 },
  { id: "erreurs-a-eviter",    titre: "Les erreurs à éviter",                               niveau: 2 },
  { id: "faq",                 titre: "FAQ",                                                 niveau: 2 },
];

export default function ArticleCommentEcrireLDM() {
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
          <span className="text-gray-600">Comment écrire une lettre de motivation</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Comment écrire une lettre de motivation en 2026 : méthode, exemples et erreurs à éviter
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
              <span>8 juin 2026</span>
              <span className="text-gray-300">|</span>
              <span>9 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              60 % des offres d&apos;emploi demandent encore une lettre de motivation. Les recruteurs la lisent en moins de 30 secondes. Et pourtant, une lettre bien construite multiplie par trois les chances d&apos;obtenir un entretien.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le problème : la grande majorité des candidats copient un modèle générique trouvé en ligne, remplacent le nom de l&apos;entreprise, et envoient le même texte à dix recruteurs différents. Le résultat est prévisible.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cet article vous donne une méthode concrète en 4 étapes, des exemples annotés pour comprendre ce qui fonctionne, et la liste des erreurs qui coûtent des entretiens chaque jour.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi-ldm" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              La lettre de motivation en 2026 : encore utile ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La question revient souvent. La réponse courte : oui, dans la plupart des contextes.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La lettre de motivation n&apos;est pas lue par un ATS. Elle intervient après que votre CV a déjà passé le filtre automatique. Pour comprendre exactement <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe après que vous avez postulé</Link>, retenez ceci : l&apos;ATS trie les CV, puis un humain lit ce qui reste. La lettre de motivation, c&apos;est ce que cet humain lit en second.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Son rôle est précis : convaincre le recruteur que vous avez compris le poste, que vous pouvez l&apos;occuper, et que vous méritez 30 minutes de son temps. Le CV liste ce que vous avez fait. La lettre explique pourquoi c&apos;est pertinent pour eux maintenant.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                La lettre de motivation ne remplace pas un bon CV. Elle le complète quand le CV a déjà passé le filtre ATS et qu&apos;un recruteur vous lit pour la première fois.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="deux-erreurs" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 2 erreurs que font 90 % des candidats
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 1 : parler de soi plutôt que de l&apos;entreprise
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La quasi-totalité des lettres de motivation commence par le candidat : son parcours, ses aspirations, sa passion. C&apos;est une erreur de perspective. Le recruteur ne cherche pas à satisfaire vos ambitions. Il cherche à résoudre un problème dans son équipe.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne question à se poser avant d&apos;écrire : quel est le problème que ce poste doit résoudre ? La lettre doit montrer que vous êtes la solution, pas que vous avez envie d&apos;un nouveau défi.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Erreur classique vs bonne approche</p>
              <p className="text-gray-500 line-through text-lg">Mon parcours de 5 ans dans le marketing digital m&apos;a amené à développer une expertise solide que je souhaite mettre au service de votre entreprise.</p>
              <p className="text-gray-800 font-medium text-lg">Votre équipe marketing cherche à accélérer l&apos;acquisition B2B sur un marché de plus en plus concurrentiel. En trois ans chez Alma, j&apos;ai porté le trafic organique de 0 à 80 000 visiteurs mensuels et réduit le coût par lead de 40 %.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Erreur 2 : l&apos;ouverture cliché
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              &ldquo;Je me permets de vous contacter suite à votre annonce publiée sur...&rdquo; est la formule la plus utilisée dans les lettres de motivation françaises. Elle est aussi la plus inefficace. Elle dit exactement ce que le recruteur sait déjà : vous avez vu l&apos;annonce et vous postulez.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La première phrase doit faire une chose : donner envie de lire la deuxième. Elle doit être spécifique, directe, et centrée sur ce que vous apportez.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Les recruteurs lisent des dizaines de lettres par semaine. La vôtre doit commencer par quelque chose qu&apos;ils n&apos;ont pas encore lu aujourd&apos;hui.
              </p>
            </blockquote>

            {/* Section 3 */}
            <h2 id="methode-4-etapes" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              La méthode en 4 étapes
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une lettre de motivation efficace tient en 4 paragraphes. Chacun a un rôle précis. Voici comment les construire.
            </p>

            <h3 id="etape-1-accroche" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Étape 1 : l&apos;accroche (1 à 2 phrases)
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;accroche doit poser immédiatement votre valeur ou montrer que vous avez compris le contexte de l&apos;entreprise. Pas de formule de politesse, pas d&apos;explication sur la façon dont vous avez trouvé l&apos;offre.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Exemples d&apos;accroche</p>
              <div className="space-y-3">
                <p className="text-gray-500 line-through text-lg">Je me permets de vous contacter suite à votre annonce pour le poste de Marketing Manager.</p>
                <p className="text-gray-800 font-medium text-lg">En 18 mois, j&apos;ai piloté le lancement de 3 gammes produit ayant généré 2,4 M€ de chiffre d&apos;affaires additionnel. C&apos;est ce type de défi que votre poste de Marketing Manager appelle.</p>
              </div>
              <div className="space-y-3 pt-2">
                <p className="text-gray-500 line-through text-lg">Passionné par le marketing depuis toujours, je souhaite rejoindre votre équipe.</p>
                <p className="text-gray-800 font-medium text-lg">Votre levée de série B et le recrutement d&apos;une équipe marketing structurée signalent une phase de croissance précise. J&apos;ai déjà traversé cette étape deux fois en tant que premier Marketing Manager recruté.</p>
              </div>
            </div>

            <h3 id="etape-2-valeur" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Étape 2 : votre valeur ajoutée (3 à 5 phrases)
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Identifiez 2 besoins clés de l&apos;offre et répondez-y avec des preuves chiffrées. Pas de liste de compétences, pas de résumé de CV. Des faits, avec des chiffres, reliés directement aux attentes du poste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Reprenez les termes exacts de l&apos;annonce : si l&apos;offre demande &ldquo;pilotage de campagnes Google Ads&rdquo;, utilisez cette formulation. Les recruteurs reconnaissent leurs propres mots, et cela montre que vous avez lu l&apos;offre sérieusement. C&apos;est la même logique que pour <Link href="/ressources/cv-ats/mots-cles-cv-marketing-manager" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les mots-clés dans un CV Marketing Manager</Link> : le vocabulaire de l&apos;offre doit apparaître dans votre candidature.
            </p>

            <h3 id="etape-3-entreprise" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Étape 3 : la connexion avec l&apos;entreprise (2 à 3 phrases)
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Montrez que vous avez fait une recherche réelle sur l&apos;entreprise. Pas &ldquo;votre entreprise est leader sur son marché&rdquo;, qui ne dit rien. Quelque chose de précis : un produit récent, une décision stratégique, un article de presse, une valeur affichée qui correspond à votre façon de travailler.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Connexion vague vs connexion précise</p>
              <p className="text-gray-500 line-through text-lg">Votre entreprise est reconnue dans son secteur et ses valeurs correspondent à mes aspirations professionnelles.</p>
              <p className="text-gray-800 font-medium text-lg">Votre décision de passer à un modèle freemium en janvier dernier, combinée à la refonte de votre onboarding, indique un pivot vers l&apos;acquisition organique. C&apos;est précisément le type de transition sur laquelle j&apos;ai travaillé chez Payfit entre 2023 et 2025.</p>
            </div>

            <h3 id="etape-4-cta" className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Étape 4 : la conclusion et l&apos;appel à l&apos;action (2 phrases)
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Proposez explicitement un échange. Ne restez pas dans l&apos;attente passive. Évitez &ldquo;Dans l&apos;attente de votre retour, veuillez agréer l&apos;expression de mes sentiments distingués&rdquo; : cette formule signale une lettre copiée-collée et ne pousse à aucune action.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-4">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Conclusion passive vs conclusion active</p>
              <p className="text-gray-500 line-through text-lg">Dans l&apos;attente de votre retour, veuillez agréer l&apos;expression de mes sincères salutations.</p>
              <p className="text-gray-800 font-medium text-lg">Je serais ravi d&apos;échanger avec vous sur la façon dont mon expérience peut s&apos;articuler avec vos objectifs de croissance. Je reste disponible pour un appel à votre convenance.</p>
            </div>

            {/* Section 4 */}
            <h2 id="exemple-complet" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Exemple complet annoté
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici une lettre complète pour un poste de Marketing Manager dans une scale-up SaaS B2B. Chaque paragraphe est annoté pour montrer la logique appliquée.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 my-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">Accroche : résultat chiffré + contexte du poste</p>
                <p className="text-gray-800 text-lg leading-8">En deux ans, j&apos;ai porté le MRR de Legalstart de 800 K€ à 2,1 M€ grâce à une stratégie d&apos;inbound couplée à des campagnes SEA restructurées. Votre poste de Marketing Manager appelle exactement ce profil : quelqu&apos;un capable de piloter la croissance sans augmenter proportionnellement les budgets.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">Valeur ajoutée : 2 besoins de l&apos;offre adressés avec preuves</p>
                <p className="text-gray-800 text-lg leading-8">Votre annonce cite la structuration du funnel d&apos;acquisition et le pilotage des KPIs marketing comme priorités. Sur le funnel, j&apos;ai déployé HubSpot de zéro, mis en place un scoring des leads et réduit le cycle de vente moyen de 45 à 28 jours. Sur les KPIs, j&apos;ai construit le tableau de bord hebdomadaire présenté au CODIR, intégrant ROAS, CAC et LTV par segment.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">Connexion : observation précise sur l&apos;entreprise</p>
                <p className="text-gray-800 text-lg leading-8">Votre lancement de la fonctionnalité de signature électronique en mars et le partenariat avec Pennylane indiquent une stratégie d&apos;élargissement du périmètre vers les TPE et les experts-comptables. C&apos;est un segment que je connais bien : j&apos;ai piloté deux lancements sur ce même profil de clients chez Legalstart.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-500 uppercase tracking-widest mb-2">Conclusion : appel à l&apos;action direct</p>
                <p className="text-gray-800 text-lg leading-8">Je serais heureux d&apos;échanger sur la façon dont cette expérience peut accélérer vos objectifs pour 2026. Je reste disponible pour un appel cette semaine ou la suivante.</p>
              </div>
            </div>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Cette lettre fait 280 mots. Elle répond à 4 questions dans l&apos;ordre exact où le recruteur se les pose : qui êtes-vous, que pouvez-vous faire pour moi, avez-vous compris mon contexte, et que se passe-t-il maintenant ?
              </p>
            </blockquote>

            {/* Section 5 */}
            <h2 id="format-longueur" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Format et longueur
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La longueur idéale est de 250 à 350 mots. C&apos;est ce qu&apos;un recruteur lit en 30 secondes sans se sentir submergé. Au-delà, les chances d&apos;être lu en entier chutent.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>4 paragraphes maximum</strong> : accroche, valeur, connexion, conclusion</li>
              <li><strong>Une seule page</strong> : aucune exception justifiée, quelle que soit l&apos;expérience</li>
              <li><strong>Police sobre</strong> : la même que votre CV, taille 11 ou 12, interligne 1,15</li>
              <li><strong>Marges standards</strong> : 2 à 2,5 cm, pas de mise en page complexe qui risque d&apos;être déformée</li>
              <li><strong>Objet de l&apos;email</strong> si envoi par mail : &ldquo;Candidature Marketing Manager [Prénom Nom]&rdquo;, clair et sans créativité inutile</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour le format du fichier à envoyer, le même raisonnement que pour le CV s&apos;applique. Consultez <Link href="/ressources/cv-ats/cv-pdf-ou-word-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">notre comparatif PDF ou Word pour les candidatures</Link> avant d&apos;envoyer.
            </p>

            {/* Section 6 */}
            <h2 id="erreurs-a-eviter" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les erreurs à éviter
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>
                <strong>Commencer par &ldquo;Je me permets de vous contacter&rdquo;.</strong>{" "}
                C&apos;est la phrase la plus répandue et la moins utile. Elle confirme ce que le recruteur sait déjà. Commencez par votre apport ou par une observation sur l&apos;entreprise.
              </li>
              <li>
                <strong>Recopier le CV en phrases.</strong>{" "}
                La lettre ne doit pas être une reformulation de vos expériences. Elle doit expliquer pourquoi ces expériences sont pertinentes pour ce poste précis.
              </li>
              <li>
                <strong>Employer des superlatifs non prouvés.</strong>{" "}
                &ldquo;Très motivé&rdquo;, &ldquo;passionné&rdquo;, &ldquo;dynamique&rdquo;, &ldquo;rigoureux&rdquo; : ces adjectifs n&apos;apportent rien. Remplacez-les par un fait ou un résultat.
              </li>
              <li>
                <strong>Terminer par &ldquo;Veuillez agréer l&apos;expression de mes sentiments distingués&rdquo;.</strong>{" "}
                Cette formule signale une lettre standardisée. Une conclusion directe et professionnelle est toujours préférable.
              </li>
              <li>
                <strong>Envoyer la même lettre à toutes les entreprises.</strong>{" "}
                Un recruteur détecte immédiatement une lettre générique. Le nom de l&apos;entreprise seul ne suffit pas : la connexion doit être réelle.
              </li>
              <li>
                <strong>Dépasser une page.</strong>{" "}
                Au-delà de 350 mots, la lettre perd en impact. Si vous avez du mal à faire court, c&apos;est souvent le signe que le message n&apos;est pas encore clair.
              </li>
              <li>
                <strong>Ne pas relire avant d&apos;envoyer.</strong>{" "}
                Une faute d&apos;orthographe dans une lettre de motivation est éliminatoire pour la plupart des recruteurs. Relisez à voix haute, ou utilisez un correcteur.
              </li>
            </ul>

            {/* Section 7 : FAQ */}
            <h2 id="faq" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              FAQ
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Faut-il toujours envoyer une lettre de motivation si elle n&apos;est pas demandée ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pas systématiquement. Si l&apos;offre ne la mentionne pas et que le processus de candidature est entièrement en ligne (formulaire, dépôt de CV uniquement), une LDM non sollicitée peut passer inaperçue. En revanche, pour les candidatures spontanées ou les postes où la culture d&apos;entreprise est centrale, elle reste un avantage. Pour comprendre <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment votre dossier est traité côté recruteur</Link>, l&apos;article de référence explique les étapes entre votre envoi et le premier contact.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Combien de temps un recruteur passe-t-il à lire une lettre de motivation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Entre 15 et 45 secondes en moyenne, selon les études sur le comportement des recruteurs. Cela correspond à une lecture des deux premiers paragraphes, rarement plus. C&apos;est la raison pour laquelle l&apos;accroche est déterminante : si elle n&apos;accroche pas, la suite n&apos;est pas lue.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Peut-on utiliser l&apos;IA pour écrire sa lettre de motivation ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Oui, à condition de personnaliser le résultat. L&apos;IA peut générer une structure solide et suggérer des formulations, mais elle ne connaît pas votre parcours spécifique, vos chiffres réels, ni le contexte particulier de l&apos;entreprise que vous ciblez. Une lettre entièrement générée et non retravaillée a le même défaut qu&apos;un modèle copié-collé : elle est générique.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne approche : utiliser l&apos;IA pour la structure et les formulations, puis injecter vos propres résultats chiffrés et votre connexion réelle avec l&apos;entreprise.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Comment personnaliser sa lettre rapidement pour chaque offre ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Identifiez d&apos;abord les 3 mots-clés ou compétences les plus répétés dans l&apos;offre. Vérifiez qu&apos;ils apparaissent dans votre lettre, dans leur formulation exacte. Puis cherchez une information récente sur l&apos;entreprise (LinkedIn, presse, site) pour nourrir le paragraphe de connexion. L&apos;ensemble de cette personnalisation ne devrait pas prendre plus de 20 minutes pour chaque candidature sérieuse.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse la correspondance entre votre CV et une offre et identifie les mots-clés manquants, ce qui accélère aussi la préparation de votre lettre.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
              Quelle différence entre une LDM pour un grand groupe et une startup ?
            </h3>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le fond est le même : résultat, preuve, connexion, appel à l&apos;action. La forme change légèrement. Pour un grand groupe, la lettre peut être plus formelle dans le ton, avec des références à des processus structurés et des périmètres larges. Pour une startup, le ton peut être plus direct et la connexion avec la vision de l&apos;entreprise plus personnelle. Dans les deux cas, les clichés sont aussi inefficaces.
            </p>

            {/* Section 8 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost pour votre candidature
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une bonne lettre de motivation commence par une bonne connaissance de l&apos;offre : les compétences attendues, les mots-clés utilisés, les priorités du recruteur. C&apos;est exactement ce que JobBoost fait pour votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En analysant la correspondance entre votre CV et une offre d&apos;emploi, il identifie les termes présents dans l&apos;annonce qui manquent dans votre dossier. Ces termes sont aussi ceux que vous devez faire apparaître dans votre lettre de motivation pour que l&apos;ensemble de votre candidature soit cohérent.
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
