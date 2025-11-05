const express = require("express");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const router = express.Router();

// ✅ Folder to store QR codes locally
const QR_FOLDER = path.join(process.cwd(), "qrcodes");
if (!fs.existsSync(QR_FOLDER)) fs.mkdirSync(QR_FOLDER, { recursive: true });

router.get("/", (req, res) => {
  res.send("🎟️ Tickets API running ✅");
});

// ✅ Paystack webhook endpoint
router.post("/webhook", async (req, res) => {
    try {
        const event = req.body.event;

        if (event !== "charge.success") {
            console.log("⚠️ Ignored non-successful Paystack event");
            return res.sendStatus(200);
        }

        const data = req.body.data;

        // ✅ Extract info from Paystack webhook
        const name = data.metadata?.name || "Unknown Buyer";
        const email = data.customer?.email;
        const phone = data.metadata?.phone || "Not provided";
        const ticketType = data.metadata?.ticketType || "General";
        const note = data.metadata?.note || "";
        const amount = data.amount / 100;
        const reference = data.reference;

        const ticketId = `EVT-${Date.now()}`;
        const verifyURL = `https://stepupsummit.org/verify-ticket?ref=${reference}`;

        // ✅ QR CODE GENERATION
        const qrPath = path.join(QR_FOLDER, `${ticketId}.png`);
        try {
            await QRCode.toFile(qrPath, verifyURL, {
                color: { dark: "#000", light: "#FFF" },
                margin: 2,
                width: 250,
            });
            console.log("✅ QR generated:", qrPath);
        } catch (err) {
            console.error("❌ QR generation failed:", err.message);
            return res.status(500).json({ message: "QR code creation failed" });
        }

        // ✅ Save ticket to file
const TICKETS_FILE = path.join(process.cwd(), "tickets.json");

const newTicket = {
  ticketId,
  reference,
  name,
  email,
  phone,
  ticketType,
  amount,
  note,
  used: false,
  createdAt: new Date().toISOString(),
};

// Load existing tickets
let tickets = [];
if (fs.existsSync(TICKETS_FILE)) {
  const fileData = fs.readFileSync(TICKETS_FILE, "utf8");
  if (fileData.trim()) tickets = JSON.parse(fileData);
}

// Add the new one
tickets.push(newTicket);

// Save back to file
fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2));
console.log("💾 Ticket saved:", reference);

        // ✅ EMAIL SETUP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // ✅ EMAIL TO BUYER
        const mailOptionsBuyer = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🎟️ Step Up Summit Ticket Confirmation",
            html: `
        <div style="font-family:sans-serif;line-height:1.6;background:#f9f9f9;padding:20px;border-radius:10px;max-width:600px;margin:auto;">
          <h2 style="color:#333;">✅ Payment Successful!</h2>
          <p>Dear <b>${name}</b>, thank you for your payment of <b>₦${amount}</b>.</p>
          <p>Your ticket ID is <b>${ticketId}</b>.</p>
          <p>Scan this QR code at the event to verify your entry:</p>
          <div style="text-align:center;margin:20px 0;">
            <img src="cid:qrcode" alt="QR Code" style="width:200px;height:200px;border:1px solid #ddd;border-radius:10px;">
          </div>
          <p>Or click <a href="${verifyURL}">${verifyURL}</a> to verify manually.</p>
          <p>See you at <b>StepUp Summit</b>!</p>
        </div>
      `,
            attachments: [
                {
                    filename: "qrcode.png",
                    path: qrPath,
                    cid: "qrcode",
                },
            ],
        };

        // ✅ EMAIL TO ADMIN
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || "dummyadmin@stepupsummit.org",
            subject: `🎫 New Ticket Purchase - ${ticketId}`,
            html: `
        <div style="font-family:sans-serif;line-height:1.6;background:#fff;padding:20px;border-radius:10px;max-width:600px;margin:auto;">
          <h2>🎟️ New Ticket Purchased</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Ticket Type:</b> ${ticketType}</p>
          <p><b>Amount:</b> ₦${amount}</p>
          <p><b>Reference:</b> ${reference}</p>
          <p><b>Note:</b> ${note}</p>
          <p><b>Verification URL:</b> <a href="${verifyURL}">${verifyURL}</a></p>
          <div style="text-align:center;margin-top:20px;">
            <img src="cid:qrcode" alt="QR Code" style="width:150px;height:150px;border:1px solid #ddd;border-radius:10px;">
          </div>
        </div>
      `,
            attachments: [
                {
                    filename: "qrcode.png",
                    path: qrPath,
                    cid: "qrcode",
                },
            ],
        };

        await transporter.sendMail(mailOptionsBuyer);
        await transporter.sendMail(mailOptionsAdmin);
        console.log("📧 Emails sent to buyer and admin successfully");

        res.json({
            success: true,
            message: "Ticket created and emails sent",
            ticketId,
            verifyURL,
        });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Verify Ticket Endpoint (reads from tickets.json)
// router.get("/verify", async (req, res) => {
    router.get("/", async (req, res) => { 

  try {
    const { ref } = req.query;

    if (!ref) {
      return res.status(400).json({ message: "Ticket reference is required" });
    }

    const TICKETS_FILE = path.join(process.cwd(), "tickets.json");

    if (!fs.existsSync(TICKETS_FILE)) {
      return res.status(404).json({ message: "No tickets found" });
    }

    const tickets = JSON.parse(fs.readFileSync(TICKETS_FILE, "utf8"));
    const ticket = tickets.find((t) => t.reference === ref);

    if (!ticket) {
      return res.status(404).json({ message: "Invalid or expired ticket reference" });
    }

    // ✅ Optional: mark as used if scanned first time
    if (!ticket.used) {
      ticket.used = true;
      ticket.usedAt = new Date().toISOString();
      fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2));
      console.log(`🎟️ Ticket ${ref} marked as used.`);
    }

    res.status(200).json({
      message: "✅ Ticket verified successfully",
      ticket: {
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        ticketType: ticket.ticketType,
        amount: ticket.amount,
        used: ticket.used,
        usedAt: ticket.usedAt || null,
      },
    });
  } catch (error) {
    console.error("❌ Error verifying ticket:", error);
    res.status(500).json({ message: "Server error verifying ticket" });
  }
});



module.exports = router;
