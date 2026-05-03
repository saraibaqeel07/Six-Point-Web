"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Clock, Users } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/dashboard/pageHeader";
import { getAvailableSlotsService, createBookingService } from "@/app/lib/apiServices";
import { toast } from "sonner";

function getBookingState(item) {
  const status = item.userBookingStatus;
  if (status === "APPROVED") return "booked";
  if (status === "PENDING")  return "pending";
  if ((item.spotsLeft ?? item.availableSpots ?? 1) <= 0) return "full";
  return "available";
}

const BOOK_BTN = {
  booked:    { label: "BOOKED",   cls: "bg-green-600 text-white cursor-default" },
  pending:   { label: "PENDING",  cls: "bg-orange-500 text-white cursor-default" },
  full:      { label: "FULL",     cls: "bg-white/10 text-white/40 cursor-not-allowed" },
  available: { label: "BOOK NOW", cls: "bg-white text-[#1f1919] hover:bg-white/90 cursor-pointer" },
};

export default function BookProgramPage() {
  const { id }       = useParams();
  const searchParams = useSearchParams();
  const programName  = searchParams.get("name") || "Book Program";

  const [classes, setClasses]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [bookingId, setBookingId]     = useState(null);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAvailableSlotsService({ classTypeId: id });
      setClasses(res?.data || res || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load classes.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

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
      <PageHeader title={programName} breadcrumb="Programs" />

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg border border-white/10 bg-white/5" />
          ))
        ) : classes.length === 0 ? (
          <div className="border border-white/10 bg-[#2d2525] p-10 text-center text-white/50">
            No classes available for this program.
          </div>
        ) : (
          classes.map((item) => {
            const state     = getBookingState(item);
            const btn       = BOOK_BTN[state];
            const isBooking = bookingId === item._id;
            const spots     = item.spotsLeft ?? item.availableSpots ?? 0;

            return (
              <div
                key={item._id}
                className="overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#2c2c2c] via-[#1a1a1a] to-[#000]"
              >
                <div className="flex items-center gap-2 px-4 pt-4">
                  <Clock size={14} className="text-purple-400" />
                  <span className="text-xs text-gray-300">
                    {item.timeslotId?.startTime} – {item.timeslotId?.endTime}
                  </span>
                </div>

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
          })
        )}
      </div>
    </>
  );
}
