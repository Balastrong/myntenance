import { SupabaseClient } from "@supabase/supabase-js"
import { Database, Tables } from "./types.gen"

export type DatabaseClient = SupabaseClient<Database>

export type Task = Tables<"tasks">
export type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"]
export type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"]
