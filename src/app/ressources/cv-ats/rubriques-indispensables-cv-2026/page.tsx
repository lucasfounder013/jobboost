import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "../quest-ce-qu-un-ats/ShareButtons";

export const metadata = {
  title: "Les rubriques indispensables d'un CV en 2026 | JobBoost",
  description:
    "Quelles rubriques mettre sur son CV en 2026 ? Celles que tous les recruteurs cherchent, celles à éviter, et celles qui font vraiment la différence.",
};

const TOC = [
  { id: "informations-personnelles",    titre: "Les informations personnelles",         niveau: 2 },
  { id: "titre-de-poste",              titre: "Le titre de poste",                     niveau: 2 },
  { id: "accroche-resume",             titre: "L'accroche ou résumé de profil",        niveau: 2 },
  { id: "experiences-professionnelles", titre: "Les expériences professionnelles",      niveau: 2 },
  { id: "formation",                   titre: "La formation",                          niveau: 2 },
  { id: "competences",                 titre: "Les compétences",                       niveau: 2 },
  { id: "langues",                     titre: "Les langues",                           niveau: 2 },
  { id: "rubriques-optionnelles",      titre: "Les rubriques optionnelles",            niveau: 2 },
  { id: "ce-quil-faut-retenir",        titre: "Ce qu'il faut retenir",                niveau: 2 },
  { id: "ce-que-fait-jobboost",        titre: "Ce que fait JobBoost",                 niveau: 2 },
];

