import { X } from "lucide-react";
import { Button } from "../ui/button";
import TaskInput from "./TaskInput";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { OptimisticTask } from "./useOptimisticTasks";

type Props = {
  task: OptimisticTask;
  onDelete: () => void;
  onCompletedChange: () => void;
};

export function TaskRow({ task, onDelete, onCompletedChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={task.isCompleted}
        onCheckedChange={onCompletedChange}
      />
      <TaskInput task={task} />
      <Button asChild>
        <Link href={`/dashboard/${task.projectId}/task/${task.id}`}>
          Details
        </Link>
      </Button>
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
