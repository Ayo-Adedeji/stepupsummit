import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import PaymentForm from "../components/PaymentForm";
import Accordion from "../components/Accordion";
import { Spark } from "../components/ui";

// Update prices to final amounts before launch
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
    price: "₦100",
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
    price: "₦100",
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
// This is the no-payment path — paid tiers (Regular/VIP)
// keep their own Paystack flow in PaymentForm below.
const FORMSPREE_FREE_REGISTER_ENDPOINT =
  "https://formspree.io/f/REPLACE_WITH_FREE_REGISTER_FORM_ID";

const BENEFITS = [
  "Free access to every keynote, panel, and workshop",
  "Pitch competition entry — stand a chance to pitch your idea live",
  "Networking access to founders, executives, and fellow builders",
  "Giveaways and certificates of participation",
  "First access to Step-Up Academy and post-summit opportunities",
];

// Use same Formspree account, different endpoint.
const faqs = [
  {
    q: "Is attendance really free?",
    a: "Yes. Attendance is completely free — powered by our sponsors and partners. Register early. Seats are limited.",
  },
  {
    q: "Who is this event for?",
    a: "Students, young founders, Corpers, and early-career professionals. If you are building or want to start — this room is for you.",
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

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          You&apos;re on the list
        </h3>
        <p className="mt-4 text-gray-600">
          You&apos;ll get a confirmation email with your attendee details. No
          payment, ever.
        </p>
      </div>
    );
  }

  return (
    <form
      action={FORMSPREE_FREE_REGISTER_ENDPOINT}
      method="POST"
      className="rounded-2xl bg-white p-7 shadow-lg sm:p-10"
    >
      <input
        type="hidden"
        name="_subject"
        value="Free Registration — Step-Up Summit 3.0"
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
            <option>No — attending only</option>
            <option>Yes — I have a business idea to pitch</option>
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
          className="w-full rounded-full bg-brand-gold px-8 py-4 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light"
        >
          Register — Save My Seat
        </button>
        <p className="text-center text-xs text-gray-500">
          You&apos;ll get a confirmation email with your attendee details. No
          payment, ever.
        </p>
      </div>
    </form>
  );
};

const Register = () => {
  const formRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const handleSelect = (tier) => {
    setSelected(tier);
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
            Limited free slots available — once they&apos;re gone, they&apos;re gone.
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <ScrollReveal key={tier.id} delay={i * 0.1}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    tier.featured
                      ? "border-brand-gold bg-gradient-to-b from-[#FFF9E8] to-white shadow-xl"
                      : "border-gray-200 bg-white shadow-md"
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-dark">
                      Most Popular
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
                    className={`mt-6 rounded-full px-6 py-3 font-heading text-sm font-semibold transition ${
                      tier.featured
                        ? "bg-brand-gold text-brand-dark hover:bg-brand-gold-light"
                        : "bg-brand-blue text-white hover:bg-brand-blue-mid"
                    }`}
                  >
                    Select This Ticket
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section ref={formRef} className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-2 lg:px-8">
          {/* LEFT — benefits */}
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
                — Edition 1.0 Impact Recap
              </p>
            </blockquote>
          </ScrollReveal>

          {/* RIGHT — free form */}
          <ScrollReveal delay={0.15}>
            <div className="mb-4 text-center">
              <span className="inline-block rounded-full bg-brand-gold/15 px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-gold-dark ring-1 ring-brand-gold/40">
                Free registration
              </span>
            </div>
            <FreeRegisterForm />
          </ScrollReveal>
        </div>
      </section>

      {/* PAID TIERS (Paystack) */}
      {selected && selected.amount > 0 && (
        <section className="bg-brand-off-white py-16">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <p className="text-sm font-semibold text-brand-gold-dark">
              You selected the {selected.name} ticket — complete payment below.
            </p>
          </div>
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <PaymentForm
              selectedTier={selected.name}
              selectedAmount={selected.amount}
            />
          </div>
        </section>
      )}

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
