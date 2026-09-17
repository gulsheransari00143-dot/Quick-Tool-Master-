# QuickToolMaster Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the scalable QuickToolMaster Next.js foundation and first 10 working tools from the approved architecture.

**Architecture:** Next.js App Router with TypeScript and Tailwind CSS, using a registry-driven tool catalog, shared responsive shell, dedicated SEO routes, browser-first processing, and Cloudflare-compatible deployment. Interactive browser APIs stay in client components; static metadata and page structure stay server-rendered.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, React, Vitest/Testing Library for focused logic/UI tests, npm.

**Spec:** docs/superpowers/specs/2026-09-17-quick-tool-master-design.md

## Global Constraints

- Next.js App Router and TypeScript are required.
- Tailwind CSS is the styling system.
- Server Components are the default; Client Components are only for interactivity/browser APIs.
- Cloudflare is the primary deployment target; avoid unnecessary provider-specific coupling.
- Prefer browser-local processing for files/calculations and do not upload user files by default.
- English-first, mobile-first, accessible UI with light/dark mode.
- Every public tool has a stable SEO-friendly route and metadata.
- Initial launch contains 10 working tools: Image Compressor, Image Resizer, JPG/PNG/WebP Converter, PDF to JPG, QR Code Generator, JSON Formatter & Validator, Base64 Encode/Decode, Percentage Calculator, Age Calculator, Unit Converter.
- No accounts, mandatory subscriptions, default server file storage, complex CMS, or multiplayer infrastructure in the foundation.

---

### Task 1: Project Scaffold and Baseline

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, public metadata assets as needed.
- Create: `tests/smoke/` for baseline tests.

**Interfaces:**
- Produces the runnable Next.js App Router project consumed by every later task.

- [ ] **Step 1: Write failing smoke tests** for the expected root route and basic project metadata.
- [ ] **Step 2: Run the smoke tests and confirm failure because the app does not yet exist.**
- [ ] **Step 3: Create the Next.js TypeScript/Tailwind scaffold and minimal root layout/page.**
- [ ] **Step 4: Run typecheck, lint, and smoke tests; confirm they pass.**
- [ ] **Step 5: Commit as `feat: scaffold QuickToolMaster foundation`.**
### Task 2: Shared Design System and Responsive Shell

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileNav.tsx`.
- Create: `src/components/ui/ToolCard.tsx`, `src/components/ui/ThemeToggle.tsx`, `src/components/ui/SearchInput.tsx`.
- Modify: `src/app/globals.css`, `src/app/layout.tsx`.
- Test: `tests/ui/`.

**Interfaces:**
- `ToolCard` consumes registry tool metadata and links to the tool route.
- `ThemeToggle` controls the light/dark preference without blocking first paint.
- `SearchInput` accepts a controlled query and is reusable on home/category pages.

- [ ] **Step 1: Write failing component tests for navigation labels, theme toggle presence, accessible ToolCard links, and responsive shell landmarks.**
- [ ] **Step 2: Run the component tests and confirm failure.**
- [ ] **Step 3: Implement the shared shell and UI primitives with mobile-first Tailwind classes.**
- [ ] **Step 4: Run component tests, lint, and typecheck; confirm pass.**
- [ ] **Step 5: Commit as `feat: add responsive QuickToolMaster shell`.**

### Task 3: Registry, Categories, Search, and SEO Foundation

**Files:**
- Create: `src/lib/tools/types.ts`, `src/lib/tools/registry.ts`, `src/lib/tools/categories.ts`, `src/lib/tools/search.ts`.
- Create: `src/app/tools/page.tsx`, `src/app/tools/[slug]/page.tsx`.
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`.
- Create: `src/lib/seo.ts`.
- Test: `tests/tools/registry.test.ts`, `tests/tools/search.test.ts`.

**Interfaces:**
- `ToolDefinition` contains `name`, `slug`, `category`, `description`, `icon`, `seoTitle`, `seoDescription`, `processingMode`, `relatedTools`, and optional FAQ/schema content.
- `toolRegistry` is the single source of truth for public tools.
- Search consumes `readonly ToolDefinition[]` and returns stable relevance-ordered matches.

- [ ] **Step 1: Write failing registry/search tests covering unique slugs, category filtering, and case-insensitive search.**
- [ ] **Step 2: Run tests and confirm failure.**
- [ ] **Step 3: Implement typed registry/category/search modules and dedicated tool route conventions.**
- [ ] **Step 4: Add metadata generation, sitemap, robots, canonical URLs where appropriate, and semantic headings.**
- [ ] **Step 5: Run tests, lint, typecheck, and build; confirm pass.**
- [ ] **Step 6: Commit as `feat: add tool registry and SEO foundation`.**
### Task 4: Homepage and Category Experience

**Files:**
- Modify: `src/app/page.tsx`.
- Create: `src/app/calculators/page.tsx`, `src/app/developer/page.tsx`, `src/app/generators/page.tsx`, `src/app/ai-tools/page.tsx`, `src/app/templates/page.tsx`, `src/app/games/page.tsx`.
- Create: `src/components/home/Hero.tsx`, `src/components/home/CategoryGrid.tsx`, `src/components/home/PopularTools.tsx`, `src/components/home/RecentlyUsed.tsx`.
- Test: `tests/home/`.

