import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import HeaderUser from "./HeaderUser";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

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
        <Button variant={"ghost"} size={"icon-sm"} asChild>
          <a
            href="https://github.com/Balastrong/myntenance"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubLogoIcon />
          </a>
        </Button>
        <Button variant={"ghost"} size={"icon-sm"} asChild>
          <a
            href="https://discord.gg/8sbrxHVBBT"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordLogoIcon />
          </a>
        </Button>
        <ThemeToggle />
        <div className="ml-2">
          <HeaderUser user={user} />
        </div>
      </div>
    </header>
  );
}
