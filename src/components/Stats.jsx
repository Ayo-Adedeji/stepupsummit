import React, { useEffect, useState } from "react";


const Counter = ({ target, duration, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const incrementTime = 1000 / 60; //
    const totalSteps = Math.round((duration * 1000) / incrementTime);
    let currentStep = 0;

    const step = () => {
      currentStep++;
      const progress = Math.min(currentStep / totalSteps, 1);
      const value = Math.floor(progress * end);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section>
      <div className="flex flex-col gap-10 md:flex-row justify-center items-center bg-accentDarkBlue text-[#ffffff] md:gap-40 py-10">
        
        <div>
          <p className="flex flex-col items-center text-lg font-semibold text-center gap-2">
            <span className="font-bold text-accentYellowDark text-5xl">
              <Counter target={700} duration={2} suffix="+" />
            </span>
            participants: students, founders, and change-makers
          </p>
        </div>

        <div>
          <p className="flex flex-col text-lg items-center font-semibold text-center gap-2">
            <span className="font-bold text-accentYellowDark text-5xl">
              <Counter target={10} duration={2} suffix="+" />
            </span>
            partner organizations
          </p>
        </div>

      </div>
    </section>
  );
};

export default Stats;
