import { createClient } from "@/lib/supabase/server"
import { QueryData } from "@supabase/supabase-js"
import { RepoCard } from "./RepoCard"
import { RepoCardGrid } from "./RepoCardGrid"
import { FolderGit2 } from "lucide-react"

const getProjects = () => createClient().from("projects").select("*, tasks (*)")
export type RepoWithTasks = QueryData<ReturnType<typeof getProjects>>

export default async function RepoCards() {
  const { data, error } = await getProjects()

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
