import { articles } from "../data/articles";
import { SITE_URL } from "../lib/site-config";

export default function sitemap() {
  const staticPages = ["", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const reviewPages = articles.map((a) => ({
    url: `${SITE_URL}/reviews/${a.slug}`,
    // Use each article's real "last checked" date instead of "now" for
    // every entry — more accurate, and avoids every URL in the sitemap
    // showing an identical timestamp (a pattern that can look automated).
    lastModified: new Date(a.date + "T00:00:00"),
  }));

  return [...staticPages, ...reviewPages];
}
