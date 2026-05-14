import type { DefaultSession, NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { UserRole } from "@/lib/auth/roles";

export const authConfig = {
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: { token: JWT & { id?: string; role?: UserRole }; user?: { id?: string; role?: UserRole } }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
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
} satisfies NextAuthConfig;
