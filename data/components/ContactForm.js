"use client";

import { useState } from "react";
import { FORMSPREE_FORM_ID } from "../lib/site-config";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  if (!FORMSPREE_FORM_ID) return null;

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input type="text" name="name" required maxLength={100} />
      </label>
      <label>
        Email
        <input type="email" name="email" required maxLength={200} />
      </label>
      <label>
        Message
        <textarea name="message" rows={6} required maxLength={4000} />
      </label>
      {/* Honeypot field for spam bots; real visitors never see it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" ? (
        <p role="status">Thanks — your message was sent.</p>
      ) : null}
      {status === "error" ? (
        <p role="alert">
          Something went wrong. Please email us directly instead.
        </p>
      ) : null}
    </form>
  );
}
