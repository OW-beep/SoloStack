import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";
import { priceChanges, sortedByDate } from "../../data/priceChanges";
import { priceChecks } from "../../data/priceChecks";

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
          Software prices change often, so this page keeps two records. The
          first is a dated log of prices I checked directly on each
          provider's own pricing page. The second is price changes that our
          reviews have documented: a tool raising prices, dropping a free
          plan, or restructuring how it charges.
        </p>

        <h2>Prices checked directly</h2>
        <p>
          Each entry shows what the provider's pricing page said on the date
          given, with a link to that page. These are U.S. list prices unless
          noted, and prices shown by the provider can differ by region,
          currency and promotion, so confirm on the provider's page before
          you buy.
        </p>
        <div className="verified-list">
          {priceChecks.map((c) => (
            <div className="verified-entry" key={c.service}>
              <div className="verified-head">
                <span className="verified-service">{c.service}</span>
                <span className="verified-date">checked {c.checkedOn}</span>
              </div>
              <ul>
                {c.prices.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="verified-limits">{c.limits}</p>
              {c.note ? <p className="verified-note">{c.note}</p> : null}
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                Official pricing page →
              </a>
            </div>
          ))}
        </div>

        <h2>Documented price changes</h2>
        <p>
          This is a running log, not a finished report. Currently tracking{" "}
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
          Entries in the first section come from direct checks of the
          provider's pricing page, on the date shown. Entries in the
          price-change list trace back to a dated claim made in one of our
          reviews and have not each been re-checked since, so use them as
          pointers and confirm on the provider's page. See our{" "}
          <Link href="/methodology">Methodology page</Link> for how we
          verify pricing in the first place. If you've noticed a price
          change we haven't logged yet, <Link href="/contact">let us know</Link>.
        </p>
      </div>
    </main>
  );
}
