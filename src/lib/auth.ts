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
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        fieldName: "first_name",
        input: true,
      },
      lastName: {
        type: "string",
        fieldName: "last_name",
        input: true,
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
