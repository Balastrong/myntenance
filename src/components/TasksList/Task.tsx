import { Tables } from "@/lib/supabase/types.gen";

type Props = {
  task: Tables<"tasks">;
};

export function Task({ task }: Props) {
  return (
    <div>
      <h1>{task.title}</h1>
    </div>
  );
}
