import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";
import { priceChanges, sortedByDate } from "../../data/priceChanges";

export const metadata = {
  title: "Freelance Software Price Change Tracker | SoloStack",
  description:
    "Every documented price increase, dropped free plan, or pricing restructure we've flagged across our freelancer software reviews — tracked in one place, updated as we find more.",
  alternates: { canonical: `${SITE_URL}/price-tracker` },
  openGraph: {
    title: "Freelance Software Price Change Tracker",
    description:
      "Documented price increases and dropped free plans across freelancer software, tracked across every SoloStack review.",
  },
};

export default function PriceTrackerPage() {
  const entries = sortedByDate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "SoloStack Freelance Software Price Change Tracker",
    description:
      "A tracked record of documented price increases, dropped free plans, and pricing restructures across software commonly used by freelancers.",
    url: `${SITE_URL}/price-tracker`,
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
        <h1>Freelance Software Price Change Tracker</h1>
        <p>
          Every review on this site gets re-checked against current
          pricing before publishing — this page is what that adds up to
          over time. Whenever a review documents a tool raising prices,
          dropping a free plan, or restructuring how it charges, it gets
          logged here too, in one place, dated and linked back to the
          full review. Nobody else appears to be tracking this
          specifically for freelancer-relevant software; as far as we
          can tell, this list only exists here.
        </p>
        <p>
          This is a running log, not a finished report — it grows every
          time a re-check turns up a change. Currently tracking{" "}
          <strong>{entries.length}</strong> documented price changes.
        </p>

        <div className="price-tracker-list">
          {entries.map((entry, i) => (
            <div className="price-tracker-entry" key={i}>
              <div className="price-tracker-entry-header">
                <span className="price-tracker-date">{entry.date}</span>
                <span
                  className={`price-tracker-direction price-tracker-direction-${entry.direction}`}
                >
                  {entry.direction === "up" ? "↑" : "↓"}
                </span>
                <span className="price-tracker-tool">{entry.tool}</span>
              </div>
              <p className="price-tracker-change">{entry.change}</p>
              <p className="price-tracker-detail">{entry.detail}</p>
              <Link
                href={`/reviews/${entry.slug}`}
                className="price-tracker-link"
              >
                Read the full review →
              </Link>
            </div>
          ))}
        </div>

        <h2>How this list is built</h2>
        <p>
          Every entry here traces back to a specific, dated claim
          already made in one of our reviews — this page doesn't
          introduce new pricing claims of its own, it just collects
          them in one place instead of leaving them scattered across 70+
          separate articles. See our{" "}
          <Link href="/methodology">Methodology page</Link> for how we
          verify pricing in the first place. If you've noticed a price
          change we haven't logged yet, <Link href="/contact">let us know</Link>.
        </p>
      </div>
    </main>
  );
}
