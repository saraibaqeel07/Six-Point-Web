"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";



export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const router = useRouter();


  const notifications = [
    {
      id: 1,
      type: "attendance",
      title: "Attendance marked successfully",
      message: "Your attendance for today has been recorded.",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "class",
      title: "Next class updated",
      message: "Your next class has been rescheduled to 6:30 PM.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment received",
      message: "Your monthly membership payment was processed successfully.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      type: "announcement",
      title: "New training announcement",
      message: "Check the latest class updates and training schedule.",
      time: "2 days ago",
      unread: false,
    },
  ];

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => n.unread);
    if (filter === "read") return notifications.filter((n) => !n.unread);
    return notifications;
  }, [filter]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getTypeStyles = (type) => {
    switch (type) {
      case "attendance":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20";
      case "class":
        return "bg-sky-500/15 text-sky-300 border-sky-500/20";
      case "payment":
        return "bg-amber-500/15 text-amber-300 border-amber-500/20";
      case "announcement":
        return "bg-violet-500/15 text-violet-300 border-violet-500/20";
      default:
        return "bg-white/10 text-white/70 border-white/10";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "attendance":
        return "Attendance";
      case "class":
        return "Class Update";
      case "payment":
        return "Payment";
      case "announcement":
        return "Announcement";
      default:
        return "Update";
    }
  };

  return (
    <>
      <PageHeader title="My Notifications" />

      <div className="min-h-screen bg-[#1f1919] text-white">
        <div className="">
          <section className="bg-[#2d2525] p-5 lg:p-6 border border-white/10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🔔</span>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <p className="text-sm text-white/70 mt-1">
                    Stay updated with attendance, classes, payments, and announcements.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/75">
                      Total: {notifications.length}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                      Unread: {unreadCount}
                    </span>
                  </div>

                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {["all", "unread", "read"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`px-4 py-2 rounded-xl text-sm border transition ${filter === item
                          ? "bg-white text-[#1f1919] border-white"
                          : "bg-transparent text-white/75 border-white/10 hover:bg-white/5"
                        }`}
                    >
                      {item === "all"
                        ? "All"
                        : item === "unread"
                          ? "Unread"
                          : "Read"}
                    </button>
                  ))}
                </div>

                <Button href="/dashboard/notification-settings" className="hidden sm:inline-flex mt-4">
                  View Notification Settings </Button>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`bg-[#2d2525] border p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition hover:border-white/20 ${notification.unread
                      ? "border-white/15"
                      : "border-white/10 opacity-90"
                    }`}
                >

                  <div className="flex-1">
                    <div
                      className={`inline-flex w-fit px-3 py-1.5 rounded-full text-xs font-medium border ${getTypeStyles(
                        notification.type
                      )}`}
                    >
                      {getTypeLabel(notification.type)}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
                      <h3 className="text-base font-medium flex items-center gap-2">
                        {notification.unread && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                        )}
                        {notification.title}
                      </h3>
                      <span className="text-xs text-white/50">
                        {notification.time}
                      </span>
                    </div>

                    <p className="text-sm text-white/70 mt-2 leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <button className="text-sm text-white/80 hover:text-white underline underline-offset-4">
                        View details
                      </button>
                      <button className="text-sm text-white/50 hover:text-white/80">
                        Mark as {notification.unread ? "read" : "unread"}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="bg-[#2d2525] border border-white/10 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <h3 className="text-lg font-medium mt-4">No notifications found</h3>
                <p className="text-sm text-white/70 mt-2">
                  Try switching filters or check back later for updates.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}