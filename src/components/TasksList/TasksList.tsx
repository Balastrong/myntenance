"use client";

import { createTask, getOwnTasks, tasksKeys } from "@/services/tasks/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Task } from "./Task";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tasksKeys.lists(),
      });
    },
  });

  return (
    <div>
      <ul className="flex flex-col gap-2 mb-2">
        {data?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <Input
        placeholder="Add a task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            mutate({ title: e.currentTarget.value, projectId });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
