"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

// Same illustrative all-in fee rates already published in this article's
// Quick Comparison table and static chart — kept in sync deliberately so
// the interactive version never contradicts the prose above it.
const PLATFORMS = [
  { name: "Wise", rate: 0.007, color: "var(--teal)" },
  { name: "Payoneer", rate: 0.025, color: "var(--amber)" },
  { name: "Stripe", rate: 0.035, color: "var(--amber-deep)" },
  { name: "PayPal", rate: 0.044, color: "var(--red)" },
];

// The free, keyless Frankfurter API (ECB reference rates) — same source
// used by the other live-rate tools on this site. This grounds the
// comparison in a real, current mid-market rate rather than an assumed
// 1:1, so the gap between "what you'd get at the true rate" and "what
// a platform's typical markup leaves you with" is a real number.
const TARGETS = ["EUR", "GBP", "CAD", "AUD", "JPY"];

function formatMoney(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InternationalPaymentCalculator() {
  const [amount, setAmount] = useState(1000);
  const [target, setTarget] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | idle | error

  const loadRate = useCallback(() => {
    setStatus("loading");
    fetch(`https://api.frankfurter.app/latest?from=USD&to=${target}`)
      .then((res) => {
        if (!res.ok) throw new Error("lookup failed");
        return res.json();
      })
      .then((data) => {
        const r = data?.rates?.[target];
        if (typeof r !== "number") throw new Error("no rate");
        setRate(r);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [target]);

  useEffect(() => {
    loadRate();
  }, [loadRate]);

  const results = useMemo(() => {
    const amt = Number(amount) || 0;
    return PLATFORMS.map((p) => ({
      ...p,
      fee: amt * p.rate,
      landed: amt * (1 - p.rate),
    })).sort((a, b) => b.landed - a.landed);
  }, [amount]);

  const best = results[0];
  const worst = results[results.length - 1];
  const gap = best && worst ? best.landed - worst.landed : 0;
  const amt = Number(amount) || 0;
  const trueConverted = rate !== null ? amt * rate : null;

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · live mid-market rate included</p>
      <h3>What actually lands, by platform</h3>
      <p className="rate-calc-sub">
        Enter an invoice amount to see the estimated take-home after each
        platform's typical all-in cost (transfer fee plus currency
        conversion markup) — the same illustrative rates shown in the
        comparison above, plus today's real mid-market rate for scale.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field" style={{ maxWidth: 280 }}>
          <label htmlFor="paymentAmount">
            Invoice amount (USD)
            <span className="val">${formatMoney(amt)}</span>
          </label>
          <input
            id="paymentAmount"
            type="range"
            min="100"
            max="10000"
            step="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="rate-calc-field" style={{ maxWidth: 140 }}>
          <label htmlFor="paymentTarget">Client pays you in</label>
          <select id="paymentTarget" value={target} onChange={(e) => setTarget(e.target.value)}>
            {TARGETS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "idle" && trueConverted !== null && (
        <p className="rate-calc-note" style={{ fontSize: "1.05em" }}>
          At today's real mid-market rate, ${formatMoney(amt)} USD equals{" "}
          <strong>
            {formatMoney(trueConverted)} {target}
          </strong>{" "}
          — no platform actually pays this rate; every fee and spread
          below comes out of that number.
        </p>
      )}
      {status === "loading" && <p className="rate-calc-note">Loading today's mid-market rate&hellip;</p>}
      {status === "error" && (
        <p className="rate-calc-note">Couldn't load the live rate just now — the fee comparison below still works.</p>
      )}

      <div className="cost-bars">
        {results.map((p) => (
          <div className="cost-bar-row" key={p.name}>
            <div className="cost-bar-label">
              <span>{p.name}</span>
              <span className="cost-bar-value">
                ${formatMoney(p.landed)}
                {rate !== null && (
                  <> (&asymp;{formatMoney(p.landed * rate)} {target})</>
                )}
                <small> lands &middot; -${formatMoney(p.fee)}</small>
              </span>
            </div>
            <div className="cost-bar-track">
              <div
                className="cost-bar-fill"
                style={{
                  width: `${(p.landed / (amt || 1)) * 100}%`,
                  background: p.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {best && worst && gap > 0 && (
        <p className="rate-calc-note" style={{ marginTop: 16 }}>
          On this invoice, {best.name} lands ${formatMoney(gap)} more than{" "}
          {worst.name} — the same gap, repeated across every invoice for a
          year, is where this actually adds up.
        </p>
      )}

      <p className="rate-calc-note">
        Platform fee rates are illustrative midpoints from each provider's
        typical pricing, not live figures — actual fees vary by currency
        corridor, country, and payment method. The mid-market rate above
        is live, via the same{" "}
        <a href="https://www.frankfurter.app" target="_blank" rel="noopener noreferrer">
          Frankfurter
        </a>{" "}
        (ECB) source used elsewhere on this site. Confirm current platform
        rates before choosing where to get paid.
      </p>
    </div>
  );
}
