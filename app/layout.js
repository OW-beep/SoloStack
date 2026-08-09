import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
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
  title: "SoloStack — Best Software & Tools for Freelancers, Reviewed (2026)",
  description:
    "Honest 2026 reviews of invoicing, project management, AI, and accounting tools for freelancers — real pricing, free-tier limits, and no sponsored rankings.",
  // Update the SITE_URL constant in lib/site-config.js if/when you
  // attach a custom domain (Project > Settings > Domains in Vercel).
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "SoloStack — Best Software & Tools for Freelancers, Reviewed (2026)",
    description:
      "Honest comparisons of the tools freelancers actually pay for — real pricing, no sponsored rankings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoloStack — Best Software & Tools for Freelancers, Reviewed (2026)",
    description:
      "Honest comparisons of the tools freelancers actually pay for — real pricing, no sponsored rankings.",
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
      <head>
        {/*
          Google Consent Mode v2 — must run before the AdSense script
          below. Defaults everything to "denied" so no ad/analytics
          cookies are set until a visitor actively accepts via the
          CookieConsent banner. Required for serving ads to EEA/UK/CH
          traffic under Google's EU User Consent Policy; harmless
          everywhere else.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              window.gtag = gtag;
            `,
          }}
        />
      </head>
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
