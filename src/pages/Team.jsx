import React from "react";
import { User } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import { Spark, Eyebrow } from "../components/ui";

import convenerImg from "../assets/Precious.JPG";

const team = [
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
  { name: "Team member name", role: "Role" },
];

const Team = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <PageHero
        title="The People Raising the Builders"
        subtitle="Young professionals who volunteer their craft because they believe in what one room can do for a generation."
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Spark />
          <Eyebrow className="mt-4">Meet the team</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            The people raising the builders
          </h2>

          {/* // Replace placeholder cards with actual team member photos and roles */}
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <ScrollReveal>
              <div className="rounded-2xl bg-white p-4 text-center shadow-md ring-2 ring-brand-gold">
                <img src={convenerImg} alt="Precious Lijoka" className="mx-auto aspect-square w-full rounded-xl object-cover" />
                <h4 className="mt-3 font-heading text-base font-semibold text-brand-dark">Precious Lijoka</h4>
                <span className="text-sm text-gray-500">Founder & Convener</span>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  Brand strategist and builder of platforms that raise people.
                  Precious convenes Step-Up Summit with one goal: no student
                  should graduate without knowing they can build.
                </p>
              </div>
            </ScrollReveal>

            {team.map((m, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 0.08}>
                <div className="rounded-2xl bg-white p-3 text-center shadow-md">
                  <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-mid">
                    <User className="text-brand-gold/70" size={48} />
                  </div>
                  <h4 className="mt-3 font-heading text-base font-semibold text-brand-dark">{m.name}</h4>
                  <span className="text-sm text-gray-500">{m.role}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
