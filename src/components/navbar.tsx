import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 w-screen h-12 z-50 px-2 bg-slate-100">
      <Link href="/">Better Auth</Link>
      <div className="space-x-2">
        <Link href="/login">
          <Button variant="default">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="default">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
}
