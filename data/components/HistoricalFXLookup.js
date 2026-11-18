"use client";

import { useState, useEffect, useCallback } from "react";

// Frankfurter is a free, keyless, CORS-enabled exchange rate API that
// republishes the European Central Bank's daily reference rates, with
// history back to 1999. That's exactly the "neutral source" this
// article recommends above — so instead of just describing where to
// look one up, this fetches the real historical ECB rate for the date
// and currencies someone actually invoiced in. No API key, no backend
// route needed: this calls the API directly from the browser.
// Docs: https://www.frankfurter.app
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "NZD"];

// The API has data from 1999-01-04 onward and never returns a rate
// for "the future," so we clamp the date picker to that same window.
const MIN_DATE = "1999-01-04";
function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatMoney(n, currency) {
  try {
    return n.toLocaleString("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch {
    return n.toFixed(2);
  }
}

export default function HistoricalFXLookup() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [rateDate, setRateDate] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error

  const lookup = useCallback(() => {
    if (from === to) {
      setRate(1);
      setRateDate(date);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    const url = `https://api.frankfurter.app/${date}?from=${from}&to=${to}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("lookup failed");
        return res.json();
      })
      .then((data) => {
        const r = data?.rates?.[to];
        if (typeof r !== "number") throw new Error("no rate in response");
        setRate(r);
        // Frankfurter returns the most recent prior business day's rate
        // for weekends/holidays — surface the actual date used so
        // there's no confusion about which day the rate is from.
        setRateDate(data.date || date);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [date, from, to]);

  useEffect(() => {
    lookup();
  }, [lookup]);

  const amt = Number(amount) || 0;
  const converted = rate !== null ? amt * rate : null;

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · live ECB reference rate</p>
      <h3>Look up the actual rate for an invoice date</h3>
      <p className="rate-calc-sub">
        Pick the date payment actually landed, the two currencies, and the
        invoice amount — this pulls that day's real European Central Bank
        reference rate, the same neutral source described above, instead of
        whatever your bank or payment processor would have quoted you.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field">
          <label htmlFor="fxDate">Payment date</label>
          <input
            id="fxDate"
            type="date"
            min={MIN_DATE}
            max={today()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="rate-calc-field" style={{ maxWidth: 200 }}>
          <label htmlFor="fxAmount">
            Invoice amount
            <span className="val">{formatMoney(amt, from)}</span>
          </label>
          <input
            id="fxAmount"
            type="number"
            min="0"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="rate-calc-field" style={{ maxWidth: 140 }}>
          <label htmlFor="fxFrom">Invoiced in</label>
          <select id="fxFrom" value={from} onChange={(e) => setFrom(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="rate-calc-field" style={{ maxWidth: 140 }}>
          <label htmlFor="fxTo">Your currency</label>
          <select id="fxTo" value={to} onChange={(e) => setTo(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "loading" && <p className="rate-calc-note">Looking up the rate&hellip;</p>}

      {status === "error" && (
        <p className="rate-calc-note">
          Couldn't reach the rate lookup just now — the ECB doesn't publish a
          rate for every date (weekends and EU holidays), or the request may
          have been blocked. Try an adjacent weekday, or use{" "}
          <a href="https://www.xe.com" target="_blank" rel="noopener noreferrer">
            xe.com
          </a>
          's historical lookup directly.
        </p>
      )}

      {status === "idle" && rate !== null && (
        <p className="rate-calc-note" style={{ fontSize: "1.05em" }}>
          On {rateDate}, {formatMoney(amt, from)} was worth{" "}
          <strong>{formatMoney(converted, to)}</strong> at the ECB reference
          rate (1 {from} = {rate.toFixed(4)} {to})
          {rateDate !== date && (
            <> &mdash; the ECB doesn't publish a rate for {date}, so this uses the most recent prior business day.</>
          )}
          .
        </p>
      )}

      <p className="rate-calc-note">
        Rates are the European Central Bank's daily reference rates via the{" "}
        <a href="https://www.frankfurter.app" target="_blank" rel="noopener noreferrer">
          Frankfurter
        </a>{" "}
        API — a neutral accounting reference, not what any specific bank or
        payment processor would have actually paid you that day.
      </p>
    </div>
  );
}
