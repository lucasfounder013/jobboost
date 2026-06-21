import React from "react";
import { CVStructure } from "@/types/cv";
import { SectionId, ORDRE_DEFAUT } from "@/lib/cv-sections";

const ACCENT = "#4F46E5";

type Props = {
  cv: CVStructure;
  fluid?: boolean;
  ordreSections?: SectionId[];
};

export default function PreviewModerne({ cv, fluid = false, ordreSections }: Props) {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean);

  const ordre = ordreSections ?? ORDRE_DEFAUT;

  function rendreSection(id: SectionId): React.ReactNode {
    switch (id) {
      case "experiences":
        if (!cv.experiences?.length) return null;
        return (
          <SectionModerne key="experiences" titre="Expérience professionnelle">
            {cv.experiences.map((exp, i) => (
              <div key={i} className={i > 0 ? "mt-4" : ""}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{exp.poste}</span>
                  <span className="text-xs text-gray-500 ml-4 shrink-0">{exp.dates}</span>
                </div>
                <p className="text-gray-600 text-xs mb-1.5">
                  {exp.entreprise}{exp.lieu ? ` — ${exp.lieu}` : ""}
                </p>
                {exp.missions.length > 0 && (
                  <ul className="space-y-0.5 text-gray-700">
                    {exp.missions.map((m, j) => (
                      <li key={j} className="flex gap-2">
                        <span style={{ color: ACCENT }} className="font-bold mt-0.5">▸</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </SectionModerne>
        );
      case "formation":
        if (!cv.formation?.length) return null;
        return (
          <SectionModerne key="formation" titre="Formation">
            {cv.formation.map((f, i) => (
              <div key={i} className={i > 0 ? "mt-3" : ""}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{f.diplome}</span>
                  <span className="text-xs text-gray-500 ml-4 shrink-0">{f.dates}</span>
                </div>
                <p className="text-gray-600 text-xs">{f.etablissement}</p>
                {f.details && <p className="text-gray-700 text-xs mt-0.5">{f.details}</p>}
              </div>
            ))}
          </SectionModerne>
        );
      case "competences":
        if (!cv.competences || !(cv.competences.techniques?.length || cv.competences.langues?.length || cv.competences.autres?.length)) return null;
        return (
          <SectionModerne key="competences" titre="Compétences">
            {cv.competences.techniques?.length ? (
              <div className="mb-1">
                <span className="font-semibold text-xs uppercase tracking-wide mr-2" style={{ color: ACCENT }}>Techniques</span>
                <span className="text-gray-700">{cv.competences.techniques.join(" · ")}</span>
              </div>
            ) : null}
            {cv.competences.langues?.length ? (
              <div className="mb-1">
                <span className="font-semibold text-xs uppercase tracking-wide mr-2" style={{ color: ACCENT }}>Langues</span>
                <span className="text-gray-700">{cv.competences.langues.join(" · ")}</span>
              </div>
            ) : null}
            {cv.competences.autres?.length ? (
              <div className="mb-1">
                <span className="font-semibold text-xs uppercase tracking-wide mr-2" style={{ color: ACCENT }}>Autres</span>
                <span className="text-gray-700">{cv.competences.autres.join(" · ")}</span>
              </div>
            ) : null}
          </SectionModerne>
        );
      case "projets":
        if (!cv.projets?.length) return null;
        return (
          <SectionModerne key="projets" titre="Projets">
            {cv.projets.map((p, i) => (
              <div key={i} className={i > 0 ? "mt-3" : ""}>
                <span className="font-bold text-gray-900">{p.nom}</span>
                {p.technologies && (
                  <span className="text-gray-500 text-xs ml-2">— {p.technologies}</span>
                )}
                <p className="text-gray-700 mt-0.5">{p.description}</p>
              </div>
            ))}
          </SectionModerne>
        );
      case "certifications":
        if (!cv.certifications?.length) return null;
        return (
          <SectionModerne key="certifications" titre="Certifications">
            {cv.certifications.map((c, i) => (
              <div key={i} className={i > 0 ? "mt-2" : ""}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{c.nom}</span>
                  {c.date && <span className="text-xs text-gray-500 ml-4 shrink-0">{c.date}</span>}
                </div>
                {c.organisme && <p className="text-gray-600 text-xs">{c.organisme}</p>}
              </div>
            ))}
          </SectionModerne>
        );
    }
  }

  return (
    <div
      className={`bg-white text-gray-900 leading-relaxed ${fluid ? "w-full p-5 text-xs" : "p-10 max-w-3xl mx-auto text-sm"}`}
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: ACCENT }}>{cv.nom}</h1>
        {cv.titre && <p className="text-base text-gray-600 mt-1 mb-2">{cv.titre}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500">{contactItems.join("  ·  ")}</p>
        )}
      </div>

      {cv.resume && (
        <SectionModerne titre="Profil">
          <p className="text-gray-700">{cv.resume}</p>
        </SectionModerne>
      )}

      {ordre.map(rendreSection)}
    </div>
  );
}

function SectionModerne({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>
        {titre}
      </h2>
      {children}
    </div>
  );
}
