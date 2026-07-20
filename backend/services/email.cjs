const nodemailer = require("nodemailer");
const sheets = require("./googleSheets.cjs");

// Confirm email host with domain provider
// If Google Workspace:
//   host: 'smtp.gmail.com', port: 465
// If Zoho:
//   host: 'smtp.zoho.com', port: 465
// If cPanel:
//   host: 'mail.stepupsummit.org', port: 465
// All use: secure: true, auth: { user, pass }
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
// Port 465 is blocked on Render free tier — use 587 with STARTTLS instead.
// secure:false + port 587 = STARTTLS (upgrades to TLS automatically).
// secure:true + port 465 = SSL from the start (blocked on Render).
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_SECURE = SMTP_PORT === 465;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const BRAND = {
  blue: "#0B1F5C",
  gold: "#FFC107",
  white: "#FFFFFF",
  dark: "#111111",
};

function wrapEmail({ title, body, footer = "Step-Up Summit 3.0 · Powered by Precious Crafts" }) {
  return `
    <div style="font-family:Arial, Helvetica, sans-serif; color:${BRAND.dark}; margin:0; padding:0;">
      <div style="background:${BRAND.blue}; padding:24px; text-align:center;">
        <h1 style="color:${BRAND.gold}; margin:0; font-size:22px; letter-spacing:0.5px;">Step-Up Summit 3.0</h1>
      </div>
      <div style="background:${BRAND.white}; padding:32px; max-width:600px; margin:0 auto;">
        <h2 style="color:${BRAND.blue}; margin-top:0;">${title}</h2>
        ${body}
      </div>
      <div style="background:${BRAND.blue}; padding:16px; text-align:center;">
        <p style="color:${BRAND.gold}; margin:0; font-size:12px;">${footer}</p>
      </div>
    </div>
  `;
}

async function sendMail({ to, subject, html, replyTo, attachments }) {
  const mailOptions = {
    from: `"Step-Up Summit" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    replyTo: replyTo || process.env.EMAIL_USER,
    attachments: attachments || [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}: ${subject} (${info.messageId})`);
    return true;
  } catch (err) {
    console.error(`❌ Email failed to ${to}: [${err.code}] ${err.message}`);
    if (err.code === 'EAUTH') {
      console.error(`   SMTP auth failed. Check EMAIL_USER (${process.env.EMAIL_USER}) and EMAIL_PASS (${process.env.EMAIL_PASS ? '***SET***' : 'MISSING'})`);
    }
    if (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      console.error(`   SMTP connection failed. Host: ${SMTP_HOST}, Port: ${SMTP_PORT}. Port may be blocked by hosting provider.`);
    }
    // Re-throw so callers can surface the real error when needed
    throw err;
  }
}

// 1. Free registration confirmation (to registrant)
async function sendFreeRegistrationEmail({ firstName, email, qrId, qrDataUrl }) {
  const body = `
    <p>Hi <b>${firstName}</b>,</p>
    <p>You're in! Your free spot at <b>Step-Up Summit 3.0</b> is confirmed.</p>
    <p><b>Event Details:</b><br/>Date TBC · ICC Hall, University of Ibadan</p>
    <p>Present this QR code at the entrance on event day:</p>
    <div style="text-align:center; margin:16px 0;">
      <img src="cid:qrcode" alt="QR Code" style="width:200px; height:200px; border:2px solid ${BRAND.gold}; border-radius:8px;" />
    </div>
    <p><b>Reference Number:</b> ${qrId}</p>
    <p>Share with your network:
      <a href="https://wa.me/?text=I'm+attending+Step-Up+Summit+3.0!+Join+me:+${qrId}" style="color:${BRAND.blue};">WhatsApp</a>
    </p>
  `;

  // Extract base64 data from the data URL (strip the "data:image/png;base64," prefix)
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");

  const html = wrapEmail({ title: "You're registered for Step-Up Summit 3.0", body });
  return sendMail({
    to: email,
    subject: "You're registered for Step-Up Summit 3.0 🎯",
    html,
    replyTo: email,
    attachments: [
      {
        filename: "ticket-qr.png",
        content: base64Data,
        encoding: "base64",
        cid: "qrcode",
      },
    ],
  });
}

