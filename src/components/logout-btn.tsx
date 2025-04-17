"use client";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

//icons
import { LogOut } from "lucide-react";

export default function LogoutBtn() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          console.error("Error logging out:", ctx.error);
        },
      },
    });
  }

  return (
    <Button variant="default" onClick={handleSignOut}>
      <LogOut /> Logout
    </Button>
  );
}
