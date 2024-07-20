import { getTask } from "@/services/tasks/api";
import TaskDetailComponent from "./Task";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params: { taskId, projectId },
}: {
  params: { taskId: string; projectId: string };
}) {
  const { data: task } = await getTask({ projectId, taskId });

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <Link href={"../"}>
          <Button variant={"ghost"}>&lt;-</Button>
        </Link>
        <h1 className="text-xl font-semibold">{task.title}</h1>
      </div>

      <TaskDetailComponent task={task} />
    </div>
  );
}
