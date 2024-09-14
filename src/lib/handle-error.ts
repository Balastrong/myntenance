import { isRedirectError } from "next/dist/client/components/redirect"
import { RequestError } from "octokit"
import { toast } from "sonner"
import { z } from "zod"

export function getErrorMessage(err: unknown) {
  const unknownError = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return errors.join("\n")
  } else if (err instanceof Error) {
    return err.message
  } else if (isRedirectError(err)) {
    throw err
  } else {
    return unknownError
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)
  return toast.error(errorMessage)
}

export function checkSpecificErrorGithubApi(error: RequestError) {
  const message = error.message.split("-")[0].trim()
  switch (message) {
    case "Branch not found":
    default:
      return null
  }
}
