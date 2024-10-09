import { render, screen } from "@testing-library/react";
import TaskDetailComponent from "./TaskDetail";
import { getServerOctokit } from "@/lib/github/server";
import { Task } from "@/lib/supabase/types";

jest.mock("@/lib/github/server");

describe("TaskDetailComponent", () => {
  const task: Task = {
    id: 1,
    title: "Test Task",
    issueNumber: 123,
    prNumber: 456,
    notes: "Test notes",
  };

  const repositoryFullName = "test-owner/test-repo";

  it("renders issue details correctly", async () => {
    const issue = {
      number: 123,
      title: "Test Issue",
      state: "open",
      user: { login: "test-user", avatar_url: "test-avatar-url" },
      labels: [],
      html_url: "test-issue-url",
    };

    (getServerOctokit as jest.Mock).mockReturnValue({
      rest: {
        issues: {
          get: jest.fn().mockResolvedValue({ data: issue }),
        },
      },
    });

    render(<TaskDetailComponent task={task} repositoryFullName={repositoryFullName} />);

    expect(await screen.findByText(`#${issue.number} ${issue.title}`)).toBeInTheDocument();
    expect(await screen.findByText(`@${issue.user.login}`)).toBeInTheDocument();
  });

  it("renders pull request details correctly", async () => {
    const pullRequest = {
      number: 456,
      title: "Test PR",
      state: "open",
      user: { login: "test-user", avatar_url: "test-avatar-url" },
      labels: [],
      html_url: "test-pr-url",
    };

    (getServerOctokit as jest.Mock).mockReturnValue({
      rest: {
        issues: {
          get: jest.fn().mockResolvedValue({ data: pullRequest }),
        },
      },
    });

    render(<TaskDetailComponent task={task} repositoryFullName={repositoryFullName} />);

    expect(await screen.findByText(`#${pullRequest.number} ${pullRequest.title}`)).toBeInTheDocument();
    expect(await screen.findByText(`@${pullRequest.user.login}`)).toBeInTheDocument();
  });

  it("renders 'Assign Issue' when issue is not assigned", async () => {
    const taskWithoutIssue = { ...task, issueNumber: null };

    render(<TaskDetailComponent task={taskWithoutIssue} repositoryFullName={repositoryFullName} />);

    expect(await screen.findByText("Assign Issue")).toBeInTheDocument();
  });

  it("renders 'Assign Pull Request' when pull request is not assigned", async () => {
    const taskWithoutPR = { ...task, prNumber: null };

    render(<TaskDetailComponent task={taskWithoutPR} repositoryFullName={repositoryFullName} />);

    expect(await screen.findByText("Assign Pull Request")).toBeInTheDocument();
  });

  it("renders task notes correctly", async () => {
    render(<TaskDetailComponent task={task} repositoryFullName={repositoryFullName} />);

    expect(await screen.findByText("Task Notes")).toBeInTheDocument();
    expect(await screen.findByText(task.notes)).toBeInTheDocument();
  });
});
