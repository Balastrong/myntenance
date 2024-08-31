import { PublicProjectCard } from "@/components/PublicProjectCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserProfileBySlug } from "@/services/profile/api"
import { getUserPublicProjects } from "@/services/project/api"

export default async function UserPublicProfile({
  params: { userSlug },
}: {
  params: { userSlug: string }
}) {
  const { data: userData } = await getUserProfileBySlug(userSlug)

  if (userData === null) {
    return <div>User not found</div>
  }

  const { data: publicProjects } = await getUserPublicProjects(userData.user)

  return (
    <main className="flex flex-col gap-4 lg:flex-row">
      <div className="flex min-w-64 flex-col gap-4">
        <Avatar className="mx-auto size-48">
          <AvatarImage src={`https://github.com/${userSlug}.png`} />
          <AvatarFallback>{userSlug[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-medium">{userData?.fullName}</h2>
          <h3 className="text-xl">{userSlug}</h3>
        </div>
        <div>
          <p>Projects: {publicProjects?.length ?? 0}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-medium">Public Projects</h2>
        <div className="flex flex-col items-center gap-4">
          {(publicProjects ?? []).map((project) => (
            <PublicProjectCard
              key={project.id}
              userLogin={userSlug}
              project={project}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
