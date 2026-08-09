"use client";

import { useState } from "react";

export default function NewsletterSignup({ variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setMessage(
          data.alreadySubscribed
            ? "You're already on the list."
            : "You're in — check your inbox to confirm."
        );
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p className={`newsletter-message newsletter-${variant}`}>{message}</p>
    );
  }

  return (
    <div className={`newsletter-block newsletter-${variant}`}>
      <p className="newsletter-label">
        New comparisons, roughly twice a month. No spam, unsubscribe
        anytime.
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Notify me"}
        </button>
      </form>
      {status === "error" && (
        <p className="newsletter-message newsletter-error">{message}</p>
      )}
    </div>
  );
}
