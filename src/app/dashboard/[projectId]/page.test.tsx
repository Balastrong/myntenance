import { render, screen } from "@testing-library/react";
import Page from "./page";
import { getProject } from "@/services/project/api";
import { getRepositoryDetails } from "@/lib/github/api";
import { createClient } from "@/lib/supabase/server";
import { getServerOctokit } from "@/lib/github/server";

jest.mock("@/services/project/api");
jest.mock("@/lib/github/api");
jest.mock("@/lib/supabase/server");
jest.mock("@/lib/github/server");

describe("Page component", () => {
  it("renders repository details correctly", async () => {
    const projectId = "test-project-id";
    const project = {
      id: projectId,
      ownerLogin: "test-owner",
      name: "test-repo",
      isFavourite: false,
      showInPublicProfile: false,
      notes: "Test notes",
    };
    const repository = {
      owner: { login: "test-owner", type: "User" },
      name: "test-repo",
      full_name: "test-owner/test-repo",
      private: false,
      stargazers_count: 10,
      open_issues_count: 5,
      forks_count: 3,
      language: "JavaScript",
      lastCommit: { commit: { author: { date: "2023-01-01T00:00:00Z" } } },
    };

    (getProject as jest.Mock).mockResolvedValue(project);
    (getRepositoryDetails as jest.Mock).mockResolvedValue(repository);
    (createClient as jest.Mock).mockReturnValue({});
    (getServerOctokit as jest.Mock).mockReturnValue({});

    render(<Page params={{ projectId }} searchParams={{}} />);

    expect(await screen.findByText("test-owner/test-repo")).toBeInTheDocument();
    expect(await screen.findByText("10")).toBeInTheDocument();
    expect(await screen.findByText("5")).toBeInTheDocument();
    expect(await screen.findByText("3")).toBeInTheDocument();
    expect(await screen.findByText("JavaScript")).toBeInTheDocument();
    expect(await screen.findByText("Test notes")).toBeInTheDocument();
  });

  it("renders 'Repository not found' when project is not found", async () => {
    (getProject as jest.Mock).mockResolvedValue(null);

    render(<Page params={{ projectId: "invalid-project-id" }} searchParams={{}} />);

    expect(await screen.findByText("Repository not found")).toBeInTheDocument();
  });

  it("renders 'Project not found' when repository is not found", async () => {
    const projectId = "test-project-id";
    const project = {
      id: projectId,
      ownerLogin: "test-owner",
      name: "test-repo",
      isFavourite: false,
      showInPublicProfile: false,
      notes: "Test notes",
    };

    (getProject as jest.Mock).mockResolvedValue(project);
    (getRepositoryDetails as jest.Mock).mockResolvedValue(null);

    render(<Page params={{ projectId }} searchParams={{}} />);

    expect(await screen.findByText("Project not found")).toBeInTheDocument();
  });
});
