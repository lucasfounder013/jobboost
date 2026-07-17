"use client";

import Link from "next/link";
import Image from "next/image";

export default function APropos() {
  return (
    <main className="min-h-screen bg-[#F7F2E9] text-[#2A2419] antialiased selection:bg-amber-200/60">
      {/* Texture papier subtile */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <article className="relative max-w-2xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        {/* En-tête type journal manuscrit */}
        <header className="mb-16 sm:mb-20">
          <div
            className="text-sm tracking-widest uppercase text-[#8B7355] mb-8"
            style={{ fontFamily: "var(--font-manuscrite)" }}
          >
            <span className="text-2xl normal-case tracking-normal">Une lettre</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-[#1A1510]"
            style={{ fontFamily: "var(--font-serif-editorial)" }}
          >
            Si vous êtes ici,
            <br />
            <em className="italic text-[#7A6244]">
              c&apos;est probablement
              <br />
              qu&apos;on vous a ignoré.
            </em>
          </h1>

          <p className="mt-8 text-base sm:text-lg text-[#5C4E3A] leading-relaxed">
            Une candidature. Puis dix. Puis cinquante. Et pas une réponse.
            <br />
            Je sais ce que c&apos;est. Je vais vous raconter pourquoi j&apos;ai créé Rivjob.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-[#8B7355]">
            <div className="h-px w-12 bg-[#C4A87A]" />
            <span
              className="text-2xl text-[#7A6244]"
              style={{ fontFamily: "var(--font-manuscrite)" }}
            >
              Lucas
            </span>
            <div className="h-px flex-1 bg-[#C4A87A]/40" />
          </div>
        </header>

        {/* Photo polaroid inclinée */}
        <div className="my-16 sm:my-20 flex justify-center">
          <div className="relative rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            <div className="bg-white p-3 pb-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 bg-[#EFE7D8] overflow-hidden">
                {/* Photo à ajouter dans /public/photos/lucas-ledonne.jpg */}
                <Image
                  src="/photos/lucas-ledonne.jpg"
                  alt="Lucas Le Donne"
                  fill
                  className="object-cover grayscale-[0.15] contrast-[1.02]"
                  sizes="(max-width: 640px) 224px, 288px"
                />
              </div>
              <p
                className="absolute bottom-4 left-0 right-0 text-center text-2xl text-[#5C4E3A]"
                style={{ fontFamily: "var(--font-manuscrite)" }}
              >
                Lucas, quelque part en 2026
              </p>
            </div>
          </div>
        </div>

        {/* Corps du récit */}
        <div
          className="prose-personal space-y-8 text-lg leading-[1.85] text-[#2A2419]"
          style={{ fontFamily: "var(--font-serif-editorial)" }}
        >
          <p className="text-2xl leading-relaxed">
            <span className="float-left text-6xl leading-[0.85] mr-3 mt-2 text-[#7A6244]">B</span>
            onjour. Je m&apos;appelle Lucas. J&apos;ai créé ce site parce que quelque
            chose m&apos;a mis en colère.
          </p>

          {/* À valider : contexte perso du déclic */}
          <p>
            Il y a quelques mois, une amie proche cherchait un poste. Compétente, motivée,
            diplômée. Elle a envoyé plus de <em>quatre-vingts candidatures</em>. Elle a reçu
            trois réponses. Trois. Pas trois entretiens — trois <em>accusés de réception
            automatiques</em>.
          </p>

          <p>
            Elle m&apos;a demandé si son CV était mauvais. Il ne l&apos;était pas. Il était
            juste <em>invisible</em>.
          </p>

          <aside className="my-12 border-l-2 border-[#C4A87A] pl-6 py-2 text-[#5C4E3A]">
            <p className="italic">
              Ce que personne ne lui avait dit : avant qu&apos;un humain ne lise son CV,
              un logiciel décide s&apos;il mérite d&apos;être lu. Ce logiciel s&apos;appelle
              un ATS. Il filtre. Il classe. Il jette.
            </p>
          </aside>

          <p>
            J&apos;ai commencé à creuser. J&apos;ai découvert que la majorité des grandes
            entreprises françaises utilisent ces filtres. J&apos;ai découvert qu&apos;un
            recruteur passe en moyenne <em>trente secondes</em> sur un CV — quand il le
            reçoit. J&apos;ai découvert que la plupart des candidats n&apos;en savaient
            rien.
          </p>

          <p>
            Aux États-Unis, il existait déjà un outil pour aider les candidats à passer
            ces filtres. Il s&apos;appelle Jobscan. En France, <em>rien</em>. Pas d&apos;équivalent,
            pas d&apos;alternative pensée pour notre marché, notre langue, nos codes.
          </p>

          <p className="text-xl">
            Alors je l&apos;ai construit.
          </p>

          {/* À valider : ton perso sur la construction */}
          <p>
            Rivjob n&apos;est pas une startup avec des levées de fonds et une équipe de
            trente personnes. C&apos;est un outil que je fais grandir tout seul, à taille
            humaine, en écoutant chaque utilisateur qui m&apos;écrit.
          </p>

          <p>
            L&apos;analyse est gratuite. Sans compte. Sans email. Vous collez votre CV,
            vous collez l&apos;offre, et vous voyez immédiatement ce qui manque. Si vous
            voulez ensuite adapter votre CV automatiquement, c&apos;est là que Rivjob gagne
            un peu d&apos;argent — juste assez pour continuer à exister.
          </p>

          <aside className="my-12 border-l-2 border-[#C4A87A] pl-6 py-2 text-[#5C4E3A]">
            <p className="italic">
              Ce que Rivjob <em>n&apos;est pas</em> : un outil pour tricher. Ce n&apos;est
              pas fait pour inventer des compétences. C&apos;est fait pour mettre en
              lumière celles que vous avez déjà, et que le filtre allait rater.
            </p>
          </aside>

          <p>
            Je crois qu&apos;un bon candidat mérite qu&apos;on lise son CV. C&apos;est
            aussi simple que ça. Le reste — le score, les mots-clés, l&apos;IA — ce ne sont
            que des outils au service de cette idée.
          </p>

          <p>
            Si vous avez une question, une remarque, si quelque chose ne va pas ou si
            au contraire ça a changé quelque chose pour vous, écrivez-moi. Je réponds moi-même.
          </p>
        </div>

        {/* Signature manuscrite */}
        <div className="mt-16 pt-8">
          <p className="text-lg text-[#5C4E3A]" style={{ fontFamily: "var(--font-serif-editorial)" }}>
            Merci d&apos;être passé.
          </p>
          <p
            className="mt-4 text-5xl text-[#3A2E1E] leading-none"
            style={{ fontFamily: "var(--font-manuscrite)", fontWeight: 600 }}
          >
            Lucas
          </p>
          <a
            href="mailto:contact@rivjob.ai"
            className="mt-6 inline-block text-sm text-[#8B7355] hover:text-[#5C4E3A] underline underline-offset-4 decoration-[#C4A87A]"
          >
            contact@rivjob.ai
          </a>
        </div>

        {/* CTA très discret — pas de bouton coloré, juste un lien texte */}
        <footer className="mt-24 pt-10 border-t border-[#D4B896]/40">
          <p className="text-sm text-[#8B7355] italic mb-3" style={{ fontFamily: "var(--font-serif-editorial)" }}>
            P.-S.
          </p>
          <p className="text-base text-[#3A2E1E] leading-relaxed" style={{ fontFamily: "var(--font-serif-editorial)" }}>
            Si vous voulez essayer, c&apos;est{" "}
            <Link
              href="/analyser"
              className="text-[#7A6244] underline underline-offset-4 decoration-[#C4A87A] hover:text-[#5C4E3A] transition-colors"
            >
              par ici
            </Link>
            . C&apos;est gratuit, il n&apos;y a même pas besoin de créer un compte pour
            la première analyse.
          </p>
        </footer>
      </article>
    </main>
  );
}
