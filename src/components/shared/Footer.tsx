import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0E] border-t border-[#1E1E1E] py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-sans">
      {/* Left side - Logo / Title */}
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        {/* Dumbbell Icon */}
        <svg
          className="w-4 h-4 text-[#A3E635]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6.5 6.5 11 11" />
          <path d="m21 21-1-1" />
          <path d="m3 3 1 1" />
          <path d="m18 22 4-4" />
          <path d="m2 6 4-4" />
          <path d="m3 10 7-7" />
          <path d="m14 21 7-7" />
        </svg>
        <span className="font-extrabold tracking-wider text-white uppercase">
          FITLOG
        </span>
      </div>

      {/* Right side - Copyright notice */}
      <div className="text-center md:text-right">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </div>
    </footer>
  );
}
