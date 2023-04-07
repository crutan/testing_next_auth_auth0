"use client";
import { useSession } from "next-auth/react";

import { HoneycombSession } from "@/types";

export default function AdminHome() {
  const { data: session, status } = useSession();
  const hc_session = session as HoneycombSession;
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <main>
      <h1>You have to be logged in to see this.</h1>
      <div>Only logged in users can see this page.</div>
      <div>You have an accessToken: {hc_session.accessToken}</div>
    </main>
  );
}
