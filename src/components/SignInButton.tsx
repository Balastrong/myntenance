"use client"
import { login } from "@/app/auth/actions"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { BorderBeam } from "./magicui/border-beam"

export const SignInButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} className="relative w-full min-w-24">
      <>
        Sign In
        <BorderBeam size={55} borderWidth={2} duration={4} />
      </>
    </Button>
  )
}
