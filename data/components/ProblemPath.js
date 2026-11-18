import Link from "next/link";
import { articles } from "../data/articles";
import { findProblemsForArticle } from "../lib/problems";

// Shown at the end of an article that belongs to a problem path, so a
// reader who arrived with a problem can see the next step.
export default function ProblemPath({ slug }) {
  const problems = findProblemsForArticle(slug).slice(0, 2);
  if (problems.length === 0) return null;
  const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
  return (
    <section className="section" style={{ paddingTop: 0, paddingBottom: 12 }}>
      <div className="wrap">
        {problems.map((p) => (
          <aside className="problem-path" key={p.id}>
            <p className="section-eyebrow">Your next step</p>
            <h3>Dealing with: {p.question}</h3>
            <ol>
              {p.steps.map((s) => {
                const a = bySlug[s];
                if (!a) return null;
                const kind = a.category === "Fix It" ? "Short answer" : "Guide";
                return (
                  <li key={s} className={s === slug ? "is-current" : ""}>
                    <span className="problem-step-kind">{kind}</span>
                    {s === slug ? (
                      <span> {a.title} (you are here)</span>
                    ) : (
                      <Link href={`/reviews/${s}`}> {a.title}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </aside>
        ))}
      </div>
    </section>
  );
}
