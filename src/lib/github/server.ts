import { cookies } from "next/headers";
import { Octokit } from "octokit";
import { GITHUB_TOKEN_COOKIE } from "../supabase/cookies";

export const getServerOctokit = async () => {
  const token = cookies().get(GITHUB_TOKEN_COOKIE);

  if (!token) {
    throw new Error("No github token found");
  }

  return new Octokit({
    auth: token.value,
  });
};
