import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Recherche d'email RH | JobBoost",
  description: "Trouvez le contact RH de n'importe quelle entreprise française. Accédez aux emails des responsables recrutement pour envoyer vos candidatures spontanées.",
};

const features = [
  {
    titre: "Base entreprises françaises et internationales",
    desc: "Des millions de contacts professionnels indexés et mis à jour mensuellement pour vous connecter aux bonnes personnes.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    titre: "Candidature spontanée",
    desc: "Contournez les portails de candidature et touchez directement le décideur. Augmentez vos chances de réponse.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    titre: "Crédits inclus",
    desc: "Chaque abonnement JobBoost inclut des révélations d'email mensuelles. Pas de surprise, pas de frais cachés.",
    icone: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const contacts = [
  { initiales: "TM", nom: "Thomas Marchand", poste: "Manager Digital & Transformation", email: "t.mar***@capgemini.com", verifie: true },
  { initiales: "CL", nom: "Claire Laurent", poste: "Directrice Marketing", email: "c.lau***@capgemini.com", verifie: true },
  { initiales: "AD", nom: "Alexandre Dupuis", poste: "Head of Product", email: "a.dup***@capgemini.com", verifie: false },
];

export default function PageRechercheEmail() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-white px-6 pt-20 pb-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase border border-indigo-100 mb-5">
              Candidature spontanée
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Trouvez le contact qui vous permettra d&apos;intégrer{" "}
              <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                l&apos;entreprise que vous souhaitez
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Accédez aux emails professionnels des responsables recrutement pour envoyer vos candidatures directement, sans intermédiaire.
            </p>
            <Link
              href="/register?redirect=%2Fdashboard%3Fvue%3Dtrouver-rh"
              className="inline-block bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Trouver mon premier contact →
            </Link>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-indigo-600">3×</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Plus de réponses qu'un portail</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-indigo-600">80 %</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Des postes jamais publiés</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-indigo-600">1 email</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Suffit pour contourner les ATS</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mockup formulaire + résultats */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Trouvez le bon contact en 3 secondes</h2>
              <p className="text-gray-400 text-base max-w-lg mx-auto">Entrez le nom de l&apos;entreprise, obtenez les contacts avec leur email professionnel vérifié.</p>
            </div>

            <div className="bg-[#F4F5FB] rounded-2xl border border-gray-100 p-6 space-y-4">

              {/* Onglets Par entreprise / Par personne */}
              <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 gap-1">
                <div className="bg-white rounded-lg py-2 text-center text-sm font-semibold text-indigo-600 shadow-sm cursor-default select-none">Par entreprise</div>
                <div className="py-2 text-center text-sm font-medium text-gray-400 cursor-default select-none">Par personne</div>
              </div>

              {/* Bandeau crédits */}
              <div className="bg-indigo-50/70 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Crédits email</p>
                  <p className="text-sm font-bold text-indigo-700">10 révélations restantes ce mois</p>
                </div>
              </div>

              {/* Formulaire */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-5 space-y-4">
                <p className="font-semibold text-gray-900 text-sm">Trouvez les contacts d&apos;une entreprise</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Nom de l&apos;entreprise</p>
                    <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 bg-white select-none">
                      Capgemini
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-300 shrink-0">ou domaine direct</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Domaine (si connu)</p>
                    <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 bg-white select-none">
                      capgemini.com
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-center py-2.5 rounded-xl text-sm font-bold cursor-default select-none">
                  Rechercher
                </div>
              </div>

              {/* Résultats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">3 contacts trouvés</p>
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">Capgemini</span>
                </div>
                {contacts.map((c) => (
                  <div key={c.nom} className="bg-white rounded-xl ring-1 ring-gray-200 shadow-sm p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0 select-none">
                      {c.initiales}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{c.nom}</p>
                      <p className="text-gray-400 text-xs">{c.poste}</p>
                      <p className="text-indigo-500 text-xs font-mono mt-0.5 blur-[3px] select-none">{c.email}</p>
                    </div>
                    {c.verifie && (
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full shrink-0 hidden sm:block">✓ Vérifié</span>
                    )}
                    <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-lg shrink-0 cursor-default select-none">
                      Révéler →
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-gray-300 pt-1">Les emails sont révélés après connexion — 1 crédit par révélation</p>
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
          <div className="max-w-2xl mx-auto text-center">
            <Link
              href="/register?redirect=%2Fdashboard%3Fvue%3Dtrouver-rh"
              className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold px-10 py-4 rounded-xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Trouver mon premier contact →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
