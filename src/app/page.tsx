import Hero from "@/components/Hero"
import { HeroParticles } from "@/components/HeroParticles"
import BlurFade from "@/components/magicui/blur-fade"
import TrustedBy from "@/components/TrustedBy"
import { getMyntenanceRepository } from "@/lib/github/api"
import { getServerOctokit } from "@/lib/github/server"
import { createClient } from "@/lib/supabase/server"
import { getSiteMeta } from "@/services/meta"

export default async function Home() {
  const {
    data: { user },
  } = await createClient().auth.getUser()

  const { stargazers_count, forks_count } =
    await getMyntenanceRepository(getServerOctokit())

  const { projects, users } = await getSiteMeta(createClient())

  return (
    <>
      <HeroParticles />
      <main className="relative flex h-full flex-col items-center gap-14 text-center">
        <Hero user={user} />
        <BlurFade delay={0.5} className="w-full overflow-hidden">
          <TrustedBy
            stargazers={stargazers_count}
            forks={forks_count}
            projects={projects ?? 0}
            users={users}
          />
        </BlurFade>
      </main>
    </>
  )
}
