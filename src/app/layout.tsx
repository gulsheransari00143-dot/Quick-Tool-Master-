import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quick-tool-master.gulsheransari00143.workers.dev"),
  alternates: { canonical: "/" },
  title: { default: "QuickToolMaster — Free Online Tools", template: "%s | QuickToolMaster" },
  description: "Fast, simple, privacy-friendly online tools, calculators and utilities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
