import Link from "next/link";

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
              <Link href="/reviews/invoicing-software-international-freelancers">
                Invoicing
              </Link>
              <Link href="/reviews/free-project-management-tools-solo-freelancers">
                Project management
              </Link>
              <Link href="/reviews/ai-writing-tools-freelance-writers">
                AI writing tools
              </Link>
              <Link href="/reviews/free-vs-paid-time-tracking-apps">
                Time tracking
              </Link>
              <Link href="/reviews/multi-currency-accounting-software-freelancers">
                Accounting
              </Link>
            </div>
            <div className="footer-col">
              <h4>Site</h4>
              <Link href="/about">About SoloStack</Link>
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
