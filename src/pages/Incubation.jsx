import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import { Spark, Eyebrow } from "../components/ui";

import academyImg from "../assets/speaker.jpg";

const incubation = [
  { n: "01", title: "Practical skills training", text: "Hands-on learning in the digital and business skills the market actually pays for — taught to be applied, not admired." },
  { n: "02", title: "Personal branding", text: "Learn to package and position yourself — so opportunities can find you before you go looking for them." },
  { n: "03", title: "Real work experience", text: "Projects and placements that put your skills to work — because ‘experience required’ shouldn’t be a locked door." },
  { n: "04", title: "A tribe of builders", text: "Accountability, collaboration, and connections with peers on the same climb — the quiet engine behind every rise." },
];

const Incubation = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="The summit lights the fire. The Academy keeps it burning."
        breadcrumb="Our Incubation"
        subtitle="Step-Up Academy is our online incubation programme — practical skills, personal branding, and real work experience, all year round."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Spark />
            <Eyebrow className="mt-4">Beyond the summit</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              One day can inspire you. A season can transform you.
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              The summit shifts your mind in a day — but building takes months.
              Step-Up Academy is the bridge: an online incubation academy that
              equips you with practical skills, personal branding, and real work
              experience.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Instead of leaving December’s fire to fade by February, Academy
              members keep learning, keep building, and keep getting pushed by a
              community that refuses to let them shrink back.
            </p>
            <a
              href="https://academy.stepupsummit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light"
            >
              Visit Step-Up Academy
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <img src={academyImg} alt="Step-Up Academy" className="aspect-[3/4] w-full rounded-2xl object-cover object-top pt-4 shadow-lg" />
          </ScrollReveal>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Spark center />
            <Eyebrow className="mt-4">What you get</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Incubation, not just information
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {incubation.map((c) => (
              <ScrollReveal key={c.n}>
                <div className="h-full rounded-2xl border-l-4 border-brand-blue bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="font-heading text-3xl font-extrabold text-brand-gold">{c.n}</span>
                  <h3 className="mt-2 mb-2 font-heading text-lg font-semibold text-brand-dark">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{c.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <blockquote className="border-l-4 border-brand-gold pl-6 font-heading text-2xl font-medium italic leading-relaxed text-brand-dark">
              “An online incubation academy that equips you with practical skills,
              personal branding, and real work experience.”
            </blockquote>
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">— Step-Up Academy</p>
          </ScrollReveal>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to go from inspired to incubated?</h2>
          <p className="mt-4 text-brand-muted">
            Start at the summit in December, then continue the climb inside the
            Academy.
          </p>
          <a
            href="https://academy.stepupsummit.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 font-heading text-lg font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Join the Academy
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Incubation;
