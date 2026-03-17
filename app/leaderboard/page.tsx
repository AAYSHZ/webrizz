"use client";

import { useState } from "react";
import { FadeContent } from "@/components/gamification/FadeContent";
import { Trophy, Code2, Users, Star, BrainCircuit, Monitor, ShieldAlert } from "lucide-react";
import { CountUp } from "@/components/gamification/CountUp";

// Mock data (would come from Supabase in real app)
const TOP_CREATORS = [
  { id: 1, name: "Aayush_dev", handle: "@aayush", xp: 45200, level: 24, badge: "Architect", avatar: "A" },
  { id: 2, name: "Sarah Codes", handle: "@sarahc", xp: 38100, level: 19, badge: "Debugger", avatar: "S" },
  { id: 3, name: "Algo_Master", handle: "@almomast", xp: 32050, level: 17, badge: "Debugger", avatar: "AM" },
];

const PROBLEM_SOLVERS = [
  { id: 4, name: "DSAGuru", handle: "@dsag", score: 8400, skill: "DSA", avatar: "D" },
  { id: 5, name: "BinaryTreeHacker", handle: "@bth", score: 7200, skill: "DSA", avatar: "B" },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"creators" | "solvers" | "helpful" | "rising">("creators");

  const tabs = [
    { id: "creators", label: "Top Creator", icon: Trophy },
    { id: "solvers", label: "Top Problem Solver", icon: Code2 },
    { id: "helpful", label: "Most Helpful", icon: Users },
    { id: "rising", label: "Rising Star", icon: Star },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <FadeContent duration={0.6}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Community Leaderboard
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the most active creators and brilliant developers on CodeReels. Rank up by sharing engaging content and helping others.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-zinc-900 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
            {activeTab === "creators" && (
              <FadeContent duration={0.4} initialOpacity={0}>
                <div className="space-y-4">
                  {TOP_CREATORS.map((user, index) => (
                    <div 
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 text-xl font-bold text-slate-400">
                          #{index + 1}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            {user.name}
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-600 font-semibold tracking-wider uppercase">
                              Lvl {user.level} {user.badge}
                            </span>
                          </h3>
                          <p className="text-sm text-slate-500">{user.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-zinc-900">
                          <CountUp end={user.xp} /> <span className="text-sm text-slate-500 font-medium">XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeContent>
            )}

            {activeTab === "solvers" && (
              <FadeContent duration={0.4} initialOpacity={0}>
                 <div className="space-y-4">
                  {PROBLEM_SOLVERS.map((user, index) => (
                    <div 
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 text-xl font-bold text-emerald-400">
                          #{index + 1}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            {user.name}
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[10px] text-emerald-700 font-bold tracking-wider uppercase flex items-center gap-1">
                              <BrainCircuit className="w-3 h-3" /> {user.skill}
                            </span>
                          </h3>
                          <p className="text-sm text-slate-500">{user.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">
                          <CountUp end={user.score} /> <span className="text-sm text-emerald-600/70 font-medium">pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeContent>
            )}

            {(activeTab === "helpful" || activeTab === "rising") && (
              <FadeContent duration={0.4} initialOpacity={0}>
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Check back soon!</h3>
                  <p className="text-slate-500 max-w-sm">We are gathering enough data from the community to compute these rankings.</p>
                </div>
              </FadeContent>
            )}
          </div>
        </div>
      </FadeContent>
    </div>
  );
}
