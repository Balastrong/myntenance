"use server"

import { GetTasksParams } from "@/components/TasksList/Tasks"
import { createClient } from "@/lib/supabase/server"
import { TaskInsert, TaskUpdate } from "@/lib/supabase/types"
import { revalidateTag } from "next/cache"

export const getOwnTasks = async (filters: {
  projectId: string
  taskParams: GetTasksParams
}) => {
  const { page, pageSize, ...taskFilters } = filters.taskParams

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  let query = createClient()
    .from("tasks")
    .select("*", { count: "exact" })
    .range(from, to)

  query = query.eq("projectId", filters.projectId)

  if (Object.values(taskFilters).length === 0) return query

  if (taskFilters.sort) {
    const [field, direction] = taskFilters.sort.split(".")
    query = query.order(field, { ascending: direction === "asc" })
  }

  if (taskFilters.status) {
    const statusArray = taskFilters.status.split(".")
    query = query.in("status", statusArray)
  }

  if (taskFilters.title) {
    query = query.ilike("title", `%${taskFilters.title}%`)
  }

  return query
}

export const getTask = async ({
  projectId,
  taskId,
}: {
  projectId: string
  taskId: string
}) => {
  return createClient()
    .from("tasks")
    .select("*")
    .eq("projectId", projectId)
    .eq("id", taskId)
    .single()
}

export async function createTask(task: TaskInsert) {
  const { id, ...rest } = task
  revalidateTag("tasks")
  return createClient().from("tasks").insert(rest)
}

export async function setCompleted({
  id,
  isCompleted,
}: {
  id: number
  isCompleted: boolean
}) {
  return createClient().from("tasks").update({ isCompleted }).eq("id", id)
}

export async function updateTask({
  id,
  taskUpdate,
}: {
  id: number
  taskUpdate: TaskUpdate
}) {
  revalidateTag("tasks")

  return createClient().from("tasks").update(taskUpdate).eq("id", id)
}

export async function assignTaskIssue({
  id,
  issueNumber,
}: {
  id: number
  issueNumber: number | null
}) {
  revalidateTag("tasks")
  return createClient().from("tasks").update({ issueNumber }).eq("id", id)
}

export async function assignTaskPullRequest({
  id,
  prNumber,
}: {
  id: number
  prNumber: number | null
}) {
  revalidateTag("tasks")
  return createClient().from("tasks").update({ prNumber }).eq("id", id)
}

export async function updateTaskNotes(id: number, notes: string) {
  revalidateTag("tasks")
  return await createClient().from("tasks").update({ notes }).eq("id", id)
}

export async function deleteTask(id: number) {
  return createClient().from("tasks").delete().eq("id", id)
}

export async function deleteTasks(ids: number[]) {
  revalidateTag("tasks")
  return createClient().from("tasks").delete().in("id", ids)
}
