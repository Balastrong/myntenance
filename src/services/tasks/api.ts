import { createClient } from "@/lib/supabase/client";
import { Database, Tables } from "@/lib/supabase/types.gen";
import { unstable_cache } from "next/cache";

export const getOwnTasks = unstable_cache(
  async (filters?: { projectId?: string }) => {
    let query = createClient()
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });

    if (filters?.projectId) {
      query = query.eq("projectId", filters.projectId);
    }

    return await query;
  },
  undefined,
  {
    tags: ["tasks"],
  }
);

export async function createTask(
  task: Database["public"]["Tables"]["tasks"]["Insert"]
) {
  const { id, ...rest } = task;
  return createClient().from("tasks").insert(rest);
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
