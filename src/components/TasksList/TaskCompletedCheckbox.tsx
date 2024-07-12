"use client";

import { useContext } from "react";
import { setCompletedAction } from "./actions";
import { OptimisticTaskContext } from "./TasksList";

export function TaskCompletedCheckbox({
  taskId,
  isCompleted,
}: {
  taskId: number;
  isCompleted: boolean;
}) {
  const optimistic = useContext(OptimisticTaskContext);

  return (
    <input
      type="checkbox"
      checked={isCompleted}
      className="cursor-pointer"
      onChange={async () => {
        optimistic?.handleOptimisticTasks({
          type: "update",
          payload: {
            partialTask: {
              id: taskId,
              isCompleted: !isCompleted,
            },
          },
        });

        await setCompletedAction({
          taskId,
          isCompleted: !isCompleted,
        });
      }}
    />
  );
}
