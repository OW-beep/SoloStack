import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="logo">
          Solo<span className="dot">Stack</span>
        </Link>
        <nav className="nav">
          <Link href="/#reviews">Reviews</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
