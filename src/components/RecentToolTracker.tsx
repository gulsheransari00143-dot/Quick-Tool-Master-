"use client";
import { useEffect } from "react";

const KEY = "quicktoolmaster:recent-tools";

export default function RecentToolTracker({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const old = JSON.parse(localStorage.getItem(KEY) || "[]") as string[];
      localStorage.setItem(KEY, JSON.stringify([slug, ...old.filter((item) => item !== slug)].slice(0, 8)));
    } catch {
      // Storage may be unavailable in private/restricted browser contexts.
    }
  }, [slug]);
  return null;
}
