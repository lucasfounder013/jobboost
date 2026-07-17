"use client";

import Image from "next/image";

export default function APropos() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero — accueil chaleureux */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-white px-6 pt-20 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-3xl sm:text-4xl text-indigo-600 mb-6"
            style={{ fontFamily: "var(--font-manuscrite)" }}
          >
            Bonjour,
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1] text-gray-900"
            style={{ fontFamily: "var(--font-serif-editorial)" }}
          >
            je m&apos;appelle <em className="italic text-indigo-600">Lucas</em>,
            <br />
            et je suis le fondateur
            <br />
            de Rivjob.
          </h1>
        </div>
      </section>

      {/* Section 1 — Qui je suis (photo + bio) */}
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
          <div className="mx-auto md:mx-0">
            {/* Photo à ajouter dans /public/photos/lucas-ledonne.jpg (format carré, 600×600 min) */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden ring-4 ring-indigo-100 shadow-xl bg-gradient-to-br from-indigo-100 to-violet-100">
              <Image
                src="/photos/lucas-ledonne.jpg"
                alt="Lucas Le Donne, créateur de Rivjob"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 224px, 256px"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              Qui je suis
            </p>
            <h2
              className="text-3xl sm:text-4xl text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-serif-editorial)" }}
            >
              Lucas Le Donne
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Je suis ingénieur, et j&apos;ai créé Rivjob <em>en parallèle de mes
                études</em>, à la suite de ma propre expérience de recherche
                d&apos;emploi.
              </p>
              <p>
                Si vous voulez voir mon parcours en détail, il est sur{" "}
                <a
                  href="https://www.linkedin.com/in/lucas-le-donné-71a8682a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4 decoration-indigo-200 font-medium"
                >
                  LinkedIn
                </a>
                . Sinon, le plus simple reste de m&apos;écrire directement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Pourquoi j'ai créé Rivjob (récit personnel avec stats intégrées) */}
      <section className="bg-gradient-to-b from-white via-indigo-50/40 to-white border-t border-indigo-100/60 px-6 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              L&apos;histoire
            </p>
            <h2
              className="text-3xl sm:text-4xl text-gray-900 leading-tight"
              style={{ fontFamily: "var(--font-serif-editorial)" }}
            >
              Pourquoi j&apos;ai créé Rivjob
            </h2>
          </div>

          <div
            className="space-y-6 text-lg leading-[1.85] text-gray-800"
            style={{ fontFamily: "var(--font-serif-editorial)" }}
          >
            <p>
              {/* À valider : contexte de ta recherche d'emploi */}
              Tout est parti d&apos;une expérience très concrète : la mienne. À un
              moment, j&apos;ai cherché un emploi. Comme des millions de personnes.
              Et j&apos;ai vite compris quelque chose qui m&apos;a beaucoup surpris.
            </p>

            <p>
              Pour maximiser mes chances, il fallait envoyer des dizaines, voire des
              centaines de candidatures, tout en <em>adaptant chaque CV à chaque
              offre</em> pour me démarquer des autres candidats. Résultat : je
              passais mes journées à écrire des CV, à rédiger des lettres de
              motivation, à envoyer des relances et à suivre mes candidatures sur un
              fichier Excel à rallonge.
            </p>

            <p>
              Le problème, c&apos;est le <em>temps</em> que ça prenait.
            </p>

            {/* Stats intégrées dans le récit — à valider avec Lucas */}
            <p>
              Je passais entre <strong className="font-semibold text-indigo-700">30 et
              45 minutes par candidature</strong>. Multiplié par une dizaine de
              candidatures les bons jours, ça faisait <strong className="font-semibold text-indigo-700">4
              à 6 heures</strong> quotidiennes juste à préparer mes dossiers. Autant
              de temps que je ne passais ni à me préparer aux entretiens, ni à
              réseauter, ni à souffler un peu.
            </p>

            <p>
              Et pendant que je faisais tout ça manuellement, quelque chose m&apos;a
              frappé : de l&apos;autre côté, les recruteurs utilisent des logiciels
              (les ATS) pour trier les CV automatiquement. En France,{" "}
              <strong className="font-semibold text-indigo-700">
                environ 75 % des grandes entreprises
              </strong>{" "}
              s&apos;en servent{" "}
              <span className="text-sm text-gray-500 italic">[à sourcer]</span>. Un
              CV mal calibré est écarté avant même d&apos;être lu. Et lorsqu&apos;il
              parvient enfin à un humain, celui-ci y consacre en moyenne{" "}
              <strong className="font-semibold text-indigo-700">30 secondes</strong>{" "}
              <span className="text-sm text-gray-500 italic">[à sourcer]</span>.
            </p>

            <p>
              Autrement dit : <em>d&apos;un côté, un candidat qui passe des heures
              sur ses candidatures. De l&apos;autre, des machines et 30 secondes.</em>
            </p>

            <p>
              Ce déséquilibre m&apos;a paru absurde. Je me suis dit qu&apos;il devait
              exister un outil capable de faire ce travail d&apos;adaptation en
              quelques secondes, pour rendre aux candidats du temps à consacrer à ce
              qui compte vraiment.
            </p>

            <p>
              J&apos;ai cherché. Aux États-Unis, il existe Jobscan. En France, rien
              d&apos;équivalent, rien de pensé pour notre langue et nos codes.
            </p>

            <p className="text-xl">
              Alors je l&apos;ai construit. C&apos;est <em className="text-indigo-700">Rivjob</em>.
            </p>

            <p>
              L&apos;idée est simple : vous collez votre CV et une offre, et en
              quelques secondes vous voyez ce qui correspond, ce qui manque, ce qu&apos;il
              faut ajuster. Si vous voulez aller plus loin, l&apos;outil adapte votre
              CV automatiquement. Ce qui vous prenait 40 minutes en prend 2.
            </p>

            <p>
              Le temps que vous gagnez, vous le rendez à ce qui en vaut la peine :
              vos entretiens, vos rencontres, votre vie.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-16 text-center">
            <p
              className="text-4xl text-indigo-600 leading-none"
              style={{ fontFamily: "var(--font-manuscrite)", fontWeight: 600 }}
            >
              Lucas
            </p>
            <a
              href="mailto:contact@rivjob.ai"
              className="mt-4 inline-block text-sm text-gray-500 hover:text-indigo-600 underline underline-offset-4 decoration-indigo-200 transition-colors"
            >
              contact@rivjob.ai
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
