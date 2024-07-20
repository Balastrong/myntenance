import TaskDetailComponent from "@/app/dashboard/[projectId]/task/[taskId]/Task";
import { RouteModal } from "@/components/RouteModal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTask } from "@/services/tasks/api";

export default async function Page({
  params: { taskId, projectId },
}: {
  params: { taskId: string; projectId: string };
}) {
  const { data: task } = await getTask({ projectId, taskId });

  if (!task) {
    return <RouteModal>Task not found</RouteModal>;
  }

  return (
    <RouteModal>
      <DialogHeader>
        <DialogTitle>{task.title}</DialogTitle>
      </DialogHeader>
      <TaskDetailComponent task={task} />
    </RouteModal>
  );
}
