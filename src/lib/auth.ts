import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { pool } from "@/lib/db";

export const auth = betterAuth({
  database: pool,
  trustedOrigins: [
    "https://www.rivjob.ai",
    "https://rivjob.ai",
    "https://www.jobboost.fr",
    "https://jobboost.fr",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      // Optionnels depuis la simplification du formulaire d'inscription (email + mot de passe uniquement)
      firstName: {
        type: "string",
        fieldName: "first_name",
        input: true,
        required: false,
      },
      lastName: {
        type: "string",
        fieldName: "last_name",
        input: true,
        required: false,
      },
      credits: {
        type: "number",
        defaultValue: 0,
        fieldName: "credits",
      },
      scans: {
        type: "number",
        defaultValue: 3,
        fieldName: "scans",
      },
      isSubscribed: {
        type: "boolean",
        defaultValue: false,
        fieldName: "is_subscribed",
      },
      stripeCustomerId: {
        type: "string",
        fieldName: "stripe_customer_id",
      },
      stripeSubscriptionId: {
        type: "string",
        fieldName: "stripe_subscription_id",
      },
      lmCredits: {
        type: "number",
        defaultValue: 3,
        fieldName: "lm_credits",
      },
      rhCredits: {
        type: "number",
        defaultValue: 0,
        fieldName: "rh_credits",
      },
      planType: {
        type: "string",
        fieldName: "plan_type",
      },
    },
  },
  plugins: [nextCookies()],
});
