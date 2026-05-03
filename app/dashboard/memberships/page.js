"use client";

import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import { getMembershipDetailsService, subscribeMembershipService } from "@/app/lib/apiServices";
import { toast } from "sonner";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const STATUS_STYLES = {
  ACTIVE: "bg-green-500/90",
  EXPIRED: "bg-red-500/90",
  PENDING: "bg-yellow-500/90",
  CANCELLED: "bg-white/20",
};

export default function SubscriptionsPage() {
  const [userSubscription, setUserSubscription] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMembershipDetailsService();
      setUserSubscription(res?.userSubscription || null);
      setAvailablePlans(res?.availablePlans || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load subscription details.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleSubscribe = async (membershipId) => {
    setSubmitting(membershipId);
    try {
      await subscribeMembershipService(membershipId);
      toast.success("Subscription updated successfully!");
      fetchDetails();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Subscription failed.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSubmitting(null);
    }
  };

  const isSubscribed = userSubscription?.isSubscribed;
  const currentPlan  = userSubscription?.currentPlan;

  const activePlanId  = currentPlan?._id || null;
  const planName      = currentPlan?.name || "—";
  const planPrice     = currentPlan?.price ?? null;
  const planDesc      = currentPlan?.description || "";
  const validUntil    = userSubscription?.endDate || userSubscription?.validUntil || null;
  const status        = (userSubscription?.status || "ACTIVE").toUpperCase();
  const features      = currentPlan?.features || [];

  return (
    <>
      <PageHeader title="Subscriptions" />

      {/* ── Current Subscription ─────────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-3 mb-8">
          <div className="h-40 animate-pulse rounded-xl border border-white/10 bg-white/5" />
        </div>
      ) : isSubscribed && currentPlan ? (
        <section className="relative bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-white/10 mb-8">
          <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${STATUS_STYLES[status] || "bg-white/20"}`}>
            {status}
          </span>

          <div className="flex items-start gap-4 flex-col">
            <img src="/assets/next-class.png" alt="Subscription" className="w-20 h-20 object-contain" />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-medium">{planName}</h2>
                {planPrice !== null && (
                  <span className="text-sm text-white/60">AED {Number(planPrice).toFixed(2)}</span>
                )}
              </div>

              {planDesc && (
                <p className="text-sm text-white/60 mt-1">{planDesc}</p>
              )}

              {validUntil && (
                <p className="text-sm text-white/70 mt-2">Valid Until: {formatDate(validUntil)}</p>
              )}

              {features.length > 0 && (
                <ul className="mt-4 flex gap-3 items-center flex-wrap">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {typeof f === "string" ? f : f.name || f.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ) : (
        !loading && (
          <section className="mb-8 border border-white/10 bg-[#2d2525] p-8 text-center text-white/50">
            No active subscription. Choose a plan below to get started.
          </section>
        )
      )}



      {/* ── Available Plans ──────────────────────────────────────────────── */}
      <section className="my-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl sm:text-2xl leading-[1.3]">
            {userSubscription ? "Want to upgrade your plan?" : "Choose a Plan"}
          </h3>
          <p className="text-sm text-white/70 mt-1">
            Get more access, priority booking, and exclusive benefits.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl border border-white/10 bg-white/5" />
          ))}
        </div>
      ) : availablePlans.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {availablePlans.map((plan) => {
            const id = plan._id || plan.id;
            const isActive = id && id === activePlanId;
            const isSubmitting = submitting === id;
            const planFeatures = plan.features || plan.benefits || [];
            const price = plan.price ?? plan.amount ?? null;
            const cycle = plan.duration || plan.billingCycle || plan.type || "";

            return (
              <div
                key={id}
                className={`bg-[#2d2525] p-5 border flex flex-col transition ${
                  isActive ? "border-emerald-500/60" : "border-white/10"
                }`}
              >
                {isActive && (
                  <span className="mb-3 self-start rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                    Current Plan
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">{plan.name || plan.title || "Plan"}</h2>
                  {cycle && <span className="text-sm text-white/60">{cycle}</span>}
                </div>

                {plan.description && (
                  <p className="mt-1 text-xs text-white/50">{plan.description}</p>
                )}

                {planFeatures.length > 0 && (
                  <ul className="my-4 flex flex-col gap-2 flex-1">
                    {planFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        {typeof f === "string" ? f : f.name || f.title}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  {price !== null && (
                    <p className="text-lg font-semibold">AED {Number(price).toFixed(2)}</p>
                  )}

                  <Button
                    className="shrink-0"
                    disabled={isActive || isSubmitting}
                    onClick={() => handleSubscribe(id)}
                  >
                    {isSubmitting ? "Processing…" : isActive ? "Active" : "Subscribe"}
                  </Button>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        !loading && (
          <div className="border border-white/10 bg-[#2d2525] p-8 text-center text-white/50">
            No plans available at the moment.
          </div>
        )
      )}
    </>
  );
}
