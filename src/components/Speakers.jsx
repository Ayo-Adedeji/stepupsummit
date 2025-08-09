import React from "react";
import StepUPLogo from "../assets/StepUPLogo.png";

const Speakers = () => {

    const items = [
    {
      img: StepUPLogo,
      title: "Lorem, ipsum dolor.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      img: StepUPLogo,
      title: "Lorem, ipsum dolor.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      img: StepUPLogo,
      title: "Lorem, ipsum dolor.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      img: StepUPLogo,
      title: "Lorem, ipsum dolor.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    }
  ];

  return (
    <section>
      <h1 className="text-center mt-10 mb-10 text-3xl font-bold">Meet the Speakers</h1>
      <div className="flex justify-between p-2 gap-5 font-semibold lg:text-3xl">
        <p>Trailblazing entrepreneurs</p>
        <p>Change-makers who have built from the ground up</p>
        <p>Influential thought leaders</p>
      </div>

      {/* Photos */}
       <div className=" grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-5 text-center  mt-10 ">
      {items.map((item, index) => (
        <div className="flex flex-col items-center mt-5" key={index}>
          <img src={item.img} alt={item.title} className="border border-accentDarkBlue shadow-lg w-60 h-60  rounded-full object-cover" />
          <p className="mt-3 mb-3">{item.title}</p>
          <p className="">{item.description}</p>
        </div>
      ))}
    </div>
    </section>
  );
};

export default Speakers;
