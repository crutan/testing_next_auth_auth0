"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function LoggedInHome() {
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
