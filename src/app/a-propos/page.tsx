"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function APropos() {
  return (
    <main className="bg-[#FAFAFA] text-gray-900">
      {/* 1. Hero — accroche personnelle */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-6">
            À propos
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              J&apos;ai créé Rivjob
            </span>
            <br />
            <span className="text-gray-900">
              parce que chercher un emploi
              <br />
              ne devrait pas ressembler à un mur de silence.
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            L&apos;histoire d&apos;un outil pensé pour redonner une chance à ceux qui postulent — vraiment.
          </p>
        </div>
      </section>

      {/* 2. Le constat — marché de l'emploi français */}
      <section className="bg-white border-t border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Aujourd&apos;hui, postuler ressemble à jouer à la loterie
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Le marché de l&apos;emploi français a changé. Les CV passent d&apos;abord dans des filtres
                automatiques, et la majorité n&apos;arrive jamais entre les mains d&apos;un recruteur.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delayMs={0}>
              <StatCard
                chiffre="75 %"
                source="[à sourcer]"
                texte="des CV sont filtrés par un logiciel ATS avant même d'être lus par un humain."
              />
            </Reveal>
            <Reveal delayMs={100}>
              <StatCard
                chiffre="30 s"
                source="[à sourcer]"
                texte="le temps moyen qu'un recruteur consacre à un CV lors du premier tri."
              />
            </Reveal>
            <Reveal delayMs={200}>
              <StatCard
                chiffre="80+"
                source="[à sourcer]"
                texte="candidatures envoyées en moyenne avant de décrocher un premier entretien."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. La naissance de Rivjob — récit personnel */}
      <section className="bg-gray-50/60 border-t border-gray-100 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 mb-4">
              L&apos;histoire
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
              Comment est né Rivjob
            </h2>
          </Reveal>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <Reveal delayMs={0}>
              <p>
                {/* À valider avec Lucas : contexte personnel du déclic */}
                Tout est parti d&apos;un constat simple. Autour de moi, des amis, des proches,
                envoyaient des dizaines de candidatures sans jamais recevoir de réponse. Pas un
                refus. Pas un accusé de réception. Juste le silence.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p>
                {/* À valider avec Lucas : moment précis du déclic */}
                J&apos;ai compris qu&apos;il ne s&apos;agissait pas d&apos;un manque de compétences.
                Le problème était ailleurs : les CV ne passaient pas les filtres automatiques
                mis en place par les recruteurs, ces fameux <strong>ATS</strong> (Applicant
                Tracking Systems). Un mot-clé manquant, un format inadapté, et le CV disparaît
                dans une base de données que personne ne consultera.
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p>
                Aux États-Unis, un outil existait déjà pour aider les candidats : Jobscan. Mais
                en France, rien d&apos;équivalent, rien qui parle vraiment aux candidats
                francophones, à leurs codes, à leur marché.
              </p>
            </Reveal>
            <Reveal delayMs={300}>
              <p>
                J&apos;ai décidé de le construire. <strong>Rivjob</strong> est né de cette
                envie : donner à chaque candidat un outil simple, gratuit à l&apos;essai, qui
                lui dit clairement pourquoi son CV ne passe pas — et qui l&apos;aide à
                l&apos;adapter en quelques secondes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Portrait du créateur */}
      <section className="bg-white border-t border-gray-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">
                Le créateur
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Derrière Rivjob
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
            <Reveal>
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
            </Reveal>

            <Reveal delayMs={100}>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Lucas Le Donne</h3>
                  <p className="text-sm font-semibold text-indigo-600 mt-1">
                    Fondateur de Rivjob
                  </p>
                </div>
                <p>
                  {/* À valider avec Lucas : parcours + bio courte */}
                  Je suis Lucas, fondateur de Rivjob. J&apos;ai lancé ce projet parce que je
                  crois profondément que la recherche d&apos;emploi ne devrait pas être une
                  loterie réservée à ceux qui connaissent les bons codes.
                </p>
                <p>
                  {/* À valider avec Lucas : vision produit */}
                  Ma conviction est simple : un bon candidat mérite qu&apos;on lise son CV.
                  Rivjob n&apos;est pas un outil pour tricher — c&apos;est un outil pour rendre
                  visible ce qui l&apos;est déjà dans votre parcours.
                </p>
                <p>
                  Je construis Rivjob à taille humaine, en France, en écoutant chaque
                  utilisateur. Si vous avez une question, une remarque, ou juste envie
                  d&apos;en discuter :
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="mailto:contact@rivjob.ai"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
                  >
                    contact@rivjob.ai
                  </a>
                  <a
                    href="https://www.instagram.com/rivjob.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
                  >
                    @rivjob.ai
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Ce que Rivjob permet de faire */}
      <section className="bg-gray-50/60 border-t border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Ce que vous pouvez faire avec Rivjob
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Un outil, une mission : maximiser vos chances de passer les filtres et
                d&apos;être lu par un vrai recruteur.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delayMs={0}>
              <MissionCard
                titre="Analyser votre CV"
                texte="Collez votre CV et une offre. Recevez un score de correspondance et la liste des mots-clés manquants."
                href="/analyser"
                cta="Analyser mon CV"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </Reveal>
            <Reveal delayMs={100}>
              <MissionCard
                titre="Adapter votre CV à chaque offre"
                texte="Notre IA réécrit votre CV pour intégrer les bons mots-clés, sans jamais mentir sur votre parcours."
                href="/analyser"
                cta="Adapter mon CV"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              />
            </Reveal>
            <Reveal delayMs={200}>
              <MissionCard
                titre="Utiliser des modèles ATS"
                texte="3 templates gratuits pensés pour passer les filtres et rester lisibles pour un humain."
                href="/modeles-cv"
                cta="Voir les modèles"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. CTA final */}
      <section className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Prêt à donner une vraie chance à votre CV ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            L&apos;analyse est gratuite, sans compte, en moins d&apos;une minute.
          </p>
          <Link
            href="/analyser"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:text-indigo-700 px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Analyser mon CV gratuitement
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

function StatCard({ chiffre, source, texte }: { chiffre: string; source: string; texte: string }) {
  return (
    <div className="bg-white ring-1 ring-gray-200 shadow-xl rounded-2xl p-8 h-full">
      <div className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent mb-3">
        {chiffre}
      </div>
      <p className="text-gray-700 leading-relaxed">{texte}</p>
      <p className="text-xs text-gray-400 mt-4 italic">{source}</p>
    </div>
  );
}

function MissionCard({
  titre,
  texte,
  href,
  cta,
  icon,
}: {
  titre: string;
  texte: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white ring-1 ring-gray-200 shadow-xl rounded-2xl p-8 h-full flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-3">{titre}</h3>
      <p className="text-gray-600 leading-relaxed flex-1">{texte}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        {cta}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
