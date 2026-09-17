import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("QuickToolMaster foundation", () => {
  it("has a Next.js package manifest", () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
    );
    expect(manifest.dependencies.next).toBeDefined();
    expect(manifest.dependencies.react).toBeDefined();
  });

  it("defines the root App Router page", () => {
    expect(fs.existsSync(path.join(process.cwd(), "src/app/page.tsx"))).toBe(true);
  });
});
