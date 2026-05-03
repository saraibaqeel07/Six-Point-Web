"use client";
import React, { useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    booking: true,
    promotions: false,
    announcements: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        enabled ? "bg-emerald-500" : "bg-white/20"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <>
      <PageHeader title="Notification Settings" />

      <div className="min-h-screen bg-[#1f1919] text-white">
          

          <section className="mt-6  space-y-4">
            
            {/* Booking */}
            <div className="flex items-center justify-between p-5 bg-[#2d2525] border border-white/10 divide-white/10">
              <div>
                <h3 className="text-sm font-medium">Booking Reminders</h3>
                <p className="text-xs text-white/60 mt-1">
                  Get notified about upcoming classes and bookings.
                </p>
              </div>
              <Toggle
                enabled={settings.booking}
                onClick={() => toggle("booking")}
              />
            </div>

            {/* Promotions */}
            <div className="flex items-center justify-between p-5 bg-[#2d2525] border border-white/10 divide-white/10">
              <div>
                <h3 className="text-sm font-medium">Promotions & Offers</h3>
                <p className="text-xs text-white/60 mt-1">
                  Receive discounts, offers, and marketing updates.
                </p>
              </div>
              <Toggle
                enabled={settings.promotions}
                onClick={() => toggle("promotions")}
              />
            </div>

            {/* Announcements */}
            <div className="flex items-center justify-between p-5 bg-[#2d2525] border border-white/10 divide-white/10">
              <div>
                <h3 className="text-sm font-medium">Announcements</h3>
                <p className="text-xs text-white/60 mt-1">
                  Stay updated with important platform announcements.
                </p>
              </div>
              <Toggle
                enabled={settings.announcements}
                onClick={() => toggle("announcements")}
              />
            </div>

          </section>


      </div>
    </>
  );
}