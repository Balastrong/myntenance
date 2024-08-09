"use server";

import { Database } from "@/lib/supabase/types.gen";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getSiteMeta = unstable_cache(
  async (supabase: SupabaseClient<Database>) => {
    const { data } = await supabase.auth.admin.listUsers();
    const { count: projects } = await supabase
      .from("projects")
      .select("*", { count: "estimated" });

    return {
      users: data.users.length,
      projects: projects,
    };
  },
  undefined,
  { revalidate: 3600 },
);
