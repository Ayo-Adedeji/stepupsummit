import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import CountUp from "../components/CountUp";
import { Spark, Eyebrow } from "../components/ui";

import sponsor1 from "../assets/sponsor1.png";
import sponsor2 from "../assets/sponsor2.png";
import sponsor3 from "../assets/sponsor3.png";
import sponsor4 from "../assets/sponsor4.png";
import sponsor6 from "../assets/sponsor6.png";
import sponsor10 from "../assets/Sponsor10.png";
import sponsor11 from "../assets/sponsor11.png";
import sponsor12 from "../assets/sponsor12.png";
import sponsor13 from "../assets/sponsor13.png";
import sponsor14 from "../assets/sponsor14.jpeg";
import cirveeLogo from "../assets/cirvee logo.jpeg";
import goodyLogo from "../assets/Goody.PNG";

const tiers = [
  {
    id: "headline",
    name: "HEADLINE",
    price: 5000000,
    color: "#FFC107",
    badge: "MOST VISIBLE",
    points: [
      "Powered by lead-partner branding everywhere",
      "Keynote or branded panel + 15-min spotlight",
      "Double-page programme ad · VIP lounge",
      "Exhibition space · attendee database (opt-in)",
      "Post-event impact report",
    ],
  },
  {
    id: "gold",
    name: "GOLD",
    price: 2500000,
    color: "#4FC3F7",
    points: [
      "Logo on event banners & website",
      "Social media recognition package",
      "Verbal recognition at the summit",
      "Branded booth space",
      "Networking session access",
    ],
  },
  {
    id: "silver",
    name: "SILVER",
    price: 1500000,
    color: "#B0BEC5",
    points: [
      "Logo on website & select event materials",
      "Social media mentions",
      "Verbal recognition during summit",
      "Material distribution to attendees",
      "Networking access",
    ],
  },
  {
    id: "bronze",
    name: "BRONZE",
    price: 750000,
    color: "#EF9A9A",
    points: [
      "Logo visibility & verbal recognition",
      "Sponsor appreciation posts",
      "Screen mentions during breaks",
      "Material distribution opportunity",
      "Brand presence in event areas",
    ],
  },
];

