const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const ticketRoutes = require("./routes/ticket.cjs");
const sponsorshipRoutes = require("./routes/sponsorship.cjs");

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/qrcodes", express.static("qrcodes"));


// Logs
app.use((req, res, next) => {
  console.log(`🟢 ${req.method} ${req.url}`);
  next();
});

// Ensure QR folder
const QR_FOLDER = path.join(__dirname, "qrcodes");
if (!fs.existsSync(QR_FOLDER)) fs.mkdirSync(QR_FOLDER);

// Serve QR images
app.use("/qrcodes", express.static(QR_FOLDER));

// Routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/sponsorship", sponsorshipRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
