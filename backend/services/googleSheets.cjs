const { google } = require("googleapis");
const crypto = require("crypto");

// Sanitize value to prevent Google Sheets formula injection
function sanitizeValue(value) {
  if (typeof value !== "string") return value;
  if (/^[=+\-@]/.test(value)) {
    return "'" + value;
  }
  return value;
}

function sanitizeRow(values) {
  return values.map(sanitizeValue);
}

class GoogleSheetsService {
  constructor() {
    this.clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    this.privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    this.auth = null;

    if (this.clientEmail && this.privateKey) {
      this.auth = new google.auth.JWT({
        email: this.clientEmail,
        key: this.privateKey.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      // Test auth on startup
      this.auth.authorize((err) => {
        if (err) {
          console.error("❌ Google Sheets auth failed:", err.message);
        } else {
          console.log("✅ Google Sheets authenticated successfully");
        }
      });
    } else {
      console.warn("⚠️ Google Sheets credentials missing from .env");
    }
  }

  async getAuth() {
    if (!this.auth) return null;
    const token = await this.auth.getAccessToken();
    return token.token;
  }

  async appendRow(sheetId, values) {
    if (!this.auth) {
      console.warn("⚠️ Google Sheets not configured — skipping append");
      return null;
    }

    const sanitizedValues = sanitizeRow(values);
    const sheets = google.sheets({ version: "v4", auth: this.auth });

    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [sanitizedValues] },
      });
      return response.data;
    } catch (err) {
      console.error("❌ Google Sheets append error:", err.message);
      return null;
    }
  }

  async getRows(sheetId) {
    if (!this.auth) return [];

    const sheets = google.sheets({ version: "v4", auth: this.auth });

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Sheet1",
      });
      return response.data.values || [];
    } catch (err) {
      console.error("❌ Google Sheets getRows error:", err.message);
      return [];
    }
  }

  async updateRow(sheetId, rowIndex, values) {
    if (!this.auth) return null;

    const sanitizedValues = sanitizeRow(values);
    const sheets = google.sheets({ version: "v4", auth: this.auth });

    try {
      const response = await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `Sheet1!A${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [sanitizedValues] },
      });
      return response.data;
    } catch (err) {
      console.error("❌ Google Sheets updateRow error:", err.message);
      return null;
    }
  }

  async ensureHeaders(sheetId, headers) {
    const rows = await this.getRows(sheetId);
    if (!rows || rows.length === 0) {
      await this.appendRow(sheetId, headers);
      console.log(`✅ Headers written to sheet ${sheetId}`);
    }
  }
}

module.exports = new GoogleSheetsService();
