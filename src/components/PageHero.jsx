import React from "react";
import { Link } from "react-router-dom";
import RevealText from "./TypewriterText";
import { Spark } from "./ui";

const PageHero = ({ title, breadcrumb, subtitle }) => (
  <header className="relative flex min-h-[55vh] items-center overflow-hidden bg-gradient-to-br from-brand-blue-mid to-brand-blue pt-24 text-white">
    <div className="mx-auto w-full max-w-7xl px-5 pb-12 text-center lg:px-8 lg:text-left">
      <Spark />
      <RevealText
        as="h1"
        text={title}
        className="mt-4 max-w-4xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl sm:text-left lg:text-6xl"
      />
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">{subtitle}</p>
      )}
      {breadcrumb && (
        <nav className="mt-6 text-sm text-brand-muted">
          <Link to="/" className="hover:text-brand-gold">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-brand-gold">{breadcrumb}</span>
        </nav>
      )}
    </div>
  </header>
);

export default PageHero;
