import React, { useEffect, useState } from "react";

const Counter = ({ target, duration, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const incrementTime = 1000 / 60;
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
    <section className="bg-accentDarkBlue text-white py-12">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 text-center">
        
        {/* Stat 1 */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-accentYellowDark text-5xl">
            <Counter target={700} duration={2} suffix="+" />
          </span>
          <p className="text-lg font-semibold max-w-xs">
            Participants: students, founders, and change-makers
          </p>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-accentYellowDark text-5xl">
            <Counter target={10} duration={2} suffix="+" />
          </span>
          <p className="text-lg font-semibold max-w-xs">
            Partner organizations
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
