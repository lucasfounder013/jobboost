import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Stripe from "stripe";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  void req;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { rows } = await pool.query(
    'SELECT stripe_customer_id FROM "user" WHERE id = $1',
    [session.user.id]
  );
  const customerId: string = rows[0]?.stripe_customer_id;

  if (!customerId) {
    return NextResponse.json({ error: "Aucun abonnement trouvé." }, { status: 404 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/abonnement`,
  });

  return NextResponse.json({ url: portalSession.url });
}
