import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "About SoloStack",
  description:
    "Why SoloStack exists, how we review software, and how the site makes money.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>About SoloStack</h1>
        <p>
          SoloStack reviews the software freelancers and independent
          workers actually pay for — invoicing, project management, AI
          writing tools, time tracking, and accounting. Most product
          roundups online are written for teams and companies. We write for
          the one-person business instead: a freelancer choosing between a
          $0 plan and a $19/month plan, where the difference actually
          matters.
        </p>

        <h2>How we review</h2>
        <p>
          Every guide compares tools on pricing, free-plan limits, and the
          specific trade-offs that matter for solo, cross-border, or
          budget-conscious freelance work — not just a feature checklist.
          We call out where a "free" plan quietly costs more once you add
          the tools it doesn't include, and where a paid plan is worth it
          because it removes a task you'd otherwise do by hand.
        </p>
        <p>
          To be specific about our process: our comparisons are built from
          each provider's own pricing pages, product documentation, and
          publicly available information, cross-checked across multiple
          sources rather than taken from a single page. We're upfront that
          this is research-based reporting, not first-hand, long-term
          hands-on testing of every tool listed — we don't claim to have
          personally run every plan on this site for months at a time, and
          we won't pretend otherwise with staged screenshots or invented
          "we tested this" claims. Where we do have direct, sustained
          experience with a specific tool, we'll say so explicitly in that
          article rather than implying it everywhere by default.
        </p>
        <p>
          Every article lists a "last checked" date. Pricing, free-tier
          limits, and features in this industry change often — sometimes
          within weeks of us publishing — so treat that date as exactly
          what it says: the last time we verified the details, not a
          guarantee they haven't changed since. Always confirm current
          pricing directly on a provider's site before subscribing.
        </p>
        <p>
          If you spot something outdated or think we got a comparison
          wrong, we'd genuinely like to know — see our{" "}
          <Link href="/contact">Contact page</Link>. We correct verified
          errors as soon as we can, not just on a scheduled review cycle.
        </p>

        <h2>What we don't do</h2>
        <p>
          We don't accept payment to include a tool, rank it higher, or
          soften a criticism. We don't publish sponsored "reviews" written
          by a vendor. When a tool has a real limitation, we say so even in
          the article where it's the top pick — see the "best for" framing
          throughout our guides, which is deliberately about fit, not a
          single universal winner.
        </p>

        <h2>How this site makes money</h2>
        <p>
          SoloStack may earn a commission when you sign up for certain
          tools through links on this site, and pages may display
          advertising. Neither affects our comparisons: we don't accept
          payment for placement or ranking, and we name real drawbacks even
          for tools we link to.
        </p>

        <h2>Not financial or legal advice</h2>
        <p>
          Content on this site is for general informational purposes. It
          isn't tax, legal, or financial advice. For anything specific to
          your situation — VAT obligations, tax residency, contract terms —
          talk to a qualified professional.
        </p>
      </div>
    </main>
  );
}
