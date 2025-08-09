import React from "react";
import StepUPLogo1 from "../assets/StepUPLogo1.png";
const AboutSection = () => {
  return (
    <section className="">
      {/* main container */}
      <div className="flex flex-col items-center  lg:flex-row md:flex-row md:gap-20 lg:w-[85%] lg:gap-60 mx-auto p-10">
        {/* logo container */}
        <div className="">
          <img className="w-80 lg:w-96 "  src={StepUPLogo1} alt="steuplogo" />
        </div>
        {/* About container */}
        <div className="flex flex-col items-center justify-center sm:items-center sm:justify-center md:w-[50%] lg:items-baseline">
          <h1 className="font-bold text-3xl mb-5 mt-10"  >ABOUT SUS</h1>
          <p className="font-semibold mb-8 text-center sm:text-center lg:text-left">
            If you have ever felt stuck between where you are and where you want
            to be, SUS 2025 is your bridge. 
            In one day, you will gain practical
            skills in leadership and business, test your ideas in a live pitch
            competition, and connect with people who can open doors to new
            opportunities.
          </p>
          {/* container for a tag */}
          <div className="space-x-3">
            <a className="border-2 bg-blue-900 hover:cursor-pointer hover:bg-blue-600 text-[#ffffff] rounded-lg px-6 py-4 transition duration-300 ">
              Buy Tickets
            </a>
              <a className="border-2 bg-blue-900 hover:cursor-pointer hover:bg-blue-600 text-[#ffffff] rounded-lg px-6 py-4 transition duration-300 ">
              Partner
            </a>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutSection;
