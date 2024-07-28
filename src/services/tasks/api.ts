"use server";

import { createClient } from "@/lib/supabase/client";
import { TaskInsert } from "@/lib/supabase/types";
import { revalidateTag, unstable_cache } from "next/cache";

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
  },
);

export const getTask = unstable_cache(
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    return createClient()
      .from("tasks")
      .select("*")
      .eq("projectId", projectId)
      .eq("id", taskId)
      .single();
  },
  undefined,
  {
    tags: ["tasks"],
  },
);

export async function createTask(task: TaskInsert) {
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

export async function assignTaskIssue({
  id,
  issueNumber,
}: {
  id: number;
  issueNumber: string;
}) {
  revalidateTag("tasks");
  return createClient().from("tasks").update({ issueNumber }).eq("id", id);
}

export async function deleteTask(id: number) {
  return createClient().from("tasks").delete().eq("id", id);
}
