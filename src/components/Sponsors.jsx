import React, { useState, useEffect } from "react";
import sponsor1 from "../assets/sponsor1.png";
import sponsor3 from "../assets/sponsor3.png";
import sponsor4 from "../assets/sponsor4.png";
import sponsor6 from "../assets/sponsor6.png";
import useScrollAnimation from "../components/useScrollAnimation";

const images = [
  sponsor1,
  sponsor3,
  sponsor4,
  sponsor6,
];

const Sponsors = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" or "prev"
  const [textRef, textVisible] = useScrollAnimation();

  // Auto change logo every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection("next");
    setPrevIndex(activeIndex);
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? "next" : "prev");
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  return (
    <section className="text-[#ffffff] bg-primaryBlue flex flex-col items-center text-center py-10 px-4 overflow-hidden">
      <div
        ref={textRef}
        className={textVisible ? "animate-fadeInUp" : "animate-fadeOutDown"}
      >
        <h1 className="mt-2 mb-5 text-2xl font-semibold">Partners & Sponsors</h1>
        <p className="text-lg mb-10 max-w-2xl">
          Step-Up Summit thrives through the support of partners who share our
          vision. Sponsors gain direct engagement with ambitious young leaders,
          access to exhibition opportunities, and significant media visibility.
        </p>
      </div>

      {/* Sliding Logo Carousel */}
      <div className="relative w-48 h-40 mb-6 overflow-hidden">
        {/* Previous image */}
        <img
          key={prevIndex}
          src={images[prevIndex]}
          alt={`Sponsor ${prevIndex + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-contain p-3 bg-white rounded-2xl border shadow-lg transition-transform duration-700 ${
            direction === "next" ? "-translate-x-full" : "translate-x-full"
          }`}
        />
        {/* Active image */}
        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`Sponsor ${activeIndex + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-contain p-3 bg-white rounded-2xl border shadow-lg transition-transform duration-700 ${
            direction === "next" ? "translate-x-0" : "translate-x-0"
          }`}
        />
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
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
