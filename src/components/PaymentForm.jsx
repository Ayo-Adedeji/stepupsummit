import React, { useState, useEffect } from "react";

const PaymentForm = ({
  defaultTicket = "General Admission",
  defaultAmount = 2000,
  selectedTier = "",
  selectedAmount = null,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState(
    selectedTier || defaultTicket
  );
  const [amount, setAmount] = useState(
    selectedAmount != null ? selectedAmount : defaultAmount
  );
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [processing, setProcessing] = useState(false);
  const [highlightTier, setHighlightTier] = useState(false);

  useEffect(() => {
    if (selectedTier) {
      setTicketType(selectedTier);
      setHighlightTier(true);
      const t = setTimeout(() => setHighlightTier(false), 2500);
      return () => clearTimeout(t);
    }
  }, [selectedTier]);

  // ✅ Base URL for both local and live use
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://stepupsummit.org";

  // ✅ Load Paystack script automatically
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePaystackPayment = () => {
    if (!name || !email) {
      alert("Please enter your name and email before payment.");
      return;
    }

    if (!window.PaystackPop) {
      alert("⚠️ Paystack script not loaded yet. Please reload and try again.");
      return;
    }

    console.log("✅ Proceeding to Paystack setup...");
    setProcessing(true);

    const handler = window.PaystackPop.setup({
      key: "pk_live_11842fe9890a9652ad6002d27db273967377853e", // ✅ your live public key
      email,
      amount: amount * 100, // Paystack uses kobo
      currency: "NGN",
      metadata: {
        name,
        phone,
        ticketType,
        note,
      },
      callback: (response) => {

        // META PURCHASE EVENT HERE
        if (window.fbq) {
          try {
            window.fbq("track", "Purchase", {
              value: amount,
              currency: "NGN",
            });
          } catch (err) {
            console.warn("fbq error:", err);
          }
        }

        alert(
          `✅ Payment successful!\n\nReference: ${response.reference}\n\nA confirmation email with your QR ticket will be sent shortly.`
        );
        console.log("💰 Paystack response:", response);
        // No further calls needed — webhook handles everything server-side
        setProcessing(false);
      },
      onClose: () => {
        alert("Payment window closed.");
        setProcessing(false);
      },
    });

    handler.openIframe();
  };

  return (
    <section id="payment-instructions" className="bg-brand-off-white py-16">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="rounded-2xl bg-white p-7 shadow-lg sm:p-10">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold text-brand-dark">
            Register for Step-Up Summit 3.0
          </h2>
          <p className="mb-8 text-center text-sm text-gray-500">
            December 2026 · ICC Hall, University of Ibadan · Free to attend
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col">
                <span className="text-sm font-semibold text-brand-dark">Full name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-semibold text-brand-dark">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-semibold text-brand-dark">Phone (optional)</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+2348012345678"
                  className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-semibold text-brand-dark">Ticket Type</span>
                <select
                  value={ticketType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTicketType(val);
                    if (val === "General Admission (Student)") setAmount(2000);
                    else if (val === "General Admission (Regular)") setAmount(5000);
                    else if (val === "General Admission (Premium)") setAmount(10000);
                    else if (val === "VIP") setAmount(20000);
                    else if (val === "VVIP") setAmount(50000);
                  }}
                  className={`mt-1 rounded-xl border bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20 ${
                    highlightTier ? "border-2 border-brand-gold ring-2 ring-brand-gold/30" : "border border-gray-300"
                  }`}
                >
                  {!["General Admission (Student)","General Admission (Regular)","General Admission (Premium)","VIP","VVIP"].includes(ticketType) && (
                    <option>{ticketType}</option>
                  )}
                  <option>General Admission (Student)</option>
                  <option>General Admission (Regular)</option>
                  <option>General Admission (Premium)</option>
                  <option>VIP</option>
                  <option>VVIP</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm font-semibold text-brand-dark">Note (optional)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special request or note"
                className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
              />
            </label>

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-gray-700">
                  Amount: <span className="font-bold text-brand-dark">₦{amount.toLocaleString()}</span>
                </p>
                <p className="text-xs text-gray-500">
                  A confirmation email and ticket QR code will be sent after payment.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePaystackPayment}
                className="min-h-[44px] rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={processing}
              >
                {processing ? "Processing..." : "Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentForm;
