import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Conditions Générales de Vente | Rivjob",
  description: "Consultez les CGV de Rivjob : tarifs, modalités de souscription et de résiliation de nos offres Pro d'optimisation de CV.",
};

export default function CGV() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Conditions Générales de Vente (CGV)</h1>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">1. Objet</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes CGV régissent les ventes de services numériques proposés sur le site rivjob.ai par Lucas LE DONNE (SIRET : 99395382700017).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">2. Description du service</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Rivjob permet d&apos;analyser automatiquement la correspondance entre un CV et une offre d&apos;emploi, et d&apos;adapter le CV pour optimiser sa lisibilité par les systèmes ATS (Applicant Tracking System), grâce à l&apos;intelligence artificielle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">3. Prix</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les prix sont indiqués en euros TTC. Le service propose :
          </p>
          <ul className="mt-2 text-sm text-gray-600 leading-relaxed list-disc list-inside space-y-1">
            <li>Une version gratuite : 3 analyses de CV (sans adaptation ni lettre de motivation)</li>
            <li>Abonnement mensuel : <strong>17,99 € / mois</strong></li>
            <li>Accès à vie (paiement unique) : <strong>29,99 €</strong></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">4. Abonnement et accès à vie</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;abonnement mensuel est à reconduction automatique. L&apos;utilisateur peut résilier à tout moment depuis son espace abonnement ou via le portail Stripe. La résiliation prend effet à la fin de la période en cours. Toute période entamée est due et ne peut donner lieu à remboursement.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            L&apos;accès à vie est un paiement unique donnant un accès illimité au service pour toute la durée d&apos;existence de la plateforme. Il n&apos;est pas remboursable après activation (voir article 6).
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            L&apos;éditeur se réserve le droit de suspendre ou de limiter l&apos;accès au service en cas d&apos;utilisation abusive ou frauduleuse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">5. Paiement</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les paiements sont sécurisés et traités exclusivement via <strong>Stripe</strong>. Les informations bancaires ne sont pas stockées par Rivjob.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">6. Droit de rétractation</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Conformément à l&apos;article L221-28 du Code de la consommation, l&apos;utilisateur accepte expressément que la fourniture du service numérique commence immédiatement après le paiement et renonce à son droit de rétractation de 14 jours.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">7. Responsabilité</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le service repose sur de l&apos;intelligence artificielle. Les contenus générés peuvent contenir des erreurs et ne garantissent aucun résultat (notamment l&apos;obtention d&apos;un emploi). L&apos;éditeur ne peut être tenu responsable de l&apos;usage fait des contenus générés.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">8. Résiliation</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;utilisateur peut résilier son abonnement à tout moment depuis la page <Link href="/abonnement" className="text-indigo-600 hover:underline">Mon abonnement</Link>. La résiliation prend effet à la fin de la période d&apos;abonnement en cours.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">9. Litiges</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le droit applicable est le droit français. En cas de litige, une solution amiable sera recherchée en priorité. Contact : <a href="mailto:contact@rivjob.ai" className="text-indigo-600 hover:underline">contact@rivjob.ai</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
