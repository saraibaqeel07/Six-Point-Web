"use client";
import React from "react";
import { useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import InputField from "@/app/components/elements/InputField";
import Button from "@/app/components/elements/Button";



export default function WalletPage() {

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
        title="My Wallet"
      />

      <div className="lg:col-span-2 bg-[#ffffff] text-black p-5 flex flex-col justify-between">

        <div className="flex justify-between items-start">
          <img
            src="/assets/wallet-balance.png"
            alt="Wallet"
            className="w-20 h-20"
          />

          <div className="text-right">
            <p className="text-sm text-black/60">AED</p>
            <p className="text-2xl font-semibold">0.00</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] mt-0"> Wallet Balance</h3>
        </div>
      </div>

      <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] my-5">Transaction History</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <ActionCard
          title="Referral Reward"
          price="99"
          date="27 March 2026"
        />

        <ActionCard
          title="Referral Reward"
          price="99"
          date="27 March 2026"
        />

        <ActionCard
          title="Referral Reward"
          price="99"
          date="27 March 2026"
        />
        <ActionCard
          title="Referral Reward"
          price="99"
          date="27 March 2026"
        />

      </div>

    </>
  );
}


function ActionCard({ title, price, date  }) {
  return (
    <div className="group relative bg-[#2d2525] p-5 h-[180px] flex flex-col justify-center gap-2 border border-white/10">
        <p className="text-2xl font-semibold"> + AED {price}  </p>
        <h3 className="text-sm sm:text-base lg:text-lg leading-[1.3] text-left">  {title} </h3>
        <p className="text-lg ">{date}</p>
   
    </div>

  );
}