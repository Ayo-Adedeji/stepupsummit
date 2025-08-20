import React, { useState } from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import StepUPLogo1 from "../assets/StepUPLogo1.png";
import useScrollAnimation from "../components/useScrollAnimation";

const images = [
  StepUPLogo,
  StepUPLogo1,
  StepUPLogo,
  StepUPLogo1,
  StepUPLogo,
  StepUPLogo1,
  StepUPLogo,
  StepUPLogo1,
];

const Sponsors = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textRef, textVisible] = useScrollAnimation();
  return (
    <section className="text-[#ffffff] bg-accentLightBlue flex flex-col items-center text-center py-10 px-4">
      <div
        ref={textRef}
        className={textVisible ? "animate-fadeInUp" : "animate-fadeOutDown"}
      >
        <h1 className="mt-2 mb-5 text-2xl font-semibold">
          Partners & Sponsors
        </h1>
         <p className="text-lg mb-10 max-w-2xl">
          Step-Up Summit thrives through the support of partners who share our
          vision. Sponsors gain direct engagement with ambitious young leaders,
          access to exhibition opportunities, and significant media visibility.
        </p>
        <p className="text-lg mb-10 max-w-2xl">
          We thank the organizations whose support makes SUS 2025 possible.
          Their commitment helps inspire and equip the next generation of
          leaders.
        </p>
       
      </div>

      {/* Logos */}
      <div className="flex flex-wrap justify-center gap-10 mb-6">
        {images.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Sponsor ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`border rounded-2xl w-48 h-40 object-contain p-3 bg-white cursor-pointer transition-transform duration-300 ${
              activeIndex === index ? "scale-110 shadow-lg" : "scale-100"
            }`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              activeIndex === index
                ? "bg-accentDarkBlue scale-125"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
