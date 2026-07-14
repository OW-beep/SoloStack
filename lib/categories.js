// Category metadata for /category/[slug] pages.
// "name" must exactly match the `category` string used in data/articles.js.

export const categories = [
  {
    slug: "getting-paid",
    name: "Getting Paid",
    tagline: "The money side: invoicing, payments, taxes, and the paperwork in between.",
    description: `
"Getting paid" sounds like it should be the simple part of freelancing — do the work, send an invoice, receive money. In practice it's the category with the most hidden costs: currency conversion markups that quietly eat into an international payment, a "free" invoicing plan that turns out to gate the one feature you actually needed, or a receipt scanning habit skipped for six months that costs real money at tax time.

The guides in this category work through the full chain a freelance payment actually travels: getting a contract signed, sending an invoice (in your currency or a client's), collecting the payment itself across borders where relevant, tracking the time or expenses behind it, and eventually filing taxes on what's left. We specifically avoid conflating these — a tool built for time tracking rarely does invoicing well, and a payment platform is a different decision from the accounting software that records what it moved.

What we compare on: real fee structures (including the currency markup that's often bigger than the advertised transfer fee), what a free tier actually excludes rather than just whether one exists, and how well a tool holds up specifically for cross-border freelance work rather than a domestic small business.
    `,
  },
  {
    slug: "staying-organized",
    name: "Staying Organized",
    tagline: "Projects, clients, passwords, and the tools that keep a one-person operation from losing track of things.",
    description: `
A freelancer's organizational problem is a specific, smaller version of what a team's project management tool is built to solve — which is exactly why so much software in this category is the wrong shape for solo use. A CRM built for a twelve-person sales team, a project tracker priced per seat you don't have, a password manager with no clean way to hand a login to a subcontractor: all genuinely well-built tools, just not built for one person juggling four or five active clients at a time.

This category covers what actually keeps a freelance business running day to day: tracking leads before they become clients, tracking projects once they are, keeping client credentials and files secure, scheduling calls without a back-and-forth email chain, and staying reachable without your calendar or inbox becoming the bottleneck.

What we compare on: whether a genuinely usable free tier exists for solo use (not just a capped trial), how much setup time a tool demands before it's useful, and whether pricing scales sensibly as you occasionally bring on a subcontractor rather than assuming a full team from day one.
    `,
  },
  {
    slug: "winning-clients",
    name: "Winning Clients",
    tagline: "Portfolios, proposals, marketplaces, and the tools involved before a client says yes.",
    description: `
Everything in this category happens before a project starts — which makes it easy to underinvest in, since none of it is billable time. A portfolio site that takes three weekends to half-finish, a proposal that sits unopened because there's no view-tracking to prompt a follow-up, or relying entirely on one marketplace's algorithm for every lead: all common ways freelancers leave client acquisition mostly to chance rather than treating it as its own system.

These guides cover the tools that make up that system: where your work actually lives online, how a proposal gets from draft to signed, where else clients might find you besides the marketplace you started on, and how to keep a warm audience engaged between projects rather than starting from zero every time work slows down.

What we compare on: how fast a tool gets you from nothing to something usable (a portfolio that never launches helps no one), whether pricing punishes solo use the way per-seat models often do, and where a platform's cut or fee structure changes the actual math of using it.
    `,
  },
  {
    slug: "ai-stack",
    name: "AI Stack",
    tagline: "Where AI tools genuinely save a freelancer time, and where the trade-offs (like a bot joining your client call) are worth thinking through.",
    description: `
AI tools for freelancers split into two honest categories: the ones that save real time on real tasks, and the ones that mostly save time on tasks you weren't spending much time on in the first place. This section sticks to the former — drafting and editing tools that hold up on long-form client work, and meeting tools that solve the genuine problem of taking notes while trying to actually listen to a client.

We're specifically careful in this category about trade-offs that aren't obvious from a feature list. A bot visibly joining a client call to record it changes what a client is willing to say candidly, in a way a transcription-accuracy comparison alone won't tell you. We try to flag that kind of thing directly rather than only ranking on raw capability.

What we compare on: how a tool performs specifically on long, client-facing work rather than short demo prompts, what a genuinely usable free tier looks like in a category where pricing changes often, and — where relevant — what a tool's approach means for client trust and privacy, not just for you.
    `,
  },
  {
    slug: "guides",
    name: "Guides",
    tagline: "Not tool comparisons — frameworks and checklists for the decisions that come before you pick a tool at all.",
    description: `
Every other section on this site compares specific tools within a specific category. This one is different on purpose: it's for the questions worth answering before you start comparing anything — what you should actually charge, whether a new subscription solves a real problem or one you don't have yet, and how to sanity-check a tool decision against your specific situation rather than a generic "best of" list.

We keep this section small and add to it deliberately, not as a place to pad out content. If a genuinely reusable framework or checklist doesn't exist yet for a decision freelancers regularly face, it belongs here; if it's really just "here's a comparison of five tools," it belongs in one of the other categories instead.
    `,
  },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getCategorySlug(name) {
  const match = categories.find((c) => c.name === name);
  return match ? match.slug : null;
}
