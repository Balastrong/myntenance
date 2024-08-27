"use client"

import { Button } from "../ui/button"
import { DeleteRepoDialog } from "./DeleteRepoDialog"
import * as React from "react"

export default function DeleteRepoButton({ repoId }: { repoId: string }) {
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false)
  return (
    <>
      <DeleteRepoDialog
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        showTrigger={false}
        onSuccess={() => setShowDeleteTaskDialog(false)}
        repoId={repoId}
      />
      <Button
        onClick={() => setShowDeleteTaskDialog(true)}
        size={"sm"}
        variant={"destructive"}
      >
        Delete
      </Button>
    </>
  )
}
