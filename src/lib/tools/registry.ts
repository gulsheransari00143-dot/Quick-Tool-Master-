import type { ToolDefinition } from "./types";
import type { ToolCategory } from "./types";

const tools: ToolDefinition[] = [
  ["Image Compressor", "image-compressor", "file-tools", "Reduce image file size while keeping quality useful for web and sharing.", "🗜️"],
  ["Image Resizer", "image-resizer", "file-tools", "Resize images to exact dimensions directly in your browser.", "📐"],
  ["JPG PNG WebP Converter", "image-converter", "file-tools", "Convert common image formats locally without uploading your files.", "🖼️"],
  ["PDF to JPG", "pdf-to-jpg", "file-tools", "Turn PDF pages into JPG images with browser-first processing.", "📄"],
  ["QR Code Generator", "qr-code-generator", "generators", "Create QR codes for links, text, and useful contact information.", "▦"],
  ["JSON Formatter & Validator", "json-formatter", "developer", "Format, validate, and inspect JSON quickly with readable output.", "{ }"],
  ["Base64 Encode Decode", "base64", "developer", "Encode or decode Base64 text quickly in your browser.", "⇄"],
  ["Percentage Calculator", "percentage-calculator", "calculators", "Calculate percentages, changes, discounts, and proportions instantly.", "%"],
  ["Age Calculator", "age-calculator", "calculators", "Calculate age precisely from a date of birth and a target date.", "🎂"],
  ["Unit Converter", "unit-converter", "calculators", "Convert common length, weight, temperature, and volume units.", "↔"],
].map(([name, slug, category, description, icon]) => ({
  name, slug, category: category as ToolDefinition["category"], description, icon,
  seoTitle: `${name} - Free Online Tool | QuickToolMaster`,
  seoDescription: `${description} Free, fast, mobile-friendly, and designed for easy use worldwide.`,
  processingMode: "browser", relatedTools: [],
}));

export const toolRegistry = tools;
export const getToolBySlug = (slug: string) => tools.find((tool) => tool.slug === slug);

export function getToolsByCategory(category: ToolCategory) {
  return toolRegistry.filter((tool) => tool.category === category);
}
