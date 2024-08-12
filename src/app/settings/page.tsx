import { ProfileSettings } from "@/components/ProfileSettings"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getOwnProfile } from "@/services/profile/api"
import { getOwnSettings } from "@/services/settings/api"
import React from "react"

export default async function Settings() {
  const settingsPromise = getOwnSettings()
  const profilePromise = getOwnProfile()

  return (
    <main className="flex h-full flex-col gap-4">
      <h2 className="text-xl font-medium">Settings</h2>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ProfileSettings
          settingsPromise={settingsPromise}
          profilePromise={profilePromise}
        />
      </React.Suspense>
    </main>
  )
}
