"use client";
import { Tables } from "@/lib/supabase/types.gen";
import { createContext, useOptimistic, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createTaskAction } from "./actions";
import { Task } from "./Task";

type Props = {
  projectId: string;
  tasks: Tables<"tasks">[];
};

type OptimisticTaskActions =
  | {
      type: "add";
      payload: { task: Tables<"tasks"> };
    }
  | {
      type: "remove";
      payload: { taskId: number };
    }
  | {
      type: "update";
      payload: {
        partialTask: Partial<Tables<"tasks">> &
          Required<Pick<Tables<"tasks">, "id">>;
      };
    };

export const OptimisticTaskContext = createContext<{
  optimisticTasks: Tables<"tasks">[];
  handleOptimisticTasks: (action: OptimisticTaskActions) => void;
} | null>(null);

export default function TasksList({ projectId, tasks }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  // TODO: Improve types and add boolean to indicate pending state
  const [optimisticTasks, handleOptimisticTasks] = useOptimistic<
    Tables<"tasks">[],
    OptimisticTaskActions
  >(tasks ?? [], (state, { type, payload }) => {
    switch (type) {
      case "add":
        return [payload.task, ...state];
      case "remove":
        return state.filter((task) => task.id !== payload.taskId);
      case "update":
        return state.map((task) =>
          task.id === payload.partialTask.id
            ? { ...task, ...payload.partialTask }
            : task
        );
    }
  });

  return (
    <div className="max-w-[600px]">
      <ul className="flex flex-col gap-2 mb-4">
        <OptimisticTaskContext.Provider
          value={{
            optimisticTasks,
            handleOptimisticTasks,
          }}
        >
          {optimisticTasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </OptimisticTaskContext.Provider>
      </ul>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const title = formData.get("title") as string;

          const newTask: Tables<"tasks"> = {
            projectId,
            title,
            createdAt: new Date().toISOString(),
            id: optimisticTasks.length + 999,
            isCompleted: false,
            updatedAt: new Date().toISOString(),
          };

          formRef.current?.reset();

          handleOptimisticTasks({
            type: "add",
            payload: { task: newTask },
          });
          await createTaskAction(newTask);
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
