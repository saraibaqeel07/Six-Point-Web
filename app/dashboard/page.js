"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import { useAuth } from "@/app/context/AuthContext";
import { getNextClassService } from "@/app/lib/apiServices";
import { toast } from "sonner";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function formatClassTime(nextClass) {
  if (!nextClass) return null;
  const date = nextClass.date || nextClass.startDate || nextClass.scheduledAt;
  const start = nextClass.startTime || nextClass.time;
  const end = nextClass.endTime;

  if (!date && !start) return null;

  const parts = [];
  if (date) {
    const d = new Date(date);
    const isToday = new Date().toDateString() === d.toDateString();
    parts.push(isToday ? "Today" : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
  }
  if (start) parts.push(end ? `${start} – ${end}` : start);
  return parts.join(" • ");
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [nextClass, setNextClass] = useState(null);
  const [loadingClass, setLoadingClass] = useState(true);

  const displayName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : null) ||
    user?.email ||
    "Member";

  useEffect(() => {
    getNextClassService()
      .then((data) => setNextClass(data?.data || data))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        if (msg) toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      })
      .finally(() => setLoadingClass(false));
  }, []);

  const className =
    nextClass?.title ||
    nextClass?.name ||
    nextClass?.slot?.title ||
    nextClass?.class?.title ||
    "—";

  const coachName =
    nextClass?.coach?.name ||
    nextClass?.coach?.fullName ||
    nextClass?.instructorName ||
    nextClass?.slot?.coach?.name ||
    null;

  const classTime = formatClassTime(nextClass);

  return (
    <>
      <PageHeader
        title={`${getGreeting()}, ${displayName}`}
        breadcrumb="Train. Improve. Repeat."
      />

      <div className="min-h-screen bg-[#1f1919] text-white">
        <div className="space-y-6">

          {/* Next Class Banner */}
          <section className="bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-white/10">

            <div className="flex items-start gap-4 flex-col">
              <img
                src="/assets/next-class.png"
                alt="Next Class"
                className="w-20 h-20 object-contain"
              />

              {loadingClass ? (
                <div className="space-y-2">
                  <div className="h-4 w-48 animate-pulse rounded bg-white/10" />
                  <div className="h-7 w-64 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
                </div>
              ) : nextClass ? (
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-medium">Next Class</h2>
                    {classTime && (
                      <span className="text-sm text-white/60">{classTime}</span>
                    )}
                  </div>
                  <p className="my-2 text-xl sm:text-2xl leading-[1.3]">{className}</p>
                  {coachName && (
                    <p className="text-sm text-white/70">With Prof. {coachName}</p>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-medium">Next Class</h2>
                  <p className="mt-1 text-sm text-white/50">No upcoming class scheduled.</p>
                </div>
              )}
            </div>

            <Button href="/" className="hidden sm:inline-flex">
              Book a Class
            </Button>
          </section>

          {/* Wallet + Membership */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            <div className="lg:col-span-2 bg-[#ffffff] text-black p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <img src="/assets/wallet-balance.png" alt="Wallet" className="w-20 h-20" />
                <div className="text-right">
                  <p className="text-sm text-black/60">AED</p>
                  <p className="text-2xl font-semibold">{(user?.wallet ?? 0).toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xl sm:text-2xl leading-[1.3] mt-0">Wallet Balance</h3>
              </div>
            </div>

            <a href="/dashboard/memberships" className="bg-[#ffffff] text-black flex flex-col items-center justify-center p-5 text-center hover:opacity-90 transition">
              <img src="/assets/membership.png" alt="Membership" className="w-14 h-14" />
              <h3 className="text-xl sm:text-2xl leading-[1.3] mt-3">Membership</h3>
            </a>
          </section>

          {/* Quick Actions */}
          <section>
            <h3 className="text-xl sm:text-2xl leading-[1.3] mb-5">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ActionCard title="Book a class" icon="/assets/book.png" href="/dashboard/book-class" />
              <ActionCard title="View Schedule" icon="/assets/view-schedule.png" href="/dashboard/my-bookings" />
              <ActionCard title="Programs" icon="/assets/programs.png" href="/dashboard/programs" />
              <ActionCard title="Refer a Friend" icon="/assets/refer.png" href="/dashboard/referrals" />
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

function ActionCard({ title, icon, href }) {
  const inner = (
    <>
      <img src={icon} alt={title} className="w-12 h-12" />
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-sm sm:text-base lg:text-lg leading-[1.3] text-left">{title}</h3>
        <img src="/assets/cta-icon.png" alt="View Button" className="w-10 h-10" />
      </div>
    </>
  );

  const cls = "group relative bg-[#2d2525] p-5 h-[210px] flex flex-col justify-between transition border border-white/10";

  if (href) {
    return <a href={href} className={cls}>{inner}</a>;
  }
  return <button className={cls}>{inner}</button>;
}
