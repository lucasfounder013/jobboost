import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { resend } from "@/lib/resend";
import { email1, email2, email3, email4, email5, triggerRH, triggerScans } from "@/lib/emails/templates";



const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobboost.fr";

type UserRow = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  rh_credits: number;
  scans: number;
  is_subscribed: boolean;
  dernier_poste: string | null;
  eo_id: string | null;
  unsubscribe_token: string | null;
  email_1_sent_at: Date | null;
  email_2_sent_at: Date | null;
  email_3_sent_at: Date | null;
  email_4_sent_at: Date | null;
  email_5_sent_at: Date | null;
  trigger_rh_sent_at: Date | null;
  trigger_scans_sent_at: Date | null;
  unsubscribed_at: Date | null;
};

const emailFns = [email1, email2, email3, email4, email5];
const delaysJours = [0, 3, 6, 10, 14];
const columns = ["email_1_sent_at", "email_2_sent_at", "email_3_sent_at", "email_4_sent_at", "email_5_sent_at"];

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let rows: UserRow[];
  try {
    const result = await pool.query<UserRow>(`
      SELECT
        u.id, u.name, u.email, u."createdAt" AS created_at,
        u.rh_credits, u.scans, u.is_subscribed,
        (
          SELECT metadata->>'nomPoste'
          FROM user_events
          WHERE user_id = u.id AND metadata->>'nomPoste' IS NOT NULL
          ORDER BY created_at DESC
          LIMIT 1
        ) AS dernier_poste,
        eo.id AS eo_id,
        eo.unsubscribe_token,
        eo.email_1_sent_at,
        eo.email_2_sent_at,
        eo.email_3_sent_at,
        eo.email_4_sent_at,
        eo.email_5_sent_at,
        eo.trigger_rh_sent_at,
        eo.trigger_scans_sent_at,
        eo.unsubscribed_at
      FROM "user" u
      LEFT JOIN email_onboarding eo ON eo.user_id = u.id
      WHERE eo.unsubscribed_at IS NULL OR eo.id IS NULL
    `);
    rows = result.rows;
  } catch (err) {
    console.error("[cron/onboarding] Erreur requête DB principale:", err);
    return NextResponse.json({ error: "Erreur DB." }, { status: 500 });
  }

  const now = new Date();
  let sent = 0;

  for (const user of rows) {
    try {
      // Créer l'entrée email_onboarding si elle n'existe pas
      if (!user.eo_id) {
        await pool.query(
          `INSERT INTO email_onboarding (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
          [user.id]
        );
        const { rows: newRows } = await pool.query(
          `SELECT unsubscribe_token FROM email_onboarding WHERE user_id = $1`,
          [user.id]
        );
        user.unsubscribe_token = newRows[0]?.unsubscribe_token ?? null;
      }

      const token = user.unsubscribe_token;
      if (!token) continue;
      const unsubscribeUrl = `${appUrl}/api/unsubscribe?token=${token}`;
      const props = { nom: user.name ?? "vous", unsubscribeUrl, poste: user.dernier_poste ?? undefined };

      // --- Emails trigger comportementaux (prioritaires sur la séquence) ---

      let triggerEnvoye = false;

      // Trigger RH : rh_credits épuisés, non abonné, email pas encore envoyé
      if (user.rh_credits === 0 && !user.is_subscribed && !user.trigger_rh_sent_at) {
        const { subject, html } = triggerRH(props);
        const { error } = await resend.emails.send({
          from: "JobBoost <equipe@jobboost.fr>",
          to: user.email,
          subject,
          html,
        });
        if (!error) {
          await pool.query(
            `UPDATE email_onboarding SET trigger_rh_sent_at = NOW() WHERE user_id = $1`,
            [user.id]
          );
          sent++;
          triggerEnvoye = true;
        } else {
          console.error(`[cron/onboarding] triggerRH error pour user ${user.id}:`, error);
        }
      }

      // Trigger scans : analyses épuisées, non abonné, email pas encore envoyé
      if (user.scans === 0 && !user.is_subscribed && !user.trigger_scans_sent_at) {
        const { subject, html } = triggerScans(props);
        const { error } = await resend.emails.send({
          from: "JobBoost <equipe@jobboost.fr>",
          to: user.email,
          subject,
          html,
        });
        if (!error) {
          await pool.query(
            `UPDATE email_onboarding SET trigger_scans_sent_at = NOW() WHERE user_id = $1`,
            [user.id]
          );
          sent++;
          triggerEnvoye = true;
        } else {
          console.error(`[cron/onboarding] triggerScans error pour user ${user.id}:`, error);
        }
      }

      // Si un trigger a été envoyé ce passage, on ne cumule pas avec la séquence
      if (triggerEnvoye) continue;

      // --- Séquence onboarding (J+0, J+3, J+6, J+10, J+14) ---

      const daysSince = (now.getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24);

      const sentAt = [
        user.email_1_sent_at,
        user.email_2_sent_at,
        user.email_3_sent_at,
        user.email_4_sent_at,
        user.email_5_sent_at,
      ];

      let emailIndex: number | null = null;
      for (let i = 0; i < 5; i++) {
        if (sentAt[i] !== null) continue;
        if (i > 0 && sentAt[i - 1] === null) break;
        if (daysSince >= delaysJours[i]) {
          emailIndex = i;
          break;
        }
      }

      if (emailIndex === null) continue;

      // Email 2 (nudge J+3) : inutile si l'user a déjà analysé un CV — on marque comme envoyé et on passe
      if (emailIndex === 1 && user.scans < 5) {
        await pool.query(
          `UPDATE email_onboarding SET email_2_sent_at = NOW() WHERE user_id = $1`,
          [user.id]
        );
        continue;
      }

      const { subject, html } = emailFns[emailIndex](props);

      const { error: resendError } = await resend.emails.send({
        from: "JobBoost <equipe@jobboost.fr>",
        to: user.email,
        subject,
        html,
      });
      if (resendError) {
        console.error(`[cron/onboarding] Resend error pour user ${user.id}:`, resendError);
        continue;
      }
      await pool.query(
        `UPDATE email_onboarding SET ${columns[emailIndex]} = NOW() WHERE user_id = $1`,
        [user.id]
      );
      sent++;
    } catch (err) {
      console.error(`[cron/onboarding] Erreur pour user ${user.id}:`, err);
    }
  }

  return NextResponse.json({ sent });
}
