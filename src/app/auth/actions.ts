"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";
import {
  GITHUB_REFRESH_TOKEN_COOKIE,
  GITHUB_TOKEN_COOKIE,
} from "@/lib/supabase/cookies";

export async function login() {
  "use server";
  const origin = headers().get("origin");
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(data.url);
}

export async function logout() {
  "use server";
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  const cookieStore = cookies();
  cookieStore.delete(GITHUB_TOKEN_COOKIE);
  cookieStore.delete(GITHUB_REFRESH_TOKEN_COOKIE);

  revalidatePath("/", "layout");
  redirect("/");
}
