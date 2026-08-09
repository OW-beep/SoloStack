"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { articles } from "../data/articles";

const MAX_RESULTS = 7;

function normalize(s) {
  return (s || "").toLowerCase();
}

function search(query) {
  const q = normalize(query).trim();
  if (!q) return [];

  return articles
    .map((a) => {
      const haystack = normalize(
        `${a.title} ${a.dek} ${a.category} ${a.seoDescription || ""}`
      );
      if (!haystack.includes(q)) return null;

      // Rough relevance: title matches rank above dek/category-only matches.
      const score = normalize(a.title).includes(q) ? 2 : 1;
      return { ...a, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS);
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const results = search(query);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="site-search" ref={containerRef}>
      <input
        type="text"
        placeholder="Search reviews…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        aria-label="Search reviews"
        className="site-search-input"
      />
      {open && query.trim() && (
        <div className="site-search-results">
          {results.length === 0 ? (
            <p className="site-search-empty">
              No reviews match "{query.trim()}".
            </p>
          ) : (
            results.map((a) => (
              <Link
                href={`/reviews/${a.slug}`}
                key={a.slug}
                className="site-search-result"
                onClick={() => setOpen(false)}
              >
                <span className="site-search-result-category">
                  {a.category}
                </span>
                <span className="site-search-result-title">{a.title}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
