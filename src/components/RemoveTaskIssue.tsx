"use client";

import { assignTaskIssue } from "@/services/tasks/api";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function RemoveTaskIssue({ taskId }: { taskId: number }) {
  return (
    <form
      action={() => {
        assignTaskIssue({ id: taskId, issueNumber: null });
      }}
    >
      <Button size={"sm"} variant={"destructive"}>
        <X />
      </Button>
    </form>
  );
}
