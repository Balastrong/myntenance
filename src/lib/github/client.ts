import { Octokit } from "octokit"
import { createClient } from "../supabase/client"
import { getCookie } from "cookies-next"
import { GITHUB_ACCESS_TOKEN_COOKIE } from "../supabase/cookies"

export const getClientOctokit = async () => {
  const token = getCookie(GITHUB_ACCESS_TOKEN_COOKIE)

  if (!token) {
    throw new Error("No supabase session found")
  }

  return new Octokit({
    auth: token,
  })
}
