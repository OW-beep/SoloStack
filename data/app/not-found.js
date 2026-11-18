import Link from "next/link";

export default function NotFound() {
  return (
    <main className="static-page">
      <div className="wrap">
        <h1>404 — nothing on this shelf.</h1>
        <p>
          That page doesn't exist. Head back to{" "}
          <Link href="/" style={{ textDecoration: "underline" }}>
            the homepage
          </Link>{" "}
          to browse the catalog.
        </p>
      </div>
    </main>
  );
}
