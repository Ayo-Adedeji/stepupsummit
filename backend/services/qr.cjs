const QRCode = require("qrcode");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const QR_FOLDER = path.join(process.cwd(), "qrcodes");
if (!fs.existsSync(QR_FOLDER)) fs.mkdirSync(QR_FOLDER, { recursive: true });

function generateQRId(email, ticketType) {
  const timestamp = Date.now();
  const hash = crypto
    .createHmac("sha256", process.env.QR_SECRET || "stepupsummit_qr_secret_2026")
    .update(`${email}-${ticketType}-${timestamp}`)
    .digest("hex")
    .substring(0, 12)
    .toUpperCase();
  return `SUS3-${ticketType.toUpperCase()}-${hash}`;
}

async function generateQRCode(verificationURL) {
  const qrDataUrl = await QRCode.toDataURL(verificationURL, {
    width: 300,
    margin: 2,
    color: { dark: "#0B1F5C", light: "#FFFFFF" },
  });
  return qrDataUrl;
}

async function saveQRCode(ticketId, verificationURL) {
  const qrPath = path.join(QR_FOLDER, `${ticketId}.png`);
  await QRCode.toFile(qrPath, verificationURL, {
    color: { dark: "#0B1F5C", light: "#FFFFFF" },
    margin: 2,
    width: 300,
  });
  return qrPath;
}

function getEventDateTime() {
  const dateStr = process.env.EVENT_DATE || "2026-07-19";
  const timeStr = process.env.EVENT_START_TIME || "13:00";
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

function getVerificationStatus(eventDateTime) {
  const now = new Date();
  const diffMs = now - eventDateTime;
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 0) {
    // Event hasn't started yet
    return "TOO_EARLY";
  }

  // EVENT_WINDOW_HOURS controls how long after event start tickets remain valid.
  // Default is 12 hours — covers late arrivals and long events.
  // After this window, tickets show EXPIRED (event is fully over).
  const windowHours = parseFloat(process.env.EVENT_WINDOW_HOURS || "12");

  if (diffHours > windowHours) {
    return "EXPIRED";
  }

  return "VALID";
}

module.exports = {
  generateQRId,
  generateQRCode,
  saveQRCode,
  getEventDateTime,
  getVerificationStatus,
  QR_FOLDER,
};
