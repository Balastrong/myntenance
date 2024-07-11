import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksList from "./TasksList";
import { getOwnTasks } from "@/services/tasks/api";

export default async function Tasks({ projectId }: { projectId: string }) {
  const queryClient = new QueryClient();

  const { data: tasks } = await getOwnTasks({ projectId });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksList projectId={projectId} tasks={tasks ?? []} />
    </HydrationBoundary>
  );
}
