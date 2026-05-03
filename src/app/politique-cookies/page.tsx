import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "Politique de cookies — JobBoost" };

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-gray-900">JobBoost</span>
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Politique de cookies</h1>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Cookies utilisés</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            JobBoost utilise uniquement des cookies strictement nécessaires au fonctionnement du service. Aucun cookie publicitaire, de tracking ou d&apos;analyse tiers n&apos;est déposé.
          </p>
          <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600 leading-relaxed">
            <p className="font-semibold text-gray-800 mb-2">Cookie de session — <code className="text-indigo-600 text-xs">better-auth.session_token</code></p>
            <p><strong>Finalité :</strong> maintenir la connexion de l&apos;utilisateur entre les pages.</p>
            <p className="mt-1"><strong>Durée :</strong> durée de la session (supprimé à la déconnexion).</p>
            <p className="mt-1"><strong>Type :</strong> cookie strictement nécessaire — ne nécessite pas de consentement.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Stockage local (localStorage)</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site utilise le stockage local du navigateur (<code className="text-indigo-600 text-xs">localStorage</code>) pour conserver temporairement le contenu saisi (CV, offre d&apos;emploi) avant une redirection vers la page de connexion. Ces données sont supprimées automatiquement dès que la session est établie.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Gestion des cookies</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies. Notez que la désactivation du cookie de session empêchera la connexion au service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Contact</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pour toute question : <a href="mailto:contact@jobboost.fr" className="text-indigo-600 hover:underline">contact@jobboost.fr</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
