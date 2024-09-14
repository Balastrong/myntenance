import { unstable_cache } from "next/cache"
import { Octokit, RequestError } from "octokit"
import { checkSpecificErrorGithubApi } from "../handle-error"

export const getRepositoryDetails = unstable_cache(
  async (owner: string, repo: string, octokit: Octokit) => {
    const { data: repository } = await octokit.rest.repos.get({
      owner,
      repo,
    })

    const lastActivity = await getBranchRepository(
      owner,
      repo,
      repository.default_branch,
      octokit,
    )
    return {
      ...repository,
      lastCommit: lastActivity?.commit,
    }
  },
  undefined,
  {
    revalidate: 60,
  },
)

export const getBranchRepository = unstable_cache(
  async (owner: string, repo: string, branch: string, octokit: Octokit) => {
    try {
      const { data: lastActivity } = await octokit.rest.repos.getBranch({
        owner,
        repo,
        branch: branch,
      })
      return lastActivity
    } catch (error) {
      if (error instanceof RequestError) {
        checkSpecificErrorGithubApi(error)
      } else {
        throw error
      }
    }
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
