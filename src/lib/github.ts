import { Octokit } from "octokit";
import { createClient } from "./supabase/server";

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
