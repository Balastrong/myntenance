import { getOwnTasks } from "@/services/tasks/api";
import TasksList from "./TasksList";

export default async function Tasks({ projectId }: { projectId: string }) {
  const { data: tasks } = await getOwnTasks({ projectId });

  return <TasksList projectId={projectId} tasks={tasks ?? []} />;
}
