import Link from "next/link";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Footer from "@/components/Footer";
import ShareButtons from "./ShareButtons";
import BlocPrompt from "./BlocPrompt";
import { ogMeta } from "@/lib/seo";

export const metadata = {
  title:
    "Utiliser Claude (IA) pour décrocher un emploi : 3 prompts pour refondre votre CV | Rivjob",
  description:
    "Les 3 prompts Claude essentiels pour refondre votre CV : audit complet, réécriture optimisée ATS et test face au recruteur. Guide pas à pas.",
  ...ogMeta(
    "Utiliser Claude (IA) pour décrocher un emploi : 3 prompts pour refondre votre CV | Rivjob",
    "Les 3 prompts Claude essentiels pour refondre votre CV : audit complet, réécriture optimisée ATS et test face au recruteur. Guide pas à pas.",
    "/ressources/ia/utiliser-claude-pour-decrocher-un-emploi"
  ),
};

const TOC = [
  { id: "besoin",    titre: "Ce dont vous avez besoin",                niveau: 2 },
  { id: "etape-1",   titre: "Étape 1 : L'audit du CV",                 niveau: 2 },
  { id: "etape-2",   titre: "Étape 2 : La réécriture des expériences", niveau: 2 },
  { id: "etape-3",   titre: "Étape 3 : Le test ATS + recruteur",       niveau: 2 },
  { id: "raccourci", titre: "Le raccourci : tout en 1 clic",           niveau: 2 },
  { id: "retenir",   titre: "Ce qu'il faut retenir",                   niveau: 2 },
];

const PROMPT_AUDIT = `Joue le rôle d'un recruteur senior de cette entreprise précise.
Analyse mon CV par rapport à cette offre d'emploi.

Donne-moi :

1. Un score de correspondance sur 100
2. Les 5 principaux mots-clés manquants que l'ATS va rechercher
3. Les 3 signaux d'alerte qu'un recruteur repérerait en moins de 10 secondes
4. Les sections solides, et pourquoi
5. Les sections faibles, et pourquoi
6. Une comparaison entre mon CV et le profil d'un candidat idéal pour ce poste

Sois d'une honnêteté brutale. Je préfère corriger les problèmes maintenant plutôt que de rester sans réponse plus tard.`;

const PROMPT_REECRITURE = `Réécris ma section « Expériences » en respectant ces règles :

1. Intègre naturellement les mots-clés manquants que tu as identifiés, mais ne les force PAS. Ils doivent s'insérer naturellement dans chaque point.

2. Supprime ou corrige chacun des signaux d'alerte que tu as relevés.

3. Applique la formule XYZ de Google à chaque point : « Accompli [X], mesuré par [Y], en faisant [Z] »

4. Commence chaque point par un verbe d'action fort. N'utilise jamais « Responsable de » ou « Participation à ».

5. Ajoute des chiffres précis partout où c'est possible. Si je n'ai pas fourni de chiffres, propose des valeurs réalistes que je pourrai remplacer plus tard et signale-les avec [À COMPLÉTER].

6. Limite chaque point à 1 ou 2 lignes maximum. Les recruteurs survolent. Les paragraphes denses sont ignorés.

7. Classe les points par impact, pas par ordre chronologique. Le résultat le plus impressionnant en premier.`;

const PROMPT_TEST = `Joue maintenant deux rôles différents :

PREMIER RÔLE : agis comme un filtre ATS. Analyse mon nouveau CV et dis-moi :
- Passerait-il le filtre ATS pour ce poste ? (Oui/Non)
- Quels mots-clés sont désormais présents et lesquels manquent encore ?
- Y a-t-il des problèmes de mise en page susceptibles de perturber un logiciel ATS ? (tableaux, colonnes, en-têtes, caractères spéciaux, images)

DEUXIÈME RÔLE : agis comme un responsable du recrutement qui lit 200 CV d'affilée. Parcours mon CV et dis-moi :
- Quelles sections sauterais-tu ? Pourquoi ?
- Qu'est-ce qui arrête ton regard (en bien ou en mal) ?
- Classerais-tu ce CV dans la pile « oui », « peut-être » ou « non » pour ce poste ?
- Réécris toutes les sections qui seraient ignorées pour qu'elles captent vraiment l'attention.

Donne-moi la version finale de mon CV une fois toutes les corrections appliquées.`;

