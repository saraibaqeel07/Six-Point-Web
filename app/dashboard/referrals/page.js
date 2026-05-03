"use client";
import React from "react";
import { useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import InputField from "@/app/components/elements/InputField";
import Button from "@/app/components/elements/Button";



export default function ReferralsPage() {

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    note: ""
  });

  const handleChange =
    (field) =>
      (e) => {
        setForm({ ...form, [field]: e.target.value });
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <>
      <PageHeader
        title="Refer a Friend"
      />
      <form className="flex flex-col gap-4 md:gap-5">

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
              placeholder="000-000-000"
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
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
          <Button className="inline-flex ">
            Submit Referral
          </Button>
        </div>

      </form>

      <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] my-5">My Referrals</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <ActionCard
          ReferredName="John Cena"
           ReferredStatus="inactive"
          activeDate="27 March 2026"
        />
        <ActionCard
          ReferredName="John Cena 01"
            ReferredStatus="active"
          activeDate="27 March 2026"
        />

        <ActionCard
          ReferredName="John Cena 02"
          ReferredStatus="inactive"
          activeDate="27 March 2026"
        />
        <ActionCard
          ReferredName="John Cena 03"
          ReferredStatus="active"
          activeDate="27 March 2026"
        />

      </div>

    </>
  );
}


function ActionCard({ ReferredName, ReferredStatus, activeDate }) {
  const statusColor =
    ReferredStatus.toLowerCase() === "active"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div className="group relative bg-[#2d2525] p-5 h-[180px] flex flex-col justify-start gap-3 border border-white/10 shadow-md transition-colors">
      
      {/* Status Badge */}
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor} w-max`}
      >
        {ReferredStatus.toUpperCase()}
      </span>

      {/* Name */}
      <h3 className="text-sm sm:text-base lg:text-lg leading-[1.3] font-medium text-left text-white mt-2">
        {ReferredName}
      </h3>

      {/* Date */}
      <p className="text-sm sm:text-base text-gray-300 mt-auto">
        Date: {activeDate}
      </p>

    </div>
  );
}