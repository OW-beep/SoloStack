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
          Finding the right piece of software is harder than it should be.
          Most comparison articles online either repeat a vendor's own
          marketing copy back at you, or bury the one detail that actually
          matters — a free-tier limit, a per-seat pricing model, a
          currency markup — somewhere past the tenth paragraph.
        </p>
        <p>
          SoloStack exists to do that differently, specifically for
          freelancers and independent workers rather than teams or
          companies. We write for a freelancer deciding between a $0 plan
          and a $19/month plan, where the difference actually changes how
          the tool fits — not for a procurement team comparing enterprise
          contracts.
        </p>

        <h2>How we review</h2>
        <p>
          Every guide compares tools on pricing, free-plan limits, and the
          trade-offs that matter for solo, cross-border, or
          budget-conscious freelance work — not just a feature checklist.
          We go into more detail on exactly how on our{" "}
          <Link href="/methodology">Methodology page</Link>, including
          where our information comes from, what we don't claim, and how
          to report something that's outdated or wrong.
        </p>

        <h2>Who writes this</h2>
        <p>
          SoloStack is written by <Link href="/author">Kosei Taki</Link>, an
          independent developer and former IT consultant. Experience
          includes enterprise consulting as well as independent project
          work, and that background shapes how each comparison gets
          built — see the <Link href="/author">full author page</Link>{" "}
          for more on his approach.
        </p>

        <h2>How this site makes money</h2>
        <p>
          SoloStack may earn a commission when you sign up for certain
          tools through links on this site, and pages may display
          advertising. Neither affects our comparisons: we don't accept
          payment for placement or ranking, and we name real drawbacks
          even for tools we link to.
        </p>

        <h2>Not financial or legal advice</h2>
        <p>
          Content on this site is for general informational purposes. It
          isn't tax, legal, or financial advice. For anything specific to
          your situation — VAT obligations, tax residency, contract terms
          — talk to a qualified professional.
        </p>
      </div>
    </main>
  );
}
