"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task, TaskUpdate } from "@/lib/supabase/types";
import { updateTask } from "@/services/tasks/api";
import * as React from "react";
import { toast } from "sonner";
import { TaskForm } from "./TaskForm";
import { Button } from "../ui/button";

interface UpdateTaskSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  task: Task;
}

export function UpdateTaskSheet({ task, ...props }: UpdateTaskSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  const onSubmit = (taskUpdate: TaskUpdate) => {
    startUpdateTransition(async () => {
      const { error } = await updateTask({
        id: task.id,
        taskUpdate,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      props.onOpenChange?.(false);
      toast.success("Task updated");
    });
  };

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
        <TaskForm task={task} onSubmit={onSubmit}>
          {({ canSubmit, isSubmitting }) => (
            <SheetFooter className="mt-4">
              <SheetClose asChild>
                <Button type="button" variant={"outline"}>
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={!canSubmit || isUpdatePending}>
                {isSubmitting ? "..." : "Submit"}
              </Button>
            </SheetFooter>
          )}
        </TaskForm>
      </SheetContent>
    </Sheet>
  );
}
