"use client";

import { assignTaskPullRequest } from "@/services/tasks/api";
import { IssueSelector } from "./IssueSelector";

type Props = {
  taskId: number;
  repositoryFullName: string;
};

export function TaskPullRequestSelector({ taskId, repositoryFullName }: Props) {
  const prBaseQuery = `is:pr repo:${repositoryFullName}`;

  return (
    <IssueSelector
      baseQuery={prBaseQuery}
      onSubmit={(prNumber) => {
        assignTaskPullRequest({ id: taskId, prNumber });
      }}
    />
  );
}
