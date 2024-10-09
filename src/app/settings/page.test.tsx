import { render, screen } from "@testing-library/react";
import Settings from "./page";
import { getOwnProfile } from "@/services/profile/api";
import { getOwnSettings } from "@/services/settings/api";

jest.mock("@/services/profile/api");
jest.mock("@/services/settings/api");

describe("Settings component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    getOwnProfile.mockResolvedValue({ data: null });
    getOwnSettings.mockResolvedValue({ data: null });

    render(await Settings());

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders ProfileSettings component with correct data", async () => {
    const mockProfile = { fullName: "John Doe" };
    const mockSettings = { showPublicActivity: true };

    getOwnProfile.mockResolvedValue({ data: mockProfile });
    getOwnSettings.mockResolvedValue({ data: mockSettings });

    render(await Settings());

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name").value).toBe(mockProfile.fullName);
    expect(screen.getByLabelText("Show Activity").checked).toBe(mockSettings.showPublicActivity);
  });
});
