const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const axios = require("axios");

const ticketRoutes = require("./routes/ticket.cjs");
const sponsorshipRoutes = require("./routes/sponsorship.cjs");
const pitchRoutes = require("./routes/pitch.cjs");
const sheets = require("./services/googleSheets.cjs");
const app = express();

// Security
app.use(helmet());
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "https://stepupsummit.org",
  "https://www.stepupsummit.org",
  "https://stepup-green.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Rate limiting
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });
const registerLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false });
const verifyLimiter = rateLimit({ windowMs: 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });

app.use(generalLimiter);
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", express.static(path.join(__dirname, "public", "admin")));

// Ensure folders
const QR_FOLDER = path.join(__dirname, "qrcodes");
const UPLOAD_FOLDER = path.join(__dirname, "uploads");
if (!fs.existsSync(QR_FOLDER)) fs.mkdirSync(QR_FOLDER, { recursive: true });
if (!fs.existsSync(UPLOAD_FOLDER)) fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

// Logging
app.use((req, res, next) => {
  console.log(`🟢 ${req.method} ${req.url}`);
  next();
});

// Admin PIN middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (token !== process.env.ADMIN_OVERRIDE_PIN) {
    return res.status(401).json({ success: false, message: "Invalid PIN" });
  }
  next();
}

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { pin } = req.body;
  if (pin === process.env.ADMIN_OVERRIDE_PIN) {
    return res.json({ success: true, token: pin });
  }
  return res.status(401).json({ success: false, message: "Invalid PIN" });
});

