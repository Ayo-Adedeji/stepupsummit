import React from "react";
import StepUPLogo1 from "../assets/StepUPLogo1.png";
import useScrollAnimation from "../components/useScrollAnimation";
import summit from "../assets/summit.mp4";
const AboutSection = () => {
  const [logoRef, logoVisible] = useScrollAnimation();
  const [textRef, textVisible] = useScrollAnimation();

  return (
 <section className="w-[90%] md:w-[85%] mt-20 mb-20 mx-auto">
  <div className="flex flex-col items-center md:flex-row md:gap-12 lg:gap-20">
    {/* Video container */}
    <div
      ref={logoRef}
      className={`w-full md:w-[45%] transition-all ${
        logoVisible ? "animate-slideInLeft" : "animate-slideOutLeft"
      }`}
    >
      <video
        className="w-full h-auto rounded-lg shadow-lg"
        src={summit}
        controls
        autoPlay
        muted
      />
    </div>

    {/* About container */}
    <div
      ref={textRef}
      className={`flex flex-col items-center md:items-start justify-center w-full md:w-[55%] transition-all ${
        textVisible ? "animate-slideInRight" : "animate-slideOutRight"
      }`}
    >
      <h1 className="font-bold text-3xl md:text-4xl mb-5 mt-10 md:mt-0">
        ABOUT SUS
      </h1>
      <p className="font-semibold mb-8 text-center md:text-left">
        If you have ever felt stuck between where you are and where you want
        to be, SUS 2025 is your bridge. In one day, you will gain practical
        skills in leadership and business, test your ideas in a live pitch
        competition, and connect with people who can open doors to new
        opportunities.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a className="border-2 bg-blue-900 hover:bg-blue-600 text-white rounded-lg px-6 py-3 transition duration-300 cursor-pointer">
          Buy Tickets
        </a>
        <a className="border-2 bg-blue-900 hover:bg-blue-600 text-white rounded-lg px-6 py-3 transition duration-300 cursor-pointer">
          Partner
        </a>
      </div>
    </div>
  </div>
</section>

  );
};

export default AboutSection;
