import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <div>Everyone can see this.</div>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
    </main>
  );
}
