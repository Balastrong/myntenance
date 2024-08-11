import { unstable_cache } from "next/cache"
import { Octokit } from "octokit"

export const getRepositoryDetails = unstable_cache(
  async (owner: string, repo: string, octokit: Octokit) => {
    const { data: repository } = await octokit.rest.repos.get({
      owner,
      repo,
    })

    const { data: lastActivity } = await octokit.rest.repos.getBranch({
      owner,
      repo,
      branch: repository.default_branch,
    })

    return {
      ...repository,
      lastCommit: lastActivity.commit,
    }
  },
  undefined,
  {
    revalidate: 60,
  },
)

export const getMyntenanceRepository = unstable_cache(
  async (octokit: Octokit) => {
    return getRepositoryDetails("Balastrong", "myntenance", octokit)
  },
  undefined,
  {
    revalidate: 3600,
  },
)
