import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 56, fontFamily: "Times-Roman", fontSize: 10.5, color: "#111111", lineHeight: 1.6 },
  nom: { fontSize: 15, fontFamily: "Times-Bold", textAlign: "center", marginBottom: 4 },
  titre: { fontSize: 10, color: "#555555", textAlign: "center", marginBottom: 3 },
  contact: { fontSize: 9, color: "#666666", textAlign: "center", marginBottom: 20 },
  date: { fontSize: 10, textAlign: "right", marginBottom: 16 },
  salutation: { fontSize: 10.5, marginBottom: 12 },
  paragraphe: { fontSize: 10.5, marginBottom: 10, textAlign: "justify" },
  formule: { fontSize: 10.5, marginTop: 16, marginBottom: 24 },
  signature: { fontSize: 10.5, fontFamily: "Times-Bold" },
});

type Props = {
  nom: string;
  titre?: string;
  contact?: { email?: string; telephone?: string; localisation?: string };
  salutation: string;
  paragraphes: string[];
  formule_politesse: string;
  date?: string;
};

export function LettrePDFDocument({ nom, titre, contact, salutation, paragraphes, formule_politesse, date }: Props) {
  const contactItems = [
    contact?.telephone,
    contact?.email,
    contact?.localisation,
  ].filter(Boolean).join("  ·  ");

  const dateAffichee = date ?? new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.nom}>{nom}</Text>
        {titre && <Text style={styles.titre}>{titre}</Text>}
        {contactItems ? <Text style={styles.contact}>{contactItems}</Text> : null}

        <Text style={styles.date}>Le {dateAffichee}</Text>

        <Text style={styles.salutation}>{salutation}</Text>

        {paragraphes.map((p, i) => (
          <Text key={i} style={styles.paragraphe}>{p}</Text>
        ))}

        <Text style={styles.formule}>{formule_politesse}</Text>
        <Text style={styles.signature}>{nom}</Text>
      </Page>
    </Document>
  );
}
