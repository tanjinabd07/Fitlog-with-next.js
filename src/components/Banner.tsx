import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#0b0c0f] px-5 py-8 md:px-8 lg:px-12">
      {/* Main Banner Card */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between overflow-hidden rounded-xl border border-[#25262b] bg-[#17181d] px-6 py-10 md:px-10 lg:flex-row lg:px-14 lg:py-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          {/* Small Subtitle */}
          <p className="mb-4 text-[10px] font-bold tracking-[1px] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          {/* Main Heading */}
          <h1 className="max-w-[550px] text-4xl font-black uppercase leading-[1.05] tracking-[-1px] text-white md:text-5xl lg:text-[42px]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[440px] text-sm leading-6 text-[#85858d]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          {/* CTA Button */}
          <Link
            href="/workouts"
            className="mt-6 inline-flex items-center rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-extrabold uppercase tracking-wide text-black transition hover:bg-[#b8e600]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Image */}
        <div className="mt-10 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
          <Image
            src={heroImage}
            alt="Person doing workout"
            width={450}
            height={400}
            className="h-auto max-h-[350px] w-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
