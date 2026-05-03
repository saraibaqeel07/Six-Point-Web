// components/TeamSection.tsx
import React from "react";
import Button from "@/app/components/elements/Button";

const TeamSection = () => {
  const stats = [
    {
      title: "5× World #1",
      subtitle: "Ranked – UAEJJF / AJP",
      isLarge: true,
    },
    {
      title: "IBJJF World & World",
      subtitle: "Masters Champion",
      isLarge: false,
    },
    {
      title: "20+",
      subtitle: "AJP Grand Slam Titles",
      isLarge: true,
    },
    {
      title: "Seminars taught in 30+",
      subtitle: "Countries worldwide",
      isLarge: false,
    },
  ];

  return (
    <section className="relative bg-[#1D1818] text-white py-16 md:py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        
        {/* ABOUT THE TEAM */}
       <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 mb-12 md:mb-16">
          
          {/* LEFT */}
          <div className="space-y-4 text-center lg:text-right">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
              ABOUT THE <br /> TEAM
            </h2>

            <Button href="/founder" className="hidden sm:inline-flex">
              More Info
            </Button>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 text-base md:text-lg leading-relaxed max-w-xl text-center lg:text-left">
            <p className="font-light text-base">
              The Head Coach Instructor, Igor Silva, is widely known in the
              Jiu-Jitsu industry as one of the most winning athletes. His
              achievements in National competition has granted him the highest
              reputation in the UAE. His international path around the world
              is remarkable, which printed his name in the jiu-jitsu hall of
              fame in <span className="font-bold">Europe</span>,{" "}
              <span className="font-bold">Brazil</span>, and{" "}
              <span className="font-bold">Russia</span>.
            </p>

            <p className="font-light text-base">
              Six Points Jiu-Jitsu is a professional Brazilian Jiu-Jitsu
              studio dedicated to developing technically refined athletes in a
              structured and supportive environment.
            </p>
          </div>
        </div>

        {/* HEAD COACH */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
            HEAD COACH
          </h2>

          <p className="font-light text-base mt-4">
            Our training philosophy is built around six core pillars that guide
            every class and every athlete.
          </p>
        </div>

        {/* COACH SECTION */}
        <div className="flex flex-col lg:flex-row items-center mt-12 md:mt-20 gap-8 lg:gap-10">
          
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/assets/coach.png"
              alt="Coach Image"
              className="w-full max-w-md sm:max-w-lg lg:max-w-full"
            />
          </div>

          {/* TEXT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-3xl sm:text-4xl uppercase leading-[1.3]">
              IGOR SILVA
            </h3>

            <p className="my-4 font-bold">
              Senior Black Belt Coach | 27+ Years Experience
            </p>

            <p className="text-base font-light">
              5th-degree Brazilian Jiu-Jitsu black belt with 27+ years dedicated
              to the sport. Started training in 1998 and received the black belt
              in 2006 after winning the IBJJF World Championship. Recognized as
              the most successful athlete in UAEJJF/AJP world ranking history,
              achieving #1 world ranking multiple times across Gi, No-Gi, Adult,
              Master, and Professional divisions.
            </p>

            <p className="text-base font-light mt-5">
              <span className="font-bold">
                Commando Group – Senior Black Belt Coach (12 Years)
              </span>
              <br />
              Technical leadership, athlete development, and competition
              strategy.
            </p>

            <p className="text-base font-light mt-5">
              <span className="font-bold">
                GFTeam (GFT) – Black Belt Member & Team Organizer
              </span>
              <br />
              Team structure and training methodology.
            </p>

            <p className="text-base font-light mt-5">
              <span className="font-bold">UFC Camp Experience</span>
              <br />
              Assisted UFC legend Demian Maia during training camps.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
            {stats.map((stat, index) => {
              let translateY = "";
              if (index === 0)
                translateY = "md:-translate-y-6 lg:-translate-y-10";
              else if (index === 1)
                translateY = "md:translate-y-4 lg:translate-y-6";
              else if (index === 2)
                translateY = "md:translate-y-8 lg:translate-y-14";
              else if (index === 3)
                translateY = "md:translate-y-12 lg:translate-y-20";

              return (
                <div
                  key={index}
                  className={`
                    ${index % 2 === 0 ? "bg-white text-black" : "bg-[#1D1818] text-white"} 
                    border p-5 md:p-6 flex flex-col justify-center ${translateY}
                  `}
                >
                  <h3 className="font-black text-3xl sm:text-4xl leading-[1.3]">
                    {stat.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base font-medium">
                    {stat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BACKGROUND IMAGE */}
      <img
        src="/assets/dollar.png"
        alt="Dollar Image"
        className="hidden md:block absolute top-[40%] -right-20 transform -translate-y-1/2 opacity-10"
      />
    </section>
  );
};

export default TeamSection;