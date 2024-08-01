import { cookies } from "next/headers";
import { Octokit } from "octokit";
import { GITHUB_ACCESS_TOKEN_COOKIE } from "../supabase/cookies";

export const getServerOctokit = async () => {
  const token = cookies().get(GITHUB_ACCESS_TOKEN_COOKIE);

  return new Octokit({
    auth: token?.value,
  });
};
