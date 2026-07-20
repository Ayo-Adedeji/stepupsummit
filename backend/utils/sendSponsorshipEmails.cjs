// utils/sendSponsorshipEmails.cjs
const emailService = require("./email.cjs");

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
    amount,
  } = payload;

  try {
    await emailService.sendSponsorPaymentEmail({
      contactName: fullName,
      email,
      phone,
      companyName,
      packageSelected: sponsorshipInterest,
      amount,
      reference,
    });
    await emailService.sendSponsorAdminEmail({
      contactName: fullName,
      email,
      phone,
      companyName,
      packageSelected: sponsorshipInterest,
      amount,
      reference,
      status: "PAID",
    });
    console.log("✅ Sponsorship emails sent to:", email);
    return true;
  } catch (err) {
    console.error("❌ Error sending sponsorship emails:", err);
    return false;
  }
}

module.exports = sendSponsorshipEmails;
