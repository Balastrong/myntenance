import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ActivityCalendar } from "./ActivityCalendar";

describe("ActivityCalendar", () => {
  const mockData = [
    { date: "2023-01-01", count: 1 },
    { date: "2023-01-02", count: 2 },
    { date: "2023-01-03", count: 3 },
  ];

  it("renders correctly with light theme", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ActivityCalendar data={mockData} />
      </ThemeProvider>
    );

    expect(screen.getByText("6 commits in the last 3 days")).toBeInTheDocument();
  });

  it("renders correctly with dark theme", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ActivityCalendar data={mockData} />
      </ThemeProvider>
    );

    expect(screen.getByText("6 commits in the last 3 days")).toBeInTheDocument();
  });

  it("does not render when data is empty", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ActivityCalendar data={[]} />
      </ThemeProvider>
    );

    expect(screen.queryByText("commits in the last")).not.toBeInTheDocument();
  });
});
