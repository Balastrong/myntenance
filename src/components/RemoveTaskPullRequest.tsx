"use client"

import { assignTaskPullRequest } from "@/services/tasks/api"
import { X } from "lucide-react"
import { Button } from "./ui/button"

export function RemoveTaskPullRequest({ taskId }: { taskId: number }) {
  return (
    <form
      action={() => {
        assignTaskPullRequest({ id: taskId, prNumber: null })
      }}
    >
      <Button size={"sm"} variant={"destructive"}>
        <X />
      </Button>
    </form>
  )
}
