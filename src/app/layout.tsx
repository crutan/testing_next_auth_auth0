"use client";
import "./globals.css";
import Header from "../components/header";
import { SessionProvider } from "next-auth/react";
import { Session } from "inspector";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
