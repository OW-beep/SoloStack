import Link from "next/link";
import { articles } from "../data/articles";
import { SITE_URL } from "../lib/site-config";
import { getCategorySlug } from "../lib/categories";
import AuthorStrip from "../components/AuthorStrip";
import TrustPanel from "../components/TrustPanel";
import ArticleCard from "../components/ArticleCard";
import { START_HERE_SLUGS, FIRST_HAND_SLUGS } from "../lib/featured";

export const metadata = {
  alternates: { canonical: SITE_URL },
};

// Only guides that actually compare software count toward "tools
// compared" (checklists count questions and Freelance Life pieces
// count sources, which are not tools).
const NON_TOOL_CATEGORIES = ["Guides", "Freelance Life"];
const toolsComparedTotal = articles
  .filter((a) => !NON_TOOL_CATEGORIES.includes(a.category))
  .reduce((sum, a) => sum + a.toolsCompared, 0);

export default function HomePage() {
  return (
    <main>
      <AuthorStrip />
      <section className="hero">
        <div className="wrap">
          <p className="hero-eyebrow">Freelance software, compared solo</p>
          <h1>Software reviews for freelancers who work alone.</h1>
          <p>
            SoloStack compares the invoicing, project management, and AI
            tools freelancers actually pay for, using real pricing and
            documentation — and says plainly when a write-up comes from my
            own use of a tool.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="num">{articles.length}</span>
              <span className="label">In-depth guides</span>
            </div>
            <div className="hero-stat">
              <span className="num">
                {toolsComparedTotal}
              </span>
              <span className="label">Tools compared</span>
            </div>
            <div className="hero-stat">
              <span className="num">0</span>
              <span className="label">Sponsored placements</span>
            </div>
          </div>
        </div>
      </section>

      <div className="tape" aria-hidden="true">
        <div className="tape-marquee">
          {[
            "Real pricing",
            "No sponsored rankings",
            "Updated for 2026",
            "0 sponsored placements",
            `${toolsComparedTotal} tools compared`,
            "Pricing checked before publishing",
          ].map((phrase, i) => (
            <span className="tape-inner" key={i}>
              {phrase}
            </span>
          ))}
        </div>
      </div>

      <TrustPanel />

      <section className="section start-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">Start here</p>
              <h2>Guides written from my own experience</h2>
            </div>
            <p className="section-note">
              These draw on work I have done myself, and each one says where.
            </p>
          </div>
          <div className="card-grid">
            {START_HERE_SLUGS.map((slug) => articles.find((a) => a.slug === slug))
              .filter(Boolean)
              .map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
          </div>
        </div>
      </section>

      <section className="section research-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">Original data</p>
              <h2>Research you won't find anywhere else</h2>
            </div>
            <p className="section-note">
              Built from our own reviews, not outside surveys — and
              updated as the underlying pricing changes.
            </p>
          </div>
          <div className="research-grid">
            <Link href="/price-tracker" className="research-card">
              <span className="research-card-eyebrow">Live tracker</span>
              <h3>Freelance Software Price Change Tracker</h3>
              <p>
                Every documented price increase or dropped free plan
                we've flagged across our reviews, aggregated in one
                place and growing over time.
              </p>
              <span className="research-card-cta">View the data →</span>
            </Link>
            <Link href="/ai-cost-report" className="research-card">
              <span className="research-card-eyebrow">Cost report</span>
              <h3>What an AI Freelance Toolkit Actually Costs</h3>
              <p>
                A real monthly cost range across coding, presentation,
                video, and design AI tools — built entirely from
                entry-tier pricing confirmed in our own reviews.
              </p>
              <span className="research-card-cta">View the report →</span>
            </Link>
          </div>
        </div>
      </section>

      {(() => {
        // Group by category, preserving first-seen order so new
        // categories don't jump around as articles get added.
        const order = [];
        const grouped = {};
        for (const a of articles) {
          if (!grouped[a.category]) {
            grouped[a.category] = [];
            order.push(a.category);
          }
          grouped[a.category].push(a);
        }
        const VISIBLE = 3;
        const rank = (a) => (FIRST_HAND_SLUGS.has(a.slug) ? 1 : 0);

        return (
          <>
            <section className="section browse-section" id="reviews">
              <div className="wrap">
                <div className="section-head">
                  <div>
                    <p className="section-eyebrow">The catalog</p>
                    <h2>Browse {articles.length} guides by topic</h2>
                  </div>
                  <p className="section-note">
                    Or use the search at the top of the page.
                  </p>
                </div>
                <nav className="chip-nav" aria-label="Topics">
                  {order.map((category) => (
                    <a
                      key={category}
                      href={`#topic-${getCategorySlug(category)}`}
                      className="chip"
                    >
                      {category}
                      <span className="chip-count">
                        {grouped[category].length}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </section>

            {order.map((category) => {
              const sorted = [...grouped[category]].sort(
                (a, b) =>
                  rank(b) - rank(a) || b.date.localeCompare(a.date)
              );
              const shown = sorted.slice(0, VISIBLE);
              const rest = sorted.slice(VISIBLE);
              return (
                <section
                  className="section topic-section"
                  id={`topic-${getCategorySlug(category)}`}
                  key={category}
                >
                  <div className="wrap">
                    <div className="section-head">
                      <div>
                        <p className="section-eyebrow">Topic</p>
                        <h2>{category}</h2>
                      </div>
                      <Link
                        href={`/category/${getCategorySlug(category)}`}
                        className="section-note"
                        style={{ textDecoration: "underline" }}
                      >
                        About this category →
                      </Link>
                    </div>
                    <div className="card-grid">
                      {shown.map((article) => (
                        <ArticleCard article={article} key={article.slug} />
                      ))}
                    </div>
                    {rest.length > 0 ? (
                      <details className="cat-more">
                        <summary>
                          Show all {sorted.length} {category} guides
                        </summary>
                        <div className="card-grid">
                          {rest.map((article) => (
                            <ArticleCard article={article} key={article.slug} />
                          ))}
                        </div>
                      </details>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </>
        );
      })()}
    </main>
  );
}
