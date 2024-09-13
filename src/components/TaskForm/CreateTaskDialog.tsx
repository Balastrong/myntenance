import React, { useRef } from "react"
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
import { TaskInsert } from "@/lib/supabase/types"
import { createTask } from "@/services/tasks/api"
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { TaskForm } from "./TaskForm"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
  projectId: string
}

export function CreateTaskDialog({ projectId }: Props) {
  const [open, setOpen] = React.useState(false)
  const [createAnother, setCreateAnother] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 640px)")

  const [isCreatePending, startCreateTransition] = React.useTransition()
  const formRef = useRef<any>(null)

  const onSubmit = async (taskInsert: TaskInsert) => {
    startCreateTransition(async () => {
      const { error } = await createTask(taskInsert)

      if (error) {
        toast.error(error.message)
        return
      }

      if (createAnother) {
        formRef.current?.resetForm()
        toast.success("Task created. Ready to create another task.")
      } else {
        setOpen(false)
        toast.success("Task created")
      }
    })
  }
  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setCreateAnother(checked === true)
  }

  const renderDialogContent = () => (
    <>
      <DialogHeader>
        <DialogTitle>Create task</DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new task.
        </DialogDescription>
      </DialogHeader>
      <TaskForm
        ref={formRef}
        task={{ projectId, title: "" }}
        onSubmit={onSubmit}
      >
        {({ canSubmit, isSubmitting }) => (
          <DialogFooter className="gap-2 pt-4 sm:space-x-0">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={createAnother}
                onCheckedChange={handleCheckboxChange}
                className="border border-gray-500"
              />
              <span className="text-sm font-medium">Create Another Task</span>
            </div>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={!canSubmit || isCreatePending}>
              {isSubmitting ||
                (isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                ))}
              Create
            </Button>
          </DialogFooter>
        )}
      </TaskForm>
    </>
  )

  const renderDrawerContent = () => (
    <>
      <DrawerHeader>
        <DrawerTitle>Create task</DrawerTitle>
        <DrawerDescription>
          Fill in the details below to create a new task.
        </DrawerDescription>
      </DrawerHeader>
      <TaskForm
        ref={formRef}
        task={{ projectId, title: "" }}
        onSubmit={onSubmit}
      >
        {({ canSubmit, isSubmitting }) => (
          <DrawerFooter className="gap-2 sm:space-x-0">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={createAnother}
                onCheckedChange={handleCheckboxChange}
                className="border border-gray-500"
              />
              <span className="text-sm font-medium">Create Another Task</span>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button disabled={!canSubmit || isCreatePending}>
              {isSubmitting ||
                (isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                ))}
              Create
            </Button>
          </DrawerFooter>
        )}
      </TaskForm>
    </>
  )

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>{renderDialogContent()}</DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New task
        </Button>
      </DrawerTrigger>
      <DrawerContent>{renderDrawerContent()}</DrawerContent>
    </Drawer>
  )
}
