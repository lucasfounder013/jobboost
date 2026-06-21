import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { TEMPLATES } from "@/lib/cv-templates";
import { ogMeta } from "@/lib/seo";
import CarteTemplate from "@/components/modeles-cv/CarteTemplate";
import Faq, { QuestionFaq } from "@/components/modeles-cv/Faq";
import SectionsPublic from "@/components/modeles-cv/SectionsPublic";
import BoutonRetour from "@/components/modeles-cv/BoutonRetour";

const TITRE = "Modèles de CV gratuits 2026 — PDF & Word à télécharger | JobBoost";
const DESCRIPTION =
  "3 modèles de CV gratuits, optimisés ATS, à personnaliser en ligne et télécharger en PDF ou Word. Sans inscription, sans filigrane.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  ...ogMeta(TITRE, DESCRIPTION, "/modeles-cv"),
};

const BENEFICES = [
  {
    titre: "100% gratuit, sans filigrane",
    description:
      "Aucune carte bancaire, aucun compte. Téléchargez votre CV en PDF ou Word sans limite, sans logo JobBoost imposé.",
  },
  {
    titre: "Optimisés pour les ATS",
    description:
      "Tous nos modèles sont conçus pour passer les filtres des logiciels de recrutement (Workday, Taleo, Greenhouse).",
  },
  {
    titre: "Aperçu en temps réel",
    description:
      "Remplissez le formulaire, votre CV se met à jour à chaque modification. Pas de mauvaise surprise au téléchargement.",
  },
  {
    titre: "PDF et Word inclus",
    description:
      "Téléchargez le format qui vous convient — PDF pour postuler, Word pour modifier plus tard sur votre ordinateur.",
  },
];

const FAQ: QuestionFaq[] = [
  {
    question: "Vos modèles de CV sont-ils vraiment gratuits ?",
    reponse:
      "Oui, totalement. Aucune inscription, aucune carte bancaire, aucun filigrane sur le PDF final. Vous pouvez télécharger autant de versions que vous voulez. JobBoost se rémunère uniquement sur ses outils premium d'adaptation de CV par IA, pas sur les modèles.",
  },
  {
    question: "Les modèles passent-ils les ATS (logiciels de recrutement) ?",
    reponse:
      "Oui. Tous nos modèles utilisent une mise en page simple et un texte sélectionnable, parfaitement lisible par les ATS comme Workday, Taleo ou Greenhouse. Le modèle Classique est même conçu spécifiquement pour maximiser la compatibilité ATS.",
  },
  {
    question: "Puis-je modifier mon CV après l'avoir téléchargé ?",
    reponse:
      "Oui. Le format Word (.docx) est entièrement éditable dans Microsoft Word, LibreOffice ou Google Docs. Vos modifications dans le formulaire en ligne sont aussi sauvegardées automatiquement dans votre navigateur, vous pouvez revenir plus tard pour reprendre.",
  },
  {
    question: "Mes données sont-elles enregistrées sur vos serveurs ?",
    reponse:
      "Non. Tout reste dans votre navigateur (localStorage). Nous n'envoyons aucune information personnelle à nos serveurs lorsque vous remplissez le formulaire. Seul le téléchargement PDF/Word transite par notre serveur pour générer le fichier, sans être stocké.",
  },
  {
    question: "Quel modèle de CV choisir ?",
    reponse:
      "Pour une candidature via une plateforme de recrutement (Welcome to the Jungle, LinkedIn Easy Apply…), choisissez le modèle Classique, le plus sûr pour passer les ATS. Pour un envoi direct à un recruteur dans un secteur créatif ou tech, le modèle Moderne se démarque. Pour mettre en avant vos compétences (profils expérimentés), le modèle Élégant en 2 colonnes est idéal.",
  },
  {
    question: "Combien de pages doit faire mon CV ?",
    reponse:
      "1 page pour un CV junior ou intermédiaire (moins de 10 ans d'expérience), 2 pages maximum pour un profil senior. Les recruteurs passent en moyenne 7 secondes sur un CV, allez à l'essentiel.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.reponse },
      })),
    },
    {
      "@type": "ItemList",
      itemListElement: TEMPLATES.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.jobboost.fr/modeles-cv/${t.slug}`,
        name: `Modèle de CV ${t.nom}`,
      })),
    },
  ],
};

export default function ModelesCvPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Barre haute avec bouton retour */}
      <div className="max-w-6xl mx-auto w-full px-6 pt-6">
        <BoutonRetour />
      </div>

      {/* Hero */}
      <section className="px-6 pt-10 pb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-5">
            Modèles de CV <SectionsPublic>gratuits </SectionsPublic>à télécharger en{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              PDF et Word
            </span>
          </h1>
          <SectionsPublic>
            <p className="text-gray-600 text-lg leading-relaxed">
              Personnalisez votre CV en ligne avec un aperçu en temps réel, puis téléchargez-le gratuitement.
              <br className="hidden sm:block" />
              Sans inscription, sans filigrane, optimisés pour les ATS.
            </p>
          </SectionsPublic>
        </div>
      </section>

      {/* Grille des modèles */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEMPLATES.map((t) => (
            <CarteTemplate key={t.slug} template={t} />
          ))}
        </div>
      </section>

      <SectionsPublic>
        {/* Pourquoi nos modèles */}
        <section className="max-w-5xl mx-auto w-full px-6 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Pourquoi choisir nos modèles ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFICES.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl ring-1 ring-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{b.titre}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto w-full px-6 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Questions fréquentes
          </h2>
          <Faq questions={FAQ} />
        </section>

        {/* CTA bas de page */}
        <section className="max-w-3xl mx-auto w-full px-6 pb-20 text-center">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl p-8 sm:p-10 text-white shadow-lg shadow-indigo-200/60">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Et après ? Adaptez votre CV à chaque offre d&apos;emploi
            </h2>
            <p className="text-indigo-50 mb-6 leading-relaxed">
              JobBoost analyse votre CV et l&apos;adapte automatiquement à l&apos;offre visée en mettant en avant les bons mots-clés.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
            >
              Découvrir l&apos;analyse IA →
            </Link>
          </div>
        </section>
      </SectionsPublic>

      <Footer />
    </div>
  );
}
