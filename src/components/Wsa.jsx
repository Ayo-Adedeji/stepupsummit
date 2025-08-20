import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import useScrollAnimation from "../components/useScrollAnimation";

const Wsa = () => {
    const [textRef, textVisible] = useScrollAnimation();
  return (
    <section id="join" className="bg-accentDarkBlue">
        <div className="p-2 w-full flex flex-col md:flex-row lg:flex-row gap-5 lg:gap-20 lg:p-14 text-[#ffff] mx-auto">
      <div ref={textRef} className={`p-1 border border-accentLightBlue rounded-lg md:w-1/2 ${
        textVisible
              ? "animate-slideInLeft"
              : "animate-slideOutRight"
      }`}  >
        <h1 className="font-bold text-center sm:text-3xl text-2xl md:text-4xl mt-5 mb-10">Who Should Attend?</h1>
        <p className="font-semibold text-center mb-6 sm:text-lg md:text-lg">
          Step-Up Summit 2025 is for <span className="text-2xl text-accentYellow">students </span> 
  ready to lead, <span className="text-2xl text-accentYellow">entrepreneurs </span>
          building their first venture, <span className="text-2xl text-accentYellow">young professionals</span> seeking new
          directions, and <span className="text-2xl text-accentYellow">community leaders </span> who want to make a greater impact.
          If you are <span className="text-2xl text-accentYellowDark">ready </span> to <span className="text-2xl text-accentYellowDark">learn </span>, <span className="text-2xl text-accentYellowDark ">connect </span>, and <span className="text-2xl text-accentYellowDark">act</span>, this is your room.
        </p>
      </div>

       <div ref={textRef} className={`p-1 rounded-lg border border-accentLightBlue md:w-1/2 ${
 textVisible
       ? "animate-slideInRight"
       : "animate-slideOutLeft"
       }`} 
       
       >
        <h1 className="font-bold text-2xl text-center sm:text-3xl md:text-4xl mt-5 mb-10">Why you should join.</h1>
        <ul className="flex flex-col items-center sm:text-lg font-semibold mb-6  md:pl-6 lg:items-start  lg:pl-24 ">
        <li className="flex md:items-start lg:items-start gap-2 "> <IoCheckmarkDoneSharp className="text-accentYellow mt-1"/>Gain strategies you can put into action immediately.</li>
        <li className="flex lg:items-start gap-2  "> <IoCheckmarkDoneSharp className="text-accentYellow  mt-1" />  Meet potential collaborators, mentors, and investors</li>
        <li className="flex lg:items-start gap-2  "> <IoCheckmarkDoneSharp className="text-accentYellow mt-1" />   Pitch your ideas and receive valuable feedback.</li>
        <li className="flex lg:items-start gap-2 "> <IoCheckmarkDoneSharp className="text-accentYellow mt-1" />  Leave with a clear plan for your next step.</li>
        </ul>
      </div>
      </div>
    </section>
  );
};

export default Wsa;
