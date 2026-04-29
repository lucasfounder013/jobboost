import { NextRequest, NextResponse } from "next/server";
// Import via lib/ pour éviter le code de test qui charge canvas dans index.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
import mammoth from "mammoth";

const TAILLE_MAX = 5 * 1024 * 1024; // 5 Mo
const TYPES_ACCEPTES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fichier = formData.get("fichier");

  if (!fichier || !(fichier instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  if (!TYPES_ACCEPTES.includes(fichier.type)) {
    return NextResponse.json({ error: "Format non supporté. Utilisez PDF ou DOCX." }, { status: 400 });
  }

  if (fichier.size > TAILLE_MAX) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 5 Mo)." }, { status: 400 });
  }

  const buffer = Buffer.from(await fichier.arrayBuffer());

  if (fichier.type === "application/pdf") {
    const data = await pdfParse(buffer);
    return NextResponse.json({ texte: data.text });
  }

  const { value } = await mammoth.extractRawText({ buffer });
  return NextResponse.json({ texte: value });
}
