"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header" role="banner">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="QuickToolMaster home">
          <span className="brand-mark">Q</span><span>QuickToolMaster</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/tools">Tools</Link><Link href="/calculators">Calculators</Link>
          <Link href="/developer">Developer</Link><Link href="/generators">Generators</Link>
        </nav>
        <div className="header-actions"><ThemeToggle />
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>Menu</button>
        </div>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav shell" aria-label="Mobile navigation">
        <Link href="/tools" onClick={() => setOpen(false)}>Tools</Link>
        <Link href="/calculators" onClick={() => setOpen(false)}>Calculators</Link>
        <Link href="/developer" onClick={() => setOpen(false)}>Developer</Link>
        <Link href="/generators" onClick={() => setOpen(false)}>Generators</Link>
      </nav>}
    </header>
  );
}
