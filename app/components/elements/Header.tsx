"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BookClassButton from "@/app/components/elements/BookClassButton";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/founder" },
  { label: "Programs", href: "/program" },
  { label: "Schedule", href: "/schedule" },
  { label: "Memberships", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-transparent absolute top-0 left-0 z-50 transition-all duration-300">
      <div className="max-w-[1170px] mx-auto py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-[110px] h-[60px] sm:w-[130px] sm:h-[70px] md:w-[160px] md:h-[90px]">
            <Image
              src="/assets/sixth_point_logo.png"
              alt="Sixth Point Jiu-Jitsu Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white uppercase transition-colors duration-200 lg:text-xs font-light tracking-tighter"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA - Desktop */}
        <BookClassButton className="hidden sm:inline-flex bg-gradient-to-r from-[#C1BEB9] to-white hover:from-[#b4b1ac] hover:to-[#f2f2f2] text-black px-6 md:px-7 py-2 md:py-2.5 text-[11px] md:text-[12px] font-medium uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer" />

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" // Hamburger
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col items-center py-6 space-y-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white uppercase tracking-wide text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
}
