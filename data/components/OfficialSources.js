import { SOURCES } from "../lib/sources";

// Links to the providers themselves, so a reader can check a price or
// a limit directly. These are plain links to the vendor (no tracking,
// not sponsored).
export default function OfficialSources({ slug }) {
  const items = SOURCES[slug];
  if (!items || items.length === 0) return null;
  return (
    <section className="section sources-section" aria-label="Official sources">
      <div className="wrap">
        <div className="sources-box">
          <p className="section-eyebrow">Check it yourself</p>
          <h2>Official sites and pricing pages</h2>
          <ul className="sources-list">
            {items.map((i) => (
              <li key={i.url}>
                <a href={i.url} target="_blank" rel="noopener noreferrer">
                  {i.name}
                </a>{" "}
                <span className="sources-kind">
                  {i.pricing ? "pricing page" : "official site"}
                </span>
              </li>
            ))}
          </ul>
          <p className="sources-note">
            Prices and limits change often. Where an article shows a “Last
            checked” date, its prices were compared with the provider's own
            pricing page on that date; otherwise treat figures as a starting
            point and confirm them on the provider's site.
          </p>
        </div>
      </div>
    </section>
  );
}
