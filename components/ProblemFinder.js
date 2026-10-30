import Link from "next/link";
import { ALL_PROBLEMS } from "../lib/problems";

// Homepage entry point for visitors who arrive with a problem rather
// than a tool category in mind.
export default function ProblemFinder() {
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
            See every path →
          </Link>
        </div>
        <div className="problem-grid">
          {ALL_PROBLEMS.map((p) => (
            <Link
              key={p.id}
              href={`/reviews/${p.steps[0]}`}
              className="problem-card"
            >
              <span className="problem-group">{p.group}</span>
              <span className="problem-question">{p.question}</span>
              <span className="problem-go">
                Short answer, then {p.steps.length - 1} longer{" "}
                {p.steps.length - 1 === 1 ? "guide" : "guides"} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
