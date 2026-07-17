import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*<>/";

const ScrambleText = ({ text, className = "", as: Tag = "h1", duration = 1500 }) => {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? text : "");
  const frame = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    const length = text.length;
    const totalFrames = Math.round((duration / 1000) * 60);
    const perChar = totalFrames / Math.max(length, 1);

    const tick = () => {
      frame.current += 1;
      let result = "";
      let resolved = true;

      for (let i = 0; i < length; i++) {
        const ch = text[i];
        if (ch === " ") {
          result += " ";
          continue;
        }
        if (frame.current >= (i + 1) * perChar) {
          result += ch;
        } else {
          resolved = false;
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(result);
      if (!resolved) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, duration, reduce]);

  return <Tag className={className}>{display}</Tag>;
};

export default ScrambleText;
