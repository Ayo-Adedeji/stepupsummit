import React, { useEffect, useState } from "react";
import imag2 from "../assets/imag2.jpg";
import imag3 from "../assets/imag3.jpg";
import imag4 from "../assets/imag4.jpg";
import imag5 from "../assets/imag5.jpg";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaMapLocation } from "react-icons/fa6";

const images = [imag2, imag3, imag4, imag5];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const changeSlide = (delta) => {
    setCurrent((prev) => (prev + images.length + delta) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Slides */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Hero text content */}
      <div className="z-20 absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="lg:text-5xl text-lg md:text-2xl font-bold mb-5">
          One Day, One Room, Unlimited Possibilities.
        </p>
        <p className="md:text-2xl font-semibold sm:w-[80%] md:w-[80%] lg:w-[60%] mx-auto mb-5">
          Step-Up Summit 2025 brings together ideas, people, and opportunities
          that can transform your path in leadership and entrepreneurship.
        </p>
        <p className="md:text-2xl lg:space-x-20 flex items-center gap-1 text-lg font-bold sm:font-semibold mb-12">
          <span className="text-accentLightBlue"><BsCalendar2DateFill /></span>  26th of August.  <span className="text-accentLightBlue"><FaMapLocation /></span> Ibadan, Oyo State
        </p>
        <div className="flex justify-center gap-1 sm:gap-7">
          <a
            className="border border-accentYellow px-6 py-3 sm:px-8 sm:py-4 bg-accentYellow rounded-xl hover:bg-accentYellowDark transition-all duration-300 ease-in-out text-xl font-semibold"
            href=""
          >
            Buy Tickets
          </a>
          <a
            className="border border-accentYellow px-6 py-3 sm:px-8 sm:py-4 bg-accentYellow rounded-xl hover:bg-accentYellowDark transition-all duration-300 ease-in-out text-xl font-semibold"
            href=""
          >
            Partner
          </a>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => changeSlide(-1)}
        className="z-20 absolute left-5 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
      >
        ‹
      </button>
      <button
        onClick={() => changeSlide(1)}
        className="z-20 absolute right-5 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
      >
        ›
      </button>
    </div>
  );
};

export default HeroSection;
