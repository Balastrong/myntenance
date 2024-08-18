"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/lib/supabase/types"
import { formatDate, getStatusIcon } from "@/lib/utils"
import { TaskStatus } from "@/types/schemas"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { CircleDot, CirclePlus, GitPullRequestArrow } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { IssuePreview } from "../IssuePreview"
import { UpdateTaskSheet } from "../TaskForm/UpdateTaskSheet"
import { DeleteTasksDialog } from "./DeleteTaskDialog"
import { QuickAssignDialog } from "./QuickAssignDialog"
import { assignTaskIssue, assignTaskPullRequest } from "@/services/tasks/api"

export function getColumns({
  repositoryFullName,
}: {
  repositoryFullName: string
}): ColumnDef<Task>[] {
  return [
    {
      size: 32,
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const label = ""

        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label}</Badge>}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue<TaskStatus>("status")
        const Icon = getStatusIcon(status)
        return (
          <div className="flex w-20 items-center gap-2 capitalize">
            <Icon /> {status}
          </div>
        )
      },
    },
    {
      accessorKey: "issueNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Issue" />
      ),
      cell: ({ row }) => {
        const issueNumber = row.original.issueNumber
        return issueNumber ? (
          <IssuePreview
            issueNumber={issueNumber}
            repositoryFullName={repositoryFullName}
            onUnassign={() =>
              assignTaskIssue({
                id: row.original.id,
                issueNumber: null,
              })
            }
          >
            <span className="flex items-center gap-1">
              <CircleDot className="size-4" />
              {issueNumber}
            </span>
          </IssuePreview>
        ) : (
          <QuickAssignDialog
            taskId={row.original.id}
            repositoryFullName={repositoryFullName}
            mode="issue"
          >
            <Button
              variant={"link"}
              size={"xs"}
              className="p-0 opacity-0 transition-opacity group-hover/table-row:opacity-100"
            >
              <CirclePlus className="mr-1 size-4" />
              Add
            </Button>
          </QuickAssignDialog>
        )
      },
    },
    {
      accessorKey: "prNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PR" />
      ),
      cell: ({ row }) => {
        const prNumber = row.original.prNumber
        return prNumber ? (
          <IssuePreview
            issueNumber={prNumber}
            repositoryFullName={repositoryFullName}
            onUnassign={() =>
              assignTaskPullRequest({
                id: row.original.id,
                prNumber: null,
              })
            }
          >
            <span className="flex items-center gap-1">
              <GitPullRequestArrow className="size-4" />
              {prNumber}
            </span>
          </IssuePreview>
        ) : (
          <QuickAssignDialog
            taskId={row.original.id}
            repositoryFullName={repositoryFullName}
            mode="pr"
          >
            <Button
              variant={"link"}
              size={"xs"}
              className="p-0 opacity-0 transition-opacity group-hover/table-row:opacity-100"
            >
              <CirclePlus className="mr-1 size-4" />
              Add
            </Button>
          </QuickAssignDialog>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) =>
        new Date(cell.getValue() as string).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showUpdateTaskSheet, setShowUpdateTaskSheet] =
          React.useState(false)
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false)

        return (
          <>
            <DeleteTasksDialog
              open={showDeleteTaskDialog}
              onOpenChange={setShowDeleteTaskDialog}
              tasks={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <UpdateTaskSheet
              open={showUpdateTaskSheet}
              onOpenChange={setShowUpdateTaskSheet}
              task={row.original}
            />
            <div className="flex justify-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Open menu"
                    variant="ghost"
                    className="flex size-6 p-0 data-[state=open]:bg-muted"
                  >
                    <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onSelect={() => setShowUpdateTaskSheet(true)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => setShowDeleteTaskDialog(true)}
                  >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href={`/dashboard/${row.original.projectId}/task/${row.original.id}`}
              >
                <Button
                  variant="ghost"
                  className="flex size-6 p-0 data-[state=open]:bg-muted"
                >
                  -&gt;
                </Button>
              </Link>
            </div>
          </>
        )
      },
      size: 40,
    },
  ]
}
