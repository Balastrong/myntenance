"use client";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { deleteTaskAction } from "./actions";

export function TaskDeleteButton({ taskId }: { taskId: number }) {
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      onClick={() => deleteTaskAction(taskId)}
    >
      <X />
    </Button>
  );
}
