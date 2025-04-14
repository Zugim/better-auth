import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import LogoutBtn from "./logout-btn";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 w-screen h-12 z-50 px-2 bg-slate-100">
      <Link href="/">Better Auth</Link>
      {session ? (
        <Link href="/sign-out">
          <LogoutBtn />
        </Link>
      ) : (
        <div className="space-x-2">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
