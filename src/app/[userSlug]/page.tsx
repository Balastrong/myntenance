import { PublicProjectCard } from "@/components/PublicProjectCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserProfileBySlug } from "@/services/profile/api"
import { getUserPublicProjects } from "@/services/project/api"
import { getUserRepoStats } from "../api/github/actions"
import { getServerOctokit } from "@/lib/github/server"
import React from "react"
import { PublicProjectCardSkeleton } from "@/components/PublicProjectCardSkeleton"
import { Activity } from "react-activity-calendar"
import NotFound from "./notFound"

export default async function UserPublicProfile({
  params: { userSlug },
}: {
  params: { userSlug: string }
}) {
  const { data: userData } = await getUserProfileBySlug(userSlug)

  if (userData === null) {
    return <NotFound slug={userSlug} />
  }

  const { data: publicProjects } = await getUserPublicProjects(userData.user)

  const activityPromises = publicProjects?.map((proj) =>
    getUserRepoStats(
      getServerOctokit(),
      userSlug,
      proj.ownerLogin,
      proj.name,
    ).then(computeActivityCalendarData),
  )

  return (
    <main className="flex w-full flex-col gap-4 px-2 lg:flex-row">
      <div className="flex flex-row gap-4 lg:w-60 lg:flex-col">
        <Avatar className="aspect-square size-28 lg:mx-auto lg:h-auto lg:w-full">
          <AvatarImage src={`https://github.com/${userSlug}.png`} />
          <AvatarFallback className="text-2xl">{userSlug[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 lg:gap-4">
          <div>
            <h2 className="text-2xl font-medium">{userData?.fullName}</h2>
            <h3 className="text-xl">{userSlug}</h3>
          </div>
          <div>
            <p>Projects: {publicProjects?.length ?? 0}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-4 overflow-x-hidden">
        <h2 className="text-2xl font-medium">Projects on Myntenance</h2>
        <div className="flex w-full flex-col items-center gap-4">
          {(publicProjects ?? []).map((_, i) => (
            <React.Suspense key={i} fallback={<PublicProjectCardSkeleton />}>
              <PublicProjectCard
                key={i}
                activityPromise={activityPromises![i]}
                project={publicProjects![i]}
              />
            </React.Suspense>
          ))}
        </div>
      </div>
    </main>
  )
}

function computeActivityCalendarData({
  data: commits,
}: Awaited<ReturnType<typeof getUserRepoStats>>) {
  let maxDailyCommits = 0

  const dataMap = new Map<string, Activity>()
  const date = new Date()

  for (let i = 0; i < 365; i++) {
    const dateString = date.toISOString().split("T")[0]
    dataMap.set(dateString, {
      date: dateString,
      count: 0,
      level: 0,
    })
    date.setDate(date.getDate() - 1)
  }

  commits.forEach(({ commit }) => {
    const date = commit.author?.date?.split("T")[0]
    if (!date) return

    const activity = dataMap.get(date)
    if (!activity) return

    const count = activity.count + 1
    maxDailyCommits = Math.max(maxDailyCommits, count)
    dataMap.set(date, {
      ...activity,
      count,
    })
  })

  const data = Array.from(dataMap.values())
    .map((data) => {
      if (maxDailyCommits === 0) {
        return data
      }

      const level = Math.min(Math.floor((data.count / maxDailyCommits) * 4), 4)

      return {
        ...data,
        level: data.count > 0 ? Math.max(1, level) : 0,
      }
    })
    .toReversed()

  const totalCommits = commits.length
  const lastCommit = commits[0]?.commit.author?.date

  return { data, totalCommits, lastCommit }
}
