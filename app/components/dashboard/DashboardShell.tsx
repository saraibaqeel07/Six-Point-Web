"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const items: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/assets/dashboard.png" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "/assets/booking.png" },
  { label: "Subscriptions", href: "/dashboard/subscriptions", icon: "/assets/subscriptions.png" },
  { label: "Programs", href: "/dashboard/programs", icon: "/assets/subscriptions.png" },
  { label: "Events", href: "/dashboard/events", icon: "/assets/subscriptions.png" },
  { label: "Referrals", href: "/dashboard/referrals", icon: "/assets/referrals.png" },
  { label: "Wallet", href: "/dashboard/wallet", icon: "/assets/wallet.png" },
  { label: "Team", href: "/dashboard/team", icon: "/assets/wallet.png" },
  { label: "My Bookings", href: "/dashboard/my-bookings", icon: "/assets/wallet.png" },
  { label: "My Progress", href: "/dashboard/my-progress", icon: "/assets/wallet.png" },
  { label: "Profile", href: "/dashboard/profile", icon: "/assets/profile.png" },
];

export default function DashboardShell({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#171717] p-4 md:p-6">
      <div className="flex min-h-[calc(100vh-2rem)] gap-4 md:gap-6">

        {/* Sidebar */}
        <aside className="sticky top-4 flex h-[calc(100vh-2rem)] w-[240px] shrink-0 flex-col rounded-2xl border border-white/10 bg-[#2F2F2F] p-4 text-white">

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={140}
              height={70}
            />
          </div>

          {/* Menu */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {items.map(({ label, href, icon }) => {
                const active = pathname.startsWith(href);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition
                      ${active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
                    >
                      <Image src={icon} alt={label} width={40} height={40} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="mt-auto pt-4">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              <Image src="/assets/logout.png" alt="Logout" width={40} height={40} />
              Logout
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 rounded-2xl border border-white/10 bg-[#231c1a] p-4 md:p-6 text-white">
          {children}
        </main>

      </div>
    </div>
  );
}