import React, { useState, useEffect } from "react";

const PaymentForm = ({
  defaultTicket = "General Admission",
  defaultAmount = 100,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState(defaultTicket);
  const [amount, setAmount] = useState(defaultAmount);
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [processing, setProcessing] = useState(false);

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
    <section id="payment-instructions" className="py-16 bg-white border-t">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Payment</h2>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                className="mt-1 p-2 border rounded"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Phone (optional)</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2348012345678"
                className="mt-1 p-2 border rounded"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Ticket Type</span>
              <select
                value={ticketType}
                onChange={(e) => {
                  const val = e.target.value;
                  setTicketType(val);
                  if (val === "General Admission (Early Bird)") setAmount(25000);
                  else if (val === "General Admission (Regular)") setAmount(40000);
                  else if (val === "VIP (Early Bird)") setAmount(50000);
                  else if (val === "VIP (Regular)") setAmount(70000);
                }}
                className="mt-1 p-2 border rounded"
              >
                <option>General Admission (Early Bird)</option>
                <option>General Admission (Regular)</option>
                <option>VIP (Early Bird)</option>
                <option>VIP (Regular)</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-sm font-medium">Note (optional)</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any special request or note"
              className="mt-1 p-2 border rounded"
            />
          </label>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700">
                Amount: <span className="font-bold">₦{amount.toLocaleString()}</span>
              </p>
              <p className="text-xs text-gray-500">
                A confirmation email and ticket QR code will be sent after payment.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePaystackPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={processing}
              >
                {processing ? "Processing..." : "Pay"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PaymentForm;
