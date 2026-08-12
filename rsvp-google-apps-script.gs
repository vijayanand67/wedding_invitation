const HEADERS = ["Timestamp", "Name", "Guests", "Wishes"];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("Bind this script to the RSVP Google Sheet.");
  return ss.getSheetByName("RSVP") || ss.getSheetByName("Sheet1") || ss.getSheets()[0];
}
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:true, service:"Vijay & Hemalatha RSVP"}))
    .setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    const name = String(p.name || "").trim();
    const guests = String(p.guests || "").trim();
    const wishes = String(p.wishes || "").trim();
    if (!name) throw new Error("Name is required.");
    if (!guests) throw new Error("Guests is required.");
    const s = sheet_();
    const h = s.getRange(1,1,1,4).getValues()[0];
    if (HEADERS.some((v,i)=>String(h[i]||"").trim()!==v))
      s.getRange(1,1,1,4).setValues([HEADERS]);
    s.appendRow([new Date(), name, guests, wishes]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err.message||err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
