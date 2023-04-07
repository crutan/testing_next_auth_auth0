"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <h1>Home Page</h1>
      <div>Everyone can see this.</div>
      <div>
        {session && session.user && <p>Only signed in users can see this.</p>}
      </div>
    </main>
  );
}
