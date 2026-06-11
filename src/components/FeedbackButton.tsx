"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
// Icônes SVG inline — pas de dépendance externe
const IconMessage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

type TypeFeedback = "bug" | "suggestion" | "autre";
type Etat = "idle" | "loading" | "success" | "error";

export function FeedbackButton() {
  const { data: session } = useSession();
  const [ouvert, setOuvert] = useState(false);
  const [type, setType] = useState<TypeFeedback>("suggestion");
  const [message, setMessage] = useState("");
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreur, setErreur] = useState("");

  // Afficher uniquement pour les utilisateurs connectés
  if (!session) return null;

  const envoyer = async () => {
    if (!message.trim()) {
      setErreur("Veuillez saisir un message.");
      return;
    }
    setEtat("loading");
    setErreur("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, email: session.user.email }),
      });
      if (!res.ok) throw new Error();
      setEtat("success");
      setTimeout(() => {
        setOuvert(false);
        setEtat("idle");
        setMessage("");
        setType("suggestion");
      }, 3000);
    } catch {
      setEtat("error");
      setErreur("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const labels: Record<TypeFeedback, string> = {
    bug: "🐛 Bug",
    suggestion: "💡 Suggestion",
    autre: "💬 Autre",
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOuvert(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#6D28D9] transition-all duration-200 text-sm font-medium"
        aria-label="Donner un feedback"
      >
        <IconMessage />
        Feedback
      </button>

      {/* Overlay + modale */}
      {ouvert && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-6 sm:items-center sm:justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOuvert(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setOuvert(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <IconX />
            </button>

            {etat === "success" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <IconCheck />
                <h2 className="text-lg font-semibold text-gray-900">Merci !</h2>
                <p className="text-gray-500 text-sm">
                  Votre message a bien été envoyé. Je vous répondrai dès que possible.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Donner un feedback
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Un bug ? Une idée ? Dites-moi tout.
                </p>

                {/* Sélecteur de type */}
                <div className="flex gap-2 mb-4">
                  {(["bug", "suggestion", "autre"] as TypeFeedback[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                        type === t
                          ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#7C3AED]"
                      }`}
                    >
                      {labels[t]}
                    </button>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (erreur) setErreur("");
                  }}
                  placeholder={
                    type === "bug"
                      ? "Décrivez le bug : que s'est-il passé ? Comment le reproduire ?"
                      : type === "suggestion"
                      ? "Quelle fonctionnalité aimeriez-vous voir ?"
                      : "Votre message..."
                  }
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                />

                {erreur && (
                  <p className="text-red-500 text-sm mt-1">{erreur}</p>
                )}

                <button
                  onClick={envoyer}
                  disabled={etat === "loading"}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-[#7C3AED] text-white py-2.5 rounded-xl font-medium text-sm hover:bg-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {etat === "loading" ? (
                    <span className="animate-pulse">Envoi en cours...</span>
                  ) : (
                    <>
                      <IconSend />
                      Envoyer
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
