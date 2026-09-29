import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getToolsByCategory, toolRegistry } from "@/lib/tools/registry";
import CategoryToolGroups, { groupTools } from "@/components/CategoryToolGroups";
import { toolMetadata, siteUrl } from "@/lib/seo";
import ToolWorkspace from "@/components/ToolWorkspace";
import RecentToolTracker from "@/components/RecentToolTracker";


export const dynamic = "force-static";

export function generateStaticParams() {
  return [...toolRegistry.map((tool) => ({ slug: tool.slug })), { slug: "calculator" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  if (slug === "calculator") return { title: "Calculator | Quick Tool Master", description: "Free calculators for percentage, age, unit conversion and everyday calculations.", alternates: { canonical: "/tools/calculator" } };
  const tool = getToolBySlug(slug);
  return tool ? toolMetadata(tool) : { title: "Tool not found | Quick Tool Master" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  if (slug === "calculator") {
    const tools = getToolsByCategory("calculators");
    return <main className="section shell"><p className="eyebrow">Calculator</p><h1>Free Calculators</h1><p>Choose a calculator below for quick everyday calculations.</p><section className="mt-8 max-w-3xl"><h2 className="text-2xl font-semibold">Calculator tools</h2><p className="mt-2 text-[var(--muted)]">Percentage, age, unit conversion and other practical calculators.</p></section><CategoryToolGroups category="calculators" tools={tools} /></main>;
  }
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const imageSrc = `/tool-art/${tool.slug}.svg`;
  const toolUrl = `${siteUrl}/tools/${tool.slug}`;
  const categoryLabel = tool.category.replaceAll("-", " ");
  const categoryGroups = groupTools(tool.category, getToolsByCategory(tool.category));
  const toolGroup = categoryGroups.find((group) => group.tools.some((candidate) => candidate.slug === tool.slug));
  const relatedTools = getToolsByCategory(tool.category).filter((candidate) => candidate.slug !== tool.slug).slice(0, 6);
  const seoGuide = {
    "prepayment": {
      heading: "Loan prepayment calculator: what it helps you compare",
      paragraphs: [
        "A loan prepayment calculator compares the effect of an extra monthly payment on your remaining loan schedule. Enter the outstanding loan amount, annual interest rate, remaining tenure, and the extra amount you plan to pay each month.",
        "The result shows an estimated new tenure, interest paid, and months saved. Use the figures to compare a regular repayment plan with a plan that includes additional monthly payments; your lender's actual schedule, fees, and prepayment rules can change the final result.",
      ],
      tips: ["Try several extra-payment amounts to compare how the estimated tenure changes.", "Use the remaining loan balance and remaining tenure rather than the original loan values.", "Check lender terms for prepayment charges, rate changes, and how extra payments are applied."],
    },
    "random-token": {
      heading: "Random token generator: generate tokens online",
      paragraphs: [
        "This random token generator creates hexadecimal tokens directly in your browser. Choose a token length and run the tool when you need a quick random value for testing, development, or temporary identifiers.",
        "For production authentication secrets, API credentials, or other security-sensitive values, use your platform's recommended cryptographic secret-generation facilities and protect the resulting secret appropriately.",
      ],
      tips: ["Choose a longer token when you need more possible values.", "Generate separate tokens instead of reusing one value across services.", "Do not publish a token that is being used as a real secret or credential."],
    },
    "average-calculator": {
      heading: "Arithmetic mean calculator: calculate an average",
      paragraphs: [
        "Use this arithmetic mean calculator to find the average of a list of numbers. Enter values such as 10, 20, and 30, then run the tool to calculate their arithmetic mean.",
        "The arithmetic mean is the sum of the values divided by the number of values. It is useful for quick comparisons of scores, measurements, prices, or other numeric lists when an ordinary average is appropriate.",
      ],
      tips: ["Enter the complete set of values you want included in the average.", "Check whether an outlier could make the arithmetic mean less representative.", "For a different type of average, use the statistic that matches your data and purpose."],
    },
  } as const;
  const guide = seoGuide[tool.slug as keyof typeof seoGuide];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        url: toolUrl,
        description: tool.seoDescription,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Quick Tool Master", item: siteUrl },
          { "@type": "ListItem", position: 2, name: categoryLabel, item: `${siteUrl}/${tool.category}` },
          ...(toolGroup ? [{ "@type": "ListItem", position: 3, name: toolGroup.title, item: `${siteUrl}/${tool.category}/${toolGroup.slug}` }] : []),
          { "@type": "ListItem", position: toolGroup ? 4 : 3, name: tool.name, item: toolUrl }
        ]
      }
    ]
  };
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="tool-detail-card rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7">
        <RecentToolTracker slug={tool.slug} />
        <div className="tool-detail-hero">
          <img src={imageSrc} alt={`${tool.name} illustration`} width={800} height={560} />
        </div>
        <div className="tool-detail-heading">
          <span className="tool-detail-icon" aria-hidden="true">{tool.icon}</span>
          <div>
            <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
              <Link href={`/${tool.category}`}>{categoryLabel}</Link>
              {toolGroup ? <> <span aria-hidden="true"> / </span><Link href={`/${tool.category}/${toolGroup.slug}`} className="capitalize">{toolGroup.title}</Link></> : null}
            </nav>
            <h1 className="mt-1 text-4xl font-bold tracking-tight">{tool.name}</h1>
            <p className="mt-3 text-[var(--muted)]">{tool.description}</p>
          </div>
        </div>
        <ToolWorkspace slug={tool.slug} />

        {guide && (
          <section className="mt-10 border-t border-[var(--border)] pt-8" aria-labelledby="search-intent-guide">
            <h2 id="search-intent-guide" className="text-2xl font-semibold">{guide.heading}</h2>
            {guide.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-[var(--muted)]">{paragraph}</p>)}
            <h3 className="mt-6 text-xl font-semibold">Practical tips</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--muted)]">
              {guide.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </section>
        )}

        {(["us-sales-tax-calculator", "mortgage-calculator", "gpa-calculator", "salary-to-hourly"].includes(tool.slug)) && (
          <section className="mt-10 border-t border-[var(--border)] pt-8" aria-labelledby="us-use-case">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">US calculator hub</p>
            <Link href="/us-calculators" className="font-semibold">Browse all US calculators →</Link>
            <h2 id="us-use-case" className="text-2xl font-semibold">Using this calculator in the United States</h2>
            <p className="mt-3 text-[var(--muted)]">
              This free calculator is designed for common U.S. use cases and works in a mobile or desktop browser. Results are estimates based on the values you enter and should be checked against the applicable lender, school, employer, or local tax authority when an official figure is required.
            </p>
          </section>
        )}

        <section className="mt-10 border-t border-[var(--border)] pt-8" aria-labelledby="about-tool">
          <h2 id="about-tool" className="text-2xl font-semibold">About {tool.name}</h2>
          <p className="mt-3 text-[var(--muted)]">
            {tool.description} This free browser-based tool is designed for quick results on desktop and mobile.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">How to use {tool.name}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-[var(--muted)]">
            <li>Enter or select the information required by the tool.</li>
            <li>Run the calculation, conversion, generation, or processing action.</li>
            <li>Review the result and copy or download it when the tool provides an output option.</li>
          </ol>
        </section>

        <nav className="mt-10 border-t border-[var(--border)] pt-8" aria-labelledby="related-tools">
          <h2 id="related-tools" className="text-2xl font-semibold">Related {categoryLabel} tools</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedTools.map((related) => (
              <Link
                key={related.slug}
                href={`/tools/${related.slug}`}
                className="rounded-2xl border border-[var(--border)] p-4 transition hover:-translate-y-0.5"
              >
                <span className="font-semibold">{related.name}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">{related.description}</span>
              </Link>
            ))}
          </div>
        </nav>
      </article>
    </main>
  );
}
