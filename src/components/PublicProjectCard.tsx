import { getUserRepoStats } from "@/app/api/github/actions"
import { getServerOctokit } from "@/lib/github/server"
import { Activity } from "react-activity-calendar"
import { ActivityCalendar } from "./ActivityCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import { RepoWithTasks } from "./RepoList/RepoCards"
import { Database, Tables } from "@/lib/supabase/types.gen"

type Props = {
  userLogin: string
  project: Tables<"projects">
}

export async function PublicProjectCard({ userLogin, project }: Props) {
  const { data: commits } = await getUserRepoStats(
    getServerOctokit(),
    userLogin,
    project.ownerLogin,
    project.name,
  )

  const totalCommits = commits.length

  const data = computeActivityCalendarData(commits)

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
          {project.ownerLogin}/{project.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityCalendar data={data} />
      </CardContent>
    </Card>
  )
}

function computeActivityCalendarData(
  commits: Awaited<ReturnType<typeof getUserRepoStats>>["data"],
) {
  let max = 0

  const dataMap = new Map<string, Activity>()
  const date = new Date()

  for (let i = 0; i < 365; i++) {
    date.setDate(date.getDate() - 1)
    const dateString = date.toISOString().split("T")[0]
    dataMap.set(dateString, {
      date: dateString,
      count: 0,
      level: 0,
    })
  }

  commits.forEach(({ commit }) => {
    const date = commit.author?.date?.split("T")[0]
    if (!date) return
    const data = dataMap.get(date)
    if (data) {
      const count = data.count + 1
      max = Math.max(max, count)
      dataMap.set(date, {
        ...data,
        count,
      })
    }
  })

  const data = Array.from(dataMap.values())
    .map((data) => {
      if (max === 0) {
        return data
      }

      const level = Math.min(Math.floor((data.count / max) * 4), 4)

      return {
        ...data,
        level: data.count > 0 ? Math.max(1, level) : 0,
      }
    })
    .toReversed()

  return data
}
