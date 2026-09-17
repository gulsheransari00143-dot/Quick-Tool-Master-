import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

describe("QuickToolMaster shell", () => {
  it("renders primary navigation", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tools/i })).toBeInTheDocument();
  });

  it("renders an accessible tool card", () => {
    render(<ToolCard name="Image Compressor" description="Compress images locally." href="/tools/image-compressor" />);
    expect(screen.getByRole("link", { name: /image compressor/i })).toHaveAttribute("href", "/tools/image-compressor");
  });

  it("renders footer landmarks", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
