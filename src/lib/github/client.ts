import { Octokit } from "octokit";
import { createClient } from "../supabase/client";

export const getClientOctokit = async () => {
  const {
    data: { session },
  } = await createClient().auth.getSession();

  if (!session?.provider_token) {
    throw new Error("No supabase session found");
  }

  return new Octokit({
    auth: session.provider_token,
  });
};
