import { ImageResponse } from "next/og";

export const alt = "SoloStack — Software reviews for people who work alone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17191c",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            color: "#f2eedd",
            letterSpacing: -1,
          }}
        >
          Solo<span style={{ color: "#e8a33d" }}>Stack</span>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#f2eedd",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Software reviews for people who work alone.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "rgba(242, 238, 221, 0.65)",
          }}
        >
          Honest comparisons of the tools freelancers actually pay for.
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        <div
          style={{
            display: "flex",
            height: 14,
            width: "100%",
            backgroundImage:
              "repeating-linear-gradient(-45deg, #e8a33d 0px, #e8a33d 20px, #17191c 20px, #17191c 40px)",
            border: "1px solid #e8a33d",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