const SponsorInquiryForm = ({ prefill, setPrefill }) => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = {
      contactName: formData.get("Contact Name"),
      brandName: formData.get("Brand/Organisation Name"),
      email: formData.get("Email Address"),
      phone: formData.get("Phone Number"),
      packageSelected: formData.get("Sponsorship Package"),
      brandGoals: formData.get("Brand Goals"),
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`${baseUrl}/api/sponsorship/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        setSent(true);
      } else {
        setError(result.message || `Server error (${res.status}). Please try again.`);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          Inquiry received
        </h3>
        <p className="mt-4 text-gray-600">
          We&apos;ve received your inquiry. Expect to hear from us within 24–48
          hours. We can&apos;t wait to build 3.0 with you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-7 shadow-lg sm:p-10">
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      <div className="space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Contact Name</span>
          <input
            name="Contact Name"
            type="text"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Brand/Organisation Name</span>
          <input
            name="Brand/Organisation Name"
            type="text"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Email Address</span>
          <input
            name="Email Address"
            type="email"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Phone Number</span>
          <input
            name="Phone Number"
            type="tel"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">
            Sponsorship Package Interested In
          </span>
          <select
            name="Sponsorship Package"
            required
            value={prefill}
            onChange={(e) => setPrefill(e.target.value)}
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          >
            <option value="">Select a package</option>
            {tiers.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} — ₦{t.price.toLocaleString()}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">
            Tell us about your brand and goals
          </span>
          <textarea
            name="Brand Goals"
            rows={4}
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-gold px-8 py-4 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </div>
    </form>
  );
};

// Helper — fresh unique reference on every call
const generateReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `SUS3-${timestamp}-${random}`;
};

// Ensures window.PaystackPop is available, injecting the script if needed.
// Returns a Promise that resolves when PaystackPop is ready, or rejects after timeout.
const loadPaystack = () =>
  new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();

    const existing = document.querySelector(
      'script[src="https://js.paystack.co/v1/inline.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const deadline = Date.now() + 8000;
    const poll = setInterval(() => {
      if (window.PaystackPop) {
        clearInterval(poll);
        resolve();
      } else if (Date.now() > deadline) {
        clearInterval(poll);
        reject(new Error("Paystack script failed to load."));
      }
    }, 100);
  });

const sponsorLogos = [cirveeLogo, goodyLogo, sponsor1, sponsor2, sponsor3, sponsor4, sponsor6, sponsor10, sponsor11, sponsor12, sponsor13, sponsor14];

const SponsorPaymentForm = ({ selectedTier }) => {
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState("");
  const [brandGoals, setBrandGoals] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // TEST MODE amounts in kobo (₦100 each). Go-live amounts in kobo:
  // headline: 500000000, gold: 250000000, silver: 150000000, bronze: 75000000
  const tierAmounts = {
    headline: 10000,
    gold: 10000,
    silver: 10000,
    bronze: 10000,
  };

  const handlePayment = async () => {
    if (!contactName || !email) {
      setError("Please enter your name and email.");
      return;
    }
    if (processing) return;

    setError("");
    setProcessing(true);

    // Generate fresh reference every click
    const reference = generateReference();
    console.log("Sponsor reference being used:", reference);

    const amount = tierAmounts[selectedTier.name.toLowerCase()] || 10000;

    try {
      // Make sure the Paystack inline script is loaded before calling .setup()
      await loadPaystack();

      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email,
        amount,
        ref: reference,
        metadata: {
          sponsorName: contactName,
          contactName,
          brandName,
          phone,
          brandGoals,
          sponsorshipPackage: selectedTier.name,
          packageSelected: selectedTier.name,
          custom_fields: [
            { display_name: "Package", variable_name: "package", value: selectedTier.name },
            { display_name: "Brand Goals", variable_name: "brand_goals", value: brandGoals },
          ],
        },
        onClose: () => {
          setProcessing(false);
          setError("Payment cancelled.");
        },
        // Paystack v1 inline SDK rejects async functions — use a sync wrapper with async IIFE inside
        callback: (response) => {
          (async () => {
            try {
              const verify = await fetch(
                `${baseUrl}/api/sponsorship/verify/${response.reference}`
              );
              const data = await verify.json();
              if (data.success) {
                setConfirmedRef(response.reference);
                setPaymentSuccess(true);
              } else {
                setError(
                  "Payment received but confirmation failed. Contact stepupsummit@gmail.com"
                );
              }
            } catch {
              setError("Could not confirm. Contact stepupsummit@gmail.com");
            } finally {
              setProcessing(false);
            }
          })();
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("Sponsor payment error:", err);
      if (err.message && err.message.includes("Paystack script failed to load")) {
        setError(
          "Payment service could not load. Check your internet connection and try again, or disable any ad blocker."
        );
      } else {
        setError("Could not start payment. Please try again.");
      }
      setProcessing(false);
    }
  };

  // Success state
  if (paymentSuccess) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-3xl">
          🤝
        </div>
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          Thank you for sponsoring Step-Up Summit 3.0! 🙏
        </h3>
        <p className="mt-3 text-gray-600">
          Your <b>{selectedTier.name}</b> package is confirmed.
        </p>
        <p className="mt-2 text-gray-600">
          Our team will be in touch within 24 hours with next steps.
        </p>
        <p className="mt-2 text-gray-600">
          A confirmation has been sent to your email.
        </p>
        {confirmedRef && (
          <p className="mt-3 text-sm text-gray-500">
            Reference: <span className="font-mono font-semibold">{confirmedRef}</span>
          </p>
        )}
        <div className="mt-6">
          <a
            href="/"
            className="rounded-full bg-brand-blue px-8 py-3 font-heading font-semibold text-white transition hover:bg-brand-blue-mid"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-7 shadow-lg sm:p-10">
      <h3 className="mb-4 text-center font-heading text-xl font-bold text-brand-dark">
        Pay for {selectedTier.name}
      </h3>
      <p className="mb-6 text-center text-2xl font-bold text-brand-gold">
        ₦{selectedTier.price.toLocaleString()}
      </p>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Contact Name</span>
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Your full name"
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Brand / Organisation</span>
          <input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your brand or company name"
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
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
          <span className="text-sm font-semibold text-brand-dark">Tell us about your brand and goals (optional)</span>
          <textarea
            value={brandGoals}
            onChange={(e) => setBrandGoals(e.target.value)}
            rows={3}
            placeholder="What are your goals for this sponsorship?"
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <button
          type="button"
          onClick={handlePayment}
          disabled={processing}
          className="w-full rounded-full bg-brand-gold px-8 py-4 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Processing...
            </span>
          ) : (
            `Pay Now — ${selectedTier.name}`
          )}
        </button>
      </div>
    </div>
  );
};

const Sponsors = () => {
  const formRef = useRef(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [prefill, setPrefill] = useState("");

  const handleChoose = (tier) => {
    setSelectedTier(tier);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="Put your brand beside the builders"
        breadcrumb="Sponsors"
        subtitle="Over 20 partners have stood with Step-Up Summit , reaching 1,100+ ambitious young people in the room and thousands more online."
      />

      {/* STATS */}
      <section className="bg-brand-blue py-16 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 text-center lg:grid-cols-4 lg:px-8">
          <ScrollReveal>
            <span className="font-heading text-4xl font-extrabold text-brand-gold sm:text-5xl">
              <CountUp end={1100} suffix="+" />
            </span>
            <p className="mt-2 text-sm font-semibold text-brand-muted">Engaged attendees reached</p>
          </ScrollReveal>
          <ScrollReveal>
            <span className="font-heading text-4xl font-extrabold text-brand-gold sm:text-5xl">
              <CountUp end={15} />
            </span>
            <p className="mt-2 text-sm font-semibold text-brand-muted">Speakers hosted</p>
          </ScrollReveal>
          <ScrollReveal>
            <span className="font-heading text-4xl font-extrabold text-brand-gold sm:text-5xl">
              <CountUp end={4} />
            </span>
            <p className="mt-2 text-sm font-semibold text-brand-muted">Social platforms amplifying</p>
          </ScrollReveal>
          <ScrollReveal>
            <span className="font-heading text-4xl font-extrabold text-brand-gold sm:text-5xl">
              <CountUp end={1000} suffix="+" />
            </span>
            <p className="mt-2 text-sm font-semibold text-brand-muted">Expected at 3.0</p>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY SPONSOR */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Spark center />
          <Eyebrow className="mt-4 text-center">Why sponsor</Eyebrow>
          <h2 className="mt-3 font-heading text-center text-3xl font-bold text-brand-dark sm:text-4xl">
            This audience is the future , meet them first
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Step-Up Summit gathers the exact demographic every forward-thinking
            brand wants: ambitious students, young founders, and early-career
            professionals at the moment they’re forming loyalties , to tools, banks,
            platforms, and brands.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Sponsorship isn’t charity here. It’s early access to Nigeria’s next
            generation of customers, employees, and founders , wrapped in the
            goodwill of backing their rise.
          </p>
        </div>
      </section>

      {/* CURRENT PARTNERS */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <Spark center />
          <Eyebrow className="mt-4 text-center">Partners & sponsors</Eyebrow>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Brands that back the builders
          </h2>
          <div className="mt-10 overflow-hidden">
            <div className="flex w-max sponsor-scroll">
              {[...sponsorLogos, ...sponsorLogos].map((logo, i) => (
                <div key={i} className="mx-3 flex-shrink-0 rounded-lg bg-white p-2 shadow-sm">
                  <img src={logo} alt="Partner logo" className="h-20 w-auto object-contain" style={{ minHeight: "80px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Choose how you show up
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier, idx) => (
              <ScrollReveal key={tier.id} delay={idx * 0.1}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border-2 p-6 transition ${
                    selectedTier?.id === tier.id
                      ? "border-brand-gold shadow-xl ring-2 ring-brand-gold/30"
                      : "border-gray-200 bg-brand-blue shadow-md"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-dark">
                      {tier.badge}
                    </span>
                  )}
                  <h3
                    className="font-orbitron text-xl font-bold"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-2 font-heading text-2xl font-bold text-white">
                    ₦{tier.price.toLocaleString()}
                  </p>
                  <div className="my-4 h-px w-full bg-white/20" />
                  <ul className="mt-2 flex-1 space-y-2">
                    {tier.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-blue-white">
                        <span className="mt-0.5 text-brand-gold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleChoose(tier)}
                    className={`mt-4 w-full rounded-full px-6 py-3 font-heading text-sm font-semibold transition ${
                      selectedTier?.id === tier.id
                        ? "bg-brand-gold text-brand-dark"
                        : "bg-brand-gold text-brand-dark hover:bg-brand-gold-light"
                    }`}
                  >
                    {selectedTier?.id === tier.id ? "✓ Selected" : `Choose ${tier.name}`}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Community / In-kind note */}
          <p className="mt-8 text-center font-heading text-sm italic text-brand-gold">
            Community / In-kind sponsorship from ₦300,000 or equivalent support
            (meals, logistics, media, printing) — visibility attached to the
            supported category. Every package is customizable.
          </p>
        </div>
      </section>

      {/* PAYMENT / INQUIRY SECTION */}
      {selectedTier && (
        <section ref={formRef} className="scroll-mt-24 bg-brand-off-white py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="text-center">
              <Spark center />
              <h2 className="mt-4 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
                Ready to make it official?
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Pay Now */}
              <div>
                <h3 className="mb-4 text-center font-heading text-xl font-bold text-brand-dark">
                  Ready to commit? Pay now
                </h3>
                <SponsorPaymentForm selectedTier={selectedTier} />
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-gray-400">or</span>
              </div>

              {/* Send Inquiry */}
              <div>
                <h3 className="mb-4 text-center font-heading text-xl font-bold text-brand-dark">
                  Want to discuss first? Send inquiry
                </h3>
                <SponsorInquiryForm prefill={selectedTier.name} setPrefill={setPrefill} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INQUIRY FORM (when no tier selected) */}
      {!selectedTier && (
        <section className="bg-brand-off-white py-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Spark center />
            <h2 className="mt-4 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Let&apos;s build 3.0 together
            </h2>
            <p className="mt-4 text-gray-600">
              Tell us about your brand and we&apos;ll design the right package
              around your goals.
            </p>
            <div className="mt-10">
              <SponsorInquiryForm prefill={prefill} setPrefill={setPrefill} />
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              Prefer to call? 08143567953 · 08085908035
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Sponsors;
