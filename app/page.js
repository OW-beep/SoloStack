import Link from "next/link";
import { articles } from "../data/articles";

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

      <section className="section" id="reviews">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">The catalog</p>
              <h2>Latest reviews</h2>
            </div>
            <p className="section-note">
              Every guide is re-checked against current pricing before
              publishing.
            </p>
          </div>

          <div className="card-grid">
            {articles.map((article) => (
              <Link
                href={`/reviews/${article.slug}`}
                className="tag-card"
                key={article.slug}
              >
                <div className="tag-card-top">
                  <span className="tag-category">{article.category}</span>
                  <span className="tag-count">
                    {article.toolsCompared} tools
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
    </main>
  );
}
