"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Star } from "lucide-react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import { getMyScheduleService } from "@/app/lib/apiServices";
import { toast } from "sonner";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function toYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayYMD() {
  return toYMD(new Date());
}

function formatDisplayDate(ymd) {
  if (!ymd) return "";
  const [y, m, d] = ymd.split("-");
  return `${d} ${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  const days = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    const date = new Date(year, month, dayNum);
    days.push({ date, ymd: toYMD(date), isCurrentMonth: date.getMonth() === month });
  }
  return days;
}

export default function MyBookingsPage() {
  const today = new Date();
  const [viewYear, setViewYear]     = useState(today.getFullYear());
  const [viewMonth, setViewMonth]   = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(todayYMD());
  const [schedule, setSchedule]     = useState([]);
  const [loading, setLoading]       = useState(true);

  const fetchSchedule = useCallback(async (month, year) => {
    setLoading(true);
    try {
      const res = await getMyScheduleService({
        month: String(month + 1).padStart(2, "0"),
        year: String(year),
      });
      setSchedule(res?.schedule || res?.data?.schedule || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load schedule.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      setSchedule([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule(viewMonth, viewYear);
  }, [viewMonth, viewYear, fetchSchedule]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const markedSet      = new Set(schedule.map((item) => item.date));
  const calendarDays   = getCalendarDays(viewYear, viewMonth);
  const filteredItems  = schedule.filter((item) => item.date === selectedDate);

  return (
    <>
      <PageHeader title="My Schedule" />

      <div className="space-y-6">

        {/* ── Calendar ──────────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-4 lg:p-6">

            {/* Month header */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={handlePrevMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <span className="text-base font-semibold text-white">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                onClick={handleNextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_NAMES.map((d) => (
                <div key={d} className="text-center text-[11px] text-gray-400 font-medium py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map(({ date, ymd, isCurrentMonth }) => {
                const isSelected   = ymd === selectedDate;
                const isToday      = ymd === todayYMD();
                const hasBooking   = markedSet.has(ymd);

                return (
                  <button
                    key={ymd}
                    onClick={() => setSelectedDate(ymd)}
                    className="flex flex-col items-center justify-center py-1 transition"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition
                        ${isSelected
                          ? "bg-white text-black font-bold"
                          : isToday
                          ? "text-purple-400"
                          : isCurrentMonth
                          ? "text-gray-200"
                          : "text-gray-600"}`}
                    >
                      {date.getDate()}
                    </span>
                    {hasBooking && !isSelected && (
                      <span className="mt-0.5 h-1 w-1 rounded-full bg-purple-400" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* ── List ──────────────────────────────────────────────────────────── */}
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-4">
            {formatDisplayDate(selectedDate)}
          </p>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/5" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const isEvent = item.type === "event";
                return (
                  <div key={item.id || item._id} className="overflow-hidden rounded-xl border border-white/5">
                    <div className={`p-4 bg-gradient-to-r ${isEvent ? "from-[#3b0a0a] to-[#111]" : "from-[#2c2c2c] to-[#111]"}`}>

                      {/* Top row: time + badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${isEvent ? "bg-red-500/20" : "bg-purple-600/20"}`}>
                            <Clock size={14} className={isEvent ? "text-red-400" : "text-purple-400"} />
                          </div>
                          <span className="text-gray-300 text-xs font-medium">{item.time}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] text-white font-bold uppercase ${isEvent ? "bg-red-600" : "bg-gray-700"}`}>
                          {isEvent ? "Special Event" : "Class"}
                        </span>
                      </div>

                      {/* Bottom row: info + status */}
                      <div className="flex items-end justify-between">
                        <div className="flex-1 pr-3">
                          <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                          <div className="flex items-center gap-1">
                            {isEvent && <MapPin size={10} className="text-gray-400" />}
                            <p className="text-gray-400 text-xs truncate">{item.subtitle}</p>
                          </div>
                          {item.guestCoach && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={10} className="text-yellow-500" />
                              <span className="text-yellow-500 text-[10px] font-bold">Guest: {item.guestCoach}</span>
                            </div>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${
                          item.status?.toLowerCase() === "pending"
                            ? "bg-yellow-500/15 text-yellow-400"
                            : item.status?.toLowerCase() === "approved"
                            ? "bg-green-600/20 text-green-400"
                            : item.status?.toLowerCase() === "rejected"
                            ? "bg-red-500/15 text-red-400"
                            : item.status?.toLowerCase() === "cancelled"
                            ? "bg-white/10 text-white/50"
                            : "bg-white/10 text-white/50"
                        }`}>
                          {item.status}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-12 opacity-30">
              <Clock size={48} className="text-gray-500" />
              <p className="text-gray-500 text-center mt-4">No bookings for this day</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
