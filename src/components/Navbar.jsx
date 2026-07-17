import React, { useState, useEffect } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import { Menu, X } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";

const links = [
  { to: "/about", label: "About" },
  { to: "/past-editions", label: "Past Editions" },
  { to: "/speakers", label: "Speakers" },
  { to: "/pitch-deck", label: "Pitch Deck" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/incubation", label: "Incubation" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const base =
    "text-sm font-medium transition-colors duration-200";
  const desktopLink = ({ isActive }) =>
    `${base} ${
      isActive ? "text-brand-gold" : "text-brand-muted hover:text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-brand-blue/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={StepUPLogo} alt="StepUp Summit" className="h-10 w-auto" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={desktopLink}>
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-brand-gold" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
          <Link
            to="/register"
            className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-gold-light"
          >
            Register Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-white lg:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-brand-blue px-5 pb-6 pt-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `min-h-[44px] border-b border-white/10 py-3 font-medium ${
                  isActive ? "text-brand-gold" : "text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/register"
            className="mt-3 min-h-[44px] rounded-full bg-brand-gold px-5 py-3 text-center font-semibold text-brand-dark"
          >
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
