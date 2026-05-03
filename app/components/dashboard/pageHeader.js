"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import api from "@/lib/api";

export default function PageHeader({ title, breadcrumb }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();


  //   useEffect(() => {
  //     const fetchNotifications = async () => {
  //       try {
  //         const res = await api.get("/notifications");
  //         setNotificationCount(res.data?.count || 0);
  //       } catch (err) {
  //         console.error("Failed to load notifications");
  //       }
  //     };

  //     fetchNotifications();
  //   }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">

      <div>
        <h4 className="text-white text-lg font-semibold mb-1">
          {title}
        </h4>
        {breadcrumb && (
          <div className="text-white/60 text-sm">
            {breadcrumb}
          </div>
        )}
      </div>

      <div className="relative w-fit">
        <button
          onClick={() => router.push("/dashboard/notifications")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-white/10 hover:bg-gray-800 transition cursor-pointer"
        >
          <img
            src="/assets/noti-icon.png"
            alt="Notifications"
            className="w-5 h-5 object-contain"
          />
        </button>

        {/* Badge */}
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-medium bg-red-500 text-white rounded-full">
          {notificationCount}
        </span>
      </div>

    </div>
  );
}