import Link from "next/link";

export default function Footer() {
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
      <div>
        <a href="mailto:contact@jobboost.fr" className="hover:text-gray-500 transition-colors">contact@jobboost.fr</a>
      </div>
    </footer>
  );
}
