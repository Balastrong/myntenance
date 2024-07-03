import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <main className="">
      Home
      {JSON.stringify(user)}
    </main>
  );
}
