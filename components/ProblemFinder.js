import Link from "next/link";
import { articles } from "../data/articles";
import { ALL_PROBLEMS } from "../lib/problems";

// Homepage entry point for visitors who arrive with a problem rather
// than a tool category in mind.
export default function ProblemFinder() {
  const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
  const featured = ALL_PROBLEMS.filter((p) => p.featured);
  return (
    <section className="section problem-section" aria-label="Fix a problem">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">Fix a problem</p>
            <h2>What are you trying to sort out?</h2>
          </div>
          <Link
            href="/problems"
            className="section-note"
            style={{ textDecoration: "underline" }}
          >
            See all {ALL_PROBLEMS.length} paths →
          </Link>
        </div>
        <div className="problem-grid">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/reviews/${p.steps[0]}`}
              className="problem-card"
            >
              <span className="problem-group">{p.group}</span>
              <span className="problem-question">{p.question}</span>
              <span className="problem-go">
                {bySlug[p.steps[0]]?.category === "Fix It"
                  ? "Short answer first"
                  : "Start with the guide"}
                {p.steps.length > 1
                  ? `, then ${p.steps.length - 1} more →`
                  : " →"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
