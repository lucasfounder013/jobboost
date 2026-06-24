type FilAriane = { nom: string; url: string };

type ArticleJsonLdProps = {
  titre: string;
  description: string;
  slug: string;
  datePublication: string;
  dateModification?: string;
  filAriane: FilAriane[];
};

const BASE_URL = "https://www.jobboost.fr";

export default function ArticleJsonLd({
  titre,
  description,
  slug,
  datePublication,
  dateModification,
  filAriane,
}: ArticleJsonLdProps) {
  const url = `${BASE_URL}${slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titre,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "JobBoost", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "JobBoost",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
    },
    datePublished: datePublication,
    dateModified: dateModification ?? datePublication,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: filAriane.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nom,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
