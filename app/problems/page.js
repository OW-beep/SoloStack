import Link from "next/link";
import { articles } from "../../data/articles";
import { SITE_URL } from "../../lib/site-config";
import { PROBLEM_GROUPS } from "../../lib/problems";

export const metadata = {
  title: "Fix a Freelance Problem: Step-by-Step Paths | SoloStack",
  description:
    "Start from the problem you have: a late payment, extra work, a missing receipt, an email address that won't work. Each path begins with a short answer and continues to the longer guides.",
  alternates: { canonical: `${SITE_URL}/problems` },
};

export default function ProblemsPage() {
  const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>Fix a freelance problem</h1>
        <p>
          Start from the problem you have, not the tool you think you need.
          Every path begins with a short answer, then continues to the longer
          guides if you want to compare options. Where I have run into the
          problem myself, the page says so.
        </p>
        {PROBLEM_GROUPS.map((g) => (
          <section key={g.title}>
            <h2>{g.title}</h2>
            {g.problems.map((p) => (
              <div className="problem-path" key={p.id}>
                <h3>{p.question}</h3>
                <ol>
                  {p.steps.map((s) => {
                    const a = bySlug[s];
                    if (!a) return null;
                    const kind =
                      a.category === "Fix It" ? "Short answer" : "Guide";
                    return (
                      <li key={s}>
                        <span className="problem-step-kind">{kind}</span>{" "}
                        <Link href={`/reviews/${s}`}>{a.title}</Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </section>
        ))}
        <p>
          Looking for something else? Browse the{" "}
          <Link href="/sitemap">full list of guides</Link>.
        </p>
      </div>
    </main>
  );
}
