"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Candidature, COLONNES, StatutCandidature, metaStatut } from "./types";

type Props = {
  candidatures: Candidature[];
  onOuvrirCarte: (candidature: Candidature) => void;
  onAjouterDansColonne: (statut: StatutCandidature) => void;
  onDeplacer: (id: string, nouveauStatut: StatutCandidature) => void;
};

export default function KanbanBoard({ candidatures, onOuvrirCarte, onAjouterDansColonne, onDeplacer }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );
  const [carteEnDrag, setCarteEnDrag] = useState<Candidature | null>(null);

  const parColonne = useMemo(() => {
    const map: Record<StatutCandidature, Candidature[]> = {
      souhaitee: [],
      postulee: [],
      entretien: [],
      offre: [],
      refusee: [],
    };
    for (const c of candidatures) map[c.statut].push(c);
    for (const key of Object.keys(map) as StatutCandidature[]) {
      map[key].sort((a, b) => a.ordre - b.ordre || a.createdAt.localeCompare(b.createdAt));
    }
    return map;
  }, [candidatures]);

  function handleDragStart(e: DragStartEvent) {
    const c = candidatures.find((x) => x.id === e.active.id);
    setCarteEnDrag(c ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    setCarteEnDrag(null);
    if (!e.over) return;
    const carte = candidatures.find((c) => c.id === e.active.id);
    if (!carte) return;
    const statutCible = e.over.id as StatutCandidature;
    if (!COLONNES.some((c) => c.statut === statutCible)) return;
    if (carte.statut === statutCible) return;
    onDeplacer(carte.id, statutCible);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLONNES.map((col) => (
          <Colonne
            key={col.statut}
            statut={col.statut}
            candidatures={parColonne[col.statut]}
            onOuvrirCarte={onOuvrirCarte}
            onAjouter={() => onAjouterDansColonne(col.statut)}
          />
        ))}
      </div>
      <DragOverlay>
        {carteEnDrag ? <Carte candidature={carteEnDrag} enSurvolDrag /> : null}
      </DragOverlay>
    </DndContext>
  );
}

// ─── Colonne ──────────────────────────────────────────────────────────────────

function Colonne({
  statut,
  candidatures,
  onOuvrirCarte,
  onAjouter,
}: {
  statut: StatutCandidature;
  candidatures: Candidature[];
  onOuvrirCarte: (c: Candidature) => void;
  onAjouter: () => void;
}) {
  const meta = metaStatut(statut);
  const { setNodeRef, isOver } = useDroppable({ id: statut });

  return (
    <div className="shrink-0 w-72 flex flex-col">
      <div className={`${meta.couleurAccent} h-1 rounded-t-xl`} />
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-b-xl bg-white ring-1 transition-colors ${
          isOver ? "ring-indigo-400 bg-indigo-50/40" : "ring-gray-200"
        }`}
      >
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${meta.couleurBadge}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={meta.icone} />
              </svg>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-800">{meta.titre}</span>
            <span className="text-xs text-gray-400 font-medium">{candidatures.length}</span>
          </div>
          <button
            onClick={onAjouter}
            className="p-1 rounded-md text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            aria-label={`Ajouter dans ${meta.titre}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="px-2 pb-3 flex flex-col gap-2 min-h-[80px]">
          {candidatures.map((c) => (
            <CarteDraggable key={c.id} candidature={c} onOuvrir={() => onOuvrirCarte(c)} />
          ))}
          {candidatures.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-6">Aucune candidature</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Carte ────────────────────────────────────────────────────────────────────

function CarteDraggable({ candidature, onOuvrir }: { candidature: Candidature; onOuvrir: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: candidature.id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-30" : ""}`}
      {...attributes}
      {...listeners}
    >
      <Carte candidature={candidature} onOuvrir={onOuvrir} />
    </div>
  );
}

function Carte({
  candidature,
  onOuvrir,
  enSurvolDrag = false,
}: {
  candidature: Candidature;
  onOuvrir?: () => void;
  enSurvolDrag?: boolean;
}) {
  const initiale = (candidature.entreprise || candidature.poste || "?").trim().charAt(0).toUpperCase();
  const rappelUrgent = rappelDansMoinsDe7Jours(candidature.dateRappel);
  return (
    <div
      onClick={(e) => {
        // Ne déclenche pas au drag
        if (enSurvolDrag) return;
        e.stopPropagation();
        onOuvrir?.();
      }}
      className={`bg-white rounded-xl px-3 py-2.5 ring-1 ring-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:ring-indigo-200 hover:shadow-md transition-all ${
        enSurvolDrag ? "shadow-lg ring-indigo-300" : ""
      }`}
    >
      <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{candidature.poste || "Sans titre"}</p>
      <div className="flex items-center gap-1.5 mt-1.5">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-violet-100 text-violet-700 text-[10px] font-bold">
          {initiale}
        </span>
        <span className="text-xs text-gray-500 truncate">{candidature.entreprise || "—"}</span>
      </div>
      {rappelUrgent && candidature.dateRappel && (
        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Relance {formaterCourt(candidature.dateRappel)}
        </div>
      )}
    </div>
  );
}

function rappelDansMoinsDe7Jours(iso: string | null): boolean {
  if (!iso) return false;
  const d = new Date(iso).getTime();
  const maintenant = Date.now();
  const diffJours = (d - maintenant) / (1000 * 60 * 60 * 24);
  return diffJours <= 7;
}

function formaterCourt(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}
