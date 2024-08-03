"use client";

import { assignTaskIssue } from "@/services/tasks/api";
import { IssueSelector } from "./IssueSelector";

type Props = {
  taskId: number;
  repositoryFullName: string;
};

export function TaskIssueSelector({ taskId, repositoryFullName }: Props) {
  const issueBaseQuery = `is:issue repo:${repositoryFullName}`;

  return (
    <IssueSelector
      baseQuery={issueBaseQuery}
      onSubmit={(issueNumber) => {
        assignTaskIssue({ id: taskId, issueNumber });
      }}
    />
  );
}
