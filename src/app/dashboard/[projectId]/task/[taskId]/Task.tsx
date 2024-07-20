import { Task } from "@/lib/supabase/types";

type Props = {
  task: Task;
};

export default async function TaskDetailComponent({ task }: Props) {
  return <pre>{JSON.stringify(task, null, 2)}</pre>;
}
