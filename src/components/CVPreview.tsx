import { CVStructure } from "@/types/cv";
import React from "react";

export default function CVPreview({ cv }: { cv: CVStructure }) {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean);

  return (
    <div
      className="bg-white text-gray-900 p-10 max-w-3xl mx-auto text-sm leading-relaxed"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{cv.nom}</h1>
        {cv.titre && <p className="text-base text-gray-600 mb-2">{cv.titre}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500">{contactItems.join("  ·  ")}</p>
        )}
      </div>

      {cv.resume && (
        <Section titre="PROFIL">
          <p className="text-gray-700">{cv.resume}</p>
        </Section>
      )}

      {cv.experiences && cv.experiences.length > 0 && (
        <Section titre="EXPÉRIENCE PROFESSIONNELLE">
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
        </Section>
      )}

      {cv.formation && cv.formation.length > 0 && (
        <Section titre="FORMATION">
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
        </Section>
      )}

      {cv.competences && (
        cv.competences.techniques?.length || cv.competences.langues?.length || cv.competences.autres?.length
      ) ? (
        <Section titre="COMPÉTENCES">
          {cv.competences.techniques?.length ? (
            <div className="mb-1">
              <span className="font-semibold text-xs uppercase tracking-wide text-gray-500 mr-2">Techniques :</span>
              <span className="text-gray-700">{cv.competences.techniques.join(", ")}</span>
            </div>
          ) : null}
          {cv.competences.langues?.length ? (
            <div className="mb-1">
              <span className="font-semibold text-xs uppercase tracking-wide text-gray-500 mr-2">Langues :</span>
              <span className="text-gray-700">{cv.competences.langues.join(", ")}</span>
            </div>
          ) : null}
          {cv.competences.autres?.length ? (
            <div className="mb-1">
              <span className="font-semibold text-xs uppercase tracking-wide text-gray-500 mr-2">Autres :</span>
              <span className="text-gray-700">{cv.competences.autres.join(", ")}</span>
            </div>
          ) : null}
        </Section>
      ) : null}

      {cv.projets && cv.projets.length > 0 && (
        <Section titre="PROJETS">
          {cv.projets.map((p, i) => (
            <div key={i} className={i > 0 ? "mt-3" : ""}>
              <span className="font-bold">{p.nom}</span>
              {p.technologies && (
                <span className="text-gray-500 text-xs ml-2">— {p.technologies}</span>
              )}
              <p className="text-gray-700 mt-0.5">{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {cv.certifications && cv.certifications.length > 0 && (
        <Section titre="CERTIFICATIONS">
          {cv.certifications.map((c, i) => (
            <div key={i} className={i > 0 ? "mt-2" : ""}>
              <div className="flex justify-between items-baseline">
                <span className="font-bold">{c.nom}</span>
                {c.date && <span className="text-xs text-gray-500 ml-4 shrink-0">{c.date}</span>}
              </div>
              {c.organisme && <p className="text-gray-600 italic text-xs">{c.organisme}</p>}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xs font-bold tracking-widest text-gray-800 whitespace-nowrap">{titre}</h2>
        <div className="flex-1 border-t border-gray-300" />
      </div>
      {children}
    </div>
  );
}
