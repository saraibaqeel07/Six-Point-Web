"use client";
import React from "react";
import PageHeader from "../components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";



export default function DashboardPage() {
  return (
       <>
      <PageHeader
          title="Good Morning, Jhon M"
          breadcrumb="Train. Improve. Repeat."
        />

    <div className="min-h-screen bg-[#1f1919] text-white">
      <div className="space-y-6">

        {/*  Top Banner */}
        <section className=" bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-white/10">

          <div className="flex items-start gap-4 flex-col">
            <img
              src="/assets/next-class.png"
              alt="Next Class"
              className="w-20 h-20 object-contain"
            />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-medium">Next Class</h2>
                <span className="text-sm text-white/60">
                  Today • 10:00 AM – 11:00 AM
                </span>
              </div>

              <p className="my-2 text-1xl sm:text-2xl lg:text-2xl leading-[1.3]">
                Adult Gi — All Levels
              </p>
              <p className="text-sm text-white/70">
                With Prof. Igor Silva
              </p>
            </div>
          </div>

             <Button href="/" className="hidden sm:inline-flex">
                 Book a Class
              </Button>


        </section>

        {/* 💳 Wallet + Membership */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Wallet */}
          <div className="lg:col-span-2 bg-[#ffffff] text-black p-5 flex flex-col justify-between">

            <div className="flex justify-between items-start">
              <img
                src="/assets/wallet-balance.png"
                alt="Wallet"
                className="w-20 h-20"
              />

              <div className="text-right">
                <p className="text-sm text-black/60">AED</p>
                <p className="text-2xl font-semibold">0.00</p>
              </div>
            </div>

            <div className="mt-10">
               <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] mt-0"> Wallet Balance</h3>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-[#ffffff] text-black flex flex-col items-center justify-center p-5 text-center">
            <img
              src="/assets/membership.png"
              alt="Membership"
              className="w-14 h-14"
            />
             <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] mt-3"> Membership</h3>
          </div>
        </section>

        {/* ⚡ Quick Actions */}
        <section>
          <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] mb-5">Quick Actions</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <ActionCard
              title="Book a class"
              icon="/assets/book.png"
            />

            <ActionCard
              title="View Schedule"
              icon="/assets/view-schedule.png"
            />

            <ActionCard
              title="Programs"
              icon="/assets/programs.png"
            />

            <ActionCard
              title="Refer a Friend"
              icon="/assets/refer.png"
            />
          </div>
        </section>

      </div>
    </div>
    </>
  );
}


function ActionCard({ title, icon }) {
  return (
    <button className="group relative bg-[#2d2525] p-5 h-[210px] flex flex-col justify-between transition border border-white/10">

      <img
        src={icon}
        alt={title}
        className="w-12 h-12 "
      />

      <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-sm sm:text-base lg:text-lg leading-[1.3] text-left">     {title}</h3>

      <img
        src= "/assets/cta-icon.png"
        alt="View Button"
        className="w-10 h-10 "
      />
      </div>
    </button>

  );
}

