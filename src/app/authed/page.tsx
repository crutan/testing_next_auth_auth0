"use client";
import Link from "next/link";
import Suspense from "react";
import { Inter, Josefin_Sans } from "next/font/google";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });
const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface ClassItem {
  id: number;
  name: string;
}

function ClassList(classList: { classes: [ClassItem] }) {
  console.log("Classes:", classList);
  return (
    <ul>
      {classList?.classes?.map((class_item) => (
        <li key={class_item.id}>{class_item.name}</li>
      ))}
    </ul>
  );
}

export default function LoggedInHome() {
  const { data: session, status } = useSession();
  const { data: classList, error, isLoading } = useSWR("/api/classes", fetcher);

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
      {!isLoading && !error && classList && (
        <div>
          <ClassList classes={classList} />
        </div>
      )}
      <div>
        <Link href="/">Back to Home</Link>
      </div>
    </main>
  );
}
