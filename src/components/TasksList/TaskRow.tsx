import { TaskCompletedCheckbox } from "./TaskCompletedCheckbox";
import { TaskDeleteButton } from "./TaskDeleteButton";
import TaskInput from "./TaskInput";
import { OptimisticTask } from "./TasksList";

type Props = {
  task: OptimisticTask;
};

export function TaskRow({ task }: Props) {
  return (
    <form>
      <div className="flex gap-2">
        <TaskCompletedCheckbox
          taskId={task.id}
          isCompleted={task.isCompleted}
        />
        <TaskInput task={task} />
        <TaskDeleteButton taskId={task.id} isPending={task.isPending} />
      </div>
    </form>
  );
}
