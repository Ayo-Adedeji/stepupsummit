const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const payload = {
      from: "Step-Up Summit <noreply@stepupsummit.org>",
      to: [to],
      subject,
      html,
      reply_to: replyTo || process.env.EMAIL_USER,
    };

    // Resend supports attachments as { filename, content (base64 string) }
    if (attachments && attachments.length > 0) {
      payload.attachments = attachments.map((a) => ({
        filename: a.filename,
        content: a.content, // already base64 string
      }));
    }

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error(`❌ Resend email failed to ${to}:`, error);
      throw new Error(error.message || JSON.stringify(error));
    }

    console.log(`📧 Email sent to ${to}: ${subject} (${data?.id})`);
    return true;
  } catch (err) {
    console.error(`❌ Email error to ${to}: ${err.message}`);
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

  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const html = wrapEmail({ title: "You're registered for Step-Up Summit 3.0", body });
  return sendMail({
    to: email,
    subject: "You're registered for Step-Up Summit 3.0 🎯",
    html,
    replyTo: email,
    attachments: [{ filename: "ticket-qr.png", content: base64Data }],
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
  return sendMail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: "New Free Registration — Step-Up Summit 3.0",
    html,
  });
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

  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const html = wrapEmail({ title: "Ticket confirmed — Step-Up Summit 3.0", body });
  return sendMail({
    to: email,
    subject: "Ticket confirmed — Step-Up Summit 3.0 🎟",
    html,
    replyTo: email,
    attachments: [{ filename: "ticket-qr.png", content: base64Data }],
  });
}

// 4. Paid ticket admin notification
async function sendPaidTicketAdminEmail({ name, email, phone, ticketType, amount, reference, qrId, iAm, school, pitchCompetition }) {
  const body = `
    <p>A new ticket purchase has been made:</p>
    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <tr style="background:${BRAND.blue}; color:${BRAND.white};"><th style="padding:8px; text-align:left;">Field</th><th style="padding:8px; text-align:left;">Value</th></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Name</td><td style="padding:8px;">${name}</td></tr>
      <tr><td style="padding:8px;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      <tr><td style="padding:8px;">I Am A</td><td style="padding:8px;">${iAm || "—"}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">School/Org</td><td style="padding:8px;">${school || "—"}</td></tr>
      <tr><td style="padding:8px;">Pitch Competition</td><td style="padding:8px;">${pitchCompetition || "—"}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Ticket Type</td><td style="padding:8px;">${ticketType}</td></tr>
      <tr><td style="padding:8px;">Amount Paid</td><td style="padding:8px;">₦${amount.toLocaleString()}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;">Reference</td><td style="padding:8px;">${reference}</td></tr>
      <tr><td style="padding:8px;">QR ID</td><td style="padding:8px;">${qrId}</td></tr>
    </table>
  `;

  const html = wrapEmail({ title: `New Ticket Purchase — ${ticketType} — Step-Up Summit 3.0`, body });
  return sendMail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Ticket Purchase — ${ticketType} — Step-Up Summit 3.0`,
    html,
  });
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
  return sendMail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Sponsor — ${packageSelected} — ${brandName}`,
    html,
  });
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

  const attachments = [];
  if (cacFile && cacFile.path) {
    const fs = require("fs");
    const fileContent = fs.readFileSync(cacFile.path).toString("base64");
    attachments.push({ filename: cacFile.originalname || cacFile.filename, content: fileContent });
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
  // Resend doesn't need a persistent connection — API key is validated per-send
  if (process.env.RESEND_API_KEY) {
    console.log("✅ Resend email configured");
  } else {
    console.error("❌ RESEND_API_KEY is missing — emails will not send");
  }
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
