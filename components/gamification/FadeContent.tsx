"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  initialOpacity?: number;
  className?: string;
}

export function FadeContent({
  children,
  blur = false,
  duration = 0.5,
  initialOpacity = 0,
  className = "",
}: FadeContentProps) {
  return (
    <motion.div
      initial={{ opacity: initialOpacity, filter: blur ? "blur(10px)" : "none" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
