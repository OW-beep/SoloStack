// Prices checked directly against each provider's own pricing page and
// recorded by the site owner. U.S. list prices unless noted. Only add a
// service here when the figures were read from the provider's page on
// the date shown. `url` is the pricing page that was read.

export const priceChecks = [
  {
    service: "ChatGPT",
    checkedOn: "2026-10-22",
    url: "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus",
    prices: ["Free: $0", "Plus: $20 per month"],
    limits: "The free plan has usage, model and feature limits, which change often.",
    note: "Annual billing is not shown on the page that was checked.",
  },
  {
    service: "Claude",
    checkedOn: "2026-10-22",
    url: "https://claude.com/pricing",
    prices: ["Free: $0", "Pro: $20 per month, or $200 per year billed annually (about $16.67 per month)"],
    limits: "The free plan has usage limits that vary with conversation length and load.",
    note: "",
  },
  {
    service: "Notion",
    checkedOn: "2026-10-22",
    url: "https://www.notion.com/pricing",
    prices: ["Free: $0", "Plus: $12 per seat per month billed monthly, $10 per seat per month billed annually"],
    limits: "The free plan limits file uploads to 5 MB per file and page history to 7 days.",
    note: "The monthly figure is what the page shows by default; reconfirm it at checkout.",
  },
  {
    service: "Slack",
    checkedOn: "2026-10-27",
    url: "https://slack.com/pricing",
    prices: ["Free: $0", "Pro: $8.75 per user per month billed monthly, $7.25 billed annually", "Business+: $18 per user per month billed monthly, $15 billed annually"],
    limits: "The free plan keeps 90 days of message history, allows up to 10 app integrations, and limits huddles to one-on-one.",
    note: "Regular prices; temporary promotions are listed separately by Slack.",
  },
  {
    service: "Canva",
    checkedOn: "2026-10-22",
    url: "https://www.canva.com/pricing/",
    prices: ["Free: $0", "Pro: $18 per month billed monthly"],
    limits: "The free plan limits stock content, AI usage and storage (5 GB on Free).",
    note: "The annual price was not confirmed and is left out.",
  },
  {
    service: "Calendly",
    checkedOn: "2026-10-22",
    url: "https://calendly.com/pricing",
    prices: ["Free: $0", "Standard: $12 per seat per month billed monthly, $10 billed annually"],
    limits: "The free plan allows one event type, one calendar connection and one-on-one bookings.",
    note: "The monthly figure is a guide; reconfirm it at checkout.",
  },
  {
    service: "TidyCal",
    checkedOn: "2026-10-22",
    url: "https://tidycal.com/pricing",
    prices: ["Free: $0", "Pro: $12 per month, or $99 per year (about $8.25 per month)"],
    limits: "The free plan allows unlimited booking types and bookings, but only one connected calendar, and takes a 1% platform fee on paid bookings.",
    note: "",
  },
  {
    service: "Mailchimp",
    checkedOn: "2026-10-27",
    url: "https://mailchimp.com/pricing/marketing/",
    prices: ["Free: $0", "Essentials: from $13 per month", "Standard: from $20 per month"],
    limits: "The free plan allows up to 250 contacts and 500 sends per month (maximum 250 per day), one audience and one seat.",
    note: "Paid prices depend on contact count and on promotions, and the annual price was not confirmed.",
  },
  {
    service: "Kit",
    checkedOn: "2026-10-22",
    url: "https://kit.com/pricing",
    prices: ["Free: $0", "Creator: $39 per month billed monthly, $390 per year billed annually (shown as $33 per month), for 1,000 subscribers"],
    limits: "The free plan allows up to 10,000 subscribers with unlimited forms, landing pages and email broadcasts; automations and sequences are paid.",
    note: "",
  },
  {
    service: "FreshBooks",
    checkedOn: "2026-10-22",
    url: "https://www.freshbooks.com/pricing",
    prices: ["Lite: $23 per month regular price ($248.40 per year billed annually)", "Plus: $43 per month regular price ($464.40 per year billed annually)"],
    limits: "Lite covers 5 billable clients and Plus covers 50; included features such as proposals, expense receipts and reports differ by plan.",
    note: "The page also showed an introductory price (Lite $4.60 and Plus $8.60 per month for four months), which is not the regular price.",
  },
];
