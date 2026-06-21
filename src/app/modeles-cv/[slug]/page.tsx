import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEMPLATES, getTemplate, TemplateSlug } from "@/lib/cv-templates";
import { ogMeta } from "@/lib/seo";
import EditeurCV from "./EditeurCV";

const META: Record<TemplateSlug, { title: string; description: string }> = {
  "classique-ats": {
    title: "Modèle de CV Classique ATS gratuit — PDF & Word | JobBoost",
    description:
      "Modèle de CV ATS classique, sobre et 100% lisible par les robots de recrutement. Personnalisez-le en ligne et téléchargez-le gratuitement en PDF ou Word.",
  },
  moderne: {
    title: "Modèle de CV Moderne gratuit — design épuré PDF & Word | JobBoost",
    description:
      "Modèle de CV moderne avec accent couleur, monocolonne, idéal pour les profils tech et créatifs. Téléchargement gratuit PDF ou Word, sans inscription.",
  },
  elegant: {
    title: "Modèle de CV Élégant gratuit — 2 colonnes PDF & Word | JobBoost",
    description:
      "Modèle de CV élégant en 2 colonnes, serif, parfait pour mettre en avant vos compétences. Personnalisez et téléchargez gratuitement en PDF ou Word.",
  },
};

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  const meta = META[template.slug];
  return {
    title: meta.title,
    description: meta.description,
    ...ogMeta(meta.title, meta.description, `/modeles-cv/${template.slug}`),
  };
}

export default async function PageModeleCV({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Comment créer un CV gratuit avec le modèle ${template.nom}`,
    description: template.descriptionLongue,
    step: [
      { "@type": "HowToStep", position: 1, name: "Remplissez vos informations", text: "Saisissez vos informations personnelles, vos expériences, votre formation et vos compétences." },
      { "@type": "HowToStep", position: 2, name: "Prévisualisez en temps réel", text: "Votre CV s'affiche immédiatement à côté du formulaire et se met à jour à chaque modification." },
      { "@type": "HowToStep", position: 3, name: "Téléchargez en PDF ou Word", text: "Téléchargez votre CV gratuitement, sans inscription et sans filigrane." },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditeurCV templateSlug={template.slug} />
    </>
  );
}
