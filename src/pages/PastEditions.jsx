import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import CountUp from "../components/CountUp";
import { Spark, Eyebrow } from "../components/ui";
import { Link } from "react-router-dom";

import e1a from "../assets/img1.JPG";
import e1b from "../assets/img3.JPG";
import e1c from "../assets/img4.JPG";
import e1d from "../assets/img5.JPG";
import e2a from "../assets/2.jpg";
import e2b from "../assets/5.jpg";
import e2c from "../assets/8.jpg";
import e2d from "../assets/10.jpg";

const gallery1 = [e1a, e1b, e1c, e1d];
const gallery2 = [e2a, e2b, e2c, e2d];
const allGallery = [e1a, e1b, e1c, e1d, e2a, e2b, e2c, e2d];

const PastEditions = () => {
  const stats = [
    { end: 1100, suffix: "+", label: "Students impacted" },
    { end: 15, label: "Speakers & panelists" },
    { end: 11600, suffix: "+", label: "Online impressions (1.0 alone)" },
    { end: 20, suffix: "+", label: "Partners & sponsors" },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="Two editions. 1,100+ lives touched."
        breadcrumb="Past Editions"
        subtitle="Every edition of Step-Up Summit leaves a trail — of shifted mindsets, launched ideas, and connections that outlive the day. Here's the receipts."
      />

      {/* STATS ROW */}
      <section className="bg-brand-blue py-16 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 text-center lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <ScrollReveal key={s.label}>
              <span className="font-heading text-4xl font-extrabold text-brand-gold sm:text-5xl">
                <CountUp end={s.end} suffix={s.suffix || ""} />
              </span>
              <p className="mt-2 text-sm font-semibold text-brand-muted">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* EDITION 1.0 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-brand-blue px-4 py-1 text-xs font-bold tracking-wide text-brand-gold">EDITION 1.0</span>
              <h3 className="mt-3 font-heading text-3xl font-bold text-brand-dark">The one that started it all</h3>
              <p className="mt-2 font-semibold text-brand-blue-light">Stepping up together</p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Over 700 attendees showed up ready to learn, grow, and be inspired.
                Eight thought leaders shared expertise that left the room with
                actionable insights — from a powerful opening message by Haoma
                Worgwu to Stephen Camilleri's redefinition of leadership as
                influence, vision, and service, and Babatunde Abiodun's
                mindset-shifting closing charge.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Beyond the hall, the summit generated over 11,600 LinkedIn
                impressions — amplifying the message far past the venue walls.
              </p>
              <div className="mt-6 flex gap-8">
                <div><b className="block font-heading text-2xl text-brand-dark">700+</b><span className="text-xs uppercase text-gray-500">Attendees</span></div>
                <div><b className="block font-heading text-2xl text-brand-dark">8</b><span className="text-xs uppercase text-gray-500">Thought leaders</span></div>
                <div><b className="block font-heading text-2xl text-brand-dark">11,600+</b><span className="text-xs uppercase text-gray-500">Impressions</span></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {gallery1.map((g, i) => (
                  <img key={i} src={g} alt="Edition 1.0" className="aspect-square w-full rounded-xl object-cover shadow-sm" />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* EDITION 2.0 */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {gallery2.map((g, i) => (
                  <img key={i} src={g} alt="Edition 2.0" className="aspect-square w-full rounded-xl object-cover shadow-sm" />
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <span className="inline-block rounded-full bg-brand-blue px-4 py-1 text-xs font-bold tracking-wide text-brand-gold">EDITION 2.0</span>
              <h3 className="mt-3 font-heading text-3xl font-bold text-brand-dark">Bigger. Bolder. Smarter.</h3>
              <p className="mt-2 font-semibold text-brand-blue-light">Shifting Minds: Leading Africa’s Future Through AI, Business & Innovation</p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Hosted at the International Conference Centre, University of Ibadan,
                edition 2.0 brought 400+ students, founders, and professionals
                face-to-face with leaders across AI, business, and innovation —
                featuring Haoma Worgwu, Stephen Camilleri, Oche Writes, Tosin
                Adegoke, Lanre Basamta, and Dr. Abiodun Oluwatobi.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Panel sessions, a pitch deck competition, finance talks, business
                workshops, giveaways, and networking — a full future-shaping
                experience.
              </p>
              <div className="mt-6 flex gap-8">
                <div><b className="block font-heading text-2xl text-brand-dark">400+</b><span className="text-xs uppercase text-gray-500">Students impacted</span></div>
                <div><b className="block font-heading text-2xl text-brand-dark">7</b><span className="text-xs uppercase text-gray-500">Featured speakers</span></div>
                <div><b className="block font-heading text-2xl text-brand-dark">ICC, UI</b><span className="text-xs uppercase text-gray-500">Venue</span></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <blockquote className="border-l-4 border-brand-gold pl-6 font-heading text-2xl font-medium italic leading-relaxed text-brand-dark">
              “Seeing attendees engage with our speakers and panelists, share their
              takeaways, and commit to stepping up in their personal and
              professional lives was the most rewarding part of the journey. This is
              just the beginning.”
            </blockquote>
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">— Edition 1.0 recap</p>
          </ScrollReveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Spark center />
            <Eyebrow className="mt-4">The moments</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">Moments from the movement</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {allGallery.map((g, i) => (
              <ScrollReveal key={i} delay={(i % 4) * 0.08}>
                <div className="group overflow-hidden rounded-xl">
                  <img
                    src={g}
                    alt="Step-Up Summit gallery"
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Edition 3.0 will be the biggest yet</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            December 2026 · ICC Hall, University of Ibadan. Don’t watch the recap —
            be in it.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 font-heading text-lg font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Register for 3.0
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PastEditions;