// Admin stats
app.get("/api/admin/stats", adminLimiter, requireAdmin, async (req, res) => {
  try {
    const paidSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
    const sponsorSheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;

    let paidCount = 0, freeCount = 0, sponsorCount = 0;

    if (paidSheetId) {
      const paidRows = await sheets.getRows(paidSheetId);
      paidCount = Math.max(0, paidRows.length - 1);
    }
    if (freeSheetId) {
      const freeRows = await sheets.getRows(freeSheetId);
      freeCount = Math.max(0, freeRows.length - 1);
    }
    if (sponsorSheetId) {
      const sponsorRows = await sheets.getRows(sponsorSheetId);
      sponsorCount = Math.max(0, sponsorRows.length - 1);
    }

    return res.json({
      success: true,
      stats: {
        totalRegistered: paidCount + freeCount,
        totalPaid: paidCount,
        totalFree: freeCount,
        totalCheckedIn: 0,
        totalNotCheckedIn: paidCount + freeCount,
        totalSponsors: sponsorCount,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching stats" });
  }
});

// Admin attendees
app.get("/api/admin/attendees", adminLimiter, requireAdmin, async (req, res) => {
  try {
    const paidSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
    const sponsorSheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;
    const filterType = req.query.type || "all"; // all | ticket | sponsor
    const attendees = [];

    if (paidSheetId && filterType !== "sponsor") {
      const paidRows = await sheets.getRows(paidSheetId);
      const header = paidRows[0] || [];
      const nameIdx = header.findIndex((h) => h.toLowerCase().includes("full name"));
      const emailIdx = header.findIndex((h) => h.toLowerCase().includes("email"));
      const typeIdx = header.findIndex((h) => h.toLowerCase().includes("ticket type"));
      const statusIdx = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
      const checkinIdx = header.findIndex((h) => h.toLowerCase().includes("check-in time"));
      const qrIdx = header.findIndex((h) => h.toLowerCase().includes("qr code id"));

      for (let i = 1; i < paidRows.length; i++) {
        attendees.push({
          name: paidRows[i][nameIdx] || "",
          email: paidRows[i][emailIdx] || "",
          ticketType: paidRows[i][typeIdx] || "",
          status: paidRows[i][statusIdx] || "NOT_CHECKED_IN",
          checkinTime: paidRows[i][checkinIdx] || "",
          qrId: paidRows[i][qrIdx] || "",
          type: "ticket",
        });
      }
    }

    if (freeSheetId && filterType !== "sponsor") {
      const freeRows = await sheets.getRows(freeSheetId);
      const header = freeRows[0] || [];
      const nameIdx = header.findIndex((h) => h.toLowerCase().includes("full name"));
      const emailIdx = header.findIndex((h) => h.toLowerCase().includes("email"));
      const typeIdx = header.findIndex((h) => h.toLowerCase().includes("i am a") || h.toLowerCase().includes("ticket type"));
      const statusIdx = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
      const checkinIdx = header.findIndex((h) => h.toLowerCase().includes("check-in time"));
      const qrIdx = header.findIndex((h) => h.toLowerCase().includes("qr code id"));

      for (let i = 1; i < freeRows.length; i++) {
        attendees.push({
          name: freeRows[i][nameIdx] || "",
          email: freeRows[i][emailIdx] || "",
          ticketType: freeRows[i][typeIdx] || "Free",
          status: freeRows[i][statusIdx] || "NOT_CHECKED_IN",
          checkinTime: freeRows[i][checkinIdx] || "",
          qrId: freeRows[i][qrIdx] || "",
          type: "ticket",
        });
      }
    }

    if (sponsorSheetId && filterType !== "ticket") {
      const sponsorRows = await sheets.getRows(sponsorSheetId);
      const header = sponsorRows[0] || [];
      const nameIdx = header.findIndex((h) => h.toLowerCase().includes("contact name"));
      const emailIdx = header.findIndex((h) => h.toLowerCase().includes("email"));
      const brandIdx = header.findIndex((h) => h.toLowerCase().includes("brand"));
      const pkgIdx = header.findIndex((h) => h.toLowerCase().includes("package"));
      const statusIdx = header.findIndex((h) => h.toLowerCase().includes("status"));
      const refIdx = header.findIndex((h) => h.toLowerCase().includes("paystack reference"));
      const amountIdx = header.findIndex((h) => h.toLowerCase().includes("amount"));

      for (let i = 1; i < sponsorRows.length; i++) {
        attendees.push({
          name: sponsorRows[i][nameIdx] || "",
          email: sponsorRows[i][emailIdx] || "",
          ticketType: sponsorRows[i][pkgIdx] || "Sponsor",
          status: sponsorRows[i][statusIdx] || "INQUIRY",
          checkinTime: "",
          qrId: "",
          type: "sponsor",
          brand: sponsorRows[i][brandIdx] || "",
          package: sponsorRows[i][pkgIdx] || "",
          amount: sponsorRows[i][amountIdx] || "",
          reference: sponsorRows[i][refIdx] || "",
        });
      }
    }

    return res.json({ success: true, attendees });
  } catch (error) {
    console.error("❌ Admin attendees error:", error);
    return res.status(500).json({ success: false, message: "Error fetching attendees" });
  }
});

// Export CSV
app.post("/api/admin/export-csv", adminLimiter, requireAdmin, async (req, res) => {
  try {
    const paidSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
    let csv = "Name,Email,Ticket Type,Status,Check-in Time\n";

    if (paidSheetId) {
      const rows = await sheets.getRows(paidSheetId);
      const header = rows[0] || [];
      const nameIdx = header.findIndex((h) => h.toLowerCase().includes("full name"));
      const emailIdx = header.findIndex((h) => h.toLowerCase().includes("email"));
      const typeIdx = header.findIndex((h) => h.toLowerCase().includes("ticket type"));
      const statusIdx = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
      const checkinIdx = header.findIndex((h) => h.toLowerCase().includes("check-in time"));
      for (let i = 1; i < rows.length; i++) {
        csv += `"${rows[i][nameIdx] || ""}","${rows[i][emailIdx] || ""}","${rows[i][typeIdx] || ""}","${rows[i][statusIdx] || ""}","${rows[i][checkinIdx] || ""}"\n`;
      }
    }

    if (freeSheetId) {
      const rows = await sheets.getRows(freeSheetId);
      const header = rows[0] || [];
      const nameIdx = header.findIndex((h) => h.toLowerCase().includes("full name"));
      const emailIdx = header.findIndex((h) => h.toLowerCase().includes("email"));
      const typeIdx = header.findIndex((h) => h.toLowerCase().includes("i am a") || h.toLowerCase().includes("ticket type"));
      const statusIdx = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
      const checkinIdx = header.findIndex((h) => h.toLowerCase().includes("check-in time"));
      for (let i = 1; i < rows.length; i++) {
        csv += `"${rows[i][nameIdx] || ""}","${rows[i][emailIdx] || ""}","${rows[i][typeIdx] || "Free"}","${rows[i][statusIdx] || ""}","${rows[i][checkinIdx] || ""}"\n`;
      }
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=attendees.csv");
    res.send(csv);
  } catch (error) {
    console.error("❌ CSV export error:", error);
    res.status(500).json({ success: false, message: "Error exporting CSV" });
  }
});

// Test email route — hit GET /api/test-email to confirm email is working
app.get("/api/test-email", async (req, res) => {
  try {
    const { Resend } = require("resend");
    const resendClient = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resendClient.emails.send({
      from: "Step-Up Summit <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL || process.env.EMAIL_USER],
      subject: "Test Email — Step-Up Summit Backend",
      html: "<p>✅ Email is working via Resend! Sent at " + new Date().toISOString() + "</p>",
    });

    if (error) {
      return res.status(500).json({ success: false, error: error.message || JSON.stringify(error) });
    }

    return res.json({ success: true, message: "Test email sent to " + (process.env.ADMIN_EMAIL || process.env.EMAIL_USER), id: data?.id });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    email: process.env.EMAIL_USER ? "configured" : "missing",
    sheets: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? "configured" : "missing",
    paystack: process.env.PAYSTACK_SECRET_KEY ? "configured" : "missing",
    timestamp: new Date(),
  });
});

// Routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/sponsorship", sponsorshipRoutes);
app.use("/api/pitch", pitchRoutes);

// Aliases so frontend short URLs work
app.use("/api/register", ticketRoutes);
app.use("/api/paystack", ticketRoutes);
app.use("/api/paystack/sponsor", sponsorshipRoutes);

// Forward /api/paystack/sponsor-initialize → sponsorshipRoutes POST /sponsor-initialize
// The fixed handler (test mode amount, callback_url) lives in routes/sponsorship.cjs
app.post("/api/paystack/sponsor-initialize", (req, res, next) => {
  req.url = "/sponsor-initialize";
  sponsorshipRoutes(req, res, next);
});

// Explicit direct handler — belt and suspenders for /api/register/free
// in case Express 5 router mounting behaves differently
app.post("/api/register/free", (req, res, next) => {
  req.url = "/register/free";
  ticketRoutes(req, res, next);
});

// Ensure Google Sheets headers on startup
const SHEET_HEADERS = {
  [process.env.GOOGLE_SHEET_ID_TICKETS]: ["Timestamp", "Full Name", "Email", "Phone", "Ticket Type", "Amount Paid (₦)", "Paystack Reference", "QR Code ID", "Check-in Status", "Check-in Time"],
  [process.env.GOOGLE_SHEET_ID_FREE]: ["Timestamp", "First Name", "Last Name", "Email", "Phone", "I Am A", "School/Organisation", "Pitch Competition", "What to Gain", "QR Code ID", "Check-in Status", "Check-in Time"],
  [process.env.GOOGLE_SHEET_ID_SPONSORS]: ["Timestamp", "Contact Name", "Brand/Organisation", "Email", "Phone", "Package Selected", "Brand Goals", "Paystack Reference", "Amount Paid (₦)", "Status"],
  [process.env.GOOGLE_SHEET_ID_PITCH]: ["Timestamp", "Full Name", "Email", "Phone", "Business Name", "One-line Description", "Stage", "CAC Registered", "CAC Document filename", "Status"],
};

Promise.all(
  Object.entries(SHEET_HEADERS)
    .filter(([sheetId]) => sheetId && !sheetId.includes("REPLACE") && !sheetId.includes("DUMMY"))
    .map(([sheetId, headers]) => sheets.ensureHeaders(sheetId, headers))
).then(() => {
  console.log("✅ Google Sheets headers verified");
}).catch((err) => {
  console.error("⚠️ Google Sheets header check failed:", err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  // Print all registered routes for debugging
  console.log("\n📋 Registered API routes:");
  const routerStack = (app._router || app.router);
  if (routerStack && routerStack.stack) {
    routerStack.stack.forEach((r) => {
      if (r.route && r.route.path) {
        const methods = Object.keys(r.route.methods).join(",").toUpperCase();
        console.log(`   ${methods} ${r.route.path}`);
      } else if (r.name === "router" && r.handle && r.handle.stack) {
        r.handle.stack.forEach((nestedR) => {
          if (nestedR.route) {
            const methods = Object.keys(nestedR.route.methods).join(",").toUpperCase();
            console.log(`   ${methods} ${nestedR.route.path}`);
          }
        });
      }
    });
  } else {
    console.log("   (route list unavailable in this Express version)");
  }
  console.log("");
});

// Verify email transporter on startup
const emailService = require("./services/email.cjs");
emailService.verifyTransporter();

module.exports = { requireAdmin };
