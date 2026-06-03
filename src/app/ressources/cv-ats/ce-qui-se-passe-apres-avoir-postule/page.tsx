import Link from "next/link";
import Footer from "@/components/Footer";
import ShareButtons from "../quest-ce-qu-un-ats/ShareButtons";

export const metadata = {
  title: "Ce qui se passe vraiment après que vous avez postulé | JobBoost",
  description:
    "Entre le moment où vous envoyez votre candidature et le premier appel du recruteur, que se passe-t-il vraiment ? Voici les coulisses d'un recrutement, étape par étape.",
};

const TOC = [
  { id: "etape-1-ats",          titre: "Étape 1 - votre CV entre dans l'ATS",             niveau: 2 },
  { id: "etape-2-attente",      titre: "Étape 2 - personne ne lit votre CV tout de suite", niveau: 2 },
  { id: "etape-3-filtrage",     titre: "Étape 3 - le recruteur filtre la base",             niveau: 2 },
  { id: "etape-4-fiches",       titre: "Étape 4 - le recruteur consulte les fiches",        niveau: 2 },
  { id: "etape-5-preselection", titre: "Étape 5 - la présélection",                         niveau: 2 },
  { id: "etape-6-contact",      titre: "Étape 6 - le premier contact",                      niveau: 2 },
  { id: "ce-que-ca-change",     titre: "Ce que ça change pour votre candidature",           niveau: 2 },
  { id: "jobboost",             titre: "Ce que fait JobBoost",                               niveau: 2 },
  { id: "conclusion",           titre: "Ce qu'il faut retenir",                              niveau: 2 },
];

