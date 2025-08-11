import React from "react";
import img4 from "../assets/img4.jpg";
import useScrollAnimation from "../components/useScrollAnimation";
const Seats = () => {
   const [textRef, textVisible] = useScrollAnimation();
  return (
    <section className=" text-[#ffffff]">
        <div className=" items-center text-center overflow-hidden "
        style={{ backgroundImage: `url(${img4})` }}
        >
        <h1 ref={textRef} className= {`mt-10 mb-8 font-semibold text-2xl ${
          textVisible ? "animate-slideInLeft" : "animate-slideOutRight"
        }`}>Seats are Limited</h1>
      <p ref={textRef} className={`font-semibold ${  textVisible ? "animate-slideInRight" : "animate-slideOutLeft"}`}>
        Join 700+ aspiring leaders before registration closes on [Deadline
        Date]. 
      </p>
      <p ref={textRef} className={`font-semibold mb-8 mt-3 ${  textVisible ? "animate-slideInLeft" : "animate-slideOutRight"
        }`}>Build connections that can lead to your next big collaboration or
        career breakthrough.</p>
        <div className="mb-14">
        <a className=" text-[#ffff]  text-lg border py-4 px-9 rounded-lg bg-accentYellow hover:cursor-pointer hover:bg-accentYellowDark transition-all duration-300 ease-in-out">Buy Tickets</a>
        </div>
        </div>   
    </section>
  );
};

export default Seats;