// 2. Free registration admin notification
async function sendFreeRegistrationAdminEmail({ firstName, lastName, email, phone, iAm, school, pitchCompetition, whatToGain, qrId }) {
  const body = `
    <p>A new free registration has been received:</p>
    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <tr style="background:${BRAND.blue}; color:${BRAND.white};"><th style="padding:8px; text-align:left;">Field</th><th style="padding:8px; text-align:left;">Value</th></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Name</td><td style="padding:8px;">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      <tr><td style="padding:8px;">I Am A</td><td style="padding:8px;">${iAm}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">School/Org</td><td style="padding:8px;">${school}</td></tr>
      <tr><td style="padding:8px;">Pitch Competition</td><td style="padding:8px;">${pitchCompetition}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">What to Gain</td><td style="padding:8px;">${whatToGain}</td></tr>
      <tr><td style="padding:8px;">QR ID</td><td style="padding:8px;">${qrId}</td></tr>
    </table>
  `;

  const html = wrapEmail({ title: "New Free Registration — Step-Up Summit 3.0", body });
  return sendMail({ to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, subject: "New Free Registration — Step-Up Summit 3.0", html });
}

// 3. Paid ticket confirmation (to buyer)
async function sendPaidTicketEmail({ name, email, ticketType, amount, reference, qrDataUrl, verifyURL }) {
  const body = `
    <p>Hi <b>${name}</b>, your <b>${ticketType}</b> ticket is confirmed!</p>
    <p><b>Payment Reference:</b> ${reference}<br/><b>Amount Paid:</b> ₦${amount.toLocaleString()}</p>
    <p>Present this QR code at the entrance on event day:</p>
    <div style="text-align:center; margin:16px 0;">
      <img src="cid:qrcode" alt="QR Code" style="width:200px; height:200px; border:2px solid ${BRAND.gold}; border-radius:8px;" />
    </div>
    <p><b>Event Details:</b><br/>Date TBC · ICC Hall, University of Ibadan</p>
    <p>Verify here: <a href="${verifyURL}" style="color:${BRAND.blue};">${verifyURL}</a></p>
  `;

  // Extract base64 data from the data URL (strip the "data:image/png;base64," prefix)
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");

  const html = wrapEmail({ title: "Ticket confirmed — Step-Up Summit 3.0", body });
  return sendMail({
    to: email,
    subject: "Ticket confirmed — Step-Up Summit 3.0 🎟",
    html,
    replyTo: email,
    attachments: [
      {
        filename: "ticket-qr.png",
        content: base64Data,
        encoding: "base64",
        cid: "qrcode",
      },
    ],
  });
}

// 4. Paid ticket admin notification
async function sendPaidTicketAdminEmail({ name, email, phone, ticketType, amount, reference, qrId }) {
  const body = `
    <p>A new ticket purchase has been made:</p>
    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <tr style="background:${BRAND.blue}; color:${BRAND.white};"><th style="padding:8px; text-align:left;">Field</th><th style="padding:8px; text-align:left;">Value</th></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Name</td><td style="padding:8px;">${name}</td></tr>
      <tr><td style="padding:8px;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      <tr><td style="padding:8px;">Ticket Type</td><td style="padding:8px;">${ticketType}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Amount Paid</td><td style="padding:8px;">₦${amount.toLocaleString()}</td></tr>
      <tr><td style="padding:8px;">Reference</td><td style="padding:8px;">${reference}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">QR ID</td><td style="padding:8px;">${qrId}</td></tr>
    </table>
  `;

  const html = wrapEmail({ title: `New Ticket Purchase — ${ticketType} — Step-Up Summit 3.0`, body });
  return sendMail({ to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, subject: `New Ticket Purchase — ${ticketType} — Step-Up Summit 3.0`, html });
}

// 5. Sponsor inquiry confirmation (to sponsor)
async function sendSponsorInquiryEmail({ contactName, email, packageSelected, brandName }) {
  const body = `
    <p>Dear <b>${contactName}</b>,</p>
    <p>Thank you for your interest in sponsoring <b>Step-Up Summit 3.0</b>.</p>
    <p>We've received your enquiry for the <b>${packageSelected}</b> package.</p>
    <p>Our team will be in touch within 24–48 hours.</p>
    <p>Contact us: <a href="mailto:stepupsummit@gmail.com" style="color:${BRAND.blue};">stepupsummit@gmail.com</a></p>
  `;

  const html = wrapEmail({ title: "Thank you for your interest in sponsoring Step-Up Summit 3.0", body });
  return sendMail({ to: email, subject: "Thank you for your interest in sponsoring Step-Up Summit 3.0", html, replyTo: email });
}

// 6. Sponsor payment confirmation (to sponsor)
async function sendSponsorPaymentEmail({ contactName, fullName, email, packageSelected, sponsorshipInterest, amount, reference, brandName }) {
  // Normalize parameter names — webhook sends fullName/sponsorshipInterest, inquiry sends contactName/packageSelected
  const name = contactName || fullName || "Sponsor";
  const pkg = packageSelected || sponsorshipInterest || "Sponsorship";
  const body = `
    <p>Dear <b>${name}</b>,</p>
    <p>Thank you for partnering with us!</p>
    <p><b>Package:</b> ${pkg}<br/><b>Amount Paid:</b> ₦${amount.toLocaleString()}<br/><b>Reference:</b> ${reference}</p>
    <p>Our team will reach out soon to finalize your sponsorship benefits and logistics.</p>
  `;

  const html = wrapEmail({ title: "Sponsorship payment received — Step-Up Summit 3.0", body });
  return sendMail({ to: email, subject: "Sponsorship payment received — Step-Up Summit 3.0 🙏", html, replyTo: email });
}

