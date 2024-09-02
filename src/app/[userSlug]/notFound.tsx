import { SignInButton } from "@/components/SignInButton"

export default async function NotFound({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl">
        Looks like <strong>{slug}</strong> doesn&apos;t have a public profile
        here
      </h3>
      Want to create your own?
      <div className="w-fit">
        <SignInButton />
      </div>
    </div>
  )
}
