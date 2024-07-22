import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import HeaderUser from "./HeaderUser";
import { ModeToggle } from "./ModeToggle";

export default async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <header className="flex gap-2 items-center justify-between max-w-[1200px] m-auto w-full p-4">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Myntenance</h1>
      </Link>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <HeaderUser user={user} />
      </div>
    </header>
  );
}
