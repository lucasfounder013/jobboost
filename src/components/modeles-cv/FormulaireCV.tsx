"use client";

import { useState, ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CVStructure } from "@/types/cv";
import { TemplateSlug } from "@/lib/cv-templates";
import {
  SectionId,
  SECTIONS_META,
  ICONE_USER,
  ICONE_HEADLINE,
  ICONE_DOCUMENT,
} from "@/lib/cv-sections";

type Props = {
  cv: CVStructure;
  onChange: (cv: CVStructure) => void;
  templateSlug: TemplateSlug;
  ordreSections: SectionId[];
  onOrdreChange: (ordre: SectionId[]) => void;
};

export default function FormulaireCV({
  cv,
  onChange,
  templateSlug,
  ordreSections,
  onOrdreChange,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // En Élégant : compétences toujours en colonne gauche (fixe), donc absente du DnD
  const competencesFixeEnGauche = templateSlug === "elegant";
  const idsDraggables = ordreSections.filter((id) => !(competencesFixeEnGauche && id === "competences"));

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = ordreSections.indexOf(active.id as SectionId);
    const newIndex = ordreSections.indexOf(over.id as SectionId);
    if (oldIndex < 0 || newIndex < 0) return;
    onOrdreChange(arrayMove(ordreSections, oldIndex, newIndex));
  }

  return (
    <div className="flex flex-col gap-2.5">
      {/* Cartes fixes en haut */}
      <CarteSection iconePath={ICONE_USER} titre="Informations personnelles" defautOuvert>
        <FormulaireHeader cv={cv} onChange={onChange} />
      </CarteSection>

      <CarteSection iconePath={ICONE_HEADLINE} titre="Titre du poste">
        <FormulaireHeadline cv={cv} onChange={onChange} />
      </CarteSection>

      <CarteSection iconePath={ICONE_DOCUMENT} titre="Profil">
        <FormulaireProfil cv={cv} onChange={onChange} />
      </CarteSection>

      {/* Bloc réorganisable */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={idsDraggables} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2.5">
            {idsDraggables.map((id) => (
              <CarteSectionTriable key={id} id={id}>
                <SousFormulaire id={id} cv={cv} onChange={onChange} />
              </CarteSectionTriable>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Carte statique pour Compétences en Élégant */}
      {competencesFixeEnGauche && (
        <CarteSection
          iconePath={SECTIONS_META.competences.iconePath}
          titre={SECTIONS_META.competences.libelle}
          badge="Colonne gauche"
        >
          <FormulaireCompetences cv={cv} onChange={onChange} />
        </CarteSection>
      )}
    </div>
  );
}

// --- Dispatch d'un sous-formulaire selon la SectionId ---

function SousFormulaire({ id, cv, onChange }: { id: SectionId; cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  switch (id) {
    case "experiences": return <FormulaireExperiences cv={cv} onChange={onChange} />;
    case "formation": return <FormulaireFormation cv={cv} onChange={onChange} />;
    case "competences": return <FormulaireCompetences cv={cv} onChange={onChange} />;
    case "projets": return <FormulaireProjets cv={cv} onChange={onChange} />;
    case "certifications": return <FormulaireCertifications cv={cv} onChange={onChange} />;
  }
}

// --- Sous-formulaires ---

function FormulaireHeader({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <>
      <Champ label="Nom complet" valeur={cv.nom} onChange={(v) => onChange({ ...cv, nom: v })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Champ label="Email" valeur={cv.contact.email ?? ""} onChange={(v) => onChange({ ...cv, contact: { ...cv.contact, email: v } })} />
        <Champ label="Téléphone" valeur={cv.contact.telephone ?? ""} onChange={(v) => onChange({ ...cv, contact: { ...cv.contact, telephone: v } })} />
        <Champ label="Localisation" valeur={cv.contact.localisation ?? ""} onChange={(v) => onChange({ ...cv, contact: { ...cv.contact, localisation: v } })} />
        <Champ label="LinkedIn" valeur={cv.contact.linkedin ?? ""} onChange={(v) => onChange({ ...cv, contact: { ...cv.contact, linkedin: v } })} />
        <Champ label="Site web" valeur={cv.contact.site ?? ""} onChange={(v) => onChange({ ...cv, contact: { ...cv.contact, site: v } })} />
      </div>
    </>
  );
}

function FormulaireHeadline({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <Champ
      label="Titre / Poste recherché"
      valeur={cv.titre}
      onChange={(v) => onChange({ ...cv, titre: v })}
      placeholder="Ex : Développeuse Web Full-Stack"
    />
  );
}

function FormulaireProfil({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <ChampZone
      label="Résumé"
      valeur={cv.resume ?? ""}
      onChange={(v) => onChange({ ...cv, resume: v })}
      lignes={4}
      placeholder="2-3 phrases qui résument votre profil, votre expérience et ce que vous recherchez."
    />
  );
}

function FormulaireExperiences({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <>
      {(cv.experiences ?? []).map((exp, i) => (
        <BlocItem
          key={i}
          titre={exp.poste || `Expérience ${i + 1}`}
          onSupprimer={() => {
            const copie = [...(cv.experiences ?? [])];
            copie.splice(i, 1);
            onChange({ ...cv, experiences: copie });
          }}
        >
          <Champ label="Poste" valeur={exp.poste} onChange={(v) => majTableau(cv, "experiences", i, { ...exp, poste: v }, onChange)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Champ label="Entreprise" valeur={exp.entreprise} onChange={(v) => majTableau(cv, "experiences", i, { ...exp, entreprise: v }, onChange)} />
            <Champ label="Lieu" valeur={exp.lieu ?? ""} onChange={(v) => majTableau(cv, "experiences", i, { ...exp, lieu: v }, onChange)} />
          </div>
          <Champ label="Dates (ex: Jan 2023 – Aujourd'hui)" valeur={exp.dates} onChange={(v) => majTableau(cv, "experiences", i, { ...exp, dates: v }, onChange)} />
          <ChampZone
            label="Missions (une par ligne)"
            valeur={exp.missions.join("\n")}
            onChange={(v) => majTableau(cv, "experiences", i, { ...exp, missions: v.split("\n").filter((m) => m.trim().length > 0) }, onChange)}
            lignes={4}
            placeholder="Chaque ligne devient une puce dans le CV."
          />
        </BlocItem>
      ))}
      <BoutonAjouter
        label="+ Ajouter une expérience"
        onClick={() =>
          onChange({
            ...cv,
            experiences: [
              ...(cv.experiences ?? []),
              { poste: "", entreprise: "", dates: "", lieu: "", missions: [] },
            ],
          })
        }
      />
    </>
  );
}

function FormulaireFormation({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <>
      {(cv.formation ?? []).map((f, i) => (
        <BlocItem
          key={i}
          titre={f.diplome || `Formation ${i + 1}`}
          onSupprimer={() => {
            const copie = [...(cv.formation ?? [])];
            copie.splice(i, 1);
            onChange({ ...cv, formation: copie });
          }}
        >
          <Champ label="Diplôme" valeur={f.diplome} onChange={(v) => majTableau(cv, "formation", i, { ...f, diplome: v }, onChange)} />
          <Champ label="Établissement" valeur={f.etablissement} onChange={(v) => majTableau(cv, "formation", i, { ...f, etablissement: v }, onChange)} />
          <Champ label="Dates" valeur={f.dates} onChange={(v) => majTableau(cv, "formation", i, { ...f, dates: v }, onChange)} />
          <ChampZone
            label="Détails (optionnel)"
            valeur={f.details ?? ""}
            onChange={(v) => majTableau(cv, "formation", i, { ...f, details: v }, onChange)}
            lignes={2}
          />
        </BlocItem>
      ))}
      <BoutonAjouter
        label="+ Ajouter une formation"
        onClick={() =>
          onChange({
            ...cv,
            formation: [...(cv.formation ?? []), { diplome: "", etablissement: "", dates: "", details: "" }],
          })
        }
      />
    </>
  );
}

function FormulaireCompetences({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <>
      <ChampZone
        label="Compétences techniques (séparées par des virgules)"
        valeur={(cv.competences?.techniques ?? []).join(", ")}
        onChange={(v) => onChange({ ...cv, competences: { ...cv.competences, techniques: v.split(",").map((s) => s.trim()).filter(Boolean) } })}
        lignes={2}
      />
      <ChampZone
        label="Langues (séparées par des virgules)"
        valeur={(cv.competences?.langues ?? []).join(", ")}
        onChange={(v) => onChange({ ...cv, competences: { ...cv.competences, langues: v.split(",").map((s) => s.trim()).filter(Boolean) } })}
        lignes={2}
      />
      <ChampZone
        label="Autres compétences (séparées par des virgules)"
        valeur={(cv.competences?.autres ?? []).join(", ")}
        onChange={(v) => onChange({ ...cv, competences: { ...cv.competences, autres: v.split(",").map((s) => s.trim()).filter(Boolean) } })}
        lignes={2}
      />
    </>
  );
}

function FormulaireProjets({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <>
      {(cv.projets ?? []).map((p, i) => (
        <BlocItem
          key={i}
          titre={p.nom || `Projet ${i + 1}`}
          onSupprimer={() => {
            const copie = [...(cv.projets ?? [])];
            copie.splice(i, 1);
            onChange({ ...cv, projets: copie });
          }}
        >
          <Champ label="Nom du projet" valeur={p.nom} onChange={(v) => majTableau(cv, "projets", i, { ...p, nom: v }, onChange)} />
          <Champ label="Technologies (optionnel)" valeur={p.technologies ?? ""} onChange={(v) => majTableau(cv, "projets", i, { ...p, technologies: v }, onChange)} />
          <ChampZone
            label="Description"
            valeur={p.description}
            onChange={(v) => majTableau(cv, "projets", i, { ...p, description: v }, onChange)}
            lignes={2}
          />
        </BlocItem>
      ))}
      <BoutonAjouter
        label="+ Ajouter un projet"
        onClick={() =>
          onChange({
            ...cv,
            projets: [...(cv.projets ?? []), { nom: "", description: "", technologies: "" }],
          })
        }
      />
    </>
  );
}

function FormulaireCertifications({ cv, onChange }: { cv: CVStructure; onChange: (cv: CVStructure) => void }) {
  return (
    <>
      {(cv.certifications ?? []).map((c, i) => (
        <BlocItem
          key={i}
          titre={c.nom || `Certification ${i + 1}`}
          onSupprimer={() => {
            const copie = [...(cv.certifications ?? [])];
            copie.splice(i, 1);
            onChange({ ...cv, certifications: copie });
          }}
        >
          <Champ label="Nom" valeur={c.nom} onChange={(v) => majTableau(cv, "certifications", i, { ...c, nom: v }, onChange)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Champ label="Organisme" valeur={c.organisme ?? ""} onChange={(v) => majTableau(cv, "certifications", i, { ...c, organisme: v }, onChange)} />
            <Champ label="Date" valeur={c.date ?? ""} onChange={(v) => majTableau(cv, "certifications", i, { ...c, date: v }, onChange)} />
          </div>
        </BlocItem>
      ))}
      <BoutonAjouter
        label="+ Ajouter une certification"
        onClick={() =>
          onChange({
            ...cv,
            certifications: [...(cv.certifications ?? []), { nom: "", organisme: "", date: "" }],
          })
        }
      />
    </>
  );
}

// --- Helper de mise à jour d'un tableau imbriqué ---
function majTableau<K extends "experiences" | "formation" | "projets" | "certifications">(
  cv: CVStructure,
  cle: K,
  index: number,
  nouvelItem: NonNullable<CVStructure[K]>[number],
  onChange: (cv: CVStructure) => void
) {
  const liste = (cv[cle] ?? []) as NonNullable<CVStructure[K]>;
  const copie = [...liste] as NonNullable<CVStructure[K]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (copie as any)[index] = nouvelItem;
  onChange({ ...cv, [cle]: copie });
}

// --- Composants UI : Cartes ---

function CarteSection({
  iconePath,
  titre,
  defautOuvert = false,
  badge,
  children,
}: {
  iconePath: string;
  titre: string;
  defautOuvert?: boolean;
  badge?: string;
  children: ReactNode;
}) {
  const [ouvert, setOuvert] = useState(defautOuvert);
  return (
    <div className="bg-white rounded-xl ring-1 ring-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOuvert(!ouvert)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <IconeSvg path={iconePath} className="w-4 h-4 text-indigo-600" />
        </span>
        <span className="font-semibold text-gray-900 flex-1">{titre}</span>
        {badge && (
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{badge}</span>
        )}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${ouvert ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {ouvert && <div className="px-4 pb-4 pt-1 flex flex-col gap-3">{children}</div>}
    </div>
  );
}

function CarteSectionTriable({ id, children }: { id: SectionId; children: ReactNode }) {
  const [ouvert, setOuvert] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : "auto",
  };
  const meta = SECTIONS_META[id];

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="bg-white rounded-xl ring-1 ring-gray-200 overflow-hidden">
      <div className="flex items-center px-2 py-3 hover:bg-gray-50 transition-colors">
        <button
          type="button"
          {...listeners}
          className="cursor-grab active:cursor-grabbing px-2 text-gray-300 hover:text-gray-500 transition-colors touch-none"
          aria-label="Déplacer cette section"
        >
          <PoigneeDragSvg />
        </button>
        <button
          type="button"
          onClick={() => setOuvert(!ouvert)}
          className="flex-1 flex items-center gap-3 text-left"
        >
          <span className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <IconeSvg path={meta.iconePath} className="w-4 h-4 text-indigo-600" />
          </span>
          <span className="font-semibold text-gray-900 flex-1">{meta.libelle}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform mr-2 ${ouvert ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {ouvert && <div className="px-4 pb-4 pt-1 flex flex-col gap-3">{children}</div>}
    </div>
  );
}

function IconeSvg({ path, className }: { path: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
  );
}

function PoigneeDragSvg() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <circle cx="7" cy="5" r="1.5" />
      <circle cx="13" cy="5" r="1.5" />
      <circle cx="7" cy="10" r="1.5" />
      <circle cx="13" cy="10" r="1.5" />
      <circle cx="7" cy="15" r="1.5" />
      <circle cx="13" cy="15" r="1.5" />
    </svg>
  );
}

// --- Champs de formulaire ---

function Champ({ label, valeur, onChange, placeholder }: { label: string; valeur: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input
        type="text"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
      />
    </label>
  );
}

function ChampZone({ label, valeur, onChange, lignes = 3, placeholder }: { label: string; valeur: string; onChange: (v: string) => void; lignes?: number; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <textarea
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        rows={lignes}
        placeholder={placeholder}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-y"
      />
    </label>
  );
}

function BlocItem({ titre, onSupprimer, children }: { titre: string; onSupprimer: () => void; children: ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-3 ring-1 ring-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{titre}</span>
        <button
          type="button"
          onClick={onSupprimer}
          className="text-xs text-red-500 hover:text-red-700 font-semibold"
        >
          Supprimer
        </button>
      </div>
      {children}
    </div>
  );
}

function BoutonAjouter({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start text-sm font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
    >
      {label}
    </button>
  );
}
