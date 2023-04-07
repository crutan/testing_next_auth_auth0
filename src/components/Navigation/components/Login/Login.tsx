"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "ui/Link";

import type { HoneycombSession } from "@/types";

const Login = () => {
  const { data: session } = useSession();
  const hc_session = session as HoneycombSession;

  if (hc_session && hc_session.user) {
    return (
      <>
        <li>
          <Link className="text-celesteal-400" href="/dashboard">
            Dashboard
          </Link>
        </li>
        {hc_session.user.roles &&
          hc_session.user.roles.includes("administrator") && (
            <li>
              <Link className="text-celesteal-400" href="/admin">
                Admin
              </Link>
            </li>
          )}
        <li>
          <Link
            className="text-celesteal-400"
            href="/api/auth/signOut"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <li>
        <Link
          className="text-celesteal-400"
          href="/api/auth/signIn"
          onClick={(e) => {
            e.preventDefault();
            signIn("auth0");
          }}
        >
          Login
        </Link>
      </li>
    );
  }
};
export default Login;
