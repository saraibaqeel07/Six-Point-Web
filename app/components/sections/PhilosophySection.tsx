"use client";
import { useEffect, useState } from "react";
import Button from "@/app/components/elements/Button";
import { getClassTypesService } from "@/app/lib/apiServices";

const PLACEHOLDER = "/assets/practice.png";

interface Program {
  _id?: string;
  name?: string;
  title?: string;
  image?: string;
  thumbnail?: string;
  imageUrl?: string;
}

const PhilosophySection = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @ts-ignore
    getClassTypesService({ activeOnly: true, limit: 4 })
      .then((res: any) => {
        const items: Program[] = res?.data || res?.classTypes || res || [];
        setPrograms(Array.isArray(items) ? items.slice(0, 4) : []);
      })
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, []);

  const pillars = [
    { title: "Discipline", desc: "Structure and consistency", icon: "/assets/disciplane.png" },
    { title: "Fitness", desc: "Enhance wellness", icon: "/assets/fitness.png" },
    { title: "Respect", desc: "Keep the tradition alive", icon: "/assets/respect.png" },
    { title: "Technique", desc: "Precision over strength", icon: "/assets/technique.png" },
    { title: "Mindset", desc: "Focus, confidence", icon: "/assets/mindset.png" },
    { title: "Resilience", desc: "Be ready to recover quickly from difficulties", icon: "/assets/resilience.png" },
  ];

  return (
    <div className="bg-[#1D1818] text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
            OUR PHILOSOPHY
          </h2>
          <p className="mt-4 text-base font-light max-w-xl">
            Our training philosophy is built around six core pillars that guide
            every class and every athlete.
          </p>
        </div>

        {/* PILLARS GRID */}
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16 justify-items-center lg:justify-items-stretch">
            {pillars.map((pillar, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-[#1D1818] rotate-45 shadow-xl border border-gray-600/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={pillar.icon}
                      alt={pillar.title}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center max-w-[200px]">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm font-light mt-1 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRAMS */}
        <div className="mt-16 md:mt-24">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-14 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
                PROGRAMS
              </h2>
              <p className="mt-3 font-light text-base">
                All sessions are 1 hour and coach-led.
              </p>
            </div>
            <div className="max-w-sm">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold">Private Sessions</p>
              <p className="font-light text-base mt-3">
                Structured training programs for all ages and experience levels.
              </p>
            </div>
          </div>

          {/* GRID — max 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="w-full h-64 sm:h-72 md:h-80 bg-white/10" />
                    <div className="h-4 bg-white/10 mt-4 mx-auto w-2/3" />
                  </div>
                ))
              : programs.map((program, index) => {
                  const img = program.image || program.thumbnail || program.imageUrl || PLACEHOLDER;
                  const name = program.name || program.title || "Program";
                  return (
                    <div key={program._id || index}>
                      <div className="group relative overflow-hidden shadow-xl">
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
                        />
                      </div>
                      <h3 className="text-center mt-4 text-sm md:text-base font-semibold">{name}</h3>
                    </div>
                  );
                })}
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-10">
            <Button href="/program">
              VIEW ALL PROGRAMS
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
