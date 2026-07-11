import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { rows } = await pool.query(
    'SELECT scans, credits, lm_credits, rh_credits, is_subscribed, plan_type FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const u = rows[0] ?? {
    scans: 0,
    credits: 0,
    lm_credits: 0,
    rh_credits: 3,
    is_subscribed: false,
    plan_type: null,
  };

  return NextResponse.json({
    scans: u.scans,
    credits: u.credits,
    lmCredits: u.lm_credits,
    rhCredits: u.rh_credits,
    estAbonne: u.is_subscribed,
    planType: u.plan_type ?? null,
  });
}
