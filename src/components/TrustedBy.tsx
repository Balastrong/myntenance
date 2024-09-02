"use client"
import { useTheme } from "next-themes"
import { MagicCard } from "@/components/magicui/magic-card"
import Marquee from "./magicui/marquee"
import NumberTicker from "./magicui/number-ticker"
import { FolderGit2, Forklift, GitFork, Star, User } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"

type Props = {
  stargazers: number
  forks: number
  users: number
  projects: number
}

export default function TrustedBy({
  stargazers,
  forks,
  users,
  projects,
}: Props) {
  return (
    <div className="w-full pb-6">
      <h2 className="text-xl font-semibold md:text-2xl">Trusted by</h2>
      <Marquee
        pauseOnHover
        className="pb-8 pt-4 [--duration:40s] [--gap:1rem] md:[--gap:3rem]"
      >
        <Card>
          <CardNumber value={stargazers}>
            <Star className="size-8" />
          </CardNumber>
          <CardLabel>Stars</CardLabel>
        </Card>
        <Card>
          <a
            href="https://www.youtube.com/@DevLeonardo"
            target="_blank"
            rel="noreferrer"
          >
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/7253929?v=4"
                alt="Balastrong"
              />
            </Avatar>
          </a>
          <CardLabel>Myself {":)"}</CardLabel>
        </Card>
        <Card>
          <CardNumber value={users}>
            <User className="size-8" />
          </CardNumber>
          <CardLabel>Users</CardLabel>
        </Card>
        <Card>
          <CardNumber value={projects}>
            <FolderGit2 className="size-8" />
          </CardNumber>
          <CardLabel>Projects</CardLabel>
        </Card>
        <Card>
          <CardNumber value={forks}>
            <GitFork className="size-8" />
          </CardNumber>
          <CardLabel>Forks</CardLabel>
        </Card>
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme()

  return (
    <MagicCard
      gradientColor={resolvedTheme === "dark" ? "#262626" : "#D9D9D955"}
      className="flex min-w-[180px] cursor-pointer items-center justify-center shadow-xl md:min-w-[300px]"
    >
      <div className="flex h-full flex-col items-center justify-center gap-2 px-8 py-4 text-xl md:px-16">
        {children}
      </div>
    </MagicCard>
  )
}

const CardNumber = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: number
}) => {
  return (
    <div className="mb-auto flex items-center gap-1 text-xl font-semibold md:text-4xl">
      <NumberTicker value={value} />
      {children}
    </div>
  )
}

const CardLabel = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-base md:text-xl">{children}</div>
}
