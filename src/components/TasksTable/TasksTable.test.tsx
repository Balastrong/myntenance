import { render, screen, waitFor } from "@testing-library/react";
import { TasksTable } from "./TasksTable";
import { getOwnTasks } from "@/services/tasks/api";
import { use } from "react";

jest.mock("@/services/tasks/api", () => ({
  getOwnTasks: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  use: jest.fn(),
}));

describe("TasksTable", () => {
  const projectId = "1";
  const repositoryFullName = "owner/repo";
  const tasksPromise = Promise.resolve({
    data: [
      {
        id: 1,
        taskId: "1",
        title: "Test Task",
        status: "open",
        issueNumber: 123,
        prNumber: 456,
        deadline: "2023-12-31T23:59:59Z",
        createdAt: "2023-01-01T00:00:00Z",
        projectId: "1",
      },
    ],
    count: 1,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    getOwnTasks.mockReturnValue(tasksPromise);
    use.mockImplementation((promise) => {
      if (promise === tasksPromise) {
        return { data: tasksPromise.data, count: tasksPromise.count };
      }
      throw new Error("Unexpected promise");
    });
  });

  it("renders TasksTable with data", async () => {
    render(
      <TasksTable
        tasksPromise={tasksPromise}
        projectId={projectId}
        repositoryFullName={repositoryFullName}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });
});
