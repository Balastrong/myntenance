import { getUserRepoStats } from "@/app/api/github/actions"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { getServerOctokit } from "@/lib/github/server"
import { ActivityCalendar } from "./ActivityCalendar"

type Props = {
  userLogin: string
  repoLogin: string
  repoName: string
}

export async function PublicProjectCard({
  userLogin,
  repoLogin,
  repoName,
}: Props) {
  const { data: commits } = await getUserRepoStats(
    getServerOctokit(),
    userLogin,
    repoLogin,
    repoName,
  )

  const dataMap = new Map<
    string,
    {
      date: string
      count: number
      level: number
    }
  >()

  const date = new Date()

  for (let i = 0; i < 365; i++) {
    date.setDate(date.getDate() - 1)
    dataMap.set(date.toISOString().split("T")[0], {
      date: date.toISOString().split("T")[0],
      count: 0,
      level: 0,
    })
  }

  let max = 0
  let totalCommits = 0

  commits.forEach(({ commit }) => {
    const date = commit.author?.date?.split("T")[0]
    if (!date) return
    const data = dataMap.get(date)
    if (data) {
      totalCommits++
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

  return (
    <Card
      style={{
        order: -totalCommits,
      }}
    >
      <CardHeader>
        <CardTitle>
          {repoLogin}/{repoName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityCalendar data={data} />
      </CardContent>
    </Card>
  )
}
