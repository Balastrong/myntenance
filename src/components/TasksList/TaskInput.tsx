"use client";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { updateTaskAction } from "./actions";
import { OptimisticTask } from "./useOptimisticTasks";

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
      {task.issueNumber && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 transform">
          (#{task.issueNumber})
        </span>
      )}
    </div>
  );
}
