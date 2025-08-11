import React from "react";
import StepUPLogo1 from "../assets/StepUPLogo1.png";
import useScrollAnimation from "../components/useScrollAnimation";

const AboutSection = () => {
  const [logoRef, logoVisible] = useScrollAnimation();
  const [textRef, textVisible] = useScrollAnimation();

  return (
    <section className="w-[85%] mt-20 mb-20 mx-auto">
      <div className="flex flex-col items-center lg:flex-row md:flex-row md:gap-20 lg:gap-60">
        {/* Logo container */}
        <div
          ref={logoRef}
          className={`transition-all ${
            logoVisible
              ? "animate-slideInLeft"
              : "animate-slideOutLeft"
          }`}
        >
          <img className="w-80 lg:w-96" src={StepUPLogo1} alt="steuplogo" />
        </div>

        {/* About container */}
        <div
          ref={textRef}
          className={`flex flex-col items-center justify-center md:w-[50%] lg:items-baseline transition-all ${
            textVisible
              ? "animate-slideInRight"
              : "animate-slideOutRight"
          }`}
        >
          <h1 className="font-bold text-3xl mb-5 mt-10">ABOUT SUS</h1>
          <p className="font-semibold mb-8 text-center sm:text-center lg:text-left">
            If you have ever felt stuck between where you are and where you want
            to be, SUS 2025 is your bridge. In one day, you will gain practical
            skills in leadership and business, test your ideas in a live pitch
            competition, and connect with people who can open doors to new
            opportunities.
          </p>
          <div className="space-x-3">
            <a className="border-2 bg-blue-900 hover:bg-blue-600 text-white rounded-lg px-6 py-4 transition duration-300 cursor-pointer">
              Buy Tickets
            </a>
            <a className="border-2 bg-blue-900 hover:bg-blue-600 text-white rounded-lg px-6 py-4 transition duration-300 cursor-pointer">
              Partner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
