import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksList from "./TasksList";

export default async function Tasks({ projectId }: { projectId: string }) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksList projectId={projectId} />
    </HydrationBoundary>
  );
}
