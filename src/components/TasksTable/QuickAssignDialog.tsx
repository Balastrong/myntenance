import { IssueSelector } from "../IssueSelector"
import { TaskIssueSelector } from "../TaskIssueSelector"
import { TaskPullRequestSelector } from "../TaskPullRequestSelector"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"

type Props = {
  children: React.ReactNode
  repositoryFullName: string
  taskId: number
  mode: "issue" | "pr"
}

export function QuickAssignDialog({
  children,
  taskId,
  repositoryFullName,
  mode,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {mode === "issue" ? (
          <>
            <DialogHeader>Quick Assign Issue</DialogHeader>
            <TaskIssueSelector
              taskId={taskId}
              repositoryFullName={repositoryFullName}
            />
          </>
        ) : (
          <>
            <DialogHeader>Quick Assign Pull Request</DialogHeader>
            <TaskPullRequestSelector
              taskId={taskId}
              repositoryFullName={repositoryFullName}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
