import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";
import { aiCostCategories, totals } from "../../data/aiCostReport";

export const metadata = {
  title: "What an AI Freelance Toolkit Actually Costs (2026) | SoloStack",
  description:
    "A real monthly cost range for a freelancer's AI toolkit — one paid coding, presentation, video, and design tool — built entirely from entry-tier pricing confirmed in our own reviews.",
  alternates: { canonical: `${SITE_URL}/ai-cost-report` },
  openGraph: {
    title: "What an AI Freelance Toolkit Actually Costs",
    description:
      "A real monthly cost range for a freelancer's AI toolkit, built from entry-tier pricing confirmed across SoloStack's own reviews.",
  },
};

export default function AICostReportPage() {
  const { lowMonthly, highMonthly, lowAnnual, highAnnual } = totals();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "SoloStack AI Freelance Toolkit Cost Report",
    description:
      "A monthly cost range for a freelancer's AI toolkit across coding, presentations, video generation, and design, built from entry-tier pricing verified in SoloStack's own reviews.",
    url: `${SITE_URL}/ai-cost-report`,
    creator: {
      "@type": "Person",
      name: "Kosei Taki",
      url: `${SITE_URL}/author`,
    },
  };

  return (
    <main className="static-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap">
        <h1>What an AI Freelance Toolkit Actually Costs</h1>
        <p>
          "AI is changing everything" doesn't come with a monthly bill
          attached. This does. Below is the real entry-tier cost range
          for one paid tool in each of the four AI categories we've
          reviewed in depth — no averages pulled from outside surveys,
          every number traces directly back to a "starting paid price"
          already confirmed in the linked review.
        </p>

        <div className="cost-report-total">
          <div className="cost-report-total-figure">
            <span className="cost-report-total-label">Monthly range</span>
            <span className="cost-report-total-value">
              ${lowMonthly}–${highMonthly}
            </span>
          </div>
          <div className="cost-report-total-figure">
            <span className="cost-report-total-label">Annual range</span>
            <span className="cost-report-total-value">
              ${lowAnnual.toLocaleString()}–${highAnnual.toLocaleString()}
            </span>
          </div>
        </div>
        <p className="cost-report-caveat">
          This is one entry-tier tool per category, not every tool a
          freelancer needs — it's the AI layer specifically, on top of
          whatever invoicing, project management, and communication
          tools are already in the stack.
        </p>

        <div className="price-tracker-list">
          {aiCostCategories.map((c) => (
            <div className="price-tracker-entry" key={c.slug}>
              <div className="price-tracker-entry-header">
                <span className="price-tracker-tool">{c.category}</span>
              </div>
              <p className="price-tracker-change">
                ${c.low}–${c.high}/month
              </p>
              <p className="price-tracker-detail">
                Low end: {c.lowNote} · High end: {c.highNote}
              </p>
              <Link href={`/reviews/${c.slug}`} className="price-tracker-link">
                Read the full comparison →
              </Link>
            </div>
          ))}
        </div>

        <h2>Why this isn't a bigger number</h2>
        <p>
          A freelancer doesn't need one of every AI tool that exists —
          the freelancers we hear from tend to run one AI coding or
          writing assistant and pick up a second category (video,
          presentations, image generation) only when a specific client
          project calls for it. This report prices the categories we've
          reviewed in depth, not a maximalist "buy everything" stack
          nobody actually runs.
        </p>

        <h2>How this number will change</h2>
        <p>
          AI tool pricing moves faster than almost any other category we
          cover — see our{" "}
          <Link href="/price-tracker">Price Change Tracker</Link> for
          documented increases elsewhere on the site. As entry-tier
          pricing shifts in any of the four reviews above, this report
          gets updated to match — it's a living number, not a
          one-time snapshot.
        </p>
      </div>
    </main>
  );
}
