import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const { type, message, email } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message requis" }, { status: 400 });
  }

  const typeLabel: Record<string, string> = {
    bug: "🐛 Bug",
    suggestion: "💡 Suggestion",
    autre: "💬 Autre",
  };

  const date = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #7C3AED; margin-bottom: 4px;">Nouveau feedback JobBoost</h2>
      <p style="color: #6B7280; font-size: 14px; margin-top: 0;">${date}</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; width: 120px; color: #374151;">Type</td>
          <td style="padding: 8px 0; color: #111827;">${typeLabel[type] ?? type}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Utilisateur</td>
          <td style="padding: 8px 0; color: #111827;">${email ?? "Non connecté"}</td>
        </tr>
      </table>
      <div style="margin-top: 16px; background: #F9FAFB; border-radius: 12px; padding: 16px;">
        <p style="font-weight: 600; color: #374151; margin-top: 0;">Message</p>
        <p style="color: #111827; white-space: pre-wrap; margin-bottom: 0;">${message.trim()}</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "equipe@jobboost.fr",
      to: "contact@jobboost.fr",
      subject: `[Feedback] ${typeLabel[type] ?? type} — ${date}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 500 });
  }
}
