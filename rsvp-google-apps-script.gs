// Google Apps Script RSVP backend
// Bind this script to the Google Sheet:
// Google Sheet -> Extensions -> Apps Script
//
// The current workbook shown in the invitation setup uses the default
// "Sheet1" tab. This code uses RSVP if it exists, otherwise the first sheet.
// It also creates/repairs the expected header row.
//
// Deploy:
// Deploy -> New deployment -> Web app
// Execute as: Me
// Who has access: Anyone
//
// Then copy the /exec URL into js/config.js.

const PREFERRED_SHEET_NAME = "RSVP";
const DEFAULT_SHEET_NAME = "Sheet1";
const HEADERS = ["Timestamp", "Name", "Guests", "Wishes"];

function getRsvpSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("This Apps Script must be bound to the RSVP Google Sheet.");
  }

  let sheet = ss.getSheetByName(PREFERRED_SHEET_NAME);
  if (!sheet) sheet = ss.getSheetByName(DEFAULT_SHEET_NAME);
  if (!sheet) sheet = ss.getSheets()[0];

  if (!sheet) {
    throw new Error("No Google Sheet tab was found.");
  }

  // Ensure the first row has the expected columns.
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some((h, i) => String(firstRow[i] || "").trim() !== h);

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  return sheet;
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      service: "Vijay & Hemalatha RSVP",
      message: "RSVP endpoint is live. Use POST to submit an RSVP."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.parameter) {
      throw new Error("No RSVP form data received.");
    }

    const sheet = getRsvpSheet_();
    const p = e.parameter;

    const name = String(p.name || "").trim();
    const guests = String(p.guests || "").trim();
    const wishes = String(p.wishes || "").trim();

    if (!name) throw new Error("Name is required.");
    if (!guests) throw new Error("Number of guests is required.");

    sheet.appendRow([
      new Date(),
      name,
      guests,
      wishes
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        message: "RSVP received"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: String(error.message || error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