export default function ArticleCeQuiSePasseApresPostule() {
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
          <span className="text-gray-600">Ce qui se passe après avoir postulé</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Ce qui se passe vraiment après que vous avez postulé
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
              <span>30 mai 2026</span>
              <span className="text-gray-300">|</span>
              <span>6 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous avez cliqué sur &laquo;&nbsp;Envoyer&nbsp;&raquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre candidature est partie.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et maintenant vous attendez, sans savoir ce qui se passe de l&apos;autre côté.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici les coulisses d&apos;un recrutement, étape par étape, de votre clic jusqu&apos;au premier appel.
            </p>

            {/* Étape 1 */}
            <div id="etape-1-ats" className="mt-16 mb-5">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Étape 1</p>
              <h2 className="text-2xl font-bold text-gray-900">Votre CV entre dans l&apos;ATS</h2>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans la majorité des entreprises de plus de 50 salariés, votre candidature n&apos;arrive pas dans la boîte mail d&apos;un recruteur.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Elle entre dans un ATS, un logiciel de gestion des candidatures.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;ATS reçoit votre fichier, le lit, en extrait les informations clés, nom, coordonnées, expériences, formations, compétences, et les stocke dans une fiche candidat standardisée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre mise en page disparaît.
              Ce qui reste, c&apos;est votre contenu.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour comprendre exactement ce que contient cette fiche et ce que le recruteur voit dans son interface, consultez notre article sur <Link href="/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce que voit vraiment le recruteur dans son ATS</Link>.
            </p>

            {/* Étape 2 */}
            <div id="etape-2-attente" className="mt-16 mb-5">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Étape 2</p>
              <h2 className="text-2xl font-bold text-gray-900">Personne ne lit votre CV tout de suite</h2>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est la réalité que personne ne dit.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand votre candidature arrive, le recruteur n&apos;est pas en train d&apos;attendre devant son écran.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il a d&apos;autres candidatures à traiter, d&apos;autres postes ouverts, d&apos;autres tâches.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre CV rejoint une base de données qui peut contenir des dizaines, parfois des centaines de candidatures pour ce poste.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il sera consulté quand le recruteur décidera activement de traiter ce poste, ce qui peut prendre quelques heures comme quelques semaines.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Votre candidature n&apos;est pas ignorée. Elle attend son tour dans une file que vous ne voyez pas.
              </p>
            </blockquote>

            {/* Étape 3 */}
            <div id="etape-3-filtrage" className="mt-16 mb-5">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Étape 3</p>
              <h2 className="text-2xl font-bold text-gray-900">Le recruteur filtre la base de données</h2>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Quand le recruteur est prêt à traiter les candidatures, il ouvre son ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il ne lit pas les CV un par un dans l&apos;ordre d&apos;arrivée.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il tape des mots-clés dans une barre de recherche, exactement comme on cherche quelque chose sur Google.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les profils qui correspondent remontent.
              Les autres restent invisibles.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est à cette étape que se joue l&apos;essentiel pour votre candidature. Pas à l&apos;étape du parsing, pas à celle du score, mais ici, quand un humain cherche activement un profil comme le vôtre.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est pourquoi <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">l&apos;idée d&apos;un robot qui rejette automatiquement votre CV est un mythe</Link> : c&apos;est toujours un humain qui décide.
            </p>

            {/* Étape 4 */}
            <div id="etape-4-fiches" className="mt-16 mb-5">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Étape 4</p>
              <h2 className="text-2xl font-bold text-gray-900">Le recruteur consulte les fiches</h2>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour chaque profil qui remonte, le recruteur ouvre la fiche candidat.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il regarde votre titre de poste actuel, vos dernières expériences, votre localisation.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il décide en quelques secondes si votre profil mérite une lecture plus attentive.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si oui, il fait défiler la fiche complète, vérifie les dates, lit les compétences.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans certains ATS, il peut accéder à votre fichier original en un clic, votre vrai CV, avec sa mise en page. C&apos;est seulement à ce moment que votre document original est vu par un humain.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Vous avez quelques secondes pour convaincre sur la fiche candidat, avant même que votre vrai CV soit ouvert.
              </p>
            </blockquote>

            {/* Étape 5 */}
            <div id="etape-5-preselection" className="mt-16 mb-5">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Étape 5</p>
              <h2 className="text-2xl font-bold text-gray-900">La présélection</h2>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le recruteur classe les profils qui l&apos;intéressent.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Dans son ATS, il peut les déplacer dans différentes colonnes de son pipeline, &laquo;&nbsp;à contacter&nbsp;&raquo;, &laquo;&nbsp;entretien téléphonique&nbsp;&raquo;, &laquo;&nbsp;à revoir plus tard&nbsp;&raquo;.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les autres restent dans la base de données sans être déplacés.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il n&apos;y a souvent pas de refus explicite à cette étape, d&apos;où le silence que beaucoup de candidats vivent comme une réponse négative.
            </p>

            {/* Étape 6 */}
            <div id="etape-6-contact" className="mt-16 mb-5">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Étape 6</p>
              <h2 className="text-2xl font-bold text-gray-900">Le premier contact</h2>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Si votre profil est présélectionné, le recruteur vous contacte.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Souvent par email depuis l&apos;ATS, parfois par téléphone directement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce premier contact est rarement un entretien complet. C&apos;est un appel de qualification de 15 à 30 minutes pour vérifier que votre profil correspond vraiment au poste avant d&apos;investir plus de temps des deux côtés.
            </p>

            {/* Ce que ça change */}
            <h2 id="ce-que-ca-change" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que ça change pour votre candidature
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Connaître ce processus change votre façon de préparer chaque candidature.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Votre titre de poste est crucial, c&apos;est la première chose que le recruteur voit dans sa fiche. Il doit correspondre exactement à ce qu&apos;il cherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Les mots-clés de l&apos;offre doivent apparaître dans votre CV, ce sont ceux que le recruteur tapera dans sa barre de recherche.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Pour structurer chaque rubrique de votre CV de façon à être trouvé, consultez notre guide sur <Link href="/ressources/cv-ats/rubriques-indispensables-cv-2026" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">les rubriques indispensables d&apos;un CV en 2026</Link>.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La patience est nécessaire, entre votre candidature et le premier contact il peut se passer plusieurs semaines sans que cela signifie un refus.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Relancer est légitime, une semaine à dix jours après votre candidature, un email poli de relance est tout à fait approprié et peut faire remonter votre profil dans l&apos;attention du recruteur.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Comprendre le processus, c&apos;est arrêter de subir l&apos;attente et commencer à anticiper chaque étape.
              </p>
            </blockquote>

            {/* JobBoost */}
            <h2 id="jobboost" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce que fait JobBoost
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              JobBoost vous aide à franchir l&apos;étape la plus décisive de ce processus, celle où le recruteur tape des mots-clés dans son ATS.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Il analyse votre CV face à une offre d&apos;emploi et identifie les mots-clés de l&apos;offre qui manquent dans votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              L&apos;objectif : que votre profil remonte quand le recruteur cherche.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Analyser mon CV gratuitement →
              </Link>
            </div>

            {/* Conclusion */}
            <h2 id="conclusion" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Entre votre clic sur &laquo;&nbsp;Envoyer&nbsp;&raquo; et le premier appel du recruteur, votre CV est parsé par un ATS, stocké dans une base de données, puis trouvé ou non trouvé quand le recruteur filtre activement.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce n&apos;est pas un algorithme qui décide de votre sort. C&apos;est un humain qui cherche, et votre CV doit contenir les bons mots pour être trouvé.
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
