import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CVStructure } from "@/types/cv";
import { SectionId, ORDRE_DEFAUT } from "@/lib/cv-sections";

const styles = StyleSheet.create({
  page: { fontFamily: "Times-Roman", fontSize: 9.5, color: "#111111", lineHeight: 1.4, flexDirection: "row" },
  colonneGauche: { width: "35%", backgroundColor: "#F3F4F6", padding: 24 },
  colonneDroite: { width: "65%", padding: 24 },
  nom: { fontSize: 18, fontFamily: "Times-Bold", marginBottom: 3 },
  titre: { fontSize: 9.5, color: "#444444", fontStyle: "italic", marginBottom: 14 },
  sectionTitreCol: { fontSize: 8, fontFamily: "Times-Bold", color: "#222222", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.8, borderBottomWidth: 0.5, borderBottomColor: "#888888", paddingBottom: 3 },
  sectionTitreMain: { fontSize: 9, fontFamily: "Times-Bold", color: "#222222", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8, borderBottomWidth: 0.5, borderBottomColor: "#AAAAAA", paddingBottom: 3 },
  blocSection: { marginBottom: 14 },
  contactItem: { fontSize: 8.5, color: "#444444", marginBottom: 2 },
  competenceCol: { fontSize: 8.5, color: "#444444", marginBottom: 1.5 },
  poste: { fontFamily: "Times-Bold", fontSize: 10 },
  entreprise: { fontSize: 9, color: "#555555", fontStyle: "italic", marginBottom: 2 },
  dateRange: { fontSize: 8.5, color: "#777777" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  mission: { fontSize: 8.5, color: "#333333", marginLeft: 8, marginBottom: 1 },
  resume: { fontSize: 9, color: "#444444" },
  projetNom: { fontFamily: "Times-Bold", fontSize: 10 },
  projetTech: { fontSize: 8.5, color: "#666666" },
  projetDesc: { fontSize: 9, color: "#333333", marginTop: 1 },
});

function s(texte: string | null | undefined): string {
  if (!texte) return "";
  return texte.replace(/\[MOD\](.*?)\[\/MOD\]/g, "$1");
}

export function CVPDFElegantDocument({ cv, ordreSections }: { cv: CVStructure; ordreSections?: SectionId[] }) {
  const contactItems = [
    cv.contact.email,
    cv.contact.telephone,
    cv.contact.localisation,
    cv.contact.linkedin,
    cv.contact.site,
  ].filter(Boolean) as string[];

  const aContact = contactItems.length > 0;
  const aTechniques = !!cv.competences?.techniques?.length;
  const aLangues = !!cv.competences?.langues?.length;
  const aAutres = !!cv.competences?.autres?.length;

  // Colonne droite : filtrer "competences" (toujours en colonne gauche)
  const ordreDroite = (ordreSections ?? ORDRE_DEFAUT).filter((id) => id !== "competences");

  function rendreSectionDroite(id: SectionId): React.ReactElement | null {
    switch (id) {
      case "experiences":
        if (!cv.experiences?.length) return null;
        return (
          <View key="experiences" style={styles.blocSection}>
            <Text style={styles.sectionTitreMain}>Expérience professionnelle</Text>
            {cv.experiences.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>{s(exp.poste)}</Text>
                  <Text style={styles.dateRange}>{s(exp.dates)}</Text>
                </View>
                <Text style={styles.entreprise}>{s(exp.entreprise)}{exp.lieu ? ` — ${s(exp.lieu)}` : ""}</Text>
                {exp.missions.map((m, j) => (
                  <Text key={j} style={styles.mission}>• {s(m)}</Text>
                ))}
              </View>
            ))}
          </View>
        );
      case "formation":
        if (!cv.formation?.length) return null;
        return (
          <View key="formation" style={styles.blocSection}>
            <Text style={styles.sectionTitreMain}>Formation</Text>
            {cv.formation.map((f, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.poste}>{s(f.diplome)}</Text>
                  <Text style={styles.dateRange}>{s(f.dates)}</Text>
                </View>
                <Text style={styles.entreprise}>{s(f.etablissement)}</Text>
                {f.details ? <Text style={styles.mission}>{s(f.details)}</Text> : null}
              </View>
            ))}
          </View>
        );
      case "projets":
        if (!cv.projets?.length) return null;
        return (
          <View key="projets" style={styles.blocSection}>
            <Text style={styles.sectionTitreMain}>Projets</Text>
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
          <View key="certifications" style={styles.blocSection}>
            <Text style={styles.sectionTitreMain}>Certifications</Text>
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
      case "competences":
        return null;
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Colonne gauche (figée) */}
        <View style={styles.colonneGauche}>
          <View style={{ marginBottom: 18 }}>
            <Text style={styles.nom}>{s(cv.nom)}</Text>
            {cv.titre && <Text style={styles.titre}>{s(cv.titre)}</Text>}
          </View>

          {aContact && (
            <View style={styles.blocSection}>
              <Text style={styles.sectionTitreCol}>Contact</Text>
              {contactItems.map((c, i) => (
                <Text key={i} style={styles.contactItem}>{c}</Text>
              ))}
            </View>
          )}

          {aTechniques && (
            <View style={styles.blocSection}>
              <Text style={styles.sectionTitreCol}>Compétences</Text>
              {cv.competences!.techniques!.map((c, i) => (
                <Text key={i} style={styles.competenceCol}>· {s(c)}</Text>
              ))}
            </View>
          )}

          {aLangues && (
            <View style={styles.blocSection}>
              <Text style={styles.sectionTitreCol}>Langues</Text>
              {cv.competences!.langues!.map((l, i) => (
                <Text key={i} style={styles.competenceCol}>· {s(l)}</Text>
              ))}
            </View>
          )}

          {aAutres && (
            <View style={styles.blocSection}>
              <Text style={styles.sectionTitreCol}>Autres</Text>
              {cv.competences!.autres!.map((a, i) => (
                <Text key={i} style={styles.competenceCol}>· {s(a)}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Colonne droite (réorganisable) */}
        <View style={styles.colonneDroite}>
          {cv.resume && (
            <View style={styles.blocSection}>
              <Text style={styles.sectionTitreMain}>Profil</Text>
              <Text style={styles.resume}>{s(cv.resume)}</Text>
            </View>
          )}

          {ordreDroite.map(rendreSectionDroite)}
        </View>
      </Page>
    </Document>
  );
}
