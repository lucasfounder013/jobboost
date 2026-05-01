import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }),
  trustedOrigins: ["https://www.jobboost.fr", "https://jobboost.fr"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
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
