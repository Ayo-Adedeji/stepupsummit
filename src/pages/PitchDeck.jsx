import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import { Spark, Eyebrow } from "../components/ui";

import pitchHeroImg from "../assets/pitch1.jpg";
import pitchCarousel1 from "../assets/Pitch3.jpeg";
import pitchCarousel2 from "../assets/Pitch4.jpeg";
import pitchCarousel3 from "../assets/Pitch5.jpeg";
import pitchCarousel4 from "../assets/Pitch6.jpeg";
import pitchCarousel5 from "../assets/Pitch7.jpeg";

// Use same Formspree account, different
// form endpoint for pitch applications
// This keeps pitch applicants separate from
// general registrations in the dashboard
const FORMSPREE_PITCH_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_PITCH_FORM_ID";

const PitchApplicationForm = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState("");
  const [cacRegistered, setCacRegistered] = useState("");

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-10">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">
          Application received
        </h3>
        <p className="mt-4 text-gray-600">
          Your application is in. We&apos;ll be in touch within 48 hours. In the
          meantime , keep building.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const formData = new FormData();
    formData.append("fullName", form.elements["Full Name"].value);
    formData.append("email", form.elements["Email Address"].value);
    formData.append("phone", form.elements["Phone Number"].value);
    formData.append("businessName", form.elements["Business/Idea Name"].value);
    formData.append("description", form.elements["Business Idea"].value);
    formData.append("stage", form.elements["Idea Stage"].value);
    formData.append("cacRegistered", form.elements["CAC Registered"].value);

    const fileInput = form.elements["CAC Document"];
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("cacDocument", fileInput.files[0]);
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`${baseUrl}/api/pitch/apply`, {
        method: "POST",
        body: formData,
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
      console.error("Pitch application fetch error:", err);
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="rounded-2xl bg-white p-7 shadow-lg sm:p-10"
    >
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      <input
        type="hidden"
        name="_subject"
        value="Pitch Deck Application , Step-Up Summit 3.0"
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

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-brand-dark">Is your business CAC registered?</span>
          <select
            name="CAC Registered"
            required
            value={cacRegistered}
            onChange={(e) => setCacRegistered(e.target.value)}
            className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
          >
            <option value="">Select an option</option>
            <option>Yes</option>
            <option>No</option>
            <option>In Progress</option>
          </select>
        </label>

        {(cacRegistered === "Yes" || cacRegistered === "In Progress") && (
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark">Upload your CAC document</span>
            <input
              type="file"
              name="CAC Document"
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1 rounded-xl border border-gray-300 bg-[#FBFCFF] p-3 text-brand-dark outline-none transition focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/20"
            />
            <span className="mt-1 text-xs text-gray-500">Upload a photo or scan of your CAC certificate or registration document</span>
            {/* Formspree free tier supports file uploads up to 20MB per submission */}
          </label>
        )}

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
            "Apply to Pitch"
          )}
        </button>
      </div>
    </form>
  );
};

const steps = [
  { n: "01", title: "Apply with your idea", text: "Tick ‘Yes’ to the pitch competition when you register, and tell us about your business idea. No polished deck needed yet , clarity beats decoration." },
  { n: "02", title: "Get shortlisted & pitch-ready", text: "Selected founders receive guidance on structuring a pitch deck investors actually want to see , problem, solution, market, model, ask." },
  { n: "03", title: "Pitch live at 3.0", text: "Take the ICC Hall stage in December before judges and 1,000+ peers. Win prizes, mentorship, and the attention of people who can move your idea forward." },
];

const PitchDeck = () => {
  const pitchFormRef = useRef(null);
  const carouselImages = [pitchCarousel1, pitchCarousel2, pitchCarousel3, pitchCarousel4, pitchCarousel5];

  const scrollToForm = () => {
    pitchFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="Your idea. Our stage. Real stakes."
        breadcrumb="Pitch Deck"
        subtitle="The Pitch Deck competition is where Step-Up stops being a summit and becomes a launchpad , students pitch live before judges, investors, and 1,000+ peers."
      />

      {/* WHY */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Spark />
            <Eyebrow className="mt-4">The pitch deck</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Ideas die in silence. We built a stage.
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Every campus is full of brilliant business ideas trapped in notebooks
              and group chats. The Pitch Deck exists to pull them into the light , to
              force clarity, invite feedback, and reward courage.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Winners walk away with prizes and mentorship. But every contestant
              walks away with something rarer: the experience of standing up and
              selling their idea to a real audience. That muscle changes everything
              after.
            </p>
            <button
              onClick={scrollToForm}
              className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light"
            >
              Pitch Now
            </button>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <img src={pitchHeroImg} alt="Pitch session" className="aspect-[4/3] max-w-lg w-full rounded-2xl object-cover shadow-lg" />
          </ScrollReveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mt-8">
            <Spark />
            <Eyebrow className="mt-4">How it works</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              From idea to stage in three steps
            </h2>
          </div>
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

      {/* BEST PITCH PHOTO CAROUSEL */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl h-[220px] md:h-[320px]">
            <div className="flex h-full w-max marquee-track gap-4">
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Pitch competition moment ${i + 1}`}
                  className="h-full w-auto object-cover"
                  style={{ minHeight: "220px" }}
                />
              ))}
            </div>
          </div>
        </div>
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
                  Not an idea in search of a problem , a pain you’ve seen, felt, or
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
                  Evidence you’ve already started , research, a prototype, first
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
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">, What to expect, from the 2.0 experience</p>
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
          <button
            onClick={scrollToForm}
            className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 font-heading text-lg font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Apply to Pitch
          </button>
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
            <div ref={pitchFormRef}>
              <PitchApplicationForm />
            </div>
            <p className="mt-4 text-center text-sm italic text-gray-500">
              Note: Applying to pitch does not register you for the event. Please ensure you also register your free spot at Step-Up Summit 3.0. <Link to="/register" className="text-brand-gold-dark underline">Register here →</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PitchDeck;
