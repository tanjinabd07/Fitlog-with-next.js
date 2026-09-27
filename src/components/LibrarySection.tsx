import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

// API Data Type Definition
export interface Workout {
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
}

// Server-side Fetch function
async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : data.workouts || [];
}

export default async function LibrarySection() {
  const workouts = await getWorkouts();

  return (
    <section className="bg-[#0b0c0f] px-5 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold tracking-wider text-white uppercase md:text-2xl">
            THE LIBRARY
          </h2>

          <p className="mt-1 text-xs text-[#85858d]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#25262b] bg-[#17181d] transition-all hover:border-[#393940] hover:shadow-lg"
            >
              {/* Workout Image */}
              <div className="relative h-48 w-full overflow-hidden bg-[#1f2026]">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Main Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  {/* Category Pills */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {workout.muscleGroups?.map((group, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-[#1e2f0d] px-2.5 py-0.5 text-[10px] font-bold text-[#ccff00] uppercase"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name */}
                  <h3 className="text-sm font-extrabold tracking-wide text-white uppercase transition-colors group-hover:text-[#ccff00]">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-1 text-xs text-[#85858d]">
                    {workout.equipment}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="mt-6 flex items-center justify-between border-t border-[#25262b] pt-4 text-xs text-[#85858d]">
                  {/* Duration */}
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#85858d]" />
                    <span>{workout.duration} min</span>
                  </div>

                  {/* Calories */}
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-[#85858d]" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-[#85858d] text-[#85858d]" />
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
