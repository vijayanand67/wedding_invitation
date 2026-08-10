// Google Apps Script RSVP backend
// 1) Create a Google Sheet.
// 2) Extensions -> Apps Script.
// 3) Paste this code.
// 4) Replace SHEET_NAME if needed.
// 5) Deploy -> New deployment -> Web app -> Anyone.
// 6) Copy the /exec URL into js/config.js as rsvpWebAppUrl.

const SHEET_NAME = "RSVP";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Create a sheet tab named RSVP");
  const p = e.parameter || {};
  sheet.appendRow([new Date(), p.name || "", p.guests || "", p.wishes || ""]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
