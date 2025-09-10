import React from "react";
import speaker from "../assets/speaker.jpg"
import speaker1 from "../assets/speaker1.jpg"
import speaker2 from "../assets/speaker2.jpg"
import speaker3 from "../assets/speaker3.jpg"
import speaker4 from "../assets/speaker4.jpg"
import speaker5 from "../assets/speaker5.jpg"

import useScrollAnimation from "../components/useScrollAnimation";

const Speakers = () => {
  const items = [
    {
      img: speaker,
      title: "PRECIOUS LIJOKA",
      description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: speaker1,
      title: "OlUSHOLA OLALEYE",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: speaker2,
      title: "OCHE WRITES",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: speaker3,
      title: "STEPHEN CAMILERRI",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
     {
      img: speaker4,
      title: "HAOMA WORGWU",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
     {
      img: speaker5,
      title: "IYO PROSPER",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
  ];
  const [textRef, textVisible] = useScrollAnimation();

  return (
    <section className="mb-20">
      <h1
        ref={textRef}
        className={`text-center mt-10 mb-10 text-3xl font-bold ${
          textVisible ? "animate-fadeInUp" : "FadeOutDown"
        }`}
      >
        Meet the Speakers
      </h1>
      {/* <div className=" lg:w-[80%] mx-auto flex justify-between p-2 gap-5 font-semibold lg:text-2xl">
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
      </div> */}

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
              className="border-2 border-accentDarkBlue shadow-xl shadow-gray-500 w-60 h-60  rounded-xl object-cover"
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
