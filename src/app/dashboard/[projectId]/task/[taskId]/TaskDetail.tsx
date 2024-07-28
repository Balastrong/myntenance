"use server";

import { TaskIssueSelector } from "@/components/TaskIssueSelector";
import { Task } from "@/lib/supabase/types";

type Props = {
  task: Task;
  repositoryFullName: string;
};

export default async function TaskDetailComponent({
  task,
  repositoryFullName,
}: Props) {
  return (
    <div>
      <h3>Assign Issue</h3>
      <TaskIssueSelector
        taskId={task.id}
        repositoryFullName={repositoryFullName}
      />
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
}
