"use client"

import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { updateTaskNotes } from "@/services/tasks/api"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"

type Props = {
  taskId: number
  taskNotes: string
}
export function TaskNotes({ taskNotes, taskId }: Props) {
  const [title, setTitle] = useState(taskNotes)
  const { debouncedValue: debouncedTitle } = useDebouncedValue(title, 500)

  useEffect(() => {
    if (debouncedTitle !== taskNotes) {
      updateTaskNotes(taskId, debouncedTitle)
    }
  }, [debouncedTitle, taskId, taskNotes])

  return <Textarea onChange={(e) => setTitle(e.target.value)} value={title} />
}
