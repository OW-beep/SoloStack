import { articles } from "../../data/articles";
import { SITE_URL } from "../../lib/site-config";

export const dynamic = "force-static";

const esc = (t) =>
  String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const items = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 50)
    .map((a) => {
      const url = `${SITE_URL}/reviews/${a.slug}`;
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.date + "T00:00:00Z").toUTCString()}</pubDate>
      <category>${esc(a.category)}</category>
      <description>${esc(a.dek)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SoloStack</title>
    <link>${SITE_URL}</link>
    <description>Software reviews for freelancers who work alone.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
