import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/lib/supabase/types.gen";

export async function getOwnTasks(filters?: { projectId?: string }) {
  let query = createClient()
    .from("tasks")
    .select("*")
    .order("id", { ascending: false });

  if (filters?.projectId) {
    query = query.eq("projectId", filters.projectId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function createTask(
  task: Pick<Tables<"tasks">, "title" | "projectId">
) {
  return createClient().from("tasks").insert(task);
}

export async function setCompleted({
  id,
  isCompleted,
}: {
  id: number;
  isCompleted: boolean;
}) {
  return createClient().from("tasks").update({ isCompleted }).eq("id", id);
}

export async function updateTask({ id, title }: { id: number; title: string }) {
  return createClient().from("tasks").update({ title }).eq("id", id);
}

export async function deleteTask(id: number) {
  return createClient().from("tasks").delete().eq("id", id);
}

export const tasksKeys = {
  all: ["tasks"] as const,
  lists: () => [...tasksKeys.all, "list"] as const,
  list: (projectId: string) => [...tasksKeys.lists(), { projectId }] as const,
};
