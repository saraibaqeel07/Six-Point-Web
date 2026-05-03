"use client";
import React from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";

export default function SubscriptionsPage() {
  return (
    <>
      <PageHeader title="Subscriptions" />

      <SubscriptionCard
        membershipType="Monthly"
        planName="Kids / Teens"
        status="active"
        validUntil="30 April 2026"
      />
    </>
  );
}

function SubscriptionCard({ membershipType, planName, status, validUntil }) {
  const statusColor =
    status.toLowerCase() === "active"
      ? "bg-green-500/90"
      : "bg-red-500/90";

  return (
    <>
      <section className="relative bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-white/10">

        {/* 🔥 Top Right Badge */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
        >
          {status.toUpperCase()}
        </span>

        <div className="flex items-start gap-4 flex-col">
          <img
            src="/assets/next-class.png"
            alt="Subscription"
            className="w-20 h-20 object-contain"
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">{planName}</h2>
              <span className="text-sm text-white/60">{membershipType}</span>
            </div>

            <p className="text-sm text-white/70 mt-2">
              Valid Until: {validUntil}
            </p>

            <ul className="mt-4 flex gap-3 items-center justify-center flex-wrap">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Unlimited classes
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Open Mat access
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                Progress tracking
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="my-10 flex justify-between align-middle">
        <div>
          <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3]">Want to upgrade your plan?</h3>
          <p className="text-sm text-white/70 mt-1">
            Get more access, priority booking, and exclusive benefits.
          </p>

        </div>

        <div className="">
          <Button href="" className="hidden sm:inline-flex">
           Request Upgrade
          </Button>

        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

  {/* Card 1 */}
  <div className="bg-[#2d2525] p-5 border border-white/10 flex flex-col">
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-medium">Kids / Teens</h2>
      <span className="text-sm text-white/60">Monthly</span>
    </div>

    <p className="text-sm text-white/70 mt-2">
      Valid Until: 30 April 2026
    </p>

    <ul className="my-4 flex flex-col gap-2">
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Unlimited classes
      </li>
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Open Mat access
      </li>
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Progress tracking
      </li>
    </ul>

    <p className="text-lg font-semibold mt-auto">AED 100.00</p>
  </div>

  {/* Card 2 */}
  <div className="bg-[#2d2525] p-5 border border-white/10 flex flex-col">
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-medium">Adults</h2>
      <span className="text-sm text-white/60">Monthly</span>
    </div>

    <p className="text-sm text-white/70 mt-2">
      Valid Until: 30 April 2026
    </p>

    <ul className="my-4 flex flex-col gap-2">
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Unlimited classes
      </li>
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Open Mat access
      </li>
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Priority booking
      </li>
    </ul>

    <p className="text-lg font-semibold mt-auto">AED 150.00</p>
  </div>

  {/* Card 3 */}
  <div className="bg-[#2d2525] p-5 border border-white/10 flex flex-col">
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-medium">Premium</h2>
      <span className="text-sm text-white/60">Monthly</span>
    </div>

    <p className="text-sm text-white/70 mt-2">
      Valid Until: 30 April 2026
    </p>

    <ul className="my-4 flex flex-col gap-2">
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Unlimited classes
      </li>
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Open Mat access
      </li>
      <li className="flex items-center gap-2 text-sm text-white/80">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        1-on-1 coaching
      </li>
    </ul>

    <p className="text-lg font-semibold mt-auto">AED 250.00</p>
  </div>

</section>
    </>
  );
}