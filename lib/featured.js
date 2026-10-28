// Homepage curation. Keep these lists honest:
//  - FIRST_HAND_SLUGS: only articles where the author has supplied his own
//    first-hand experience (shown with a "First-hand" badge).
//  - START_HERE_SLUGS: the guides that best show that experience.
//  - PRESS: outside publications that have published the author's answers.

export const START_HERE_SLUGS = [
  "how-to-price-freelance-work-rate-calculators",
  "scope-creep-and-rate-increases-client-conversations",
  "one-page-freelance-proposal-template",
  "best-professional-email-domain-freelancers",
  "notion-client-pages-for-freelancers",
  "free-esignature-tools-freelance-contracts",
];

export const FIRST_HAND_SLUGS = new Set([
  ...START_HERE_SLUGS,
  "best-proposal-software-freelancers",
  "invoicing-software-international-freelancers",
  "best-business-insurance-freelancers",
  "best-tax-software-freelancers",
  "best-llc-formation-services-freelancers",
  "best-password-managers-freelancers-client-logins",
  "best-ai-seo-content-tools-freelance-writers",
  "upwork-vs-fiverr-freelancers",
  "notion-vs-clickup-freelancers",
]);

export const PRESS = [
  {
    outlet: "GIGS Magazine",
    date: "Oct 2026",
    title: "How Freelancers Raise Rates With Confidence",
    url: "https://gigsmagazine.com/qa/how-freelancers-raise-rates-with-confidence/",
  },
  {
    outlet: "Grit Daily",
    date: "Oct 2026",
    title: "Crucial Lessons Learned in Year One: Advice from Entrepreneurs",
    url: "https://gritdaily.com/crucial-lessons-learned-in-year-one-advice-from-entrepreneurs/",
  },
  {
    outlet: "Connectively",
    date: "Aug 2026",
    title: "25 Legal Challenges Faced During Business Formation and How to Overcome Them",
    url: "https://blog.connectively.us/25-legal-challenges-faced-during-business-formation-and-how-to-overcome-them/",
  },
];
