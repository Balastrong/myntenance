"use client";

import { Task } from "@/lib/supabase/types";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskRow } from "./TaskRow";
import { useOptimisticTasks } from "./useOptimisticTasks";

export type OptimisticTask = Task & { isPending?: boolean };

type Props = {
  projectId: string;
  tasks: Task[];
};

export default function TasksList({ projectId, tasks }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const { optimisticTasks, onAddTask, onCompletedChange, onDelete } =
    useOptimisticTasks(tasks, projectId);

  return (
    <div className="max-w-[600px]">
      <ul className="flex flex-col gap-2 mb-4">
        {optimisticTasks?.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onCompletedChange={() =>
              onCompletedChange(task.id, !task.isCompleted)
            }
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </ul>
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
