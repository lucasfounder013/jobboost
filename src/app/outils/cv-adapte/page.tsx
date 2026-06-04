import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CV adapté aux offres d'emploi | JobBoost",
  description: "Adaptez votre CV à chaque offre en quelques secondes. JobBoost optimise vos mots-clés ATS et améliore votre score de correspondance automatiquement.",
};

const features = [
  {
    titre: "Score ATS boosté",
    desc: "Votre score passe en moyenne de 34 à 87. Les ATS et les recruteurs repèrent immédiatement votre profil.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    titre: "Mots-clés intégrés",
    desc: "L'IA identifie et insère les mots-clés exacts de l'offre directement dans vos expériences et compétences.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    titre: "Export PDF & Word",
    desc: "Téléchargez votre CV optimisé en PDF ATS ou en Word (.docx) en un clic, prêt à envoyer.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

const competencesAvant = ["Microsoft Office", "Travail en équipe", "Leadership"];
const competencesApres = ["Agile / Scrum", "JIRA", "Gestion de budget", "KPI", "PMP"];

export default function PageCVAdapte() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-white px-6 pt-20 pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase border border-indigo-100">
              Optimisation ATS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Votre CV adapté à{" "}
              <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                chaque offre
              </span>{" "}
              en secondes
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Collez votre CV et une offre d&apos;emploi. JobBoost identifie les mots-clés manquants et réécrit votre CV pour passer les filtres ATS.
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Essayer gratuitement →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-indigo-600">+53 pts</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Score ATS moyen gagné</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-indigo-600">30 sec</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Pour adapter votre CV</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-indigo-600">100%</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Compatible ATS</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mockup avant / après */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">La différence en un coup d&apos;œil</h2>
              <p className="text-gray-400 text-base max-w-lg mx-auto">Un CV générique vs le même CV optimisé par JobBoost pour une offre de Chef de Projet.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-inner p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Avant */}
                <div className="rounded-xl shadow-md ring-1 ring-red-100 overflow-hidden">
                  <div className="bg-red-50 border-b border-red-100 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    </div>
                    <span className="text-xs font-bold text-red-600">Avant JobBoost</span>
                    <span className="bg-red-100 text-red-700 text-xs font-extrabold px-2.5 py-1 rounded-full">34 / 100</span>
                  </div>
                  <div className="bg-white p-5 space-y-3">
                    <div className="text-center pb-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">Thomas Leroy</p>
                      <p className="text-[11px] text-gray-400 italic mt-0.5">Chef de projet</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Profil</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        <span className="text-red-400 line-through">Motivé</span> et dynamique,{" "}
                        <span className="text-red-400 line-through">passionné</span> par les projets innovants.
                        Capacité à travailler en équipe et à gérer les priorités.
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Compétences</p>
                      <div className="flex flex-wrap gap-1">
                        {competencesAvant.map(c => (
                          <span key={c} className="border border-gray-200 text-gray-400 text-[10px] px-2 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Expérience</p>
                      <ul className="text-[11px] text-gray-400 space-y-1">
                        <li>· Responsable de la gestion de projets en équipe.</li>
                        <li>· Participation aux réunions de suivi projet.</li>
                        <li>· Coordination avec les différents services.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Après */}
                <div className="rounded-xl shadow-md ring-1 ring-emerald-100 overflow-hidden">
                  <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Après JobBoost</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-extrabold px-2.5 py-1 rounded-full">87 / 100</span>
                  </div>
                  <div className="bg-white p-5 space-y-3">
                    <div className="text-center pb-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">Thomas Leroy</p>
                      <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Chef de Projet Digital — Transformation SI</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Profil</p>
                      <p className="text-[11px] text-gray-700 leading-relaxed">
                        Chef de Projet certifié <strong>PMP</strong> avec 5 ans d&apos;expérience en transformation SI.
                        Budget géré : <strong>250 K€</strong>. Taux de livraison dans les délais : <strong>94 %</strong>.
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Compétences</p>
                      <div className="flex flex-wrap gap-1">
                        {competencesApres.map(c => (
                          <span key={c} className="bg-indigo-50 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">Expérience</p>
                      <ul className="text-[11px] text-gray-700 space-y-1">
                        <li>· Piloté 3 projets SI (budget 250 K€, 94 % dans les délais).</li>
                        <li>· Coordination de 8 équipes via sprints <strong>Agile</strong> sur <strong>JIRA</strong>.</li>
                        <li>· Rédaction des KPI et reporting mensuel C-level.</li>
                      </ul>
                    </div>
                    <div className="pt-1">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2.5 py-1 rounded-full">+5 mots-clés ATS injectés</span>
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
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
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
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl px-10 py-14 shadow-xl shadow-indigo-200/50">
            <h2 className="text-3xl font-extrabold text-white mb-4">Commencer gratuitement</h2>
            <p className="text-indigo-100 mb-8 text-base">5 analyses offertes. Aucune carte bancaire requise.</p>
            <Link
              href="/register"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
