import type { ToolDefinition } from "./types";

export function searchTools(
  tools: ToolDefinition[],
  query: string,
  category?: ToolDefinition["category"],
) {
  const normalized = query.trim().toLowerCase();
  return tools.filter((tool) => {
    const categoryMatch = !category || tool.category === category;
    if (!normalized) return categoryMatch;
    const haystack = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
    return categoryMatch && haystack.includes(normalized);
  });
}
