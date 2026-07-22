import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title:
    "5 certifications gratuites pour booster son CV en 2026 (et obtenir le certificat sans payer) | Rivjob",
  description:
    "5 certifications Google reconnues, accessibles gratuitement sur Coursera. Ce qu'elles valent vraiment sur un CV, et la méthode pour obtenir le certificat sans payer.",
  ...ogMeta(
    "5 certifications gratuites pour booster son CV en 2026 (et obtenir le certificat sans payer) | Rivjob",
    "5 certifications Google reconnues, accessibles gratuitement sur Coursera. Ce qu'elles valent vraiment sur un CV, et la méthode pour obtenir le certificat sans payer.",
    "/ressources/certifications/certifications-gratuites-2026"
  ),
};

const TOC = [
  { id: "pourquoi",         titre: "Pourquoi une certif change quelque chose sur un CV", niveau: 2 },
  { id: "les-5",            titre: "Les 5 certifications",                                niveau: 2 },
  { id: "gratuit-vraiment", titre: "Gratuit… vraiment ?",                                 niveau: 2 },
  { id: "sans-payer",       titre: "Obtenir le certificat sans payer",                    niveau: 2 },
  { id: "ou-la-mettre",     titre: "Où la mettre (et comment la formuler)",               niveau: 2 },
  { id: "score-ats",        titre: "Votre CV passe-t-il les filtres ?",                   niveau: 2 },
  { id: "retenir",          titre: "Ce qu'il faut retenir",                               niveau: 2 },
];

const CERTIFS = [
  {
    nom: "Google Data Analytics",
    lien: "https://www.coursera.org/professional-certificates/google-data-analytics",
    pour: "Vous voulez entrer dans la data sans diplôme technique.",
    apprend:
      "Nettoyer, analyser et visualiser des données, avec des outils concrets : tableur, SQL, Tableau, R. Un des rares parcours qui mène à un vrai poste (data analyst, chargé d'études) sans passer par une école d'ingénieur.",
    duree: "≈ 6 mois à raison de 10h/semaine (à votre rythme)",
  },
  {
    nom: "Google Cybersécurité",
    lien: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    pour: "Vous visez un secteur qui recrute massivement en France.",
    apprend:
      "Les bases opérationnelles de la cyber : Python, Linux, SQL, gestion des risques, détection d'incidents. La cybersécurité manque de bras partout, et les profils juniors formés sont recherchés.",
    duree: "≈ 6 mois à raison de 7h/semaine",
  },
  {
    nom: "Crash Course on Python",
    lien: "https://www.coursera.org/learn/python-crash-course",
    pour: "Vous partez de zéro et voulez apprendre à coder.",
    apprend:
      "La programmation en partant vraiment de rien. C'est le meilleur point de départ, pensé pour les grands débutants. Un seul cours (pas un parcours complet), donc rapide à boucler et facile à financer gratuitement.",
    duree: "≈ 3 semaines à raison de 5h/semaine",
  },
  {
    nom: "Google AI Essentials (IA générative)",
    lien: "https://www.coursera.org/learn/google-ai-essentials",
    pour: "Vous voulez comprendre l'IA générative et vous démarquer dans (presque) n'importe quel métier.",
    apprend:
      "Utiliser l'IA générative au quotidien : rédiger de meilleurs prompts, l'intégrer à votre travail, en connaître les limites et les risques. Pas besoin d'être technique — c'est la compétence transversale qui fait la différence en 2026.",
    duree: "≈ 10 heures au total",
  },
  {
    nom: "Google Project Management",
    lien: "https://www.coursera.org/professional-certificates/google-project-management",
    pour: "Vous voulez des compétences demandées dans tous les secteurs.",
    apprend:
      "La gestion de projet de bout en bout et la méthode Agile (Scrum). Des compétences transférables qui rassurent un recruteur, que vous visiez un poste de chef de projet ou un rôle où vous coordonnez des gens.",
    duree: "≈ 6 mois à raison de 10h/semaine",
  },
];

