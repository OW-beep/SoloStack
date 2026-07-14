import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Terms of Service | SoloStack",
  description: "The terms that govern use of the SoloStack website.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

const LAST_UPDATED = "July 2026";

export default function TermsPage() {
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>Terms of Service</h1>
        <p>
          <em>Last updated: {LAST_UPDATED}.</em>
        </p>
        <p>
          These terms govern your use of SoloStack (the "site"). By using
          the site, you agree to them. If you don't agree, please don't use
          the site.
        </p>

        <h2>The content on this site</h2>
        <p>
          SoloStack publishes software reviews and comparisons aimed at
          freelancers and independent workers. Content is written for
          general informational purposes and reflects our own research and
          opinion at the time of publishing. It is not professional advice
          — see the specific disclaimers on individual articles (tax,
          legal, financial) for more detail.
        </p>
        <p>
          Software pricing, features, and free-tier limits change
          frequently. We do our best to keep guides current and note a
          "last checked" date on every article, but you should always
          confirm details directly with a provider before making a
          purchasing decision based on something you read here.
        </p>

        <h2>No warranty</h2>
        <p>
          The site and its content are provided "as is," without warranty
          of any kind, express or implied. We don't guarantee that
          information is complete, accurate, or up to date, or that the
          site will be available uninterrupted or error-free.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, SoloStack is not liable
          for any damages or losses arising from your use of, or reliance
          on, this site or its content, including decisions made about
          software purchases based on information found here.
        </p>

        <h2>Affiliate relationships and advertising</h2>
        <p>
          Some links on this site are affiliate links, and some pages may
          display advertising, as described in more detail on our{" "}
          <Link href="/about">About page</Link>. These relationships don't
          change the substance of our reviews.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links to third-party websites (the products we
          review). We don't control those sites and aren't responsible for
          their content, availability, or practices, including their own
          privacy policies and terms.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The written content on this site is original and owned by
          SoloStack unless otherwise noted. You're welcome to link to our
          articles; please don't republish substantial portions of our
          content elsewhere without permission.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of
          the site after a change means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent through our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </main>
  );
}
