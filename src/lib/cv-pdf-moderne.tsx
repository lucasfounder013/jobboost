import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CVStructure } from "@/types/cv";
import { SectionId, ORDRE_DEFAUT } from "@/lib/cv-sections";

const ACCENT = "#4F46E5";

const styles = StyleSheet.create({
  page: { padding: 32, fontFamily: "Helvetica", fontSize: 9.5, color: "#111111", lineHeight: 1.45 },
  nom: { fontSize: 22, fontFamily: "Helvetica-Bold", color: ACCENT, marginBottom: 3 },
  titre: { fontSize: 10.5, color: "#555555", marginBottom: 6 },
  contact: { fontSize: 8.5, color: "#666666", marginBottom: 2 },
  sectionTitre: { fontSize: 9, fontFamily: "Helvetica-Bold", color: ACCENT, letterSpacing: 1, marginTop: 14, marginBottom: 5, textTransform: "uppercase" },
  poste: { fontFamily: "Helvetica-Bold", fontSize: 10.5, color: "#111111" },
  entreprise: { fontSize: 9, color: "#555555", marginBottom: 2 },
  dateRange: { fontSize: 8.5, color: "#777777" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  missionRow: { flexDirection: "row", marginBottom: 1.5 },
  missionPuce: { width: 10, color: ACCENT, fontFamily: "Helvetica-Bold", fontSize: 9 },
  missionTexte: { flex: 1, fontSize: 9, color: "#333333" },
  competenceLabel: { fontFamily: "Helvetica-Bold", fontSize: 8.5, color: ACCENT, marginRight: 4, textTransform: "uppercase" },
  competenceValeur: { fontSize: 9, color: "#333333" },
  competenceRow: { flexDirection: "row", marginBottom: 1.5, flexWrap: "wrap" },
  resume: { fontSize: 9, color: "#444444" },
  projetNom: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  projetTech: { fontSize: 8.5, color: "#666666" },
  projetDesc: { fontSize: 9, color: "#333333", marginTop: 1 },
});

function s(texte: string | null | undefined): string {
  if (!texte) return "";
  return texte.replace(/\[MOD\](.*?)\[\/MOD\]/g, "$1");
}

export function CVPDFModerneDocument({ cv, ordreSections }: { cv: CVStructure; ordreSections?: SectionId[] }) {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean).join("  ·  ");

  const ordre = ordreSections ?? ORDRE_DEFAUT;

  function rendreSection(id: SectionId): React.ReactElement | null {
    switch (id) {
      case "experiences":
        if (!cv.experiences?.length) return null;
        return (
          <View key="experiences">
            <Text style={styles.sectionTitre}>Expérience professionnelle</Text>
            {cv.experiences.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>{s(exp.poste)}</Text>
                  <Text style={styles.dateRange}>{s(exp.dates)}</Text>
                </View>
                <Text style={styles.entreprise}>{s(exp.entreprise)}{exp.lieu ? ` — ${s(exp.lieu)}` : ""}</Text>
                {exp.missions.map((m, j) => (
                  <View key={j} style={styles.missionRow}>
                    <Text style={styles.missionPuce}>▸</Text>
                    <Text style={styles.missionTexte}>{s(m)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      case "formation":
        if (!cv.formation?.length) return null;
        return (
          <View key="formation">
            <Text style={styles.sectionTitre}>Formation</Text>
            {cv.formation.map((f, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>{s(f.diplome)}</Text>
                  <Text style={styles.dateRange}>{s(f.dates)}</Text>
                </View>
                <Text style={styles.entreprise}>{s(f.etablissement)}</Text>
                {f.details ? <Text style={{ fontSize: 9, color: "#333333" }}>{s(f.details)}</Text> : null}
              </View>
            ))}
          </View>
        );
      case "competences":
        if (!cv.competences || !(cv.competences.techniques?.length || cv.competences.langues?.length || cv.competences.autres?.length)) return null;
        return (
          <View key="competences">
            <Text style={styles.sectionTitre}>Compétences</Text>
            {cv.competences.techniques?.length ? (
              <View style={styles.competenceRow}>
                <Text style={styles.competenceLabel}>Techniques </Text>
                <Text style={styles.competenceValeur}>{cv.competences.techniques.map(s).join(" · ")}</Text>
              </View>
            ) : null}
            {cv.competences.langues?.length ? (
              <View style={styles.competenceRow}>
                <Text style={styles.competenceLabel}>Langues </Text>
                <Text style={styles.competenceValeur}>{cv.competences.langues.map(s).join(" · ")}</Text>
              </View>
            ) : null}
            {cv.competences.autres?.length ? (
              <View style={styles.competenceRow}>
                <Text style={styles.competenceLabel}>Autres </Text>
                <Text style={styles.competenceValeur}>{cv.competences.autres.map(s).join(" · ")}</Text>
              </View>
            ) : null}
          </View>
        );
      case "projets":
        if (!cv.projets?.length) return null;
        return (
          <View key="projets">
            <Text style={styles.sectionTitre}>Projets</Text>
            {cv.projets.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.projetNom}>{s(p.nom)}</Text>
                  {p.technologies ? <Text style={styles.projetTech}>{s(p.technologies)}</Text> : null}
                </View>
                <Text style={styles.projetDesc}>{s(p.description)}</Text>
              </View>
            ))}
          </View>
        );
      case "certifications":
        if (!cv.certifications?.length) return null;
        return (
          <View key="certifications">
            <Text style={styles.sectionTitre}>Certifications</Text>
            {cv.certifications.map((c, i) => (
              <View key={i} style={{ marginBottom: 3 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>
                    {s(c.nom)}{c.organisme ? ` — ${s(c.organisme)}` : ""}
                  </Text>
                  {c.date ? <Text style={styles.dateRange}>{s(c.date)}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        );
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.nom}>{s(cv.nom)}</Text>
        {cv.titre && <Text style={styles.titre}>{s(cv.titre)}</Text>}
        {contactItems ? <Text style={styles.contact}>{contactItems}</Text> : null}

        {cv.resume && (
          <>
            <Text style={styles.sectionTitre}>Profil</Text>
            <Text style={styles.resume}>{s(cv.resume)}</Text>
          </>
        )}

        {ordre.map(rendreSection)}
      </Page>
    </Document>
  );
}
