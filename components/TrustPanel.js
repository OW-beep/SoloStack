import Link from "next/link";
import { PRESS } from "../lib/featured";

// Who runs the site and where the author's work has been published.
// Shown near the top of the homepage on purpose: these are the trust
// signals a first-time visitor or reviewer should not have to hunt for.
export default function TrustPanel() {
  return (
    <section className="section trust-section" aria-label="About the author">
      <div className="wrap">
        <div className="trust-grid">
          <div className="trust-card">
            <p className="section-eyebrow">Who runs this site</p>
            <h2>Kosei Taki</h2>
            <p>
              Independent developer and former IT consultant. From 2012 to
              2023 he worked at an enterprise IT consulting firm on
              core-system and digital-strategy projects, and he has worked
              independently since 2023. IPA certifications: Information
              Security Management (2018) and IT Strategist (2022).
            </p>
            <ul className="trust-links">
              <li>
                <Link href="/author">About the author →</Link>
              </li>
              <li>
                <Link href="/methodology">How we research and write →</Link>
              </li>
              <li>
                <Link href="/about">About SoloStack →</Link>
              </li>
            </ul>
          </div>
          <div className="trust-card">
            <p className="section-eyebrow">Featured in</p>
            <h2>Published by outside outlets</h2>
            <ul className="press-list">
              {PRESS.map((p) => (
                <li key={p.url}>
                  <span className="press-outlet">
                    {p.outlet} · {p.date}
                  </span>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
