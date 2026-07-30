import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import { Spark, Eyebrow } from "../components/ui";
import { User, PenLine, Share2, Layers, Globe, Brain, BarChart2, ShieldCheck, Monitor, Server, ChevronDown } from "lucide-react";

import academyImg from "../assets/academy.png";

const incubation = [
  { n: "01", title: "Practical skills training", text: "Hands-on learning in the digital and business skills the market actually pays for, taught to be applied, not admired." },
  { n: "02", title: "Personal branding", text: "Learn to package and position yourself, so opportunities can find you before you go looking for them." },
  { n: "03", title: "Real work experience", text: "Projects and placements that put your skills to work, because 'experience required' shouldn't be a locked door." },
  { n: "04", title: "A tribe of builders", text: "Accountability, collaboration, and connections with peers on the same climb, the quiet engine behind every rise." },
];

const tracks = [
  { n: "TRACK 01", title: "Digital Skills Mastery", text: "Copywriting, content creation, digital marketing, social media management, and the AI tools multiplying what one person can do.", color: "border-brand-gold" },
  { n: "TRACK 02", title: "Personal Branding", text: "Package and position yourself so opportunities find you, profile, portfolio, presence, and the confidence to be visible.", color: "border-brand-blue" },
  { n: "TRACK 03", title: "Business & Entrepreneurship", text: "Idea validation, structure, pricing, customer growth, the practical mechanics of building something that pays.", color: "border-[#7F77DD]" },
  { n: "TRACK 04", title: "Finance for Builders", text: "Money literacy from first income: managing cash, pricing your work, saving, and thinking like an owner.", color: "border-[#E24B4A]" },
  { n: "TRACK 05", title: "Leadership & Mindset", text: "Discipline, resilience, communication, and the ownership thinking that separates builders from waiters-for-jobs.", color: "border-brand-gold" },
  { n: "TRACK 06", title: "Pitch Mastery", text: "Sell your idea clearly, on a stage, in a room, in a DM. The skill that decides whether ideas live or die.", color: "border-brand-blue" },
];

const courses = [
  { name: "Personal Branding", desc: "Build your personal brand, online presence, CV, and professional positioning.", Icon: User },
  { name: "Content Writing & SEO", desc: "Learn persuasive writing and SEO strategies that drive traffic and conversions.", Icon: PenLine },
  { name: "Social Media Management", desc: "Master content planning, analytics, growth strategies, and brand storytelling.", Icon: Share2 },
  { name: "Product Design", desc: "Design user-centred digital products using modern tools and frameworks.", Icon: Layers },
  { name: "Web 3.0", desc: "Understand blockchain, decentralised systems, and future-ready Internet technologies.", Icon: Globe },
  { name: "AI & Machine Learning", desc: "Learn intelligent systems, automations, and real-world AI applications.", Icon: Brain },
  { name: "Data Science", desc: "Analyse data, uncover insights, and make data-driven business decisions.", Icon: BarChart2 },
  { name: "Cybersecurity", desc: "Protect digital systems, manage threats, and secure online infrastructures.", Icon: ShieldCheck },
  { name: "Frontend Development", desc: "Build visually engaging, responsive, and interactive user interfaces that bring websites and apps to life.", Icon: Monitor },
  { name: "Backend Development", desc: "Develop powerful server-side systems, databases, and APIs that keep applications fast and secure.", Icon: Server },
];

const faqs = [
  { q: "Who can join the Academy?", a: "Students, recent graduates, corpers, and young professionals, anyone ready to learn practical skills and build. Summit attendees get first access to new cohorts." },
  { q: "Is it free or paid?", a: "We run both free foundational sessions and affordable paid cohort tracks with certification, projects, and placement support. Sponsored scholarship seats are available each cohort thanks to our partners." },
  { q: "Is everything online?", a: "Yes, the Academy is fully online, so you can join from any campus or city, with live sessions plus a community that never sleeps." },
  { q: "What's the difference between the Academy and Pitch Incubation?", a: "The Academy equips you, skills, branding, experience. Pitch Incubation builds a company with you, selected founders get 6 to 36 months of hands-on venture building. Many founders do the first before the second." },
  { q: "How do I start?", a: "Visit academy.stepupsummit.org to join, or register for Step-Up Summit 3.0 to get first access to the next cohort." },
];

