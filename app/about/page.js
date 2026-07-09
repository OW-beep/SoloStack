export const metadata = {
  title: "About SoloStack",
  description:
    "Why SoloStack exists, how we review software, and how the site makes money.",
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
          Pricing and features change often in software. We date our guides
          and revisit them, but you should always confirm current pricing
          directly on a provider's site before subscribing.
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
