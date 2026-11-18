"use client";

import { useState, useMemo } from "react";

function formatMoney(n) {
  return Math.round(n).toLocaleString("en-US");
}

export default function RateCalculator() {
  const [targetIncome, setTargetIncome] = useState(70000);
  const [expenses, setExpenses] = useState(6000);
  const [taxReserve, setTaxReserve] = useState(28);
  const [hoursPerWeek, setHoursPerWeek] = useState(35);
  const [weeksOff, setWeeksOff] = useState(4);
  const [billablePercent, setBillablePercent] = useState(60);

  const { hourlyRate, billableHours } = useMemo(() => {
    const weeksWorked = Math.max(52 - weeksOff, 1);
    const billableHrs = weeksWorked * hoursPerWeek * (billablePercent / 100);
    const grossNeeded = (targetIncome + expenses) / (1 - taxReserve / 100);
    const rate = billableHrs > 0 ? grossNeeded / billableHrs : 0;
    return { hourlyRate: rate, billableHours: Math.round(billableHrs) };
  }, [targetIncome, expenses, taxReserve, hoursPerWeek, weeksOff, billablePercent]);

  return (
    <div className="rate-calc">
      <p className="rate-calc-eyebrow">Interactive · updates as you move the sliders</p>
      <h3>Your floor rate calculator</h3>
      <p className="rate-calc-sub">
        This computes your break-even hourly rate — the number below which
        you're earning less than your stated goal. It's a floor, not a
        market rate; see the section above for how to check it against
        what your specific skill and region actually command.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field">
          <label htmlFor="targetIncome">
            Target annual take-home
            <span className="val">${formatMoney(targetIncome)}</span>
          </label>
          <input
            id="targetIncome"
            type="range"
            min="20000"
            max="250000"
            step="1000"
            value={targetIncome}
            onChange={(e) => setTargetIncome(Number(e.target.value))}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="expenses">
            Annual business expenses
            <span className="val">${formatMoney(expenses)}</span>
          </label>
          <input
            id="expenses"
            type="range"
            min="0"
            max="40000"
            step="500"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="taxReserve">
            Tax reserve
            <span className="val">{taxReserve}%</span>
          </label>
          <input
            id="taxReserve"
            type="range"
            min="0"
            max="45"
            step="1"
            value={taxReserve}
            onChange={(e) => setTaxReserve(Number(e.target.value))}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="hoursPerWeek">
            Working hours per week
            <span className="val">{hoursPerWeek}h</span>
          </label>
          <input
            id="hoursPerWeek"
            type="range"
            min="10"
            max="60"
            step="1"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="weeksOff">
            Weeks off per year
            <span className="val">{weeksOff}</span>
          </label>
          <input
            id="weeksOff"
            type="range"
            min="0"
            max="12"
            step="1"
            value={weeksOff}
            onChange={(e) => setWeeksOff(Number(e.target.value))}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="billablePercent">
            Realistic billable time
            <span className="val">{billablePercent}%</span>
          </label>
          <input
            id="billablePercent"
            type="range"
            min="20"
            max="100"
            step="5"
            value={billablePercent}
            onChange={(e) => setBillablePercent(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="rate-calc-result">
        <span className="rate-calc-result-label">Your floor hourly rate</span>
        <span className="rate-calc-result-value">
          ${formatMoney(hourlyRate)}
          <small>/hour</small>
        </span>
      </div>
      <p className="rate-calc-note">
        Based on ~{billableHours.toLocaleString("en-US")} billable hours/year at
        the settings above. Nothing here is saved or sent anywhere — it
        resets when you leave the page.
      </p>
    </div>
  );
}
