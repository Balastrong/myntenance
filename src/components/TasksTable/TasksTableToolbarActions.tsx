"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Task } from "@/lib/supabase/types";
import { DeleteTasksDialog } from "./DeleteTaskDialog";
import { CreateTaskDialog } from "../TaskForm/CreateTaskDialog";

interface TasksTableToolbarActionsProps {
  table: Table<Task>;
  projectId: string;
}

export function TasksTableToolbarActions({
  table,
  projectId,
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateTaskDialog projectId={projectId} />
    </div>
  );
}
