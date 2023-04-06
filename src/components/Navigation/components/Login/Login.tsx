"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "ui/Link";

const Login = () => {
  const { data: session, status } = useSession();

  if (session && session.user) {
    return (
      <>
        <li>
          <Link className="text-celesteal-400" href="/dashboard">
            Dashboard
          </Link>
        </li>
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