const Incubation = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="The summit lights the fire. The Academy keeps it burning."
        breadcrumb="Our Incubation"
        subtitle="Step-Up Academy is our online incubation programme, practical skills, personal branding, and real work experience, all year round."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Spark />
            <Eyebrow className="mt-4">Beyond the summit</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              One day can inspire you. A season can transform you.
            </h2>
            <p className="mt-4 leading-relaxed text-gray-400">
              The summit shifts your mind in a day, but building takes months.
              Step-Up Academy is the bridge: an online incubation academy that
              equips you with practical skills, personal branding, and real work
              experience.
            </p>
            <p className="mt-4 leading-relaxed text-gray-400">
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
            <img src={academyImg} alt="Step-Up Academy" className="w-full rounded-2xl object-contain shadow-lg ring-1 ring-white/10" />
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
                  <p className="text-sm leading-relaxed text-gray-400">{c.text}</p>
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
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">, Step-Up Academy</p>
          </ScrollReveal>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to go from inspired to incubated?</h2>
          <p className="mt-4 text-white/80">
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

      {/* SECTION A — TRACKS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Eyebrow>What You Learn</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">Tracks built on our six pillars</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-400">
              Every track is taught to be applied, not admired, by people who have actually built, in the skills the market actually pays for.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`h-full rounded-2xl border-t-4 ${t.color} bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl`}>
                  <span className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-dark">{t.n}</span>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-brand-dark">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{t.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B — COURSES */}
      <section className="bg-brand-blue py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Eyebrow className="text-brand-gold-light">Our Courses</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">What you'll learn to build</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
                Practical, portfolio-ready skills taught by people who've done it.
              </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {courses.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-white/10 bg-brand-blue-mid p-5 text-center transition hover:-translate-y-1 hover:border-brand-gold hover:shadow-lg">
                  <c.Icon className="mx-auto mb-3 text-brand-gold" size={28} />
                  <h4 className="font-heading text-sm font-semibold text-white">{c.name}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/80">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C — PARTNER WITH THE ACADEMY */}
      <section className="bg-brand-blue py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex w-max justify-center gap-2">
              <span className="h-[5px] w-8 rounded-full bg-brand-blue-light" />
              <span className="h-[5px] w-8 rounded-full bg-[#E24B4A]" />
              <span className="h-[5px] w-8 rounded-full bg-brand-gold" />
              <span className="h-[5px] w-8 rounded-full bg-[#7F77DD]" />
            </div>
            <Eyebrow className="mt-6 text-brand-gold-light">For Organisations</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">Partner with the Academy</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
              Two ways your organisation can plug into the pipeline that raises Africa's next generation of talent.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <div className="h-full rounded-xl border border-white/10 bg-brand-blue-mid p-8">
                <h3 className="font-heading text-xl font-semibold text-brand-gold">Sponsor a cohort</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  Corporates, NGOs and foundations fund scholarship seats for students who can't afford training, turning CSR budgets into measurable, reportable impact, with your brand on every graduate's story.
                </p>
                <a
                  href="mailto:stepupsummit@gmail.com?subject=Sponsoring a Step-Up Academy Cohort"
                  className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 font-heading text-base font-semibold text-brand-dark transition hover:bg-brand-gold-light"
                >
                  Sponsor scholarship seats
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="h-full rounded-xl border border-white/10 bg-brand-blue-mid p-8">
                <h3 className="font-heading text-xl font-semibold text-brand-gold">Hire our graduates</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  Academy graduates come work-tested, trained, portfolio-proven, and hungry. Tap the pipeline for interns, junior talent, and freelance project support.
                </p>
                <a
                  href="mailto:stepupsummit@gmail.com?subject=Hiring Step-Up Academy Graduates"
                  className="mt-6 inline-block rounded-full border-2 border-white px-8 py-3 font-heading text-base font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold"
                >
                  Request talent
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION D — FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-center">
            <Eyebrow>Quick Answers</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">Frequently asked</h2>
          </div>
          <div className="mt-12 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            {faqs.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-lg font-semibold text-brand-dark">{item.q}</span>
        <ChevronDown
          size={22}
          className={`flex-shrink-0 text-brand-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-6 text-sm leading-relaxed text-gray-400">{item.a}</p>
      </div>
    </div>
  );
};

export default Incubation;
