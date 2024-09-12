"use client"

import * as React from "react"
import { ProfileDeleteDialog } from "./ProfileDeleteDialog"
import { Button } from "./ui/button"

export default function ProfileDeleteButton() {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  return (
    <>
      <ProfileDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        showTrigger={false}
        onSuccess={() => setShowDeleteDialog(false)}
      />
      <Button
        onClick={() => setShowDeleteDialog(true)}
        size={"sm"}
        variant={"destructive"}
      >
        Delete
      </Button>
    </>
  )
}
