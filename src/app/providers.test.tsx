import { render, screen } from "@testing-library/react";
import Providers from "./providers";

describe("Providers component", () => {
  it("renders children correctly", () => {
    render(
      <Providers>
        <div>Test Child</div>
      </Providers>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
