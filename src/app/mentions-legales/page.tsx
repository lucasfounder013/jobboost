import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Mentions légales — JobBoost" };

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-gray-900">JobBoost</span>
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Mentions légales</h1>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Éditeur du site</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le présent site, accessible à l&apos;adresse <strong>jobboost.fr</strong>, est édité par :<br /><br />
            <strong>Lucas LE DONNE</strong>, entrepreneur individuel (micro-entreprise)<br />
            Exerçant sous le nom commercial <strong>LBM</strong><br />
            Adresse : 100 rue Baudin, 92300 Levallois-Perret, France<br />
            Email : <a href="mailto:contact@jobboost.fr" className="text-indigo-600 hover:underline">contact@jobboost.fr</a><br />
            Numéro SIRET : 99395382700017<br /><br />
            Directeur de la publication : Lucas LE DONNE
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Hébergement</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site est hébergé par :<br /><br />
            <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 1600<br />
            San Francisco, CA 94104, États-Unis
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Activité</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site propose un service numérique permettant d&apos;analyser la correspondance entre un CV et une offre d&apos;emploi, et d&apos;adapter automatiquement le CV pour les systèmes de suivi ATS, à l&apos;aide d&apos;intelligence artificielle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Propriété intellectuelle</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Tous les éléments du site (textes, graphismes, logo, interface) sont protégés par le droit de la propriété intellectuelle. Toute reproduction sans autorisation expresse est interdite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Responsabilité</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les contenus générés sont produits automatiquement par intelligence artificielle. Ils sont fournis à titre indicatif et peuvent contenir des erreurs ou des imprécisions. L&apos;utilisateur est seul responsable de l&apos;usage qu&apos;il en fait.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
