"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { const saved = localStorage.getItem("qtm-theme"); const isDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.dataset.theme = isDark ? "dark" : "light"; }, []);
  const toggle = () => { const next = !dark; setDark(next); localStorage.setItem("qtm-theme", next ? "dark" : "light"); document.documentElement.dataset.theme = next ? "dark" : "light"; };
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle theme">{dark ? "☀" : "☾"}</button>;
}
