import Link from "next/link";
import { articles, countLabelShort } from "../data/articles";
import { SITE_URL } from "../lib/site-config";

export const metadata = {
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="hero-eyebrow">Freelance software, tested solo</p>
          <h1>Software reviews for people who work alone.</h1>
          <p>
            SoloStack tests the invoicing, project management, and AI tools
            freelancers actually pay for — so you don't have to install six
            trials to find one that's worth keeping.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="num">{articles.length}</span>
              <span className="label">In-depth guides</span>
            </div>
            <div className="hero-stat">
              <span className="num">
                {articles.reduce((sum, a) => sum + a.toolsCompared, 0)}+
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
          {Array.from({ length: 6 }).map((_, i) => (
            <span className="tape-inner" key={i}>
              Real pricing · No sponsored rankings · Updated for 2026
            </span>
          ))}
        </div>
      </div>

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

        return order.map((category, i) => (
          <section
            className="section"
            id={i === 0 ? "reviews" : undefined}
            key={category}
            style={i > 0 ? { paddingTop: 0 } : undefined}
          >
            <div className="wrap">
              <div className="section-head">
                <div>
                  <p className="section-eyebrow">
                    {i === 0 ? "The catalog" : category}
                  </p>
                  <h2>{i === 0 ? "Latest reviews" : `More on ${category.toLowerCase()}`}</h2>
                </div>
                {i === 0 && (
                  <p className="section-note">
                    Every guide is re-checked against current pricing before
                    publishing.
                  </p>
                )}
              </div>

              <div className="card-grid">
                {grouped[category].map((article) => (
                  <Link
                    href={`/reviews/${article.slug}`}
                    className="tag-card"
                    key={article.slug}
                  >
                    <div className="tag-card-top">
                      <span className="tag-category">{article.category}</span>
                      <span className="tag-count">
                        {countLabelShort(article)}
                      </span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.dek}</p>
                    <div className="tag-card-footer">
                      <span className="verdict-chip">{article.verdict}</span>
                      <span className="read-time">{article.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ));
      })()}
    </main>
  );
}
