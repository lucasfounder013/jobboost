import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Pool } from "pg";
import Stripe from "stripe";
import { auth } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const PRICE_IDS: Record<string, string> = {
    hebdo: process.env.STRIPE_PRICE_ID_HEBDO!,
    mensuel: process.env.STRIPE_PRICE_ID_MENSUEL!,
  };
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  const { plan } = await req.json();
  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Plan invalide." }, { status: 400 });
  }

  // Récupérer ou créer le stripe_customer_id
  const { rows } = await pool.query(
    'SELECT stripe_customer_id FROM "user" WHERE id = $1',
    [session.user.id]
  );
  let customerId: string = rows[0]?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: { userId: session.user.id },
    });
    customerId = customer.id;
    await pool.query(
      'UPDATE "user" SET stripe_customer_id = $1 WHERE id = $2',
      [customerId, session.user.id]
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success`,
    cancel_url: `${baseUrl}/pricing`,
    metadata: { userId: session.user.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
