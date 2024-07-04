import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <main>
      <h2 className="text-xl font-medium">Home</h2>
      {user ? (
        <>
          <p>Welcome, {user.user_metadata.full_name}!</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Go to dashboard
          </Link>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </main>
  );
}
