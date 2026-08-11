import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { headers } from "next/headers";
import {
  getUserByEmail,
  upsertOAuthUser,
  verifyPassword,
  isSsoEnabled,
} from "@/lib/auth/users";
import { rateLimit } from "@/lib/rate-limit";

function cookieDomain(): string | undefined {
  if (process.env.NODE_ENV !== "production") return undefined;
  const d = process.env.AUTH_COOKIE_DOMAIN?.trim();
  return d || ".elastictree.com";
}

const providers: NextAuthConfig["providers"] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (process.env.AUTH_MICROSOFT_ENTRA_ID_ID && process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET) {
  providers.push(
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET) {
  providers.push(
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

providers.push(
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = String(credentials?.email ?? "")
        .trim()
        .toLowerCase();
      const password = String(credentials?.password ?? "");
      if (!email.includes("@") || !password) return null;

      let ip = "unknown";
      try {
        const h = await headers();
        ip =
          h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          h.get("x-real-ip")?.trim() ||
          "unknown";
      } catch {
        /* headers() unavailable outside request context */
      }
      const byIp = await rateLimit(`auth-signin:ip:${ip}`, {
        limit: 30,
        windowMs: 15 * 60_000,
      });
      const byEmail = await rateLimit(`auth-signin:email:${email}`, {
        limit: 10,
        windowMs: 15 * 60_000,
      });
      if (!byIp.success || !byEmail.success) return null;

      const user = await getUserByEmail(email);
      if (!user?.passwordHash) return null;
      if (!verifyPassword(password, user.passwordHash)) return null;
      return { id: user.id, email: user.email, name: user.name ?? undefined };
    },
  }),
);

export const authConfig = {
  providers,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: {
    signIn: "/accounts/signin",
    error: "/accounts/signin",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-et.session-token`
          : `et.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: cookieDomain(),
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!isSsoEnabled() && account?.provider !== "credentials") {
        // Social requires ET_SSO=1; credentials always allowed for local bootstrap
        if (account?.provider && account.provider !== "credentials") return false;
      }
      const email = user.email?.trim().toLowerCase();
      if (!email) return false;
      if (account?.provider && account.provider !== "credentials") {
        try {
          await upsertOAuthUser({
            email,
            name: user.name,
            provider: account.provider,
          });
        } catch (err) {
          // Do not AccessDenied — JWT session can still be issued.
          console.error("[auth] upsertOAuthUser failed", err);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user?.email) {
        try {
          const u = await getUserByEmail(user.email);
          token.email = user.email;
          token.sub = u?.id ?? user.id;
          token.name = user.name ?? u?.name;
        } catch {
          token.email = user.email;
          token.sub = user.id;
          token.name = user.name;
        }
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = (token.email as string) || session.user.email;
        session.user.name = (token.name as string) || session.user.name;
        (session.user as { id?: string }).id = token.sub as string;
      }
      return session;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
