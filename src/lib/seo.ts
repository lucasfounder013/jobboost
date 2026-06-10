const BASE_URL = "https://www.jobboost.fr";

export function ogMeta(title: string, description: string, path: string) {
  return {
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: "JobBoost",
      locale: "fr_FR",
      type: "article" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
