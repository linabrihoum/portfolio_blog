"use client";
import { motion } from "framer-motion";

// Fades content up into place the first time it scrolls into view.
// Stagger siblings with delay={index * 0.12}.
export function Reveal({ children, delay = 0, y = 30, duration = 0.6, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
