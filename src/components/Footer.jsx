import React from "react";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-muted">
      <div className="mx-auto max-w-7xl px-5 py-16 text-center md:text-left lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center">
              <img src="/favicon.png" alt="StepUp Summit" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Shifting the mindset of students and entrepreneurs , leadership,
              finance, digital skills mastery, and business networking.
            </p>
            <div className="mt-5 flex justify-center gap-3 md:justify-start">
              <a
                href="https://www.instagram.com/step_upsummit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-muted/40 text-brand-muted transition hover:border-brand-gold hover:text-brand-gold"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/step-up-summit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-muted/40 text-brand-muted transition hover:border-brand-gold hover:text-brand-gold"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-muted/40 text-brand-muted transition hover:border-brand-gold hover:text-brand-gold"
              >
                <span className="font-heading text-sm font-bold">X</span>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-muted/40 text-brand-muted transition hover:border-brand-gold hover:text-brand-gold"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 font-heading text-base font-semibold text-white">
              Summit
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="transition hover:text-brand-gold" to="/about">About</Link></li>
              <li><Link className="transition hover:text-brand-gold" to="/past-editions">Past Editions</Link></li>
              <li><Link className="transition hover:text-brand-gold" to="/speakers">Speakers</Link></li>
              <li><Link className="transition hover:text-brand-gold" to="/pitch-deck">Pitch Deck</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 font-heading text-base font-semibold text-white">
              Get Involved
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="transition hover:text-brand-gold" to="/register">Register</Link></li>
              <li><Link className="transition hover:text-brand-gold" to="/sponsors">Sponsor 3.0</Link></li>
              <li>
                <a
                  className="transition hover:text-brand-gold"
                  href="mailto:stepupsummit@gmail.com?subject=Speaking at Step-Up Summit 3.0"
                >
                  Speak at 3.0
                </a>
              </li>
              <li><Link className="transition hover:text-brand-gold" to="/incubation">Our Incubation</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 font-heading text-base font-semibold text-white">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="transition hover:text-brand-gold" href="mailto:stepupsummit@gmail.com">
                  stepupsummit@gmail.com
                </a>
              </li>
              <li><a className="transition hover:text-brand-gold" href="tel:+2348143567953">0814 356 7953</a></li>
              <li><a className="transition hover:text-brand-gold" href="tel:+2348085908035">0808 590 8035</a></li>
              <li>
                <a className="transition hover:text-brand-gold" href="https://academy.stepupsummit.org" target="_blank" rel="noopener noreferrer">
                  Step-Up Academy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-gold/30" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-center text-sm md:text-left sm:flex-row lg:px-8">
        <span>© 2026 Step-Up Summit. All rights reserved.</span>
        <span>Powered by Precious Crafts</span>
      </div>
    </footer>
  );
};

export default Footer;
