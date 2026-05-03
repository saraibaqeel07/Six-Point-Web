"use client";
import React from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";

export default function TeamPage() {


  return (
    <>
      <PageHeader title="Team" />

      <div className="max-w-4xl mx-auto text-center">
        <h4 className="text-2xl sm:text-3xl lg:text-4xl uppercase leading-[1.3]">
          HEAD COACH
        </h4>
      </div>

      <div className="flex flex-col items-center mt-6 md:mt-12 gap-8 lg:gap-10 flex-wrap">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src="/assets/coach.png"
            alt="Coach Image"
            className="w-full max-w-md sm:max-w-lg lg:max-w-full"
          />
        </div>

        {/* TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h3 className="text-3xl sm:text-4xl uppercase leading-[1.3] text-center">
            IGOR SILVA
          </h3>

          <p className="my-4 font-bold text-center">
            Senior Black Belt Coach | 27+ Years Experience
          </p>

          <p className="text-base font-light text-center">
            5th-degree Brazilian Jiu-Jitsu black belt with 27+ years dedicated
            to the sport. Started training in 1998 and received the black belt
            in 2006 after winning the IBJJF World Championship. Recognized as
            the most successful athlete in UAEJJF/AJP world ranking history,
            achieving #1 world ranking multiple times across Gi, No-Gi, Adult,
            Master, and Professional divisions.
          </p>

          <p className="text-base font-light mt-5 text-center">
            <span className="font-bold">
              Commando Group – Senior Black Belt Coach (12 Years)
            </span>
            <br />
            Technical leadership, athlete development, and competition
            strategy.
          </p>

          <p className="text-base font-light mt-5 text-center">
            <span className="font-bold">
              GFTeam (GFT) – Black Belt Member & Team Organizer
            </span>
            <br />
            Team structure and training methodology.
          </p>

          <p className="text-base font-light mt-5 text-center">
            <span className="font-bold ">UFC Camp Experience</span>
            <br />
            Assisted UFC legend Demian Maia during training camps.
          </p>
          <div className="flex justify-center mt-5"> <Button href="#" className="hidden sm:inline-flex">
            Book now
          </Button></div>


        </div>
      </div>

      
      <div className="max-w-4xl mx-auto text-center md:mt-20">
        <h4 className="text-2xl sm:text-3xl lg:text-4xl uppercase leading-[1.3]">
        Brazilian Jiu-Jitsu Coach

        </h4>
      </div>

      <div className="flex flex-col items-center mt-6 md:mt-12 gap-8 lg:gap-10 flex-wrap">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src="/assets/brazilian-coach.png"
            alt="Coach Image"
            className="w-full max-w-md sm:max-w-lg lg:max-w-full"
          />
        </div>

        {/* TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h3 className="text-3xl sm:text-4xl uppercase leading-[1.3] text-center">
           LUIZ FERNANDO RIBEIRO

          </h3>

          <p className="my-4 font-bold text-center">
           Brazilian Jiu-Jitsu Coach | 28 Years of Practice | 15 Years of Teaching Experience
          </p>

          <p className="text-base font-light text-center">
Luiz Fernando Ribeiro is a highly experienced Brazilian Jiu-Jitsu coach with 28 years of practice and 15 years dedicated to teaching, developing athletes and teams with a strong focus on technical excellence, discipline, and performance.
          </p>

               <p className="text-base font-light text-center mt-5">
With a solid international competitive background, Luiz has achieved significant titles across the world’s leading federations, combining high-level competition experience with a practical and effective teaching approach for students of all levels.
          </p>


          <div className="flex justify-center mt-5"> <Button href="#" className="hidden sm:inline-flex">
            Book now
          </Button></div>


        </div>
      </div>
    </>
  );
}

