import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import HeaderUser from "./HeaderUser";
import { ModeToggle } from "./ModeToggle";

export default async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <header className="m-auto flex w-full max-w-[1200px] items-center justify-between gap-2 p-4">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Myntenance</h1>
      </Link>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <HeaderUser user={user} />
      </div>
    </header>
  );
}
