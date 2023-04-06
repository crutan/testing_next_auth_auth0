"use client";
import Link from "next/link";
import { Inter, Josefin_Sans } from "next/font/google";
import { useSession } from "next-auth/react";

export default function AdminHome() {
  const { data: session, status } = useSession();

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
      <div>
        <Link href="/">Back to Home</Link>
      </div>
    </main>
  );
}
