"use client";
import Link from "next/link";

import ClassList from "./classes/ClassList";

export default function AdminHome() {
  return (
    <main>
      <h1>You have to be logged in to see this.</h1>
      <div>Only logged in users can see this page.</div>

      <Link href="/admin/classes">Class List as a Page</Link>

      <h2>Class List as Component</h2>
      <ClassList />
    </main>
  );
}
