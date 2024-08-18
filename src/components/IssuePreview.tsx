"use client"
import { getClientOctokit } from "@/lib/github/client"
import { cn } from "@/lib/utils"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Skeleton } from "./ui/skeleton"
import { CircleX, CircleXIcon, X } from "lucide-react"

type Props = {
  children: React.ReactNode
  issueNumber: number
  repositoryFullName: string
  onUnassign?: () => void
}
export function IssuePreview({
  issueNumber,
  children,
  repositoryFullName,
  onUnassign,
}: Props) {
  const [hasBeenOpened, setHasBeenOpened] = useState(false)

  const [owner, repo] = repositoryFullName.split("/")

  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", owner, repo, issueNumber],
    queryFn: async () =>
      getClientOctokit().rest.issues.get({
        owner,
        repo,
        issue_number: issueNumber,
      }),
    select: ({ data }) => data,
    enabled: hasBeenOpened,
  })

  const showSkeleton = isLoading || !issue

  return (
    <HoverCard onOpenChange={() => setHasBeenOpened(true)}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex space-x-4">
          {showSkeleton ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar>
              <AvatarImage
                src={issue.user?.avatar_url}
                alt={issue.user?.login}
              />
              <AvatarFallback>{issue.user?.login}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-1 flex-col gap-1 space-y-1">
            {showSkeleton ? (
              <>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-14 rounded-md" />
                </div>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </>
            ) : (
              <>
                <h4 className="flex items-center justify-between text-sm font-semibold">
                  @{issue.user?.login}
                  <Badge
                    variant="secondary"
                    className={cn(
                      "capitalize text-white",
                      issue.state === "open" && "bg-green-500",
                      issue.state === "closed" && "bg-purple-400",
                    )}
                  >
                    {issue.state}
                  </Badge>
                </h4>
                <p className="text-sm">
                  #{issue.number}: {issue.title}
                </p>
                <div className="flex flex-row gap-2">
                  <Link target="_blank" href={issue.html_url}>
                    <Button size={"xs"} variant={"link"} className="p-0">
                      <GitHubLogoIcon className="mr-1 size-4" /> View
                    </Button>
                  </Link>
                  {onUnassign && (
                    <Button
                      size={"xs"}
                      variant={"destructive-link"}
                      onClick={onUnassign}
                    >
                      <CircleX className="mr-1 size-4" />
                      Unassign
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
