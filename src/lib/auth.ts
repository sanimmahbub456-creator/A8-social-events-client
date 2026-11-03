import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import clientPromise from "./mongodb";

// NOTE: better-auth moves fast — re-check https://www.better-auth.com/docs
// against this file's adapter/plugin names if you upgrade the package version.

const dbPromise = clientPromise.then((client) => client.db(process.env.DB_NAME || "socialEventsDB"));

export const auth = betterAuth({
  // mongodbAdapter expects a resolved Db instance.
  database: mongodbAdapter(await dbPromise),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      // better-auth's default user has name/email/image already;
      // photoURL from the Register form maps onto the built-in `image` field,
      // see RegisterForm.tsx.
    },
  },

  plugins: [
    // Issues a short-lived JWT the client can also mirror to the Express API,
    // in addition to the /jwt endpoint on the server that mints its own token.
    jwt({
      jwt: {
        expirationTime: "7d",
      },
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once a day
  },
});
