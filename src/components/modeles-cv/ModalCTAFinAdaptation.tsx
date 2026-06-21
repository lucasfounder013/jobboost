"use client";

import { useRouter } from "next/navigation";
import { CVStructure } from "@/types/cv";
import { sauvegarderCvPourFunnel } from "@/lib/cv-localstorage";

type Props = {
  cv: CVStructure;
  onClose: () => void;
};

export default function ModalCTAFinAdaptation({ cv, onClose }: Props) {
  const router = useRouter();

  function continuer() {
    sauvegarderCvPourFunnel(cv);
    router.push("/register?source=modele-cv");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">CV téléchargé !</h2>
        </div>

        <p className="text-gray-700 leading-relaxed mb-2">
          Une étape de plus pour décrocher l&apos;entretien : <strong>adaptez votre CV à chaque offre d&apos;emploi</strong> avec notre IA.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          JobBoost analyse votre CV par rapport à l&apos;offre visée et le réécrit pour mettre en avant les bons mots-clés.{" "}
          <strong className="text-gray-700">3 essais gratuits</strong>, sans engagement.
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold text-sm transition-colors"
          >
            Plus tard
          </button>
          <button
            type="button"
            onClick={continuer}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 transition-all"
          >
            Adapter mon CV →
          </button>
        </div>
      </div>
    </div>
  );
}
