import React, { useEffect, useState, useRef } from "react";

const Counter = ({ target, duration, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // trigger when 50% visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = parseInt(target);
    const incrementTime = 1000 / 60; // ~60 FPS
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
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
