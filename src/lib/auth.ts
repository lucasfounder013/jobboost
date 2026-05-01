import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "JobBoost <noreply@jobboost.fr>",
        to: user.email,
        subject: "Vérifiez votre adresse email",
        html: `<p>Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p><p><a href="${url}">${url}</a></p>`,
      });
    },
  },
  user: {
    additionalFields: {
      credits: {
        type: "number",
        defaultValue: 1,
        fieldName: "credits",
      },
    },
  },
  plugins: [nextCookies()],
});
