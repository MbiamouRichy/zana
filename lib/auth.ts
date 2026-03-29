import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { resend } from "./resend";
<<<<<<< HEAD
import { ResetPasswordTemplate } from "@/components/resetPasswordTemplate";
import { EmailTemplate } from "@/components/emailTemplate";
=======
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
<<<<<<< HEAD
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook"],
    },
  },
=======
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        to: user.email,
        subject: "Changement de mot de passe",
<<<<<<< HEAD
        html: ResetPasswordTemplate({ url, email: user.email }),
        from: "Extraverty <onboarding@resend.dev>",
=======
        text: `Clique sur le lien pour changer ton mot de passe: ${url}`,
        from: "noreply <onboarding@resend.dev>",
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
<<<<<<< HEAD
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
=======
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        to: user.email,
<<<<<<< HEAD
        subject: "Verifier votre adresse e-mail",
        html: EmailTemplate({ url, email: user.email }),
=======
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
        from: "noreply<onboarding@resend.dev>",
      });
    },
  },
});
