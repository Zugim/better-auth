"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import LogoutBtn from "./logout-btn";

export default function AuthControls() {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex items-center gap-2">
      {session ? (
        <>
          <p>Hello, {session.user.name}</p>
          <LogoutBtn />
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
        </>
      )}
    </div>
  );
}
