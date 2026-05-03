"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Button from "@/app/components/elements/Button";

const PhilosophySection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
      
      {/* MAIN CONTAINER (fix overflow) */}
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
                
                {/* Diamond */}
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

                {/* Text */}
                <div className="text-center max-w-[200px]">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light mt-1 leading-relaxed">
                    {pillar.desc}
                  </p>
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
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Private Sessions
              </p>
              <p className="font-light text-base mt-3">
                Structured training programs for all ages and experience levels.
              </p>

              {/* Arrows */}
              <div className="flex gap-4 mt-5">
                <button ref={prevRef} className="text-2xl bg-white text-gray-500 px-3 py-1">
                  ←
                </button>
                <button ref={nextRef} className="text-2xl bg-white text-gray-500 px-3 py-1">
                  →
                </button>
              </div>
            </div>

          </div>

          {/* SWIPER (wrapped to prevent overflow) */}
          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation && typeof swiper.params.navigation === "object") {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {[
                { src: "/assets/practice.png", title: "Kids Jiu-Jitsu" },
                { src: "/assets/adult.png", title: "Adult Jiu-Jitsu" },
                { src: "/assets/beginners.png", title: "Beginners Program" },
                { src: "/assets/advanced.png", title: "Advanced Training" },
              ].map((program, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <div className="group relative overflow-hidden shadow-xl">
                      <img
                        src={program.src}
                        alt={program.title}
                        className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-center mt-4 text-sm md:text-base font-semibold">
                      {program.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-10">
            <Button href="/program" className="hidden sm:inline-flex">
              VIEW ALL PROGRAMS
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;