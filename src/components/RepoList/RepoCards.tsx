import { getOwnProjects } from "@/services/project/api"
import { QueryData } from "@supabase/supabase-js"
import { FolderGit2 } from "lucide-react"
import { RepoCard } from "./RepoCard"
import { RepoCardGrid } from "./RepoCardGrid"

export type RepoWithTasks = QueryData<ReturnType<typeof getOwnProjects>>

export default async function RepoCards() {
  const { data, error } = await getOwnProjects()

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (data?.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <FolderGit2 className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="text-xl font-medium">No projects available</h2>
        <p className="text-muted-foreground">Please add your first project</p>
      </div>
    )
  }

  const favouriteRepositories = data.filter(({ isFavourite }) => isFavourite)
  const repositories = data.filter(({ isFavourite }) => !isFavourite)

  return (
    <div className="flex flex-col gap-2">
      {favouriteRepositories.length > 0 && (
        <RepoCardGrid title="Favourite Repositories">
          {favouriteRepositories.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </RepoCardGrid>
      )}
      {repositories.length > 0 && (
        <RepoCardGrid title="Repositories">
          {repositories.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </RepoCardGrid>
      )}
    </div>
  )
}
