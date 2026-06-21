import React from "react";
import { CVStructure } from "@/types/cv";
import { SectionId, ORDRE_DEFAUT } from "@/lib/cv-sections";

type Props = {
  cv: CVStructure;
  fluid?: boolean;
  ordreSections?: SectionId[];
};

export default function PreviewElegant({ cv, fluid = false, ordreSections }: Props) {
  const tailleTexte = fluid ? "text-xs" : "text-sm";

  // Colonne droite : on respecte l'ordre, en filtrant "competences" qui vit en colonne gauche
  const ordre = (ordreSections ?? ORDRE_DEFAUT).filter((id) => id !== "competences");

  function rendreSectionDroite(id: SectionId): React.ReactNode {
    switch (id) {
      case "experiences":
        if (!cv.experiences?.length) return null;
        return (
          <SectionElegantMain key="experiences" titre="Expérience professionnelle">
            {cv.experiences.map((exp, i) => (
              <div key={i} className={i > 0 ? "mt-4" : ""}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{exp.poste}</span>
                  <span className="text-xs text-gray-500 ml-4 shrink-0">{exp.dates}</span>
                </div>
                <p className="text-gray-600 italic text-xs mb-1">
                  {exp.entreprise}{exp.lieu ? ` — ${exp.lieu}` : ""}
                </p>
                {exp.missions.length > 0 && (
                  <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                    {exp.missions.map((m, j) => <li key={j}>{m}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </SectionElegantMain>
        );
      case "formation":
        if (!cv.formation?.length) return null;
        return (
          <SectionElegantMain key="formation" titre="Formation">
            {cv.formation.map((f, i) => (
              <div key={i} className={i > 0 ? "mt-3" : ""}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{f.diplome}</span>
                  <span className="text-xs text-gray-500 ml-4 shrink-0">{f.dates}</span>
                </div>
                <p className="text-gray-600 italic text-xs">{f.etablissement}</p>
                {f.details && <p className="text-gray-700 text-xs mt-0.5">{f.details}</p>}
              </div>
            ))}
          </SectionElegantMain>
        );
      case "projets":
        if (!cv.projets?.length) return null;
        return (
          <SectionElegantMain key="projets" titre="Projets">
            {cv.projets.map((p, i) => (
              <div key={i} className={i > 0 ? "mt-3" : ""}>
                <span className="font-bold">{p.nom}</span>
                {p.technologies && (
                  <span className="text-gray-500 text-xs ml-2">— {p.technologies}</span>
                )}
                <p className="text-gray-700 mt-0.5">{p.description}</p>
              </div>
            ))}
          </SectionElegantMain>
        );
      case "certifications":
        if (!cv.certifications?.length) return null;
        return (
          <SectionElegantMain key="certifications" titre="Certifications">
            {cv.certifications.map((c, i) => (
              <div key={i} className={i > 0 ? "mt-2" : ""}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{c.nom}</span>
                  {c.date && <span className="text-xs text-gray-500 ml-4 shrink-0">{c.date}</span>}
                </div>
                {c.organisme && <p className="text-gray-600 italic text-xs">{c.organisme}</p>}
              </div>
            ))}
          </SectionElegantMain>
        );
      case "competences":
        return null; // jamais rendu en colonne droite pour Élégant
    }
  }

  return (
    <div
      className={`bg-white text-gray-900 flex ${fluid ? "w-full" : "max-w-3xl mx-auto"} ${tailleTexte}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif", minHeight: fluid ? undefined : "1000px" }}
    >
      {/* Colonne gauche (figée) */}
      <aside className="w-[35%] bg-gray-100 p-6 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight leading-tight">{cv.nom}</h1>
          {cv.titre && <p className="text-xs text-gray-700 mt-1 italic">{cv.titre}</p>}
        </div>

        {(cv.contact.email || cv.contact.telephone || cv.contact.localisation || cv.contact.linkedin || cv.contact.site) && (
          <SectionElegantCol titre="Contact">
            {cv.contact.email && <p className="text-xs text-gray-700 break-words">{cv.contact.email}</p>}
            {cv.contact.telephone && <p className="text-xs text-gray-700">{cv.contact.telephone}</p>}
            {cv.contact.localisation && <p className="text-xs text-gray-700">{cv.contact.localisation}</p>}
            {cv.contact.linkedin && <p className="text-xs text-gray-700 break-words">{cv.contact.linkedin}</p>}
            {cv.contact.site && <p className="text-xs text-gray-700 break-words">{cv.contact.site}</p>}
          </SectionElegantCol>
        )}

        {cv.competences?.techniques?.length ? (
          <SectionElegantCol titre="Compétences">
            <ul className="text-xs text-gray-700 space-y-0.5">
              {cv.competences.techniques.map((c, i) => <li key={i}>· {c}</li>)}
            </ul>
          </SectionElegantCol>
        ) : null}

        {cv.competences?.langues?.length ? (
          <SectionElegantCol titre="Langues">
            <ul className="text-xs text-gray-700 space-y-0.5">
              {cv.competences.langues.map((l, i) => <li key={i}>· {l}</li>)}
            </ul>
          </SectionElegantCol>
        ) : null}

        {cv.competences?.autres?.length ? (
          <SectionElegantCol titre="Autres">
            <ul className="text-xs text-gray-700 space-y-0.5">
              {cv.competences.autres.map((a, i) => <li key={i}>· {a}</li>)}
            </ul>
          </SectionElegantCol>
        ) : null}
      </aside>

      {/* Colonne droite (réorganisable) */}
      <main className="flex-1 p-6 flex flex-col gap-5">
        {cv.resume && (
          <SectionElegantMain titre="Profil">
            <p className="text-gray-700">{cv.resume}</p>
          </SectionElegantMain>
        )}

        {ordre.map(rendreSectionDroite)}
      </main>
    </div>
  );
}

function SectionElegantCol({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-1.5 border-b border-gray-400 pb-1">{titre}</h2>
      {children}
    </div>
  );
}

function SectionElegantMain({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2 border-b border-gray-300 pb-1">{titre}</h2>
      {children}
    </div>
  );
}
