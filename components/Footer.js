import Link from "next/link";
import { articles } from "../data/articles";

// Truncates a title for the footer's compact link list without losing
// the actual article topic (the old version swapped in the category
// name for anything over 42 chars, which hid most titles — this keeps
// a real, readable fragment of the title instead).
function shortTitle(title, max = 36) {
  if (title.length <= max) return title;
  return title.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              Solo<span className="dot">Stack</span>
            </div>
            <p>
              Software reviews for freelancers and independent workers. We
              test the tools you'd otherwise burn three free trials finding
              out about yourself.
            </p>
          </div>
          <div className="footer-nav">
            <div className="footer-col">
              <h4>Reviews</h4>
              {articles.slice(0, 6).map((a) => (
                <Link href={`/reviews/${a.slug}`} key={a.slug} title={a.title}>
                  {shortTitle(a.title)}
                </Link>
              ))}
              <Link href="/#reviews">
                View all {articles.length} reviews →
              </Link>
            </div>
            <div className="footer-col">
              <h4>Site</h4>
              <Link href="/about">About SoloStack</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy policy</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SoloStack</span>
          <span>Built for people who work alone.</span>
        </div>
        <p className="disclosure" style={{ marginTop: 18 }}>
          Disclosure: SoloStack may earn a commission when you sign up for
          some tools linked on this site, at no extra cost to you. This
          doesn't affect our comparisons — pricing and feature claims are
          verified independently and we call out trade-offs even for tools
          we link to. See our{" "}
          <Link href="/about" style={{ textDecoration: "underline" }}>
            About page
          </Link>{" "}
          for details on how we review products.
        </p>
      </div>
    </footer>
  );
}
