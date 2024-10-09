import { render, screen } from "@testing-library/react";
import Home from "./page";
import { createClient } from "@/lib/supabase/server";
import { getMyntenanceRepository } from "@/lib/github/api";
import { getServerOctokit } from "@/lib/github/server";
import { createAdminClient } from "@/lib/supabase/serverAdmin";
import { getSiteMeta } from "@/services/meta";

jest.mock("@/lib/supabase/server");
jest.mock("@/lib/github/api");
jest.mock("@/lib/github/server");
jest.mock("@/lib/supabase/serverAdmin");
jest.mock("@/services/meta");

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Hero component", async () => {
    createClient().auth.getUser.mockResolvedValue({ data: { user: null } });
    getMyntenanceRepository.mockResolvedValue({
      stargazers_count: 0,
      forks_count: 0,
    });
    getSiteMeta.mockResolvedValue({ projectsCount: 0, usersCount: 0 });

    render(await Home());

    expect(screen.getByText("Hero")).toBeInTheDocument();
  });

  it("renders TrustedBy component with correct data", async () => {
    createClient().auth.getUser.mockResolvedValue({ data: { user: null } });
    getMyntenanceRepository.mockResolvedValue({
      stargazers_count: 123,
      forks_count: 456,
    });
    getSiteMeta.mockResolvedValue({ projectsCount: 789, usersCount: 1011 });

    render(await Home());

    expect(screen.getByText("123 stars")).toBeInTheDocument();
    expect(screen.getByText("456 forks")).toBeInTheDocument();
    expect(screen.getByText("789 projects")).toBeInTheDocument();
    expect(screen.getByText("1011 users")).toBeInTheDocument();
  });
});
