import NextAuth, { type DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { UserRole } from "@/lib/auth/roles";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/auth/schemas";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user?.passwordHash || !user.isActive) {
          return null;
        }

        const passwordValid = await verifyPassword(parsed.data.password, user.passwordHash);

        if (!passwordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) {
        return true;
      }

      const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

      if (existingUser) {
        return existingUser.isActive;
      }

      const role = user.role ?? UserRole.PATIENT;
      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          emailVerified: new Date(),
          image: user.image,
          role,
          ...(role === UserRole.PATIENT
            ? { patientProfile: { create: {} } }
            : {}),
        },
      });

      user.id = createdUser.id;
      user.role = createdUser.role;

      return true;
    },
    async jwt({ token, user }: { token: JWT & { id?: string; role?: UserRole }; user?: { id?: string; role?: UserRole } }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (token.email && (!token.id || !token.role)) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }: { session: DefaultSession & { user: DefaultSession["user"] & { id: string; role: UserRole } }; token: JWT & { id?: string; role?: UserRole } }) {
      if (token.id) {
        session.user.id = token.id;
      }

      if (token.role) {
        session.user.role = token.role;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },
});
