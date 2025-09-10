import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex  justify-center gap-7 lg:gap-56 md:gap-36 sm:gap-20  bg-purple-900 text-white py-6">
      <div className="text-center">
        <h2 className="text-5xl font-bold">{timeLeft.days}</h2>
        <p className="uppercase text-lg mt-2">Days</p>
      </div>
      <div className="text-center">
        <h2 className="text-5xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</h2>
        <p className="uppercase text-lg mt-2">Hours</p>
      </div>
      <div className="text-center">
        <h2 className="text-5xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</h2>
        <p className="uppercase text-lg mt-2">Minutes</p>
      </div>
      <div className="text-center">
        <h2 className="text-5xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</h2>
        <p className="uppercase text-lg mt-2">Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
