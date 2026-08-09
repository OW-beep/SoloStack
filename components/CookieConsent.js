"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "solostack-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — don't block
      // rendering over it, just skip showing the banner.
    }
  }, []);

  function applyConsent(granted) {
    const state = granted ? "granted" : "denied";
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ granted, date: new Date().toISOString() })
      );
    } catch (e) {
      // Storage blocked — the choice still applies for this page view via
      // the gtag call above, it just won't persist across visits.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p>
          This site uses cookies for basic analytics and, once ads are
          enabled, to show ads — including personalized ads served by
          Google. Declining still lets you read every article normally.
          See the <a href="/privacy">Privacy Policy</a> for details.
        </p>
        <div className="cookie-banner-actions">
          <button
            type="button"
            onClick={() => applyConsent(false)}
            className="cookie-btn-secondary"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => applyConsent(true)}
            className="cookie-btn-primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
