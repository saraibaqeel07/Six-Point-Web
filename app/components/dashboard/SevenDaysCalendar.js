"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getStartOfWeek(date, startOnSunday = true) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = startOnSunday ? day : day === 0 ? -6 : day - 1;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export default function SevenDaysCalendar({
  mode = "week",
  selectedDate,
  onSelectDate,
  className = "",
  startOnSunday = true,
  events = [],

}) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const startOfWeek = useMemo(
    () => getStartOfWeek(viewDate, startOnSunday),
    [viewDate, startOnSunday]
  );



  const monthName = MONTHS[viewDate.getMonth()];
  const year = viewDate.getFullYear();

  const handlePrevWeek = () => {
    const next = new Date(viewDate);

    if (mode === "month") {
      next.setMonth(next.getMonth() - 1);
    } else {
      next.setDate(next.getDate() - 7);
    }

    setViewDate(next);
  };

  const handleNextWeek = () => {
    const next = new Date(viewDate);

    if (mode === "month") {
      next.setMonth(next.getMonth() + 1);
    } else {
      next.setDate(next.getDate() + 7);
    }

    setViewDate(next);
  };

  useEffect(() => {
    if (selectedDate) setViewDate(selectedDate);
  }, [selectedDate]);

  function getStartOfMonthGrid(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - firstDay.getDay()); // start from Sunday
    return start;
  }

  return (
    <div className={`bg-[#fff] border border-black/10  p-4 lg:p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevWeek}
          className="inline-flex h-11 w-11 items-center justify-center border border-black/50 bg-white/5 text-black/50 hover:bg-white/10 cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        <p className="text-base font-bold sm:text-lg text-black">
          {monthName} {year}
        </p>

        <button
          type="button"
          onClick={handleNextWeek}
          className="inline-flex h-11 w-11 items-center justify-center border border-black/50 bg-white/5 text-black/50 hover:bg-white/10 cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {mode === "week" && (
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + index);
            day.setHours(0, 0, 0, 0);

            const classesOnDay = events.filter((item) =>
              isSameDay(item.date, day)
            );

            const today = isSameDay(day, new Date());
            const selected = isSameDay(day, selectedDate);

            return (
              <button
                key={index}
                onClick={() => onSelectDate?.(day)}
                className={[
                  "flex flex-col items-center justify-center px-2 py-3 text-center transition",
                  "border min-h-[74px] cursor-pointer",
                  selected
                    ? "border-black bg-black/20 scale-[1.02]"
                    : "border-black/50 hover:bg-white/5",
                  today ? "ring-1 ring-black/30" : "",
                ].join(" ")}
              >
                <span className="mb-1 text-xs text-black">
                  {WEEKDAYS[day.getDay()]}
                </span>

                <span className="text-lg font-bold text-black">
                  {day.getDate()}
                </span>

                <span className="mt-1 text-[10px] text-black/60">
                  {classesOnDay.length
                    ? `${classesOnDay.length} class${classesOnDay.length > 1 ? "es" : ""}`
                    : "No class"}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {mode === "month" && (
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => {
            const start = getStartOfMonthGrid(viewDate);

            const day = new Date(start);
            day.setDate(start.getDate() + i);
            day.setHours(0, 0, 0, 0);

            const isCurrentMonth = day.getMonth() === viewDate.getMonth();
            const isSelected = isSameDay(day, selectedDate);

            const classesOnDay = events.filter((item) =>
              isSameDay(item.date, day)
            );
            const hasClasses = classesOnDay.length > 0;

            return (
              <button
                key={i}
                onClick={() => onSelectDate?.(day)}
                className={`p-2 text-left min-h-[70px] border transition cursor-pointer
  ${isCurrentMonth ? "" : "bg-gray-100 opacity-50"}
  
  ${hasClasses ? "border-black bg-black/20 scale-[1.02]" : "border-black/20"}
  
  ${isSelected ? "ring-1 ring-black" : ""}
`}
              >
                <div className="text-sm font-bold text-black text-center">{day.getDate()}</div>

                <div className="mt-1 space-y-1">
                  {classesOnDay.slice(0, 2).map((c, idx) => (
                    <div key={idx} className="text-[10px] truncate text-black/60 text-center">
                      {c.title}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}