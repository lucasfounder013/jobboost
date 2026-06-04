import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import Stripe from "stripe";
import { PostHog } from "posthog-node";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

function phCapture(distinctId: string, event: string, properties?: Record<string, unknown>) {
  const client = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
  });
  client.capture({ distinctId, event, properties });
  return client.shutdown();
}

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
      const plan = checkoutSession.metadata?.plan ?? "starter";
      const subscriptionId = checkoutSession.subscription as string;
      const rhCredits = plan === "pro" ? 80 : 20;

      if (userId && subscriptionId) {
        await pool.query(
          'UPDATE "user" SET is_subscribed = true, stripe_subscription_id = $1, plan_type = $2, rh_credits = $3 WHERE id = $4',
          [subscriptionId, plan, rhCredits, userId]
        );
        await phCapture(userId, "subscription_created", { plan, subscription_id: subscriptionId });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { rows } = await pool.query<{ id: string; plan_type: string }>(
        'SELECT id, plan_type FROM "user" WHERE stripe_subscription_id = $1',
        [subscription.id]
      );
      await pool.query(
        'UPDATE "user" SET is_subscribed = false, stripe_subscription_id = NULL, plan_type = NULL WHERE stripe_subscription_id = $1',
        [subscription.id]
      );
      if (rows[0]) {
        await phCapture(rows[0].id, "subscription_cancelled", { plan: rows[0].plan_type });
      }
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

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription: string }).subscription;
      if (subId) {
        await pool.query(
          `UPDATE "user" SET rh_credits = CASE WHEN plan_type = 'pro' THEN 80 ELSE 20 END
           WHERE stripe_subscription_id = $1 AND is_subscribed = true`,
          [subId]
        );
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription: string }).subscription;
      if (subId) {
        const { rows } = await pool.query<{ id: string; plan_type: string }>(
          'SELECT id, plan_type FROM "user" WHERE stripe_subscription_id = $1',
          [subId]
        );
        await pool.query(
          'UPDATE "user" SET is_subscribed = false WHERE stripe_subscription_id = $1',
          [subId]
        );
        if (rows[0]) {
          await phCapture(rows[0].id, "payment_failed", { plan: rows[0].plan_type });
        }
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
