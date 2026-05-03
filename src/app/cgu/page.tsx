import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Conditions Générales d'Utilisation — JobBoost" };

export default function CGU() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-gray-900">JobBoost</span>
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Conditions Générales d&apos;Utilisation (CGU)</h1>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">1. Accès au service</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site jobboost.fr est accessible à tout utilisateur disposant d&apos;un accès internet. Certaines fonctionnalités (sauvegarde des analyses, adaptation de CV) nécessitent la création d&apos;un compte.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">2. Description du service</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            JobBoost est un service d&apos;analyse de CV basé sur l&apos;intelligence artificielle. Il permet d&apos;évaluer la correspondance entre un CV et une offre d&apos;emploi, et de générer une version adaptée du CV optimisée pour les systèmes ATS.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">3. Engagements de l&apos;utilisateur</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            L&apos;utilisateur s&apos;engage à fournir des informations exactes et à utiliser le service conformément à sa destination. Il s&apos;engage notamment à ne pas :
          </p>
          <ul className="text-sm text-gray-600 leading-relaxed list-disc list-inside space-y-1">
            <li>Utiliser le service à des fins frauduleuses ou illégales</li>
            <li>Tenter d&apos;accéder aux systèmes techniques du site</li>
            <li>Revendre ou exploiter commercialement les contenus générés sans autorisation</li>
            <li>Soumettre des contenus contenant des données sensibles de tiers sans leur consentement</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            L&apos;éditeur se réserve le droit de suspendre ou de supprimer un compte en cas de non-respect des présentes conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">4. Compte utilisateur</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;utilisateur est responsable de la confidentialité de ses identifiants de connexion. En cas de compromission de son compte, il doit en informer immédiatement l&apos;éditeur à <a href="mailto:contact@jobboost.fr" className="text-indigo-600 hover:underline">contact@jobboost.fr</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">5. Contenus générés</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les contenus (analyses, CV adaptés) sont générés automatiquement par intelligence artificielle. Ils doivent être vérifiés et adaptés par l&apos;utilisateur avant toute utilisation. L&apos;éditeur ne garantit ni l&apos;exactitude ni les résultats obtenus à partir de ces contenus.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">6. Limitation de responsabilité</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;éditeur s&apos;engage à maintenir le service accessible dans les meilleures conditions possibles, mais ne garantit pas une disponibilité continue. Il ne peut être tenu responsable des interruptions liées à des causes extérieures (hébergeur, réseau, tiers).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">7. Modification des CGU</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes CGU peuvent être modifiées à tout moment. L&apos;utilisateur sera informé des modifications substantielles par email. La poursuite de l&apos;utilisation du service vaut acceptation des nouvelles conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">8. Droit applicable</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes CGU sont soumises au droit français. Contact : <a href="mailto:contact@jobboost.fr" className="text-indigo-600 hover:underline">contact@jobboost.fr</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
