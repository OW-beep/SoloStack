"use client";

import { useState, useMemo } from "react";

// Same illustrative all-in fee rates already published in this article's
// Quick Comparison table and static chart — kept in sync deliberately so
// the interactive version never contradicts the prose above it.
const PLATFORMS = [
  { name: "Wise", rate: 0.007, color: "var(--teal)" },
  { name: "Payoneer", rate: 0.025, color: "var(--amber)" },
  { name: "Stripe", rate: 0.035, color: "var(--amber-deep)" },
  { name: "PayPal", rate: 0.044, color: "var(--red)" },
];

function formatMoney(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InternationalPaymentCalculator() {
  const [amount, setAmount] = useState(1000);

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

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · updates as you type</p>
      <h3>What actually lands, by platform</h3>
      <p className="rate-calc-sub">
        Enter an invoice amount to see the estimated take-home after each
        platform's typical all-in cost (transfer fee plus currency
        conversion markup) — the same illustrative rates shown in the
        comparison above.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field" style={{ maxWidth: 280 }}>
          <label htmlFor="paymentAmount">
            Invoice amount (USD)
            <span className="val">${formatMoney(Number(amount) || 0)}</span>
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
      </div>

      <div className="cost-bars">
        {results.map((p) => (
          <div className="cost-bar-row" key={p.name}>
            <div className="cost-bar-label">
              <span>{p.name}</span>
              <span className="cost-bar-value">
                ${formatMoney(p.landed)}
                <small> lands &middot; -${formatMoney(p.fee)}</small>
              </span>
            </div>
            <div className="cost-bar-track">
              <div
                className="cost-bar-fill"
                style={{
                  width: `${(p.landed / (Number(amount) || 1)) * 100}%`,
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
        Rates are illustrative midpoints from each platform's typical
        pricing, not live figures — actual fees vary by currency
        corridor, country, and payment method. Confirm current rates
        before choosing where to get paid.
      </p>
    </div>
  );
}
