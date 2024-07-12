"use client";
import { X } from "lucide-react";
import { useContext } from "react";
import { Button } from "../ui/button";
import { deleteTaskAction } from "./actions";
import { OptimisticTaskContext } from "./TasksList";

export function TaskDeleteButton({
  taskId,
  isPending,
}: {
  taskId: number;
  isPending?: boolean;
}) {
  const optimistic = useContext(OptimisticTaskContext);

  return (
    <Button
      disabled={isPending}
      variant={"destructive"}
      size={"icon"}
      formAction={async () => {
        optimistic?.handleOptimisticTasks({
          type: "remove",
          payload: { taskId },
        });
        await deleteTaskAction(taskId);
      }}
    >
      <X />
    </Button>
  );
}
