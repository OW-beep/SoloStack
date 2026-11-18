"use client";

import { useState, useMemo } from "react";

function formatMoney(n) {
  return Math.round(n).toLocaleString("en-US");
}

export default function AICodingCostCalculator() {
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const { copilot, cursor, claudeCode, maxCost } = useMemo(() => {
    const weeklyHours = hoursPerDay * daysPerWeek;

    // GitHub Copilot: $10 Individual base; usage-based credits kick in
    // once heavier agent/chat use pushes past the included allowance.
    const copilot = 10 + Math.max(0, weeklyHours - 15) * 2.5;

    // Cursor: $20 Pro base; overage climbs quickly with agent-heavy use,
    // capped by the Pro+ ($60) / Ultra ($200) ceiling.
    const cursor = Math.min(20 + Math.max(0, weeklyHours - 10) * 6, 200);

    // Claude Code: bundled into Claude's Pro/Max plans, so cost moves in
    // steps rather than a smooth curve as usage crosses each tier's limits.
    let claudeCode;
    if (weeklyHours <= 12) claudeCode = 20;
    else if (weeklyHours <= 25) claudeCode = 100;
    else claudeCode = 200;

    const maxCost = Math.max(copilot, cursor, claudeCode);
    return { copilot, cursor, claudeCode, maxCost };
  }, [hoursPerDay, daysPerWeek]);

  const bars = [
    { name: "GitHub Copilot", value: copilot, color: "var(--teal)" },
    { name: "Cursor", value: cursor, color: "var(--amber)" },
    { name: "Claude Code", value: claudeCode, color: "var(--red)" },
  ];

  return (
    <div className="rate-calc cost-calc">
      <p className="rate-calc-eyebrow">Interactive · updates as you move the sliders</p>
      <h3>What would each tool actually cost you?</h3>
      <p className="rate-calc-sub">
        A rough monthly estimate based on how many hours a week you'd
        realistically lean on AI-assisted coding, modeled on each
        provider's published August 2026 pricing tiers. Treat it as a
        starting comparison, not a bill.
      </p>

      <div className="rate-calc-grid">
        <div className="rate-calc-field">
          <label htmlFor="hoursPerDay">
            AI-assisted coding, per day
            <span className="val">{hoursPerDay}h</span>
          </label>
          <input
            id="hoursPerDay"
            type="range"
            min="0.5"
            max="8"
            step="0.5"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
          />
        </div>

        <div className="rate-calc-field">
          <label htmlFor="daysPerWeek">
            Working days per week
            <span className="val">{daysPerWeek}</span>
          </label>
          <input
            id="daysPerWeek"
            type="range"
            min="1"
            max="7"
            step="1"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="cost-bars">
        {bars.map((b) => (
          <div className="cost-bar-row" key={b.name}>
            <div className="cost-bar-label">
              <span>{b.name}</span>
              <span className="cost-bar-value">
                ${formatMoney(b.value)}
                <small>/mo</small>
              </span>
            </div>
            <div className="cost-bar-track">
              <div
                className="cost-bar-fill"
                style={{
                  width: `${maxCost > 0 ? (b.value / maxCost) * 100 : 0}%`,
                  background: b.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="rate-calc-note">
        Models Copilot's usage-based credits above its included allowance,
        Cursor's Pro / Pro+ / Ultra overage pattern, and Claude Code's
        step from the Pro plan to Max 5x and Max 20x as weekly usage
        climbs. Actual bills depend heavily on task complexity and model
        choice, not just hours logged — confirm current pricing with
        each provider before budgeting a client project around one.
      </p>
    </div>
  );
}
