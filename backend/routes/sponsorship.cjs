const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");

const router = express.Router();

// ✅ Verify Sponsorship Payment
router.post("/verify-payment", async (req, res) => {
    const { reference } = req.body;
    if (!reference) return res.status(400).json({ error: "Payment reference is required" });

    try {
        console.log("🔍 Verifying sponsorship:", reference);
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });

        const data = response.data.data;
        if (data.status === "success") {
            console.log("✅ Sponsorship verified:", data.customer.email);
            return res.json({ success: true, message: "Payment verified", payment: data });
        } else {
            return res.status(400).json({ success: false, message: "Payment not successful" });
        }
    } catch (error) {
        console.error("❌ Verification error:", error.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});

// ✅ Send Sponsorship Confirmation Emails
router.post("/send-sponsorship", async (req, res) => {
    const { fullName, email, sponsorshipInterest, reference } = req.body;
    if (!fullName || !email || !sponsorshipInterest) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const sponsorEmailHTML = `
    <h2>🤝 Sponsorship Confirmation</h2>
    <p>Hello ${fullName},</p>
    <p>Thank you for sponsoring StepUp Summit! Your payment has been confirmed.</p>
    <p><b>Interest:</b> ${sponsorshipInterest}</p>
    <p><b>Reference:</b> ${reference}</p>
  `;

    try {
        await transporter.sendMail({
            from: `"StepUp Summit" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎉 Sponsorship Confirmation - StepUp Summit",
            html: sponsorEmailHTML,
        });

        await transporter.sendMail({
            from: `"StepUp Summit" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `🧾 New Sponsorship Payment - ${sponsorshipInterest}`,
            text: `Name: ${fullName}\nEmail: ${email}\nInterest: ${sponsorshipInterest}\nReference: ${reference}`,
        });

        res.json({ success: true, message: "Sponsorship emails sent successfully!" });
    } catch (error) {
        console.error("❌ Email Error:", error);
        res.status(500).json({ success: false, message: "Failed to send emails" });
    }
});

module.exports = router;
