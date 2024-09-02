"use server"

import { DatabaseClient } from "@/lib/supabase/types"
import { unstable_cache } from "next/cache"

export const getSiteMeta = unstable_cache(
  async (supabase: DatabaseClient) => {
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers()

    const { count: projects } = await supabase
      .from("projects")
      .select("*", { count: "exact" })

    return {
      usersCount: users.length,
      projectsCount: projects ?? 0,
    }
  },
  undefined,
  { revalidate: 3600 },
)
