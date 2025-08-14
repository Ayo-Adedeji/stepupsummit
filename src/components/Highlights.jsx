import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import summit from "../assets/summit.mp4";

const videos = [summit, summit, summit, summit, summit, summit];

const Highlights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState(
    window.innerWidth >= 1024 ? "lg" :
    window.innerWidth >= 768 ? "md" : "sm"
  );

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setScreenSize("lg");
      else if (window.innerWidth >= 768) setScreenSize("md");
      else setScreenSize("sm");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Calculate transform based on breakpoint
  const getTransform = () => {
    if (screenSize === "lg") {
      return `translateX(calc(-${activeIndex * 50}% + 25%))`; // large peek ~50%
    }
    if (screenSize === "md") {
      return `translateX(calc(-${activeIndex * 100}% + 10%))`; // medium peek ~10%
    }
    return `translateX(-${activeIndex * 100}%)`; // small: full width
  };

  // Width class based on breakpoint
  const getWidthClass = () => {
    if (screenSize === "lg") return "w-1/2";
    if (screenSize === "md") return "w-full";
    return "w-full";
  };

  return (
    <section className="text-center bg-accentDarkBlue p-10">
      <h1 className="text-2xl text-[#ffffff] font-semibold mb-4">Event Highlights</h1>

      {/* Carousel */}
      <div
        {...swipeHandlers}
        className="relative w-full max-w-6xl h-80 mx-auto overflow-hidden"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: getTransform() }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-2 ${getWidthClass()}`}
              style={{ scrollSnapAlign: "center" }}
            >
              <video
                controls
                src={video}
                onClick={() => setActiveIndex(index)}
                className={`w-full h-80 object-cover cursor-pointer transition-transform duration-300 ${
                  activeIndex === index
                    ? "scale-110 shadow-xl z-10"
                    : "scale-90 opacity-70"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Nav Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden md:block"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hidden md:block"
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center mt-4">
        {videos.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              activeIndex === index
                ? "bg-white scale-125"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Highlights;
