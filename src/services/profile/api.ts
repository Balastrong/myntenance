"use server"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserId } from "@/lib/supabase/utils"

export async function getOwnProfile() {
  const supabase = createClient()
  const userId = await getCurrentUserId(supabase)

  return createClient()
    .from("user_profiles")
    .select("*")
    .eq("user", userId!)
    .single()
}
