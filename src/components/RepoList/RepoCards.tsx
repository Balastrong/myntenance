import { createClient } from "@/lib/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { RepoCard } from "./RepoCard";
import { RepoCardGrid } from "./RepoCardGrid";

const getProjects = createClient().from("projects").select("*, tasks (*)");
export type RepoWithTasks = QueryData<typeof getProjects>;

export default async function RepoCards() {
  const { data, error } = await getProjects;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const favouriteRepositories = data.filter(({ isFavourite }) => isFavourite);
  const repositories = data.filter(({ isFavourite }) => !isFavourite);

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
  );
}
