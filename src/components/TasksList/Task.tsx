import { Tables } from "@/lib/supabase/types.gen";
import { deleteTask, setCompleted, tasksKeys } from "@/services/tasks/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import TaskInput from "./TaskInput";

type Props = {
  task: Tables<"tasks">;
};

export function Task({ task }: Props) {
  const queryClient = useQueryClient();
  const { mutate: setCompletedMutation } = useMutation({
    mutationFn: setCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tasksKeys.lists(),
      });
    },
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tasksKeys.lists(),
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
