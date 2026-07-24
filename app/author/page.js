import Link from "next/link";
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
      "Independent developer and former IT consultant with over 10 years of experience in enterprise systems and digital strategy.",
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
        <h1>About the Author</h1>

        <p>
          Kosei Taki is an independent developer and former IT consultant
          with over 10 years of experience in enterprise systems and
          digital strategy.
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
          perspective, Kosei evaluates them based on how they perform in
          real solo use — balancing cost, flexibility, and long-term
          usability. His approach combines:
        </p>
        <ul>
          <li>hands-on testing</li>
          <li>analysis of pricing structures and limitations</li>
          <li>practical decision-making from a freelancer's perspective</li>
        </ul>
        <p>
          Not every tool is used long-term, but each review focuses on
          the points that matter most when choosing software
          independently.
        </p>

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
