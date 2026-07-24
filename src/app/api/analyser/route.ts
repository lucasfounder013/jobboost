import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });


export async function POST(req: NextRequest) {
  try {
  // Authentification obligatoire
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { cv, offre } = await req.json();

  if (!cv || !offre || typeof cv !== "string" || typeof offre !== "string") {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  if (cv.length > 20000 || offre.length > 10000) {
    return NextResponse.json({ error: "Texte trop long." }, { status: 400 });
  }

  // Vérification et décompte des scans (source de vérité : DB)
  const { rows } = await pool.query(
    'SELECT scans, is_subscribed, is_lifetime, plan_type FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const utilisateur = rows[0];
  const estLifetime: boolean = utilisateur?.is_lifetime ?? false;
  let scansRestants: number | null = null;

  if (estLifetime) {
    // Accès à vie : pas de décrément, log usage
    pool.query(
      `INSERT INTO lifetime_usage_log (user_id, operation_type) VALUES ($1, 'analyse')`,
      [session.user.id]
    ).catch(e => console.error("[analyser] Erreur log lifetime:", e.message));
  } else {
    // Décrémenter atomiquement — échoue si scans = 0
    const { rowCount, rows: rowsMaj } = await pool.query(
      'UPDATE "user" SET scans = scans - 1 WHERE id = $1 AND scans > 0 RETURNING scans',
      [session.user.id]
    );
    if (rowCount === 0) {
      const estAbonne: boolean = utilisateur?.is_subscribed ?? false;
      const msg = estAbonne
        ? "Limite mensuelle de 30 analyses atteinte. Elle sera réinitialisée à votre prochain renouvellement."
        : "Vous avez utilisé vos 3 analyses gratuites. Passez à un abonnement pour continuer.";
      return NextResponse.json({ error: msg }, { status: 403 });
    }
    scansRestants = rowsMaj[0].scans;
  }

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Tu es un expert en recrutement et optimisation de CV. Analyse la correspondance entre ce CV et cette offre d'emploi.

CV :
${cv}

OFFRE D'EMPLOI :
${offre}

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) avec cette structure exacte :
{
  "score": <entier entre 0 et 100 représentant le pourcentage de correspondance ATS>,
  "nomPoste": "<titre du poste extrait de l'offre d'emploi, ex: 'Développeur React Senior'>",
  "resume": "<2-3 phrases d'analyse globale en français, toujours à la 2e personne du pluriel (vous possédez, votre profil, vous manquez...) — ne jamais utiliser le prénom du candidat>",
  "forme": [
    { "verdict": "✅" | "❌", "constat": "<constat factuel court, jamais une question>" },
    ...
  ],
  "motsClesManquants": [<mots-clés importants de l'offre absents du CV>],
  "motsClesPresents": [<mots-clés importants de l'offre présents dans le CV>]
}

Règles pour le score ATS (0-100) :
- 90-100 : CV quasi parfaitement aligné avec l'offre
- 75-89 : très bonne correspondance, quelques points à affiner
- 60-74 : bonne base mais lacunes notables
- 40-59 : correspondance partielle, travail significatif à faire
- 20-39 : faible correspondance, CV peu adapté à l'offre
- 0-19 : très peu de correspondance, CV inadapté
Le score doit refléter précisément le ratio mots-clés présents / total mots-clés importants, ajusté par la pertinence de l'expérience.

Règles pour forme (section factuelle sur la qualité du CV) :
- Génère 4 à 6 constats factuels sur la forme du CV (pas sur les mots-clés)
- Chaque constat est une observation factuelle courte (jamais une question, jamais un conseil)
- Exemples de bons constats : "Aucune expérience ne contient de chiffres ou de résultats mesurables", "Les titres de poste sont clairs et alignés avec l'offre", "Les bullet points sont absents dans la section expériences"
- verdict ✅ si le point est positif, ❌ si c'est un problème`,
      },
    ],
  });

  const contenu = message.content[0];
  if (contenu.type !== "text") {
    return NextResponse.json({ error: "Réponse inattendue de l'IA." }, { status: 500 });
  }

  let resultat;
  try {
    const texte = contenu.text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    resultat = JSON.parse(texte);
  } catch {
    console.error("Réponse brute de Claude :", contenu.text);
    return NextResponse.json({ error: "Impossible de parser la réponse de l'IA." }, { status: 500 });
  }

  // Log de l'événement pour la personnalisation des emails
  if (resultat.nomPoste) {
    pool.query(
      `INSERT INTO user_events (user_id, action, metadata) VALUES ($1, 'analyse', $2)`,
      [session.user.id, JSON.stringify({ nomPoste: resultat.nomPoste, score: resultat.score })]
    ).catch(e => console.error("[analyser] Erreur log event:", e.message));
  }

  return NextResponse.json({ ...resultat, scansRestants });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[analyser] Erreur non gérée:", msg);
    return NextResponse.json({ error: `Erreur serveur : ${msg}` }, { status: 500 });
  }
}
