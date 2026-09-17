import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="shell footer-inner">
        <div>
          <strong>QuickToolMaster</strong>
          <p>Fast, simple, privacy-friendly web tools.</p>
          <p className="footer-owner">Created &amp; maintained by <strong>Gulsher Ansari</strong>.</p>
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          <Link href="/tools">All tools</Link>
          <Link href="/calculators">Calculators</Link>
          <Link href="/developer">Developer tools</Link>
          <Link href="/generators">Generators</Link>
        </nav>
        <small>© {new Date().getFullYear()} QuickToolMaster · Gulsher Ansari</small>
      </div>
    </footer>
  );
}
