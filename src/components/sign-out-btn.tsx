"use client";

import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOutBtn() {
  return (
    <Button variant="default" onClick={async () => await authClient.signOut()}>
      Sign Out
    </Button>
  );
}
