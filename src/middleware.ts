import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";
interface LocalJWT extends JWT {
  user_roles?: string[];
}
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname } = req.nextUrl;
    if (req.nextauth.token) {
      const token: LocalJWT = req.nextauth.token;
      if (
        pathname.startsWith("/admin") &&
        token.user_roles &&
        !token.user_roles.includes("administrator")
      ) {
        req.nextUrl.pathname = "/404";
        return NextResponse.redirect(req.nextUrl);
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (token) return true; // If there is a token, the user is authenticated
        return false;
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
