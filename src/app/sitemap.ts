import { MetadataRoute } from "next";

const BASE_URL = "https://www.jobboost.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/outils/cv-adapte`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/outils/lettre-motivation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/outils/recherche-email`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ressources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Articles CV ATS
    {
      url: `${BASE_URL}/ressources/cv-ats/quest-ce-qu-un-ats`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/ats-les-plus-utilises-en-france`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/ce-que-voit-le-recruteur-dans-son-ats`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/ce-qui-se-passe-apres-avoir-postule`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/comment-savoir-si-entreprise-utilise-ats`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/cv-pdf-ou-word-ats`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/rubriques-indispensables-cv-2026`,
      lastModified: new Date("2026-05-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Articles mots-clés CV par métier
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-charge-rh`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-chef-de-projet`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-commercial`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-comptable`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-developpeur-web`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-ingenieur`,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-marketing-manager`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ressources/cv-ats/mots-cles-cv-assistant-rh`,
      lastModified: new Date("2026-06-11"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Articles lettre de motivation
    {
      url: `${BASE_URL}/ressources/lettre-de-motivation/comment-ecrire-une-lettre-de-motivation`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Articles candidature spontanée
    {
      url: `${BASE_URL}/ressources/candidature-spontanee/trouver-email-recruteur`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Pages légales
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-cookies`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cgu`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cgv`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
