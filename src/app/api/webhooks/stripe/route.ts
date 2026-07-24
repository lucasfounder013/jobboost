import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { PostHog } from "posthog-node";

// Quotas mensuels du plan "monthly"
const MONTHLY_SCANS = 30;
const MONTHLY_CREDITS = 15;
const MONTHLY_LM = 15;
const MONTHLY_RH = 3;

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
      const plan = checkoutSession.metadata?.plan;

      if (!userId || !plan) break;

      try {
        if (plan === "lifetime" && checkoutSession.mode === "payment") {
          // Paiement unique — accès à vie, quotas ignorés (bypass dans les routes API)
          await pool.query(
            `UPDATE "user" SET is_lifetime = true, plan_type = 'lifetime', lifetime_purchased_at = now()
             WHERE id = $1`,
            [userId]
          );
          await phCapture(userId, "lifetime_purchased", { amount: checkoutSession.amount_total });
        } else if (plan === "monthly" && checkoutSession.mode === "subscription") {
          const subscriptionId = checkoutSession.subscription as string;
          if (!subscriptionId) break;
          await pool.query(
            `UPDATE "user" SET is_subscribed = true, stripe_subscription_id = $1, plan_type = 'monthly',
              scans = $2, credits = $3, lm_credits = $4, rh_credits = $5
             WHERE id = $6`,
            [subscriptionId, MONTHLY_SCANS, MONTHLY_CREDITS, MONTHLY_LM, MONTHLY_RH, userId]
          );
          await phCapture(userId, "subscription_created", { plan: "monthly", subscription_id: subscriptionId });
        }
      } catch (err) {
        console.error("[webhook] Erreur mise à jour utilisateur après paiement :", err);
        return NextResponse.json({ error: "Erreur DB lors de l'activation." }, { status: 500 });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { rows } = await pool.query<{ id: string; plan_type: string }>(
        'SELECT id, plan_type FROM "user" WHERE stripe_subscription_id = $1',
        [subscription.id]
      );
      // Ne pas toucher is_lifetime : un user lifetime qui aurait aussi eu un abo garde son accès à vie
      await pool.query(
        `UPDATE "user" SET is_subscribed = false, stripe_subscription_id = NULL,
          plan_type = CASE WHEN is_lifetime THEN 'lifetime' ELSE NULL END
         WHERE stripe_subscription_id = $1`,
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
        // Reset quotas mensuels UNIQUEMENT pour le plan monthly
        await pool.query(
          `UPDATE "user" SET
            scans = $1, credits = $2, lm_credits = $3, rh_credits = $4
           WHERE stripe_subscription_id = $5 AND is_subscribed = true AND plan_type = 'monthly'`,
          [MONTHLY_SCANS, MONTHLY_CREDITS, MONTHLY_LM, MONTHLY_RH, subId]
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
          `UPDATE "user" SET is_subscribed = false, stripe_subscription_id = NULL,
            plan_type = CASE WHEN is_lifetime THEN 'lifetime' ELSE NULL END
           WHERE stripe_subscription_id = $1`,
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
