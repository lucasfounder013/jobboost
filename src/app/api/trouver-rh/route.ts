import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const SNOV_CLIENT_ID = process.env.SNOV_CLIENT_ID!;
const SNOV_CLIENT_SECRET = process.env.SNOV_CLIENT_SECRET!;

function nettoyerDomaine(input: string): string {
  return input
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "")
    .trim()
    .toLowerCase();
}

async function obtenirTokenSnov(): Promise<string> {
  const res = await fetch("https://api.snov.io/v1/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ grant_type: "client_credentials", client_id: SNOV_CLIENT_ID, client_secret: SNOV_CLIENT_SECRET }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Impossible d'obtenir le token Snov.io");
  return data.access_token;
}

async function pollResultat(url: string, token: string): Promise<Record<string, unknown>> {
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    const status = data.meta?.status ?? data.status;
    if (status === "completed" || status === "done") return data;
    // Retourner seulement si data.data est un tableau non vide ou un objet non-null
    if (data.data != null && (!Array.isArray(data.data) || (data.data as unknown[]).length > 0)) return data;
  }
  throw new Error("Timeout : Snov.io n'a pas répondu dans les 40 secondes");
}

async function resoudreDomaine(entreprise: string, token: string): Promise<string> {
  const res = await fetch("https://api.snov.io/v2/company-domain-by-name/start", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query: entreprise }),
  });
  const startData = await res.json();
  const taskHash = startData.data?.task_hash ?? startData.task_hash;
  if (!taskHash) throw new Error(`Impossible de résoudre le domaine pour "${entreprise}"`);

  const result = await pollResultat(`https://api.snov.io/v2/company-domain-by-name/result?task_hash=${taskHash}`, token);
  const items = result.data as Record<string, unknown>[] | undefined;
  const domain = items?.[0]?.domain as string | undefined;
  if (!domain) throw new Error(`Domaine introuvable pour l'entreprise "${entreprise}"`);
  return domain;
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { mode, entreprise, domaine, prenom, nom, searchEmailsUrl } = await req.json();

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

  // Les modes "personne" et "email" consomment 1 crédit (gratuits et abonnés)
  if (mode !== "domaine") {
    const { rowCount, rows } = await pool.query(
      'UPDATE "user" SET rh_credits = rh_credits - 1 WHERE id = $1 AND rh_credits > 0 RETURNING rh_credits',
      [session.user.id]
    );
    if (rowCount === 0) {
      return NextResponse.json(
        { error: "Vous n'avez plus de crédits email ce mois-ci." },
        { status: 403 }
      );
    }
    rhCreditsRestants = rows[0].rh_credits;
  }

  try {
    const token = await obtenirTokenSnov();
    let domain = domaine ? nettoyerDomaine(domaine as string) : undefined;

    if (!domain && entreprise) {
      domain = await resoudreDomaine(entreprise as string, token);
    }

    if (mode === "domaine") {
      const res = await fetch("https://api.snov.io/v2/domain-search/prospects/start", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ domain, limit: 100 }),
      });
      const startData = await res.json();
      const taskHash = startData.meta?.task_hash ?? startData.data?.task_hash ?? startData.task_hash;
      if (!taskHash) throw new Error("Impossible de démarrer la recherche de prospects");

      const result = await pollResultat(`https://api.snov.io/v2/domain-search/prospects/result/${taskHash}`, token);

      type SnovProspect = { first_name?: string; firstName?: string; last_name?: string; lastName?: string; position?: string; source_page?: string; search_emails_start?: string };
      let prospects = (result.data as SnovProspect[]) ?? [];
      const totalCount: number = (result.meta as Record<string, unknown>)?.total_count as number ?? 0;
      const pageSize = prospects.length;

      // Récupère les pages suivantes si nécessaire (max 100 prospects)
      if (pageSize > 0 && totalCount > pageSize) {
        const totalPages = Math.min(Math.ceil(Math.min(totalCount, 100) / pageSize), 5);
        const pageRequests = Array.from({ length: totalPages - 1 }, (_, i) =>
          fetch(`https://api.snov.io/v2/domain-search/prospects/result/${taskHash}?page=${i + 2}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(r => r.json())
        );
        const pages = await Promise.all(pageRequests);
        for (const p of pages) {
          prospects = prospects.concat((p.data as SnovProspect[]) ?? []);
        }
        prospects = prospects.slice(0, Math.min(totalCount, 100));
      }

      let contacts = prospects.map((p) => {
        const prenom = p.firstName ?? p.first_name ?? "";
        const nom = p.lastName ?? p.last_name ?? "";
        const sourcePage = p.source_page ?? "";
        const linkedin = sourcePage.includes("linkedin.com")
          ? sourcePage
          : sourcePage
            ? `https://www.linkedin.com/in/${sourcePage}`
            : "";
        return { prenom, nom, poste: p.position ?? "", linkedin, searchEmailsStart: p.search_emails_start ?? "" };
      });


      return NextResponse.json({ contacts, domaineTrouve: domain, rhCreditsRestants });
    }

    if (mode === "personne") {
      const res = await fetch("https://api.snov.io/v2/emails-by-domain-by-name/start", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rows: [{ first_name: prenom, last_name: nom, domain }] }),
      });
      const startData = await res.json();
      const taskHash = startData.data?.task_hash ?? startData.task_hash;
      if (!taskHash) throw new Error("Impossible de démarrer la recherche de personne");

      const result = await pollResultat(`https://api.snov.io/v2/emails-by-domain-by-name/result?task_hash=${taskHash}`, token);

      type SnovPersonne = { people?: string; result?: { email: string; smtp_status?: string }[] };
      const items = (result.data as SnovPersonne[]) ?? [];
      const contacts = items
        .filter((c: SnovPersonne) => (c.result?.length ?? 0) > 0)
        .map((c: SnovPersonne) => ({
          prenom,
          nom,
          poste: "",
          email: c.result?.[0]?.email ?? "",
          statut: c.result?.[0]?.smtp_status ?? "",
        }));

      return NextResponse.json({ contacts, domaineTrouve: domain, rhCreditsRestants });
    }
    if (mode === "email") {
      type SnovEmailItem = { result?: { email: string; smtp_status?: string }[] };

      if (searchEmailsUrl) {
        // Utilise l'URL spécifique au prospect fournie par l'endpoint domain-search/prospects
        const startRes = await fetch(searchEmailsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const startData = await startRes.json();
        const taskHash = startData.meta?.task_hash ?? startData.data?.task_hash ?? startData.task_hash;
        const resultUrl = startData.links?.result ?? (taskHash ? `https://api.snov.io/v2/domain-search/prospects/search-emails/result/${taskHash}` : null);
        if (resultUrl) {
          const result = await pollResultat(resultUrl, token);
          const emailsData = (result.data as { emails?: { email: string; smtp_status?: string }[] })?.emails ?? [];
          const emailData = emailsData[0];
          if (emailData?.email) {
            return NextResponse.json({ email: emailData.email, statut: emailData.smtp_status ?? "", rhCreditsRestants });
          }
        }
      }

      // Fallback : emails-by-domain-by-name
      const res = await fetch("https://api.snov.io/v2/emails-by-domain-by-name/start", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rows: [{ first_name: prenom, last_name: nom, domain }] }),
      });
      const startData = await res.json();
      const taskHash = startData.data?.task_hash ?? startData.task_hash;
      if (!taskHash) throw new Error("Impossible de démarrer la recherche d'email");

      const result = await pollResultat(`https://api.snov.io/v2/emails-by-domain-by-name/result?task_hash=${taskHash}`, token);
      const items = (result.data as SnovEmailItem[]) ?? [];
      const emailData = items[0]?.result?.[0];
      if (!emailData?.email) {
        return NextResponse.json({ error: "Aucun email trouvé pour ce contact." }, { status: 404 });
      }
      return NextResponse.json({ email: emailData.email, statut: emailData.smtp_status ?? "", rhCreditsRestants });
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
