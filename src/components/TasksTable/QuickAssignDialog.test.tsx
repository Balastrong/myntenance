import { render, screen, fireEvent } from "@testing-library/react";
import { QuickAssignDialog } from "./QuickAssignDialog";
import { TaskIssueSelector } from "../TaskIssueSelector";
import { TaskPullRequestSelector } from "../TaskPullRequestSelector";

jest.mock("../TaskIssueSelector", () => ({
  TaskIssueSelector: jest.fn(() => <div>Mocked TaskIssueSelector</div>),
}));

jest.mock("../TaskPullRequestSelector", () => ({
  TaskPullRequestSelector: jest.fn(() => <div>Mocked TaskPullRequestSelector</div>),
}));

describe("QuickAssignDialog", () => {
  const repositoryFullName = "owner/repo";
  const taskId = 1;

  it("renders QuickAssignDialog for issue mode", () => {
    render(
      <QuickAssignDialog taskId={taskId} repositoryFullName={repositoryFullName} mode="issue">
        <button>Open Dialog</button>
      </QuickAssignDialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));

    expect(screen.getByText("Quick Assign Issue")).toBeInTheDocument();
    expect(screen.getByText("Mocked TaskIssueSelector")).toBeInTheDocument();
    expect(TaskIssueSelector).toHaveBeenCalledWith(
      { taskId, repositoryFullName },
      {}
    );
  });

  it("renders QuickAssignDialog for pr mode", () => {
    render(
      <QuickAssignDialog taskId={taskId} repositoryFullName={repositoryFullName} mode="pr">
        <button>Open Dialog</button>
      </QuickAssignDialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));

    expect(screen.getByText("Quick Assign Pull Request")).toBeInTheDocument();
    expect(screen.getByText("Mocked TaskPullRequestSelector")).toBeInTheDocument();
    expect(TaskPullRequestSelector).toHaveBeenCalledWith(
      { taskId, repositoryFullName },
      {}
    );
  });
});
