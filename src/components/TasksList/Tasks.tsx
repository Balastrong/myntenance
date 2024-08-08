import { getOwnTasks } from "@/services/tasks/api";
import { TasksTable } from "../TasksTable/TasksTable";
import { SearchParams } from "@/types";
import { z } from "zod";

export const getTasksParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
});

export type GetTasksParams = z.infer<typeof getTasksParamsSchema>;

export default async function Tasks({
  projectId,
  searchParams,
}: {
  projectId: string;
  searchParams: SearchParams;
}) {
  const taskParams = getTasksParamsSchema.parse(searchParams);

  const tasksPromise = getOwnTasks({ projectId, taskParams });

  return <TasksTable tasksPromise={tasksPromise} projectId={projectId} />;
}
