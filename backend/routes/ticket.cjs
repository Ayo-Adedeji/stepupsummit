const express = require("express");
const crypto = require("crypto");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const sheets = require("../services/googleSheets.cjs");
const qrService = require("../services/qr.cjs");
const emailService = require("../services/email.cjs");

dotenv.config();
const router = express.Router();

// Health check
router.get("/", (req, res) => {
  res.send("🎟️ Tickets API running ✅");
});

// =================== QR Verification (frontend) ===================
router.post("/verify-ticket", async (req, res) => {
  try {
    const { qrId } = req.body;
    if (!qrId) {
      return res.status(400).json({ status: "INVALID", message: "QR ID is required" });
    }

    const eventDateTime = qrService.getEventDateTime();
    const verificationStatus = qrService.getVerificationStatus(eventDateTime);

    if (verificationStatus === "TOO_EARLY") {
      return res.status(200).json({
        status: "TOO_EARLY",
        message: `Event has not started yet. Come back on ${process.env.EVENT_DATE} at ${process.env.EVENT_START_TIME}!`,
      });
    }

    if (verificationStatus === "EXPIRED") {
      // Still look up the ticket so frontend can show details during testing
      // Fall through to ticket lookup below, but flag as expired after finding it
      const paidSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
      const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
      let expiredTicket = null;

      if (paidSheetId) {
        const paidRows = await sheets.getRows(paidSheetId);
        const header = paidRows[0] || [];
        const qrIdCol = header.findIndex((h) => h.toLowerCase().includes("qr code id"));
        const nameCol = header.findIndex((h) => h.toLowerCase().includes("full name") || h.toLowerCase().includes("name"));
        const typeCol = header.findIndex((h) => h.toLowerCase().includes("ticket type"));
        for (let i = 1; i < paidRows.length; i++) {
          if (paidRows[i][qrIdCol] === qrId) {
            expiredTicket = { name: paidRows[i][nameCol], ticketType: paidRows[i][typeCol], qrId };
            break;
          }
        }
      }

      if (!expiredTicket && freeSheetId) {
        const freeRows = await sheets.getRows(freeSheetId);
        const header = freeRows[0] || [];
        const qrIdCol = header.findIndex((h) => h.toLowerCase().includes("qr code id"));
        const nameCol = header.findIndex((h) => h.toLowerCase().includes("first name") || h.toLowerCase().includes("name"));
        const typeCol = header.findIndex((h) => h.toLowerCase().includes("i am a") || h.toLowerCase().includes("ticket type"));
        for (let i = 1; i < freeRows.length; i++) {
          if (freeRows[i][qrIdCol] === qrId) {
            expiredTicket = { name: freeRows[i][nameCol], ticketType: freeRows[i][typeCol] || "Free", qrId };
            break;
          }
        }
      }

      return res.status(200).json({
        status: "EXPIRED",
        message: "This ticket has expired.",
        ...(expiredTicket || {}),
      });
    }

    // Search in paid tickets sheet
    const paidSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
    let ticket = null;
    let sheetType = null;

    if (paidSheetId) {
      const paidRows = await sheets.getRows(paidSheetId);
      const header = paidRows[0] || [];
      const qrIdCol = header.findIndex((h) => h.toLowerCase().includes("qr code id"));
      const statusCol = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
      const nameCol = header.findIndex((h) => h.toLowerCase().includes("full name") || h.toLowerCase().includes("name"));
      const typeCol = header.findIndex((h) => h.toLowerCase().includes("ticket type"));

      for (let i = 1; i < paidRows.length; i++) {
        if (paidRows[i][qrIdCol] === qrId) {
          ticket = {
            rowIndex: i + 1,
            qrId: paidRows[i][qrIdCol],
            status: paidRows[i][statusCol],
            name: paidRows[i][nameCol],
            ticketType: paidRows[i][typeCol],
          };
          sheetType = "paid";
          break;
        }
      }
    }

    // Search in free registrations sheet
    if (!ticket && freeSheetId) {
      const freeRows = await sheets.getRows(freeSheetId);
      const header = freeRows[0] || [];
      const qrIdCol = header.findIndex((h) => h.toLowerCase().includes("qr code id"));
      const statusCol = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
      const nameCol = header.findIndex((h) => h.toLowerCase().includes("full name") || h.toLowerCase().includes("name"));
      const typeCol = header.findIndex((h) => h.toLowerCase().includes("i am a") || h.toLowerCase().includes("ticket type"));

      for (let i = 1; i < freeRows.length; i++) {
        if (freeRows[i][qrIdCol] === qrId) {
          ticket = {
            rowIndex: i + 1,
            qrId: freeRows[i][qrIdCol],
            status: freeRows[i][statusCol],
            name: freeRows[i][nameCol],
            ticketType: freeRows[i][typeCol] || "Free",
          };
          sheetType = "free";
          break;
        }
      }
    }

    if (!ticket) {
      return res.status(200).json({ status: "INVALID", message: "Ticket not found" });
    }

    if (ticket.status === "CHECKED_IN") {
      return res.status(200).json({
        status: "ALREADY_USED",
        message: "This ticket has already been scanned. Entry denied.",
        name: ticket.name,
        ticketType: ticket.ticketType,
      });
    }

    // Mark as checked in
    const now = new Date().toISOString();
    const statusColIndex = sheetType === "paid"
      ? (await sheets.getRows(paidSheetId))[0].findIndex((h) => h.toLowerCase().includes("check-in status"))
      : (await sheets.getRows(freeSheetId))[0].findIndex((h) => h.toLowerCase().includes("check-in status"));
    const checkinTimeColIndex = sheetType === "paid"
      ? (await sheets.getRows(paidSheetId))[0].findIndex((h) => h.toLowerCase().includes("check-in time"))
      : (await sheets.getRows(freeSheetId))[0].findIndex((h) => h.toLowerCase().includes("check-in time"));

    const targetSheetId = sheetType === "paid" ? paidSheetId : freeSheetId;
    const updateValues = new Array((await sheets.getRows(targetSheetId))[0].length).fill("");
    updateValues[statusColIndex] = "CHECKED_IN";
    updateValues[checkinTimeColIndex] = now;

    await sheets.updateRow(targetSheetId, ticket.rowIndex, updateValues);

    return res.status(200).json({
      status: "VERIFIED",
      message: "Welcome to Step-Up Summit 3.0!",
      name: ticket.name,
      ticketType: ticket.ticketType,
    });
  } catch (error) {
    console.error("❌ Error verifying ticket:", error);
    return res.status(500).json({ status: "ERROR", message: "Server error verifying ticket" });
  }
});

