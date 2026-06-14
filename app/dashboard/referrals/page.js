"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import InputField from "@/app/components/elements/InputField";
import Button from "@/app/components/elements/Button";
import { getMyReferralsService, createReferralService } from "@/app/lib/apiServices";
import { toast } from "sonner";

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ReferralsPage() {
  const [form, setForm] = useState({ fullName: "", phoneNumber: "", emailAddress: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);

  const fetchReferrals = async () => {
    try {
      const res = await getMyReferralsService();
      setReferrals(res?.data || res || []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      if (msg) toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setLoadingReferrals(false);
    }
  };

  useEffect(() => { fetchReferrals(); }, []);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handlePhoneChange = (e) => setForm({ ...form, phoneNumber: e.target.value.replace(/\D/g, "") });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createReferralService({
        fullName: form.fullName,
        email: form.emailAddress,
        phoneNumber: form.phoneNumber,
        notes: form.note,
      });
      toast.success("Referral submitted successfully!");
      setForm({ fullName: "", phoneNumber: "", emailAddress: "", note: "" });
      fetchReferrals();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to submit referral.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Refer a Friend" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">

        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex-1">
            <InputField
              label="Full Name"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange("fullName")}
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Email Address"
              type="email"
              placeholder="johndoe@gmail.com"
              value={form.emailAddress}
              onChange={handleChange("emailAddress")}
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Phone Number"
              type="tel"
              inputMode="numeric"
              placeholder="000-000-000"
              value={form.phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex-1">
            <InputField
              label="Note / Message"
              type="textarea"
              placeholder=""
              value={form.note}
              onChange={handleChange("note")}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="inline-flex" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Referral"}
          </Button>
        </div>

      </form>

      <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] my-5">My Referrals</h3>

      {loadingReferrals ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[180px] animate-pulse rounded bg-white/5 border border-white/10" />
          ))}
        </div>
      ) : referrals.length === 0 ? (
        <p className="text-white/40 text-sm">No referrals yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {referrals.map((item, i) => (
            <ActionCard
              key={item._id || i}
              ReferredName={item.fullName || item.referredUser?.fullName || "—"}
              ReferredStatus={item.status || "pending"}
              activeDate={formatDate(item.createdAt || item.joinedAt)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function ActionCard({ ReferredName, ReferredStatus, activeDate }) {
  const statusColor =
    ReferredStatus.toLowerCase() === "active" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="group relative bg-[#2d2525] p-5 h-[180px] flex flex-col justify-start gap-3 border border-white/10 shadow-md transition-colors">

      <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor} w-max`}>
        {ReferredStatus.toUpperCase()}
      </span>

      <h3 className="text-sm sm:text-base lg:text-lg leading-[1.3] font-medium text-left text-white mt-2">
        {ReferredName}
      </h3>

      <p className="text-sm sm:text-base text-gray-300 mt-auto">
        Date: {activeDate}
      </p>

    </div>
  );
}
