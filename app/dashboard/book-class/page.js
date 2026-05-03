"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import {
  getClassTypesService,
  getTrainersService,
  getAvailableSlotsService,
  createBookingService,
} from "@/app/lib/apiServices";
import { toast } from "sonner";

// ── Date helpers ──────────────────────────────────────────────────────────────

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function toYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayYMD() {
  return toYMD(new Date());
}

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Status helpers ────────────────────────────────────────────────────────────

function getBookingState(item) {
  const status = item.userBookingStatus;
  if (status === "APPROVED") return "booked";
  if (status === "PENDING")  return "pending";
  if ((item.spotsLeft ?? item.availableSpots ?? 1) <= 0) return "full";
  return "available";
}

const BOOK_BTN = {
  booked:    { label: "BOOKED",    cls: "bg-green-600 text-white cursor-default" },
  pending:   { label: "PENDING",   cls: "bg-orange-500 text-white cursor-default" },
  full:      { label: "FULL",      cls: "bg-white/10 text-white/40 cursor-not-allowed" },
  available: { label: "BOOK NOW",  cls: "bg-white text-[#1f1919] hover:bg-white/90 cursor-pointer" },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function BookClassPage() {
  const [weekStart, setWeekStart]           = useState(() => startOfWeek(new Date()));
  const [selectedDate, setSelectedDate]     = useState(todayYMD());
  const [categories, setCategories]         = useState([{ _id: "", name: "ALL" }]);
  const [trainers, setTrainers]             = useState([{ _id: "", fullName: "ALL COACHES" }]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTrainer, setSelectedTrainer]   = useState("");
  const [classes, setClasses]               = useState([]);
  const [loadingMeta, setLoadingMeta]       = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [bookingId, setBookingId]           = useState(null);

  // week days array
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(weekStart, i);
    return { dayName: DAY_NAMES[d.getDay()], dayNumber: d.getDate(), fullDate: toYMD(d) };
  });

  const monthLabel = `${MONTH_NAMES[weekStart.getMonth()]} ${weekStart.getFullYear()}`;

  // ── Metadata ────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [catRes, coachRes] = await Promise.all([
          getClassTypesService(),
          getTrainersService(),
        ]);
        const cats   = catRes?.data   || catRes   || [];
        const coaches = coachRes?.data || coachRes || [];
        setCategories([{ _id: "", name: "ALL" }, ...cats]);
        setTrainers([{ _id: "", fullName: "ALL COACHES" }, ...coaches]);
      } catch (err) {
        console.error("Failed to load filters", err);
      } finally {
        setLoadingMeta(false);
      }
    })();
  }, []);

  // ── Slots ────────────────────────────────────────────────────────────────────
  const fetchSlots = useCallback(async () => {
    setLoadingClasses(true);
    try {
      const res = await getAvailableSlotsService({
        date: selectedDate,
        classTypeId: selectedCategory || undefined,
        coachId: selectedTrainer || undefined,
      });
      setClasses(res?.data || res || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load classes.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      setClasses([]);
    } finally {
      setLoadingClasses(false);
    }
  }, [selectedDate, selectedCategory, selectedTrainer]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  // ── Book ─────────────────────────────────────────────────────────────────────
  const handleBook = async (classId) => {
    setBookingId(classId);
    try {
      await createBookingService(classId);
      toast.success("Class booked successfully!");
      fetchSlots();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Booking failed.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setBookingId(null);
    }
  };

  return (
    <>
      <PageHeader title="Book a Class" />

      <div className="space-y-6">

        {/* ── Week Calendar ─────────────────────────────────────────────────── */}
        <div className="bg-white p-4 rounded-sm">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setWeekStart((w) => addDays(w, -7))}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>

            <span className="text-base font-semibold text-gray-800">{monthLabel}</span>

            <button
              onClick={() => setWeekStart((w) => addDays(w, 7))}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((item) => {
              const isSelected = selectedDate === item.fullDate;
              const isToday    = item.fullDate === todayYMD();
              return (
                <button
                  key={item.fullDate}
                  onClick={() => setSelectedDate(item.fullDate)}
                  className="flex flex-col items-center gap-1 py-2 rounded-sm transition"
                >
                  <span className={`text-[10px] font-medium ${isSelected ? "text-gray-700" : "text-gray-400"}`}>
                    {item.dayName}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition
                      ${isSelected ? "bg-gray-700 text-white" : isToday ? "border border-purple-300 text-black" : "text-black"}`}
                  >
                    {item.dayNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Category Filter ───────────────────────────────────────────────── */}
        {!loadingMeta && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`border px-4 py-2 text-xs font-medium tracking-wide transition ${
                  selectedCategory === cat._id
                    ? "bg-white border-transparent text-[#1f1919]"
                    : "border-white/20 text-white/70 hover:bg-white/5"
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* ── Coach Filter ──────────────────────────────────────────────────── */}
        {!loadingMeta && trainers.length > 1 && (
          <div className="w-full sm:w-64">
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="w-full border border-white/10 bg-[#1f1919] px-4 py-3 text-sm text-white outline-none"
            >
              {trainers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.fullName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ── Class Cards ───────────────────────────────────────────────────── */}
        {loadingClasses ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg border border-white/10 bg-white/5" />
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="border border-white/10 bg-[#2d2525] p-10 text-center text-white/50">
            No classes available for this selection.
          </div>
        ) : (
          <div className="space-y-4">
            {classes.map((item) => {
              const state    = getBookingState(item);
              const btn      = BOOK_BTN[state];
              const isBooking = bookingId === item._id;
              const spots    = item.spotsLeft ?? item.availableSpots ?? 0;

              return (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#2c2c2c] via-[#1a1a1a] to-[#000]"
                >
                  {/* Time row */}
                  <div className="flex items-center gap-2 px-4 pt-4">
                    <Clock size={14} className="text-purple-400" />
                    <span className="text-xs text-gray-300">
                      {item.timeslotId?.startTime} – {item.timeslotId?.endTime}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white truncate">
                        {item.classTypeId?.name || item.title || "Class"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        With {item.coachId?.fullName || "TBA"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">1 hour · All levels</p>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0 ml-4">
                      <button
                        disabled={state !== "available" || isBooking}
                        onClick={() => state === "available" && handleBook(item._id)}
                        className={`rounded-sm px-6 py-2 text-xs font-bold tracking-wide transition ${btn.cls} ${
                          isBooking ? "opacity-60 cursor-wait" : ""
                        }`}
                      >
                        {isBooking ? "Booking…" : btn.label}
                      </button>

                      <div className="flex items-center gap-1">
                        <Users size={12} className="text-gray-400" />
                        <span className="text-[10px] text-gray-400">{spots} spots left</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
}