// =================== Manual Override ===================
router.post("/verify-manual", async (req, res) => {
  try {
    const { identifier, staffPin } = req.body;
    if (!identifier || !staffPin) {
      return res.status(400).json({ success: false, message: "Identifier and staff PIN are required" });
    }

    if (staffPin !== process.env.ADMIN_OVERRIDE_PIN) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const paidSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
    let ticket = null;
    let sheetType = null;

    if (paidSheetId) {
      const paidRows = await sheets.getRows(paidSheetId);
      const header = paidRows[0] || [];
      const qrIdCol = header.findIndex((h) => h.toLowerCase().includes("qr code id"));
      const refCol = header.findIndex((h) => h.toLowerCase().includes("paystack reference"));

      for (let i = 1; i < paidRows.length; i++) {
        if (paidRows[i][qrIdCol] === identifier || paidRows[i][refCol] === identifier) {
          ticket = { rowIndex: i + 1, name: paidRows[i][header.findIndex((h) => h.toLowerCase().includes("full name"))], sheetId: paidSheetId };
          sheetType = "paid";
          break;
        }
      }
    }

    if (!ticket && freeSheetId) {
      const freeRows = await sheets.getRows(freeSheetId);
      const header = freeRows[0] || [];
      const qrIdCol = header.findIndex((h) => h.toLowerCase().includes("qr code id"));

      for (let i = 1; i < freeRows.length; i++) {
        if (freeRows[i][qrIdCol] === identifier) {
          ticket = { rowIndex: i + 1, name: freeRows[i][header.findIndex((h) => h.toLowerCase().includes("full name"))], sheetId: freeSheetId };
          sheetType = "free";
          break;
        }
      }
    }

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const now = new Date().toISOString();
    const rows = await sheets.getRows(ticket.sheetId);
    const header = rows[0];
    const statusCol = header.findIndex((h) => h.toLowerCase().includes("check-in status"));
    const checkinTimeCol = header.findIndex((h) => h.toLowerCase().includes("check-in time"));

    const updateValues = new Array(header.length).fill("");
    updateValues[statusCol] = "CHECKED_IN";
    updateValues[checkinTimeCol] = `MANUAL_OVERRIDE - ${now}`;

    await sheets.updateRow(ticket.sheetId, ticket.rowIndex, updateValues);

    return res.json({ success: true, message: "Manual override successful", name: ticket.name });
  } catch (error) {
    console.error("❌ Manual override error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// =================== Free Registration ===================
router.post("/register/free", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, iAm, school, pitchCompetition, whatToGain } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const freeSheetId = process.env.GOOGLE_SHEET_ID_FREE;
    if (!freeSheetId) {
      return res.status(500).json({ success: false, message: "Google Sheets not configured" });
    }

    // Check duplicate (guard against empty sheet / auth failure)
    const existingRows = await sheets.getRows(freeSheetId);
    if (existingRows && existingRows.length > 0) {
      const emailCol = existingRows[0].findIndex((h) => h.toLowerCase().includes("email"));
      if (emailCol >= 0) {
        const isDuplicate = existingRows.slice(1).some((row) => row[emailCol] === email);
        if (isDuplicate) {
          return res.status(409).json({ success: false, message: "This email is already registered" });
        }
      }
    }

    const qrId = qrService.generateQRId(email, "FREE");
    const verifyURL = `${process.env.FRONTEND_URL || "https://stepupsummit.org"}/verify/${qrId}`;
    const qrDataUrl = await qrService.generateQRCode(verifyURL);

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      iAm,
      school,
      pitchCompetition,
      whatToGain,
      qrId,
      "NOT_CHECKED_IN",
      "",
    ];

    await sheets.appendRow(freeSheetId, row);

    // Send emails (don't block registration on email failure)
    emailService.sendFreeRegistrationEmail({ firstName, email, qrId, qrDataUrl }).catch((err) =>
      console.error("❌ Free registration email error:", err)
    );
    emailService.sendFreeRegistrationAdminEmail({ firstName, lastName, email, phone, iAm, school, pitchCompetition, whatToGain, qrId }).catch((err) =>
      console.error("❌ Free registration admin email error:", err)
    );

    return res.json({ success: true, qrId, message: "Free registration successful" });
  } catch (error) {
    console.error("❌ Free registration error:", error);
    return res.status(500).json({ success: false, message: "Server error during registration" });
  }
});

