import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Politique de confidentialité — JobBoost" };

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-gray-900">JobBoost</span>
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Politique de confidentialité</h1>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">1. Données collectées</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site collecte les données suivantes :
          </p>
          <ul className="mt-2 text-sm text-gray-600 leading-relaxed list-disc list-inside space-y-1">
            <li>Adresse email (lors de la création de compte)</li>
            <li>Contenu de l&apos;offre d&apos;emploi saisie (traitement temporaire, non stocké en base de données)</li>
            <li>CV fourni par l&apos;utilisateur (traitement temporaire en mémoire, non stocké en base de données)</li>
            <li>Résultats d&apos;analyse et CV adaptés (sauvegardés si l&apos;utilisateur est connecté)</li>
            <li>Données de navigation (cookies de session)</li>
            <li>Données de paiement (gérées exclusivement par Stripe, non accessibles par JobBoost)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">2. Finalité</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les données sont utilisées pour fournir le service d&apos;analyse et d&apos;adaptation de CV, gérer les comptes utilisateurs, traiter les paiements, et améliorer le service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">3. Base légale</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le traitement des données repose sur l&apos;exécution du contrat (fourniture du service) et, le cas échéant, le consentement de l&apos;utilisateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">4. Sous-traitants et transferts</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            Les données peuvent être traitées par les prestataires suivants, situés hors de l&apos;Union européenne (États-Unis), dans le respect des garanties appropriées (clauses contractuelles types ou décision d&apos;adéquation) :
          </p>
          <ul className="text-sm text-gray-600 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Anthropic</strong> — génération de contenu par intelligence artificielle</li>
            <li><strong>Stripe</strong> — traitement des paiements</li>
            <li><strong>Supabase</strong> — base de données (stockage des comptes et historiques)</li>
            <li><strong>Vercel</strong> — hébergement du site</li>
            <li><strong>Resend</strong> — envoi d&apos;emails transactionnels</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">5. Durée de conservation</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les données de compte et les historiques d&apos;analyse sont conservés pendant la durée d&apos;activité du compte. Le contenu brut des CV n&apos;est jamais conservé en base de données — il transite uniquement en mémoire le temps de l&apos;analyse. Les données peuvent être supprimées à tout moment sur demande.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">6. Droits de l&apos;utilisateur</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à :{" "}
            <a href="mailto:contact@jobboost.fr" className="text-indigo-600 hover:underline">contact@jobboost.fr</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">7. Sécurité</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les données sont protégées par des mesures techniques appropriées : connexions chiffrées (HTTPS), accès restreint à la base de données, jetons de session sécurisés.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
