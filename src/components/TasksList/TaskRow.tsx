import { X } from "lucide-react";
import { Button } from "../ui/button";
import TaskInput from "./TaskInput";
import { OptimisticTask } from "./TasksList";
import { Checkbox } from "../ui/checkbox";

type Props = {
  task: OptimisticTask;
  onDelete: () => void;
  onCompletedChange: () => void;
};

export function TaskRow({ task, onDelete, onCompletedChange }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        checked={task.isCompleted}
        onCheckedChange={onCompletedChange}
      />
      <TaskInput task={task} />
      <Button
        disabled={task.isPending}
        variant={"destructive"}
        size={"icon"}
        type="button"
        onClick={onDelete}
      >
        <X />
      </Button>
    </div>
  );
}
