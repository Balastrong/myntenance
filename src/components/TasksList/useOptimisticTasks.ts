import { Task } from "@/lib/supabase/types";
import { OptimisticTask } from "./TasksList";
import { useOptimistic } from "react";
import {
  createTaskAction,
  setCompletedAction,
  deleteTaskAction,
} from "./actions";

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

export const useOptimisticTasks = (tasks: Task[], projectId: string) => {
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
            : task,
        );
    }
  });

  const onAddTask = async (formData: FormData) => {
    const title = formData.get("title") as string;

    const task: Task = {
      projectId,
      title,
      createdAt: new Date().toISOString(),
      id: optimisticTasks.length + 999,
      isCompleted: false,
      updatedAt: new Date().toISOString(),
    };

    handleOptimisticTasks({
      type: "add",
      payload: { task },
    });
    await createTaskAction(task);
  };

  const onCompletedChange = async (taskId: number, isCompleted: boolean) => {
    handleOptimisticTasks({
      type: "update",
      payload: { partialTask: { id: taskId, isCompleted } },
    });
    await setCompletedAction({ taskId, isCompleted });
  };

  const onDelete = async (taskId: number) => {
    handleOptimisticTasks({
      type: "remove",
      payload: { taskId },
    });
    await deleteTaskAction(taskId);
  };

  return { optimisticTasks, onAddTask, onCompletedChange, onDelete };
};
