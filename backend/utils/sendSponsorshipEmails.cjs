// utils/sendSponsorshipEmails.cjs
const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendSponsorshipEmails(payload) {
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
  } = payload;

  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  const sponsorEmailHTML = `
    <div style="font-family:Arial, sans-serif; color:#333;">
      <h2>🎉 Sponsorship Confirmation</h2>
      <p>Dear <b>${fullName}</b>,</p>
      <p>Thank you for sponsoring <b>StepUp Summit</b>! Your payment has been received successfully.</p>
      <ul>
        <li><b>Company:</b> ${companyName || "N/A"}</li>
        <li><b>Designation:</b> ${designation || "N/A"}</li>
        <li><b>Package:</b> ${sponsorshipInterest || "N/A"}</li>
        <li><b>Reference:</b> ${reference}</li>
        <li><b>Message:</b> ${message || "None"}</li>
      </ul>
      <p>We'll reach out soon to finalize your sponsorship benefits and logistics.</p>
      <p>Warm regards,<br/>The StepUp Summit Team</p>
    </div>
  `;

  const adminEmailHTML = `
  <div style="font-family:Arial, sans-serif; color:#333;">
    <h2>💼 New Sponsorship Received</h2>
    <p>Hello Admin,</p>
    <p>A new sponsorship payment has been verified for <b>StepUp Summit</b>.</p>
    <ul>
      <li><b>Name:</b> ${fullName}</li>
      <li><b>Email:</b> ${email}</li>
      <li><b>Phone:</b> ${phone || "N/A"}</li>
      <li><b>Company:</b> ${companyName || "N/A"}</li>
      <li><b>Designation:</b> ${designation || "N/A"}</li>
      <li><b>Website:</b> ${companyWebsite || "N/A"}</li>
      <li><b>Package:</b> ${sponsorshipInterest || "N/A"}</li>
      <li><b>Reference:</b> ${reference}</li>
      <li><b>Message:</b> ${message || "None"}</li>
    </ul>
    <p>Please follow up with the sponsor to finalize benefits and logistics.</p>
    <p>Warm regards,<br/>The StepUp Summit System</p>
  </div>
`;


  try {
    await transporter.sendMail({
  from: `"StepUp Summit" <${process.env.EMAIL_USER}>`,
  to: email, // buyer
  subject: "🎉 Sponsorship Payment Successful - StepUp Summit",
  html: sponsorEmailHTML,
});

if (process.env.ADMIN_EMAIL || process.env.EMAIL_USER) {
await transporter.sendMail({
  from: `"StepUp Summit" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER, // ✅ admin = same Gmail
  subject: `💼 New Sponsorship - ${companyName || fullName}`,
  html: adminEmailHTML,
});
}


    console.log("✅ Sponsorship emails sent to:", email);
    return true;
  } catch (err) {
    console.error("❌ Error sending sponsorship emails:", err);
    return false;
  }
}

module.exports = sendSponsorshipEmails;
