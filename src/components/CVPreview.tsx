import { CVStructure } from "@/types/cv";
import React from "react";

function renderHighlighted(text: string, show: boolean): React.ReactNode {
  if (!text.includes("[MOD]")) return text;
  if (!show) return text.replace(/\[MOD\](.*?)\[\/MOD\]/g, "$1");
  const regex = /\[MOD\](.*?)\[\/MOD\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <mark key={match.index} style={{ backgroundColor: "#bbf7d0", borderRadius: "2px", padding: "0 1px" }}>
        {match[1]}
      </mark>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

export default function CVPreview({ cv, showHighlights = false, fluid = false }: { cv: CVStructure; showHighlights?: boolean; fluid?: boolean }) {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean);

  return (
    <div
      className={`bg-white text-gray-900 leading-relaxed ${fluid ? "w-full p-4 text-xs" : "p-10 max-w-3xl mx-auto text-sm"}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{cv.nom}</h1>
        {cv.titre && <p className="text-base text-gray-600 mb-2">{renderHighlighted(cv.titre, showHighlights)}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500">{contactItems.join("  ·  ")}</p>
        )}
      </div>

      {cv.resume && (
        <Section titre="PROFIL">
          <p className="text-gray-700">{renderHighlighted(cv.resume, showHighlights)}</p>
        </Section>
      )}

      {cv.experiences && cv.experiences.length > 0 && (
        <Section titre="EXPÉRIENCE PROFESSIONNELLE">
          {cv.experiences.map((exp, i) => (
            <div key={i} className={i > 0 ? "mt-4" : ""}>
              <div className="flex justify-between items-baseline">
                <span className="font-bold">{renderHighlighted(exp.poste, showHighlights)}</span>
                <span className="text-xs text-gray-500 ml-4 shrink-0">{exp.dates}</span>
              </div>
              <p className="text-gray-600 italic text-xs mb-1">
                {exp.entreprise}{exp.lieu ? ` — ${exp.lieu}` : ""}
              </p>
              {exp.missions.length > 0 && (
                <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                  {exp.missions.map((m, j) => <li key={j}>{renderHighlighted(m, showHighlights)}</li>)}
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
              {f.details && <p className="text-gray-700 text-xs mt-0.5">{renderHighlighted(f.details, showHighlights)}</p>}
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
              <span className="text-gray-700">{renderHighlighted(cv.competences.techniques.join(", "), showHighlights)}</span>
            </div>
          ) : null}
          {cv.competences.langues?.length ? (
            <div className="mb-1">
              <span className="font-semibold text-xs uppercase tracking-wide text-gray-500 mr-2">Langues :</span>
              <span className="text-gray-700">{renderHighlighted(cv.competences.langues.join(", "), showHighlights)}</span>
            </div>
          ) : null}
          {cv.competences.autres?.length ? (
            <div className="mb-1">
              <span className="font-semibold text-xs uppercase tracking-wide text-gray-500 mr-2">Autres :</span>
              <span className="text-gray-700">{renderHighlighted(cv.competences.autres.join(", "), showHighlights)}</span>
            </div>
          ) : null}
        </Section>
      ) : null}

      {cv.projets && cv.projets.length > 0 && (
        <Section titre="PROJETS">
          {cv.projets.map((p, i) => (
            <div key={i} className={i > 0 ? "mt-3" : ""}>
              <span className="font-bold">{renderHighlighted(p.nom, showHighlights)}</span>
              {p.technologies && (
                <span className="text-gray-500 text-xs ml-2">— {renderHighlighted(p.technologies, showHighlights)}</span>
              )}
              <p className="text-gray-700 mt-0.5">{renderHighlighted(p.description, showHighlights)}</p>
            </div>
          ))}
        </Section>
      )}

      {cv.certifications && cv.certifications.length > 0 && (
        <Section titre="CERTIFICATIONS">
          {cv.certifications.map((c, i) => (
            <div key={i} className={i > 0 ? "mt-2" : ""}>
              <div className="flex justify-between items-baseline">
                <span className="font-bold">{renderHighlighted(c.nom, showHighlights)}</span>
                {c.date && <span className="text-xs text-gray-500 ml-4 shrink-0">{c.date}</span>}
              </div>
              {c.organisme && <p className="text-gray-600 italic text-xs">{renderHighlighted(c.organisme, showHighlights)}</p>}
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
