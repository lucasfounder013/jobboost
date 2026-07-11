"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const lienCentre = [
  { href: "/", label: "CV adapté" },
  { href: "/outils/lettre-motivation", label: "Lettre de motivation" },
  { href: "/outils/recherche-email", label: "Recherche d'email" },
  { href: "/modeles-cv", label: "Modèles de CV" },
  { href: "/ressources", label: "Ressources" },
  { href: "/pricing", label: "Tarifs" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isArticle = pathname.startsWith("/ressources/") && pathname !== "/ressources";
  const [menuOuvert, setMenuOuvert] = useState(false);

  if (session) return null;

  return (
    <>
      <header className={`${isArticle ? "relative" : "sticky top-0"} z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-indigo-50`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0" onClick={() => setMenuOuvert(false)}>
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              Mon Petit Piston
            </span>
          </Link>

          {/* Nav desktop — caché sur mobile */}
          <nav className="hidden sm:flex items-center justify-center gap-0.5">
            {lienCentre.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-2.5 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 whitespace-nowrap text-[14px]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth desktop — caché sur mobile */}
          <div className="hidden sm:flex items-center justify-end gap-1 pl-4">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-150 whitespace-nowrap text-xs"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              S&apos;inscrire gratuitement
            </Link>
          </div>

          {/* Hamburger — visible sur mobile uniquement */}
          <button
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-label="Menu"
          >
            {menuOuvert ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      {menuOuvert && (
        <div className="sm:hidden fixed inset-0 z-40 flex flex-col" style={{ top: "65px" }}>
          {/* Fond semi-transparent */}
          <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOuvert(false)} />

          {/* Menu */}
          <div className="relative bg-white border-b border-gray-200 shadow-lg flex flex-col px-4 py-4 gap-1">
            {lienCentre.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOuvert(false)}
                className="px-4 py-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium text-base transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMenuOuvert(false)}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold text-base transition-colors text-center"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOuvert(false)}
                className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-3 rounded-xl font-bold text-base shadow-lg shadow-indigo-200/60 transition-all text-center"
              >
                S&apos;inscrire gratuitement
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
