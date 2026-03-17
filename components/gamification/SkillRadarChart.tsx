"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { FadeContent } from "./FadeContent";

interface SkillPoints {
  DSA: number;
  WebDev: number;
  "AI-ML": number;
  Hardware: number;
}

interface SkillRadarChartProps {
  skills: SkillPoints;
  className?: string;
}

export function SkillRadarChart({ skills, className = "" }: SkillRadarChartProps) {
  // Map data to Recharts format
  const data = [
    { subject: 'DSA', A: skills.DSA, fullMark: Math.max(100, skills.DSA * 1.2) },
    { subject: 'WebDev', A: skills.WebDev, fullMark: Math.max(100, skills.WebDev * 1.2) },
    { subject: 'AI/ML', A: skills["AI-ML"], fullMark: Math.max(100, skills["AI-ML"] * 1.2) },
    { subject: 'Hardware', A: skills.Hardware, fullMark: Math.max(100, skills.Hardware * 1.2) },
  ];

  return (
    <div className={`w-full h-[300px] flex items-center justify-center ${className}`}>
      <FadeContent duration={0.8} initialOpacity={0}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3"/>
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 14, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 10']} axisLine={false} tick={false} />
            <Radar
              name="Skill Level"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.5}
              isAnimationActive={true}
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </FadeContent>
    </div>
  );
}
