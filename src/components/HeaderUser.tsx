"use client";

import { login, logout } from "@/app/auth/actions";
import { type User } from "@supabase/supabase-js";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { SignInButton } from "./SignInButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  user: User | null;
};

export default function HeaderUser({ user }: Props) {
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <a href="https://github.com/Balastrong/myntenance" target="_blank">
              <DropdownMenuItem>
                <Image
                  src={
                    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg"
                  }
                  alt={"Contribute on GitHub"}
                  width={60}
                  height={60}
                  className="mr-2 h-4 w-4 fill-current"
                />
                GitHub
              </DropdownMenuItem>
            </a>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <form action={login}>
          <SignInButton />
        </form>
      )}
    </div>
  );
}
