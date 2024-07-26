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
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      disabled={task.isPending}
    />
  );
}
