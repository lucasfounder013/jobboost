import Link from "next/link";

export default function PageSucces() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Link href="/" className="flex items-center gap-1.5 mb-10">
        <span className="text-lg">⚡</span>
        <span className="text-base font-bold tracking-tight text-gray-900">JobBoost</span>
      </Link>

      <div className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">Abonnement activé !</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Votre abonnement JobBoost est maintenant actif. Profitez d&apos;analyses et d&apos;adaptations CV illimitées.
        </p>
        <p className="text-gray-400 text-xs mb-8">
          L&apos;activation peut prendre quelques secondes.
        </p>

        <Link
          href="/"
          className="block w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-indigo-100"
        >
          Analyser mon CV →
        </Link>
      </div>
    </div>
  );
}
