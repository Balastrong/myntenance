"use server";

import { RemoveTaskIssue } from "@/components/RemoveTaskIssue";
import { TaskIssueSelector } from "@/components/TaskIssueSelector";
import { Button } from "@/components/ui/button";
import { getOctokit } from "@/lib/github";
import { Task } from "@/lib/supabase/types";

type Props = {
  task: Task;
  repositoryFullName: string;
};

export default async function TaskDetailComponent({
  task,
  repositoryFullName,
}: Props) {
  let issue = null;
  if (task.issueNumber) {
    issue = (
      await (
        await getOctokit()
      ).rest.issues.get({
        owner: repositoryFullName.split("/")[0],
        repo: repositoryFullName.split("/")[1],
        issue_number: Number(task.issueNumber),
      })
    )?.data;
  }

  return (
    <div>
      {issue ? (
        <div className="flex items-center gap-2">
          Refers to:{" "}
          <a href={issue.url} target="_blank" rel="noreferrer noopener">
            #{issue.number}: {issue.title} ({issue.state})
          </a>
          <RemoveTaskIssue taskId={task.id} />
        </div>
      ) : (
        <div>
          <h3>Assign Issue</h3>
          <TaskIssueSelector
            taskId={task.id}
            repositoryFullName={repositoryFullName}
          />
        </div>
      )}
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
}
