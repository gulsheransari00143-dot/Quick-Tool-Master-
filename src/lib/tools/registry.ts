import type { ToolDefinition, ToolCategory } from "./types";

const tools: ToolDefinition[] = [
["Image Compressor","image-compressor","file-tools","Reduce image file size while keeping quality useful for web and sharing.","🗜️"],
["Image Resizer","image-resizer","file-tools","Resize images to exact dimensions directly in your browser.","📐"],
["JPG PNG WebP Converter","image-converter","file-tools","Convert common image formats locally without uploading your files.","🖼️"],
["PDF to JPG","pdf-to-jpg","file-tools","Turn PDF pages into JPG images with browser-first processing.","📄"],
["QR Code Generator","qr-code-generator","generators","Create QR codes for links, text, and useful contact information.","▦"],
["JSON Formatter & Validator","json-formatter","developer","Format, validate, and inspect JSON quickly with readable output.","{ }"],
["Base64 Encode Decode","base64","developer","Encode or decode Base64 text quickly in your browser.","⇄"],
["Percentage Calculator","percentage-calculator","calculators","Calculate percentages, changes, discounts, and proportions instantly.","%"],
["Age Calculator","age-calculator","calculators","Calculate age precisely from a date of birth and a target date.","🎂"],
["Unit Converter","unit-converter","calculators","Convert common length, weight, temperature, and volume units.","↔"],
["AI Prompt Builder","ai-prompt-builder","ai-tools","Build structured prompts for writing, coding, study, and creative AI tasks.","✦"],
["AI Prompt Improver","ai-prompt-improver","ai-tools","Turn a rough idea into a clearer, more structured AI prompt.","🪄"],
["AI Prompt Library","ai-prompt-library","ai-tools","Browse ready-to-copy prompts for common AI workflows.","📚"],
["Resume Template","resume-template","templates","Create a clean plain-text resume template you can copy or download.","📄"],
["Invoice Template","invoice-template","templates","Create a simple reusable invoice template with editable fields.","🧾"],
["Meeting Notes Template","meeting-notes-template","templates","Create structured meeting notes with decisions and action items.","📝"],
["Tic Tac Toe","tic-tac-toe","games","Play a quick two-player Tic Tac Toe game in your browser.","⭕"],
["Number Guess","number-guess","games","Guess the hidden number in as few attempts as possible.","🎯"],
["Reaction Timer","reaction-timer","games","Test your reaction speed with a simple tap challenge.","⚡"],
["Science Q&A","science-qa","science","Ask science questions and get clear answers across physics, chemistry, biology, space, and general science.","🔬"],
["Excel & CSV Viewer","excel-csv-viewer","excel-tools","Open Excel and CSV files in your browser and inspect spreadsheet data.","📊"],
["Print & Print Preview","print-preview","printer-tools","Create a print-ready document with A4, A5, Letter, portrait, and landscape options.","🖨️"],
].map(([name,slug,category,description,icon])=>({name,slug,category:category as ToolCategory,description,icon,seoTitle:`${name} - Free Online Tool | QuickToolMaster`,seoDescription:`${description} Free, fast, mobile-friendly, and designed for easy use worldwide.`,processingMode:"browser" as const,relatedTools:[]}));

export const toolRegistry = tools;
export const getToolBySlug = (slug:string) => tools.find(t=>t.slug===slug);
export function getToolsByCategory(category:ToolCategory){ return toolRegistry.filter(t=>t.category===category); }