// =================== Initialize Paystack Payment ===================
router.post("/paystack/initialize", async (req, res) => {
  try {
    const { email, amount, name, phone, ticketType } = req.body;

    if (!email || !amount || !name) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return res.status(500).json({ success: false, message: "Paystack not configured" });
    }

    // TEST MODE: frontend sends amount=100 (₦100) → 10,000 kobo sent to Paystack
    // Go-live: frontend will send amount=5000 (Regular) or amount=10000 (VIP)
    //   Regular → 500,000 kobo (₦5,000)
    //   VIP     → 1,000,000 kobo (₦10,000)
    console.log(`💳 Paystack init: ${email} | ${ticketType} | ₦${amount} (${Math.round(amount * 100)} kobo)`);
    const frontendUrl = process.env.FRONTEND_URL || "https://stepupsummit.org";
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(amount * 100), // amount is in naira, Paystack needs kobo
        callback_url: `${frontendUrl}/payment/verify`,
        metadata: { name, phone, ticketType, ticketTypeSlug: ticketType },
      },
      {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { authorization_url, reference } = response.data.data;
    return res.json({ success: true, authorizationUrl: authorization_url, reference });
  } catch (error) {
    console.error("❌ Paystack initialize error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Error initializing payment" });
  }
});

// =================== Webhook (tickets + sponsorship) ===================
router.post("/paystack/webhook", async (req, res) => {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto
      .createHmac("sha256", paystackSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).send("Unauthorized");
    }

    const event = req.body.event;
    if (event !== "charge.success") return res.sendStatus(200);

    const data = req.body.data;
    const metadata = data.metadata || {};
    const reference = data.reference;
    const isSponsorship = Boolean(metadata.sponsorshipPackage) || (typeof reference === "string" && reference.startsWith("SPONSOR-"));

    if (isSponsorship) {
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
        amount: data.amount / 100,
      };

      const sponsorSheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;
      if (sponsorSheetId) {
        const row = [
          new Date().toISOString(),
          sponsorPayload.fullName,
          sponsorPayload.companyName || "",
          sponsorPayload.email,
          sponsorPayload.phone,
          sponsorPayload.sponsorshipInterest,
          sponsorPayload.message,
          reference,
          sponsorPayload.amount,
          "PAID",
        ];
        await sheets.appendRow(sponsorSheetId, row);
      }

      emailService.sendSponsorPaymentEmail(sponsorPayload).catch((err) =>
        console.error("❌ Sponsor payment email error:", err)
      );
      emailService.sendSponsorAdminEmail({ ...sponsorPayload, status: "PAID" }).catch((err) =>
        console.error("❌ Sponsor admin email error:", err)
      );

      return res.json({ success: true, message: "Sponsorship payment processed" });
    }

    // Ticket flow
    const name = metadata.name || "Unknown Buyer";
    const email = data.customer?.email;
    const phone = metadata.phone || "Not provided";
    const ticketType = metadata.ticketType || "General";
    const amount = data.amount / 100;
    const ticketId = `EVT-${Date.now()}`;
    const qrId = qrService.generateQRId(email, ticketType);
    const verifyURL = `${process.env.FRONTEND_URL || "https://stepupsummit.org"}/verify/${qrId}`;

    const qrPath = await qrService.saveQRCode(qrId, verifyURL);
    const qrDataUrl = await qrService.generateQRCode(verifyURL);

    const ticketSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    if (ticketSheetId) {
      const row = [
        new Date().toISOString(),
        name,
        email,
        phone,
        ticketType,
        amount,
        reference,
        qrId,
        "NOT_CHECKED_IN",
        "",
      ];
      await sheets.appendRow(ticketSheetId, row);
    }

    emailService.sendPaidTicketEmail({ name, email, ticketType, amount, reference, qrDataUrl, verifyURL }).catch((err) =>
      console.error("❌ Paid ticket email error:", err)
    );
    emailService.sendPaidTicketAdminEmail({ name, email, phone, ticketType, amount, reference, qrId }).catch((err) =>
      console.error("❌ Paid ticket admin email error:", err)
    );

    return res.json({ success: true, message: "Ticket created and emails sent", qrId, verifyURL });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// =================== Verify Payment (called from /payment/verify page) ===================
