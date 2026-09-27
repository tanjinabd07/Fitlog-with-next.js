"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { usePlan } from "@/context/planContext";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedPlan,
    removeFromTodayPlan,
    removeFromSavedPlan,
    toggleDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const [sortBy, setSortBy] = useState<"duration" | "calories">("duration");

  // =========================================
  // CURRENT TAB DATA
  // =========================================

  const currentItems = activeTab === "today" ? todayPlan : savedPlan;

  // =========================================
  // TODAY'S STATS
  // =========================================

  const totalExercises = todayPlan.length;

  const totalMinutes = todayPlan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  // =========================================
  // SORT
  // =========================================

  const sortedItems = [...currentItems].sort((a, b) => {
    if (sortBy === "duration") {
      return b.duration - a.duration;
    }

    return b.caloriesBurned - a.caloriesBurned;
  });

  // =========================================
  // REMOVE
  // =========================================

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromTodayPlan(id);
    } else {
      removeFromSavedPlan(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold tracking-wider mb-1">MY PLAN</h1>

        <p className="text-xs text-gray-400 mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* =========================================
            STATS
        ========================================= */}

        <div className="grid grid-cols-3 gap-4 bg-[#18181c] border border-gray-800 rounded-xl p-5 mb-8 text-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Exercises</p>

            <p className="text-3xl font-extrabold text-lime-400">
              {totalExercises}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Minutes</p>

            <p className="text-3xl font-extrabold">{totalMinutes}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Calories</p>

            <p className="text-3xl font-extrabold">{totalCalories}</p>
          </div>
        </div>

        {/* =========================================
            TABS + SORT
        ========================================= */}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Tabs */}

          <div className="flex bg-[#18181c] p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === "today"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s workouts
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === "saved"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort */}

          {sortedItems.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Sort By</span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "duration" | "calories")
                }
                className="bg-[#18181c] text-white border border-gray-800 rounded px-2 py-1 outline-none focus:border-lime-400"
              >
                <option value="duration">Duration</option>

                <option value="calories">Calories</option>
              </select>
            </div>
          )}
        </div>

        {/* =========================================
            EMPTY STATE
        ========================================= */}

        {sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#18181c] border border-gray-800 rounded-xl text-center">
            <h2 className="text-lg font-bold tracking-wide mb-2 text-gray-200">
              NOTHING HERE YET
            </h2>

            <p className="text-xs text-gray-400 mb-6">
              Browse workouts and add a few to get today moving.
            </p>

            <Link
              href="/workouts"
              className="bg-lime-400 text-black px-6 py-2.5 rounded-md font-bold text-xs hover:bg-lime-500 transition"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* =========================================
             WORKOUT LIST
          ========================================= */

          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between bg-[#18181c] border border-gray-800 rounded-xl p-4 transition ${
                  item.isDone ? "opacity-50" : ""
                }`}
              >
                {/* LEFT */}

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-bold text-sm text-white ${
                        item.isDone ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-400 mb-2">
                      {item.equipment || item.muscleGroups?.[0] || "General"}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span>⏱ {item.duration} min</span>

                      <span>🔥 {item.caloriesBurned} kcal</span>

                      <span className="text-amber-400">★ {item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT ACTIONS */}

                <div className="flex items-center gap-3">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="text-xs text-gray-400 hover:text-white underline underline-offset-2"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done only for Today */}

                  {activeTab === "today" && (
                    <button
                      onClick={() => toggleDone(item.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                        item.isDone
                          ? "bg-gray-700 text-gray-300"
                          : "bg-lime-400 text-black hover:bg-lime-500"
                      }`}
                    >
                      ✓ {item.isDone ? "Completed" : "Mark as Done"}
                    </button>
                  )}

                  {/* Remove */}

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-500 hover:text-red-400 p-1 text-base transition"
                    title="Remove workout"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
