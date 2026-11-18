// A single, structured record of every documented software price change
// we've flagged across SoloStack's reviews. Each entry must trace back
// to a specific claim already made (and dated) in an existing review —
// this file aggregates facts stated elsewhere, it never introduces a
// new pricing claim on its own. Add to this list whenever a review
// documents a new price change; that's the whole point of this page —
// it should compound in value the longer the site runs.

export const priceChanges = [
  {
    tool: "1Password",
    change: "Raised prices roughly 33%",
    date: "2026-03",
    detail:
      "1Password's individual/family pricing rose to bring it to around $36/year, widening the gap with Bitwarden's roughly $10/year premium plan.",
    direction: "up",
    slug: "1password-vs-bitwarden-freelancers",
  },
  {
    tool: "Kit (ConvertKit)",
    change: "Paid tiers increased meaningfully",
    date: "2026-09",
    detail:
      "Kit's paid pricing tiers rose in September 2026 — worth checking against current published pricing rather than assuming older comparisons hold.",
    direction: "up",
    slug: "mailchimp-vs-kit-convertkit-freelancers",
  },
  {
    tool: "QuickBooks",
    change: "Raised prices roughly 10-15% annually since 2023",
    date: "2026",
    detail:
      "QuickBooks has raised prices annually since 2023, with a further increase in 2026 — expect the renewal price a year or two out to run well above the promotional signup rate.",
    direction: "up",
    slug: "xero-vs-quickbooks-freelancers",
  },
  {
    tool: "Xero",
    change: "Entry plan price nearly doubled since 2021",
    date: "2026",
    detail:
      "Xero's entry-level plan price has nearly doubled since 2021, one of the steeper multi-year increases we've tracked in the accounting category.",
    direction: "up",
    slug: "xero-vs-quickbooks-freelancers",
  },
  {
    tool: "Hootsuite",
    change: "Dropped its free plan entirely",
    date: "2026",
    detail:
      "Hootsuite removed its free tier and now starts at $99/user/month — repositioning around agencies and marketing teams rather than solo freelancers.",
    direction: "up",
    slug: "best-social-media-scheduling-tools-freelance-social-media-managers",
  },
  {
    tool: "Podia",
    change: "Dropped its free plan",
    date: "2026",
    detail:
      "Podia removed its free tier in 2026, changing the entry-level math for freelancers testing out course sales for the first time.",
    direction: "up",
    slug: "best-online-course-platforms-freelancers",
  },
  {
    tool: "Teachable",
    change: "Dropped its free plan",
    date: "2026",
    detail:
      "Teachable removed its free tier in 2026, the same shift Podia made — both course platforms now require a paid plan from day one.",
    direction: "up",
    slug: "best-online-course-platforms-freelancers",
  },
  {
    tool: "Loom",
    change: "Restructured pricing",
    date: "2026",
    detail:
      "Loom's 2026 pricing changes were significant enough to push a meaningful number of freelancers toward alternatives for quick, client-facing screen recordings.",
    direction: "up",
    slug: "best-loom-alternatives-async-video-clients",
  },
];

export function sortedByDate() {
  return [...priceChanges].sort((a, b) => (a.date < b.date ? 1 : -1));
}
