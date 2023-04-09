"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Signin() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams ? searchParams.get("callbackUrl") || "/" : "/";

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("auth0");
    } else if (status === "authenticated") {
      console.log("authed");
      void router.push(callback);
    }
  }, [status, callback, router]);

  return <div>Awaiting Sign In</div>;
}
