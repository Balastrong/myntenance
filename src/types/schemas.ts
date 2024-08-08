import { z } from "zod";

export const TaskStatusSchema = z.union([
  z.literal("todo"),
  z.literal("doing"),
  z.literal("done"),
  z.literal("rejected"),
]);

export const TaskStatusValues = TaskStatusSchema.options.map(
  (option) => option.value,
);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;
