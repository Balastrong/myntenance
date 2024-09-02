"use client"

import { getUserRepoStats } from "@/app/api/github/actions"
import { Tables } from "@/lib/supabase/types.gen"
import Image from "next/image"
import { use } from "react"
import { Activity } from "react-activity-calendar"
import { ActivityCalendar } from "./ActivityCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  project: Tables<"projects">
  activityPromise: Promise<{ data: Activity[]; totalCommits: number }>
}

export function PublicProjectCard({
  project,
  activityPromise: commitsPromise,
}: Props) {
  const { data, totalCommits } = use(commitsPromise)

  return (
    <Card
      className="w-full"
      style={{
        order: -totalCommits,
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image
            width={100}
            height={100}
            src={`https://github.com/${project.ownerLogin}.png?size=80`}
            alt={project.ownerLogin}
            className={`size-10 bg-gray-300 ${
              project.ownerType === "User" ? "rounded-full" : "rounded-md"
            }`}
          />
          <a
            href={`https://github.com/${project.ownerLogin}/${project.name}`}
            target="_blank"
          >
            {project.ownerLogin}/{project.name}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center">
        <ActivityCalendar data={data} />
      </CardContent>
    </Card>
  )
}
