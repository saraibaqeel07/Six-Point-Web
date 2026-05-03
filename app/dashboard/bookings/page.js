"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import SevenDaysCalendar from "@/app/components/dashboard/SevenDaysCalendar";
import { getClientBookingsService } from "@/app/lib/apiServices";
import { toast } from "sonner";

const STATUS_FILTERS = [
  { key: "", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
  { key: "CANCELLED", label: "Cancelled" },
];

const STATUS_STYLES = {
  PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  APPROVED: "bg-green-500/15 text-green-400 border-green-500/30",
  REJECTED: "bg-red-500/15 text-red-400 border-red-500/30",
  CANCELLED: "bg-white/10 text-white/50 border-white/20",
};

const MONTHS_SHORT = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function getBookingDate(booking) {
  const raw =
    booking?.session?.date ||
    booking?.sessionDate ||
    booking?.date ||
    booking?.createdAt;
  return raw ? new Date(raw) : null;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const LIMIT = 10;

  const fetchBookings = useCallback(async (status, currentPage) => {
    setLoading(true);
    try {
      const data = await getClientBookingsService({ status, page: currentPage, limit: LIMIT });
      const list = data?.data || data?.bookings || data?.items || (Array.isArray(data) ? data : []);
      const total = data?.total || data?.totalCount || list.length;
      setBookings(list);
      setTotalPages(Math.max(1, Math.ceil(total / LIMIT)));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load bookings.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings(statusFilter, page);
  }, [statusFilter, page, fetchBookings]);

  const handleStatusChange = (key) => {
    setStatusFilter(key);
    setSelectedDate(null);
    setPage(1);
  };

  // Map bookings to calendar event format (needs a .date Date object and .title)
  const calendarEvents = useMemo(() =>
    bookings
      .map((b) => {
        const d = getBookingDate(b);
        return d ? { ...b, date: d, title: b?.session?.title || b?.title || "Booking" } : null;
      })
      .filter(Boolean),
  [bookings]);

  // Date filter is applied on the frontend from the already-fetched list
  const displayedBookings = useMemo(() => {
    if (!selectedDate) return bookings;
    return bookings.filter((b) => isSameDay(getBookingDate(b), selectedDate));
  }, [bookings, selectedDate]);

  return (
    <>
      <PageHeader title="Bookings" />

      <div className="space-y-6">

        {/* Calendar */}
        <SevenDaysCalendar
          mode="week"
          selectedDate={selectedDate}
          onSelectDate={(d) => setSelectedDate(isSameDay(d, selectedDate) ? null : d)}
          events={calendarEvents}
          className="w-full"
        />

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleStatusChange(key)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                statusFilter === key
                  ? "border-white bg-white text-[#1f1919] font-medium"
                  : "border-white/10 bg-transparent text-white/70 hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}

          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition"
            >
              {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} ✕
            </button>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl border border-white/10 bg-white/5" />
            ))}
          </div>
        )}

        {/* Bookings grid */}
        {!loading && displayedBookings.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayedBookings.map((booking, index) => {
              const session = booking.session || booking.class || booking.program || {};
              const coach = booking.coach || session.coach || {};
              const status = booking.status || "PENDING";
              const bookingDate = getBookingDate(booking);

              return (
                <div
                  key={booking._id || booking.id || index}
                  className="group overflow-hidden border border-white/10 bg-[#2d2525]"
                >
                  {/* Image */}
                  {(session.image || session.thumbnail) && (
                    <div className="relative overflow-hidden">
                      <img
                        src={session.image || session.thumbnail}
                        alt={session.title || "Booking"}
                        className="h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex gap-4 p-5">
                    {/* Date column */}
                    {bookingDate && (
                      <div className="min-w-[52px] text-center font-bold text-purple-400">
                        <span className="text-sm">{MONTHS_SHORT[bookingDate.getMonth()]}</span>
                        <span className="block text-3xl leading-none text-white">
                          {bookingDate.getDate()}
                        </span>
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-medium text-white truncate">
                          {session.title || session.name || booking.title || `Booking #${index + 1}`}
                        </h3>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.PENDING}`}>
                          {status}
                        </span>
                      </div>

                      {(session.time || booking.time) && (
                        <p className="text-xs text-white/60">Time: {session.time || booking.time}</p>
                      )}

                      {(coach.name || coach.fullName) && (
                        <div className="mt-3 flex items-center gap-2">
                          <img
                            src="/assets/profile.png"
                            alt="Coach"
                            className="h-8 w-8 rounded-full border border-white/10 object-cover"
                          />
                          <p className="text-sm text-white/70">{coach.name || coach.fullName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && displayedBookings.length === 0 && (
          <div className="border border-white/10 bg-[#2d2525] p-10 text-center text-white/50">
            No bookings found
            {statusFilter ? ` with status "${statusFilter}"` : ""}
            {selectedDate ? ` on ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : ""}.
          </div>
        )}

        {/* Pagination */}
        {!selectedDate && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-xl border text-sm transition ${
                    page === i + 1
                      ? "border-white bg-white text-[#1f1919] font-medium"
                      : "border-white/10 text-white/60 hover:bg-white/5"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </>
  );
}
