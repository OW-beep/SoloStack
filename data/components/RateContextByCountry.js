"use client";

import { useState, useEffect, useCallback } from "react";

// World Bank Open Data API — same free, keyless source already used for
// the inflation checker on this site (see RateInflationCalculator.js),
// just a different indicator: NY.GDP.PCAP.PP.CD is GDP per capita at
// purchasing power parity, in current international dollars. It's a
// rough economic-context number, not a rate benchmark — useful for
// sanity-checking "does this client's market generally pay more or
// less than mine," not for deriving a specific number to quote.
const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "DE", label: "Germany" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "IN", label: "India" },
  { code: "BR", label: "Brazil" },
  { code: "PH", label: "Philippines" },
  { code: "PL", label: "Poland" },
  { code: "NG", label: "Nigeria" },
];

function formatMoney(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function RateContextByCountry() {
  const [status, setStatus] = useState("loading"); // loading | idle | error
  const [data, setData] = useState({}); // { code: { value, year } }
  const [a, setA] = useState("US");
  const [b, setB] = useState("IN");

  const load = useCallback(() => {
    setStatus("loading");
    const codes = COUNTRIES.map((c) => c.code).join(";");
    const url = `https://api.worldbank.org/v2/country/${codes}/indicator/NY.GDP.PCAP.PP.CD?format=json&per_page=500&mrnev=1`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("lookup failed");
        return res.json();
      })
      .then((json) => {
        const records = json?.[1];
        if (!Array.isArray(records) || records.length === 0) throw new Error("no data");
        // mrnev=1 returns the most recent non-empty value per country.
        // The response's own country.id field already matches the
        // 2-letter codes used in COUNTRIES above, so no remapping of
        // the ISO3 code is needed.
        const remapped = {};
        for (const r of records) {
          if (typeof r.value === "number" && r.country?.id) {
            remapped[r.country.id] = { value: r.value, year: r.date };
          }
        }
        setData(remapped);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const aData = data[a];
  const bData = data[b];
  const ratio = aData && bData && bData.value > 0 ? aData.value / bData.value : null;

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · live World Bank data</p>
      <h3>What a client's country tells you about rate expectations</h3>
      <p className="rate-calc-sub">
        GDP per capita, adjusted for purchasing power, for two countries at
        once — a rough gauge of general economic context, not a rate
        formula. Useful for a sanity check before assuming a client
        "should" pay what a client in your own market would.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field" style={{ maxWidth: 200 }}>
          <label htmlFor="ctxA">Your market</label>
          <select id="ctxA" value={a} onChange={(e) => setA(e.target.value)}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="rate-calc-field" style={{ maxWidth: 200 }}>
          <label htmlFor="ctxB">Client's market</label>
          <select id="ctxB" value={b} onChange={(e) => setB(e.target.value)}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "loading" && <p className="rate-calc-note">Loading World Bank data&hellip;</p>}
      {status === "error" && (
        <p className="rate-calc-note">Couldn't load this data just now — try refreshing.</p>
      )}

      {status === "idle" && aData && bData && (
        <p className="rate-calc-note" style={{ fontSize: "1.05em" }}>
          GDP per capita (PPP) is {formatMoney(aData.value)} in{" "}
          {COUNTRIES.find((c) => c.code === a)?.label} vs{" "}
          {formatMoney(bData.value)} in {COUNTRIES.find((c) => c.code === b)?.label}
          {ratio !== null && ratio !== 1 && (
            <>
              {" "}
              — roughly a {ratio > 1 ? ratio.toFixed(1) : (1 / ratio).toFixed(1)}x
              difference{ratio > 1 ? "" : ", the other way"}.
            </>
          )}{" "}
          (latest available: {aData.year}/{bData.year})
        </p>
      )}

      <p className="rate-calc-note">
        This is economic context, not a pricing rule — a client's budget
        depends on their specific business, not their country's average.
        It's most useful for catching an assumption (like expecting a
        client to simply match your local rates) before it becomes an
        awkward negotiation. Data: World Bank, GDP per capita, PPP
        (current international $).
      </p>
    </div>
  );
}
