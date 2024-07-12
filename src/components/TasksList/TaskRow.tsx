import { X } from "lucide-react";
import { Button } from "../ui/button";
import TaskInput from "./TaskInput";
import { OptimisticTask } from "./TasksList";

type Props = {
  task: OptimisticTask;
  onDelete: () => void;
  onCompletedChange: () => void;
};

export function TaskRow({ task, onDelete, onCompletedChange }: Props) {
  return (
    <form className="flex gap-2">
      <input
        type="checkbox"
        checked={task.isCompleted}
        className="cursor-pointer"
        onChange={onCompletedChange}
      />
      <TaskInput task={task} />
      <Button
        disabled={task.isPending}
        variant={"destructive"}
        size={"icon"}
        formAction={onDelete}
      >
        <X />
      </Button>
    </form>
  );
}
