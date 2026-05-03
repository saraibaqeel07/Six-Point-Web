"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import { getMyHistoryService } from "@/app/lib/apiServices";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function WalletPage() {
  const { user } = useAuth();
  const [history, setHistory]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getMyHistoryService()
      .then((data) => setHistory(data?.data || data?.transactions || data || []))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        if (msg) toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="My Wallet" />

      <div className="lg:col-span-2 bg-[#ffffff] text-black p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <img src="/assets/wallet-balance.png" alt="Wallet" className="w-20 h-20" />
          <div className="text-right">
            <p className="text-sm text-black/60">AED</p>
            <p className="text-2xl font-semibold">{(user?.wallet ?? 0).toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] mt-0">Wallet Balance</h3>
        </div>
      </div>

      <h3 className="text-1xl sm:text-2xl lg:text-2xl leading-[1.3] my-5">Transaction History</h3>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[180px] animate-pulse rounded border border-white/10 bg-white/5" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <p className="text-white/40 text-sm">No transactions yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {history.map((item, i) => (
            <ActionCard
              key={item._id || i}
              title={item.title || item.type || item.description || "Transaction"}
              price={item.amount ?? item.price ?? 0}
              date={formatDate(item.createdAt || item.date)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function ActionCard({ title, price, date }) {
  return (
    <div className="group relative bg-[#2d2525] p-5 h-[180px] flex flex-col justify-center gap-2 border border-white/10">
      <p className="text-2xl font-semibold"> + AED {price} </p>
      <h3 className="text-sm sm:text-base lg:text-lg leading-[1.3] text-left"> {title} </h3>
      <p className="text-lg ">{date}</p>
    </div>
  );
}
