import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });


export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { cv, offre, motsClesManquants, reponses } = await req.json();

  if (!cv || !offre || typeof cv !== "string" || typeof offre !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }
  if (cv.length > 20000 || offre.length > 10000) {
    return NextResponse.json({ error: "Texte trop long." }, { status: 400 });
  }

  const { rows: rowsUser } = await pool.query(
    'SELECT is_subscribed, plan_type, credits FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const planType: string | null = rowsUser[0]?.plan_type ?? null;

  let creditsRestants: number | null = null;
  let locked = false;

  // Décrémentation atomique : échoue si credits = 0
  const { rowCount, rows: rowsCredits } = await pool.query(
    'UPDATE "user" SET credits = credits - 1 WHERE id = $1 AND credits > 0 RETURNING credits',
    [session.user.id]
  );

  if (rowCount === 0) {
    const estAbonne: boolean = rowsUser[0]?.is_subscribed ?? false;
    if (estAbonne) {
      const limite = planType === "pro" ? "50" : "10";
      return NextResponse.json(
        { error: `Limite mensuelle de ${limite} adaptations atteinte. Elle sera réinitialisée à votre prochain renouvellement.` },
        { status: 403 }
      );
    }
    // Gratuit : on génère quand même pour montrer un aperçu flou (conversion)
    locked = true;
    creditsRestants = 0;
  } else {
    creditsRestants = rowsCredits[0].credits;
  }

  const motsClesListe =
    Array.isArray(motsClesManquants) && motsClesManquants.length > 0
      ? `\n\nMots-clés importants à intégrer naturellement : ${motsClesManquants.join(", ")}`
      : "";

  const reponsesListe =
    Array.isArray(reponses) && reponses.length > 0
      ? `\n\nInformations complémentaires fournies par le candidat :\n${(reponses as { question: string; reponse: string }[]).filter(r => r.reponse?.trim()).map(r => `- ${r.question} → ${r.reponse}`).join("\n")}\nUtilise ces informations pour enrichir le CV — ne les invente pas si elles ne sont pas fournies.`
      : "";

  const prompt = `Tu es un expert en rédaction de CV ATS-friendly. Réécris ce CV pour maximiser sa correspondance avec l'offre d'emploi, en intégrant naturellement les mots-clés manquants. Ne fabrique pas d'expériences ni de diplômes — reformule et mets en valeur ce qui existe déjà. Les concours, compétitions et hackathons vont dans "projets", pas dans "certifications". Les certifications sont uniquement des diplômes ou titres officiels (ex : TOEIC, certifications professionnelles).${motsClesListe}${reponsesListe}

MARQUAGE DES MODIFICATIONS — règle stricte : entoure UNIQUEMENT les mots ou groupes de mots que tu AJOUTES ou CHANGES par rapport au texte original. Si une partie de la phrase existait déjà telle quelle dans le CV original, ne la marque PAS. Ne marque jamais toute une phrase si seule une partie a changé.
Exemples corrects :
- Original : "Gestion de projets en équipe" → Adapté : "Gestion de projets [MOD]RSE[/MOD] en équipe [MOD]multidisciplinaire[/MOD]"
- Original : "Coordination d'événements" → Adapté : "Coordination d'événements [MOD]et d'initiatives de développement durable[/MOD]"
- Bullet entièrement nouveau : "[MOD]Suivi des indicateurs ESG et reporting trimestriel auprès des parties prenantes.[/MOD]"
Interdiction : ne PAS écrire "[MOD]Coordination d'événements et d'initiatives de développement durable[/MOD]" si "Coordination d'événements" venait du CV original.

Retourne UNIQUEMENT un objet JSON valide, sans markdown ni backticks, avec exactement deux clés "original" et "adapte" :
- "original" : le CV parsé tel quel depuis le texte original, sans aucune modification ni balise [MOD]
- "adapte" : le CV optimisé pour l'offre, avec les balises [MOD]...[/MOD] autour des ajouts/modifications

{
  "original": { ...même schéma ci-dessous... },
  "adapte": { ...même schéma ci-dessous avec balises [MOD]... }
}

Schéma de chaque objet CV (n'inclure que les champs présents — ne pas inventer ni laisser de tableaux vides) :

{
  "nom": "string",
  "titre": "string (titre professionnel court)",
  "contact": {
    "email": "string?",
    "telephone": "string?",
    "localisation": "string?",
    "linkedin": "string?",
    "site": "string?"
  },
  "resume": "string? (accroche professionnelle à la 1re personne du singulier, 2-3 phrases sobres et factuelles — jamais de 3e personne 'il/elle/son/sa', jamais de superlatifs exagérés comme 'excellent', 'reconnu pour', 'passionné' — exemple de ton : 'Étudiant ingénieur en chimie avec une expérience en gestion de projet et relation client. Je cherche à développer mes compétences commerciales dans un environnement dynamique.')",
  "experiences": [{
    "poste": "string",
    "entreprise": "string",
    "dates": "string",
    "lieu": "string?",
    "missions": ["string (maximum 3 bullet points par expérience, concis)"]
  }]?,
  "formation": [{
    "diplome": "string",
    "etablissement": "string",
    "dates": "string",
    "details": "string?"
  }]?,
  "competences": {
    "techniques": ["string"]?,
    "langues": ["string"]?,
    "autres": ["string"]?
  }?,
  "projets": [{
    "nom": "string",
    "description": "string (1 phrase max)",
    "technologies": "string?"
  }]? (maximum 2 projets),
  "certifications": [{
    "nom": "string",
    "organisme": "string?",
    "date": "string?"
  }]?
}

CV ORIGINAL :
${cv}

OFFRE D'EMPLOI :
${offre}`;

  // Appelle Claude puis parse le JSON — retourne null si la réponse ne parse pas
  // (réponse tronquée, texte hors-JSON, etc.). Un retry est effectué par l'appelant.
  async function appelerEtParser(): Promise<Record<string, unknown> | null> {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });
    const contenu = message.content[0];
    if (contenu.type !== "text") return null;
    const texteNettoye = contenu.text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    try {
      return JSON.parse(texteNettoye);
    } catch {
      console.error("[adapter-cv] Parse JSON échoué. Extrait :", texteNettoye.slice(0, 500));
      return null;
    }
  }

  let parsed = await appelerEtParser();
  if (parsed === null) {
    // Retry unique — Claude peut renvoyer occasionnellement du texte non parseable
    parsed = await appelerEtParser();
  }

  if (parsed === null) {
    // Échec définitif : rendre le crédit s'il a été décrémenté (utilisateur non locked)
    if (!locked) {
      await pool.query(
        'UPDATE "user" SET credits = credits + 1 WHERE id = $1',
        [session.user.id]
      );
    }
    return NextResponse.json(
      { error: "Nous n'avons pas pu adapter votre CV cette fois-ci. Votre crédit n'a pas été consommé, merci de réessayer." },
      { status: 500 }
    );
  }

  // Support ancien format (CVStructure directe) et nouveau format { original, adapte }
  const cvAdapte = (parsed.adapte ?? parsed) as { titre?: string } & Record<string, unknown>;
  const cvOriginal = parsed.original ?? null;

  pool.query(
    `INSERT INTO user_events (user_id, action, metadata) VALUES ($1, 'adaptation_cv', $2)`,
    [session.user.id, JSON.stringify({ nomPoste: cvAdapte?.titre ?? null })]
  ).catch(e => console.error("[adapter-cv] Erreur log event:", e.message));

  return NextResponse.json({ cvAdapte, cvOriginal, creditsRestants, locked });
}
