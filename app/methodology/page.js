import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Methodology | SoloStack",
  description:
    "How SoloStack researches and compares software: sources, criteria, update policy, and corrections.",
  alternates: { canonical: `${SITE_URL}/methodology` },
};

export default function MethodologyPage() {
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>Methodology</h1>
        <p>
          This page explains, specifically, how we put comparisons
          together — what we look at, where the information comes from,
          and what we don't claim.
        </p>

        <h2>Where our information comes from</h2>
        <p>
          Comparisons on this site are built from each provider's own
          pricing pages, product documentation, help-center articles, and
          other publicly available information, cross-checked across more
          than one source rather than taken from a single page. This is
          research-based reporting. We're upfront that it isn't long-term,
          first-hand testing of every plan on every tool listed — we don't
          claim to have personally run every subscription for months at a
          time, and we won't manufacture "we tested this" claims or staged
          screenshots to imply otherwise. Where we do have direct,
          sustained experience with a specific tool, the article says so
          explicitly rather than implying it by default across the site.
        </p>

        <h2>What we compare on</h2>
        <p>
          The specific criteria shift slightly by category (an invoicing
          tool and a password manager aren't judged on the same axes), but
          every guide is built around the same underlying questions:
        </p>
        <ul>
          <li>
            What does the free tier actually include, and — just as
            importantly — what does it specifically exclude?
          </li>
          <li>
            Is pricing structured sensibly for one person, or does it
            assume a team and a per-seat model that doesn't fit solo use?
          </li>
          <li>
            What's the realistic switching cost — can you export your data
            cleanly if you leave?
          </li>
          <li>
            Where does a tool's marketing claim and its actual behavior
            diverge, based on documentation, changelogs, and user-reported
            experience?
          </li>
        </ul>
        <p>
          Each article's own "What matters" section states the specific
          criteria used for that comparison, rather than relying on a
          generic scoring rubric applied identically everywhere.
        </p>

        <h2>How current the information is</h2>
        <p>
          Every article displays a "last checked" date. Software pricing
          and free-tier limits in this industry change often, sometimes
          within weeks of us publishing. That date reflects exactly what
          it says — the last time we verified the details in that article
          — not a guarantee that nothing has changed since. Always confirm
          current pricing directly on a provider's site before making a
          decision based on something you read here.
        </p>

        <h2>Corrections</h2>
        <p>
          If you spot something outdated, or think we got a comparison
          wrong, tell us — see our <Link href="/contact">Contact page</Link>.
          We aim to fix verified errors as soon as we can rather than only
          on a scheduled review cycle, and we'd rather hear about a mistake
          than have it sit uncorrected.
        </p>

        <h2>Editorial independence and affiliate links</h2>
        <p>
          We don't accept payment to include a tool, rank it higher, or
          soften a criticism, and we don't publish sponsored write-ups
          authored by a vendor. Some links on this site are affiliate
          links — SoloStack may earn a commission if you sign up for a
          product through them, at no extra cost to you — and pages may
          display advertising. Neither changes what we write: when a tool
          has a real limitation, we say so even in the article where it's
          the top pick, which is why our guides are framed around "best
          for" a specific situation rather than a single universal winner.
          See our <Link href="/about">About page</Link> for more on why
          this site exists in the first place.
        </p>
      </div>
    </main>
  );
}
