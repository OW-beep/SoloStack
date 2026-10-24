import Link from "next/link";

// "From the author" strip shown at the very top of the homepage, so a
// first-time visitor (or reviewer) sees who runs the site and the
// first-hand pieces before anything else. Keep the two article links
// pointing at pieces that actually contain the author's own experience.
export default function AuthorStrip() {
  return (
    <aside className="author-strip" aria-label="From the author">
      <div className="wrap">
        <span className="author-strip-label">From the author:</span>{" "}
        <Link href="/author">
          Kosei Taki, independent developer and former IT consultant
        </Link>
        <span className="author-strip-sep" aria-hidden="true">
          {" "}
          ·{" "}
        </span>
        <Link href="/reviews/how-to-price-freelance-work-rate-calculators">
          I went three years without raising my rate. Here's what finally
          changed it
        </Link>
        <span className="author-strip-sep" aria-hidden="true">
          {" "}
          ·{" "}
        </span>
        <Link href="/reviews/one-page-freelance-proposal-template">
          The one-page proposal that turned a weak response into a real
          conversation
        </Link>
      </div>
    </aside>
  );
}
