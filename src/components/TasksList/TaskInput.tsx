"use client";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { updateTaskAction } from "./actions";
import { OptimisticTask } from "./useOptimisticTasks";
import { CircleDot, GitPullRequestArrow } from "lucide-react";

type Props = {
  task: OptimisticTask;
};

export default function TaskInput({ task }: Props) {
  const [title, setTitle] = useState(task.title);
  const { debouncedValue: debouncedTitle } = useDebouncedValue(title, 500);

  useEffect(() => {
    if (debouncedTitle !== task.title) {
      updateTaskAction({ id: task.id, title: debouncedTitle });
    }
  }, [debouncedTitle, task.id, task.title]);

  return (
    <div className="relative flex-1">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={task.isPending}
      />
      {(task.issueNumber || task.prNumber) && (
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-2">
          {task.issueNumber && (
            <span className="flex items-center gap-1">
              <CircleDot className="size-4" />
              {task.issueNumber}
            </span>
          )}
          {task.prNumber && (
            <span className="flex items-center gap-1">
              <GitPullRequestArrow className="size-4" />
              {task.prNumber}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
