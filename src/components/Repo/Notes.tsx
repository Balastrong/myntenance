"use client"

import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { updateProjectNotes } from "@/services/project/api"
import { createGitHubIssue } from "@/app/api/github/actions"
import { Button } from "../ui/button"
import { toast } from "sonner"

type Props = {
  projectId: string
  projectNotes: string
}
export function Notes({ projectNotes, projectId }: Props) {
  const [title, setTitle] = useState(projectNotes)
  const { debouncedValue: debouncedTitle } = useDebouncedValue(title, 500)

  useEffect(() => {
    if (debouncedTitle !== projectNotes) {
      updateProjectNotes(projectId, debouncedTitle)
    }
  }, [debouncedTitle, projectId, projectNotes])

  const handleCreateIssue = async () => {
    const response = await createGitHubIssue("owner", "repo", "Issue Title", title)
    if (response.error) {
      toast.error(response.message)
    } else {
      toast.success(response.message)
    }
  }

  return (
    <div>
      <Textarea onChange={(e) => setTitle(e.target.value)} value={title} />
      <Button onClick={handleCreateIssue}>Create GitHub Issue</Button>
    </div>
  )
}
