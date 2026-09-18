export type ToolCategory =
  | "file-tools"
  | "calculators"
  | "developer"
  | "generators"
  | "ai-tools"
  | "templates"
  | "games"
  | "science"
  | "excel-tools";

export type ProcessingMode = "browser" | "server";

export interface ToolDefinition {
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  processingMode: ProcessingMode;
  relatedTools: string[];
}
