"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/serverAdmin"
import { DatabaseClient } from "@/lib/supabase/types"
import { revalidatePath } from "next/cache"

export const getOwnProjects = async () => {
  const { data } = await createClient().auth.getUser()

  const userId = data?.user?.id

  if (!userId) {
    return { data: [], error: new Error("User not logged in!") }
  }

  return await createClient()
    .from("projects")
    .select("*, tasks (*)")
    .eq("user", userId)
}

export const getProject = async (projectId: string, client: DatabaseClient) => {
  const { data: project } = await client
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single()

  return project
}

export async function handleDelete(id: string) {
  const result = await createClient()
    .from("projects")
    .delete()
    .eq("id", id)
    .select()
    .single()
    .throwOnError()

  revalidatePath("/dashboard")
  return result
}

export async function togglePublicProfileVisibility(
  id: string,
  showInPublicProfile: boolean,
) {
  await createClient()
    .from("projects")
    .update({ showInPublicProfile })
    .eq("id", id)

  revalidatePath("/dashboard")
}

export async function toggleFavourite(formData: FormData) {
  const id = formData.get("id")!
  const isFavourite = formData.get("isFavorite") === "true"
  await createClient()
    .from("projects")
    .update({ isFavourite: !isFavourite })
    .eq("id", id)

  revalidatePath("/dashboard")
}

export async function updateProjectNotes(id: string, notes: string) {
  await createClient().from("projects").update({ notes }).eq("id", id)
  revalidatePath(`/dashboard/${id}`)
}

export async function getUserPublicProjects(userId: string) {
  return await createAdminClient()
    .from("projects")
    .select("*")
    .eq("user", userId)
    .eq("showInPublicProfile", true)
}
