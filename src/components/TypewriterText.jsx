import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const RevealText = ({
  text,
  className = "",
  as: Tag = "h1",
  accent = "",
  accentClass = "",
}) => {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      <span className="inline">
        {words.map((word, i) => {
          const isAccent = word === accent;
          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              style={{ verticalAlign: "bottom" }}
              aria-hidden="true"
            >
              <motion.span
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + i * 0.09,
                }}
                className="inline-block"
              >
                {isAccent ? (
                  <span className={accentClass}>{word}</span>
                ) : (
                  word
                )}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
};

export default RevealText;
