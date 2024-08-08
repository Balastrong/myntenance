"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskInsert } from "@/lib/supabase/types";
import { TaskStatus, TaskStatusValues } from "@/types/schemas";
import { useForm } from "@tanstack/react-form";
import { ReactNode } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  task: TaskInsert;
  onSubmit: (taskInsert: TaskInsert) => void;
  children: ({
    canSubmit,
    isSubmitting,
  }: {
    canSubmit: boolean;
    isSubmitting: boolean;
  }) => ReactNode;
};

export const TaskForm = ({ task, onSubmit, children }: Props) => {
  const form = useForm({
    defaultValues: {
      title: task.title ?? "",
      status: (task.status ?? "") as TaskStatus | "",
    },
    onSubmit: ({ value }) =>
      onSubmit({
        title: value.title,
        projectId: task.projectId,
        status: value.status !== "" ? value.status : undefined,
      }),
  });

  const formErrors = form.useStore((formState) => formState.errors);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {formErrors.map((error) => (
        <p key={error as string}>{error}</p>
      ))}

      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            value.length < 1 ? "Title is required" : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <Label htmlFor={"task-title"}>Title</Label>
              <Input
                id={"task-title"}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="status"
        validators={{
          onChange: ({ value }) =>
            value === "" ? "Status is required" : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <Label htmlFor={"task-status"}>Status</Label>
              <Select
                defaultValue={field.state.value}
                onValueChange={(status: TaskStatus) =>
                  field.handleChange(status)
                }
              >
                <SelectTrigger>
                  <SelectValue id="task-status" />
                </SelectTrigger>
                <SelectContent>
                  {TaskStatusValues.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => children({ canSubmit, isSubmitting })}
      </form.Subscribe>
    </form>
  );
};
