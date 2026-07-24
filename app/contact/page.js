import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Contact | SoloStack",
  description: "Get in touch about SoloStack.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

const CONTACT_EMAIL = "solostack.info@gmail.com";

export default function ContactPage() {
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>Contact</h1>
        <p>
          Questions, corrections, or a tool you think we should review?
          Reach out at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          If you're reporting outdated pricing or a factual error in one of
          our reviews, include the article title and what changed — we aim
          to correct verified pricing errors within a few days.
        </p>
      </div>
    </main>
  );
}
