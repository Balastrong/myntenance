import { render, screen } from "@testing-library/react";
import Page from "./page";
import { getTask } from "@/services/tasks/api";
import { getProject } from "@/services/project/api";
import { createClient } from "@/lib/supabase/server";

jest.mock("@/services/tasks/api");
jest.mock("@/services/project/api");
jest.mock("@/lib/supabase/server");

describe("Page component", () => {
  it("renders task details correctly", async () => {
    const taskId = "test-task-id";
    const projectId = "test-project-id";
    const task = {
      id: taskId,
      title: "Test Task",
      issueNumber: 123,
      prNumber: 456,
      notes: "Test notes",
    };
    const project = {
      id: projectId,
      ownerLogin: "test-owner",
      name: "test-repo",
    };

    (getTask as jest.Mock).mockResolvedValue({ data: task });
    (getProject as jest.Mock).mockResolvedValue(project);
    (createClient as jest.Mock).mockReturnValue({});

    render(<Page params={{ taskId, projectId }} />);

    expect(await screen.findByText("Test Task")).toBeInTheDocument();
    expect(await screen.findByText("Test notes")).toBeInTheDocument();
  });

  it("renders 'Task not found' when task is not found", async () => {
    (getTask as jest.Mock).mockResolvedValue({ data: null });

    render(<Page params={{ taskId: "invalid-task-id", projectId: "test-project-id" }} />);

    expect(await screen.findByText("Task not found")).toBeInTheDocument();
  });

  it("renders 'Project not found' when project is not found", async () => {
    const taskId = "test-task-id";
    const projectId = "test-project-id";
    const task = {
      id: taskId,
      title: "Test Task",
      issueNumber: 123,
      prNumber: 456,
      notes: "Test notes",
    };

    (getTask as jest.Mock).mockResolvedValue({ data: task });
    (getProject as jest.Mock).mockResolvedValue(null);

    render(<Page params={{ taskId, projectId }} />);

    expect(await screen.findByText("Project not found")).toBeInTheDocument();
  });
});
