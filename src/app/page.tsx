"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Footer from "@/components/Footer";
import DemoPlayer from "@/components/DemoPlayer";
import DemoClip from "@/components/DemoClip";

const NB_BRIQUES = 4;

const FAQ = [
  {
    q: "Rivjob est-il vraiment gratuit ?",
    r: "L'analyse de votre CV est gratuite : score de correspondance et aperçu des mots-clés manquants, sans carte bancaire. Il suffit de créer un compte gratuit en 30 secondes. L'adaptation complète du CV, les lettres et le suivi Kanban font partie des plans payants, à partir de 4,99 €/mois (Starter) ou 9,99 €/mois (Pro), sans engagement.",
  },
  {
    q: "Est-ce que l'IA va inventer des choses sur mon CV ?",
    r: "Non, et c'est un principe absolu chez nous. Rivjob reformule et réorganise ce qui existe déjà dans votre CV : il intègre les bons mots-clés, améliore les formulations, restructure. Il n'ajoute jamais une expérience, un chiffre ou un diplôme que vous n'avez pas.",
  },
  {
    q: "Qu'est-ce qu'un ATS, concrètement ?",
    r: "Un logiciel de tri utilisé par la majorité des recruteurs (Indeed, LinkedIn, Welcome to the Jungle et la plupart des grandes entreprises en utilisent). Il scanne votre CV, cherche les mots-clés de l'offre, et classe les candidatures. Un bon profil mal formulé peut être classé loin derrière, c'est exactement ce que Rivjob corrige.",
  },
  {
    q: "En quoi est-ce mieux que ChatGPT ?",
    r: "ChatGPT réécrit un texte. Rivjob pilote votre recherche : score objectif sur 100, mots-clés ATS structurés, CV adapté offre par offre, suivi Kanban, emails de recruteurs, relances. Et il est calibré pour le marché français, pas pour des CV américains.",
  },
  {
    q: "Quels formats de CV sont acceptés ?",
    r: "PDF et Word (.docx). Vous pouvez aussi coller directement le texte. Le CV optimisé s'exporte en PDF ou Word, prêt à envoyer.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    r: "Oui, en un clic depuis votre compte, sans justification. Vous gardez l'accès jusqu'à la fin de la période payée. La plupart de nos utilisateurs partent pour la meilleure raison du monde : ils ont trouvé.",
  },
  {
    q: "Combien de temps pour voir des résultats ?",
    r: "Le score et les mots-clés : 30 secondes. Le CV adapté : quelques secondes de plus. Pour les réponses des recruteurs, aucun outil honnête ne peut vous promettre un délai. Mais un CV bien lu par les ATS, c'est la condition pour que votre profil ait sa chance.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    r: "Oui. Vos CV et candidatures restent privés, ne sont jamais revendus, et vous pouvez tout supprimer à tout moment. Conforme RGPD.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function PagePrincipale() {
  const briquesContainerRef = useRef<HTMLDivElement>(null);
  // Effet "stacked cards on scroll" (façon gojiberry.ai) : chaque carte se
  // réduit/s'estompe légèrement quand la suivante vient la recouvrir, piloté
  // par la progression de scroll du conteneur entier (framer-motion). Le
  // sticky/empilement lui-même reste en CSS pur ; desktop uniquement,
  // désactivé si prefers-reduced-motion (le layout repasse en flux normal
  // via les classes motion-reduce: côté CSS, et on coupe aussi le scale/opacity).
  const { scrollYProgress: progressionBriques } = useScroll({
    target: briquesContainerRef,
    offset: ["start start", "end end"],
  });
  const [effetBriquesActif, setEffetBriquesActif] = useState(false);
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const majEtat = () => setEffetBriquesActif(mqDesktop.matches && !mqReduced.matches);
    majEtat();
    mqDesktop.addEventListener("change", majEtat);
    mqReduced.addEventListener("change", majEtat);
    return () => {
      mqDesktop.removeEventListener("change", majEtat);
      mqReduced.removeEventListener("change", majEtat);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">

        {/* ══════════════ HERO ══════════════ */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-14 text-center">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-7 tracking-wide uppercase">
              Analyse gratuite · Résultat en 30 secondes
            </span>

            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15] mb-6">
              Découvrez en 30 secondes pourquoi{" "}
              <span
                className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent animate-shimmer"
                style={{ backgroundSize: "200% auto" }}
              >
                votre CV reste sans réponse
              </span>
            </h1>

            <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed mb-9">
              Collez votre CV et l&apos;offre qui vous intéresse. Rivjob vous donne votre score de correspondance, les mots-clés attendus par les ATS, et réécrit votre CV pour qu&apos;il soit bien lu.
            </p>

            <Link
              href="/analyser"
              className="relative group inline-block overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">Analyser mon CV gratuitement</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
            </Link>

            <p className="text-gray-400 text-xs mt-4">
              Gratuit · Sans carte bancaire · Compte en 30 secondes
            </p>
          </div>
        </section>

        {/* ══════════════ VIDÉO DÉMO ══════════════ */}
        <section id="demo" className="bg-white px-6 pt-4 pb-14">
          <Reveal className="max-w-5xl mx-auto">
            {/* Chrome de navigateur */}
            <div className="rounded-t-xl bg-gray-100 border border-b-0 border-gray-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="bg-white rounded-full px-4 py-1 text-xs text-gray-400 ring-1 ring-gray-200">
                  www.rivjob.ai
                </span>
              </div>
            </div>

            {/* Vidéo démo */}
            <DemoPlayer src="/videos/demo-rivjob-v2.mp4" />
          </Reveal>
        </section>

        {/* Barre de preuve */}
        <section className="bg-white border-t border-gray-100 px-6 pb-16">
          <div className="max-w-lg mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
            <span><span className="font-extrabold text-gray-900">+2 400</span> CV analysés</span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span><span className="font-extrabold text-gray-900">92 %</span> découvrent des mots-clés manquants</span>
          </div>
        </section>

        {/* ══════════════ PROBLÈME / AGITATION ══════════════ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-12">
              Vous envoyez des candidatures. Vous ne recevez que du silence.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left mb-12">
              {[
                {
                  titre: "Aucune réponse, aucune explication.",
                  desc: "Votre profil correspond, pourtant rien. Vous ne savez même pas si un humain a vu votre CV.",
                  icone: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  titre: "Réécrire son CV pour chaque offre prend des heures.",
                  desc: "Alors vous envoyez le même partout. Et les ATS le classent derrière ceux qui utilisent les bons mots-clés.",
                  icone: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  titre: "Votre recherche part dans tous les sens.",
                  desc: "Un tableur par-ci, des brouillons par-là. Impossible de savoir qui relancer, ni quand.",
                  icone: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
                },
              ].map(({ titre, desc, icone }) => (
                <div key={titre} className="bg-gray-50/60 rounded-2xl ring-1 ring-gray-200 shadow-sm p-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 mb-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icone} />
                    </svg>
                  </span>
                  <p className="font-bold text-gray-900 text-base mb-2">{titre}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-700 font-semibold text-base sm:text-lg">
              Ce n&apos;est pas votre profil le problème. C&apos;est la façon dont votre candidature est lue et pilotée.
            </p>
          </Reveal>
        </section>

        {/* ══════════════ LE PARCOURS — 4 BRIQUES ══════════════ */}
        <section className="bg-gray-50/60 border-t border-gray-100 px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                De candidature invisible à candidature pilotée.
              </h2>
              <p className="text-gray-500 text-base">Quatre étapes. Un seul outil.</p>
            </div>

            <div
              ref={briquesContainerRef}
              className="relative md:motion-safe:h-[400vh] md:motion-reduce:h-auto"
            >

              {/* ── Brique 1/4 — L'analyse ── */}
              <StickyBrique
                index={1}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={88}
                numero="1/4"
                titre="Voyez enfin ce que le recruteur voit."
                corps="Un ATS n'est pas un juge, c'est une base de données. Le recruteur y cherche ses candidats en tapant des mots-clés dans une barre de recherche, exactement comme sur Google. Rivjob compare votre CV à l'offre, calcule votre correspondance sur 100 et liste les mots exacts qu'il cherchera. En 30 secondes, vous savez ce qui manque pour qu'il tombe sur vous."
                visual={<DemoClip src="/videos/clips/demo-analyse.mp4" label="Analyse CV / offre" />}
              />

              {/* ── Brique 2/4 — L'adaptation ── */}
              <StickyBrique
                index={2}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={108}
                numero="2/4"
                titre="Un CV adapté à chaque offre. En un clic."
                corps="Rivjob reformule votre CV avec le vocabulaire de l'offre : mots-clés intégrés, formulations optimisées, mise en forme lisible par les ATS. Il réorganise et reformule ce que vous avez fait, il n'invente jamais rien."
                micro="Vos expériences, vos chiffres, vos diplômes. Juste mieux racontés."
                visual={<DemoClip src="/videos/clips/demo-adaptation.mp4" label="Adaptation du CV" />}
              />

              {/* ── Brique 3/4 — Le pilotage (Kanban) ── */}
              <StickyBrique
                index={3}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={128}
                numero="3/4"
                titre="Toutes vos candidatures. Un seul tableau de bord."
                corps="Chaque offre devient une carte : à postuler, envoyée, à relancer, entretien. Depuis chaque carte, adaptez votre CV pour cette offre, générez la lettre, trouvez l'email du recruteur, préparez l'entretien. Fini le tableur, votre recherche d'emploi a enfin un cockpit."
                micro="Relance automatique suggérée après 7 jours sans réponse."
                visual={<DemoClip src="/videos/clips/demo-dashboard.mp4" label="Tableau de bord" />}
              />

              {/* ── Brique 4/4 — Le suivi ── */}
              <StickyBrique
                index={4}
                progress={progressionBriques}
                actif={effetBriquesActif}
                topOffsetPx={148}
                numero="4/4"
                titre="Ne laissez plus une candidature sans suite."
                corps="Rivjob vous dit qui relancer et quand, génère votre lettre de motivation en cohérence avec le CV adapté, et vous prépare aux questions d'entretien du poste. Chaque candidature va au bout, pas seulement les trois premières."
                visual={<DemoClip src="/videos/clips/demo-suivi.mp4" label="Contact recruteur + suivi" />}
              />

            </div>
          </div>
        </section>

        {/* ══════════════ DIFFÉRENCIATION — UN SEUL OUTIL ══════════════ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <Reveal className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                Un outil. Toute votre recherche d&apos;emploi.
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">
                Arrêtez de jongler entre ChatGPT, Word, un tableur et douze onglets. Rivjob fait le travail de bout en bout, avec un score objectif que ChatGPT ne vous donnera jamais.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl ring-1 ring-gray-200 shadow-sm">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 font-semibold text-gray-500"></th>
                    <th className="p-4 font-semibold text-gray-500 whitespace-nowrap">À la main</th>
                    <th className="p-4 font-semibold text-gray-500 whitespace-nowrap">ChatGPT</th>
                    <th className="p-4 font-bold text-indigo-700 bg-indigo-50 whitespace-nowrap">Rivjob</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Score de correspondance objectif", "✕", "✕", "✅ /100"],
                    ["Mots-clés ATS structurés", "✕", "Approximatif", "✅ Liste exacte"],
                    ["CV adapté par offre", "Des heures", "Copier-coller à chaque fois", "✅ 1 clic"],
                    ["Suivi de toutes vos candidatures", "Tableur", "✕", "✅ Kanban intégré"],
                    ["Email du recruteur", "✕", "✕", "✅"],
                    ["Relances au bon moment", "De mémoire", "✕", "✅ Suggérées à J+7"],
                  ].map(([ligne, main, chatgpt, rivjob]) => (
                    <tr key={ligne}>
                      <td className="p-4 font-medium text-gray-900">{ligne}</td>
                      <td className="p-4 text-gray-400">{main}</td>
                      <td className="p-4 text-gray-400">{chatgpt}</td>
                      <td className="p-4 font-semibold text-gray-900 bg-indigo-50/50">{rivjob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              À partir de <span className="font-bold text-gray-900">4,99 €/mois</span>. Moins cher qu&apos;un café par semaine, pour la période la plus décisive de votre carrière.
            </p>
          </Reveal>
        </section>

        {/* ══════════════ PREUVE SOCIALE (chiffres) ══════════════ */}
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 px-6 py-16 border-t border-indigo-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
              Rivjob en chiffres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { chiffre: "+2 400", label: "CV analysés" },
                { chiffre: "92 %", label: "découvrent des mots-clés manquants dès la première analyse" },
                { chiffre: "3×", label: "plus rapide qu'une réécriture manuelle" },
              ].map(({ chiffre, label }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm ring-1 ring-indigo-100 p-6 text-center">
                  <p className="text-3xl font-extrabold text-indigo-600 mb-1">{chiffre}</p>
                  <p className="text-gray-500 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className="bg-white border-t border-gray-100 px-6 py-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">Questions fréquentes</h2>
            <div className="flex flex-col divide-y divide-gray-100">
              {FAQ.map(({ q, r }, i) => (
                <FaqItem key={i} question={q} reponse={r} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ CTA FINAL ══════════════ */}
        <section className="bg-gradient-to-b from-white to-indigo-50 border-t border-gray-100 px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Votre prochaine candidature peut être la bonne. Encore faut-il qu&apos;elle soit lue.
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Analysez votre CV maintenant. Gratuit, résultat en 30 secondes.
            </p>
            <Link
              href="/analyser"
              className="relative group inline-block overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">Analyser mon CV gratuitement</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl" />
            </Link>
            <p className="text-gray-400 text-xs mt-4">
              Sans carte bancaire · Sans engagement · +2 400 CV déjà analysés
            </p>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}

function FaqItem({ question, reponse }: { question: string; reponse: string }) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        className="w-full flex items-center justify-between gap-4 font-semibold text-gray-900 text-sm sm:text-base text-left"
      >
        <span>{question}</span>
        <span className={`shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold transition-transform duration-200 ${ouvert ? "rotate-45" : ""}`}>+</span>
      </button>
      {ouvert && (
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">{reponse}</p>
      )}
    </div>
  );
}

function BriqueHeader({ numero, titre, corps }: { numero: string; titre: string; corps: string }) {
  return (
    <div>
      <span className="inline-flex items-center justify-center text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1 mb-4">
        {numero}
      </span>
      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-3">{titre}</h3>
      <p className="text-gray-500 text-base sm:text-lg leading-relaxed">{corps}</p>
    </div>
  );
}

function StickyBrique({
  index,
  progress,
  actif,
  numero,
  titre,
  corps,
  micro,
  visual,
  topOffsetPx,
}: {
  index: number;
  progress: MotionValue<number>;
  actif: boolean;
  numero: string;
  titre: string;
  corps: string;
  micro?: string;
  visual: React.ReactNode;
  topOffsetPx: number;
}) {
  // i0 = position 0-based de la carte. Tant qu'elle est la carte "de devant",
  // une brique reste à scale/opacité pleins ; elle ne se réduit et ne
  // s'estompe qu'à partir du moment où la carte SUIVANTE arrive et
  // commence à la recouvrir (coverStart), jamais avant. Sans ce garde-fou,
  // la carte active elle-même devient légèrement transparente dès son
  // arrivée et laisse filtrer son texte à travers celle du dessus, créant
  // un effet "fantôme" illisible. L'opacité chute vite (fenêtre courte)
  // pour ne pas laisser de texte fantôme lisible ; le scale continue de
  // se réduire plus progressivement pour la profondeur. La dernière carte
  // n'est jamais recouverte, donc jamais transformée.
  const i0 = index - 1;
  const estDerniere = index === NB_BRIQUES;
  const coverStart = (i0 + 1) / NB_BRIQUES;
  const finFondu = coverStart + 0.5 / NB_BRIQUES;
  const cartesEmpileesDessus = NB_BRIQUES - 1 - i0;
  const targetScale = 1 - cartesEmpileesDessus * 0.05;
  const scale = useTransform(progress, [coverStart, 1], [1, targetScale]);
  const opacity = useTransform(progress, [coverStart, finFondu], [1, 0]);
  const appliquerEffet = actif && !estDerniere;

  return (
    <div
      className="mb-6 md:mb-0 md:motion-safe:sticky md:motion-reduce:static"
      style={{ top: topOffsetPx, zIndex: index }}
    >
      <motion.div
        className="bg-white rounded-3xl ring-1 ring-gray-200 shadow-xl shadow-gray-200/60 p-8 sm:p-14 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center will-change-transform"
        style={{
          minHeight: actif ? `calc(100vh - ${topOffsetPx}px)` : undefined,
          scale: appliquerEffet ? scale : 1,
          opacity: appliquerEffet ? opacity : 1,
        }}
      >
        <div>
          <BriqueHeader numero={numero} titre={titre} corps={corps} />
          {micro && <p className="text-gray-400 text-base mt-4">{micro}</p>}
        </div>
        <div className="w-full">{visual}</div>
      </motion.div>
    </div>
  );
}

function Reveal({ children, className = "", delayMs = 0 }: { children: React.ReactNode; className?: string; delayMs?: number }) {
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
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
