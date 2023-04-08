import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

import type { HoneycombProfile, HoneycombSession } from "@/types";

// export const authOptions: NextAuthOptions = {
export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      name: "Honeycomb",
      id: "auth0",
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      idToken: true,
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE || ""),
          scope: "openid profile email user:isAdmin roles",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      style: {
        logo: "https://honeycomb-uploads.s3.amazonaws.com/HC-LOGO.svg",
        logoDark: "https://honeycomb-uploads.s3.amazonaws.com/HC-LOGO.svg",
        bg: "#fff",
        text: "#EB5424",
        bgDark: "#fcac9f",
        textDark: "#000",
      },
    }), // as Auth0ProviderWithAudience)
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const hc_session = session as HoneycombSession;

      if (token) {
        hc_session.user = {
          id: token.sub,
          name: token.name || undefined,
          email: token.email || undefined,
          image: token.picture || undefined,
        };
        if (token.roles && Array.isArray(token.roles)) {
          hc_session.user.roles = token.roles;
        }
        hc_session.accessToken = String(token.accessToken) || undefined;
        hc_session.error = String(token.error) || undefined;
      }
      return session;
    },
    // async jwt({
    //   token,
    //   account,
    //   profile,
    // }: {
    //   token: JWT;
    //   account: Account | null;
    //   profile: HoneyCombProfile | undefined;
    // }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   if (profile && profile.user_roles) {
    //     token.user_roles = profile.user_roles || [];
    //   }

    //   return token;
    // },
    async jwt({ token, account, profile }) {
      const hc_profile = profile as HoneycombProfile;

      if (account) {
        token.accessToken = account.access_token;
      }
      if (hc_profile && hc_profile.user_roles) {
        token.roles = hc_profile.user_roles || [];
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
