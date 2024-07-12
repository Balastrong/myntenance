"use client";
import { Task } from "@/lib/supabase/types";
import { createContext, useOptimistic, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createTaskAction } from "./actions";
import { TaskRow } from "./TaskRow";

type Props = {
  projectId: string;
  tasks: Task[];
};

type OptimisticTaskActions =
  | {
      type: "add";
      payload: { task: Task };
    }
  | {
      type: "remove";
      payload: { taskId: number };
    }
  | {
      type: "update";
      payload: {
        partialTask: Partial<Task> & Required<Pick<Task, "id">>;
      };
    };

export type OptimisticTask = Task & { isPending?: boolean };

export const OptimisticTaskContext = createContext<{
  optimisticTasks: Task[];
  handleOptimisticTasks: (action: OptimisticTaskActions) => void;
} | null>(null);

export default function TasksList({ projectId, tasks }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticTasks, handleOptimisticTasks] = useOptimistic<
    OptimisticTask[],
    OptimisticTaskActions
  >(tasks ?? [], (state, { type, payload }) => {
    switch (type) {
      case "add":
        return [{ ...payload.task, isPending: true }, ...state];
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
            <TaskRow key={task.id} task={task} />
          ))}
        </OptimisticTaskContext.Provider>
      </ul>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const title = formData.get("title") as string;

          const task: Task = {
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
            payload: { task },
          });
          await createTaskAction(task);
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
