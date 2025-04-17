"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import LogoutBtn from "./logout-btn";

//icons
import { LoaderCircle, LogIn } from "lucide-react";

export default function AuthControls() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <>
          Loading <LoaderCircle className="animate-spin" />
        </>
      ) : session ? (
        <>
          <Link href="/dashboard">
            <Button variant="default">Dashboard</Button>
          </Link>
          <>
            <LogoutBtn />
          </>
        </>
      ) : (
        <>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
          <Link href="/login">
            <Button variant="default">
              <LogIn /> Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
