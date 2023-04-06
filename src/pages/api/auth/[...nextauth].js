import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// export const authOptions: NextAuthOptions = {
export const authOptions = {
  providers: [
    Auth0Provider({
      name: "Honeycomb",
      id: "auth0",
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      audience: process.env.AUTH0_AUDIENCE,
      idToken: true,
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE || ""),
          scope: "openid profile email user:isAdmin roles",
        },
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
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          picture: token.picture || undefined,
          sub: token.sub,
          roles: token.user_roles,
        };
        session.accessToken = token.accessToken || undefined;
        session.error = token.error || undefined;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile && profile.user_roles) {
        token.user_roles = profile.user_roles || [];
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default NextAuth(authOptions);
