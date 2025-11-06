const express = require("express");
const axios = require("axios");
const sendSponsorshipEmails = require("../utils/sendSponsorshipEmails.cjs");

const router = express.Router();

// ✅ Step 1: Verify Paystack Payment + Send Emails
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
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    // 🔍 Verify transaction with Paystack
    console.log("🔍 Verifying sponsorship payment:", reference);
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
      console.error("❌ Verification failed:", data);
      return res
        .status(400)
        .json({ success: false, message: "Verification failed" });
    }

    console.log("✅ Sponsorship verified for:", email);

    // ✅ Send emails using shared helper
    const ok = await sendSponsorshipEmails({
      reference,
      fullName,
      email,
      phone,
      companyName,
      designation,
      companyWebsite,
      sponsorshipInterest,
      message,
    });

    if (!ok) {
      return res
        .status(500)
        .json({ success: false, message: "Email sending failed" });
    }

    return res.json({
      success: true,
      message: "Sponsorship verified and emails sent successfully.",
    });
  } catch (error) {
    console.error(
      "❌ Sponsorship verification or email error:",
      error.response?.data || error
    );
    return res.status(500).json({
      success: false,
      message: "Error verifying sponsorship or sending emails.",
    });
  }
});

module.exports = router;
