"use client";

import { useEffect, useState } from "react";
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

const ProgramCardSection = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @ts-ignore
    getClassTypesService({ activeOnly: true, limit: 50 })
      .then((res: unknown) => {
        const data = res as Record<string, unknown>;
        const items = (data?.data || data?.classTypes || data || []) as Program[];
        setPrograms(Array.isArray(items) ? items : []);
      })
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-10 md:py-14 bg-[#1D1818] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">

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
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                        }}
                      />
                    </div>
                    <h3 className="text-center mt-4 text-sm md:text-base font-semibold">
                      {name}
                    </h3>
                  </div>
                );
              })}
        </div>

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
