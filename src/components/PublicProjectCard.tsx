"use client"

import { getUserRepoStats } from "@/app/api/github/actions"
import { Tables } from "@/lib/supabase/types.gen"
import Image from "next/image"
import { use, useMemo, useState } from "react"
import { Activity } from "react-activity-calendar"
import { ActivityCalendar } from "./ActivityCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

// Function to calculate the order value based on the last commit date and sorting order
const calculateOrder = (lastCommit: string | undefined, isReverseOrder: boolean) => {
  return Math.floor(
    (new Date().getTime() - new Date(lastCommit ?? 0).getTime()) / 100_000,
  ) * (isReverseOrder ? -1 : 1)
}

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
  const [isReverseOrder, setIsReverseOrder] = useState(false)

  // Calculate the order value using the calculateOrder function
  const order = useMemo(
    () => calculateOrder(lastCommit, isReverseOrder),
    [lastCommit, isReverseOrder],
  )

  return (
    <Card className="w-full max-w-fit" style={{ order }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReverseOrder((prev) => !prev)}
        >
          Toggle Order ({isReverseOrder ? "Desc" : "Asc"})
        </Button>
      </CardHeader>
      <CardContent>
        <ActivityCalendar data={data} />
      </CardContent>
    </Card>
  )
}
