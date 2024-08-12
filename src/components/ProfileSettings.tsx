"use client"

import { QueryData } from "@supabase/supabase-js"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { getOwnSettings, updateOwnSettings } from "@/services/settings/api"
import { use, useTransition } from "react"
import { getOwnProfile } from "@/services/profile/api"
import { useForm } from "@tanstack/react-form"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { Checkbox } from "./ui/checkbox"

type Props = {
  settingsPromise: ReturnType<typeof getOwnSettings>
  profilePromise: ReturnType<typeof getOwnProfile>
}
export async function ProfileSettings({
  settingsPromise,
  profilePromise,
}: Props) {
  const [isUpdatePending, startUpdateTransition] = useTransition()

  const { data: settings } = use(settingsPromise)
  const { data: profile } = use(profilePromise)

  const form = useForm({
    defaultValues: {
      fullName: profile?.fullName ?? "",
      showPublicActivity: settings?.showPublicActivity ?? false,
    },
    onSubmit: ({ value }) => {
      startUpdateTransition(async () => {
        const { error } = await updateOwnSettings(
          {
            showPublicActivity: value?.showPublicActivity,
          },
          {
            fullName: value.fullName,
          },
        )

        if (error) {
          toast.error(error.message)
          return
        }

        toast.success("Profile updated!")
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <Card>
        <CardHeader>Public Profile</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form.Field name="fullName">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Full Name</Label>
                <Input
                  id={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="showPublicActivity">
            {(field) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <Label htmlFor={field.name}>Show Activity</Label>
              </div>
            )}
          </form.Field>
        </CardContent>
        <CardFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => {
              const isSubmitPending = isUpdatePending || isSubmitting
              return (
                <Button disabled={!canSubmit || isSubmitPending}>
                  {isSubmitPending ? "Saving..." : "Save"}
                </Button>
              )
            }}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  )
}