export default function ArticleRubriquesCV() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm shadow-indigo-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              JobBoost
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/ressources"
              className="px-4 py-2 rounded-lg text-gray-900 font-semibold transition-all duration-150"
            >
              Ressources
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150"
            >
              Tarifs
            </Link>
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-150"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                S&apos;inscrire gratuitement
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">CV &amp; ATS</Link>
          <span>›</span>
          <span className="text-gray-600">Les rubriques indispensables d&apos;un CV en 2026</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Les rubriques indispensables d&apos;un CV en 2026
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
              <span>31 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>7 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un CV n&apos;est pas une liste exhaustive de tout ce que vous avez fait.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est une sélection de ce qui est pertinent pour le poste que vous visez.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais certaines rubriques sont attendues par tous les recruteurs, qu&apos;ils lisent votre CV directement ou via un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les ignorer, c&apos;est prendre le risque de ne pas être pris au sérieux. Les mal nommer, c&apos;est risquer de ne pas être trouvé dans une base de données ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici ce qui doit figurer sur votre CV en 2026, et dans quel ordre.
            </p>

            {/* Section 1 */}
            <h2 id="informations-personnelles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les informations personnelles
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est la première chose que voit le recruteur, et la première chose que parse un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui doit y figurer obligatoirement : votre nom et prénom, votre numéro de téléphone, votre adresse email, votre ville et pays si vous postulez à l&apos;international.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui est optionnel selon le contexte : votre profil LinkedIn, votre portfolio ou site personnel si votre métier s&apos;y prête, votre adresse postale complète si elle est demandée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qu&apos;il vaut mieux éviter : votre date de naissance, votre situation familiale, votre nationalité, sauf si l&apos;offre le demande explicitement.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Placez vos coordonnées dans le corps du document, pas dans l&apos;en-tête. Certains ATS ne lisent pas les en-têtes.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="titre-de-poste" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le titre de poste
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est la rubrique la plus sous-estimée du CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et pourtant c&apos;est souvent la première chose qu&apos;un recruteur lit dans une fiche ATS, et le premier mot-clé qu&apos;il tape dans sa barre de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre titre de poste doit correspondre exactement au poste que vous visez, pas à votre titre officiel si celui-ci est peu lisible ou propre à votre entreprise.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous êtes &ldquo;Chargé de mission digital et innovation&rdquo; mais que vous postulez à un poste de &ldquo;Chef de projet digital&rdquo;, mettez &ldquo;Chef de projet digital&rdquo; comme titre sur votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas mentir. C&apos;est parler le même langage que le recruteur.
            </p>

            {/* Section 3 */}
            <h2 id="accroche-resume" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              L&apos;accroche ou résumé de profil
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette rubrique est optionnelle mais de plus en plus recommandée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il s&apos;agit de 3 à 5 lignes maximum qui résument qui vous êtes professionnellement, ce que vous apportez, et ce que vous cherchez.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Son avantage pour un lecteur humain : il comprend immédiatement votre profil sans avoir à lire tout le CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Son avantage pour un ATS : c&apos;est un endroit supplémentaire pour intégrer naturellement des mots-clés pertinents.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Son principal piège : elle est souvent trop vague ou trop générique. &ldquo;Professionnel dynamique et rigoureux&rdquo; ne dit rien à personne.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Une bonne accroche dit ce que vous faites, pour qui, et avec quels résultats concrets. Pas ce que vous êtes en tant que personne.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="experiences-professionnelles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les expériences professionnelles
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est le cœur du CV. C&apos;est là que le recruteur passe le plus de temps, et là que l&apos;ATS extrait le plus d&apos;informations.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La structure attendue pour chaque expérience : le titre du poste, le nom de l&apos;entreprise, les dates de début et de fin, la ville ou le pays, et une description de vos missions et réalisations.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui fait la différence : les réalisations chiffrées quand c&apos;est possible. &ldquo;Augmentation du chiffre d&apos;affaires de 20%&rdquo; est infiniment plus convaincant que &ldquo;participation au développement commercial&rdquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ordre : toujours du plus récent au plus ancien. C&apos;est la convention universelle, les recruteurs et les ATS s&apos;y attendent.
            </p>

            {/* Section 5 */}
            <h2 id="formation" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              La formation
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La rubrique formation suit les expériences pour les profils avec de l&apos;expérience, et les précède pour les jeunes diplômés ou les profils en reconversion.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui doit y figurer : le diplôme obtenu, l&apos;établissement, l&apos;année d&apos;obtention, et éventuellement la spécialisation si elle est pertinente pour le poste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qu&apos;il vaut mieux éviter : remonter trop loin dans votre scolarité. Le baccalauréat n&apos;a plus d&apos;intérêt si vous avez un master ou plusieurs années d&apos;expérience.
            </p>

            {/* Section 6 */}
            <h2 id="competences" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les compétences
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est la rubrique la plus importante pour les ATS, et souvent la plus mal construite par les candidats.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les compétences doivent être listées en texte brut, pas sous forme de barres de progression, d&apos;étoiles ou de graphiques. Ces éléments visuels sont invisibles pour un ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Distinguez les compétences techniques, les logiciels, les langages, les outils, des compétences transversales, la gestion de projet, la négociation, la communication.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Utilisez les mots exacts de l&apos;offre à laquelle vous postulez. Si l&apos;offre dit &ldquo;Excel avancé&rdquo;, écrivez &ldquo;Excel avancé&rdquo;, pas &ldquo;maîtrise des tableurs&rdquo;.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Vos compétences en étoiles ou en barres sont invisibles pour un ATS. Seul le texte compte.
              </p>
            </blockquote>

            {/* Section 7 */}
            <h2 id="langues" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les langues
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Simple et attendue, cette rubrique doit mentionner chaque langue avec votre niveau réel.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les niveaux reconnus internationalement : A1, A2, B1, B2, C1, C2, ou leur équivalent en langage courant, débutant, intermédiaire, courant, bilingue, langue maternelle.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Évitez les formulations vagues comme &ldquo;notions d&apos;anglais&rdquo; ou &ldquo;anglais scolaire&rdquo;. Elles signifient la même chose pour tout le monde, et ce n&apos;est pas rassurant.
            </p>

            {/* Section 8 */}
            <h2 id="rubriques-optionnelles" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les rubriques optionnelles
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Selon votre profil et le poste visé, certaines rubriques peuvent apporter une vraie valeur ajoutée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les certifications et formations courtes : très utiles dans les métiers tech, le marketing digital, la gestion de projet.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les projets personnels ou associatifs : pertinents s&apos;ils illustrent des compétences directement liées au poste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les publications ou interventions : utiles pour les profils experts ou les postes à forte dimension thought leadership.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les loisirs et centres d&apos;intérêt : à inclure seulement s&apos;ils disent quelque chose d&apos;intéressant sur vous ou sont en lien avec le poste. Sinon, ils prennent de la place inutilement.
            </p>

            {/* Section 9 */}
            <h2 id="ce-quil-faut-retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un CV en 2026 doit contenir dans l&apos;ordre : vos informations personnelles, votre titre de poste, une accroche optionnelle, vos expériences professionnelles, votre formation, vos compétences et vos langues.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Nommez chaque rubrique de façon explicite et conventionnelle. Les ATS comme les recruteurs s&apos;attendent à retrouver ces titres standards.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et adaptez le contenu de chaque rubrique aux mots-clés de l&apos;offre à laquelle vous postulez.
            </p>

            {/* Section 10 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse votre CV face à une offre d&apos;emploi et identifie les mots-clés de l&apos;offre qui manquent dans vos rubriques.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il vous indique exactement quoi ajuster pour que votre CV soit trouvé par le recruteur qui cherche votre profil.
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
          </article>

          {/* TOC sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">

              {/* Table des matières */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-6 mb-6">
                <p className="text-base font-bold text-gray-900 mb-5">
                  Table des matières
                </p>
                <nav className="space-y-1">
                  {TOC.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block text-sm text-gray-500 hover:text-violet-600 transition-colors py-1 leading-snug ${
                        section.niveau === 3 ? "ml-4 text-xs text-gray-400 hover:text-violet-500" : ""
                      }`}
                    >
                      {section.titre}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Partager */}
              <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-6">
                <p className="text-base font-bold text-gray-900 mb-4">
                  Partager cet article
                </p>
                <ShareButtons />
              </div>

            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
