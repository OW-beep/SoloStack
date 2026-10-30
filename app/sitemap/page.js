import Link from "next/link";
import { articles } from "../../data/articles";
import { SITE_URL } from "../../lib/site-config";
import { getCategorySlug } from "../../lib/categories";

export const metadata = {
  title: "Sitemap | SoloStack",
  description:
    "Every page on SoloStack in one place: guides by topic, research pages, and site information.",
  alternates: { canonical: `${SITE_URL}/sitemap` },
};

const SITE_PAGES = [
  ["/", "Home"],
  ["/problems", "Fix a problem: guided paths"],
  ["/author", "About the author"],
  ["/about", "About SoloStack"],
  ["/methodology", "Methodology and corrections"],
  ["/price-tracker", "Price change tracker"],
  ["/ai-cost-report", "AI toolkit cost report"],
  ["/contact", "Contact"],
  ["/privacy", "Privacy policy"],
  ["/terms", "Terms of service"],
];

export default function SitemapPage() {
  const order = [];
  const grouped = {};
  for (const a of articles) {
    if (!grouped[a.category]) {
      grouped[a.category] = [];
      order.push(a.category);
    }
    grouped[a.category].push(a);
  }
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>Sitemap</h1>
        <p>
          Every guide on SoloStack, grouped by topic. For the machine-readable
          version, see the{" "}
          <a href="/sitemap.xml">XML sitemap</a>; new guides also appear in the{" "}
          <a href="/feed.xml">RSS feed</a>.
        </p>

        <h2>Site</h2>
        <ul className="sitemap-list">
          {SITE_PAGES.map(([href, label]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        {order.map((category) => (
          <section key={category}>
            <h2>
              <Link href={`/category/${getCategorySlug(category)}`}>
                {category}
              </Link>{" "}
              <span className="sitemap-count">({grouped[category].length})</span>
            </h2>
            <ul className="sitemap-list">
              {[...grouped[category]]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((a) => (
                  <li key={a.slug}>
                    <Link href={`/reviews/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
