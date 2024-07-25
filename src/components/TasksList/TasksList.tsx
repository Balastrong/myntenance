"use client";

import { Task } from "@/lib/supabase/types";
import { startTransition, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskRow } from "./TaskRow";
import { useOptimisticTasks } from "./useOptimisticTasks";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type OptimisticTask = Task & { isPending?: boolean };

type Props = {
  projectId: string;
  tasks: Task[];
};

export default function TasksList({ projectId, tasks }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { optimisticTasks, onAddTask, onCompletedChange, onDelete } =
    useOptimisticTasks(tasks, projectId);
  const [showCompleted, setShowCompleted] = useState(true);

  const openTasks = optimisticTasks?.filter((t) => !t.isCompleted) ?? [];
  const completedTasksCount = optimisticTasks.length - openTasks.length;

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {(showCompleted ? optimisticTasks : openTasks)?.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onCompletedChange={() =>
              startTransition(() =>
                onCompletedChange(task.id, !task.isCompleted),
              )
            }
            onDelete={() => startTransition(() => onDelete(task.id))}
          />
        ))}
      </ul>
      {completedTasksCount > 0 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hide-completed"
            checked={showCompleted}
            onCheckedChange={(e) => setShowCompleted(e === true)}
          />
          <Label htmlFor="hide-completed" className="cursor-pointer">
            Show completed ({completedTasksCount})
          </Label>
        </div>
      )}
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formRef.current?.reset();
          onAddTask(formData);
        }}
        className="flex gap-2"
      >
        <Input name="title" placeholder="Add a task" />
        <Button type="submit" className="w-40">
          Add
        </Button>
      </form>
    </div>
  );
}
