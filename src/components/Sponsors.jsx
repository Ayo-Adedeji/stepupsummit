import React from "react";
import StepUPLogo from "../assets/StepUPLogo.png";
import StepUPLogo1 from "../assets/StepUPLogo1.png";

const images = [StepUPLogo, StepUPLogo1];

const Sponsors = () => {
  return (
    <section className=" text-[#ffffff] bg-accentLightBlue flex flex-col items-center text-center">
      <div>
        <h1 className="mt-10 mb-5 text-2xl font-semibold">Partners & Sponsors</h1>
        <p  className="text-lg animate-slide mb-10 ">
          We thank the organizations whose support makes SUS 2025 possible.
          Their commitment helps inspire and equip the next generation of
          leaders.
        </p>
      </div>

      <div className="flex gap-10 mb-16 ">
        {images.map((logo, index) => (
          <img className="border border-3 rounded-2xl w-72 h-60 p-3"  key={index} src={logo} alt={`Sponsor ${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
