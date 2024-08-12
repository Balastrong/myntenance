import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserProfileBySlug } from "@/services/profile/api"
import { useParams } from "next/navigation"

export default async function UserPublicProfile({
  params: { userSlug },
}: {
  params: { userSlug: string }
}) {
  const { data } = await getUserProfileBySlug(userSlug)

  if (data === null) {
    return <div>User not found</div>
  }

  return (
    <main className="flex h-full flex-col gap-4">
      <h2 className="text-xl font-medium">Profile: {userSlug}</h2>
      <Avatar>
        <AvatarImage src={`https://github.com/${userSlug}.png`} />
        <AvatarFallback>{userSlug[0]}</AvatarFallback>
      </Avatar>
      <div>Full name: {data?.fullName}</div>
    </main>
  )
}
