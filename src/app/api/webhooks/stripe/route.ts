import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import Stripe from "stripe";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // Lire le body brut — obligatoire pour la vérification de signature Stripe
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const userId = checkoutSession.metadata?.userId;
      const subscriptionId = checkoutSession.subscription as string;

      if (userId && subscriptionId) {
        await pool.query(
          'UPDATE "user" SET is_subscribed = true, stripe_subscription_id = $1 WHERE id = $2',
          [subscriptionId, userId]
        );
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await pool.query(
        'UPDATE "user" SET is_subscribed = false, stripe_subscription_id = NULL WHERE stripe_subscription_id = $1',
        [subscription.id]
      );
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const actif = subscription.status === "active" || subscription.status === "trialing";
      await pool.query(
        'UPDATE "user" SET is_subscribed = $1 WHERE stripe_subscription_id = $2',
        [actif, subscription.id]
      );
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription: string }).subscription;
      if (subId) {
        await pool.query(
          'UPDATE "user" SET is_subscribed = false WHERE stripe_subscription_id = $1',
          [subId]
        );
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
