"use client"

import ProfileDeleteButton from "./ProfileDeleteButton"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export function ProfileDeleteCard() {
  return (
    <Card>
      <CardHeader className="text-red-400">Delete account</CardHeader>
      <CardContent className="flex flex-col gap-4">
        Once you delete your account, there is no going back. Please be certain.
      </CardContent>
      <CardFooter>
        <ProfileDeleteButton />
      </CardFooter>
    </Card>
  )
}
