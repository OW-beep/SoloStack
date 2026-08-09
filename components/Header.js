import Link from "next/link";
import SiteSearch from "./SiteSearch";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="logo">
          Solo<span className="dot">Stack</span>
        </Link>
        <SiteSearch />
        <nav className="nav">
          <Link href="/#reviews">Reviews</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
