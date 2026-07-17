import React from "react";

export const Spark = ({ center = false }) => (
  <div className={`flex gap-[7px] ${center ? "justify-center" : ""}`}>
    <span className="h-[5px] w-[26px] rounded-full bg-accentLightBlue" />
    <span className="h-[5px] w-[26px] rounded-full rounded-full bg-[#E24B4A]" />
    <span className="h-[5px] w-[26px] rounded-full bg-brand-gold" />
    <span className="h-[5px] w-[26px] rounded-full bg-[#7F77DD]" />
  </div>
);

export const Eyebrow = ({ children, className = "" }) => (
  <span
    className={`inline-block font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-dark ${className}`}
  >
    {children}
  </span>
);
