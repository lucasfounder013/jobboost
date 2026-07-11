import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "./providers";
import { PostHogPageView } from "./posthog-pageview";
import Navbar from "@/components/Navbar";
import { FeedbackButton } from "@/components/FeedbackButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jobboost.fr"),
  title: "Analysez votre CV face à une offre d'emploi | JobBoost",
  description: "Collez votre CV et une offre d'emploi pour obtenir votre score de correspondance, les mots-clés manquants et un CV adapté en quelques secondes.",
  alternates: {
    canonical: "https://www.jobboost.fr",
  },
  openGraph: {
    title: "Analysez votre CV face à une offre d'emploi | JobBoost",
    description: "Collez votre CV et une offre d'emploi pour obtenir votre score de correspondance, les mots-clés manquants et un CV adapté en quelques secondes.",
    url: "https://www.jobboost.fr",
    siteName: "JobBoost",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analysez votre CV face à une offre d'emploi | JobBoost",
    description: "Collez votre CV et une offre d'emploi pour obtenir votre score de correspondance, les mots-clés manquants et un CV adapté en quelques secondes.",
  },
  verification: {
    other: {
      "ahrefs-site-verification": "823a7c82006d70b462570506b8d4daa23b741b165360fe97b16e548e574a0fe9",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JobBoost",
  url: "https://www.jobboost.fr",
  logo: "https://www.jobboost.fr/favicon.ico",
  description: "JobBoost analyse votre CV face à une offre d'emploi et l'adapte automatiquement pour maximiser vos chances d'être retenu.",
  sameAs: ["https://github.com/lucasfounder013/jobboost"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-gray-900 font-sans overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <Navbar />
          {children}
          <FeedbackButton />
        </Providers>
      </body>
    </html>
  );
}
