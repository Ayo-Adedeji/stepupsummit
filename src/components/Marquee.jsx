import React from "react";

const Marquee = ({ items, className = "" }) => {
  const doubled = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-slide gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold uppercase tracking-wider text-brand-gold/90"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
