import { unstable_cache } from "next/cache";
import { Octokit } from "octokit";
import { createClient } from "./supabase/client";

export const getOctokit = async () => {
  const {
    data: { session },
  } = await createClient().auth.getSession();

  if (!session) {
    return new Octokit();
  }

  return new Octokit({
    auth: session.provider_token,
  });
};

export const getRepositoryDetails = unstable_cache(
  async (owner: string, repo: string, octokit?: Octokit) => {
    const octokitInstance = octokit || (await getOctokit());

    const { data: repository } = await octokitInstance.rest.repos.get({
      owner,
      repo,
    });

    const { data: lastActivity } = await octokitInstance.rest.repos.getBranch({
      owner,
      repo,
      branch: repository.default_branch,
    });

    return {
      ...repository,
      lastCommit: lastActivity.commit,
    };
  },
  undefined,
  {
    revalidate: 60,
  },
);
