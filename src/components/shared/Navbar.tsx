"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/planContext";

const Navbar = () => {
  const pathname = usePathname();

  const { todayPlan, savedPlan } = usePlan();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-[100] border-b border-[#1d1d20] bg-[#0b0c0f] px-5 py-4">
      <div className="mx-auto flex h-10 max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />

          <span className="text-[14px] font-extrabold tracking-[0.5px] text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          {/* Workouts */}
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-[10px] font-medium transition ${
              isActive("/")
                ? "bg-[#182b0d] text-[#ccff00]"
                : "text-[#85858d] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-[10px] font-medium transition ${
              isActive("/my-plan")
                ? "bg-[#182b0d] text-[#ccff00]"
                : "text-[#85858d] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right-side Counters */}
        <div className="flex items-center gap-5">
          {/* Plan */}
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-[10px] text-[#b5b5bc]">Plan</span>

            <span className="flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#ccff00] px-1 text-[9px] font-bold text-black">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link href="/my-plan?tab=saved" className="flex items-center gap-2">
            <span className="text-[10px] text-[#b5b5bc]">Saved</span>

            <span className="flex h-[14px] min-w-[14px] items-center justify-center rounded-full border border-[#393940] px-1 text-[9px] text-[#85858d]">
              {savedPlan.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
