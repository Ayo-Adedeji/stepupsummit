import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroPhotoCard = ({ images }) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length, reduce]);

  return (
    <div className="relative w-full max-w-[280px] shrink-0 sm:max-w-md">
      <div className="relative aspect-[4/5] w-full">
        <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-lg">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Step-Up Summit moment"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* brand-blue tint so the images blend with the hero, even if lighter */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(11,31,92,0.30) 0%, rgba(6,13,31,0.45) 100%)" }}
          />
        </div>

        {/* TOP-LEFT badge , half on / half off the card */}
        <div className="absolute -left-6 -top-2 flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-3 py-2 text-left shadow-xl sm:-left-8 sm:px-5 sm:py-3">
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold sm:h-2.5 sm:w-2.5" />
          <span className="leading-tight">
            <span className="block text-xs font-extrabold text-brand-dark sm:text-sm">1,100+</span>
            <span className="block text-[0.6rem] font-bold uppercase tracking-wide text-brand-dark sm:text-[0.6rem]">Students Impacted</span>
          </span>
        </div>

        {/* BOTTOM-RIGHT badge , half on / half off the card */}
        <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-3 py-2 text-left shadow-xl sm:-bottom-4 sm:-right-4 sm:px-5 sm:py-3">
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold sm:h-2.5 sm:w-2.5" />
          <span className="leading-tight">
            <span className="block text-xs font-extrabold text-brand-dark sm:text-sm">3rd Edition</span>
            <span className="block text-[0.6rem] font-bold uppercase tracking-wide text-brand-dark sm:text-[0.6rem]">Biggest Yet</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroPhotoCard;
