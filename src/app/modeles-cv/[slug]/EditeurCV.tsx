"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CVStructure } from "@/types/cv";
import { TemplateSlug, getTemplate } from "@/lib/cv-templates";
import { SectionId, normaliserOrdre } from "@/lib/cv-sections";
import {
  chargerCvBrouillon,
  sauvegarderCvBrouillon,
  sauvegarderTemplateActif,
  chargerOrdreSections,
  sauvegarderOrdreSections,
} from "@/lib/cv-localstorage";
import { CV_EXEMPLE } from "@/lib/cv-exemple";
import FormulaireCV from "@/components/modeles-cv/FormulaireCV";
import PreviewRouter from "@/components/modeles-cv/PreviewRouter";
import ModalCTAFinAdaptation from "@/components/modeles-cv/ModalCTAFinAdaptation";
import BoutonEnregistrer from "@/components/modeles-cv/BoutonEnregistrer";

type Props = {
  templateSlug: TemplateSlug;
};

export default function EditeurCV({ templateSlug }: Props) {
  const searchParams = useSearchParams();
  const cvIdParam = searchParams.get("cvId");

  // Initialisation paresseuse : on lit localStorage si dispo, sinon CV exemple.
  // Si un cvId est présent dans l'URL, on écrase avec le CV distant dès que la requête aboutit.
  const [cv, setCv] = useState<CVStructure>(() => chargerCvBrouillon() ?? CV_EXEMPLE);
  const [ordreSections, setOrdreSectionsLocal] = useState<SectionId[]>(() => normaliserOrdre(chargerOrdreSections()));
  const [telechargementEnCours, setTelechargementEnCours] = useState<"pdf" | "docx" | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [cvId, setCvId] = useState<string | null>(cvIdParam);
  const [chargementCv, setChargementCv] = useState<boolean>(!!cvIdParam);

  const template = getTemplate(templateSlug);

  // Charger le CV depuis l'API quand ?cvId=xxx est présent
  useEffect(() => {
    if (!cvIdParam) return;
    let annule = false;
    setChargementCv(true);
    fetch(`/api/cv-modele/${cvIdParam}`)
      .then((r) => {
        if (!r.ok) throw new Error("CV introuvable ou accès refusé.");
        return r.json();
      })
      .then((data: { cv: CVStructure; ordreSections: SectionId[]; id: string }) => {
        if (annule) return;
        setCv(data.cv);
        setOrdreSectionsLocal(normaliserOrdre(data.ordreSections));
        setCvId(data.id);
      })
      .catch((e: Error) => {
        if (!annule) setErreur(e.message);
      })
      .finally(() => {
        if (!annule) setChargementCv(false);
      });
    return () => {
      annule = true;
    };
  }, [cvIdParam]);

  function onOrdreChange(nouvelOrdre: SectionId[]) {
    setOrdreSectionsLocal(nouvelOrdre);
    sauvegarderOrdreSections(nouvelOrdre);
  }

  // Persister le slug actif dès qu'il change (utile pour navigation hors éditeur)
  useEffect(() => {
    sauvegarderTemplateActif(templateSlug);
  }, [templateSlug]);

  // Debounce 500ms sur la persistance du CV en localStorage.
  // On ne persiste pas pendant le chargement d'un CV distant (évite d'écraser le brouillon anonyme).
  useEffect(() => {
    if (chargementCv) return;
    const timer = setTimeout(() => {
      sauvegarderCvBrouillon(cv);
    }, 500);
    return () => clearTimeout(timer);
  }, [cv, chargementCv]);

  async function telecharger(format: "pdf" | "docx") {
    setErreur(null);
    setTelechargementEnCours(format);
    try {
      const reponse = await fetch("/api/exporter-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, format, template: templateSlug, ordreSections }),
      });
      if (!reponse.ok) {
        const data = await reponse.json().catch(() => ({ error: "Erreur inconnue" }));
        throw new Error(data.error || "Erreur lors de la génération du fichier");
      }
      const blob = await reponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const nomFichier = (cv.nom || "cv").toLowerCase().replace(/\s+/g, "_");
      a.download = `${nomFichier}_cv.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setModalOuvert(true);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setTelechargementEnCours(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* En-tête éditeur */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <Link href="/modeles-cv" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Tous les modèles
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Modèle de CV {template?.nom}
        </h1>
        <p className="text-gray-500 mt-1">
          Remplissez le formulaire, votre CV se met à jour en temps réel. Téléchargez-le quand vous voulez.
        </p>
      </div>

      {/* Split screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        {/* Colonne formulaire */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl ring-1 ring-gray-200 p-4 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => telecharger("pdf")}
                disabled={telechargementEnCours !== null}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200/60 transition-all"
              >
                {telechargementEnCours === "pdf" ? "Génération…" : "Télécharger en PDF"}
              </button>
              <button
                type="button"
                onClick={() => telecharger("docx")}
                disabled={telechargementEnCours !== null}
                className="flex-1 bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                {telechargementEnCours === "docx" ? "Génération…" : "Télécharger en Word"}
              </button>
            </div>
            <BoutonEnregistrer
              cv={cv}
              templateSlug={templateSlug}
              ordreSections={ordreSections}
              cvId={cvId}
              onSaved={(id) => setCvId(id)}
            />
          </div>

          {erreur && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {erreur}
            </div>
          )}

          <FormulaireCV
            cv={cv}
            onChange={setCv}
            templateSlug={templateSlug}
            ordreSections={ordreSections}
            onOrdreChange={onOrdreChange}
          />
        </div>

        {/* Colonne preview (sticky en desktop) */}
        <div>
          <div className="lg:sticky lg:top-4 bg-white rounded-xl ring-1 ring-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Aperçu</span>
              <span className="text-xs text-gray-400">Modèle : {template?.nom}</span>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <PreviewRouter cv={cv} templateSlug={templateSlug} fluid ordreSections={ordreSections} />
            </div>
          </div>
        </div>
      </div>

      {modalOuvert && (
        <ModalCTAFinAdaptation cv={cv} onClose={() => setModalOuvert(false)} />
      )}
    </div>
  );
}
