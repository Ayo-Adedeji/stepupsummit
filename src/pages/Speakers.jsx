import React from "react";
import { User } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import { Spark } from "../components/ui";

import speaker4 from "../assets/haoma.png";
import haoma from "../assets/haoma.png";
import stephen from "../assets/Stephen Camilleri.png";
import olubori from "../assets/Adobe Ex.png";
import adeife from "../assets/Adeife.png";
import israel from "../assets/Adobe E.png";
import babatunde from "../assets/Babatunde.jpeg";
import oche from "../assets/speaker2.jpg";
import lanre from "../assets/speaker6.png";
import abiodun from "../assets/speaker1.png";
import tosin from "../assets/speaker5.png";

const speakerPhotos = {
  "Haoma Worgwu": speaker4,
  "Stephen Camilleri": stephen,
  "Oche Writes": oche,
  "Tosin Adegoke": tosin,
  "Olubori Paul Kehinde": olubori,
  "Adeife Adeoye": adeife,
  "Lanre Basamta": lanre,
  "Dr. Abiodun Oluwatobi": abiodun,
  "Israel Olaniyan LL.B., B.L.": israel,
  "Babatunde Abiodun": babatunde,
};

const pastSpeakers = [
  { name: "Haoma Worgwu", role: "Speaker · Editions 1.0 & 2.0" },
  { name: "Stephen Camilleri", role: "Speaker · Editions 1.0 & 2.0" },
  { name: "Oche Writes", role: "Speaker · Edition 2.0" },
  { name: "Tosin Adegoke", role: "Speaker · Edition 2.0" },
  { name: "Lanre Basamta", role: "Speaker · Edition 2.0" },
  { name: "Dr. Abiodun Oluwatobi", role: "Speaker · Edition 2.0" },
  { name: "Olubori Paul Kehinde", role: "Speaker · Edition 1.0" },
  { name: "Babatunde Abiodun", role: "Closing speaker · Edition 1.0" },
  { name: "Adeife Adeoye", role: "Panelist · Edition 1.0" },
  { name: "Israel Olaniyan LL.B., B.L.", role: "Panelist · Edition 1.0" },
  { name: "Dipo Adepoju", role: "Panelist · Edition 1.0" },
  { name: "3.0 speakers", role: "Announcing soon…" },
];

const Speakers = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="Voices that shift minds"
        breadcrumb="Speakers"
        subtitle="Fifteen founders, executives, and thought leaders have taken the Step-Up stage across two editions , sharing wisdom that turned attendees into builders. The 3.0 lineup is loading."
      />

      {/* PAST SPEAKERS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Spark />
          <h2 className="mt-4 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            The calibre to expect
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
            From leadership and AI to business and personal growth , our speakers
            don’t recite theory. They’ve built, failed, rebuilt, and come to hand
            you the map.
          </p>
          {/* // Replace placeholders with actual headshots and roles when available */}
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {pastSpeakers.map((s, i) => {
              const photo = speakerPhotos[s.name];
              return (
                <ScrollReveal key={s.name} delay={(i % 4) * 0.08}>
              <div className={`flex h-full flex-col rounded-2xl p-3 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl ${i % 2 === 0 ? "bg-brand-blue text-white" : "bg-brand-gold text-brand-dark"}`}>
                    <div className={`mx-auto h-32 w-32 flex-shrink-0 sm:h-48 sm:w-48 overflow-hidden rounded-2xl ${i % 2 === 0 ? "bg-gradient-to-br from-brand-blue to-brand-blue-mid" : "bg-white/60"}`}>
                  {photo ? (
                    <img src={photo} alt={s.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    <User className={i % 2 === 0 ? "text-brand-gold/70" : "text-brand-blue/70"} size={48} />
                  )}
                </div>
                <div className="mt-3 flex flex-1 flex-col">
                  <h4 className={`font-heading text-base font-semibold leading-tight ${i % 2 === 0 ? "text-white" : "text-brand-dark"}`}>{s.name}</h4>
                  <span className={`mt-1 text-sm leading-tight ${i % 2 === 0 ? "text-brand-muted" : "text-brand-blue"}`}>{s.role}</span>
                </div>
              </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROPOSED SPEAKERS */}
      <section className="bg-brand-blue py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold">
            Step-Up Summit 3.0
          </p>
          <h2 className="mt-3 text-center font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight">
            Proposed <em className="text-brand-gold not-italic">Speakers</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-base leading-[1.8] text-white/70">
            The voices shaping &lsquo;The Entrepreneur Rising.&rsquo; These are the founders, leaders, and thought leaders we&rsquo;re bringing to the ICC stage this December &mdash; to shift minds and show a generation how to build.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => (
              <ScrollReveal key={num} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:border-brand-gold/50">
                  <div className="mx-4 mt-4 flex aspect-[3/4] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.08]">
                    <div className="text-center">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Photo</p>
                      <p className="mt-1 text-xs text-white/40">Speaker {num}</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-heading text-base font-bold text-white">[Speaker Name]</h4>
                    <p className="mt-1 text-xs text-white/55">[Title &middot; Organisation]</p>
                    <div className="mt-3 flex justify-center gap-2">
                      {["in", "X", "IG"].map((label) => (
                        <span
                          key={label}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-xs font-bold text-white/70 transition duration-200 hover:border-brand-gold hover:bg-brand-gold/20 hover:text-brand-gold"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Hear them live in December.</h3>
            <p className="mt-3 text-sm text-white/60">The best seats at ICC Hall go to the earliest names on the list.</p>
            <a
              href="/register"
              className="mt-5 inline-block rounded-full bg-brand-gold px-8 py-3 font-heading text-sm font-semibold text-brand-dark transition hover:bg-brand-gold-light"
            >
              Register Free
            </a>
          </div>
        </div>
      </section>

      {/* APPLY TO SPEAK */}
      <section className="bg-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <Spark center />
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">Have wisdom worth sharing?</h2>
          <p className="mt-4 text-brand-muted">
            We’re curating the 3.0 lineup around The Entrepreneur Rising. If your
            story can shift a student’s mind , on leadership, finance, digital
            skills, or building in Africa , we want to hear it.
          </p>
          <a
            href="mailto:stepupsummit@gmail.com?subject=Speaking at Step-Up Summit 3.0"
            className="mt-8 inline-block rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Apply to speak
          </a>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <blockquote className="border-l-4 border-brand-gold pl-6 font-heading text-lg font-medium italic leading-relaxed text-brand-dark">
              “He redefined leadership , not as power, but as influence, vision, and
              service. His message was a timely reminder of what true leaders
              embody.”
            </blockquote>
            <p className="mt-4 pl-6 text-sm font-semibold text-gray-500">, Attendee reflection on Stephen Camilleri, Edition 1.0</p>
          </ScrollReveal>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Hear them live in December.</h2>
          <p className="mt-4 text-brand-muted">
            The best seats at ICC Hall go to the earliest names on the list.
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

export default Speakers;
