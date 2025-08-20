import React from "react";
import imag2 from "../assets/imag2.jpg";

const TicketPage = () => {
  return (
    <section>
      <div
        className="h-[80vh] bg-cover text-center flex flex-col justify-center text-[#ffffff] "
        style={{ backgroundImage: `url(${imag2})` }}
      >
        <h1 className="text-5xl font-semibold">Registration & Sponsorship</h1>
        <p className="font-semibold">Step-Up Summit 2025</p>
       <p className="text-lg mb-10 max-w-2xl mx-auto mt-16" > Be part of a transformative gathering where ideas meet opportunity.
        Whether you are a student, young professional, entrepreneur, or forward
        thinker, the Step-Up Summit gives you the platform to rise above limits
        and take the next step in your growth.</p>
      </div>
    </section>
  );
};

export default TicketPage;
