import Link from "next/link";
import AuthControls from "./auth-controls";

export default async function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 w-screen h-12 z-50 px-2 bg-slate-100">
      <Link href="/">Better Auth</Link>
      <AuthControls />
    </nav>
  );
}
