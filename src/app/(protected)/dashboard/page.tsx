import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <h1 className="mt-12">
      Hello, {session?.user.name}. You are logged into the dashboard.
    </h1>
  );
}
