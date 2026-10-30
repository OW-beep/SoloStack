// Problem-first navigation. Each path starts with the short answer (a
// "Fix It" page where one exists) and continues to the longer guides.
// Every slug here must exist in data/articles.js.

export const PROBLEM_GROUPS = [
  {
    title: "Getting paid",
    problems: [
      {
        id: "late-payment",
        question: "A client's payment is late",
        steps: [
          "client-payment-late-check-this-first",
          "invoicing-software-international-freelancers",
        ],
      },
      {
        id: "received-less",
        question: "I received less than I invoiced",
        steps: [
          "received-less-than-invoice-foreign-client-payment",
          "wise-vs-payoneer-freelancers",
          "international-payment-platforms-freelancers",
        ],
      },
      {
        id: "missing-receipts",
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
        question: "A client keeps asking for extra work",
        steps: [
          "client-keeps-adding-extra-work-what-to-do",
          "scope-creep-and-rate-increases-client-conversations",
          "one-page-freelance-proposal-template",
        ],
      },
      {
        id: "no-reply",
        question: "Clients don't reply to my proposals",
        steps: [
          "why-clients-dont-reply-to-my-proposals",
          "one-page-freelance-proposal-template",
          "best-proposal-software-freelancers",
        ],
      },
      {
        id: "raise-rates",
        question: "I haven't raised my rates in years",
        steps: [
          "how-to-price-freelance-work-rate-calculators",
          "scope-creep-and-rate-increases-client-conversations",
        ],
      },
      {
        id: "insurance-proof",
        question: "A client asks for proof of insurance",
        steps: [
          "client-asks-for-proof-of-insurance-certificate",
          "best-business-insurance-freelancers",
        ],
      },
      {
        id: "contract-signing",
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
        question: "My domain email isn't working",
        steps: [
          "domain-email-not-working-mx-spf-dkim",
          "best-professional-email-domain-freelancers",
        ],
      },
      {
        id: "scattered-work",
        question: "Client work is scattered across email and chat",
        steps: [
          "notion-client-pages-for-freelancers",
          "best-client-portal-software-freelancers",
          "free-project-management-tools-solo-freelancers",
        ],
      },
      {
        id: "ai-tools",
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
