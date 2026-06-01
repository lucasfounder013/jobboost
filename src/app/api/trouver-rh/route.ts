import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const ICYPEAS_API_KEY = process.env.ICYPEAS_API_KEY!;
const ICYPEAS_HEADERS = { Authorization: ICYPEAS_API_KEY, "Content-Type": "application/json" };

function nettoyerDomaine(input: string): string {
  return input
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "")
    .trim()
    .toLowerCase();
}

async function icypeasFetch(url: string, options: RequestInit): Promise<Record<string, unknown>> {
  const res = await fetch(url, options);
  const text = await res.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    console.error(`[Icypeas] Réponse non-JSON (${res.status}) ${url}:`, text.slice(0, 300));
    throw new Error(`Icypeas erreur ${res.status} : ${text.slice(0, 100)}`);
  }
}

const CERTAINTY_SCORE: Record<string, number> = {
  ultra_sure: 99,
  very_sure: 90,
  sure: 75,
  unsure: 40,
  very_unsure: 20,
};

async function pollEmailSearch(id: string): Promise<Record<string, unknown>> {
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const data = await icypeasFetch("https://app.icypeas.com/api/bulk-single-searchs/read", {
      method: "POST",
      headers: ICYPEAS_HEADERS,
      body: JSON.stringify({ id }),
    });
    const items = data.items as Array<{ status: string }> | undefined;
    if (!items || items.length === 0) continue;
    if (items[0].status === "DEBITED") return data;
    if (items[0].status === "FAILED" || items[0].status === "NOT_FOUND") {
      throw new Error("Aucun email trouvé pour ce contact.");
    }
  }
  throw new Error("La recherche a dépassé 2 minutes. Veuillez réessayer.");
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { mode, entreprise, domaine, prenom, nom } = await req.json();

  if (!mode || !["domaine", "personne", "email"].includes(mode)) {
    return NextResponse.json({ error: "Mode invalide." }, { status: 400 });
  }
  if (mode === "domaine" && !entreprise && !domaine) {
    return NextResponse.json({ error: "Entreprise ou domaine requis." }, { status: 400 });
  }
  if (mode === "personne" && (!prenom || !nom || (!entreprise && !domaine))) {
    return NextResponse.json({ error: "Prénom, nom et entreprise (ou domaine) requis." }, { status: 400 });
  }
  if (mode === "email" && (!prenom || !nom || (!entreprise && !domaine))) {
    return NextResponse.json({ error: "Prénom, nom et domaine requis." }, { status: 400 });
  }

  let rhCreditsRestants: number | null = null;

  if (mode !== "domaine") {
    const { rowCount, rows } = await pool.query(
      'UPDATE "user" SET rh_credits = rh_credits - 1 WHERE id = $1 AND rh_credits > 0 RETURNING rh_credits',
      [session.user.id]
    );
    if (rowCount === 0) {
      return NextResponse.json({ error: "Vous n'avez plus de crédits email ce mois-ci." }, { status: 403 });
    }
    rhCreditsRestants = rows[0].rh_credits;
  }

  try {
    const cible = domaine ? nettoyerDomaine(domaine as string) : (entreprise as string);

    if (mode === "domaine") {
      const data = await icypeasFetch("https://app.icypeas.com/api/find-people", {
        method: "POST",
        headers: ICYPEAS_HEADERS,
        body: JSON.stringify({ company: cible, limit: 100 }),
      });
      if (!data.success) throw new Error("Impossible de trouver des contacts pour cette entreprise.");

      type IcypeasPerson = { firstname?: string; lastname?: string; jobtitle?: string; linkedinUrl?: string };
      const items = (data.items as IcypeasPerson[]) ?? [];

      const contacts = items.map((p) => ({
        prenom: p.firstname ?? "",
        nom: p.lastname ?? "",
        poste: p.jobtitle ?? "",
        linkedin: p.linkedinUrl ?? "",
      }));

      return NextResponse.json({ contacts, domaineTrouve: cible, rhCreditsRestants });
    }

    if (mode === "personne" || mode === "email") {
      const startData = await icypeasFetch("https://app.icypeas.com/api/email-search", {
        method: "POST",
        headers: ICYPEAS_HEADERS,
        body: JSON.stringify({ firstname: prenom, lastname: nom, domainOrCompany: cible }),
      });
      console.log("[Icypeas] email-search start:", JSON.stringify(startData));
      const searchId = (startData.item as { _id?: string })?._id;
      if (!searchId) throw new Error("Impossible de démarrer la recherche d'email.");

      const result = await pollEmailSearch(searchId);
      type IcypeasEmailItem = { status: string; results?: { emails?: { email: string; certainty?: string }[] } };
      const items = (result.items as IcypeasEmailItem[]) ?? [];
      const emailData = items[0]?.results?.emails?.[0];

      if (!emailData?.email) throw new Error("Aucun email trouvé pour ce contact.");

      const certitude = CERTAINTY_SCORE[emailData.certainty ?? ""] ?? 0;
      return NextResponse.json({ email: emailData.email, certitude, rhCreditsRestants });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    if (mode !== "domaine") {
      await pool.query('UPDATE "user" SET rh_credits = rh_credits + 1 WHERE id = $1', [session.user.id]);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ error: "Mode non géré." }, { status: 400 });
}
