import React from "react";
import useScrollAnimation from "./useScrollAnimation";

const AboutPage = () => {
  const [textRef, textVisible] = useScrollAnimation();
  return (
    <section>
      <div  className="h-[75vh] flex flex-col  justify-center items-center text-center md:w-[80%] lg:w-[75%] mx-auto p-5">
        <h1 ref={textRef} className={`font-bold text-2xl md:text-4xl lg:text-6xl mb-10 ${
          textVisible ? "animate-slideInLeft" : "animate-slideOutRight"
        }`}>About The Summit</h1>
        <p ref={textRef} className={`md:text-xl lg:text-2xl ${textVisible? "animate-slideInRight" : "animate-slideOutLeft"}`}>
          Step-Up Summit is an annual leadership and entrepreneurship conference
          that inspires, equips, and connects young Africans. Since its launch
          in 2024, it has become a leading platform for students, young
          professionals, and entrepreneurs. In 2025, we return to the ICC at the
          University of Ibadan with the theme<span className="font-bold md:text-3xl text-primaryBlue"> "Leading Africa’s Future Through
          AI, Business, and Innovation"</span>. This second edition will welcome more
          than 1,000 participants from Nigeria and beyond.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