router.get("/paystack/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    if (!reference) {
      return res.status(400).json({ success: false, message: "Reference is required" });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
        },
      }
    );

    const data = verifyResponse.data.data;
    if (!data || data.status !== "success") {
      return res.status(400).json({ success: false, message: "Payment not confirmed by Paystack" });
    }

    const ticketSheetId = process.env.GOOGLE_SHEET_ID_TICKETS;
    const metadata = data.metadata || {};
    const firstName = metadata.firstName || "";
    const lastName = metadata.lastName || "";
    const name = (firstName && lastName) ? `${firstName} ${lastName}`.trim() : (metadata.name || "Guest");
    const email = data.customer?.email || "";
    const phone = metadata.phone || "";
    const iAm = metadata.iAm || "";
    const school = metadata.school || "";
    const pitchCompetition = metadata.pitchCompetition || "";
    const whatToGain = metadata.whatToGain || "";
    const ticketType = metadata.ticketType || "General";
    const amount = data.amount / 100;

    // Check for duplicate reference to prevent double-processing on refresh
    let alreadyProcessed = false;
    if (ticketSheetId) {
      const rows = await sheets.getRows(ticketSheetId);
      if (rows && rows.length > 0) {
        const refCol = rows[0].findIndex((h) => h.toLowerCase().includes("paystack reference"));
        if (refCol >= 0) {
          alreadyProcessed = rows.slice(1).some((row) => row[refCol] === reference);
        }
      }
    }

    if (!alreadyProcessed) {
      const qrId = qrService.generateQRId(email, ticketType);
      const verifyURL = `${process.env.FRONTEND_URL || "https://stepupsummit.org"}/verify/${qrId}`;
      const qrDataUrl = await qrService.generateQRCode(verifyURL);
      await qrService.saveQRCode(qrId, verifyURL);

      if (ticketSheetId) {
        const row = [
          new Date().toISOString(),
          name,
          email,
          phone,
          ticketType,
          amount,
          reference,
          qrId,
          "NOT_CHECKED_IN",
          "",
        ];
        await sheets.appendRow(ticketSheetId, row);
      }

      emailService.sendPaidTicketEmail({ name, email, ticketType, amount, reference, qrDataUrl, verifyURL, iAm, school }).catch((err) =>
        console.error("❌ Paid ticket email error:", err)
      );
      emailService.sendPaidTicketAdminEmail({ name, email, phone, ticketType, amount, reference, qrId, iAm, school, pitchCompetition }).catch((err) =>
        console.error("❌ Paid ticket admin email error:", err)
      );

      console.log(`✅ Ticket processed for ${name} (${reference})`);
    } else {
      console.log(`ℹ️ Reference ${reference} already processed — skipping duplicate`);
    }

    return res.json({
      success: true,
      name,
      email,
      ticketType,
      amount,
      reference,
      alreadyProcessed,
    });
  } catch (error) {
    console.error("❌ Payment verify error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Error verifying payment" });
  }
});

module.exports = router;
