import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccount from "/config/firebase.json";

export const authOptions = {
  adapter: FirestoreAdapter({
    credential: admin.credential.cert(serviceAccount),
  }),

  providers: [
    EmailProvider({
      server: `smtp://${process.env.EMAIL_SERVER_USER}:${process.env.EMAIL_SERVER_PASSWORD}@${process.env.EMAIL_SERVER_HOST}:${process.env.EMAIL_SERVER_PORT}`,
      from: process.env.EMAIL_FROM,
    }), // ...add more providers here],
  ],
};

export default NextAuth(authOptions);
