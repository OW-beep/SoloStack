// Paste this into: your Google Sheet > Extensions > Apps Script
// (replace whatever placeholder code is already there).
//
// Then: Deploy > New deployment > type "Web app" > Execute as: Me,
// Who has access: Anyone > Deploy. Copy the resulting URL (ends in
// /exec) into Vercel's GOOGLE_SHEETS_WEBHOOK_URL environment variable.
//
// Expects the Sheet to have a header row: "Email" | "Date"
// (row 1 — the script appends new signups starting at row 2).

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    var data = JSON.parse(e.postData.contents);
    var email = (data.email || "").trim().toLowerCase();

    if (!email || email.indexOf("@") === -1) {
      output.setContent(JSON.stringify({ result: "error", message: "Invalid email" }));
      return output;
    }

    // Check column A for an existing entry so the same address doesn't
    // get added twice if someone submits the form more than once.
    var existingEmails = sheet
      .getRange(2, 1, Math.max(sheet.getLastRow() - 1, 0), 1)
      .getValues()
      .flat()
      .map(function (v) {
        return String(v).trim().toLowerCase();
      });

    if (existingEmails.indexOf(email) !== -1) {
      output.setContent(JSON.stringify({ result: "duplicate" }));
      return output;
    }

    sheet.appendRow([email, data.date || new Date().toISOString()]);
    output.setContent(JSON.stringify({ result: "success" }));
    return output;
  } catch (err) {
    output.setContent(JSON.stringify({ result: "error", message: String(err) }));
    return output;
  }
}
