"use client";

import { useState, useEffect } from "react";

// VATComply — free, keyless API sourcing EU VAT rates from the European
// Commission's official TEDB database. No auth, rate-limited to 2
// requests/sec per IP, which this component respects by fetching the
// full rate list once on mount rather than per-selection.
// Docs: https://www.vatcomply.com/documentation
const ENDPOINT = "https://api.vatcomply.com/vat_rates";

export default function VatRateLookup() {
  const [status, setStatus] = useState("loading"); // loading | idle | error
  const [rates, setRates] = useState([]);
  const [countryCode, setCountryCode] = useState("DE");

  useEffect(() => {
    fetch(ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error("lookup failed");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) throw new Error("no data");
        const sorted = [...data].sort((a, b) => a.country_name.localeCompare(b.country_name));
        setRates(sorted);
        // Default to the first country alphabetically if Germany isn't
        // in the response for some reason (shouldn't happen, but the
        // fetch shouldn't crash on it).
        if (!sorted.find((r) => r.country_code === "DE")) {
          setCountryCode(sorted[0].country_code);
        }
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  const selected = rates.find((r) => r.country_code === countryCode);

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · live EU VAT rates</p>
      <h3>What's the VAT rate where your client is?</h3>
      <p className="rate-calc-sub">
        Current standard and reduced VAT rates for all 27 EU member states,
        pulled from the European Commission's own rate database. This
        shows the rate itself — whether you're the one who needs to
        charge it depends on B2B vs. B2C rules and your own registration
        status, which is exactly the kind of thing worth confirming with
        an accountant rather than guessing.
      </p>

      {status === "loading" && <p className="rate-calc-note">Loading current EU VAT rates&hellip;</p>}

      {status === "error" && (
        <p className="rate-calc-note">
          Couldn't load live rates just now — the European Commission
          publishes the full table directly at{" "}
          <a
            href="https://ec.europa.eu/taxation_customs/tedb/#/vat-search"
            target="_blank"
            rel="noopener noreferrer"
          >
            the TEDB database
          </a>
          .
        </p>
      )}

      {status === "idle" && (
        <>
          <div className="rate-calc-grid">
            <div className="rate-calc-field" style={{ maxWidth: 220 }}>
              <label htmlFor="vatCountry">Client's country</label>
              <select
                id="vatCountry"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {rates.map((r) => (
                  <option key={r.country_code} value={r.country_code}>
                    {r.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selected && (
            <p className="rate-calc-note" style={{ fontSize: "1.05em" }}>
              {selected.country_name}'s standard VAT rate is{" "}
              <strong>{selected.standard_rate}%</strong>
              {selected.reduced_rates?.length > 0 && (
                <>
                  , with reduced rates of{" "}
                  {selected.reduced_rates.map((r) => `${r}%`).join(" / ")} on
                  certain categories of goods and services
                </>
              )}
              .
            </p>
          )}

          <p className="rate-calc-note">
            Under the EU's B2B reverse-charge rule, a freelancer outside
            the client's country generally doesn't charge VAT at all on a
            business-to-business invoice — the client self-assesses it —
            provided the client supplies a valid VAT number. B2C digital
            sales, or B2B without a valid VAT number, typically do require
            charging the client-country rate shown above. These are the
            general EU-wide rules, not a substitute for confirming your
            specific situation with an accountant.
          </p>
        </>
      )}

      <p className="rate-calc-note">
        Rates via the European Commission's Taxes in Europe Database
        (TEDB), served by the free{" "}
        <a href="https://www.vatcomply.com" target="_blank" rel="noopener noreferrer">
          VATComply
        </a>{" "}
        API.
      </p>
    </div>
  );
}
