import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { resend } from "@/lib/resend";
import { email1, email2, email3, email4, email5 } from "@/lib/emails/templates";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobboost.fr";

type UserRow = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  eo_id: string | null;
  unsubscribe_token: string | null;
  email_1_sent_at: Date | null;
  email_2_sent_at: Date | null;
  email_3_sent_at: Date | null;
  email_4_sent_at: Date | null;
  email_5_sent_at: Date | null;
  unsubscribed_at: Date | null;
};

const emailFns = [email1, email2, email3, email4, email5];

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { rows } = await pool.query<UserRow>(`
    SELECT
      u.id, u.name, u.email, u.created_at,
      eo.id AS eo_id,
      eo.unsubscribe_token,
      eo.email_1_sent_at,
      eo.email_2_sent_at,
      eo.email_3_sent_at,
      eo.email_4_sent_at,
      eo.email_5_sent_at,
      eo.unsubscribed_at
    FROM "user" u
    LEFT JOIN email_onboarding eo ON eo.user_id = u.id
    WHERE eo.unsubscribed_at IS NULL
  `);

  const now = new Date();
  let sent = 0;

  for (const user of rows) {
    // Créer l'entrée email_onboarding si elle n'existe pas
    if (!user.eo_id) {
      await pool.query(
        `INSERT INTO email_onboarding (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
        [user.id]
      );
      // Re-lire le token généré
      const { rows: newRows } = await pool.query(
        `SELECT unsubscribe_token FROM email_onboarding WHERE user_id = $1`,
        [user.id]
      );
      user.unsubscribe_token = newRows[0]?.unsubscribe_token ?? null;
    }

    const token = user.unsubscribe_token;
    if (!token) continue;
    const unsubscribeUrl = `${appUrl}/api/unsubscribe?token=${token}`;

    const daysSince = (now.getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24);

    // Déterminer quel email envoyer selon les règles de timing et d'ordre
    const sentAt = [
      user.email_1_sent_at,
      user.email_2_sent_at,
      user.email_3_sent_at,
      user.email_4_sent_at,
      user.email_5_sent_at,
    ];
    const delaysJours = [0, 2, 4, 6, 8];
    const columns = ["email_1_sent_at", "email_2_sent_at", "email_3_sent_at", "email_4_sent_at", "email_5_sent_at"];

    let emailIndex: number | null = null;
    for (let i = 0; i < 5; i++) {
      if (sentAt[i] !== null) continue;
      if (i > 0 && sentAt[i - 1] === null) break; // respecter l'ordre
      if (daysSince >= delaysJours[i]) {
        emailIndex = i;
        break;
      }
    }

    if (emailIndex === null) continue;

    const { subject, html } = emailFns[emailIndex]({
      nom: user.name ?? "vous",
      unsubscribeUrl,
    });

    try {
      await resend.emails.send({
        from: "JobBoost <contact@jobboost.fr>",
        to: user.email,
        subject,
        html,
      });
      await pool.query(
        `UPDATE email_onboarding SET ${columns[emailIndex]} = NOW() WHERE user_id = $1`,
        [user.id]
      );
      sent++;
    } catch {
      // Erreur silencieuse — on réessaiera au prochain cron
    }
  }

  return NextResponse.json({ sent });
}
