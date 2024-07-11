import { Tables } from "@/lib/supabase/types.gen";
import { TaskCompletedCheckbox } from "./TaskCompletedCheckbox";
import { TaskDeleteButton } from "./TaskDeleteButton";
import TaskInput from "./TaskInput";

type Props = {
  task: Tables<"tasks">;
};

export function Task({ task }: Props) {
  return (
    <div className="flex gap-2">
      <TaskCompletedCheckbox taskId={task.id} isCompleted={task.isCompleted} />
      <TaskInput task={task} />
      <TaskDeleteButton taskId={task.id} />
    </div>
  );
}
