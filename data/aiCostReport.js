// A cost report built entirely from entry-tier pricing already
// confirmed and published in specific SoloStack reviews — every number
// here traces back to a "Starting paid price" or named top-pick price
// stated in the linked article. This file doesn't estimate or average
// anything from outside sources; it only aggregates what we've already
// verified ourselves. Update the relevant number here whenever the
// source review's pricing changes (and log the change on
// /price-tracker if it's a real increase, not just a correction).

export const aiCostCategories = [
  {
    category: "AI coding assistant",
    low: 10,
    high: 20,
    lowNote: "GitHub Copilot Individual",
    highNote: "Cursor Pro or Claude Pro (includes Claude Code)",
    slug: "claude-code-vs-cursor-vs-github-copilot-freelance-developers",
  },
  {
    category: "AI presentation / pitch deck tool",
    low: 9,
    high: 15,
    lowNote: "Gamma Plus",
    highNote: "Beautiful.ai Pro",
    slug: "best-ai-presentation-tools-freelance-consultants",
  },
  {
    category: "AI video generation",
    low: 8,
    high: 25,
    lowNote: "Kling entry tier",
    highNote: "Runway Standard",
    slug: "best-ai-video-generation-tools-freelance-creators",
  },
  {
    category: "AI design / image tool",
    low: 10,
    high: 13,
    lowNote: "Adobe Firefly (top pick for commercial safety)",
    highNote: "Canva Pro",
    slug: "best-ai-image-generation-tools-freelance-designers",
  },
];

export function totals() {
  const low = aiCostCategories.reduce((sum, c) => sum + c.low, 0);
  const high = aiCostCategories.reduce((sum, c) => sum + c.high, 0);
  return { lowMonthly: low, highMonthly: high, lowAnnual: low * 12, highAnnual: high * 12 };
}
