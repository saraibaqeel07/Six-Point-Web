"use client";

import React, { useMemo, useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import SevenDaysCalendar from "@/app/components/dashboard/SevenDaysCalendar";

const classes = [
  {
    title: "Fundamentals Class",
    category: "adults",
    coach: "John Cena",
    date: new Date(2026, 5, 10),
    time: "6:00 PM - 7:00 PM",
    image: "/assets/competitions.png",
    slotsLeft: 10,
  },
  {
    title: "Kids Jiu-Jitsu",
    category: "kids",
    coach: "Mikasa",
    date: new Date(2026, 4, 1),
    time: "5:00 PM - 6:00 PM",
    image: "/assets/special-training-camps.png",
    slotsLeft: 8,
  },
  {
    title: "Teen Grappling",
    category: "teens",
    coach: "John Cena",
    date: new Date(2026, 4, 30),
    time: "6:30 PM - 7:30 PM",
    image: "/assets/international-seminars.png",
    slotsLeft: 6,
  },
  {
    title: "Toddlers Movement",
    category: "toddlers",
    coach: "Sasha",
    date: new Date(2026, 3, 10),
    time: "4:00 PM - 4:45 PM",
    image: "/assets/community-events.png",
    slotsLeft: 12,
  },

];

export default function MyBookingsPage() {

    const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


  const [selectedDate, setSelectedDate] = useState(null);
  function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

const filteredClasses = useMemo(() => {
  // if no date selected → show ALL bookings
  if (!selectedDate) return classes;

  // if date selected → show only that day's bookings
  return classes.filter((item) =>
    isSameDay(item.date, selectedDate)
  );
}, [selectedDate]);

  return (

    <>
      <PageHeader title="My Bookings/Schedule" />
      <div className="flex items-start flex-wrap justify-start gap-10">
      <SevenDaysCalendar
        mode="month"
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        events={classes}
        className="w-1/2"
      />
      <div className="w-2/5 grid grid-cols-1 gap-6 sm:grid-cols-1">
        {filteredClasses.map((item, index) => (
          <div
            key={index}
            className="flex group overflow-hidden border border-white/10 bg-[#2d2525]"
          >
            <div className="relative overflow-hidden">

              <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {item.coach}
              </div>
            </div>

            <div className="flex gap-4 p-5">
              <div className="min-w-[52px] text-center font-bold text-purple-400">
                <span className="text-sm">
                  {MONTHS_SHORT[item.date.getMonth()]}
                </span>
                <span className="block text-3xl leading-none text-white">
                  {item.date.getDate()}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="mb-1 text-lg font-medium">{item.title}</h3>

                <p className="text-xs tracking-[0.12em] text-white/70 sm:text-sm">
                  Time: {item.time}
                </p>
                <p className="text-xs tracking-[0.12em] text-white/70 sm:text-sm">
                  Date: {item.date.toDateString()}
                </p>
                <p className="mt-1 text-xs tracking-[0.12em] text-white/70 sm:text-sm">
                  Venue: Training Mat 2
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

    </>
  );
}