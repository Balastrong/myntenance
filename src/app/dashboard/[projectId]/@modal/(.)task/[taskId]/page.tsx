import { RouteModal } from "@/components/RouteModal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTask } from "@/services/tasks/api";
import TaskDetailComponent from "../../../task/[taskId]/TaskDetail";
import { getProject } from "@/services/project/api";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
  params: { taskId, projectId },
}: {
  params: { taskId: string; projectId: string };
}) {
  const { data: task } = await getTask({ projectId, taskId });

  if (!task) {
    return <RouteModal>Task not found</RouteModal>;
  }

  const project = await getProject(projectId, createClient());

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <RouteModal>
      <DialogHeader>
        <DialogTitle>{task.title}</DialogTitle>
      </DialogHeader>
      <TaskDetailComponent
        task={task}
        repositoryFullName={`${project?.ownerLogin}/${project?.name}`}
      />
    </RouteModal>
  );
}
