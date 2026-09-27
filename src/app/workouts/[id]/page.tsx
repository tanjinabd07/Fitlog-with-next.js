"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlan } from "@/context/planContext";
import { toast } from "react-toastify";

// =========================================
// WORKOUT TYPE
// =========================================

type Workout = {
  id: number;
  name: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  image: string;
  description: string;
  instructions: string[];
};

// =========================================
// PROPS TYPE
// =========================================

type WorkoutDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

// =========================================
// COMPONENT
// =========================================

export default function WorkoutDetails({ params }: WorkoutDetailsProps) {
  const { id } = use(params);

  const router = useRouter();

  // =========================================
  // PLAN CONTEXT
  // =========================================

  const { todayPlan, savedPlan, addToTodayPlan, addToSavedPlan } = usePlan();

  // =========================================
  // STATES
  // =========================================

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH WORKOUT DETAILS
  // =========================================

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Failed to fetch workout details:", error);

        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [id]);

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2a2b30] border-t-[#c8f31d]" />

          <p className="text-sm text-[#85858d]">Loading workout details...</p>
        </div>
      </main>
    );
  }

  // =========================================
  // WORKOUT NOT FOUND
  // =========================================

  if (!workout) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0c0f] text-white">
        <h1 className="text-2xl font-bold">Workout not found!</h1>

        <p className="text-[#85858d]">
          The workout you are looking for does not exist.
        </p>

        <button
          onClick={() => router.back()}
          className="rounded-lg bg-[#c8f31d] px-5 py-2 font-semibold text-black transition hover:bg-[#b2da13]"
        >
          Go Back
        </button>
      </main>
    );
  }

  // =========================================
  // ADD TO TODAY'S PLAN
  // =========================================

  const handleAddToTodayPlan = () => {
    // Check duplicate
    const alreadyExists = todayPlan.some((item) => item.id === workout.id);

    if (alreadyExists) {
      toast.info("This workout is already in today's plan.");

      return;
    }

    // Maximum 5 workouts
    if (todayPlan.length >= 5) {
      toast.warning("Today's plan can contain a maximum of 5 workouts.");

      return;
    }

    // Add workout
    addToTodayPlan(workout);

    // Success message
    toast.success("Added to today's plan!");
  };

  // =========================================
  // SAVE FOR LATER
  // =========================================

  const handleSaveForLater = () => {
    // Check duplicate
    const alreadySaved = savedPlan.some((item) => item.id === workout.id);

    if (alreadySaved) {
      toast.info("This workout is already saved.");

      return;
    }

    // Add to saved
    addToSavedPlan(workout);

    // Success message
    toast.success("Workout saved for later!");
  };

  // =========================================
  // UI
  // =========================================

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-5 py-10 text-white md:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
        {/* =================================
            LEFT SIDE - IMAGE
        ================================= */}

        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border border-[#25262b] md:h-[480px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* =================================
            RIGHT SIDE - DETAILS
        ================================= */}

        <div className="flex flex-col">
          {/* Workout Name */}

          <h1 className="text-3xl font-black uppercase tracking-wide text-white md:text-4xl">
            {workout.name}
          </h1>

          {/* Description */}

          <p className="mt-3 text-sm leading-relaxed text-[#85858d]">
            {workout.description}
          </p>

          {/* =================================
              KEY STATS
          ================================= */}

          <div className="mt-8 space-y-4 border-t border-[#25262b] pt-6">
            {/* Sets */}

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#85858d]">
                SETS
              </span>

              <span className="text-base font-bold text-white">
                {workout.sets}
              </span>
            </div>

            {/* Reps */}

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#85858d]">
                REPS
              </span>

              <span className="text-base font-bold text-white">
                {workout.reps}
              </span>
            </div>

            {/* Duration */}

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#85858d]">
                DURATION
              </span>

              <span className="text-base font-bold text-white">
                {workout.duration} min
              </span>
            </div>

            {/* Calories */}

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#85858d]">
                CALORIES
              </span>

              <span className="text-base font-bold text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            {/* Rating */}

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#85858d]">
                RATING
              </span>

              <span className="text-base font-bold text-white">
                ⭐ {workout.rating}
              </span>
            </div>
          </div>

          {/* =================================
              INSTRUCTIONS
          ================================= */}

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 inline-block rounded bg-[#1e2029] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h3>

              <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-[#a1a1aa]">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* =================================
              ACTION BUTTONS
          ================================= */}

          <div className="mt-8 flex flex-col gap-4 pt-4 sm:flex-row">
            {/* ADD TO TODAY'S PLAN */}

            <button
              onClick={handleAddToTodayPlan}
              className="flex-1 rounded-lg bg-[#c8f31d] px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-[#b2da13]"
            >
              Add to Today&apos;s Plan
            </button>

            {/* SAVE FOR LATER */}

            <button
              onClick={handleSaveForLater}
              className="flex-1 rounded-lg border border-[#3f4046] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#1a1b20]"
            >
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
