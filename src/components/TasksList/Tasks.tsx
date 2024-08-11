import { getOwnTasks } from "@/services/tasks/api"
import { SearchParams } from "@/types"
import React from "react"
import { z } from "zod"
import { TasksTable } from "../TasksTable/TasksTable"
import { DataTableSkeleton } from "../ui/data-table/data-table-skeleton"

export const getTasksParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
})

export type GetTasksParams = z.infer<typeof getTasksParamsSchema>

export default async function Tasks({
  projectId,
  searchParams,
}: {
  projectId: string
  searchParams: SearchParams
}) {
  const taskParams = getTasksParamsSchema.parse(searchParams)

  const tasksPromise = getOwnTasks({ projectId, taskParams })

  return (
    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={6}
          searchableColumnCount={1}
          filterableColumnCount={1}
          actionBarItems={2}
          cellWidths={["10rem", "20rem", "8rem", "8rem", "8rem", "3rem"]}
          withPagination
          shrinkZero
        />
      }
    >
      <TasksTable tasksPromise={tasksPromise} projectId={projectId} />
    </React.Suspense>
  )
}