/** Encadré conseil réutilisable */
function Conseil({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50/60 rounded-xl p-5 my-8 flex gap-3">
      <span className="text-lg select-none" aria-hidden="true">💡</span>
      <p className="text-gray-700 leading-7 text-base">
        <span className="font-bold text-gray-900">Conseil : </span>
        {children}
      </p>
    </div>
  );
}

/** Encadré CTA Rivjob réutilisable */
function CtaRivjob({ titre, texte, bouton }: { titre: string; texte: string; bouton: string }) {
  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 ring-1 ring-indigo-100 p-7">
      <p className="text-xl font-bold text-gray-900 mb-2">{titre}</p>
      <p className="text-gray-700 leading-7 mb-5">{texte}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
        {bouton} →
      </Link>
    </div>
  );
}

export default function ArticleClaudeEmploi() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/ressources" className="hover:text-violet-600 transition-colors">Ressources</Link>
          <span>›</span>
          <span className="text-gray-600">Utiliser Claude pour décrocher un emploi</span>
        </div>

        <ArticleJsonLd
          titre="Utiliser Claude (IA) pour décrocher un emploi : 3 prompts pour refondre votre CV | Rivjob"
          description="Les 3 prompts Claude essentiels pour refondre votre CV : audit complet, réécriture optimisée ATS et test face au recruteur. Guide pas à pas."
          slug="/ressources/ia/utiliser-claude-pour-decrocher-un-emploi"
          datePublication="2026-07-23"
          filAriane={[
            { nom: "Accueil", url: "/" },
            { nom: "Ressources", url: "/ressources" },
            { nom: "Utiliser Claude pour décrocher un emploi", url: "/ressources/ia/utiliser-claude-pour-decrocher-un-emploi" },
          ]}
        />

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3 max-w-3xl">
          Utiliser Claude pour décrocher votre prochain emploi : 3 prompts pour refondre votre CV
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-3xl">
          Audit complet, réécriture optimisée ATS et test face au recruteur, pas à pas, avec les prompts prêts à copier.
        </p>

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
              <span>6 min de lecture</span>
            </div>

            {/* Intro */}
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La plupart des CV sont rejetés avant même qu&apos;un humain ne les lise. Les logiciels de tri de candidatures (<Link href="/ressources/cv-ats/quest-ce-qu-un-ats" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">ATS, pour <em>Applicant Tracking Systems</em></Link>) analysent votre CV à la recherche de mots-clés et de formats précis avant de décider s&apos;il mérite d&apos;être transmis à une vraie personne. Et même quand un recruteur le consulte, il ne lui accorde en moyenne que 7 secondes avant de décider de poursuivre sa lecture ou de passer au suivant.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Claude résout ces deux problèmes. Il analyse votre CV par rapport à l&apos;offre d&apos;emploi réelle, identifie précisément les mots-clés qui vous manquent, réécrit vos expériences selon des formules qui ont fait leurs preuves, puis met le résultat à l&apos;épreuve sous deux angles : celui de l&apos;ATS et celui du responsable du recrutement. L&apos;ensemble du processus prend environ 10 minutes et peut augmenter considérablement votre taux d&apos;entretiens.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ce guide vous présente les 3 prompts essentiels, dans l&apos;ordre : l&apos;audit de votre CV, la réécriture de vos expériences, puis le test final sous le double regard ATS + recruteur.
            </p>

            {/* Ce dont vous avez besoin */}
            <h2 id="besoin" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce dont vous avez besoin
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li>Un compte Claude (la version gratuite suffit pour les prompts liés au CV)</li>
              <li>Votre CV actuel (PDF, Word ou texte brut)</li>
              <li>L&apos;offre d&apos;emploi que vous visez</li>
            </ul>

            {/* Étape 1 */}
            <h2 id="etape-1" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 1 : L&apos;audit du CV
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Commencez par transmettre votre CV et l&apos;offre d&apos;emploi à Claude. Ce premier prompt lui fait adopter le point de vue d&apos;un recruteur senior de l&apos;entreprise exacte où vous postulez. Vous obtenez ainsi une évaluation honnête de votre position avant de réécrire quoi que ce soit.
            </p>
            <BlocPrompt texte={PROMPT_AUDIT} />
            <Conseil>
              ne sautez pas cette étape pour passer directement à la réécriture. L&apos;audit vous montre exactement ce qui doit changer et pourquoi. La plupart des gens sont surpris de découvrir ce que l&apos;ATS pénalise réellement.
            </Conseil>

            {/* Étape 2 */}
            <h2 id="etape-2" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 2 : La réécriture des expériences
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Restez dans la même conversation pour que Claude garde le contexte de l&apos;audit. Ce prompt réécrit votre section « Expériences » selon la formule XYZ de Google, le format utilisé par les plus grandes entreprises pour évaluer les candidats : <em>« Accompli [X], mesuré par [Y], en faisant [Z] »</em>.
            </p>
            <BlocPrompt texte={PROMPT_REECRITURE} />
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              La plupart des points d&apos;un CV décrivent des tâches : « Gestion d&apos;une équipe de 5 ingénieurs. » La formule XYZ transforme cela en accomplissement : « Réduction de 40&nbsp;% du délai de déploiement (mesuré par la cadence de mises en production hebdomadaires) grâce à la réorganisation de l&apos;équipe en pôles transverses. » La première version dit ce que vous avez fait. La seconde dit ce qui s&apos;est passé <strong>parce que</strong> vous l&apos;avez fait. C&apos;est la seconde qui intéresse les recruteurs.
            </p>

            {/* Étape 3 */}
            <h2 id="etape-3" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Étape 3 : Le test ATS + recruteur
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Toujours dans la même conversation. Claude soumet maintenant votre CV réécrit à deux regards : celui du logiciel ATS qui vous élimine avant qu&apos;un humain ne vous voie, et celui du responsable du recrutement qui parcourt 200 CV d&apos;affilée en cherchant des raisons de dire non.
            </p>
            <BlocPrompt texte={PROMPT_TEST} />
            <Conseil>
              après cette étape, demandez à Claude de produire la version finale du CV sous forme d&apos;artefact propre. Vous pourrez ensuite le télécharger au format .docx et l&apos;utiliser directement. Pensez à vérifier les mentions [À COMPLÉTER] et à y insérer vos vrais chiffres avant d&apos;envoyer votre candidature.
            </Conseil>

            {/* CTA Rivjob n°1 */}
            <h2 id="raccourci" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Le raccourci : ces 3 étapes en 1 clic
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Ces trois prompts fonctionnent, mais il faut les relancer pour <strong>chaque</strong> candidature : recoller le CV, recoller l&apos;offre, enchaîner les prompts, copier le résultat, le remettre en forme. Sur une recherche active avec 10 ou 20 candidatures par semaine, ça devient vite un travail à plein temps.
            </p>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              C&apos;est exactement pour ça qu&apos;on a construit Rivjob : le même processus (score de correspondance, mots-clés manquants, réécriture optimisée ATS) automatisé de bout en bout, avec un export PDF ou Word propre à la fin.
            </p>
            <CtaRivjob
              titre="Analysez votre CV contre une offre, gratuitement"
              texte="Collez votre CV et l'offre d'emploi : score de correspondance et mots-clés manquants en 30 secondes, sans inscription."
              bouton="Tester mon CV gratuitement"
            />

            {/* Ce qu'il faut retenir */}
            <h2 id="retenir" className="text-3xl font-bold text-gray-900 mt-16 mb-5">
              Ce qu&apos;il faut retenir
            </h2>
            <p className="text-gray-700 leading-8 mb-6 text-lg">
              Trois prompts, dans le même ordre, dans la même conversation :
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6 ml-2 text-lg">
              <li><strong>Audit du CV</strong> : savoir exactement où vous en êtes face à l&apos;offre</li>
              <li><strong>Réécriture des expériences</strong> : la formule XYZ + les mots-clés manquants</li>
              <li><strong>Test ATS + recruteur</strong> : valider le résultat sous les deux regards qui comptent</li>
            </ol>
            <blockquote className="bg-violet-50/40 rounded-xl p-6 my-8 relative">
              <span className="text-violet-200 text-6xl font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</span>
              <p className="text-gray-700 italic leading-8 pt-4 text-lg">
                Relisez et personnalisez toujours ce que Claude génère. Un contenu écrit par une IA qui sonne générique vous desservira plus qu&apos;il ne vous aidera. Ajoutez votre propre voix, vos propres histoires et vos propres chiffres. Claude vous donne la structure. C&apos;est vous qui apportez la substance.
              </p>
            </blockquote>

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
