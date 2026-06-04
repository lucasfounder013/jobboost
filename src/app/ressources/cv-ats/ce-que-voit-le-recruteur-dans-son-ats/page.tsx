import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "../quest-ce-qu-un-ats/ShareButtons";

export const metadata = {
  title: "Ce que voit le recruteur dans son ATS quand il reçoit votre CV | JobBoost",
  description:
    "Vous imaginez un algorithme qui juge votre CV. Voici ce que voit vraiment un recruteur dans son ATS, et ce qui attire son attention en premier.",
};

const TOC = [
  { id: "fiche-candidat",   titre: "Une fiche candidat, pas un CV",                   niveau: 2 },
  { id: "premier-coup-oeil", titre: "Ce que le recruteur voit en premier",             niveau: 2 },
  { id: "barre-recherche",  titre: "La barre de recherche est son meilleur ami",       niveau: 2 },
  { id: "ensuite",          titre: "Ce qu'il fait ensuite",                            niveau: 2 },
  { id: "ne-voit-pas",      titre: "Ce que le recruteur ne voit pas",                 niveau: 2 },
  { id: "change-pour-cv",   titre: "Ce que ça change pour votre CV",                  niveau: 2 },
  { id: "ce-que-fait-jobboost", titre: "Ce que fait JobBoost",                        niveau: 2 },
  { id: "retenir",          titre: "Ce qu'il faut retenir",                           niveau: 2 },
];

export default function ArticleCeQueVoitLeRecruteur() {
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
          <span className="text-gray-600">Ce que voit le recruteur dans son ATS</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Ce que voit vraiment le recruteur dans son ATS quand il reçoit votre CV
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
              <span>16 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>4 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              On imagine souvent un algorithme froid.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un robot qui scanne, qui score, qui élimine.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La réalité est beaucoup plus humaine que ça.
            </p>

            {/* Section 1 */}
            <h2 id="fiche-candidat" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Une fiche candidat, pas un CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand votre CV arrive dans un ATS, le recruteur ne voit pas votre beau document soigneusement mis en page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il voit une fiche candidat.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS a extrait les informations de votre CV et les a réorganisées dans un format standardisé : nom, coordonnées, poste actuel, expériences, formations, compétences.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Tout le monde a la même fiche. Peu importe si votre CV original était sobre ou créatif, en une colonne ou deux, avec ou sans photo.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce processus de parsing et ce qu&apos;il fait réellement sont expliqués dans notre article sur <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qu&apos;est vraiment un ATS</Link>.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Votre mise en page disparaît. Ce qui reste, c&apos;est votre contenu. Rien d&apos;autre.
              </p>
            </blockquote>

            {/* Section 2 */}
            <h2 id="premier-coup-oeil" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que le recruteur voit en premier
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans la plupart des ATS, la fiche candidat s&apos;ouvre sur un résumé en haut de page.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              En quelques secondes, le recruteur voit :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Votre nom</li>
              <li>Votre titre de poste actuel ou le dernier poste occupé</li>
              <li>Votre localisation</li>
              <li>Vos dernières expériences</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est ce résumé qui décide s&apos;il continue à lire ou passe au candidat suivant.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pas votre photo. Pas votre mise en page. Pas votre accroche soigneusement rédigée si elle n&apos;a pas été bien parsée.
            </p>

            {/* Section 3 */}
            <h2 id="barre-recherche" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              La barre de recherche est son meilleur ami
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le recruteur ne lit pas les CV un par un dans l&apos;ordre d&apos;arrivée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il ouvre son ATS et tape des mots-clés dans une barre de recherche, exactement comme vous cherchez quelque chose sur Google.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>&laquo;&nbsp;chef de projet marketing Paris&nbsp;&raquo;</li>
              <li>&laquo;&nbsp;développeur React 3 ans d&apos;expérience&nbsp;&raquo;</li>
              <li>&laquo;&nbsp;contrôleur de gestion secteur industrie&nbsp;&raquo;</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les profils qui remontent sont ceux dont la fiche contient ces mots exactement. Les autres restent dans la base de données, invisibles.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Votre CV n&apos;est pas rejeté. Il n&apos;est tout simplement pas trouvé.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="ensuite" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il fait ensuite
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si votre profil remonte dans les résultats et que le résumé l&apos;intéresse, le recruteur ouvre votre fiche complète.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il fait défiler les expériences, vérifie les dates, regarde les compétences listées.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans certains ATS, il peut aussi accéder au fichier original, votre vrai CV, en un clic. C&apos;est là que votre mise en page redevient importante.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais seulement à cette étape. Seulement si vous avez d&apos;abord été trouvé.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour une vue complète de ce parcours, de la réception de votre candidature jusqu&apos;au premier contact, lisez <Link href="/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qui se passe vraiment après avoir postulé</Link>.
            </p>

            {/* Section 5 */}
            <h2 id="ne-voit-pas" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que le recruteur ne voit pas
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Plusieurs éléments de votre CV original disparaissent souvent dans la fiche ATS :
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Votre accroche ou résumé de profil</strong>, souvent mal parsé ou ignoré selon les ATS</li>
              <li><strong>Vos compétences présentées sous forme de graphiques ou d&apos;étoiles</strong>, invisibles car l&apos;ATS ne lit pas les images</li>
              <li><strong>Vos coordonnées placées dans l&apos;en-tête ou le pied de page</strong>, certains ATS ne lisent pas ces zones</li>
              <li><strong>Vos loisirs et centres d&apos;intérêt</strong>, rarement indexés, rarement cherchés</li>
            </ul>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Ce qui ne peut pas être lu ne peut pas être trouvé. C&apos;est aussi simple que ça.
              </p>
            </blockquote>

            {/* Section 6 */}
            <h2 id="change-pour-cv" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que ça change pour votre CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si vous savez ce que voit le recruteur, vous savez quoi soigner en priorité.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Votre titre de poste</strong>, c&apos;est la première chose qu&apos;il lit. Il doit correspondre exactement à ce qu&apos;il cherche.</li>
              <li><strong>Vos expériences</strong>, formulées avec les mots exacts de votre secteur, pas des périphrases créatives.</li>
              <li><strong>Vos compétences</strong>, listées en texte, pas en graphiques.</li>
              <li><strong>Vos coordonnées</strong>, dans le corps du document, pas dans l&apos;en-tête.</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour une liste complète des rubriques à inclure et comment les nommer pour les ATS, consultez <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>

            {/* Section 7 */}
            <h2 id="ce-que-fait-jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost analyse votre CV face à une offre d&apos;emploi et identifie les mots-clés présents dans l&apos;offre qui manquent dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce sont précisément ces mots que le recruteur tapera dans son ATS pour trouver le bon profil.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que vous soyez trouvé quand il cherche.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

            {/* Section 8 */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le recruteur ne voit pas votre CV. Il voit une fiche standardisée extraite par l&apos;ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il cherche des profils via une barre de recherche, pas en lisant les CV un par un.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce qui compte : votre titre de poste, vos expériences formulées avec les bons mots, vos compétences en texte brut.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le reste est secondaire.
            </p>

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
