import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "../../../lib/categories";
import { articles, countLabelShort } from "../../../data/articles";
import { SITE_URL } from "../../../lib/site-config";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} | SoloStack`,
    description: category.tagline,
    alternates: {
      canonical: `${SITE_URL}/category/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const categoryArticles = articles.filter((a) => a.category === category.name);
  const paragraphs = category.description
    .trim()
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main>
      <section className="article-hero">
        <div className="wrap">
          <Link href="/#reviews" className="breadcrumb">
            ← All reviews
          </Link>
          <span className="tag-category">Category</span>
          <h1>{category.name}</h1>
          <p className="dek">{category.tagline}</p>
        </div>
      </section>

      <section className="article-body-wrap" style={{ paddingBottom: 20 }}>
        <div className="wrap">
          <div className="article-layout">
            <article className="article-body">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">In this category</p>
              <h2>
                {categoryArticles.length} guide
                {categoryArticles.length === 1 ? "" : "s"}
              </h2>
            </div>
          </div>
          <div className="card-grid">
            {categoryArticles.map((a) => (
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
