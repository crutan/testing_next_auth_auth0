import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("auth0");
    } else if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  return <div />;
}
