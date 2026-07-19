import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Zap, Users, ChevronDown, Plane } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RevealText from "../components/TypewriterText";
import CountUp from "../components/CountUp";
import ScrollReveal from "../components/ScrollReveal";
import HeroPhotoCard from "../components/HeroPhotoCard";
import { Spark, Eyebrow } from "../components/ui";

import heroImg from "../assets/imag2.jpg";
import themeImg from "../assets/imag4.jpg";
import aboutImg from "../assets/12.jpeg";
import edition1Img from "../assets/img1.JPG";
import edition2Img from "../assets/8.jpg";
import pitchImg from "../assets/pitch1.jpg";
import speakerImg from "../assets/academy.png";
import speaker4 from "../assets/haoma.png";
import haomaImg from "../assets/haoma.png";
import heroCard1 from "../assets/3.jpg";
import heroCard2 from "../assets/5.jpg";
import heroCard3 from "../assets/7.jpg";
import heroCard5 from "../assets/1.jpg";
import heroCard6 from "../assets/2.jpg";
import heroCard7 from "../assets/6.jpg";
import heroCard8 from "../assets/9.jpg";
import sponsor1 from "../assets/sponsor1.png";
import sponsor2 from "../assets/sponsor2.png";
import sponsor3 from "../assets/sponsor3.png";
import cirveeLogo from "../assets/cirvee logo.jpeg";
import goodyLogo from "../assets/Goody.PNG";
import oluboriImg from "../assets/Adobe Ex.png";
import adeifeImg from "../assets/Adeife.png";
import stephenImg from "../assets/Stephen Camilleri.png";

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const reduce = useReducedMotion();

  const stats = [
    { end: 1100, suffix: "+", label: "Students Impacted" },
    { end: 3, label: "Edition · Biggest Yet" },
    { end: 15, label: "Speakers Hosted" },
    { end: 20, suffix: "+", label: "Partners & Sponsors" },
  ];

  const pillars = [
    { icon: Brain, title: "Shift the mindset", text: "We dismantle the “wait for a job” default and replace it with ownership thinking , because entrepreneurship starts in the mind before it appears in the market." },
    { icon: Zap, title: "Sharpen the skills", text: "Leadership, finance, digital skills, and pitch mastery , taught practically by people who have actually built things, not theory read from slides." },
    { icon: Users, title: "Open the room", text: "Founders, executives, and investors in the same hall as students. The network you can’t buy , offered free, on purpose." },
  ];

  const speakersPreview = [
    { name: "Haoma Worgwu", role: "Speaker · Editions 1.0 & 2.0", photo: speaker4 },
    { name: "Stephen Camilleri", role: "Speaker · Editions 1.0 & 2.0", photo: stephenImg },
    { name: "Olubori Paul Kehinde", role: "Speaker · Edition 1.0", photo: oluboriImg },
    { name: "Adeife Adeoye", role: "Panelist · Edition 1.0", photo: adeifeImg },
  ];

  const pitchSteps = [
    { n: "01", title: "Apply with your idea", text: "Submit your business idea when registration opens. No polished deck needed yet , clarity beats decoration." },
    { n: "02", title: "Get pitch-ready", text: "Shortlisted founders get guidance on structuring a deck that investors actually want to see." },
    { n: "03", title: "Pitch live at 3.0", text: "Take the stage at ICC Hall in December. Win prizes, mentorship, and the attention of people who can move your idea forward." },
  ];

  const sponsorLogos = [cirveeLogo, goodyLogo, sponsor1, sponsor2, sponsor3];

  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <header className="relative flex min-h-screen items-center overflow-hidden bg-brand-blue">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(11,31,92,0.82) 0%, rgba(6,13,31,0.9) 100%)" }}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-5 pt-28 pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
          <div className="flex w-full flex-col items-center px-1 text-center sm:items-start sm:px-0 sm:text-left md:max-w-2xl">
             <span className="mb-6 inline-flex max-w-full flex-wrap justify-center gap-2 rounded-full border-2 border-brand-gold bg-transparent px-4 py-2 text-center text-xs font-bold text-brand-gold sm:text-sm">
              <Plane size={16} className="rotate-[45deg]" fill="currentColor" strokeWidth={0} /> December 2026 · ICC Hall, University of Ibadan
            </span>
            <h1 className="w-full max-w-4xl font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-6xl">
              <RevealText
                as="span"
                text="The Entrepreneur Rising"
                accent="Rising"
                accentClass="text-brand-gold"
                className="text-white"
              />
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-4 w-full font-heading text-lg font-semibold text-brand-gold sm:text-xl"
            >
              Shifting Minds: Raising Africa&apos;s Next Generation Of Entrepreneurs.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-5 w-full max-w-2xl text-base text-blue-white sm:text-lg"
            >
              Step-Up Summit 3.0 is taking off, one day of world-class speakers,
              hands-on workshops, pitch battles, and the room that turns students
              into founders. Your seat is free. Your future isn’t waiting.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
            >
              <Link
                to="/register"
                className="rounded-full bg-brand-gold px-8 py-3 font-heading text-sm font-semibold text-brand-dark transition hover:bg-brand-gold-light sm:px-8 sm:py-3 sm:text-base min-w-[180px] text-center"
              >
                Register Now
              </Link>
              <Link
                to="/sponsors"
                className="rounded-full border-2 border-white/60 px-8 py-3 font-heading text-sm font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold sm:px-8 sm:py-3 sm:text-base min-w-[180px] text-center"
              >
                Become a Sponsor
              </Link>
            </motion.div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {["Leadership", "Finance", "Digital Skills", "Pitch Mastery", "Networking"].map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border-2 border-brand-gold bg-transparent px-4 py-2 text-center text-xs font-bold text-brand-gold sm:text-sm cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroPhotoCard images={[heroCard1, heroCard2, heroCard3, heroCard5, heroCard6, heroCard7, heroCard8]} />
        </div>

        <motion.a
          href="#stats"
          aria-label="Scroll down"
          animate={reduce ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-brand-gold"
        >
          <ChevronDown size={32} />
        </motion.a>
      </header>

      {/* STATS */}
      <section id="stats" className="bg-brand-blue py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 text-center lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <ScrollReveal key={s.label}>
              <div className="flex flex-col items-center gap-2">
                <span className="font-heading text-4xl font-extrabold text-brand-gold sm:text-5xl">
                  <CountUp end={s.end} suffix={s.suffix || ""} />
                </span>
                <p className="text-sm font-semibold text-brand-muted sm:text-base">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <Spark />
              <Eyebrow className="mt-4">About the summit</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
                Where students stop waiting and start building
              </h2>
              <p className="mt-5 leading-relaxed text-gray-600">
                Step-Up Summit is Ibadan’s boldest gathering of students, young
                founders, and future leaders , built on one conviction: Africa’s
                next generation of entrepreneurs is already on campus. They just
                need the mindset, the skills, and the room.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-block font-semibold text-brand-blue-light transition hover:text-brand-gold-dark"
              >
                Learn more about the summit →
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <img
                src={aboutImg}
                alt="Step-Up Summit"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
              />
            </ScrollReveal>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={item}
                className="rounded-2xl border-l-4 border-brand-blue bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <p.icon className="mb-3 text-brand-gold-dark" size={32} />
                <h3 className="mb-2 font-heading text-lg font-semibold text-brand-dark">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THEME */}
      <section className="bg-gradient-to-br from-brand-blue-mid to-brand-blue py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <img
              src={themeImg}
              alt="Step-Up Summit stage"
              className="aspect-[16/11] w-full rounded-2xl object-cover shadow-lg"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Spark />
            <Eyebrow className="mt-4">Theme , 3.0</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">The Entrepreneur Rising</h2>
            <p className="mt-4 text-brand-muted">
              Edition 3.0 is a call to every student who has ever had an idea and
              sat on it , this is the year you rise.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Keynotes and panels from founders and industry leaders shaping Africa’s future",
                "Business and finance workshops you can apply the same week",
                "The Pitch Deck competition , stand on stage, sell your idea, win support",
                "Giveaways, networking sessions, and connections that outlive the day",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-brand-muted">
                  <span className="mt-2 h-[5px] w-4 flex-shrink-0 rounded-full bg-brand-gold" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* PAST EDITIONS PREVIEW */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <Spark center />
          <Eyebrow className="mt-4">Our track record</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Two editions. One movement.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <ScrollReveal>
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-mid to-brand-blue p-8 text-white shadow-lg">
                <img src={edition1Img} alt="Edition 1.0" className="mb-6 aspect-[16/10] w-full rounded-xl object-cover" />
                <span className="inline-block rounded-full bg-brand-gold px-4 py-1 text-xs font-bold tracking-wide text-brand-dark">EDITION 1.0</span>
                <h3 className="mt-3 font-heading text-2xl font-bold">The one that started it all</h3>
                <div className="mt-4 flex justify-center gap-8 text-center">
                  <div><b className="block font-heading text-2xl text-brand-gold">700+</b><span className="text-xs uppercase text-brand-muted">Attendees</span></div>
                  <div><b className="block font-heading text-2xl text-brand-gold">8</b><span className="text-xs uppercase text-brand-muted">Speakers</span></div>
                  <div><b className="block font-heading text-2xl text-brand-gold">Alumni Hall, UI</b><span className="text-xs uppercase text-brand-muted">Venue</span></div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-mid to-brand-blue p-8 text-white shadow-lg">
                <img src={edition2Img} alt="Edition 2.0" className="mb-6 aspect-[16/10] w-full rounded-xl object-cover" />
                <span className="inline-block rounded-full bg-brand-gold px-4 py-1 text-xs font-bold tracking-wide text-brand-dark">EDITION 2.0</span>
                <h3 className="mt-3 font-heading text-2xl font-bold">Bigger. Bolder. Smarter.</h3>
                <div className="mt-4 flex justify-center gap-8 text-center">
                  <div><b className="block font-heading text-2xl text-brand-gold">400+</b><span className="text-xs uppercase text-brand-muted">Students</span></div>
                  <div><b className="block font-heading text-2xl text-brand-gold">7</b><span className="text-xs uppercase text-brand-muted">Speakers</span></div>
                  <div><b className="block font-heading text-2xl text-brand-gold">ICC Hall, UI</b><span className="text-xs uppercase text-brand-muted">Venue</span></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <Link
            to="/past-editions"
            className="mt-10 inline-block rounded-full border-2 border-brand-blue px-8 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
          >
            See the full story
          </Link>
        </div>
      </section>

      {/* SPEAKERS PREVIEW */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center sm:text-left">
            <Spark center />
            <Eyebrow className="mt-4">Voices that shift minds</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
              Speakers who've walked the talk
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {speakersPreview.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`flex h-full flex-col rounded-2xl p-3 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl ${i % 2 === 0 ? "bg-brand-blue text-white" : "bg-brand-gold text-brand-dark"}`}>
                  <div className={`mx-auto h-32 w-32 flex-shrink-0 sm:h-44 sm:w-44 overflow-hidden rounded-full ${i % 2 === 0 ? "bg-gradient-to-br from-brand-blue to-brand-blue-mid" : "bg-white/60"}`}>
                    {s.photo ? (
                      <img src={s.photo} alt={s.name} className="h-full w-full object-cover object-top" />
                    ) : (
                      <Users className="text-brand-gold/70" size={48} />
                    )}
                  </div>
                  <div className="mt-3 flex flex-1 flex-col">
                    <h4 className={`font-heading text-base font-semibold leading-tight ${i % 2 === 0 ? "text-white" : "text-brand-dark"}`}>{s.name}</h4>
                    <span className={`mt-1 text-sm leading-tight ${i % 2 === 0 ? "text-brand-muted" : "text-brand-blue"}`}>{s.role}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <Link to="/speakers" className="rounded-full border-2 border-brand-blue px-7 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white">
              See all speakers
            </Link>
            <a
              href="mailto:stepupsummit@gmail.com?subject=Speaking at Step-Up Summit 3.0"
              className="rounded-full bg-brand-gold px-7 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light"
            >
              Apply to speak
            </a>
          </div>
        </div>
      </section>

      {/* PITCH DECK PREVIEW */}
      <section className="bg-brand-blue py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Spark />
            <Eyebrow className="mt-4">The pitch deck</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Your idea. Our stage. Real stakes.</h2>
            <div className="mt-8 space-y-4">
              {pitchSteps.map((p) => (
                <div key={p.n} className="flex gap-4 rounded-xl border border-brand-muted/20 bg-white/5 p-5">
                  <span className="font-heading text-lg font-bold text-brand-gold">{p.n}</span>
                  <div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="text-sm text-brand-muted">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className="mt-8 inline-block rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light"
            >
              Register & apply to pitch
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <img src={pitchImg} alt="Pitch competition" className="aspect-[4/4.6] w-full rounded-2xl object-cover shadow-lg" />
          </ScrollReveal>
        </div>
      </section>

      {/* SPONSORS PREVIEW */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Spark />
          <Eyebrow className="mt-4">Partners & sponsors</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
            Brands that back the builders
          </h2>
          {/* // Replace with actual partner logos when available */}
          <div className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
            {sponsorLogos.map((logo, i) => (
              <img key={i} src={logo} alt="Partner logo" className="mx-auto h-12 w-auto object-contain opacity-90 transition hover:opacity-100" />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/sponsors" className="rounded-full bg-brand-gold px-7 py-3 font-semibold text-brand-dark transition hover:bg-brand-gold-light">
              Request the Sponsorship Deck
            </Link>
            <span className="text-sm text-gray-500">
              <a href="tel:+2348143567953" className="text-brand-gold-dark transition hover:underline">08143567953</a>
              {" · "}
              <a href="tel:+2348085908035" className="text-brand-gold-dark transition hover:underline">08085908035</a>
            </span>
          </div>
        </div>
      </section>

      {/* SAVE YOUR SEAT */}
      <section className="bg-brand-off-white py-20 text-brand-dark">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Your seat at 3.0 is reserved</h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">December 2026 &bull; ICC Hall, University of Ibadan &bull; Editions 1.0 and 2.0 both filled up &bull; Register Early</p>
          <Link
            to="/register"
            className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 font-heading text-lg font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            I Want to Register Now
          </Link>
        </div>
      </section>

      {/* ACADEMY TEASER */}
      <section className="bg-brand-blue py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <Spark />
            <Eyebrow className="mt-4">Beyond the summit</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              The summit is one day. Step-Up Academy is all year.
            </h2>
            <p className="mt-4 text-brand-muted">
              Our online incubation academy equips you with practical skills,
              personal branding, and real work experience , so the fire you catch
              in December keeps burning through the year.
            </p>
            <a
              href="https://academy.stepupsummit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border-2 border-white/60 px-7 py-3 font-semibold transition hover:border-brand-gold hover:text-brand-gold"
            >
              Explore Step-Up Academy
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <img src={speakerImg} alt="Step-Up Academy" className="w-full rounded-2xl object-contain shadow-lg ring-1 ring-white/10" />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
