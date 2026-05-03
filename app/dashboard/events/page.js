"use client";
import React from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import { useState } from "react";

export default function EventsPage() {

  const [filter, setFilter] = useState("upcoming");

  const events = [
    {
      title: "Competitions",
      date: "SEP",
      day: "10",
      time: "6:00 PM - 9:00 PM",
      image: "/assets/competitions.png",
      category: "today",
    },
    {
      title: "Special training camps",
      date: "SEP",
      day: "12",
      time: "6:00 PM - 9:00 PM",
      image: "/assets/special-training-camps.png",
      category: "week",
    },
    {
      title: "International seminars",
      date: "SEP",
      day: "20",
      time: "6:00 PM - 9:00 PM",
      image: "/assets/international-seminars.png",
      category: "upcoming",
    },
       {
      title: "Community events",
      date: "SEP",
      day: "29",
      time: "7:00 PM - 11:00 PM",
      image: "/assets/community-events.png",
      category: "upcoming",
    },
  ];

  const filteredEvents =
    filter === "upcoming"
      ? events
      : events.filter((event) => event.category === filter);

  return (
    <>
      <PageHeader title="Events" />

      <div className="flex flex-wrap gap-2 mb-10">
        {["upcoming", "today", "week"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-xl text-sm border transition ${filter === item
              ? "bg-white text-[#1f1919] border-white"
              : "bg-transparent text-white/75 border-white/10 hover:bg-white/5"
              }`}
          >
            {item === "upcoming"
              ? "Upcoming"
              : item === "today"
                ? "Today"
                : "Next week"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {filteredEvents.map((event, index) => (
          <div key={index} className="group">

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className=" pt-3 flex gap-4 items-start">

              {/* Date */}
              <div className="flex flex-col items-center text-purple-500 font-bold">
                <span className="text-sm">{event.date}</span>
                <span className="text-3xl leading-none text-white">
                  {event.day}
                </span>
              </div>

              {/* Title & Time */}
              <div>
                <h3 className="text-lg font-light mb-1">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm tracking-[0.18em] text-white/70">
                  Time:  {event.time}
                </p>
                <p className="text-xs sm:text-sm tracking-[0.18em] text-white/70">
                  Venue: Training Mat 2
                </p>
                <p className="text-xs sm:text-sm tracking-[0.18em] text-white/70">
                  Coach: John Cena
                </p>
                <Button className="mt-4"> Register</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

