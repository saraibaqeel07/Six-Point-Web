"use client";
import React from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";

export default function MyProgressPage() {


  return (
    <>
      <PageHeader title="My Progress" />

      <section className=" bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-col lg:items-start gap-5 border border-white/10">

        <div className="flex items-start gap-4 flex-col">
          <img
            src="/assets/next-class.png"
            alt="Next Class"
            className="w-20 h-20 object-contain"
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">Attendance</h2>
            </div>

            <p className="text-sm text-white/70 mt-2">
              Total Classes Attended:   42
            </p>
            <p className="text-sm text-white/70 mt-1">
              Classes Attended this Month:   8 / 12
            </p>
          </div>
          <Button className="hidden sm:inline-flex">
            Consistency builds champions
          </Button>

        </div>

      </section>

      <section className=" bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-col lg:items-start gap-5 border border-white/10 mt-5">

        <div className="flex items-start gap-4 flex-col">
          <img
            src="/assets/next-class.png"
            alt="Next Class"
            className="w-20 h-20 object-contain"
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">Current Belt</h2>
            </div>

            <p className="text-sm text-white/70 mt-2">
              White:   Belt
            </p>
            <p className="text-sm text-white/70 mt-1">
              Stripes:  (2 / 4)
            </p>
            <p className="text-sm text-white/70 mt-1">
              Next Promotion Goal: Attend 15 more classes Maintain regular training
            </p>

          </div>

        </div>

      </section>

      <section className=" bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-col lg:items-start gap-5 border border-white/10 mt-5">

        <div className="flex items-start gap-4 flex-col">
          <img
            src="/assets/next-class.png"
            alt="Next Class"
            className="w-20 h-20 object-contain"
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">Coach Notes</h2>
            </div>

            <blockquote className="text-lg text-white/70 italic tracking-tight my-3 border-l p-2 border-solid">
              <p>   “Good pressure and balance.
                Focus more on guard passing and grips.”</p>
            </blockquote>
            <p className="text-sm text-white/70 mt-1">
              Last Updated:   12 Jan 2026
            </p>
            <p className="text-sm text-white/70 mt-1">
              Coach:   Prof. Alex
            </p>
          </div>

        </div>

      </section>
    </>
  );
}
