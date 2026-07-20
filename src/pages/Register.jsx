import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import PaymentForm from "../components/PaymentForm";
import Accordion from "../components/Accordion";
import { Spark } from "../components/ui";

// ─── TICKET TIERS ──────────────────────────────────────────────────────────
// Display prices shown on cards: Regular ₦5,000 · VIP ₦10,000
// amount = naira value sent to PaymentForm → backend multiplies by 100 for kobo
//
// TEST MODE: amount is 100 (₦100 = 10,000 kobo sent to Paystack)
// Go-live: set Regular amount to 5000 and VIP amount to 10000
const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    amount: 0,
    perks: [
      "General admission",
      "Access to keynotes",
      "Networking access",
      "Limited slots available",
    ],
  },
  {
    id: "regular",
    name: "Regular",
    price: "₦5,000",
    // TEST MODE: ₦100 sent to Paystack (10,000 kobo). Go-live: change to 5000
    amount: 100,
    featured: false,
    perks: [
      "General admission",
      "Access to all sessions & workshops",
      "Networking access",
      "Certificate of participation",
      "Giveaways",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: "₦10,000",
    // TEST MODE: ₦100 sent to Paystack (10,000 kobo). Go-live: change to 10000
    amount: 100,
    featured: true,
    perks: [
      "Priority seating",
      "Access to all sessions & workshops",
      "Exclusive VIP networking session",
      "Certificate of participation",
      "Giveaways & VIP gift pack",
      "Photo opportunity with speakers",
    ],
  },
];

// Separate Formspree endpoint for FREE registration.
// This is the no-payment path , paid tiers (Regular/VIP)
// keep their own Paystack flow in PaymentForm below.
const FORMSPREE_FREE_REGISTER_ENDPOINT =
  "https://formspree.io/f/REPLACE_WITH_FREE_REGISTER_FORM_ID";

const BENEFITS = [
  "Free access to every keynote, panel, and workshop",
  "Pitch competition entry , stand a chance to pitch your idea live",
  "Networking access to founders, executives, and fellow builders",
  "Giveaways and certificates of participation",
  "First access to Step-Up Academy and post-summit opportunities",
];

// Use same Formspree account, different endpoint.
const faqs = [
  {
    q: "Is attendance really free?",
    a: "Yes. Attendance is completely free , powered by our sponsors and partners. Register early. Seats are limited.",
  },
  {
    q: "Who is this event for?",
    a: "Students, young founders, Corpers, and early-career professionals. If you are building or want to start , this room is for you.",
  },
  {
    q: "Where exactly is the venue?",
    a: "ICC Hall (International Conference Centre), University of Ibadan, Ibadan, Oyo State. Exact date and arrival details will be emailed to all registered attendees.",
  },
  {
    q: "How do I apply for the pitch competition?",
    a: "Select “Yes” on the pitch competition question in the registration form. Shortlisted founders will be contacted with next steps. Note: There is also a dedicated pitch application form on the Pitch Deck page for more details.",
  },
  {
    q: "What should I wear?",
    a: "Come dressed like the founder you are becoming.",
  },
];

const FreeRegisterForm = () => {
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
      firstName: formData.get("First Name"),
      lastName: formData.get("Last Name"),
      email: formData.get("Email Address"),
      phone: formData.get("Phone Number"),
      iAm: formData.get("Attendee Type"),
      school: formData.get("School / Organisation"),
      pitchCompetition: formData.get("Pitch Competition"),
      whatToGain: formData.get("Goals"),
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`${baseUrl}/api/register/free`, {
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
    } catch (err) {
      console.error("Free registration fetch error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          You&apos;re on the list
        </h3>
        <p className="mt-4 text-gray-600">
          You&apos;ll get a confirmation email with your attendee details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-7 shadow-lg sm:p-10">
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      <input
        type="hidden"
        name="_subject"
        value="Free Registration , Step-Up Summit 3.0"
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">First Name</span>
            <input
              name="First Name"
              type="text"
              required
              className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">Last Name</span>
            <input
              name="Last Name"
              type="text"
              required
              className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
            />
          </label>
        </div>

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
          <span className="text-sm font-semibold text-brand-dark">Phone Number (WhatsApp)</span>
          <input
            name="Phone Number"
            type="tel"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">I am a…</span>
          <select
            name="Attendee Type"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          >
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
          <input
            name="School / Organisation"
            type="text"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">
            Do you want to enter the pitch competition?
          </span>
          <select
            name="Pitch Competition"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          >
            <option value="">Select one</option>
            <option>No , attending only</option>
            <option>Yes , I have a business idea to pitch</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">
            What do you hope to gain from 3.0? (optional)
          </span>
          <textarea
            name="Goals"
            rows={3}
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
              Registering...
            </span>
          ) : (
            "Register , Save My Seat"
          )}
        </button>
        <p className="text-center text-xs text-gray-500">
          You&apos;ll get a confirmation email with your attendee details.
        </p>
      </div>
    </form>
  );
};

