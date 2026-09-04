const express = require("express");
const axios = require("axios");
const router = express.Router();
const sheets = require("../services/googleSheets.cjs");
const emailService = require("../services/email.cjs");

// Verify sponsorship payment and send emails
router.post("/verify-and-send", async (req, res) => {
  const {
    reference,
    fullName,
    email,
    phone,
    companyName,
    designation,
    companyWebsite,
    sponsorshipInterest,
    message,
  } = req.body;

  if (!reference || !email || !fullName) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = verifyResponse.data.data;
    if (!data || data.status !== "success") {
      return res.status(400).json({ success: false, message: "Verification failed" });
    }

    const amount = data.amount / 100;

    // Save to Google Sheet
    const sponsorSheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;
    if (sponsorSheetId) {
      const row = [
        new Date().toISOString(),
        fullName,
        companyName || "",
        email,
        phone || "",
        sponsorshipInterest,
        message || "",
        reference,
        amount,
        "PAID",
      ];
      await sheets.appendRow(sponsorSheetId, row);
    }

    emailService.sendSponsorPaymentEmail({ fullName, email, phone, companyName, sponsorshipInterest, amount, reference }).catch((err) =>
      console.error("❌ Sponsor payment email error:", err)
    );
    emailService.sendSponsorAdminEmail({ fullName, email, phone, companyName, sponsorshipInterest, amount, reference, status: "PAID" }).catch((err) =>
      console.error("❌ Sponsor admin email error:", err)
    );

    return res.json({ success: true, message: "Sponsorship verified and emails sent successfully." });
  } catch (error) {
    console.error("❌ Sponsorship verification error:", error.response?.data || error);
    return res.status(500).json({ success: false, message: "Error verifying sponsorship." });
  }
});

// Sponsor inquiry (no payment)
router.post("/inquiry", async (req, res) => {
  const { contactName, brandName, email, phone, packageSelected, brandGoals } = req.body;

  if (!contactName || !email || !brandName) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const sponsorSheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;
    if (sponsorSheetId) {
      const row = [
        new Date().toISOString(),
        contactName,
        brandName,
        email,
        phone || "",
        packageSelected,
        brandGoals || "",
        "",
        "",
        "INQUIRY",
      ];
      await sheets.appendRow(sponsorSheetId, row);
    }

    emailService.sendSponsorInquiryEmail({ contactName, email, packageSelected, brandName }).catch((err) =>
      console.error("❌ Sponsor inquiry email error:", err)
    );
    emailService.sendSponsorAdminEmail({ contactName, email, phone, brandName, packageSelected, status: "INQUIRY" }).catch((err) =>
      console.error("❌ Sponsor admin inquiry email error:", err)
    );

    return res.json({ success: true, message: "Sponsorship inquiry received." });
  } catch (error) {
    console.error("❌ Sponsor inquiry error:", error);
    return res.status(500).json({ success: false, message: "Error processing inquiry." });
  }
});

// Sponsor payment initialization
router.post("/sponsor-initialize", async (req, res) => {
  try {
    const { email, amount, sponsorName, phone, packageSelected, reference: clientReference } = req.body;

    if (!email || !amount || !sponsorName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return res.status(500).json({ success: false, message: "Paystack not configured" });
    }

    console.log(`💳 Sponsor Paystack init: ${email} | ${packageSelected} | ₦${amount}`);
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(amount * 100), // amount in naira from frontend, convert to kobo
        ...(clientReference ? { reference: clientReference } : {}),
        callback_url: `${process.env.FRONTEND_URL || "https://stepupsummit.org"}/payment/sponsor-verify`,
        metadata: {
          name: sponsorName,
          phone,
          ticketType: "Sponsorship",
          sponsorshipPackage: packageSelected,
          sponsorName,
        },
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
    console.error("❌ Sponsor payment initialize error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Error initializing sponsorship payment" });
  }
});

// GET /api/sponsorship/verify/:reference
// Called from /payment/sponsor-verify page after Paystack inline popup succeeds
router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    if (!reference) {
      return res.status(400).json({ success: false, message: "Reference is required" });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${paystackSecret}` },
      }
    );

    const data = verifyResponse.data.data;
    if (!data || data.status !== "success") {
      return res.status(400).json({ success: false, message: "Payment not confirmed by Paystack" });
    }

    const metadata = data.metadata || {};
    const name = metadata.sponsorName || metadata.name || "Sponsor";
    const email = data.customer?.email || "";
    const phone = metadata.phone || "";
    const packageSelected = metadata.sponsorshipPackage || metadata.packageSelected || "Sponsorship";
    const amount = data.amount / 100;

    // Check for duplicate reference to prevent double-processing on refresh
    const sponsorSheetId = process.env.GOOGLE_SHEET_ID_SPONSORS;
    let alreadyProcessed = false;
    if (sponsorSheetId) {
      const rows = await sheets.getRows(sponsorSheetId);
      if (rows && rows.length > 0) {
        const refCol = rows[0].findIndex((h) => h.toLowerCase().includes("paystack reference"));
        if (refCol >= 0) {
          alreadyProcessed = rows.slice(1).some((row) => row[refCol] === reference);
        }
      }
    }

    if (!alreadyProcessed) {
      // Save to Google Sheets
      if (sponsorSheetId) {
        const row = [
          new Date().toISOString(),
          name,
          metadata.companyName || "",
          email,
          phone,
          packageSelected,
          "",
          reference,
          amount,
          "PAID",
        ];
        try {
          await sheets.appendRow(sponsorSheetId, row);
          console.log(`✅ Sponsor saved to sheets: ${name} (${reference})`);
        } catch (sheetErr) {
          console.error("❌ Sponsor sheet error:", sheetErr.message);
        }
      }

      // Send confirmation email to sponsor
      emailService.sendSponsorPaymentEmail({
        fullName: name,
        email,
        phone,
        sponsorshipInterest: packageSelected,
        amount,
        reference,
      }).then(() => console.log(`✅ Sponsor payment email sent to ${email}`))
        .catch((err) => console.error(`❌ Sponsor payment email failed:`, err.message));

      // Send admin notification
      emailService.sendSponsorAdminEmail({
        contactName: name,
        email,
        phone,
        packageSelected,
        brandName: metadata.companyName || name,
        amount,
        reference,
        status: "PAID",
      }).then(() => console.log(`✅ Sponsor admin email sent`))
        .catch((err) => console.error(`❌ Sponsor admin email failed:`, err.message));

      console.log(`✅ Sponsor payment processed for ${name} (${reference})`);
    } else {
      console.log(`ℹ️ Sponsor reference ${reference} already processed — skipping duplicate`);
    }

    return res.json({
      success: true,
      name,
      email,
      packageSelected,
      amount,
      reference,
      alreadyProcessed,
    });
  } catch (error) {
    console.error("❌ Sponsor verify error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Error verifying sponsorship payment" });
  }
});

module.exports = router;
