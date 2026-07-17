import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import { Spark, Eyebrow } from "../components/ui";

import pitchImg from "../assets/imag5.jpg";

// Use same Formspree account, different
// form endpoint for pitch applications
// This keeps pitch applicants separate from
// general registrations in the dashboard
const FORMSPREE_PITCH_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_PITCH_FORM_ID";

const PitchApplicationForm = () => {
  const [sent, setSent] = useState(false);
  const [idea, setIdea] = useState("");

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          Application received
        </h3>
        <p className="mt-4 text-gray-600">
          Your application is in. We&apos;ll be in touch within 48 hours. In the
          meantime — keep building.
        </p>
      </div>
    );
  }

  return (
    <form
      action={FORMSPREE_PITCH_ENDPOINT}
      method="POST"
      className="rounded-2xl bg-white p-7 shadow-lg sm:p-10"
    >
      <input
        type="hidden"
        name="_subject"
        value="Pitch Deck Application — Step-Up Summit 3.0"
      />

      <div className="space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Full Name</span>
          <input
            name="Full Name"
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
          <span className="text-sm font-semibold text-brand-dark">Business/Idea Name</span>
          <input
            name="Business/Idea Name"
            type="text"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">
            Describe your business idea in one sentence
          </span>
          <textarea
            name="Business Idea"
            maxLength={150}
            required
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={3}
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          />
          <span className="mt-1 text-right text-xs text-gray-400">
            {idea.length}/150
          </span>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">What stage is your idea?</span>
          <select
            name="Idea Stage"
            required
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          >
            <option value="">Select an option</option>
            <option>Just an idea</option>
            <option>Some research done</option>
            <option>Prototype/MVP exists</option>
            <option>Already generating revenue</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-brand-gold px-8 py-4 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light"
        >
          Apply to Pitch
        </button>
      </div>
    </form>
  );
};

const steps = [
  { n: "01", title: "Apply with your idea", text: "Tick ‘Yes’ to the pitch competition when you register, and tell us about your business idea. No polished deck needed yet — clarity beats decoration." },
  { n: "02", title: "Get shortlisted & pitch-ready", text: "Selected founders receive guidance on structuring a pitch deck investors actually want to see — problem, solution, market, model, ask." },
  { n: "03", title: "Pitch live at 3.0", text: "Take the ICC Hall stage in December before judges and 1,000+ peers. Win prizes, mentorship, and the attention of people who can move your idea forward." },
];

const PitchDeck = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="Your idea. Our stage. Real stakes."
        breadcrumb="Pitch Deck"
        subtitle="The Pitch Deck competition is where Step-Up stops being a summit and becomes a launchpad — students pitch live before judges, investors, and 1,000+ peers."
      />

      {/* WHY */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Spark />
          <Eyebrow className="mt-4">The pitch deck</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Ideas die in silence. We built a stage.
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Every campus is full of brilliant business ideas trapped in notebooks
            and group chats. The Pitch Deck exists to pull them into the light — to
            force clarity, invite feedback, and reward courage.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Winners walk away with prizes and mentorship. But every contestant
            walks away with something rarer: the experience of standing up and
            selling their idea to a real audience. That muscle changes everything
            after.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Spark />
          <Eyebrow className="mt-4">How it works</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            From idea to stage in three steps
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-brand-blue/20 bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="font-heading text-4xl font-extrabold text-brand-gold">{s.n}</span>
                  <h3 className="mt-3 font-heading text-xl font-semibold text-brand-dark">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEST PITCH PHOTO */}
      <section className="px-5 pb-20 lg:px-8">
        <ScrollReveal>
          <img
            src={pitchImg}
            alt="Pitch competition moment"
            className="mx-auto aspect-[16/9] w-full max-w-6xl rounded-2xl object-cover shadow-lg"
          />
        </ScrollReveal>
      </section>

      {/* PRIZES */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Spark center />
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-dark">The Prize</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">More than money</h2>
          <p className="mt-4 text-gray-600">
            Cash and kind prizes from our sponsors, mentorship from established
            founders, and visibility across the Step-Up community and media
            partners.
          </p>
        </div>
      </section>

      {/* WHAT JUDGES LOOK FOR */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Spark center />
            <Eyebrow className="mt-4">The anatomy of a winning pitch</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              What judges look for
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <ScrollReveal>
              <div className="h-full rounded-2xl border-l-4 border-brand-blue bg-brand-off-white p-7 shadow-md">
                <h3 className="mb-2 font-heading text-xl font-semibold text-brand-dark">A real problem</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Not an idea in search of a problem — a pain you’ve seen, felt, or
                  measured, and can describe in one sentence.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-2xl border-l-4 border-brand-blue bg-brand-off-white p-7 shadow-md">
                <h3 className="mb-2 font-heading text-xl font-semibold text-brand-dark">A clear solution & model</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  What you’re building, who pays, and why they’d choose you. Simple
                  beats clever every single time.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="h-full rounded-2xl border-l-4 border-brand-blue bg-brand-off-white p-7 shadow-md">
                <h3 className="mb-2 font-heading text-xl font-semibold text-brand-dark">A founder who’s moving</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Evidence you’ve already started — research, a prototype, first
                  customers. Judges back momentum, not just dreams.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-brand-off-white py-16">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <blockquote className="border-l-4 border-brand-gold pl-6 font-heading text-2xl font-medium italic leading-relaxed text-brand-dark">
              “Panel sessions, giveaways, competition, pitch deck, finance talk,
              business workshop, networking opportunities, meaningful connections and
              lots more.”
            </blockquote>
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">— What to expect, from the 2.0 experience</p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Got an idea? Stop sitting on it.</h2>
          <p className="mt-4 text-brand-muted">
            Register for 3.0 and tick ‘Yes’ to the pitch competition. December is
            your deadline now.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 font-heading text-lg font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Register & Apply to Pitch
          </Link>
        </div>
      </section>

      {/* APPLY */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Spark />
            <Eyebrow className="mt-4">Apply to pitch</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Ready to pitch your idea?
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Fill in the form and we&apos;ll be in touch with everything you need
              to get pitch-ready for December.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "You’ll receive a confirmation within 48 hours",
                "Shortlisted founders get pitch coaching",
                "Final pitches happen live at ICC Hall in December",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-dark">
                    ✓
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <PitchApplicationForm />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PitchDeck;
