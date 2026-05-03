"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import { getEventsService, registerEventService } from "@/app/lib/apiServices";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

const MONTHS_SHORT = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const FALLBACK_IMAGES = [
  "/assets/competitions.png",
  "/assets/special-training-camps.png",
  "/assets/international-seminars.png",
  "/assets/community-events.png",
];

function parseEventDate(event) {
  const raw = event.date || event.startDate || event.eventDate || event.scheduledAt;
  if (!raw) return { month: "—", day: "—" };
  const d = new Date(raw);
  return { month: MONTHS_SHORT[d.getMonth()], day: String(d.getDate()) };
}

export default function EventsPage() {
  const { user } = useAuth();
  const [filter, setFilter]       = useState(null);
  const [search, setSearch]       = useState("");
  const [query, setQuery]         = useState("");
  const [events, setEvents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [registeringId, setRegisteringId] = useState(null);
  const debounceRef               = useRef(null);

  const fetchEvents = useCallback(async (f, q) => {
    setLoading(true);
    try {
      const res = await getEventsService({ filter: f, search: q || undefined });
      setEvents(res?.data || res?.events || res || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load events.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(filter, query); }, [filter, query, fetchEvents]);

  const handleFilterChange = (f) => {
    setFilter((prev) => (prev === f ? null : f));
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(val), 400);
  };

  const handleRegister = async (eventId) => {
    setRegisteringId(eventId);
    try {
      await registerEventService(eventId);
      toast.success("Registered successfully!");
      fetchEvents(filter, query);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <>
      <PageHeader title="Events" />

      {/* Filter tabs + search */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
        <div className="flex flex-wrap gap-2">
          {["upcoming", "today", "week"].map((item) => (
            <button
              key={item}
              onClick={() => handleFilterChange(item)}
              className={`px-4 py-2 rounded-xl text-sm border transition ${
                filter === item
                  ? "bg-white text-[#1f1919] border-white"
                  : "bg-transparent text-white/75 border-white/10 hover:bg-white/5"
              }`}
            >
              {item === "upcoming" ? "Upcoming" : item === "today" ? "Today" : "Next week"}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search events…"
          className="border border-white/10 bg-[#2d2525] px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 w-full sm:w-56"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-[220px] animate-pulse rounded bg-white/5" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="border border-white/10 bg-[#2d2525] p-10 text-center text-white/50">
          No events found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {events.map((event, index) => {
            const { month, day } = parseEventDate(event);
            const image = event.image || event.thumbnail || event.imageUrl || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
            const time  = event.time || (event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : event.startTime || "—");
            const venue = event.venue || event.location || "Training Mat 2";
            const coach = event.coach?.fullName || event.coachId?.fullName || event.instructorName || "—";
            const isRegistering = registeringId === (event._id || event.id);
            const isRegistered  = event.attendees?.some((x) => x._id == user?._id);

            return (
              <div key={event._id || event.id || index} className="group">

                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt={event.title || event.name}
                    className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-3 flex gap-4 items-start">

                  <div className="flex flex-col items-center text-purple-500 font-bold">
                    <span className="text-sm">{month}</span>
                    <span className="text-3xl leading-none text-white">{day}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-light mb-1">{event.title || event.name}</h3>
                    <p className="text-xs sm:text-sm tracking-[0.18em] text-white/70">Time: {time}</p>
                    <p className="text-xs sm:text-sm tracking-[0.18em] text-white/70">Venue: {venue}</p>
                    <p className="text-xs sm:text-sm tracking-[0.18em] text-white/70">Coach: {coach}</p>
                    <button
                      disabled={isRegistered || isRegistering}
                      onClick={() => !isRegistered && handleRegister(event._id || event.id)}
                      className={`mt-4 inline-flex items-center justify-center px-6 md:px-7 py-2 md:py-2.5 font-medium transition-all duration-300 text-[11px] md:text-[12px] uppercase whitespace-normal break-words text-center leading-snug rounded-none shadow-md hover:shadow-lg
                        ${isRegistered
                          ? "bg-green-600 text-white cursor-default"
                          : "bg-gradient-to-r from-[#C1BEB9] to-white hover:from-[#b4b1ac] hover:to-[#f2f2f2] text-black"}
                        ${isRegistering ? "opacity-60 cursor-wait" : ""}`}
                    >
                      {isRegistering ? "Registering…" : isRegistered ? "Registered" : "Register"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
