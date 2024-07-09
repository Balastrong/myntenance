"use client";

import { createTask, getOwnTasks, tasksKeys } from "@/services/tasks/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Task } from "./Task";
import { Button } from "../ui/button";
import { Tables } from "@/lib/supabase/types.gen";

type Props = {
  projectId: string;
};

export default function TasksList({ projectId }: Props) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: tasksKeys.list(projectId),
    queryFn: () => getOwnTasks({ projectId }),
  });

  const { mutate } = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: tasksKeys.list(projectId) });

      const previousTasks = queryClient.getQueryData(tasksKeys.list(projectId));

      queryClient.setQueryData(
        tasksKeys.list(projectId),
        (old: Tables<"tasks">[]) => [newTask, ...old]
      );

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(
        tasksKeys.list(projectId),
        context?.previousTasks
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.list(projectId) });
    },
  });

  return (
    <div className="max-w-[600px]">
      <ul className="flex flex-col gap-2 mb-4">
        {data?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const title = formData.get("title") as string;

          mutate({ title, projectId });
          e.currentTarget.reset();
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
