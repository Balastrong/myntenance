"use client"
"use memo"

import { useDataTable } from "@/hooks/useDataTable"
import { Task } from "@/lib/supabase/types"
import { getOwnTasks } from "@/services/tasks/api"
import { DataTableFilterField } from "@/types"
import { use, useMemo } from "react"
import { DataTable } from "../ui/data-table/data-table"
import { DataTableToolbar } from "../ui/data-table/data-table-toolbar"
import { getColumns } from "./TasksTableColumns"
import { TasksTableToolbarActions } from "./TasksTableToolbarActions"
import { getStatusIcon } from "@/lib/utils"
import { TaskStatusValues } from "@/types/schemas"

interface TasksTableProps {
  projectId: string
  tasksPromise: ReturnType<typeof getOwnTasks>
  repositoryFullName: string
}

export function TasksTable({
  tasksPromise,
  projectId,
  repositoryFullName,
}: TasksTableProps) {
  const { data, count } = use(tasksPromise)

  const columns = useMemo(
    () => getColumns({ repositoryFullName }),
    [repositoryFullName],
  )

  const filterFields: DataTableFilterField<Task>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
    {
      label: "Status",
      value: "status",
      options: TaskStatusValues.map((status) => ({
        label: `${status[0].toUpperCase()}${status.slice(1)}`,
        value: status,
        icon: getStatusIcon(status),
      })),
    },
  ]

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    itemsCount: count ?? 0,
    filterFields,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} projectId={projectId} />
      </DataTableToolbar>
    </DataTable>
  )
}
