"use client";
"use client";

import { useState } from "react";
import { usePlan } from "@/context/planContext";
import Image from "next/image";
import Link from "next/link";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("today"); // 'today' or 'saved'
  const { todayPlan, savedPlan, removeFromTodayPlan, toggleDone } = usePlan();

  const currentList = activeTab === "today" ? todayPlan : savedPlan;

  // Header Calculations
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, item) => acc + (item.duration || 0),
    0,
  );
  const totalCalories = todayPlan.reduce(
    (acc, item) => acc + (item.caloriesBurned || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-[#0b0c0f] p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold uppercase">My Plan</h1>
        <p className="text-zinc-500 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Stats Summary Card */}
        <div className="grid grid-cols-3 gap-4 bg-[#14151a] p-6 rounded-2xl border border-[#25262b]">
          <div>
            <span className="text-xs text-zinc-400 block">Exercises</span>
            <span className="text-3xl font-extrabold text-[#ccff00]">
              {totalExercises}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Minutes</span>
            <span className="text-3xl font-extrabold">{totalMinutes}</span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Calories</span>
            <span className="text-3xl font-extrabold">{totalCalories}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "today"
                ? "bg-[#1d1e24] text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Today&apos;s workouts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "saved"
                ? "bg-[#1d1e24] text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Workout Cards List */}
        <div className="space-y-4">
          {currentList.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">
              No exercises added yet.
            </p>
          ) : (
            currentList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#14151a] p-4 rounded-2xl border border-[#25262b]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#25262b]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      ⏱ {item.duration} min • 🔥 {item.caloriesBurned} kcal
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="text-xs text-zinc-400 hover:text-white transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => toggleDone(item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        item.isDone
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                      }`}
                    >
                      {item.isDone ? "Done ✓" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => removeFromTodayPlan(item.id)}
                    className="text-zinc-500 hover:text-red-500 text-sm px-2 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
