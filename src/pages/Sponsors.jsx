import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import CountUp from "../components/CountUp";
import { Spark, Eyebrow } from "../components/ui";

// Separate Formspree form endpoint for
// sponsor inquiries — keeps them organised
// separately from registrations and pitch apps
const FORMSPREE_SPONSOR_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_SPONSOR_FORM_ID";

const tiers = [
  {
    title: "Supporting Partner",
    text: "Stand with the movement and get seen by the audience that matters.",
    points: ["Logo on website & event banners", "Social media recognition", "Verbal recognition at the summit"],
  },
  {
    title: "Headline Sponsor",
    feature: true,
    text: "Own the biggest stage in Ibadan’s student entrepreneurship calendar.",
    points: [
      "“Powered by” branding across all materials",
      "Speaking slot or product showcase on stage",
      "Branded booth & direct audience engagement",
      "Full digital campaign integration",
    ],
  },
  {
    title: "Prize & Kind Sponsor",
    text: "Fuel the pitch competition, giveaways, or attendee welfare in cash or kind.",
    points: [
      "Brand tied to a named prize or moment",
      "On-stage presentation of your prize",
      "Content features across our channels",
    ],
  },
];

const SponsorInquiryForm = ({ prefill, setPrefill }) => {
  const [sent, setSent] = useState(false);

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
    <form
      action={FORMSPREE_SPONSOR_ENDPOINT}
      method="POST"
      className="rounded-2xl bg-white p-7 shadow-lg sm:p-10"
    >
      <input
        type="hidden"
        name="_subject"
        value="Sponsorship Inquiry — Step-Up Summit 3.0"
      />

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
            <option>Supporting Partner</option>
            <option>Headline Sponsor</option>
            <option>Prize & Kind Sponsor</option>
            <option>Not Sure Yet</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">
            Tell us about your brand and goals
          </span>
          <textarea
            name="Brand & Goals"
            rows={4}
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-brand-gold px-8 py-4 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light"
        >
          Start the Conversation
        </button>
      </div>
    </form>
  );
};

const Sponsors = () => {
  const formRef = useRef(null);
  const [prefill, setPrefill] = useState("");

  const handleChoose = (pkg) => {
    setPrefill(pkg);
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
        subtitle="Over 20 partners have stood with Step-Up Summit — reaching 1,100+ ambitious young people in the room and thousands more online."
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
              <CountUp end={11600} suffix="+" />
            </span>
            <p className="mt-2 text-sm font-semibold text-brand-muted">Impressions from one edition</p>
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
          <Eyebrow className="mt-4">Why sponsor</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            This audience is the future — meet them first
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Step-Up Summit gathers the exact demographic every forward-thinking
            brand wants: ambitious students, young founders, and early-career
            professionals at the moment they’re forming loyalties — to tools, banks,
            platforms, and brands.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Sponsorship isn’t charity here. It’s early access to Nigeria’s next
            generation of customers, employees, and founders — wrapped in the
            goodwill of backing their rise.
          </p>
        </div>
      </section>

      {/* CURRENT PARTNERS */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Spark />
          <Eyebrow className="mt-4">Partners & sponsors</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Brands that back the builders
          </h2>
          {/* // Replace with actual partner logos */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex aspect-[2.4/1] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-400">
                LOGO
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Choose how you show up
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <ScrollReveal key={t.title} delay={t.feature ? 0 : 0.1}>
                <div className={`relative flex h-full flex-col rounded-2xl border p-7 ${t.feature ? "border-brand-gold bg-gradient-to-b from-[#FFF9E8] to-white shadow-xl md:-mt-6 md:mb-0" : "border-gray-200 bg-white shadow-md"}`}>
                  {t.feature && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-dark">
                      Headline
                    </span>
                  )}
                  <h3 className="font-orbitron text-xl font-bold text-brand-dark">{t.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{t.text}</p>
                  <div className="my-4 h-px w-full bg-brand-gold/60" />
                  <ul className="mt-2 flex-1 space-y-2">
                    {t.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 text-brand-gold-dark">✓</span>{pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-heading text-lg font-bold text-brand-gold-dark">
                    Custom Pricing
                  </p>
                  <button
                    type="button"
                    onClick={() => handleChoose(t.title)}
                    className={`mt-4 rounded-full px-6 py-3 font-heading text-sm font-semibold transition ${
                      t.feature
                        ? "bg-brand-gold text-brand-dark hover:bg-brand-gold-light"
                        : "bg-brand-blue text-white hover:bg-brand-blue-mid"
                    }`}
                  >
                    Choose This Package
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="bg-brand-off-white py-20">
        <div ref={formRef} className="scroll-mt-24 mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-center">
            <Spark center />
            <h2 className="mt-4 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Let’s build 3.0 together
            </h2>
            <p className="mt-4 text-gray-600">
              Tell us about your brand and we&apos;ll design the right package
              around your goals.
            </p>
          </div>
          <div className="mt-10">
            <SponsorInquiryForm prefill={prefill} setPrefill={setPrefill} />
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Prefer to call? 08143567953 · 08085908035
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsors;
