"use client";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("Logged out");
          router.push("/login");
        },
        onError: (ctx) => {
          console.error("Error logging out:", ctx.error);
        },
      },
    });
  }

  return (
    <Button variant="default" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
