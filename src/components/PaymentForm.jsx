import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const generateReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `SUS3-${timestamp}-${random}`;
};

const loadPaystack = () =>
  new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.head.appendChild(script);
    }
    const deadline = Date.now() + 8000;
    const poll = setInterval(() => {
      if (window.PaystackPop) { clearInterval(poll); resolve(); }
      else if (Date.now() > deadline) { clearInterval(poll); reject(new Error("Paystack script failed to load.")); }
    }, 100);
  });

const INPUT = "mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20";

const PaymentForm = ({ selectedTier = "", selectedAmount = null }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [iAm, setIAm] = useState("");
  const [school, setSchool] = useState("");
  const [pitchCompetition, setPitchCompetition] = useState("");
  const [whatToGain, setWhatToGain] = useState("");
  const [ticketType, setTicketType] = useState(selectedTier || "Regular");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [highlightTier, setHighlightTier] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState("");
  const [confirmedName, setConfirmedName] = useState("");
  const [confirmedTicketType, setConfirmedTicketType] = useState("");

  const [displayPrice, setDisplayPrice] = useState(selectedTier === "VIP" ? "₦10,000" : "₦5,000");

  useEffect(() => {
    if (selectedTier) {
      setTicketType(selectedTier);
      setHighlightTier(true);
      setDisplayPrice(selectedTier === "VIP" ? "₦10,000" : "₦5,000");
      const t = setTimeout(() => setHighlightTier(false), 2500);
      return () => clearTimeout(t);
    }
  }, [selectedTier]);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handlePayment = async () => {
    if (!firstName || !lastName || !email) {
      setError("Please fill in your name and email before payment.");
      return;
    }
    if (processing) return;

    setError("");
    setProcessing(true);

    const reference = generateReference();
    const fullName = `${firstName} ${lastName}`.trim();

    try {
      await loadPaystack();

      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email,
        amount: 10000, // TEST MODE: ₦100. Go-live: Regular=500000, VIP=1000000
        ref: reference,
        metadata: {
          name: fullName,
          firstName,
          lastName,
          phone,
          iAm,
          school,
          pitchCompetition,
          whatToGain,
          ticketType,
          custom_fields: [
            { display_name: "Ticket Type", variable_name: "ticket_type", value: ticketType },
            { display_name: "I Am A", variable_name: "i_am_a", value: iAm },
            { display_name: "School/Org", variable_name: "school", value: school },
          ],
        },
        onClose: () => {
          setProcessing(false);
          setError("Payment cancelled. Try again when ready.");
        },
        // Paystack v1 inline SDK rejects async functions — sync wrapper with async IIFE
        callback: (response) => {
          (async () => {
            try {
              const verify = await fetch(`${baseUrl}/api/tickets/paystack/verify/${response.reference}`);
              const data = await verify.json();
              if (data.success) {
                setConfirmedRef(response.reference);
                setConfirmedName(data.name || fullName);
                setConfirmedTicketType(data.ticketType || ticketType);
                setPaymentSuccess(true);
              } else {
                setError("Payment received but confirmation failed. Check your email or contact stepupsummit@gmail.com");
              }
            } catch {
              setError("Could not confirm payment. Contact stepupsummit@gmail.com");
            } finally {
              setProcessing(false);
            }
          })();
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("Payment error:", err);
      setError(
        err.message?.includes("Paystack script failed to load")
          ? "Payment service could not load. Check your internet connection or disable any ad blocker."
          : "Could not start payment. Please try again."
      );
      setProcessing(false);
    }
  };

  if (paymentSuccess) {
    const shareText = encodeURIComponent(
      `I just got my ${confirmedTicketType} ticket to Step-Up Summit 3.0! 🎟️ Join me — register at https://stepupsummit.org`
    );
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-3xl">✓</div>
        <h3 className="font-heading text-2xl font-bold text-brand-dark">Payment Confirmed! 🎉</h3>
        <p className="mt-3 text-gray-600">Hi <b>{confirmedName}</b>, your <b>{confirmedTicketType}</b> ticket is confirmed.</p>
        <p className="mt-2 text-gray-600">Your QR code and ticket details have been sent to your email.</p>
        {confirmedRef && (
          <p className="mt-3 text-sm text-gray-500">Reference: <span className="font-mono font-semibold">{confirmedRef}</span></p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-green-600 px-6 py-3 font-heading font-semibold text-white transition hover:bg-green-700">
            Share on WhatsApp
          </a>
          <Link to="/" className="rounded-full bg-brand-blue px-6 py-3 font-heading font-semibold text-white transition hover:bg-brand-blue-mid">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-7 shadow-lg sm:p-10">
      <h2 className="mb-6 text-center font-heading text-2xl font-bold text-brand-dark">Register for Step-Up Summit 3.0</h2>
      <p className="mb-6 text-center text-sm text-gray-500">December 2026 · ICC Hall, University of Ibadan</p>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">{error}</p>
      )}

      <div className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">First Name</span>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className={INPUT} required />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">Last Name</span>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className={INPUT} required />
          </label>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">Email Address</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" className={INPUT} required />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">Phone Number (WhatsApp)</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+2348012345678" type="tel" className={INPUT} required />
          </label>
        </div>

        {/* I am a + School */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">I am a…</span>
            <select value={iAm} onChange={(e) => setIAm(e.target.value)} className={INPUT} required>
              <option value="">Select one</option>
              <option>Student</option>
              <option>Founder / Entrepreneur</option>
              <option>Young Professional</option>
              <option>Corper (NYSC)</option>
              <option>Other</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">School / Organisation</span>
            <input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Your school or org" className={INPUT} required />
          </label>
        </div>

        {/* Pitch Competition */}
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Do you want to enter the pitch competition?</span>
          <select value={pitchCompetition} onChange={(e) => setPitchCompetition(e.target.value)} className={INPUT} required>
            <option value="">Select one</option>
            <option>No — attending only</option>
            <option>Yes — I have a business idea to pitch</option>
          </select>
        </label>

        {/* What to gain */}
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">What do you hope to gain from 3.0? (optional)</span>
          <textarea value={whatToGain} onChange={(e) => setWhatToGain(e.target.value)} rows={3} className={INPUT} />
        </label>

        {/* Ticket type + Pay */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">Ticket Type</span>
            <select
              value={ticketType}
              onChange={(e) => { setTicketType(e.target.value); setDisplayPrice(e.target.value === "VIP" ? "₦10,000" : "₦5,000"); }}
              className={`${INPUT} ${highlightTier ? "border-2 border-brand-gold ring-2 ring-brand-gold/30" : ""}`}
            >
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
            </select>
          </label>
          <div className="flex flex-col justify-end">
            <p className="text-gray-700">Amount: <span className="font-bold text-brand-dark">{displayPrice}</span></p>
            <p className="text-xs text-gray-500">Confirmation email and QR code sent after payment.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePayment}
          disabled={processing}
          className="w-full min-h-[44px] rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Processing...
            </span>
          ) : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
