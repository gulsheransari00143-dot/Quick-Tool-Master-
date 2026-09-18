import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { toolRegistry } from "@/lib/tools/registry";
export default function PopularTools() { return <section className="section shell popular-section" aria-labelledby="popular-tools-heading"><div className="section-heading"><div><span className="section-kicker">QUICK PICKS</span><h2 id="popular-tools-heading">Popular tools</h2><p>Useful utilities for the tasks you do most often.</p></div><Link className="section-link" href="/tools">View all tools <span>→</span></Link></div><div className="tool-grid">{toolRegistry.slice(0, 6).map((tool) => <ToolCard key={tool.slug} {...tool} href={`/tools/${tool.slug}`} />)}</div></section>; }
