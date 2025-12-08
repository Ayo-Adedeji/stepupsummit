import React from "react";
import convener from "../assets/convener.jpg"
import speaker1 from "../assets/speaker1.png"
import speaker2 from "../assets/speaker2.jpg"
import speaker3 from "../assets/speaker3.jpg"
import haoma from "../assets/haoma.png"
import speaker5 from "../assets/speaker5.png"
import speaker6 from "../assets/speaker6.png"

import useScrollAnimation from "../components/useScrollAnimation";

const Speakers = () => {
  const items = [
    {
      img: convener,
      title: "PRECIOUS LIJOKA",
      description: "CEO. PRECIOUS CRAFTS.",
    },
    {
      img: speaker1,
      title: "DR. ABIODUN OLUWATOBI",
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
      img: haoma,
      title: "HAOMA WORGWU",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
     {
      img: speaker5,
      title: "TOSIN ADEGOKE",
      // description: "CEO. PRECIOUS CRAFTS.",
    },
     {
      img: speaker6,
      title: "LANRE BASAMTA",
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

     {/* Photos */}
<div
  ref={textRef}
  className={`grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 text-center mt-10 ${
    textVisible ? "animate-fadeInUp" : "animate-fadeOutDown"
  }`}
>
  {items.map((item, index) => (
    <div
      key={index}
      className="flex flex-col lg:w-[80%] mx-auto items-center mt-5"
    >
      {/* Image wrapper */}
      <div     className={`border-2 border-accentDarkBlue shadow-xl shadow-gray-500 mt-5 rounded-xl overflow-hidden flex items-center justify-center ${
          item.title === "PRECIOUS LIJOKA" 
            ? "w-80 h-96" 
            : "w-64 h-80"
        }`}>
        <img
          src={item.img}
          alt={item.title}
          className={`${
            item.img === speaker3
              ? "max-w-full max-h-full" 
              : "w-full h-full object-cover" 
          }`}
        />
      </div>
      <p className="mt-3 sm:text-lg font-semibold">{item.title}</p>
      {item.description && (
        <p className="sm:text-xl sm:font-semibold">{item.description}</p>
      )}
    </div>
  ))}
</div>

    </section>
  );
};

export default Speakers;
