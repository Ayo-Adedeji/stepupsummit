import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const News = () => {
  return (
    <section>
      <div className="flex flex-col items-center md:flex-row justify-between">
        <div className="hidden md:block  px-6 ">
          <h1 className="text-4xl font-extrabold mb-32 text-accentLightBlue ">#SUS2025</h1>
          <p className="font-bold md:text-sm text-lg ">GO BEYOND THE WEBSITE</p>
          <p className="">Follow our development and <br/> achievements in these links.</p>
          <a href=""></a>
          <a href=""></a>
          <div className="flex gap-1 text-xl text-accentLightBlue">
          <a href=""><FaSquareInstagram /></a>
          <a href=""><FaLinkedin/></a>
          </div>
          
        </div>
        <div className="hidden flex flex-col lg:block lg:ml-40 justify-center ">
          <p className="font-bold">REACH US AT</p>
          <a>hello@gmail.com</a>
        </div>

        <form className="bg-accentLightBlue w-full lg:w-96 ">
          <div className="flex flex-col   p-6 lg:w-96 ">
            <h1 className="text-3xl font-bold mb-5 ">BEYOND A <br/> NEWSLETTER</h1>
            <p className="text-lg mb-2" >Sign in to our newsletter to <br/> know the latest news.</p>
            <input
              className=" border-2 border-[#ffffff] bg-accentLightBlue p-2 rounded-xl outline-none"
              placeholder="Enter your email"
              type="email"
            />
            <button className="border-2 shadow-md shadow-black  mt-5 py-2 rounded-xl bg-white text-accentLightBlue font-semibold hover:bg-accentDarkBlue hover:border-accentDarkBlue hover:text-white transition-all duration-300 ease-in-out">
              SIGN ME UP
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default News;