**Interfaces:**
- Homepage/category pages consume only registry/category data and reusable components.
- Recently used data is browser-local and optional; absence of local storage must not break rendering.

- [ ] **Step 1: Write failing page tests for hero, search entry, category cards, and flagship tool cards.**
- [ ] **Step 2: Run tests and confirm failure.**
- [ ] **Step 3: Implement the homepage and category pages with the approved premium utility-dashboard layout.**
- [ ] **Step 4: Add localStorage-backed recently-used tracking only in a client component and keep initial rendering server-safe.**
- [ ] **Step 5: Run tests, lint, typecheck, and build; confirm pass.**
- [ ] **Step 6: Commit as `feat: build homepage and category experience`.**

### Task 5: First 5 Browser-Local Tools

**Files:**
- Create: `src/lib/tools/image-compressor.ts`, `src/lib/tools/image-resizer.ts`, `src/lib/tools/image-converter.ts`, `src/lib/tools/pdf-to-jpg.ts`, `src/lib/tools/qr-code.ts`.
- Create corresponding UI under `src/app/tools/[slug]/` or focused client components under `src/components/tools/`.
- Add registry entries for these tools.
- Test: `tests/tools/image-*.test.ts`, `tests/tools/pdf-to-jpg.test.ts`, `tests/tools/qr-code.test.ts`.

**Interfaces:**
- File tools process selected browser files locally and return Blob/object URLs or downloadable results without uploading source files.
- Image utilities accept browser `File` objects and explicit output options.
- QR generation accepts a text payload and returns a browser-renderable/downloadable QR image.

- [ ] **Step 1: Write failing unit tests for compression option validation, resize dimensions, supported image conversion formats, PDF page conversion contract, and QR payload validation.**
- [ ] **Step 2: Run tests and confirm failure.**
- [ ] **Step 3: Implement minimal browser-local tool engines and accessible UIs.**
- [ ] **Step 4: Verify large-file and unsupported-format errors are presented without crashes.**
- [ ] **Step 5: Run focused tests, lint, typecheck, and build; confirm pass.**
- [ ] **Step 6: Commit as `feat: add file and QR flagship tools`.**
### Task 6: Developer and Calculator Tools

**Files:**
- Create: `src/lib/tools/json-formatter.ts`, `src/lib/tools/base64.ts`, `src/lib/tools/percentage.ts`, `src/lib/tools/age.ts`, `src/lib/tools/unit-converter.ts`.
- Create corresponding tool pages/components.
- Add registry entries and related-tool metadata.
- Test: `tests/tools/json-formatter.test.ts`, `tests/tools/base64.test.ts`, `tests/tools/calculators.test.ts`, `tests/tools/unit-converter.test.ts`.

**Interfaces:**
- JSON formatter returns either normalized JSON or a structured validation error without throwing on malformed input.
- Base64 encode/decode uses explicit UTF-8 text semantics and reports invalid input.
- Percentage calculator exposes deterministic pure functions for common percentage calculations.
- Age calculator accepts two dates and returns years/months/days consistently using calendar-aware arithmetic.
- Unit converter exposes typed conversion tables for supported unit families.

- [ ] **Step 1: Write failing tests for valid and invalid JSON, Base64 round trips/errors, percentage cases, age boundaries, and unit conversions.**
- [ ] **Step 2: Run tests and confirm failure.**
- [ ] **Step 3: Implement pure utility functions before connecting them to client UI.**
- [ ] **Step 4: Add accessible interactive pages and copy/download controls where relevant.**
- [ ] **Step 5: Run focused tests, lint, typecheck, and build; confirm pass.**
- [ ] **Step 6: Commit as `feat: add developer and calculator flagship tools`.**

### Task 7: Integration, Accessibility, Cloudflare Readiness, and Final Verification

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, tool/category pages only where integration fixes are required.
- Create/update: `README.md`, deployment configuration/docs, and end-to-end smoke tests.

**Interfaces:**
- All 10 tools resolve through the registry and have stable routes, metadata, and navigation links.
- Build output must remain compatible with the selected Cloudflare deployment approach without introducing unnecessary platform lock-in.

- [ ] **Step 1: Write failing integration tests asserting all 10 registry entries resolve to public routes and core navigation/search links.**
- [ ] **Step 2: Run the integration tests and confirm failure where gaps exist.**
- [ ] **Step 3: Fix integration, accessibility, metadata, mobile layout, and error-state gaps.**
- [ ] **Step 4: Run full test suite, lint, typecheck, and production build.**
- [ ] **Step 5: Verify the generated sitemap/robots output and Cloudflare deployment configuration.**
- [ ] **Step 6: Commit as `chore: verify QuickToolMaster foundation`.**

## Verification Commands

Run from the project root after implementation:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

A task is complete only when its focused tests and required static checks pass. The final branch is complete only after the full suite, lint, typecheck, and production build pass.
