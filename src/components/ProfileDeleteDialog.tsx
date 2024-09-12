"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { deleteOwnAccount } from "@/services/settings/api"
import { TrashIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import * as React from "react"
import { toast } from "sonner"
import { Icons } from "./icons"

interface DeleteProfileDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean
  onSuccess?: () => void
}

export function ProfileDeleteDialog({
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteProfileDialogProps) {
  const router = useRouter()
  const [isDeletePending, startDeleteTransition] = React.useTransition()
  const isDesktop = useMediaQuery("(min-width: 640px)")
  const DRAWER_TITLE = "Are you absolutely sure?"
  const DRAWER_DESCRIPTION =
    "This action cannot be undone. It will permanently delete your account from your Myntenance. This action will not affect your GitHub repository."

  function onDelete() {
    startDeleteTransition(async () => {
      try {
        const res = await deleteOwnAccount()
        router.push("/")
        onSuccess?.()
        toast.success(`Your account was successfully deleted!`)
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An error occurred while deleting your account."
        toast.error(message)
      }
    })
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <TrashIcon className="mr-2 size-4" aria-hidden="true" />
              Delete
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{DRAWER_TITLE}</DialogTitle>
            <DialogDescription>{DRAWER_DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete your account"
              variant="destructive"
              onClick={onDelete}
              disabled={isDeletePending}
            >
              {isDeletePending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{DRAWER_TITLE}</DrawerTitle>
          <DrawerDescription>{DRAWER_DESCRIPTION}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected repository"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
