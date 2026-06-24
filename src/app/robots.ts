import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/login",
          "/register",
          "/success",
          "/cv-apercu",
          "/cv-adapte/",
        ],
      },
    ],
    sitemap: "https://www.jobboost.fr/sitemap.xml",
  };
}
