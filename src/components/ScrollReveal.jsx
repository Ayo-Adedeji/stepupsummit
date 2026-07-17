import React from "react";
import { motion } from "framer-motion";

const ScrollReveal = ({ children, className = "", delay = 0, y = 40 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
