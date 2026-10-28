import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "About the Author | SoloStack",
  description:
    "Kosei Taki is an independent developer and former IT consultant who writes and reviews software for SoloStack from a solo-freelancer perspective.",
  alternates: { canonical: `${SITE_URL}/author` },
};

export default function AuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kosei Taki",
    url: `${SITE_URL}/author`,
    jobTitle: "Independent Developer",
    description:
      "Independent developer and former IT consultant (2012–2023) with experience in enterprise system projects and digital strategy.",
    sameAs: [
      "https://www.linkedin.com/in/kosei-taki-3a1994428",
      "https://youtube.com/@solostack-k",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Information Security Management Examination (IPA, Japan)",
        dateCreated: "2018",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "IT Strategist Examination (IPA, Japan)",
        dateCreated: "2022",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "SoloStack",
      url: SITE_URL,
    },
  };

  return (
    <main className="static-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap">
        <div className="author-hero">
          <Image
            src="/author-photo.jpg"
            alt="Kosei Taki"
            className="author-photo"
            width={120}
            height={120}
          />
          <div>
            <h1>About the Author</h1>
            <a
              href="https://www.linkedin.com/in/kosei-taki-3a1994428"
              target="_blank"
              rel="noopener noreferrer"
              className="author-linkedin"
            >
              View LinkedIn profile →
            </a>
            <a
              href="https://youtube.com/@solostack-k"
              target="_blank"
              rel="noopener noreferrer"
              className="author-linkedin"
              style={{ marginLeft: 16 }}
            >
              Watch on YouTube →
            </a>
          </div>
        </div>

        <p>
          Kosei Taki is an independent developer and former IT consultant.
          From 2012 to 2023 he worked at an enterprise IT consulting firm
          on core-system and digital-strategy projects, and he has worked
          independently since 2023.
        </p>
        <p>
          After working in consulting, he transitioned into freelance
          work, focusing on building and managing projects as a solo
          operator. Through this shift, he experienced a gap between how
          software is presented and how it is actually used by
          individuals:
        </p>
        <ul>
          <li>pricing that scales unexpectedly</li>
          <li>features designed for teams rather than solo users</li>
          <li>
            "free plans" that become restrictive in real workflows
          </li>
        </ul>
        <p>SoloStack was created to bridge that gap.</p>
        <p>
          Instead of reviewing tools from a corporate or team
          perspective, Kosei looks at them from a solo freelancer's point
          of view — balancing cost, flexibility, and long-term
          usability. His approach combines:
        </p>
        <ul>
          <li>
            hands-on use of some tools, stated explicitly in the article
            where it applies
          </li>
          <li>analysis of pricing structures and limitations</li>
          <li>practical decision-making from a freelancer's perspective</li>
        </ul>
        <p>
          Not every tool is used long-term, but each review focuses on
          the points that matter most when choosing software
          independently.
        </p>
        <p>
          Day to day, SoloStack is written around client work rather than
          instead of it — most weeks it's client projects first and
          writing in whatever's left over, which is also exactly the
          kind of scheduling tension the site's own reviews are written
          for. In consulting, the work was less about comparing features
          than about whether a system would actually be usable by the
          people running it, what it would cost to operate after
          rollout, and whether the cost was justified. That way of
          weighing a tool carries over to how SoloStack compares
          software.
        </p>

        <h2>Background</h2>
        <p>
          2012–2023: IT consultant at an enterprise IT consulting firm.
          Representative work is described by scale and duration only,
          because client details are confidential.
        </p>
        <ul>
          <li>
            Core-system renewal support — a system used by several hundred
            people, over a year or more. Current-process analysis,
            requirements definition support, vendor coordination, and test
            and migration planning.
          </li>
          <li>
            Retail and distribution system rollout support — dozens to
            hundreds of sites, roughly six months to a year. Stakeholder
            interviews, business-flow mapping, requirement prioritization,
            and operations design support.
          </li>
          <li>
            Digital strategy and data utilization support — an initiative
            spanning several departments, roughly six months to a year or
            more. Issue framing, KPI design, data analysis, and support for
            measuring the effect of measures.
          </li>
        </ul>
        <p>
          Credentials (IPA, Japan): Information Security Management
          Examination, passed 2018; IT Strategist Examination, passed 2022.
        </p>
        <p>
          Tools Kosei uses himself: Google Workspace, Money Forward Cloud,
          Dropbox Sign, Upwork, Notion, Slack, and Discord. Not every tool
          reviewed on SoloStack was used in client work, so first-hand use
          is stated in the articles where it applies and is kept separate
          from pricing and feature research.
        </p>

        <h2>Featured in</h2>
        <ul>
          <li>
            <a
              href="https://blog.connectively.us/25-legal-challenges-faced-during-business-formation-and-how-to-overcome-them/"
              target="_blank"
              rel="noopener noreferrer"
            >
              25 Legal Challenges Faced During Business Formation and How to
              Overcome Them
            </a>{" "}
            — Connectively (Aug 2026)
          </li>
          <li>
            <a
              href="https://gritdaily.com/crucial-lessons-learned-in-year-one-advice-from-entrepreneurs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Crucial Lessons Learned in Year One: Advice from
              Entrepreneurs
            </a>{" "}
            — Grit Daily (Oct 2026)
          </li>
          <li>
            <a
              href="https://gigsmagazine.com/qa/how-freelancers-raise-rates-with-confidence/"
              target="_blank"
              rel="noopener noreferrer"
            >
              How Freelancers Raise Rates With Confidence
            </a>{" "}
            — GIGS Magazine (Oct 2026)
          </li>
        </ul>

        <h2>More on how the site works</h2>
        <p>
          For the specific criteria used in each comparison and where
          the underlying information comes from, see the{" "}
          <Link href="/methodology">Methodology page</Link>. For how this
          site is funded, see{" "}
          <Link href="/about">About SoloStack</Link>.
        </p>
      </div>
    </main>
  );
}
