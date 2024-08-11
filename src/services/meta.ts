"use server";

import { DatabaseClient } from "@/lib/supabase/types";
import { unstable_cache } from "next/cache";

export const getSiteMeta = unstable_cache(
  async (supabase: DatabaseClient) => {
    const { data } = await supabase.auth.admin.listUsers();
    const { count: projects } = await supabase
      .from("projects")
      .select("*", { count: "exact" });

    return {
      users: data.users.length,
      projects: projects,
    };
  },
  undefined,
  { revalidate: 3600 },
);
