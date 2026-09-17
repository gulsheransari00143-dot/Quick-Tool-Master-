import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function GamesPage() { const tools = getToolsByCategory("games"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Mini Games</h1><p>Quick interactive games and puzzles for a short break.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
