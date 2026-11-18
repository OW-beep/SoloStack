"use client";

import { useState, useEffect, useCallback } from "react";

// World Bank Open Data API — free, keyless, official. Indicator
// FP.CPI.TOTL.ZG is annual consumer price inflation (%) by country.
// Docs / background: https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG
// Endpoint shape: /v2/country/{code}/indicator/{code}?format=json&date=YYYY:YYYY
// The API returns [metadata, records[]] — records aren't guaranteed to
// be gap-free (a country can have a missing year), so the chained
// calculation below skips any year without a numeric value rather
// than assuming continuity.
const REGIONS = [
  { code: "USA", label: "United States" },
  { code: "GBR", label: "United Kingdom" },
  { code: "CAN", label: "Canada" },
  { code: "AUS", label: "Australia" },
  { code: "EUU", label: "European Union" },
  { code: "WLD", label: "World average" },
];

const currentYear = new Date().getFullYear();
const EARLIEST_YEAR = 2005;

function formatMoney(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function RateInflationCalculator() {
  const [region, setRegion] = useState("USA");
  const [sinceYear, setSinceYear] = useState(currentYear - 3);
  const [rate, setRate] = useState(75);
  const [status, setStatus] = useState("loading"); // loading | idle | error
  const [result, setResult] = useState(null); // { factor, latestYear }

  const load = useCallback(() => {
    setStatus("loading");
    const url = `https://api.worldbank.org/v2/country/${region}/indicator/FP.CPI.TOTL.ZG?format=json&date=${sinceYear}:${currentYear}&per_page=100`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("lookup failed");
        return res.json();
      })
      .then((json) => {
        const records = json?.[1];
        if (!Array.isArray(records) || records.length === 0) throw new Error("no data");
        // Records come back newest-first; keep only years after the
        // baseline (the baseline year itself isn't compounded — it's
        // the year you set the rate that was fine at the time).
        const usable = records
          .filter((r) => typeof r.value === "number" && Number(r.date) > sinceYear)
          .sort((a, b) => Number(a.date) - Number(b.date));
        if (usable.length === 0) throw new Error("no usable years");
        let factor = 1;
        for (const r of usable) {
          factor *= 1 + r.value / 100;
        }
        const latestYear = Number(usable[usable.length - 1].date);
        setResult({ factor, latestYear });
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [region, sinceYear]);

  useEffect(() => {
    load();
  }, [load]);

  const r = Number(rate) || 0;
  const equivalent = result ? r * result.factor : null;
  const lossPct = result ? (1 - 1 / result.factor) * 100 : null;

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · live World Bank CPI data</p>
      <h3>Has your rate kept up with inflation?</h3>
      <p className="rate-calc-sub">
        Pick where most of your income is priced in, the year you last set
        (or raised) your rate, and what that rate was — this chains the
        actual annual inflation figures since then to show what it would
        need to be today just to match the buying power it had back then.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field" style={{ maxWidth: 180 }}>
          <label htmlFor="infRegion">Priced mostly in</label>
          <select id="infRegion" value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rate-calc-field" style={{ maxWidth: 160 }}>
          <label htmlFor="infYear">Rate last set in</label>
          <select
            id="infYear"
            value={sinceYear}
            onChange={(e) => setSinceYear(Number(e.target.value))}
          >
            {Array.from({ length: currentYear - EARLIEST_YEAR }, (_, i) => currentYear - 1 - i).map(
              (y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              )
            )}
          </select>
        </div>

        <div className="rate-calc-field" style={{ maxWidth: 160 }}>
          <label htmlFor="infRate">
            That rate ($/hr)
            <span className="val">${r}</span>
          </label>
          <input
            id="infRate"
            type="number"
            min="1"
            step="1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>

      {status === "loading" && <p className="rate-calc-note">Pulling inflation data&hellip;</p>}

      {status === "error" && (
        <p className="rate-calc-note">
          Couldn't load inflation data for that region just now — try a
          different region above, or refresh in a moment.
        </p>
      )}

      {status === "idle" && result !== null && (
        <p className="rate-calc-note" style={{ fontSize: "1.05em" }}>
          ${r}/hr from {sinceYear} has the buying power of roughly{" "}
          <strong>{formatMoney(equivalent)}/hr</strong> today (through{" "}
          {result.latestYear}, the latest year with published data) — a{" "}
          {lossPct.toFixed(1)}% real-terms loss if the rate never moved.
        </p>
      )}

      <p className="rate-calc-note">
        This measures inflation only, not what the market actually pays —
        pair it with the market-rate check above rather than using it
        alone. Consumer price data via the{" "}
        <a
          href="https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG"
          target="_blank"
          rel="noopener noreferrer"
        >
          World Bank
        </a>
        .
      </p>
    </div>
  );
}