const Register = () => {
  const formRef = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState(() => {
    // Restore ticket selection if user navigated back from Paystack
    try {
      const saved = sessionStorage.getItem("sus3_selectedTicket");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Find the matching tier by amount so we restore the full tier object
        return TIERS.find((t) => t.amount === parsed.amount) || null;
      }
    } catch (_) {}
    return null;
  });

  // Clear sessionStorage once restored (PaymentVerify will also clear it on success)
  React.useEffect(() => {
    sessionStorage.removeItem("sus3_selectedTicket");
  }, []);

  const handleSelect = (tier) => {
    setSelectedTicket(tier);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <PageHero title="Save Your Seat at 3.0" breadcrumb="Register" />

      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-16 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Spark center />
          <span className="mt-4 inline-block rounded-full bg-brand-gold/20 px-4 py-1 text-sm font-semibold text-brand-gold-light ring-1 ring-brand-gold/40">
            Free
          </span>
          <p className="mt-4 text-brand-muted">
            December 2026 · ICC Hall, University of Ibadan
          </p>
          <p className="mt-2 text-sm font-medium text-brand-gold-light">
            Editions 1.0 and 2.0 both filled up. Register early.
          </p>
        </div>
      </section>

      {/* TICKET TIERS */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Spark center />
            <span className="mt-4 inline-block rounded-full bg-brand-gold px-4 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-dark">
              Choose your ticket
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Pick a seat at 3.0
            </h2>
          </div>

          {/* FREE urgency banner */}
          <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-3 rounded-xl bg-brand-gold px-5 py-3 text-center text-sm font-bold text-brand-dark sm:text-base">
            <span aria-hidden>⚡</span>
            200 free slots available , once they&apos;re gone, they&apos;re gone.
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((tier, i) => {
              const isSelected = selectedTicket && selectedTicket.id === tier.id;
              return (
                <ScrollReveal key={tier.id} delay={i * 0.1}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-7 transition ${
                      isSelected
                        ? "border-brand-gold ring-2 ring-brand-gold/30 shadow-xl"
                        : tier.featured
                        ? "border-brand-gold bg-gradient-to-b from-[#FFF9E8] to-white shadow-xl"
                        : "border-gray-200 bg-white shadow-md"
                    }`}
                  >
                    {tier.featured && !isSelected && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-dark">
                        Most Popular
                      </span>
                    )}
                    {isSelected && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-dark">
                        ✓ Selected
                      </span>
                    )}
                    <h3 className="font-heading text-2xl font-extrabold text-brand-dark">
                      {tier.name}
                    </h3>
                    <p className="mt-2 font-heading text-3xl font-bold text-brand-gold-dark">
                      {tier.price}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {tier.perks.map((perk) => (
                        <li
                          key={perk}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-dark">
                            ✓
                          </span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                   <button
                     type="button"
                     onClick={() => handleSelect(tier)}
                     className={`mt-6 w-full rounded-full px-6 py-3 font-heading text-sm font-semibold transition sm:w-auto ${
                       isSelected
                         ? "bg-brand-gold text-brand-dark hover:bg-brand-gold-light"
                         : tier.featured
                         ? "bg-brand-gold text-brand-dark hover:bg-brand-gold-light"
                         : "bg-brand-blue text-white hover:bg-brand-blue-mid"
                     }`}
                   >
                     {isSelected ? "Selected" : "Select This Ticket"}
                   </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section ref={formRef} className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-2 lg:px-8">
          {/* LEFT , benefits */}
          <ScrollReveal>
            <span className="inline-block rounded-full border border-brand-gold bg-[#FFF9E8] px-4 py-1.5 text-sm font-semibold text-brand-dark">
              What Registration Gets You
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              One Day That Pays for a Decade
            </h2>
            <ul className="mt-8 space-y-4">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-dark">
                    ✓
                  </span>
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 border-l-4 border-brand-gold pl-6 font-heading text-xl font-medium italic leading-relaxed text-brand-dark">
              “What happens when passionate people step up together? Magic.”
              <p className="mt-3 text-sm font-semibold not-italic text-gray-500">
                , Edition 1.0 Impact Recap
              </p>
            </blockquote>
          </ScrollReveal>

          {/* RIGHT , conditional form */}
          <ScrollReveal delay={0.15}>
            {!selectedTicket ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-brand-muted">← Select a ticket above to continue</p>
              </div>
            ) : selectedTicket.id === "free" ? (
              <>
                <div className="mb-4 text-center">
                  <span className="inline-block rounded-full bg-brand-gold/15 px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-gold-dark ring-1 ring-brand-gold/40">
                    Free registration
                  </span>
                </div>
                <FreeRegisterForm />
              </>
            ) : (
              <PaymentForm
                selectedTier={selectedTicket.name}
                selectedAmount={selectedTicket.amount}
              />
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Spark center />
            <span className="mt-4 inline-block rounded-full border border-brand-gold bg-[#FFF9E8] px-4 py-1.5 text-sm font-semibold text-brand-dark">
              Frequently Asked
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              Quick Answers
            </h2>
          </div>
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
