"use client";

import Link from "next/link";
import { usePostHog } from "posthog-js/react";

export default function Footer() {
  const posthog = usePostHog();

  const handleInstagramClick = () => {
    posthog.capture("instagram_click", {
      source: "footer",
    });
  };

  return (
    <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-300 font-medium tracking-wide">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-2">
        <Link href="/mentions-legales" className="hover:text-gray-500 transition-colors">Mentions légales</Link>
        <span>·</span>
        <Link href="/cgu" className="hover:text-gray-500 transition-colors">CGU</Link>
        <span>·</span>
        <Link href="/cgv" className="hover:text-gray-500 transition-colors">CGV</Link>
        <span>·</span>
        <Link href="/politique-confidentialite" className="hover:text-gray-500 transition-colors">Confidentialité</Link>
        <span>·</span>
        <Link href="/politique-cookies" className="hover:text-gray-500 transition-colors">Cookies</Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <a href="mailto:contact@jobboost.fr" className="hover:text-gray-500 transition-colors">contact@jobboost.fr</a>
        <span>·</span>
        <a
          href="https://www.instagram.com/jobboostfr/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleInstagramClick}
          className="hover:text-gray-500 transition-colors"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
