import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "./providers";
import { PostHogPageView } from "./posthog-pageview";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Analysez votre CV face à une offre d'emploi | JobBoost",
  description: "Collez votre CV et une offre d'emploi pour obtenir votre score de correspondance, les mots-clés manquants et un CV adapté en quelques secondes.",
  verification: {
    other: {
      "ahrefs-site-verification": "823a7c82006d70b462570506b8d4daa23b741b165360fe97b16e548e574a0fe9",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-gray-900 font-sans overflow-x-hidden">
        <Providers>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
