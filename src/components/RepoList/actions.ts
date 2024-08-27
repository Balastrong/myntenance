"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function handleDelete(id: string) {
  const { data, error } = await createClient()
    .from("projects")
    .delete()
    .eq("id", id)
    .select()
    .single()

  revalidatePath("/dashboard")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function toggleFavourite(formData: FormData) {
  "use server"

  const id = formData.get("id")!
  const isFavourite = formData.get("isFavorite") === "true"
  await createClient()
    .from("projects")
    .update({ isFavourite: !isFavourite })
    .eq("id", id)

  revalidatePath("/dashboard")
}

export async function updateProjectNotes(id: string, notes: string) {
  "use server"

  await createClient().from("projects").update({ notes }).eq("id", id)
  revalidatePath(`/dashboard/${id}`)
}
