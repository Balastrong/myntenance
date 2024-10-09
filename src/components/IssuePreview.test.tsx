import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IssuePreview } from "./IssuePreview";
import { getClientOctokit } from "@/lib/github/client";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { CircleX } from "lucide-react";
import Link from "next/link";

jest.mock("@/lib/github/client");

const queryClient = new QueryClient();

describe("IssuePreview component", () => {
  const mockIssue = {
    user: {
      avatar_url: "https://example.com/avatar.png",
      login: "testuser",
    },
    state: "open",
    number: 123,
    title: "Test Issue",
    html_url: "https://github.com/test/repo/issues/123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getClientOctokit.mockReturnValue({
      rest: {
        issues: {
          get: jest.fn().mockResolvedValue({ data: mockIssue }),
        },
      },
    });
  });

  it("renders children correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <IssuePreview issueNumber={123} repositoryFullName="test/repo">
          <div>Test Child</div>
        </IssuePreview>
      </QueryClientProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("displays issue details on hover", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <IssuePreview issueNumber={123} repositoryFullName="test/repo">
          <div>Test Child</div>
        </IssuePreview>
      </QueryClientProvider>
    );

    const trigger = screen.getByText("Test Child");
    trigger.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

    await waitFor(() => {
      expect(screen.getByText("@testuser")).toBeInTheDocument();
      expect(screen.getByText("#123: Test Issue")).toBeInTheDocument();
      expect(screen.getByText("View")).toBeInTheDocument();
    });
  });

  it("calls onUnassign when Unassign button is clicked", async () => {
    const onUnassign = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <IssuePreview
          issueNumber={123}
          repositoryFullName="test/repo"
          onUnassign={onUnassign}
        >
          <div>Test Child</div>
        </IssuePreview>
      </QueryClientProvider>
    );

    const trigger = screen.getByText("Test Child");
    trigger.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

    await waitFor(() => {
      expect(screen.getByText("Unassign")).toBeInTheDocument();
    });

    const unassignButton = screen.getByText("Unassign");
    unassignButton.click();

    expect(onUnassign).toHaveBeenCalled();
  });
});
