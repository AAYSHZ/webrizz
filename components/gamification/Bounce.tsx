"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface BounceProps {
  children: ReactNode;
  triggerConfetti?: boolean;
  className?: string;
}

export function Bounce({ children, triggerConfetti = false, className = "" }: BounceProps) {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (triggerConfetti && !hasTriggered) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#eab308', '#ef4444']
      });
      setHasTriggered(true);
    }
  }, [triggerConfetti, hasTriggered]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
