"use server"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserId } from "@/lib/supabase/utils"

export async function getOwnSettings() {
  const supabase = createClient()
  const userId = await getCurrentUserId(supabase)

  return createClient()
    .from("user_settings")
    .select("*")
    .eq("user", userId!)
    .single()
}
