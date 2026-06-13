import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(pageHtml("Lien invalide", "Le lien de désabonnement est invalide ou expiré."), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      status: 400,
    });
  }

  const { rowCount } = await pool.query(
    `UPDATE email_onboarding SET unsubscribed_at = NOW()
     WHERE unsubscribe_token = $1 AND unsubscribed_at IS NULL`,
    [token]
  );

  if (rowCount === 0) {
    return new NextResponse(
      pageHtml("Déjà désabonné", "Vous êtes déjà désabonné de nos emails."),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  return new NextResponse(
    pageHtml("Désabonnement confirmé", "Vous ne recevrez plus d'emails de JobBoost. Votre préférence a bien été enregistrée."),
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function pageHtml(titre: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titre} — JobBoost</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#fff;border-radius:12px;padding:40px 48px;max-width:440px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <div style="font-size:28px;margin-bottom:16px;">✓</div>
    <h1 style="font-size:18px;font-weight:700;color:#111827;margin:0 0 12px;">${titre}</h1>
    <p style="font-size:14px;color:#6b7280;margin:0 0 24px;line-height:1.6;">${message}</p>
    <a href="https://www.jobboost.fr" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;font-weight:600;font-size:13px;padding:10px 24px;border-radius:8px;">Retour à JobBoost</a>
  </div>
</body>
</html>`;
}
