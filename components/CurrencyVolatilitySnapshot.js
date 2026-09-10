"use client";

import { useState, useEffect, useCallback } from "react";

// Same free, keyless Frankfurter API (ECB reference rates) used by the
// historical lookup tool on the foreign-currency P&L guide — see
// components/HistoricalFXLookup.js for the fuller explanation. This
// component instead pulls a full year of daily rates in one request
// per target currency's time-series range and reduces it client-side
// to a min/max/swing summary, to make the "exchange rates move more
// than people expect" point above concrete rather than abstract.
const BASE_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];
const TARGET_SETS = {
  USD: ["EUR", "GBP", "CAD", "AUD", "JPY"],
  EUR: ["USD", "GBP", "CAD", "AUD", "JPY"],
  GBP: ["USD", "EUR", "CAD", "AUD", "JPY"],
  CAD: ["USD", "EUR", "GBP", "AUD", "JPY"],
  AUD: ["USD", "EUR", "GBP", "CAD", "JPY"],
};

function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export default function CurrencyVolatilitySnapshot() {
  const [base, setBase] = useState("USD");
  const [status, setStatus] = useState("loading"); // loading | idle | error
  const [rows, setRows] = useState([]);
  const [range, setRange] = useState({ start: "", end: "" });

  const load = useCallback(() => {
    setStatus("loading");
    const targets = TARGET_SETS[base];
    const start = isoDaysAgo(365);
    const end = isoDaysAgo(0);
    const url = `https://api.frankfurter.app/${start}..${end}?from=${base}&to=${targets.join(",")}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("lookup failed");
        return res.json();
      })
      .then((data) => {
        const byDate = data?.rates;
        if (!byDate || Object.keys(byDate).length === 0) throw new Error("empty series");
        const dates = Object.keys(byDate).sort();
        const summary = targets.map((cur) => {
          let min = Infinity;
          let max = -Infinity;
          for (const d of dates) {
            const v = byDate[d]?.[cur];
            if (typeof v !== "number") continue;
            if (v < min) min = v;
            if (v > max) max = v;
          }
          const latestDate = dates[dates.length - 1];
          const latest = byDate[latestDate]?.[cur];
          const swing = min > 0 ? ((max - min) / min) * 100 : 0;
          return { currency: cur, min, max, latest, swing };
        });
        summary.sort((a, b) => b.swing - a.swing);
        setRows(summary);
        setRange({ start: dates[0], end: dates[dates.length - 1] });
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [base]);

  useEffect(() => {
    load();
  }, [load]);

  const maxSwing = rows.length ? rows[0].swing : 1;

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · trailing 12 months, live ECB data</p>
      <h3>How much has each currency actually moved this year</h3>
      <p className="rate-calc-sub">
        The 12-month range between each currency's high and low against{" "}
        {base}, pulled from the same European Central Bank reference rates
        as the lookup tool above. A wider swing means more that gets left
        on the table — or clawed back — depending on when payment actually
        lands, if nothing is tracking it automatically.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field" style={{ maxWidth: 160 }}>
          <label htmlFor="volBase">Billed in</label>
          <select id="volBase" value={base} onChange={(e) => setBase(e.target.value)}>
            {BASE_CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "loading" && <p className="rate-calc-note">Pulling a year of rates&hellip;</p>}

      {status === "error" && (
        <p className="rate-calc-note">
          Couldn't load the last 12 months of rates just now — try switching
          the currency above, or refresh in a moment.
        </p>
      )}

      {status === "idle" && rows.length > 0 && (
        <>
          <div className="cost-bars">
            {rows.map((r) => (
              <div className="cost-bar-row" key={r.currency}>
                <div className="cost-bar-label">
                  <span>
                    {base}/{r.currency}
                  </span>
                  <span className="cost-bar-value">
                    {r.swing.toFixed(1)}% swing
                    <small>
                      {" "}
                      &middot; {r.min.toFixed(4)}&ndash;{r.max.toFixed(4)}
                    </small>
                  </span>
                </div>
                <div className="cost-bar-track">
                  <div
                    className="cost-bar-fill"
                    style={{
                      width: `${(r.swing / maxSwing) * 100}%`,
                      background: "var(--amber)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="rate-calc-note">
            {range.start} to {range.end}. A $5,000 invoice paid at the low
            point of a currency's range instead of its high point is a
            meaningfully different number in {base} terms — which is exactly
            the gap automatic FX gain/loss tracking exists to catch.
          </p>
        </>
      )}

      <p className="rate-calc-note">
        Rates are the European Central Bank's daily reference rates via the{" "}
        <a href="https://www.frankfurter.app" target="_blank" rel="noopener noreferrer">
          Frankfurter
        </a>{" "}
        API, not any specific bank's or payment processor's actual rate.
      </p>
    </div>
  );
}
