import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { keywordCategories } from "@/lib/keyword-categories";
import { categoryIntent } from "@/lib/keyword-categories";
import { toolRegistry } from "@/lib/tools/registry";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return keywordCategories.map((item) => ({ slug: item.slug }));
}

function getCategory(slug: string) {
  return keywordCategories.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCategory(slug);
  if (!item) return {};
  return {
    title: item.name + " Search Keywords | Quick Tool Master",
    description: item.description + " Explore keyword examples, search modifiers, questions and QTM tool opportunities.",
    alternates: { canonical: "/search-keywords/" + item.slug },
  };
}

function questionFor(item: (typeof keywordCategories)[number]) {
  return [
    "What are the most common " + item.name.toLowerCase() + " searches?",
    "How do people search for " + item.name.toLowerCase() + " online?",
    "What tools can help with " + item.name.toLowerCase() + " searches?",
    "Which modifiers add intent to " + item.name.toLowerCase() + " keywords?",
  ];
}

export default async function KeywordCategoryPage({ params }: Props) {
  const { slug } = await params;
  const item = getCategory(slug);
  if (!item) notFound();

  const index = keywordCategories.findIndex((x) => x.slug === item.slug) + 1;
  const toolHints: Record<string, string[]> = {
    review: ["review", "reviews"], shopping: ["product", "price", "shopping"], food: ["food", "restaurant"],
    finance: ["calculator", "emi", "gst", "interest"], banking: ["bank", "upi"], technology: ["ai", "app", "phone"],
    ai: ["ai", "prompt"], documents: ["pdf", "document"], images: ["image", "jpg", "png"],
    videos: ["video"], audio: ["audio", "mp3"], qr: ["qr"], calculator: ["calculator"], converter: ["converter", "convert"],
    generator: ["generator", "generate"], "password-security": ["password", "security", "hash"],
    "web-development": ["json", "url", "regex", "html", "css"], productivity: ["template", "notes"],
    science: ["science", "physics", "bmi"], education: ["gpa", "education"], automotive: ["car", "vehicle"],
  };
  const hints = toolHints[item.slug] ?? item.keywords.slice(0, 3);
  const matchedTools = toolRegistry.filter((tool) => {
    const hay = (tool.name + " " + tool.slug + " " + tool.description).toLowerCase();
    return hints.some((hint) => hay.includes(hint.toLowerCase()));
  }).slice(0, 8);

  const primaryKeyword = item.keywords[0] ?? item.name.toLowerCase();
  const searchPlaybook = [
    { title: "Discover", query: primaryKeyword + " near me", note: "Use a location modifier when the search depends on a nearby place or service." },
    { title: "Compare", query: "best " + primaryKeyword + " reviews", note: "Add comparison language when the goal is to evaluate options before choosing." },
    { title: "Act", query: "free online " + primaryKeyword + " tool", note: "Action and tool modifiers signal that the visitor wants to do something, not only read." },
    { title: "Time", query: primaryKeyword + " today", note: "Freshness modifiers are useful when availability, price, events or current information matters." },
  ];

  const related = keywordCategories
    .filter((x) => x.slug !== item.slug)
    .map((x) => {
      const a = new Set(item.keywords.map((k) => k.toLowerCase()));
      const b = new Set(x.keywords.map((k) => k.toLowerCase()));
      const overlap = [...a].filter((k) => b.has(k)).length;
      const exampleOverlap = item.examples.reduce((score, ex) => {
        const tokens = ex.toLowerCase().split(/\s+/);
        return score + (tokens.some((t) => [...b].some((k) => k.includes(t) || t.includes(k))) ? 1 : 0);
      }, 0);
      return { item: x, score: overlap * 3 + exampleOverlap };
    })
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .slice(0, 4)
    .map(({ item: x }) => x);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Search Keywords", item: "/search-keywords" },
      { "@type": "ListItem", position: 3, name: item.name + " Search Keywords", item: "/search-keywords/" + item.slug },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: item.name + " QTM Tools",
    itemListElement: matchedTools.map((tool, i) => ({ "@type": "ListItem", position: i + 1, name: tool.name, url: "/tools/" + tool.slug })),
  };

  return (
    <main className="keyword-detail-page">
      <Script id="keyword-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {matchedTools.length > 0 && <Script id="keyword-tools-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />}
      <section className="keyword-detail-hero">
        <Link href="/search-keywords" className="keyword-back">← All keyword categories</Link>
        <div className="keyword-detail-icon"><img src={item.thumbnail} alt={item.name + " category artwork"} /></div>
        <p className="eyebrow">SEARCH INTENT • CATEGORY {index}</p>
        <h1>{item.name} Search Keywords</h1>
        <p className="keyword-catch">{item.catch}</p>
        <p>{item.description}</p>
      </section>

      <section className="keyword-detail-grid">
        <article className="keyword-detail-panel">
          <h2>What this search intent means</h2>
          <p>This category groups searches around the same underlying need. A keyword can be informational, commercial, local, navigational or action-focused depending on its modifiers.</p>
          <div className="keyword-intent-callout"><b>Category-specific intent</b><p>{categoryIntent[item.slug]}</p></div>
          <h3>Core keywords</h3>
          <div className="keyword-chip-list">
            {item.keywords.map((keyword) => <span key={keyword} className="keyword-chip">{keyword}</span>)}
          </div>
        </article>

        <article className="keyword-detail-panel">
          <h2>Intent paths for this category</h2>
          <div className="keyword-chip-list">
            {item.intentModes.map((mode) => <span key={mode} className="keyword-chip">{mode}</span>)}
          </div>
          <h3>Useful next steps</h3>
          <ul className="keyword-example-list">
            {item.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
          </ul>
        </article>

        <article className="keyword-detail-panel">
          <h2>Real search examples</h2>
          <ul className="keyword-example-list">
            {item.examples.map((example) => <li key={example}>{example}</li>)}
          </ul>
        </article>
      </section>

      <section className="keyword-detail-panel">
        <h2>QTM tools for this search intent</h2>
        <p>These live QTM tools are connected to this keyword intent so visitors can move from search idea to an actual utility.</p>
        <div className="keyword-index-grid">
          {matchedTools.map((tool) => (
            <Link key={tool.slug} href={"/tools/" + tool.slug} className="keyword-home-card">
              <span className="keyword-home-icon">{tool.icon}</span>
              <b>{tool.name}</b>
              <span>{tool.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="keyword-detail-panel">
        <h2>Questions people may ask</h2>
        <div className="keyword-question-grid">
          {questionFor(item).map((question) => <div className="keyword-question-card" key={question}>{question}</div>)}
        </div>
      </section>

      <section className="keyword-detail-panel">
        <h2>Frequently asked questions</h2>
        <div className="keyword-question-grid">
          {item.faq.map((question) => <div className="keyword-question-card" key={question}>{question}</div>)}
        </div>
      </section>

      <section className="keyword-detail-panel">
        <h2>Search playbook for {item.name}</h2>
        <p>Start with the core topic, then add a modifier that matches the visitor's actual goal. The examples below turn a broad keyword into clearer search intent.</p>
        <div className="keyword-guide-grid">
          {searchPlaybook.map((step) => (
            <div key={step.title}><b>{step.title}</b><p>{step.query}</p><small>{step.note}</small></div>
          ))}
        </div>
      </section>

      <section className="keyword-detail-panel">
        <h2>How to expand this category</h2>
        <div className="keyword-guide-grid">
          <div><b>1. Add location</b><p>{item.keywords[0]} near me</p></div>
          <div><b>2. Add comparison</b><p>best {item.keywords[0]} reviews</p></div>
          <div><b>3. Add action</b><p>free online {item.keywords[0]} tool</p></div>
          <div><b>4. Add urgency</b><p>{item.keywords[0]} today / open now</p></div>
        </div>
      </section>

      <section className="keyword-related">
        <h2>Explore related search intents</h2>
        <div className="keyword-index-grid">
          {related.map((relatedItem) => (
            <Link key={relatedItem.slug} href={"/search-keywords/" + relatedItem.slug} className="keyword-home-card">
              <img className="keyword-related-art" src={relatedItem.thumbnail} alt="" loading="lazy" />
              <b>{relatedItem.name}</b>
              <span>{relatedItem.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
