import React from "react";
import { Brain, Zap, Users, TrendingUp, Network } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import CountUp from "../components/CountUp";
import { Spark, Eyebrow } from "../components/ui";

import stageImg from "../assets/imag4.jpg";
import convenerImg from "../assets/Precious.JPG";
import storyVideo from "../assets/summit.mp4";

const pillars = [
  { n: "01", icon: Brain, title: "Leadership", text: "Not titles , influence, vision, and service. We teach leadership as the ability to move people and ideas forward, wherever you stand." },
  { n: "02", icon: TrendingUp, title: "Finance", text: "Money literacy for builders: pricing, funding, managing cash, and thinking like an owner , before the first naira is made." },
  { n: "03", icon: Zap, title: "Digital skills mastery", text: "AI, digital marketing, content, and the tools of the modern economy , the leverage that lets one student compete like a company." },
  { n: "04", icon: Users, title: "Pitch mastery", text: "If you can’t sell the idea, the idea dies. We train young founders to communicate value clearly , on stage, in a room, in a DM." },
  { n: "05", icon: Network, title: "Business networking", text: "Meaningful connections, deliberately engineered. The right room compresses a decade of trying into a day of meeting." },
];

const team = [
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
];

const About = () => {
  const stats = [
    { end: 1100, suffix: "+", label: "Students" },
    { end: 3, label: "Editions" },
    { end: 15, label: "Speakers" },
    { end: 20, suffix: "+", label: "Partners" },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <PageHero title="Built to raise builders" breadcrumb="About" subtitle="Step-Up Summit exists for one reason: to make sure no young Nigerian graduates without knowing they can build something of their own." />

      {/* OUR STORY */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              It started with a question
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              What happens when passionate people step up together? We found out at
              our first edition , when over 700 students filled a hall expecting an
              event and left with a movement. Stories were shared. Mindsets were
              shifted. Lives were impacted.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Edition 2.0 went bigger, bolder, and smarter , bringing 400+ students
              to the International Conference Centre, University of Ibadan, to
              confront the future of AI, business, and innovation face-to-face with
              the people building it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Now, 3.0 rises: The Entrepreneur Rising , shifting minds and raising
              Africa’s next generation of entrepreneurs.
            </p>
          </ScrollReveal>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <video
              src={storyVideo}
              type="video/mp4"
              autoPlay
              muted
              loop
              playsInline
              poster={stageImg}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* THEME 3.0 */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <img src={stageImg} alt="Speaker on stage" className="aspect-[16/11] w-full rounded-2xl object-cover shadow-lg" />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Eyebrow>Theme , 3.0</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">The Entrepreneur Rising</h2>
            <p className="mt-4 text-brand-muted">
              Step-Up Summit exists for one reason: to make sure no young Nigerian
              graduates without knowing they can build something of their own.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <blockquote className="border-l-4 border-brand-gold pl-6 font-heading text-lg font-medium italic leading-relaxed text-brand-dark">
              “The Step-Up Summit was more than an event; it was a movement. The
              numbers tell a story of connection, growth, and transformation , but
              they reflect something deeper: a hunger for growth and a shared belief
              in stepping up to the next level.”
            </blockquote>
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">, Impact recap, Edition 1.0</p>
          </ScrollReveal>
        </div>
      </section>

      {/* FIVE PILLARS */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <Spark center />
            <Eyebrow className="mt-4">What we stand on</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">Five pillars, one mission</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600">
              Everything we program , every speaker, workshop, and competition ,
              maps to the five capabilities every young builder needs.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <ScrollReveal key={p.n}>
                <div className="h-full rounded-2xl border-l-4 border-brand-blue bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="font-heading text-3xl font-extrabold text-brand-gold">{p.n}</span>
                  <p.icon className="mb-4 ml-3 inline text-brand-gold-dark" size={28} />
                  <h3 className="mb-2 font-heading text-xl font-semibold text-brand-dark">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
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

      {/* TEAM */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Spark />
          <Eyebrow className="mt-4">Meet the team</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            The people behind the movement
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
            Step-Up Summit is powered by young professionals who volunteer their
            craft , strategy, media, protocol, tech , because they believe in what
            one room can do for a generation.
          </p>

          {/* FOUNDER , premium two-column card */}
          <ScrollReveal>
            <div className="grid grid-cols-1 items-center gap-6 rounded-2xl border-l-4 border-brand-gold bg-gradient-to-br from-brand-blue-mid to-brand-blue p-7 text-white shadow-xl sm:grid-cols-[200px_1fr] sm:gap-8">
              <img
                src={convenerImg}
                alt="Precious Lijoka"
                className="mx-auto aspect-square w-full max-w-[200px] rounded-xl object-cover shadow-lg"
              />
              <div>
                <h4 className="font-heading text-2xl font-extrabold text-white">Precious Lijoka</h4>
                <span className="text-sm font-semibold text-brand-gold-light">Founder &amp; Convener</span>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  Brand strategist and builder of platforms that raise people.
                  Precious convenes Step-Up Summit with one goal: no student should
                  graduate without knowing they can build.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* STATIC TEAM MEMBERS , 2 col mobile, 4 col desktop */}
          {/* // Replace with actual team member photos, names, and roles when available */}
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {team.slice(0, 4).map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-3 text-center shadow-md">
                  <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-mid">
                    <Users className="text-brand-gold/70" size={48} />
                  </div>
                  <h4 className="mt-3 font-heading text-base font-semibold text-brand-dark">{m.name}</h4>
                  <span className="text-sm text-gray-500">{m.role}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* OTHER TEAM MEMBERS */}
          <div className="mt-16">
            <div className="flex items-center gap-4">
              <h3 className="font-heading text-2xl font-bold text-brand-dark">Other Team Members</h3>
              <span className="h-1 flex-1 rounded-full bg-brand-gold" />
            </div>

            {/* CONTINUOUS SCROLL MARQUEE */}
            {/* // Add actual team member names, roles, and photos when available */}
            <div className="mt-8 overflow-hidden">
              <div className="flex w-max marquee-track">
                {[...team, ...team].map((m, i) => (
                  <div key={i} className="mx-3 w-64 flex-shrink-0 rounded-2xl bg-white p-4 text-center shadow-md">
                    <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-mid">
                      <Users className="text-brand-gold/70" size={48} />
                    </div>
                    <h4 className="mt-3 font-heading text-base font-semibold text-brand-dark">{m.name}</h4>
                    <span className="text-sm text-gray-500">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Want to be part of the story?</h2>
          <p className="mt-4 text-brand-muted">
            Join us at 3.0 as an attendee, a speaker, a volunteer, or a partner.
          </p>
          <a
            href="/register"
            className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 font-heading text-lg font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Register Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
