import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Lettre de motivation générée par IA | JobBoost",
  description: "Générez une lettre de motivation personnalisée en 30 secondes. L'IA analyse l'offre et votre CV pour rédiger une lettre sur-mesure, exportable en PDF ou Word.",
};

const features = [
  {
    titre: "Personnalisée par l'IA",
    desc: "L'IA analyse l'offre et votre CV pour rédiger une lettre qui répond précisément aux attentes du recruteur.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    titre: "Ton adapté au secteur",
    desc: "Finance, tech, santé, industrie — le registre, la tonalité et le vocabulaire s'adaptent automatiquement au contexte.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    titre: "Export PDF & Word",
    desc: "Téléchargez votre lettre en PDF ou Word (.docx) en un clic. Prête à joindre à votre candidature.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

const motsCles = ["Gestion de projet", "Agile", "Digital", "Transformation"];

export default function PageLettreMotivation() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-violet-50 to-white px-6 pt-20 pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase border border-violet-100">
              Lettre de motivation IA
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Une lettre sur-mesure en{" "}
              <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                30 secondes
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Fini les lettres génériques. JobBoost génère une lettre de motivation personnalisée à partir de votre CV et de l&apos;offre visée.
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Essayer gratuitement →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-violet-600">30 sec</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Génération complète</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-violet-600">100%</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Personnalisée</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-violet-600">PDF + Word</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Export immédiat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mockup offre + lettre générée */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">De l&apos;offre à la lettre en un clic</h2>
              <p className="text-gray-400 text-base max-w-lg mx-auto">JobBoost lit l&apos;offre, comprend le contexte et rédige une lettre qui parle au recruteur.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-inner p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Offre */}
                <div className="rounded-xl shadow-md ring-1 ring-gray-200 overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    <span className="ml-2 text-xs text-gray-400 font-medium">Offre d&apos;emploi collée</span>
                  </div>
                  <div className="bg-white p-5 space-y-3">
                    <div>
                      <p className="font-bold text-sm text-gray-900">Chargée de projet digital — BNP Paribas</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Paris · CDI · Réf. BNP-2026-0412</p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      Nous recherchons une <strong>Chargée de projet digital</strong> expérimentée pour piloter la transformation
                      de nos parcours clients en ligne. Vous travaillerez en mode <strong>Agile</strong> avec des équipes
                      pluridisciplinaires.
                    </p>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Compétences clés</p>
                      <div className="flex flex-wrap gap-1">
                        {motsCles.map(m => (
                          <span key={m} className="bg-indigo-50 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lettre générée */}
                <div className="rounded-xl shadow-md ring-1 ring-violet-100 overflow-hidden">
                  <div className="bg-violet-50 border-b border-violet-100 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    </div>
                    <span className="text-xs font-bold text-violet-600">Lettre générée par JobBoost</span>
                    <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Prête</span>
                  </div>
                  <div className="bg-white p-5 text-[11px] text-gray-700 leading-relaxed space-y-2.5">
                    <p className="text-gray-400">Paris, le 4 juin 2026</p>
                    <div>
                      <p className="font-semibold text-gray-900">Marie Dupont</p>
                      <p className="text-gray-400">À l&apos;attention du Service RH — BNP Paribas</p>
                    </div>
                    <p><strong>Objet :</strong> Candidature — Chargée de projet digital</p>
                    <div className="h-px bg-gray-100" />
                    <p>Madame, Monsieur,</p>
                    <p>
                      Forte de 4 ans d&apos;expérience en gestion de projets <strong>digitaux</strong> dans le secteur
                      financier, je souhaite rejoindre BNP Paribas en tant que <strong>Chargée de projet digital</strong>.
                    </p>
                    <p>
                      Mes missions chez Société Générale m&apos;ont permis de piloter des projets en mode{" "}
                      <strong>Agile</strong>, en coordination avec des équipes de 6 à 10 personnes, avec un taux
                      de livraison de 92 % dans les délais...
                    </p>
                    <p className="text-gray-300 italic">[suite de la lettre générée...]</p>
                    <div className="flex gap-2 pt-1">
                      <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-default select-none">↓ PDF</span>
                      <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-default select-none">↓ Word</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-16 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.titre} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
                  <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center mb-4">
                    {f.icone}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl px-10 py-14 shadow-xl shadow-violet-200/50">
            <h2 className="text-3xl font-extrabold text-white mb-4">Commencer gratuitement</h2>
            <p className="text-violet-100 mb-8 text-base">Votre première lettre de motivation offerte. Aucune carte bancaire.</p>
            <Link
              href="/register"
              className="inline-block bg-white text-violet-600 font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Créer mon compte →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
