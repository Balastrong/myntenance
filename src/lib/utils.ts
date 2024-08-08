import { TaskStatus } from "@/types/schemas";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}

export function getStatusIcon(status: TaskStatus) {
  const statusIcons: Record<TaskStatus, React.ComponentType> = {
    todo: QuestionMarkCircledIcon,
    doing: StopwatchIcon,
    done: CheckCircledIcon,
    rejected: CrossCircledIcon,
  };

  return statusIcons[status] || CircleIcon;
}
