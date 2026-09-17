import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryGrid from "@/components/CategoryGrid";
import RecentlyUsed from "@/components/RecentlyUsed";

describe("homepage discovery", () => {
  it("shows the main tool categories", () => {
    render(<CategoryGrid />);
    expect(screen.getByRole("link", { name: /calculators/i })).toHaveAttribute("href", "/calculators");
    expect(screen.getByRole("link", { name: /developer/i })).toHaveAttribute("href", "/developer");
    expect(screen.getByRole("link", { name: /generators/i })).toHaveAttribute("href", "/generators");
  });

  it("renders recently used heading without browser-only access during initial render", () => {
    render(<RecentlyUsed />);
    expect(screen.getByRole("heading", { name: /recently used/i })).toBeInTheDocument();
  });
});
