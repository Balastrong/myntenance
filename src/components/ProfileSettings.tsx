"use client"

import { QueryData } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { getOwnSettings } from "@/services/settings/api"
import { use } from "react"
import { getOwnProfile } from "@/services/profile/api"

type Props = {
  settingsPromise: ReturnType<typeof getOwnSettings>
  profilePromise: ReturnType<typeof getOwnProfile>
}
export async function ProfileSettings({
  settingsPromise,
  profilePromise,
}: Props) {
  const { data: settings } = use(settingsPromise)
  const { data: profile } = use(profilePromise)

  return (
    <Card>
      <CardHeader>Public Profile</CardHeader>
      <CardContent>
        <Input id="name" type="text" />
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}
