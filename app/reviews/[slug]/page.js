import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { articles, getArticle, countLabel, countLabelShort } from "../../../data/articles";
import { SITE_URL } from "../../../lib/site-config";
import { getCategorySlug } from "../../../lib/categories";
import { toAffiliateUrl } from "../../../lib/affiliate-links";
import RateCalculator from "../../../components/RateCalculator";
import AICodingCostCalculator from "../../../components/AICodingCostCalculator";
import InternationalPaymentCalculator from "../../../components/InternationalPaymentCalculator";
import RetirementContributionCalculator from "../../../components/RetirementContributionCalculator";
import HistoricalFXLookup from "../../../components/HistoricalFXLookup";
import CurrencyVolatilitySnapshot from "../../../components/CurrencyVolatilitySnapshot";
import RateInflationCalculator from "../../../components/RateInflationCalculator";
import NewsletterSignup from "../../../components/NewsletterSignup";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  // SEO-optimized <title>/OG/Twitter title and meta description, kept
  // separate from the on-page H1 and dek. seoDescription exists mainly for
  // articles whose dek runs long enough that Google would truncate it in
  // search results; both fall back to the on-page copy when not set.
  const seoTitle = article.seoTitle || article.title;
  const seoDescription = article.seoDescription || article.dek;
  return {
    title: `${seoTitle} | SoloStack`,
    description: seoDescription,
    alternates: {
      canonical: `${SITE_URL}/reviews/${article.slug}`,
    },
    // Thin/low-differentiation reviews get noindex,follow rather than
    // deletion — the page still works for anyone who lands on it (and
    // still passes link equity via internal links), it just isn't
    // offered to Google as a search result until it's been built out
    // further. Toggle article.noindex to bring one back into the index
    // once it's been expanded with real depth.
    robots: article.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: article.date,
      url: `${SITE_URL}/reviews/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
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
  // Second insertion point, further down the same article: the
  // inflation-vs-rate checker goes right where the piece pivots from
  // "is this competitive" to "has this quietly lost value over time."
  const inflationMarker = "\n## Is your rate still worth what it used to be";
  let calcIntroHtml = null;
  let calcRestHtml = null;
  let calcMidHtml = null;
  let calcEndHtml = null;
  if (showCalculator) {
    const calcSplitIndex = introMd.indexOf(calcMarker);
    if (calcSplitIndex !== -1) {
      calcIntroHtml = marked.parse(introMd.slice(0, calcSplitIndex));
      const restMdForCalc =
        calcMarker.replace(/^\n/, "") + introMd.slice(calcSplitIndex + calcMarker.length);
      const inflationSplitIndex = restMdForCalc.indexOf(inflationMarker);
      if (inflationSplitIndex !== -1) {
        calcMidHtml = marked.parse(restMdForCalc.slice(0, inflationSplitIndex));
        calcEndHtml = marked.parse(
          inflationMarker.replace(/^\n/, "") +
            restMdForCalc.slice(inflationSplitIndex + inflationMarker.length)
        );
      } else {
        calcRestHtml = marked.parse(restMdForCalc);
      }
    }
  }

  // Special case: the AI coding tools comparison gets a live cost
  // calculator embedded right before it walks through the billing math.
  const showCostCalc =
    article.slug === "claude-code-vs-cursor-vs-github-copilot-freelance-developers";
  const costCalcMarker = "\n## The billing math worth doing before you subscribe to anything";
  let costCalcIntroHtml = null;
  let costCalcRestHtml = null;
  if (showCostCalc) {
    const costSplitIndex = restMd.indexOf(costCalcMarker);
    if (costSplitIndex !== -1) {
      costCalcIntroHtml = marked.parse(restMd.slice(0, costSplitIndex));
      costCalcRestHtml = marked.parse(
        costCalcMarker.replace(/^\n/, "") + restMd.slice(costSplitIndex + costCalcMarker.length)
      );
    }
  }

  // Special case: the international payments comparison gets a live
  // calculator in place of the old static SVG chart, right after the
  // Quick Comparison table and before the platform-by-platform sections.
  const showPaymentCalc =
    article.slug === "international-payment-platforms-freelancers";
  const paymentCalcMarker = "\n## [Wise](https://wise.com) — the benchmark for low fees";
  let paymentCalcIntroHtml = null;
  let paymentCalcRestHtml = null;
  if (showPaymentCalc) {
    const paymentSplitIndex = restMd.indexOf(paymentCalcMarker);
    if (paymentSplitIndex !== -1) {
      paymentCalcIntroHtml = marked.parse(restMd.slice(0, paymentSplitIndex));
      paymentCalcRestHtml = marked.parse(
        paymentCalcMarker.replace(/^\n/, "") + restMd.slice(paymentSplitIndex + paymentCalcMarker.length)
      );
    }
  }

  // Special case: the retirement account comparison gets a live
  // calculator right after the worked $150k example, so readers can
  // plug in their own income instead of just reading the illustration.
  const showRetirementCalc =
    article.slug === "sep-ira-vs-solo-401k-freelancers";
  const retirementCalcMarker = "\n## Where to actually open one";
  let retirementCalcIntroHtml = null;
  let retirementCalcRestHtml = null;
  if (showRetirementCalc) {
    const retirementSplitIndex = restMd.indexOf(retirementCalcMarker);
    if (retirementSplitIndex !== -1) {
      retirementCalcIntroHtml = marked.parse(restMd.slice(0, retirementSplitIndex));
      retirementCalcRestHtml = marked.parse(
        retirementCalcMarker.replace(/^\n/, "") + restMd.slice(retirementSplitIndex + retirementCalcMarker.length)
      );
    }
  }

  // Special case: the foreign-currency P&L article gets a live rate
  // lookup right where it explains where to get a neutral exchange
  // rate — this article has no "## Quick comparison" heading (it's a
  // walkthrough, not a tool comparison), so hasSplit is false and the
  // whole body lives in introMd, same as the rate-calculators case.
  const showFxLookup =
    article.slug === "how-to-track-profit-loss-foreign-currency-freelancer";
  const fxLookupMarker = "\n## What this looks like in practice";
  let fxLookupIntroHtml = null;
  let fxLookupRestHtml = null;
  if (showFxLookup) {
    const fxSplitIndex = introMd.indexOf(fxLookupMarker);
    if (fxSplitIndex !== -1) {
      fxLookupIntroHtml = marked.parse(introMd.slice(0, fxSplitIndex));
      fxLookupRestHtml = marked.parse(
        fxLookupMarker.replace(/^\n/, "") + introMd.slice(fxSplitIndex + fxLookupMarker.length)
      );
    }
  }

  // Wrap any <table> the parser produced so it can scroll on mobile,
  // and make external links (some of which are affiliate links, per
  // our disclosure) open safely in a new tab, without leaking a
  // referrer/opener handle, and marked "sponsored" per Google's link
  // guidelines for paid/affiliate links. Internal links (relative
  // hrefs like /reviews/...) don't match this regex and are left
  // untouched, since they're neither external nor commercial.
  // Before adding the sponsored/target attributes, each href is also
  // run through toAffiliateUrl() — vendors configured in
  // lib/affiliate-links.js get swapped to their tracked affiliate URL
  // here, at render time, so the plain vendor URLs written in
  // data/articles.js never need to change once a program is approved.
  const wrapTables = (html) =>
    html
      .replace(/<table>/g, '<div class="table-wrap"><table>')
      .replace(/<\/table>/g, "</table></div>")
      .replace(
        /<a href="(https?:\/\/[^"]+)"/g,
        (match, url) =>
          `<a target="_blank" rel="sponsored noopener noreferrer" href="${toAffiliateUrl(url)}"`
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

  // Breadcrumb rich-result eligibility: Home > Category > Article.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category,
        item: `${SITE_URL}/category/${getCategorySlug(article.category)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/reviews/${article.slug}`,
      },
    ],
  };

  // FAQPage rich-result eligibility. Only emitted when the article defines
  // faq entries, and only ever describing the visible FAQ section rendered
  // below — never schema without matching on-page content.
  const faqJsonLd =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
                {calcMidHtml !== null && calcEndHtml !== null ? (
                  <>
                    <article
                      className="article-body"
                      dangerouslySetInnerHTML={{ __html: wrapTables(calcMidHtml) }}
                    />
                    <RateInflationCalculator />
                    <article
                      className="article-body"
                      dangerouslySetInnerHTML={{ __html: wrapTables(calcEndHtml) }}
                    />
                  </>
                ) : (
                  <article
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: wrapTables(calcRestHtml) }}
                  />
                )}
              </>
            ) : showFxLookup && fxLookupIntroHtml !== null ? (
              <>
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(fxLookupIntroHtml) }}
                />
                <HistoricalFXLookup />
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(fxLookupRestHtml) }}
                />
              </>
            ) : (
              <article
                className="article-body"
                dangerouslySetInnerHTML={{ __html: wrapTables(introHtml) }}
              />
            )}

            {/* This article's natural intro/rest split (on "## Quick
                comparison") already lands right after the anecdote about
                exchange-rate drift — no separate marker needed, unlike the
                other special cases above. */}
            {article.slug === "multi-currency-accounting-software-freelancers" && (
              <CurrencyVolatilitySnapshot />
            )}

            {SHOW_AD_SLOTS && (
              <div className="ad-slot" data-ad-slot="in-article-top">
                Ad space — insert your AdSense unit here
              </div>
            )}

            {hasSplit && showCostCalc && costCalcIntroHtml !== null ? (
              <>
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(costCalcIntroHtml) }}
                />
                <AICodingCostCalculator />
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(costCalcRestHtml) }}
                />
              </>
            ) : hasSplit && showPaymentCalc && paymentCalcIntroHtml !== null ? (
              <>
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(paymentCalcIntroHtml) }}
                />
                <InternationalPaymentCalculator />
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(paymentCalcRestHtml) }}
                />
              </>
            ) : hasSplit && showRetirementCalc && retirementCalcIntroHtml !== null ? (
              <>
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(retirementCalcIntroHtml) }}
                />
                <RetirementContributionCalculator />
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(retirementCalcRestHtml) }}
                />
              </>
            ) : (
              hasSplit && (
                <article
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: wrapTables(restHtml) }}
                />
              )
            )}

            {article.faq && article.faq.length > 0 && (
              <div className="faq-block">
                <h2>Frequently asked questions</h2>
                {article.faq.map((f, i) => (
                  <div className="faq-item" key={i}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
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

            <NewsletterSignup variant="article" />
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
