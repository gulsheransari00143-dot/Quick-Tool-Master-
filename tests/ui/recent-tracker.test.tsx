import { render } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import RecentToolTracker from "@/components/RecentToolTracker";

describe("RecentToolTracker", () => {
  beforeEach(() => localStorage.clear());

  it("stores the opened tool in recent tools", async () => {
    render(<RecentToolTracker slug="json-formatter" />);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(JSON.parse(localStorage.getItem("quicktoolmaster:recent-tools") || "[]")).toContain("json-formatter");
  });
});
