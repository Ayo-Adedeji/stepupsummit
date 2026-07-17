const express = require("express");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const sendSponsorshipEmails = require("../utils/sendSponsorshipEmails.cjs");

dotenv.config();
const router = express.Router();

// Append a successful registration to a Google Sheet via the Sheets API.
// Replaces EmailJS as the durable record-keeping system for attendees.
// Add Google Sheets API credentials and Sheet ID when ready (set in .env):
//   GOOGLE_SHEET_ID, GOOGLE_SHEETS_API_KEY  (or a service-account access token)
async function recordToSheet(record) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!sheetId || !apiKey) {
    // Not configured yet — keep existing flows untouched.
    return;
  }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Registrants:append?valueInputOption=USER_ENTERED&key=${apiKey}`;
  const values = [[
    record.createdAt,
    record.name,
    record.email,
    record.phone,
    record.ticketType,
    record.amount,
    record.reference,
    record.ticketId,
  ]];
  await axios.post(url, { values }, { headers: { "Content-Type": "application/json" } });
}

// ✅ Folder to store QR codes locally
const QR_FOLDER = path.join(process.cwd(), "qrcodes");
if (!fs.existsSync(QR_FOLDER)) fs.mkdirSync(QR_FOLDER, { recursive: true });

// Health check
router.get("/", (req, res) => {
  res.send("🎟️ Tickets API running ✅");
});

// =================== Webhook (tickets + sponsorship detection) ===================
router.post("/webhook", async (req, res) => {
  console.log("⚡ /api/tickets/webhook payload:", req.body);

  try {
    const event = req.body.event;
    if (event !== "charge.success") return res.sendStatus(200);

    const data = req.body.data;
    const metadata = data.metadata || {};
    const reference = data.reference;
    const isSponsorship =
      Boolean(metadata.sponsorshipPackage) ||
      (typeof reference === "string" && reference.startsWith("SPONSOR-"));

    if (isSponsorship) {
      console.log("🔁 Webhook detected sponsorship payment — sending sponsorship emails instead of ticket creation.");

      // Prepare payload expected by sponsor email
      const sponsorPayload = {
        reference,
        fullName: metadata.fullName || metadata.name || "Sponsor",
        email: data.customer?.email || metadata.email,
        phone: metadata.phone,
        companyName: metadata.companyName,
        designation: metadata.designation,
        companyWebsite: metadata.companyWebsite,
        sponsorshipInterest: metadata.sponsorshipPackage || "Sponsorship",
        message: metadata.message || "",
      };

      const ok = await sendSponsorshipEmails(sponsorPayload);
      return res.json({ success: ok, message: ok ? "Sponsorship emails sent (via webhook)" : "Failed to send sponsorship emails" });
    }

    // ----- Ticket flow (unchanged) -----
    const name = metadata.name || "Unknown Buyer";
    const email = data.customer?.email;
    const phone = metadata.phone || "Not provided";
    const ticketType = metadata.ticketType || "General";
    const note = metadata.note || "";
    const amount = data.amount / 100;

    const ticketId = `EVT-${Date.now()}`;
    const verifyURL = `https://stepupsummit.org/verify-ticket?ref=${reference}`;

    // Record registrant in Google Sheet (best-effort — never blocks the flow)
    // Add Google Sheets API credentials and Sheet ID when ready
    try {
      await recordToSheet({
        name, email, phone, ticketType, amount, reference, ticketId,
        createdAt: new Date().toISOString(),
      });
    } catch (sheetErr) {
      console.error("⚠️ Google Sheets record skipped:", sheetErr.message);
    }

    // QR CODE
    const qrPath = path.join(QR_FOLDER, `${ticketId}.png`);
    await QRCode.toFile(qrPath, verifyURL, { color: { dark: "#000", light: "#FFF" }, margin: 2, width: 250 });
    console.log("✅ QR generated:", qrPath);

    // Save ticket to tickets.json
    const TICKETS_FILE = path.join(process.cwd(), "tickets.json");
    const newTicket = { ticketId, reference, name, email, phone, ticketType, amount, note, used: false, createdAt: new Date().toISOString() };

    let tickets = [];
    if (fs.existsSync(TICKETS_FILE)) {
      const fileData = fs.readFileSync(TICKETS_FILE, "utf8");
      if (fileData.trim()) tickets = JSON.parse(fileData);
    }
    tickets.push(newTicket);
    fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2));
    console.log("💾 Ticket saved:", reference);

    // Email setup (ticket emails use EMAIL_USER / EMAIL_PASS as before)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptionsBuyer = {
  from: process.env.EMAIL_USER,
  to: email || "dummybuyer@email.com",
  subject: "Step Up Summit Ticket Confirmation",
  html: `
    <div style="font-family:Arial, sans-serif; color:#333;">
      <h2>Your StepUp Summit Ticket</h2>
      <p>Dear ${name},</p>
      <p>Thank you for purchasing a ticket to <b>StepUp Summit</b>.</p>
      <p><b>Ticket Details:</b></p>
      <ul>
        <li><b>Name:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Phone:</b> ${phone}</li>
        <li><b>Package:</b> ${ticketType}</li>
        <li><b>Amount Paid:</b> ₦${amount}</li>
        <li><b>Reference:</b> ${reference}</li>
      </ul>
      <p>Please present this QR code at the event check-in:</p>
      <img src="cid:qrcode" alt="Ticket QR Code" style="width:200px;"/>
      <p>Or click here to verify: <a href="${verifyURL}">${verifyURL}</a></p>
      <p>We look forward to seeing you!</p>
    </div>
  `,
  attachments: [
    { filename: "qrcode.png", path: qrPath, cid: "qrcode" }
  ],
};


    const mailOptionsAdmin = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // admin = same Gmail
  subject: `New Ticket Purchase - ${ticketId}`,
  html: `
    <div style="font-family:Arial, sans-serif; color:#333;">
      <h2>New Ticket Purchase</h2>
      <p>A new ticket has been purchased for <b>StepUp Summit</b>.</p>
      <p><b>Buyer Details:</b></p>
      <ul>
        <li><b>Name:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Phone:</b> ${phone}</li>
        <li><b>Package:</b> ${ticketType}</li>
        <li><b>Amount Paid:</b> ₦${amount}</li>
        <li><b>Reference:</b> ${reference}</li>
      </ul>
      <p>QR Code for verification:</p>
      <img src="cid:qrcode" alt="Ticket QR Code" style="width:200px;"/>
      <p>Verify here: <a href="${verifyURL}">${verifyURL}</a></p>
    </div>
  `,
  attachments: [
    { filename: "qrcode.png", path: qrPath, cid: "qrcode" }
  ],
};


    try { await transporter.sendMail(mailOptionsBuyer); console.log("📧 Buyer email sent"); } catch (err) { console.error("❌ Buyer email failed", err); }
    try { await transporter.sendMail(mailOptionsAdmin); console.log("📧 Admin email sent"); } catch (err) { console.error("❌ Admin email failed", err); }

    return res.json({ success: true, message: "Ticket created and emails attempted", ticketId, verifyURL });
  } catch (err) {
    console.error("❌ Error in /api/tickets/webhook:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// =================== Verify endpoint (for frontend) ===================
router.get("/verify", async (req, res) => {
  try {
    const { ref } = req.query;
    if (!ref) return res.status(400).json({ message: "Ticket reference is required" });

    const TICKETS_FILE = path.join(process.cwd(), "tickets.json");
    if (!fs.existsSync(TICKETS_FILE)) return res.status(404).json({ message: "No tickets database found" });

    const tickets = JSON.parse(fs.readFileSync(TICKETS_FILE, "utf8"));
    const ticket = tickets.find(t => t.reference === ref);
    if (!ticket) return res.status(404).json({ message: "Invalid or expired ticket reference" });

    if (ticket.used) {
      return res.status(200).json({
        status: "already_used",
        message: "⚠️ Ticket Already Verified",
        ticket: {
          ticketId: ticket.ticketId,
          reference: ticket.reference,
          name: ticket.name,
          email: ticket.email,
          phone: ticket.phone,
          ticketType: ticket.ticketType,
          note: ticket.note,
          amount: ticket.amount,
          used: true,
          usedAt: ticket.usedAt,
        },
      });
    }

    // First-time scan → mark as used
    ticket.used = true;
    ticket.usedAt = new Date().toISOString();
    fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2));

    return res.status(200).json({
      status: "verified",
      message: "✅ Ticket Verified Successfully",
      ticket: {
        ticketId: ticket.ticketId,
        reference: ticket.reference,
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        ticketType: ticket.ticketType,
        note: ticket.note,
        amount: ticket.amount,
        used: true,
        usedAt: ticket.usedAt,
      },
    });
  } catch (error) {
    console.error("❌ Error verifying ticket:", error);
    return res.status(500).json({ message: "Server error verifying ticket" });
  }
});



module.exports = router;
