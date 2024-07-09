import { Tables } from "@/lib/supabase/types.gen";
import { deleteTask, setCompleted, tasksKeys } from "@/services/tasks/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import TaskInput from "./TaskInput";
import { revalidatePath } from "next/cache";

type Props = {
  task: Tables<"tasks">;
};

export function Task({ task }: Props) {
  const queryClient = useQueryClient();
  const { mutate: setCompletedMutation } = useMutation({
    mutationFn: setCompleted,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({
        queryKey: tasksKeys.list(task.projectId),
      });

      const previousTasks = queryClient.getQueryData(
        tasksKeys.list(task.projectId)
      ) as Tables<"tasks">[];

      queryClient.setQueryData(
        tasksKeys.list(task.projectId),
        (previousTasks ?? []).map((t) => {
          if (t.id === newTask.id) {
            return { ...t, isCompleted: newTask.isCompleted };
          }
          return t;
        })
      );

      return { previousTasks, newTask };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(
        tasksKeys.list(task.projectId),
        context?.previousTasks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: tasksKeys.list(task.projectId),
      });
    },
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onMutate: async (deletedTaskId) => {
      await queryClient.cancelQueries({
        queryKey: tasksKeys.list(task.projectId),
      });

      const previousTasks = queryClient.getQueryData(
        tasksKeys.list(task.projectId)
      ) as Tables<"tasks">[];

      queryClient.setQueryData(
        tasksKeys.list(task.projectId),
        (previousTasks ?? []).filter((t) => t.id !== deletedTaskId)
      );

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(
        tasksKeys.list(task.projectId),
        context?.previousTasks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: tasksKeys.list(task.projectId),
      });
    },
  });

  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() =>
          setCompletedMutation({ id: task.id, isCompleted: !task.isCompleted })
        }
      />
      <TaskInput task={task} />
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={() => deleteTaskMutation(task.id)}
      >
        <X />
      </Button>
    </div>
  );
}
