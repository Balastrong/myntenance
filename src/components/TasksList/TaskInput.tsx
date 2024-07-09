import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Tables } from "@/lib/supabase/types.gen";
import { tasksKeys, updateTask } from "@/services/tasks/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type Props = {
  task: Tables<"tasks">;
};

export default function TaskInput({ task }: Props) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(task.title);
  const { debouncedValue: debouncedTitle } = useDebouncedValue(title, 500);

  const { mutate } = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tasksKeys.list(task.projectId),
      });
    },
  });

  useEffect(() => {
    if (debouncedTitle !== task.title) {
      mutate({ id: task.id, title: debouncedTitle });
    }
  }, [debouncedTitle, mutate, task.id, task.title]);

  return <Input value={title} onChange={(e) => setTitle(e.target.value)} />;
}
