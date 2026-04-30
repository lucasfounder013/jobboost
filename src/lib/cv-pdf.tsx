import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CVStructure } from "@/types/cv";

const styles = StyleSheet.create({
  page: { padding: 28, fontFamily: "Helvetica", fontSize: 9.5, color: "#111111", lineHeight: 1.4 },
  nom: { fontSize: 15, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  titre: { fontSize: 9.5, color: "#444444", marginBottom: 5 },
  contact: { fontSize: 8, color: "#666666", marginBottom: 2 },
  // titre en colonne + trait pleine largeur en dessous (alignItems: center écrase height sur View sans contenu)
  sectionHeader: { marginTop: 8, marginBottom: 4 },
  sectionTitre: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#222222", marginBottom: 3 },
  sectionLigne: { height: 1, backgroundColor: "#AAAAAA" },
  poste: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  entreprise: { fontSize: 9, color: "#555555", fontStyle: "italic", marginBottom: 2 },
  dateRange: { fontSize: 8.5, color: "#777777" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  mission: { fontSize: 8.5, color: "#333333", marginLeft: 6, marginBottom: 1 },
  competenceLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, color: "#666666", marginRight: 4 },
  competenceValeur: { fontSize: 8.5, color: "#333333" },
  competenceRow: { flexDirection: "row", marginBottom: 1, flexWrap: "wrap" },
  resume: { fontSize: 8.5, color: "#444444", marginBottom: 2 },
  projetNom: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  projetTech: { fontSize: 8.5, color: "#666666" },
  projetDesc: { fontSize: 9, color: "#333333", marginTop: 1 },
});

function SectionHeader({ titre }: { titre: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitre}>{titre}</Text>
      <View style={styles.sectionLigne} />
    </View>
  );
}


export function CVPDFDocument({ cv }: { cv: CVStructure }) {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean).join("  ·  ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.nom}>{cv.nom}</Text>
        {cv.titre && <Text style={styles.titre}>{cv.titre}</Text>}
        {contactItems ? <Text style={styles.contact}>{contactItems}</Text> : null}

        {cv.resume && (
          <>
            <SectionHeader titre="PROFIL" />
            <Text style={styles.resume}>{cv.resume}</Text>
          </>
        )}

        {cv.experiences && cv.experiences.length > 0 && (
          <>
            <SectionHeader titre="EXPÉRIENCE PROFESSIONNELLE" />
            {cv.experiences.map((exp, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>{exp.poste}</Text>
                  <Text style={styles.dateRange}>{exp.dates}</Text>
                </View>
                <Text style={styles.entreprise}>{exp.entreprise}{exp.lieu ? ` — ${exp.lieu}` : ""}</Text>
                {exp.missions.map((m, j) => (
                  <Text key={j} style={styles.mission}>• {m}</Text>
                ))}
              </View>
            ))}
          </>
        )}

        {cv.formation && cv.formation.length > 0 && (
          <>
            <SectionHeader titre="FORMATION" />
            {cv.formation.map((f, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>{f.diplome}</Text>
                  <Text style={styles.dateRange}>{f.dates}</Text>
                </View>
                <Text style={styles.entreprise}>{f.etablissement}</Text>
                {f.details ? <Text style={styles.mission}>{f.details}</Text> : null}
              </View>
            ))}
          </>
        )}

        {cv.competences && (
          cv.competences.techniques?.length || cv.competences.langues?.length || cv.competences.autres?.length
        ) ? (
          <>
            <SectionHeader titre="COMPÉTENCES" />
            {cv.competences.techniques?.length ? (
              <View style={styles.competenceRow}>
                <Text style={styles.competenceLabel}>Techniques : </Text>
                <Text style={styles.competenceValeur}>{cv.competences.techniques.join(", ")}</Text>
              </View>
            ) : null}
            {cv.competences.langues?.length ? (
              <View style={styles.competenceRow}>
                <Text style={styles.competenceLabel}>Langues : </Text>
                <Text style={styles.competenceValeur}>{cv.competences.langues.join(", ")}</Text>
              </View>
            ) : null}
            {cv.competences.autres?.length ? (
              <View style={styles.competenceRow}>
                <Text style={styles.competenceLabel}>Autres : </Text>
                <Text style={styles.competenceValeur}>{cv.competences.autres.join(", ")}</Text>
              </View>
            ) : null}
          </>
        ) : null}

        {cv.projets && cv.projets.length > 0 && (
          <>
            <SectionHeader titre="PROJETS" />
            {cv.projets.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.projetNom}>{p.nom}</Text>
                  {p.technologies ? <Text style={styles.projetTech}>{p.technologies}</Text> : null}
                </View>
                <Text style={styles.projetDesc}>{p.description}</Text>
              </View>
            ))}
          </>
        )}

        {cv.certifications && cv.certifications.length > 0 && (
          <>
            <SectionHeader titre="CERTIFICATIONS" />
            {cv.certifications.map((c, i) => (
              <View key={i} style={{ marginBottom: 3 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>
                    {c.nom}{c.organisme ? ` — ${c.organisme}` : ""}
                  </Text>
                  {c.date ? <Text style={styles.dateRange}>{c.date}</Text> : null}
                </View>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
