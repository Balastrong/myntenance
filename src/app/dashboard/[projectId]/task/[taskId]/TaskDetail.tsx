"use server";

import { RemoveTaskIssue } from "@/components/RemoveTaskIssue";
import { TaskIssueSelector } from "@/components/TaskIssueSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getServerOctokit } from "@/lib/github/server";
import { Task } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

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
      await getServerOctokit().rest.issues.get({
        owner: repositoryFullName.split("/")[0],
        repo: repositoryFullName.split("/")[1],
        issue_number: Number(task.issueNumber),
      })
    )?.data;
  }

  return (
    <div>
      {issue ? (
        <Card>
          <div className="flex">
            <div className="p-6 pr-0">
              <Avatar>
                <AvatarImage
                  src={issue.user?.avatar_url}
                  alt={issue.user?.login}
                />
                <AvatarFallback>{issue.user?.login}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    <a href={issue.html_url} target="_blank" rel="noreferrer">
                      #{issue.number}&nbsp;{issue.title}
                    </a>
                  </CardTitle>
                  <RemoveTaskIssue taskId={task.id} />
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "capitalize text-white",
                      issue.state === "open" && "bg-green-500",
                      issue.state === "closed" && "bg-purple-400",
                    )}
                  >
                    {issue.state}
                  </Badge>
                  {issue.labels.length > 0 && (
                    <>
                      <Separator orientation="vertical" className="h-4" />
                      {issue.labels.map((label) =>
                        typeof label === "string" ? (
                          <Badge key={label} variant="secondary">
                            {label}
                          </Badge>
                        ) : (
                          <Badge
                            key={label.id}
                            variant="secondary"
                            style={{
                              backgroundColor: label.color
                                ? `#${label.color}`
                                : undefined,
                            }}
                          >
                            {label.name}
                          </Badge>
                        ),
                      )}
                    </>
                  )}
                </CardDescription>
              </CardHeader>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-4">
            <h3>Assign Issue</h3>
            <TaskIssueSelector
              taskId={task.id}
              repositoryFullName={repositoryFullName}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