// 7. Sponsor admin notification
async function sendSponsorAdminEmail({ contactName, email, phone, packageSelected, brandName, amount, reference, status }) {
  const body = `
    <p>A new sponsor has been recorded:</p>
    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <tr style="background:${BRAND.blue}; color:${BRAND.white};"><th style="padding:8px; text-align:left;">Field</th><th style="padding:8px; text-align:left;">Value</th></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Contact</td><td style="padding:8px;">${contactName}</td></tr>
      <tr><td style="padding:8px;">Brand</td><td style="padding:8px;">${brandName}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr><td style="padding:8px;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Package</td><td style="padding:8px;">${packageSelected}</td></tr>
      <tr><td style="padding:8px;">Amount</td><td style="padding:8px;">${amount ? "₦" + amount.toLocaleString() : "N/A"}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Reference</td><td style="padding:8px;">${reference}</td></tr>
      <tr><td style="padding:8px;">Status</td><td style="padding:8px;">${status}</td></tr>
    </table>
  `;

  const html = wrapEmail({ title: `New Sponsor — ${packageSelected} — ${brandName}`, body });
  return sendMail({ to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, subject: `New Sponsor — ${packageSelected} — ${brandName}`, html });
}

// 8. Pitch application confirmation (to applicant)
async function sendPitchConfirmationEmail({ fullName, email, businessName }) {
  const body = `
    <p>Hi <b>${fullName}</b>,</p>
    <p>We've received your application to pitch <b>${businessName}</b> at Step-Up Summit 3.0.</p>
    <p>Shortlisted founders will be contacted within 48 hours.</p>
    <p><b>Keep building!</b></p>
  `;

  const html = wrapEmail({ title: "Pitch application received — Step-Up Summit 3.0", body });
  return sendMail({ to: email, subject: "Pitch application received — Step-Up Summit 3.0", html, replyTo: email });
}

// 9. Pitch application admin notification
async function sendPitchAdminEmail({ fullName, email, phone, businessName, description, stage, cacRegistered, cacFile }) {
  const body = `
    <p>A new pitch application has been received:</p>
    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <tr style="background:${BRAND.blue}; color:${BRAND.white};"><th style="padding:8px; text-align:left;">Field</th><th style="padding:8px; text-align:left;">Value</th></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Name</td><td style="padding:8px;">${fullName}</td></tr>
      <tr><td style="padding:8px;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      <tr><td style="padding:8px;">Business Name</td><td style="padding:8px;">${businessName}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Description</td><td style="padding:8px;">${description}</td></tr>
      <tr><td style="padding:8px;">Stage</td><td style="padding:8px;">${stage}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">CAC Registered</td><td style="padding:8px;">${cacRegistered}</td></tr>
      <tr><td style="padding:8px;">CAC Document</td><td style="padding:8px;">${cacFile ? cacFile.originalname : "Not provided"}</td></tr>
    </table>
    ${cacFile ? '<p style="margin-top:12px;"><b>CAC document is attached to this email.</b></p>' : ''}
  `;

  // Build attachments array if a file was uploaded
  const attachments = [];
  if (cacFile && cacFile.path) {
    attachments.push({
      filename: cacFile.originalname || cacFile.filename,
      path: cacFile.path,
    });
  }

  const html = wrapEmail({ title: `New Pitch Application — ${businessName}`, body });
  return sendMail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Pitch Application — ${businessName}`,
    html,
    attachments,
  });
}

function verifyTransporter() {
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email transporter error:", error.message);
      if (error.code === "EAUTH") {
        console.error("   → Check EMAIL_USER and EMAIL_PASS in .env");
        console.error("   → Gmail App Password must have no spaces");
        console.error("   → 2FA must be enabled on the Gmail account");
      }
    } else {
      console.log("✅ Email server ready — SMTP connected to", SMTP_HOST + ":" + SMTP_PORT);
    }
  });
}

module.exports = {
  sendMail,
  sendFreeRegistrationEmail,
  sendFreeRegistrationAdminEmail,
  sendPaidTicketEmail,
  sendPaidTicketAdminEmail,
  sendSponsorInquiryEmail,
  sendSponsorPaymentEmail,
  sendSponsorAdminEmail,
  sendPitchConfirmationEmail,
  sendPitchAdminEmail,
  verifyTransporter,
};
