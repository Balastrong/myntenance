"use server";

import { IssueSelector } from "@/components/IssueSelector";
import { Task } from "@/lib/supabase/types";

type Props = {
  task: Task;
  repositoryFullName: string;
};

export default async function TaskDetailComponent({
  task,
  repositoryFullName,
}: Props) {
  const issueBaseQuery = `repo:${repositoryFullName}`;
  return (
    <div>
      <h3>Assign Issue</h3>
      <IssueSelector baseQuery={issueBaseQuery} />
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
}
