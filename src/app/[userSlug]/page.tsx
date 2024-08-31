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
    <main className="flex h-full flex-col gap-4">
      <h2 className="text-xl font-medium">Profile: {userSlug}</h2>
      <Avatar>
        <AvatarImage src={`https://github.com/${userSlug}.png`} />
        <AvatarFallback>{userSlug[0]}</AvatarFallback>
      </Avatar>
      <div>Full name: {userData?.fullName}</div>
      <div>
        Public Projects:
        <div className="flex flex-col items-center gap-4">
          {(publicProjects ?? []).map((project) => (
            <PublicProjectCard
              key={project.id}
              userLogin={userSlug}
              repoLogin={project.ownerLogin}
              repoName={project.name}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
