"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth-client";

type ItemNav =
  | { type: "lien"; href: string; label: string }
  | { type: "groupe"; label: string; enfants: { href: string; label: string }[] };

const itemsNav: ItemNav[] = [
  {
    type: "groupe",
    label: "Outils",
    enfants: [
      { href: "/outils/lettre-motivation", label: "Lettre de motivation" },
      { href: "/outils/recherche-email", label: "Recherche d'email" },
    ],
  },
  { type: "lien", href: "/modeles-cv", label: "Modèles de CV" },
  { type: "lien", href: "/ressources", label: "Ressources" },
  { type: "lien", href: "/a-propos", label: "À propos" },
  { type: "lien", href: "/pricing", label: "Tarifs" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isArticle = pathname.startsWith("/ressources/") && pathname !== "/ressources";
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [outilsOuvert, setOutilsOuvert] = useState(false);
  const [outilsOuvertMobile, setOutilsOuvertMobile] = useState(false);
  const refOutils = useRef<HTMLDivElement>(null);

  // Fermeture du dropdown desktop au clic extérieur + touche Escape
  useEffect(() => {
    if (!outilsOuvert) return;
    const onClic = (e: MouseEvent) => {
      if (refOutils.current && !refOutils.current.contains(e.target as Node)) {
        setOutilsOuvert(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOutilsOuvert(false);
    };
    document.addEventListener("mousedown", onClic);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClic);
      document.removeEventListener("keydown", onEscape);
    };
  }, [outilsOuvert]);

  // Ferme le drawer mobile et réinitialise l'accordéon en même temps
  const fermerDrawer = () => {
    setMenuOuvert(false);
    setOutilsOuvertMobile(false);
  };

  if (session) return null;

  return (
    <>
      <header className={`${isArticle ? "relative" : "sticky top-0"} z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-indigo-50`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0" onClick={fermerDrawer}>
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              rivjob.ai
            </span>
          </Link>

          {/* Nav desktop — caché sur mobile */}
          <nav className="hidden sm:flex items-center justify-center gap-0.5">
            {itemsNav.map((item) => {
              if (item.type === "lien") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-2.5 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 whitespace-nowrap text-[14px]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="relative" ref={refOutils}>
                  <button
                    type="button"
                    onClick={() => setOutilsOuvert((v) => !v)}
                    aria-expanded={outilsOuvert}
                    aria-haspopup="menu"
                    className="px-2.5 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 whitespace-nowrap text-[14px] flex items-center gap-1"
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${outilsOuvert ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {outilsOuvert && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow-lg py-2"
                    >
                      {item.enfants.map((enfant) => (
                        <Link
                          key={enfant.href}
                          href={enfant.href}
                          role="menuitem"
                          onClick={() => setOutilsOuvert(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          {enfant.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
            onClick={() => (menuOuvert ? fermerDrawer() : setMenuOuvert(true))}
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
          <div className="absolute inset-0 bg-black/20" onClick={fermerDrawer} />

          {/* Menu */}
          <div className="relative bg-white border-b border-gray-200 shadow-lg flex flex-col px-4 py-4 gap-1">
            {itemsNav.map((item) => {
              if (item.type === "lien") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={fermerDrawer}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium text-base transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setOutilsOuvertMobile((v) => !v)}
                    aria-expanded={outilsOuvertMobile}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium text-base transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-150 ${outilsOuvertMobile ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {outilsOuvertMobile && (
                    <div className="flex flex-col">
                      {item.enfants.map((enfant) => (
                        <Link
                          key={enfant.href}
                          href={enfant.href}
                          onClick={fermerDrawer}
                          className="pl-8 pr-4 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors"
                        >
                          {enfant.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={fermerDrawer}
                className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold text-base transition-colors text-center"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                onClick={fermerDrawer}
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
