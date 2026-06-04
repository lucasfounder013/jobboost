"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

const lienCentre = [
  { href: "/", label: "CV adapté" },
  { href: "/outils/lettre-motivation", label: "Lettre de motivation" },
  { href: "/outils/recherche-email", label: "Recherche d'email" },
  { href: "/ressources", label: "Ressources" },
  { href: "/pricing", label: "Tarifs" },
];

export default function Navbar() {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-indigo-50">
      <div className="overflow-x-auto scrollbar-hide sm:overflow-x-visible">
        <div className="min-w-max sm:min-w-0 max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-2">

          {/* Logo — gauche */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0 justify-self-start">
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              JobBoost
            </span>
          </Link>

          {/* Nav — centre */}
          <nav className="flex items-center justify-center gap-0.5">
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

          {/* Auth — droite */}
          <div className="flex items-center justify-end gap-1 pl-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 whitespace-nowrap text-xs"
                >
                  Dashboard
                </Link>
                <Link
                  href="/abonnement"
                  className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 whitespace-nowrap text-xs hidden sm:block"
                >
                  Mon abonnement
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 font-medium transition-all duration-150 whitespace-nowrap text-xs"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
