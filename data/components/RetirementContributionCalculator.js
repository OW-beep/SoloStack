"use client";

import { useState, useMemo } from "react";

// 2026 IRS limits, matching the figures already published in this
// article's own text and comparison table — kept in sync deliberately.
const SEP_CAP = 72000;
const AGE_BRACKETS = {
  under50: { label: "Under 50", employeeDeferral: 24500, combinedCap: 72000 },
  age50to59or64plus: { label: "50–59 or 64+", employeeDeferral: 32500, combinedCap: 80000 },
  age60to63: { label: "60–63", employeeDeferral: 35750, combinedCap: 83250 },
};

function formatMoney(n) {
  return Math.round(n).toLocaleString("en-US");
}

export default function RetirementContributionCalculator() {
  const [income, setIncome] = useState(150000);
  const [ageBracket, setAgeBracket] = useState("under50");

  const { sepTotal, solo401kTotal, employeeDeferral, employerPortion, gap } = useMemo(() => {
    const inc = Number(income) || 0;
    const bracket = AGE_BRACKETS[ageBracket];

    // SEP IRA: single employer-style contribution, 25% of net
    // self-employment compensation, capped at the flat 2026 ceiling.
    // No age-based catch-up applies to a SEP IRA.
    const sepTotal = Math.min(inc * 0.25, SEP_CAP);

    // Solo 401(k): employee deferral (age-adjusted) plus a 25%
    // employer-style contribution, both counting toward the combined
    // age-adjusted cap.
    const employeeDeferral = Math.min(inc, bracket.employeeDeferral);
    const employerPortion = inc * 0.25;
    const solo401kTotal = Math.min(employeeDeferral + employerPortion, bracket.combinedCap);

    return {
      sepTotal,
      solo401kTotal,
      employeeDeferral,
      employerPortion,
      gap: solo401kTotal - sepTotal,
    };
  }, [income, ageBracket]);

  const maxTotal = Math.max(sepTotal, solo401kTotal, 1);

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · updates as you type</p>
      <h3>Estimate your own numbers</h3>
      <p className="rate-calc-sub">
        A simplified 2026 estimate using the same flat-25% approximation
        as the example above — not a substitute for running your exact
        adjusted net earnings past a tax professional.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field">
          <label htmlFor="netIncome">
            Net self-employment income
            <span className="val">${formatMoney(income)}</span>
          </label>
          <input
            id="netIncome"
            type="range"
            min="20000"
            max="400000"
            step="5000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="ageBracket">Age bracket</label>
          <select
            id="ageBracket"
            value={ageBracket}
            onChange={(e) => setAgeBracket(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 3,
              border: "1px solid var(--line-on-dark)",
              background: "var(--charcoal-soft)",
              color: "var(--paper)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
            }}
          >
            {Object.entries(AGE_BRACKETS).map(([key, b]) => (
              <option key={key} value={key}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cost-bars">
        <div className="cost-bar-row">
          <div className="cost-bar-label">
            <span>SEP IRA</span>
            <span className="cost-bar-value">${formatMoney(sepTotal)}</span>
          </div>
          <div className="cost-bar-track">
            <div
              className="cost-bar-fill"
              style={{ width: `${(sepTotal / maxTotal) * 100}%`, background: "var(--teal)" }}
            />
          </div>
        </div>
        <div className="cost-bar-row">
          <div className="cost-bar-label">
            <span>
              Solo 401(k){" "}
              <small style={{ opacity: 0.7 }}>
                (${formatMoney(employeeDeferral)} employee + $
                {formatMoney(employerPortion)} employer)
              </small>
            </span>
            <span className="cost-bar-value">${formatMoney(solo401kTotal)}</span>
          </div>
          <div className="cost-bar-track">
            <div
              className="cost-bar-fill"
              style={{ width: `${(solo401kTotal / maxTotal) * 100}%`, background: "var(--amber)" }}
            />
          </div>
        </div>
      </div>

      {gap > 0 && (
        <p className="rate-calc-note" style={{ marginTop: 16 }}>
          At this income, a Solo 401(k) shelters an estimated $
          {formatMoney(gap)} more than a SEP IRA in the same year.
        </p>
      )}
      {gap <= 0 && (
        <p className="rate-calc-note" style={{ marginTop: 16 }}>
          At this income, both accounts land at roughly the same ceiling
          — the SEP IRA's simplicity becomes the more compelling factor.
        </p>
      )}

      <p className="rate-calc-note">
        Uses a flat 25% approximation for illustration, matching the
        worked example above. Actual limits depend on your specific
        adjusted net earnings calculation — confirm your real numbers
        with a tax professional before contributing.
      </p>
    </div>
  );
}
