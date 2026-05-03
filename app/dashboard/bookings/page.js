"use client";

import React, { useMemo, useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import SevenDaysCalendar from "@/app/components/dashboard/SevenDaysCalendar";

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

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
  {
    title: "Ladies Only Class",
    category: "ladies",
    coach: "Amina",
    date: new Date(2026, 3, 15),
    time: "7:00 PM - 8:00 PM",
    image: "/assets/competitions.png",
    slotsLeft: 9,
  },
  {
    title: "Open Mat Session",
    category: "adults",
    coach: "Amina",
    date: new Date(2026, 3, 1),
    time: "8:00 PM - 9:00 PM",
    image: "/assets/community-events.png",
    slotsLeft: 5,
  },
];

export default function BookingsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [coachFilter, setCoachFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const coaches = ["all", "John Cena", "Mikasa", "Sasha", "Amina"];

  const categoryButtons = [
    { key: "all", label: "All" },
    { key: "adults", label: "Adults" },
    { key: "kids", label: "Kids" },
    { key: "teens", label: "Teens" },
    { key: "toddlers", label: "Toddlers" },
    { key: "ladies", label: "Ladies Only" },
  ];

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const matchesCategory =
        categoryFilter === "all" ? true : item.category === categoryFilter;

      const matchesCoach =
        coachFilter === "all" ? true : item.coach === coachFilter;

      const matchesDate = selectedDate ? isSameDay(item.date, selectedDate) : true;

      return matchesCategory && matchesCoach && matchesDate;
    });
  }, [categoryFilter, coachFilter, selectedDate]);

  return (
    <>
      <PageHeader title="Bookings" />

      <div className="space-y-10">
        <SevenDaysCalendar
         mode="week"
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          events={classes}
          className="w-full"
        />

        <section className="border border-white/10 bg-[#2d2525] p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-medium">Book a Class</h2>
              <p className="mt-1 text-sm text-white/70">
                Choose a date, category, and coach to filter available classes.
              </p>
            </div>

            <div className="w-full lg:w-[260px]">
              <label className="mb-2 block text-sm text-white/70">Coach</label>
              <select
                value={coachFilter}
                onChange={(e) => setCoachFilter(e.target.value)}
                className="w-full border border-white/10 bg-[#1f1919] px-4 py-3 text-sm text-white outline-none"
              >
                {coaches.map((coach) => (
                  <option key={coach} value={coach}>
                    {coach === "all" ? "All Coaches" : coach}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          {categoryButtons.map((item) => (
            <button
              key={item.key}
              onClick={() => setCategoryFilter(item.key)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${categoryFilter === item.key
                  ? "border-white bg-white text-[#1f1919]"
                  : "border-white/10 bg-transparent text-white/75 hover:bg-white/5"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredClasses.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden border border-white/10 bg-[#2d2525]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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

                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src="/assets/profile.png"
                      alt="Coach"
                      className="h-10 w-10 rounded-full border border-white/10 object-cover"
                    />
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">{item.slotsLeft}</span>  Slots Left
                    </p>

                  </div>

                  <Button className="mt-4 w-full">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="border border-white/10 bg-[#2d2525] p-8 text-center text-white/70">
            No classes match your selected date and filters.
          </div>
        )}
      </div>
    </>
  );
}