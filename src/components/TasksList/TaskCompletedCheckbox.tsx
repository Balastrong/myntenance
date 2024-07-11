"use client";

import { setCompletedAction } from "./actions";

export function TaskCompletedCheckbox({
  taskId,
  isCompleted,
}: {
  taskId: number;
  isCompleted: boolean;
}) {
  return (
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={() => {
        setCompletedAction({
          taskId,
          isCompleted: !isCompleted,
        });
      }}
    />
  );
}
