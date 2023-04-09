"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export interface AuthContextProps {
  children: React.ReactNode;
  session: Session | null;
}
const queryClient = new QueryClient();

export default function AuthContext({ children, session }: AuthContextProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
