"use client"

import { getUserRepoStats } from "@/app/api/github/actions"
import { Tables } from "@/lib/supabase/types.gen"
import Image from "next/image"
import { use, useMemo } from "react"
import { Activity } from "react-activity-calendar"
import { ActivityCalendar } from "./ActivityCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { History } from "lucide-react"

type Props = {
  project: Tables<"projects">
  activityPromise: Promise<{
    data: Activity[]
    totalCommits: number
    lastCommit: string | undefined
  }>
}

export function PublicProjectCard({ project, activityPromise }: Props) {
  const { data, lastCommit } = use(activityPromise)

  const order = useMemo(
    () =>
      Math.floor(
        (new Date().getTime() - new Date(lastCommit ?? 0).getTime()) / 100_000,
      ),
    [lastCommit],
  )

  return (
    <Card className="w-full max-w-fit" style={{ order }}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              src={`https://github.com/${project.ownerLogin}.png?size=80`}
              alt={project.ownerLogin}
              className={`size-10 bg-gray-300 ${
                project.ownerType === "User" ? "rounded-full" : "rounded-md"
              }`}
            />
            <a
              href={`https://github.com/${project.ownerLogin}/${project.name}`}
              target="_blank"
              className="text-nowrap"
            >
              <span>{project.ownerLogin}/</span>
              <wbr />
              <span>{project.name}</span>
            </a>
          </div>

          {lastCommit && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <History className="h-4 w-4" /> Last commit:{" "}
              {new Date(lastCommit).toLocaleDateString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityCalendar data={data} />
      </CardContent>
    </Card>
  )
}