export default function ArticleCertifications() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <span className="text-gray-600">Certifications gratuites 2026</span>
        </div>

        <ArticleJsonLd
          titre="5 certifications gratuites pour booster son CV en 2026 (et obtenir le certificat sans payer) | Rivjob"
          description="5 certifications Google reconnues, accessibles gratuitement sur Coursera. Ce qu'elles valent vraiment sur un CV, et la méthode pour obtenir le certificat sans payer."
          slug="/ressources/certifications/certifications-gratuites-2026"
          datePublication="2026-07-23"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Certifications gratuites 2026", url: "/ressources/certifications/certifications-gratuites-2026" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          5 certifications gratuites pour booster son CV en 2026 (et obtenir le certificat sans payer)
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
              <span>23 juillet 2026</span>
              <span className="text-gray-300">|</span>
              <span>5 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ajouter une certification reconnue sur son CV, c&apos;est l&apos;un des moyens les plus rapides de rassurer un recruteur, surtout en reconversion ou quand on manque d&apos;expérience dans un domaine.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La bonne nouvelle : les meilleures ne sont pas les plus chères. Voici 5 certifications signées Google, suivables gratuitement, qui parlent à un recruteur en 2026.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La moins bonne nouvelle, qu&apos;on ne vous dit jamais : le certificat que vous ajoutez sur LinkedIn, lui, n&apos;est pas gratuit par défaut. On vous explique aussi comment l&apos;obtenir sans payer un centime.
            </p>

            {/* Section 1 */}
            <h2 id="pourquoi" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Pourquoi une certif change quelque chose sur un CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une certification joue sur deux tableaux à la fois.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              D&apos;abord, c&apos;est une <strong>preuve</strong>. Elle dit à un recruteur &ldquo;cette personne a été jusqu&apos;au bout d&apos;un programme sérieux&rdquo;, ce qui compte double quand vous n&apos;avez pas encore l&apos;expérience terrain.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ensuite, et c&apos;est ce que la plupart des gens ignorent, une certif ajoute des <strong>mots-clés</strong> sur votre CV. &ldquo;Python&rdquo;, &ldquo;SQL&rdquo;, &ldquo;Agile&rdquo;, &ldquo;analyse de données&rdquo;… Ce sont exactement les termes que le recruteur tape dans son logiciel de recrutement pour retrouver les bons profils.
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Une certif ne se contente pas de vous former. Elle plante sur votre CV les mots que le recruteur cherchera pour vous trouver.
              </p>
            </blockquote>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              On revient sur ce mécanisme à la fin, parce que c&apos;est là que tout se joue. Pour comprendre en détail comment le recruteur cherche réellement les profils, lisez notre article sur <Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ce qu&apos;est vraiment un ATS</Link>.
            </p>

            {/* Section 2 */}
            <h2 id="les-5" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Les 5 certifications
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Toutes sont sur Coursera, signées Google, et pensées pour des débutants. Vous n&apos;avez besoin d&apos;aucun prérequis technique.
            </p>

            {CERTIFS.map((c, i) => (
              <div key={c.nom} className="mb-8 rounded-2xl ring-1 ring-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {i + 1}. {c.nom}
                </h3>
                <p className="text-gray-700 leading-8 mb-3 text-lg">
                  <span className="font-semibold text-gray-900">Pour qui : </span>{c.pour}
                </p>
                <p className="text-gray-700 leading-8 mb-3 text-lg">
                  <span className="font-semibold text-gray-900">Ce que vous apprenez : </span>{c.apprend}
                </p>
                <p className="text-gray-600 leading-8 mb-4 text-base">
                  <span className="font-semibold text-gray-900">Durée : </span>{c.duree}
                </p>
                <a
                  href={c.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-800 font-semibold text-sm underline underline-offset-2"
                >
                  Voir la certification sur Coursera →
                </a>
              </div>
            ))}

            {/* Section 3 */}
            <h2 id="gratuit-vraiment" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Gratuit… vraiment ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Soyons honnêtes, parce que c&apos;est le genre de détail qu&apos;on vous cache souvent.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Sur Coursera, vous pouvez <strong>suivre le contenu gratuitement</strong> en mode &ldquo;audit&rdquo; : les vidéos, les lectures, les cours. Ça, c&apos;est vraiment gratuit, pour tout le monde.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais deux choses ne sont <em>pas</em> incluses dans l&apos;audit gratuit : les exercices notés, et surtout <strong>le certificat</strong>, celui que vous voulez afficher sur LinkedIn. Pour le débloquer, Coursera demande normalement un abonnement (Coursera Plus, environ 59&nbsp;€/mois).
            </p>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Le cours est gratuit. Le certificat, lui, est payant par défaut. Mais il existe une porte d&apos;entrée officielle, gratuite, que peu de gens utilisent.
              </p>
            </blockquote>

            {/* Section 4 */}
            <h2 id="sans-payer" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Obtenir le certificat sans payer
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cette porte, c&apos;est l&apos;<strong>aide financière</strong> de Coursera (&ldquo;Financial Aid&rdquo;). C&apos;est un dispositif officiel : si vous ne pouvez pas payer l&apos;abonnement, Coursera vous offre l&apos;accès complet, certificat inclus, à 0&nbsp;€.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Voici comment ça marche, étape par étape :
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-2 text-lg">
              <li>Ouvrez la page de la certification sur Coursera et cliquez sur <strong>&ldquo;S&apos;inscrire&rdquo;</strong>.</li>
              <li>Sous le bouton de paiement, cherchez le lien <strong>&ldquo;Aide financière disponible&rdquo;</strong> (&ldquo;Financial aid available&rdquo;) et cliquez dessus.</li>
              <li>Remplissez le formulaire : quelques questions sur votre situation (revenus) et sur <strong>pourquoi</strong> ce cours compte pour vous. Prenez ces réponses au sérieux, c&apos;est ce qui déclenche l&apos;acceptation.</li>
              <li>Validez, puis patientez : la réponse arrive en général sous <strong>~15 jours</strong>.</li>
              <li>Une fois accepté, vous avez accès à tout, gratuitement, certificat compris.</li>
            </ol>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Un point à connaître : sur les parcours complets (Data Analytics, Cybersécurité, Project Management), l&apos;aide financière se demande <strong>cours par cours</strong> à l&apos;intérieur du parcours. C&apos;est un peu répétitif, mais c&apos;est gratuit. Le &ldquo;Crash Course on Python&rdquo; et &ldquo;AI Essentials&rdquo; sont des cours uniques : une seule demande suffit.
            </p>

            {/* Section 5 */}
            <h2 id="ou-la-mettre" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Où la mettre (et comment la formuler)
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Une fois le certificat obtenu, deux endroits comptent : la section <strong>&ldquo;Licences et certifications&rdquo;</strong> de votre profil LinkedIn, et une rubrique <strong>&ldquo;Formations&rdquo;</strong> ou &ldquo;Certifications&rdquo; sur votre CV.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Mais ne vous arrêtez pas au nom de la certif. Ce qui vous rend &ldquo;trouvable&rdquo;, ce sont les <strong>compétences</strong> qu&apos;elle vous a apportées, formulées avec les mots exacts que le recruteur cherche.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Après Data Analytics, écrivez &ldquo;SQL&rdquo;, &ldquo;Tableau&rdquo;, &ldquo;analyse de données&rdquo; dans vos compétences.</li>
              <li>Après Project Management, écrivez &ldquo;Agile&rdquo;, &ldquo;Scrum&rdquo;, &ldquo;gestion de projet&rdquo;.</li>
              <li>Après AI Essentials, écrivez &ldquo;IA générative&rdquo;, &ldquo;prompt engineering&rdquo;.</li>
            </ul>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est ce vocabulaire, bien plus que le logo de la certif, qui fait remonter votre profil quand un recruteur filtre sa base de candidats.
            </p>

            {/* Section 6 — CTA */}
            <h2 id="score-ats" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Votre CV passe-t-il les filtres ?
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous pouvez décrocher les 5 certifications : si les bons mots-clés ne figurent pas au bon endroit sur votre CV, le recruteur ne vous trouvera pas.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Avant votre prochaine candidature, vérifiez comment votre CV se positionne face à une offre précise. Rivjob compare gratuitement votre CV à une offre d&apos;emploi et vous montre les mots-clés qui manquent, en 30 secondes, sans inscription.
            </p>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Tester mon CV gratuitement →
              </Link>
            </div>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Vous voulez d&apos;abord vérifier si votre CV est bien lisible par les logiciels de recrutement ? Voyez <Link href="/ressources/cv-ats/tester-son-cv-ats-gratuitement" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">comment tester son CV ATS gratuitement</Link>.
            </p>

            {/* Section 7 */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Cinq certifications Google, gratuites à suivre, qui parlent à un recruteur : Data Analytics, Cybersécurité, Python, IA générative, Project Management.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Le contenu est gratuit en audit. Le certificat est payant par défaut, mais l&apos;aide financière de Coursera vous le donne gratuitement si vous en faites la demande.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Et une fois la certif en poche, ce qui compte vraiment, c&apos;est d&apos;en tirer les bons mots-clés sur votre CV, pour que le recruteur tombe sur vous quand il cherche le bon profil.
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
