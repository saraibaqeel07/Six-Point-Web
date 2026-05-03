"use client";
import React from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";

export default function ProgramsPage() {
  const programs = [
    {
      title: "Kids Jiu-Jitsu",
      duration: "2 HOUR",
      level: "ALL LEVEL",
      image: "/assets/practice.png",
    },
    {
      title: "Adult Jiu-Jitsu",
      duration: "1.5 HOUR",
      level: "INTERMEDIATE",
      image: "/assets/beginners.png",
    },
    {
      title: "Fundamentals Program",
      duration: "1 HOUR",
      level: "BEGINNER",
      image: "/assets/beginners.png",
    },
    {
      title: "Private Coaching",
      duration: "1 HOUR",
      level: "ALL LEVEL",
      image: "/assets/advanced.png",
    },
  ];

  return (
    <>
      <PageHeader title="Programs" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5">
        {programs.map((program, index) => (
          <ProgramCard key={index} {...program} />
        ))}
      </div>
    </>
  );
}

function ProgramCard({ title, duration, level, image }) {
  return (
    <div className="group overflow-hidden border border-white/10 bg-[#2d2525] shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[1/1] w-full sm:w-40  lg:w-52 shrink-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-tight">
              {title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm tracking-[0.18em] uppercase text-white/70">
              {duration} | {level}
            </p>
          </div>

          <div className="flex justify-start sm:justify-end">
            <Button className="inline-flex w-full sm:w-auto justify-center px-5 py-2.5">
              Book Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}