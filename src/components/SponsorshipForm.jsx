import React, { useState, useEffect } from "react";

const SponsorshipForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [packageType, setPackageType] = useState("Bronze Sponsor");
  const [price, setPrice] = useState(500000);
  const [processing, setProcessing] = useState(false);

  const packagePrices = {
    "Bronze Sponsor": 100,
    "Silver Sponsor": 1000000,
    "Gold Sponsor": 2500000,
    "Platinum Sponsor": 5000000,
  };

  useEffect(() => {
    setPrice(packagePrices[packageType]);
  }, [packageType]);

  // ✅ Load Paystack (v1 stable)
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js"; // ✅ use v1
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePaystackPayment = async () => {
    if (!fullName || !email) {
      alert("Please enter your name and email before payment.");
      return;
    }

    if (!window.PaystackPop) {
      alert("⚠️ Paystack script not loaded yet. Please reload and try again.");
      return;
    }

    const ref = "SPONSOR-" + Date.now();

    const handler = window.PaystackPop.setup({
      key: "pk_live_11842fe9890a9652ad6002d27db273967377853e",
      email,
      amount: price * 100, // in kobo
      currency: "NGN",
      ref,
      metadata: {
        fullName,
        phone,
        companyName,
        designation,
        companyWebsite,
        sponsorshipPackage: packageType,
        message,
      },
      callback: async function (response) {
  setProcessing(true);
  try {
    const sponsorId = "SPONSOR-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    alert(`✅ Payment Successful!\n\nReference: ${response.reference}\nSponsor ID: ${sponsorId}`);

    // ✅ Send sponsorship verification + emails to backend
    await fetch("https://stepupsummit.org/api/sponsorship/verify-and-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: response.reference,
        fullName,
        email,
        phone,
        companyName,
        designation,
        companyWebsite,
        sponsorshipInterest: packageType,
        message,
      }),
    });

  } catch (err) {
    console.error("Error verifying sponsorship:", err);
    alert("Something went wrong while verifying your payment, but your payment was successful.");
  } finally {
    setProcessing(false);
  }
},

      onClose: function () {
        alert("Transaction cancelled.");
        setProcessing(false);
      },
    });

    handler.openIframe();
  };

  return (
    <section
      id="sponsorship-form"
      className="mt-10 max-w-6xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Sponsorship Form</h1>

      <div className="space-y-3">
        <p className="font-semibold">
          Ask for any other thing you may want that is not on the list. What a
          privilege...😊
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full border-primaryBlue bg-secondary rounded-xl p-3 outline-none h-36"
          placeholder="Your message"
          required
        />
      </div>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <p>Full Name *</p>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border rounded-md w-full p-2"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <p>Email Address *</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md w-full p-2"
            type="email"
            required
          />
        </div>

        <div className="flex flex-col">
          <p>Phone Number *</p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-md w-full p-2"
            type="tel"
            required
          />
        </div>

        <div className="flex flex-col">
          <p>Company Name *</p>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border rounded-md w-full p-2"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <p>Designation</p>
          <input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border rounded-md w-full p-2"
            type="text"
          />
        </div>

        <div className="flex flex-col">
          <p>Company Website / Social Media URL</p>
          <input
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="border rounded-md w-full p-2"
            type="url"
          />
        </div>

        <div className="flex flex-col">
          <p>Select Sponsorship Package *</p>
          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="border rounded-md w-full p-2"
          >
            <option>Bronze Sponsor</option>
            <option>Silver Sponsor</option>
            <option>Gold Sponsor</option>
            <option>Platinum Sponsor</option>
          </select>
        </div>

        <div className="flex flex-col">
          <p>Price (₦)</p>
          <input
            value={price.toLocaleString()}
            readOnly
            className="border rounded-md w-full p-2 bg-gray-100"
          />
        </div>
      </form>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePaystackPayment}
          type="button"
          className={`flex-1 px-4 py-2 rounded text-white font-semibold transition ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={processing}
        >
          {processing ? "Processing..." : "Pay with Card"}
        </button>
      </div>
    </section>
  );
};

export default SponsorshipForm;
