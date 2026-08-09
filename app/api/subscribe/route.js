import { NextResponse } from "next/server";

// Wired for a Google Sheet instead of a third-party email platform —
// no new SaaS account, no marketing-platform terms of service, just a
// spreadsheet in your existing Google account. To activate:
//
//   1. Create a new Google Sheet. Add a header row: "Email" | "Date".
//   2. In that Sheet: Extensions > Apps Script. Delete the placeholder
//      code and paste the contents of GOOGLE_SHEETS_APPS_SCRIPT.js
//      (in this repo's root) in its place.
//   3. Click Deploy > New deployment > type "Web app".
//        - Execute as: Me
//        - Who has access: Anyone
//      Click Deploy, authorize it when prompted, then copy the Web
//      App URL it gives you (ends in /exec).
//   4. In Vercel: Project > Settings > Environment Variables, add
//      GOOGLE_SHEETS_WEBHOOK_URL with that URL, for Production.
//   5. Redeploy. No further code changes needed — this route picks the
//      URL up automatically.
//
// Until the env var is set, the form still works but returns a clear
// "not set up yet" error instead of silently losing signups.
const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

export async function POST(request) {
  let email;
  try {
    const body = await request.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (!WEBHOOK_URL) {
    console.error(
      "GOOGLE_SHEETS_WEBHOOK_URL is not set — newsletter signups can't be saved yet."
    );
    return NextResponse.json(
      { error: "Newsletter signup isn't fully set up yet. Try again soon." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Apps Script web apps commonly issue a redirect on POST — follow
      // it rather than treating it as an error.
      redirect: "follow",
      body: JSON.stringify({ email, date: new Date().toISOString() }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.result !== "error") {
      if (data.result === "duplicate") {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      return NextResponse.json({ success: true });
    }

    console.error("Google Sheets webhook error:", res.status, data);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Newsletter subscribe request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 502 }
    );
  }
}
