import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { articles, getArticle } from "../../../data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | SoloStack`,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
    },
  };
}

marked.setOptions({ gfm: true, breaks: false });

export default function ReviewPage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  // Split the markdown so we can drop an ad slot right before the
  // comparison table — a natural break after the intro, before the data.
  const marker = "\n## Quick comparison";
  const splitIndex = article.body.indexOf(marker);
  const hasSplit = splitIndex !== -1;
  const introMd = hasSplit ? article.body.slice(0, splitIndex) : article.body;
  const restMd = hasSplit
    ? marker.replace(/^\n/, "") + article.body.slice(splitIndex + marker.length)
    : "";

  const introHtml = marked.parse(introMd);
  const restHtml = hasSplit ? marked.parse(restMd) : "";

  // Wrap any <table> the parser produced so it can scroll on mobile.
  const wrapTables = (html) =>
    html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(
      /<\/table>/g,
      "</table></div>"
    );

  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <section className="article-hero">
        <div className="wrap">
          <Link href="/#reviews" className="breadcrumb">
            ← All reviews
          </Link>
          <span className="tag-category">{article.category}</span>
          <h1>{article.title}</h1>
          <p className="dek">{article.dek}</p>
          <div className="article-meta">
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{article.toolsCompared} tools compared</span>
            <span>·</span>
            <span className="verdict-chip">{article.verdict}</span>
          </div>
        </div>
      </section>

      <section className="article-body-wrap">
        <div className="wrap">
          <div className="article-layout">
            <article
              className="article-body"
              dangerouslySetInnerHTML={{ __html: wrapTables(introHtml) }}
            />

            <div className="ad-slot" data-ad-slot="in-article-top">
              Ad space — insert your AdSense unit here
            </div>

            {hasSplit && (
              <article
                className="article-body"
                dangerouslySetInnerHTML={{ __html: wrapTables(restHtml) }}
              />
            )}

            <div className="ad-slot" data-ad-slot="in-article-bottom">
              Ad space — insert your AdSense unit here
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">Keep reading</p>
              <h2>More reviews</h2>
            </div>
          </div>
          <div className="card-grid">
            {otherArticles.map((a) => (
              <Link href={`/reviews/${a.slug}`} className="tag-card" key={a.slug}>
                <div className="tag-card-top">
                  <span className="tag-category">{a.category}</span>
                  <span className="tag-count">{a.toolsCompared} tools</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.dek}</p>
                <div className="tag-card-footer">
                  <span className="verdict-chip">{a.verdict}</span>
                  <span className="read-time">{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
