import { getCookie } from "cookies-next"
import { Octokit } from "octokit"
import { GITHUB_ACCESS_TOKEN_COOKIE } from "../supabase/cookies"

export const getClientOctokit = () => {
  const token = getCookie(GITHUB_ACCESS_TOKEN_COOKIE)

  if (!token) {
    throw new Error("No supabase session found")
  }

  return new Octokit({
    auth: token,
  })
}
