// Problem-first navigation. Each path starts with the short answer (a
// "Fix It" page where one exists) and continues to the longer guides.
// Every slug here must exist in data/articles.js.

export const PROBLEM_GROUPS = [
  {
    title: "Getting paid",
    problems: [
      {
        id: "late-payment",
        featured: true,
        question: "A client's payment is late",
        steps: [
          "client-payment-late-check-this-first",
          "invoicing-software-international-freelancers",
        ],
      },
      {
        id: "received-less",
        featured: true,
        question: "I received less than I invoiced",
        steps: [
          "received-less-than-invoice-foreign-client-payment",
          "wise-vs-payoneer-freelancers",
          "international-payment-platforms-freelancers",
        ],
      },
      {
        id: "income-swings",
        featured: true,
        question: "My income swings from month to month",
        steps: [
          "feast-or-famine-irregular-freelance-income",
          "best-business-banking-apps-freelancers",
          "how-to-price-freelance-work-rate-calculators",
        ],
      },
      {
        id: "incorporate",
        question: "Should I set up an LLC yet?",
        steps: [
          "best-llc-formation-services-freelancers",
          "best-business-banking-apps-freelancers",
        ],
      },
      {
        id: "missing-receipts",
        featured: true,
        question: "I can't find my receipts at tax time",
        steps: [
          "cant-find-receipts-at-tax-time-what-to-do",
          "best-receipt-scanning-apps-freelancers",
          "best-tax-software-freelancers",
        ],
      },
    ],
  },
  {
    title: "Working with clients",
    problems: [
      {
        id: "extra-work",
        featured: true,
        question: "A client keeps asking for extra work",
        steps: [
          "client-keeps-adding-extra-work-what-to-do",
          "scope-creep-and-rate-increases-client-conversations",
          "one-page-freelance-proposal-template",
        ],
      },
      {
        id: "no-reply",
        featured: true,
        question: "Clients don't reply to my proposals",
        steps: [
          "why-clients-dont-reply-to-my-proposals",
          "one-page-freelance-proposal-template",
          "best-proposal-software-freelancers",
        ],
      },
      {
        id: "raise-rates",
        featured: true,
        question: "I haven't raised my rates in years",
        steps: [
          "how-to-price-freelance-work-rate-calculators",
          "scope-creep-and-rate-increases-client-conversations",
        ],
      },
      {
        id: "insurance-proof",
        featured: true,
        question: "A client asks for proof of insurance",
        steps: [
          "client-asks-for-proof-of-insurance-certificate",
          "best-business-insurance-freelancers",
        ],
      },
      {
        id: "need-insurance",
        question: "Do I need business insurance?",
        steps: [
          "best-business-insurance-freelancers",
          "client-asks-for-proof-of-insurance-certificate",
        ],
      },
      {
        id: "beyond-marketplaces",
        question: "How do I find clients beyond Upwork and Fiverr?",
        steps: [
          "upwork-vs-fiverr-freelancers",
          "freelance-marketplaces-beyond-upwork-fiverr",
        ],
      },
      {
        id: "contract-signing",
        featured: true,
        question: "I need a contract signed quickly",
        steps: [
          "free-esignature-tools-freelance-contracts",
          "freelance-client-contract-checklist",
        ],
      },
    ],
  },
  {
    title: "Setting up your tools",
    problems: [
      {
        id: "domain-email",
        featured: true,
        question: "My domain email isn't working",
        steps: [
          "domain-email-not-working-mx-spf-dkim",
          "best-professional-email-domain-freelancers",
        ],
      },
      {
        id: "email-worth-it",
        question: "Is a custom domain email worth it?",
        steps: [
          "is-a-custom-domain-email-worth-it-for-freelancers",
          "best-professional-email-domain-freelancers",
          "domain-email-not-working-mx-spf-dkim",
        ],
      },
      {
        id: "portfolio-site",
        question: "I need a portfolio website",
        steps: [
          "best-website-builders-freelancer-portfolio",
          "squarespace-vs-wix-freelancer-portfolio",
        ],
      },
      {
        id: "time-zones",
        question: "Booking calls across time zones is a mess",
        steps: [
          "best-timezone-scheduling-tools-freelancers-international-clients",
          "best-scheduling-apps-freelancers",
          "calendly-vs-tidycal-freelancers",
        ],
      },
      {
        id: "scattered-work",
        featured: true,
        question: "Client work is scattered across email and chat",
        steps: [
          "notion-client-pages-for-freelancers",
          "best-client-portal-software-freelancers",
          "free-project-management-tools-solo-freelancers",
        ],
      },
      {
        id: "ai-tools",
        featured: true,
        question: "Which AI tool should I pay for?",
        steps: [
          "claude-vs-chatgpt-freelance-writers",
          "ai-writing-tools-freelance-writers",
        ],
      },
    ],
  },
];

export const ALL_PROBLEMS = PROBLEM_GROUPS.flatMap((g) =>
  g.problems.map((p) => ({ ...p, group: g.title }))
);

export function findProblemsForArticle(slug) {
  return ALL_PROBLEMS.filter((p) => p.steps.includes(slug));
}
