import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ items }) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/20 rounded-2xl border border-white/10 bg-white/5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-lg font-semibold text-white">
                {item.q}
              </span>
              <ChevronDown
                size={22}
                className={`flex-shrink-0 text-brand-gold transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-6 pb-6 text-brand-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
