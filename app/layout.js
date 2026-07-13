import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_URL, ADSENSE_CLIENT_ID } from "../lib/site-config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "SoloStack — Software reviews for people who work alone",
  description:
    "SoloStack tests invoicing, project management, AI, and accounting tools for freelancers — with honest comparisons, real pricing, and no fluff.",
  // Update the SITE_URL constant in lib/site-config.js if/when you
  // attach a custom domain (Project > Settings > Domains in Vercel).
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "SoloStack — Software reviews for people who work alone",
    description:
      "Honest comparisons of the tools freelancers actually pay for.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoloStack — Software reviews for people who work alone",
    description:
      "Honest comparisons of the tools freelancers actually pay for.",
  },
  verification: {
    google: "KYZp6leIoJkmXQipodIUtUhXTopgEfgqFiQ7eJZuRZA",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SoloStack",
    description:
      "Software reviews for freelancers and independent workers — invoicing, project management, AI tools, and more.",
    url: SITE_URL,
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
