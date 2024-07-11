"use client";
import { Tables } from "@/lib/supabase/types.gen";
import { useOptimistic, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createTaskAction } from "./actions";
import { Task } from "./Task";

type Props = {
  projectId: string;
  tasks: Tables<"tasks">[];
};

export default function TasksList({ projectId, tasks }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTasks, addOptimisticTasks] = useOptimistic<
    Tables<"tasks">[],
    Tables<"tasks">
    // TODO: Improve types and add boolean to indicate pending state
  >(tasks ?? [], (state, newTask) => [newTask, ...state]);

  return (
    <div className="max-w-[600px]">
      <ul className="flex flex-col gap-2 mb-4">
        {optimisticTasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const title = formData.get("title") as string;

          const newPartialTask: Tables<"tasks"> = {
            projectId,
            title,
            createdAt: new Date().toISOString(),
            id: optimisticTasks.length + 999,
            isCompleted: false,
            updatedAt: new Date().toISOString(),
          };

          formRef.current?.reset();

          addOptimisticTasks(newPartialTask);
          await createTaskAction(newPartialTask);
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
