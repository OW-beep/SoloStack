import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { articles, getArticle, countLabel, countLabelShort } from "../../../data/articles";
import { SITE_URL } from "../../../lib/site-config";
import { getCategorySlug } from "../../../lib/categories";
import RateCalculator from "../../../components/RateCalculator";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | SoloStack`,
    description: article.dek,
    alternates: {
      canonical: `${SITE_URL}/reviews/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.date,
      url: `${SITE_URL}/reviews/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
    },
  };
}

marked.setOptions({ gfm: true, breaks: false });

// article.date is stored as "YYYY-MM-DD"; format it for display.
function formatDate(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Flip this to true once your AdSense application is approved and
// you've swapped the placeholder <div> below for a real <ins
// class="adsbygoogle"> unit. Leaving visible "insert ad here" text on
// a live page while under review reads as an unfinished site, so it
// stays off by default.
const SHOW_AD_SLOTS = false;

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

  // Special case: the pricing guide gets a live calculator embedded
  // right where it discusses doing this math yourself.
  const showCalculator = article.slug === "how-to-price-freelance-work-rate-calculators";
  const calcMarker = "\n## Tools worth using for the math";
  let calcIntroHtml = null;
  let calcRestHtml = null;
  if (showCalculator) {
    const calcSplitIndex = introMd.indexOf(calcMarker);
    if (calcSplitIndex !== -1) {
      calcIntroHtml = marked.parse(introMd.slice(0, calcSplitIndex));
      calcRestHtml = marked.parse(
        calcMarker.replace(/^\n/, "") + introMd.slice(calcSplitIndex + calcMarker.length)
      );
    }
  }

  // Wrap any <table> the parser produced so it can scroll on mobile,
  // and make external links (real citations to the tools we discuss)
  // open safely in a new tab without leaking a referrer/opener handle.
  const wrapTables = (html) =>
    html
      .replace(/<table>/g, '<div class="table-wrap"><table>')
      .replace(/<\/table>/g, "</table></div>")
      .replace(
        /<a href="(https?:\/\/[^"]+)"/g,
        '<a target="_blank" rel="noopener noreferrer" href="$1"'
      );

  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: "Kosei Taki",
      url: `${SITE_URL}/author`,
    },
    publisher: {
      "@type": "Organization",
      name: "SoloStack",
    },
    mainEntityOfPage: `${SITE_URL}/reviews/${article.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="article-hero">
        <div className="wrap">
          <Link href="/#reviews" className="breadcrumb">
            ← All reviews
          </Link>
          <Link
            href={`/category/${getCategorySlug(article.category)}`}
            className="tag-category"
            style={{ textDecoration: "underline" }}
          >
            {article.category}
          </Link>
          <h1>{article.title}</h1>
          <p className="dek">{article.dek}</p>
          <div className="article-meta">
            <span>
              Written by{" "}
              <Link href="/author" style={{ textDecoration: "underline" }}>
                Kosei Taki
              </Link>
            </span>
            <span>·</span>
            <span>
              <Link href="/methodology" style={{ textDecoration: "underline" }}>
                Reviewed by the SoloStack team
              </Link>
            </span>
            <span>·</span>
            <span>Last checked {formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{countLabel(article)}</span>
            <span>·</span>
            <span className="verdict-chip">{article.verdict}</span>
          </div>
        </div>
      </section>

      <section className="article-body-wrap">
        <div className="wrap">
          <div className="article-layout">
            {showCalculator && calcIntroHtml !== null ? (
              <>
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(calcIntroHtml) }}
                />
                <RateCalculator />
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(calcRestHtml) }}
                />
              </>
            ) : (
              <article
                className="article-body"
                dangerouslySetInnerHTML={{ __html: wrapTables(introHtml) }}
              />
            )}

            {SHOW_AD_SLOTS && (
              <div className="ad-slot" data-ad-slot="in-article-top">
                Ad space — insert your AdSense unit here
              </div>
            )}

            {hasSplit && (
              <article
                className="article-body"
                dangerouslySetInnerHTML={{ __html: wrapTables(restHtml) }}
              />
            )}

            {SHOW_AD_SLOTS && (
              <div className="ad-slot" data-ad-slot="in-article-bottom">
                Ad space — insert your AdSense unit here
              </div>
            )}

            <div className="author-box">
              <p>
                <Link href="/author">Kosei Taki</Link> is a former IT
                consultant turned independent developer, focusing on
                practical software choices for freelancers.
              </p>
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
                  <span className="tag-count">{countLabelShort(a)}</span>
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
