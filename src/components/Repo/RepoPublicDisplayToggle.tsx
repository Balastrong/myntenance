"use client"

import { Eye, EyeOff, Star } from "lucide-react"
import { Button } from "../ui/button"
import { useOptimistic } from "react"
import {
  toggleFavourite,
  togglePublicProfileVisibility,
} from "@/services/project/api"

type Props = { projectId: string; showInPublicProfile: boolean }

export function RepoPublicDisplayToggle({
  projectId,
  showInPublicProfile,
}: Props) {
  const [optimisticShow, optimisticToggleShow] =
    useOptimistic(showInPublicProfile)

  return (
    <form
      action={async () => {
        optimisticToggleShow((curr) => !curr)
        togglePublicProfileVisibility(projectId, !optimisticShow)
      }}
    >
      <Button size={"icon"} variant={"secondary"}>
        {optimisticShow ? <Eye /> : <EyeOff />}
      </Button>
    </form>
  )
}
