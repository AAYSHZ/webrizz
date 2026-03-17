"use client";

import { useEffect, useState } from "react";
import CountUpReact from "react-countup";

interface CountUpProps {
  start?: number;
  end: number;
  duration?: number;
  separator?: string;
  decimals?: number;
  decimal?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  start = 0,
  end,
  duration = 2,
  separator = ",",
  decimals = 0,
  decimal = ".",
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>{prefix}{start}{suffix}</span>;
  }

  return (
    <span className={className}>
      <CountUpReact
        start={start}
        end={end}
        duration={duration}
        separator={separator}
        decimals={decimals}
        decimal={decimal}
        prefix={prefix}
        suffix={suffix}
        useEasing={true}
      />
    </span>
  );
}
