import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { PostHog } from "posthog-node";



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

      if (userId && subscriptionId) {
        try {
          await pool.query(
            `UPDATE "user" SET is_subscribed = true, stripe_subscription_id = $1, plan_type = $2,
              scans = CASE WHEN $2 = 'starter' THEN 15 ELSE 50 END,
              credits = CASE WHEN $2 = 'starter' THEN 10 ELSE 50 END,
              lm_credits = CASE WHEN $2 = 'starter' THEN 10 ELSE 50 END,
              rh_credits = CASE WHEN $2 = 'starter' THEN 2 ELSE 10 END
             WHERE id = $3`,
            [subscriptionId, plan, userId]
          );
          await phCapture(userId, "subscription_created", { plan, subscription_id: subscriptionId });
        } catch (err) {
          console.error("[webhook] Erreur mise à jour utilisateur après paiement :", err);
          return NextResponse.json({ error: "Erreur DB lors de l'activation." }, { status: 500 });
        }
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
      const statutOK = subscription.status === "active" || subscription.status === "trialing";
      const actif = statutOK && !subscription.cancel_at_period_end;
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
          `UPDATE "user" SET
            scans = CASE WHEN plan_type = 'starter' THEN 15 ELSE 50 END,
            credits = CASE WHEN plan_type = 'starter' THEN 10 ELSE 50 END,
            lm_credits = CASE WHEN plan_type = 'starter' THEN 10 ELSE 50 END,
            rh_credits = CASE WHEN plan_type = 'starter' THEN 2 ELSE 10 END
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
        // Annuler immédiatement pour arrêter les Smart Retries Stripe (retries en boucle sinon)
        try {
          await stripe.subscriptions.cancel(subId);
        } catch (err) {
          console.error("[webhook] Erreur annulation souscription après échec paiement :", err);
        }
        // Voider la facture pour stopper les relances Stripe côté client (email "Update your payment method")
        try {
          if (invoice.id) {
            await stripe.invoices.voidInvoice(invoice.id);
          }
        } catch (err) {
          console.error("[webhook] Erreur void facture après échec paiement :", err);
        }
        await pool.query(
          'UPDATE "user" SET is_subscribed = false, stripe_subscription_id = NULL, plan_type = NULL WHERE stripe_subscription_id = $1',
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
