import { TaskIssueSelector } from "../TaskIssueSelector"
import { TaskPullRequestSelector } from "../TaskPullRequestSelector"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="w-96">
        {mode === "issue" ? (
          <>
            <DialogHeader>
              <DialogTitle>Quick Assign Issue</DialogTitle>
            </DialogHeader>
            <TaskIssueSelector
              taskId={taskId}
              repositoryFullName={repositoryFullName}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Quick Assign Pull Request</DialogTitle>
            </DialogHeader>
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
