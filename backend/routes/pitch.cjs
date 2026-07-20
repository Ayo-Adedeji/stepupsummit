const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const sheets = require("../services/googleSheets.cjs");
const emailService = require("../services/email.cjs");

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomUUID();
    cb(null, `${randomName}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, JPG, JPEG, PNG allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post("/apply", upload.single("cacDocument"), async (req, res) => {
  console.log("✅ Pitch apply route hit");
  console.log("   Body:", JSON.stringify({ fullName: req.body?.fullName, email: req.body?.email, businessName: req.body?.businessName }));
  console.log("   File:", req.file?.originalname || "none");
  try {
    const { fullName, email, phone, businessName, description, stage, cacRegistered } = req.body;

    if (!fullName || !email || !phone || !businessName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const pitchSheetId = process.env.GOOGLE_SHEET_ID_PITCH;
    if (!pitchSheetId) {
      return res.status(500).json({ success: false, message: "Google Sheets not configured" });
    }

    let cacDocumentUrl = "";
    let cacOriginalName = "No file";
    if (req.file) {
      cacDocumentUrl = `/uploads/${req.file.filename}`;
      cacOriginalName = req.file.originalname || req.file.filename;
    }

    const row = [
      new Date().toISOString(),
      fullName,
      email,
      phone,
      businessName,
      description,
      stage,
      cacRegistered,
      cacOriginalName,
      "PENDING",
    ];

    await sheets.appendRow(pitchSheetId, row);

    // User confirmation email — explicit logging
    console.log(`📧 Sending pitch confirmation to user: ${email}`);
    emailService.sendPitchConfirmationEmail({ fullName, email, businessName })
      .then(() => console.log(`✅ Pitch confirmation email sent to ${email}`))
      .catch((err) => console.error(`❌ Pitch confirmation email failed to ${email}:`, err.message));

    // Admin notification email with CAC document attached if present
    console.log(`📧 Sending pitch admin email to admin`);
    emailService.sendPitchAdminEmail({
      fullName, email, phone, businessName, description, stage, cacRegistered,
      cacFile: req.file || null,
    }).then(() => console.log(`✅ Pitch admin email sent`))
      .catch((err) => console.error(`❌ Pitch admin email failed:`, err.message));

    return res.json({ success: true, message: "Pitch application submitted successfully" });
  } catch (error) {
    console.error("❌ Pitch application error:", error);
    return res.status(500).json({ success: false, message: "Server error submitting application" });
  }
});

module.exports = router;
