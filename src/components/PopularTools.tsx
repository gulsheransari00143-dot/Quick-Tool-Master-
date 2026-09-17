import ToolCard from "@/components/ToolCard";
import { toolRegistry } from "@/lib/tools/registry";
export default function PopularTools() { return <section className="section shell" aria-labelledby="popular-tools-heading"><div className="section-heading"><div><h2 id="popular-tools-heading">Popular tools</h2><p>Start with our most useful everyday utilities.</p></div></div><div className="tool-grid">{toolRegistry.slice(0, 6).map((tool) => <ToolCard key={tool.slug} {...tool} href={`/tools/${tool.slug}`} />)}</div></section>; }
