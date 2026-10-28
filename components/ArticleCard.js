import Link from "next/link";
import { countLabelShort } from "../data/articles";
import { FIRST_HAND_SLUGS } from "../lib/featured";

export default function ArticleCard({ article }) {
  const firstHand = FIRST_HAND_SLUGS.has(article.slug);
  return (
    <Link href={`/reviews/${article.slug}`} className="tag-card">
      <div className="tag-card-top">
        <span className="tag-category">{article.category}</span>
        <span className="tag-count">{countLabelShort(article)}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.dek}</p>
      <div className="tag-card-footer">
        <span className="verdict-chip">{article.verdict}</span>
        <span className="read-time">
          {firstHand ? (
            <span className="firsthand-badge">First-hand</span>
          ) : null}
          {article.readTime}
        </span>
      </div>
    </Link>
  );
}
