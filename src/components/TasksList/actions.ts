"use server";

import { deleteTask, setCompleted, updateTask } from "@/services/tasks/api";
import { revalidateTag } from "next/cache";

export async function setCompletedAction({
  taskId,
  isCompleted,
}: {
  taskId: number;
  isCompleted: boolean;
}) {
  await setCompleted({ id: taskId, isCompleted });
  revalidateTag("tasks");
}

export async function deleteTaskAction(id: number) {
  await deleteTask(id);
  revalidateTag("tasks");
}

export async function updateTaskAction(
  props: Parameters<typeof updateTask>[0]
) {
  await updateTask(props);
  revalidateTag("tasks");
}
