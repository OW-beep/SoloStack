import { ImageResponse } from "next/og";
import { getArticle } from "../../../data/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SoloStack review";

export default async function Image({ params }) {
  const article = getArticle(params.slug);
  const title = article ? article.title : "SoloStack";
  const category = article ? article.category : "";
  const verdict = article ? article.verdict : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17191c",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              color: "#f2eedd",
            }}
          >
            Solo<span style={{ color: "#e8a33d" }}>Stack</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 2,
              color: "#3e7c8a",
              fontWeight: 700,
            }}
          >
            {category.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#f2eedd",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        {verdict && (
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 24,
              fontWeight: 700,
              color: "#17191c",
              background: "#e8a33d",
              padding: "10px 22px",
              borderRadius: 4,
              alignSelf: "flex-start",
            }}
          >
            {verdict}
          </div>
        )}

        <div style={{ display: "flex", flex: 1 }} />

        <div
          style={{
            display: "flex",
            height: 14,
            width: "100%",
            background: "#e8a33d",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
