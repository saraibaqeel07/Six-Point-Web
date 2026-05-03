// components/ProgramCardSection.tsx
import React from "react";

const programs = [
  {
    title: "Kids Jiu-Jitsu",
    description:
      "A structured and safe program focused on discipline, confidence, coordination, and respect.",
  },
  {
    title: "Adult Jiu-Jitsu",
    description:
      "Suitable for all levels, focusing on fundamentals, live training, and progressive skill development.",
  },
  {
    title: "Fundamentals Program",
    description:
      "Designed for students new to Jiu-Jitsu, covering core movements, positions, and concepts.",
  },
  {
    title: "Advanced Training",
    description:
      "High-level technical training and competition-focused preparation for experienced practitioners.",
  },
  {
    title: "Private Sessions",
    description:
      "One-on-one coaching tailored to individual goals, technique refinement, or competition preparation.",
  },
  {
    title: "Toddlers",
    description:
      "One-on-one coaching tailored to individual goals, technique refinement, or competition preparation.",
  },
  {
    title: "Teens",
    description:
      "One-on-one coaching tailored to individual goals, technique refinement, or competition preparation.",
  },
  {
    title: "Ladies Class",
    description:
      "One-on-one coaching tailored to individual goals, technique refinement, or competition preparation.",
  },
];

const ProgramCardSection = () => {
  return (
    <div className="py-10 md:py-14 bg-[#1D1818] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="
                border p-6 md:p-8
                flex flex-col justify-center items-center text-center
                min-h-[160px] md:min-h-[180px]
                transition-all duration-300 hover:border-white/60
              "
            >
              <h3 className="text-xl sm:text-2xl mb-3">
                {program.title}
              </h3>
              <p className=" text-sm sm:text-base leading-relaxed max-w-md">
                {program.description}
              </p>
            </div>
          ))}
        </div>

        {/* NOTE BAR */}
        <div className="mt-10 md:mt-14 py-5 sm:py-6 px-4 text-center bg-white text-black">
          <p className="text-base sm:text-lg md:text-xl font-medium">
            <strong>Note:</strong> All classes must be booked through the mobile app.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProgramCardSection;