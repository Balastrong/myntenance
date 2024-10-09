import { render, screen } from "@testing-library/react";
import Tasks from "./Tasks";
import { getOwnTasks } from "@/services/tasks/api";
import { Suspense } from "react";
import { DataTableSkeleton } from "../ui/data-table/data-table-skeleton";

jest.mock("@/services/tasks/api", () => ({
  getOwnTasks: jest.fn(),
}));

describe("Tasks component", () => {
  const projectId = "test-project-id";
  const searchParams = {};
  const repositoryFullName = "test/repo";

  it("renders DataTableSkeleton while loading", async () => {
    getOwnTasks.mockReturnValue(new Promise(() => {}));

    render(
      <Suspense fallback={<DataTableSkeleton />}>
        <Tasks
          projectId={projectId}
          searchParams={searchParams}
          repositoryFullName={repositoryFullName}
        />
      </Suspense>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders TasksTable with data", async () => {
    const tasksData = {
      data: [{ id: 1, title: "Test Task" }],
      count: 1,
    };
    getOwnTasks.mockResolvedValue(tasksData);

    render(
      <Suspense fallback={<DataTableSkeleton />}>
        <Tasks
          projectId={projectId}
          searchParams={searchParams}
          repositoryFullName={repositoryFullName}
        />
      </Suspense>
    );

    expect(await screen.findByText("Test Task")).toBeInTheDocument();
  });
});
