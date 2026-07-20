# Step-Up Summit Backend Setup

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- A Gmail account (for sending emails)
- Google Cloud account (for Google Sheets)
- Paystack account

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the `backend/` folder with the following variables:

```env
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
ADMIN_EMAIL=your_email@gmail.com

GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
GOOGLE_SHEET_ID_TICKETS=your_tickets_sheet_id
GOOGLE_SHEET_ID_FREE=your_free_reg_sheet_id
GOOGLE_SHEET_ID_SPONSORS=your_sponsors_sheet_id
GOOGLE_SHEET_ID_PITCH=your_pitch_sheet_id

QR_SECRET=stepupsummit_qr_secret_2026
EVENT_DATE=2026-07-19
EVENT_START_TIME=13:00
ADMIN_OVERRIDE_PIN=1234

FRONTEND_URL=https://stepupsummit.org
PORT=5000
```

## Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Google Sheets API**
4. Go to **APIs & Services → Credentials → Create Credentials → Service Account**
5. Download the JSON key file
6. Open the JSON file and copy:
   - `client_email` → `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_SHEETS_PRIVATE_KEY` (preserve newlines)
7. Create 4 Google Sheets with these names:
   - `SUS3_Tickets`
   - `SUS3_FreeRegistrations`
   - `SUS3_Sponsors`
   - `SUS3_PitchApplications`
8. For each sheet, click **Share** and add the service account email with **Editor** access
9. Copy each sheet's ID from the URL (the long string between `/d/` and `/edit`) into the corresponding `.env` variable

### Sheet Column Headers

**SUS3_Tickets:**
```
Timestamp | Full Name | Email | Phone | Ticket Type | Amount Paid | Paystack Reference | QR Code ID | Check-in Status | Check-in Time
```

**SUS3_FreeRegistrations:**
```
Timestamp | Full Name | Last Name | Email | Phone | I Am A | School/Organisation | Pitch Competition | What to Gain | QR Code ID | Check-in Status | Check-in Time
```

**SUS3_Sponsors:**
```
Timestamp | Contact Name | Brand/Organisation | Email | Phone | Package Selected | Brand Goals | Paystack Reference | Amount Paid | Status
```

**SUS3_PitchApplications:**
```
Timestamp | Full Name | Email | Phone | Business Name | One-line Description | Stage | CAC Registered | CAC Document URL | Status
```

## Gmail App Password

1. Go to your Google Account → **Security**
2. Enable **2-Factor Authentication** if not already enabled
3. Go to **App Passwords**
4. Select **Mail** + **Other (Step-Up Summit)**
5. Copy the generated password → `EMAIL_PASS` in `.env`

## Paystack Setup

1. Log in to [dashboard.paystack.com](https://dashboard.paystack.com)
2. Go to **Settings → API Keys**
3. Copy **Secret Key** → `PAYSTACK_SECRET_KEY`
4. Copy **Public Key** → `PAYSTACK_PUBLIC_KEY`
5. Go to **Settings → Webhooks**
6. Add webhook URL: `https://stepupsummit.org/api/tickets/paystack/webhook`

## Running the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000` by default.

## Admin Dashboard

Visit `http://localhost:5000/admin` and enter the admin PIN (`ADMIN_OVERRIDE_PIN` from `.env`) to access the live check-in dashboard.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/free` | Free registration |
| POST | `/api/tickets/paystack/initialize` | Initialize payment |
| POST | `/api/tickets/paystack/webhook` | Paystack webhook |
| POST | `/api/sponsorship/inquiry` | Sponsor inquiry |
| POST | `/api/sponsorship/verify-and-send` | Sponsor payment verification |
| POST | `/api/pitch/apply` | Pitch application |
| POST | `/api/verify-ticket` | QR verification |
| POST | `/api/verify-manual` | Manual override |
| GET | `/api/admin/stats` | Admin stats |
| GET | `/api/admin/attendees` | Admin attendee list |
| POST | `/api/admin/export-csv` | Export CSV |
| POST | `/api/admin/login` | Admin login |

## Testing QR Codes

- Current `EVENT_DATE`: 2026-07-19
- Current `EVENT_START_TIME`: 13:00
- Register a free ticket, check email for QR code, scan after 1:00 PM on event day
- Change `EVENT_DATE` to real event date before launch
