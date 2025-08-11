import React from "react";
import Precious from "../assets/Precious.jpg";
import useScrollAnimation from "../components/useScrollAnimation";

const Speakers = () => {
  const items = [
    {
      img: Precious,
      title: "PRECIOUS LIJOKA",
      description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: Precious,
      title: "PRECIOUS LIJOKA",
      description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: Precious,
      title: "PRECIOUS LIJOKA",
      description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: Precious,
      title: "PRECIOUS LIJOKA",
      description: "CEO. PRECIOUS CRAFTS.",
    },
  ];
  const [textRef, textVisible] = useScrollAnimation();

  return (
    <section>
      <h1
        ref={textRef}
        className={`text-center mt-10 mb-10 text-3xl font-bold ${
          textVisible ? "animate-fadeInUp" : "FadeOutDown"
        }`}
      >
        Meet the Speakers
      </h1>
      <div className=" lg:w-[80%] mx-auto flex justify-between p-2 gap-5 font-semibold lg:text-2xl">
        <p
          ref={textRef}
          className={
            textVisible ? "animate-slideInLeft" : "animate-slideOutRight"
          }
        >
          Trailblazing entrepreneurs
        </p>
        <p   ref={textRef}
          className={
            textVisible ? "animate-fadeInUp" : "animate-fadeOutDown"
          }>Change-makers who have built from the ground up</p>
        <p
          ref={textRef}
          className={
            textVisible ? "animate-slideInRight" : "animate-slideOutLeft"
          }
        >
          Influential thought leaders
        </p>
      </div>

      {/* Photos */}
      <div ref={textRef} className= {`grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 text-center  mt-10 ${
        textVisible ? "animate-fadeInUp" : "animate-fadeOutDown"
      }` }>
        {items.map((item, index) => (
          <div
            className="  flex flex-col lg:w-[80%] mx-auto items-center mt-5"
            key={index}
          >
            <img
              src={item.img}
              alt={item.title}
              className="border-4 border-accentDarkBlue shadow-xl shadow-gray-500 w-60 h-60  rounded-full object-cover"
            />
            <p className="mt-3 mb-3 sm:text-lg sm:font-semibold">
              {item.title}
            </p>
            <p className="sm:text-2xl sm:font-semibold">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Speakers;
