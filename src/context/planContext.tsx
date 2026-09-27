"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// =========================================
// WORKOUT TYPE
// =========================================

export type WorkoutItem = {
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

  // Workout complete status
  isDone?: boolean;
};

// =========================================
// CONTEXT TYPE
// =========================================

type PlanContextType = {
  todayPlan: WorkoutItem[];
  savedPlan: WorkoutItem[];

  addToTodayPlan: (workout: WorkoutItem) => void;
  addToSavedPlan: (workout: WorkoutItem) => void;

  removeFromTodayPlan: (id: number) => void;
  removeFromSavedPlan: (id: number) => void;

  toggleDone: (id: number) => void;

  clearTodayPlan: () => void;
};

// =========================================
// CREATE CONTEXT
// =========================================

const PlanContext = createContext<PlanContextType | undefined>(undefined);

// =========================================
// PROVIDER
// =========================================

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<WorkoutItem[]>([]);
  const [savedPlan, setSavedPlan] = useState<WorkoutItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // =========================================
  // LOAD DATA FROM LOCAL STORAGE
  // =========================================

  useEffect(() => {
    try {
      const todayData = localStorage.getItem("todayPlan");
      const savedData = localStorage.getItem("savedPlan");

      if (todayData) {
        const parsedToday = JSON.parse(todayData);

        if (Array.isArray(parsedToday)) {
          setTodayPlan(parsedToday);
        }
      }

      if (savedData) {
        const parsedSaved = JSON.parse(savedData);

        if (Array.isArray(parsedSaved)) {
          setSavedPlan(parsedSaved);
        }
      }
    } catch (error) {
      console.error("Failed to load plan:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // =========================================
  // SAVE TODAY PLAN
  // =========================================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("todayPlan", JSON.stringify(todayPlan));
  }, [todayPlan, isLoaded]);

  // =========================================
  // SAVE SAVED PLAN
  // =========================================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("savedPlan", JSON.stringify(savedPlan));
  }, [savedPlan, isLoaded]);

  // =========================================
  // ADD TO TODAY PLAN
  // =========================================

  const addToTodayPlan = (workout: WorkoutItem) => {
    setTodayPlan((prev) => {
      const exists = prev.some((item) => item.id === workout.id);

      if (exists) {
        return prev;
      }

      return [
        ...prev,
        {
          ...workout,
          isDone: false,
        },
      ];
    });
  };

  // =========================================
  // ADD TO SAVED PLAN
  // =========================================

  const addToSavedPlan = (workout: WorkoutItem) => {
    setSavedPlan((prev) => {
      const exists = prev.some((item) => item.id === workout.id);

      if (exists) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  // =========================================
  // REMOVE FROM TODAY PLAN
  // =========================================

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================================
  // REMOVE FROM SAVED PLAN
  // =========================================

  const removeFromSavedPlan = (id: number) => {
    setSavedPlan((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================================
  // TOGGLE COMPLETE
  // =========================================

  const toggleDone = (id: number) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item,
      ),
    );
  };

  // =========================================
  // CLEAR ALL TODAY PLAN
  // =========================================

  const clearTodayPlan = () => {
    setTodayPlan([]);
  };

  // =========================================
  // PROVIDER
  // =========================================

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        addToTodayPlan,
        addToSavedPlan,
        removeFromTodayPlan,
        removeFromSavedPlan,
        toggleDone,
        clearTodayPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

// =========================================
// CUSTOM HOOK
// =========================================

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
