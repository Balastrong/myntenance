import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/lib/supabase/types.gen";

export async function getOwnTasks() {
  const { data, error } = await createClient().from("tasks").select("*");

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

export const tasksKeys = {
  all: ["tasks"] as const,
  lists: () => [...tasksKeys.all, "list"] as const,
};
